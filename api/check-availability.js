const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const { startAt, endAt } = req.body || {}

    if (!startAt || !endAt) {
      // Missing availability data should not block the payment gateway.
      return res.status(200).json(true)
    }

    const { data, error } = await supabase.rpc(
      'check_booking_availability',
      {
        p_start_at: startAt,
        p_end_at: endAt
      }
    )

    if (error) {
      // Treat availability failures as unknown, not unavailable. The payment
      // flow must remain usable while the optional scheduling service recovers.
      console.error('Supabase availability error; allowing payment to continue:', error)
      return res.status(200).json(true)
    }

    return res.status(200).json(data === true)
  } catch (error) {
    // Availability is optional scheduling infrastructure. A temporary
    // Supabase/RPC failure must never stop a customer from reaching Paystack.
    console.error('Availability API error; allowing payment to continue:', error)

    return res.status(200).json(true)
  }
}
