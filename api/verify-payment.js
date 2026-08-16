const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function generateReference() {
  const d = new Date()

  const date =
    String(d.getFullYear()).slice(-2) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''

  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }

  return `GFS-${date}-${code}`
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  const { reference, booking } = req.body

  const verify = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  )

  const result = await verify.json()

  if (!result.status || result.data.status !== 'success') {
    return res.status(400).json({
      success: false,
      error: 'Payment verification failed',
    })
  }

  const bookingReference = generateReference()

  const { error } = await supabase.from('bookings').insert({
    booking_reference: bookingReference,
    customer_name: booking.name,
    email: booking.email,
    phone: booking.phone,
    service: booking.service,
    notes: booking.notes || '',
    amount: result.data.amount / 100,
    payment_type: 'deposit',
    payment_status: 'paid',
    paystack_reference: reference,
  })

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }

  return res.json({
    success: true,
    bookingReference,
  })
}
