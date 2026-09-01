const { createClient } = require('@supabase/supabase-js')
const { sendSaleEmail } = require('./_sale-email')
const { claimSaleNotification, releaseSaleNotification } = require('./_notification-log')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BOOKING_PRICES = {
  'The Fire Session': 130000,
  'Studio Hour': 25000,
  'Professional Mix': 75000,
  'Mastering': 35000,
  'Mix + Master': 100000,
  'Production Session': 30000,
  'Artist Photoshoot': 75000,
  'Cover Art Shoot': 50000,
  'Event Photography': 100000,
  'Music Video': 250000,
  'Performance Video': 150000,
  'Visualizer': 100000,
  'Lyric Video': 75000,
  'Social Content Package': 100000,
}

function generateReference() {
  const d = new Date()
  const date = String(d.getFullYear()).slice(-2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0')
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `GFS-${date}-${code}`
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ verified: false, message: 'Method not allowed' })

  try {
    if (!process.env.PAYSTACK_SECRET_KEY || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ verified: false, message: 'Payment verification is not fully configured on the server.' })
    }

    const { reference, expectedAmount, booking } = req.body || {}
    if (!reference || !booking?.name || !booking?.email || !booking?.phone || !booking?.service) {
      return res.status(400).json({ verified: false, message: 'Missing payment or booking information.' })
    }

    const servicePrice = BOOKING_PRICES[booking.service]
    if (!servicePrice) return res.status(400).json({ verified: false, message: 'The selected service is not available for online payment.' })

    const paymentType = booking.payment === 'full' ? 'full' : 'deposit'
    const expectedServerAmount = paymentType === 'deposit' ? Math.round(servicePrice * 0.5) * 100 : servicePrice * 100
    if (expectedAmount != null && Number(expectedAmount) !== expectedServerAmount) {
      return res.status(400).json({ verified: false, message: 'The booking amount could not be verified.' })
    }

    const verify = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    })
    const result = await verify.json()

    if (!verify.ok || !result.status || result.data?.status !== 'success') {
      return res.status(400).json({ verified: false, message: 'Payment verification failed.' })
    }

    if (result.data.currency !== 'NGN' || Number(result.data.amount) !== expectedServerAmount) {
      return res.status(400).json({ verified: false, message: 'Payment amount could not be verified.' })
    }

    // Prevent a repeated Paystack callback from creating duplicate bookings.
    const { data: existingBooking } = await supabase
      .from('bookings')
      .select('booking_reference')
      .eq('paystack_reference', reference)
      .maybeSingle()

    if (existingBooking?.booking_reference) {
      return res.json({ verified: true, success: true, bookingReference: existingBooking.booking_reference, alreadyRecorded: true })
    }

    const bookingReference = generateReference()
    const { error } = await supabase.from('bookings').insert({
      booking_reference: bookingReference,
      customer_name: booking.name,
      email: booking.email,
      phone: booking.phone,
      service: booking.service,
      notes: booking.notes || '',
      amount: Number(result.data.amount) / 100,
      payment_type: paymentType,
      payment_status: 'paid',
      paystack_reference: reference,
    })

    if (error) {
      return res.status(500).json({ verified: false, message: 'Payment was verified but the booking could not be recorded. Please contact Galaxy Fire Studios with your Paystack reference.' })
    }

    const notification = await claimSaleNotification(reference, 'Studio / Visual Booking')
    if (notification.claimed) {
      try {
        await sendSaleEmail({
          type: 'Studio / Visual Booking',
          service: booking.service,
          amount: Number(result.data.amount) / 100,
          customerName: booking.name,
          customerEmail: booking.email,
          customerPhone: booking.phone,
          bookingDate: booking.date,
          bookingTime: booking.time,
          paystackReference: reference,
          orderReference: bookingReference,
        })
      } catch (emailError) {
        console.error('Booking sale email error:', emailError)
        await releaseSaleNotification(reference)
      }
    }

    return res.json({ verified: true, success: true, bookingReference })
  } catch (error) {
    console.error('Booking payment verification error:', error)
    return res.status(500).json({ verified: false, message: 'Could not verify the payment right now.' })
  }
}
