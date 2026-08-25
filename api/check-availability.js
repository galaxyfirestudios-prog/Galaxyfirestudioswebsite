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
      return res.status(400).json({
        error: 'startAt and endAt are required'
      })
    }

    const { data, error } = await supabase.rpc(
      'check_booking_availability',
      {
        p_start_at: startAt,
        p_end_at: endAt
      }
    )

    if (error) {
      console.error('Supabase availability error:', error)

      return res.status(500).json({
        error: error.message
      })
    }

    return res.status(200).json(data === true)
  } catch (error) {
    console.error('Availability API error:', error)

    return res.status(500).json({
      error: 'Could not check availability'
    })
  }
}
