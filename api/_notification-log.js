const { createClient } = require('@supabase/supabase-js')

function getSupabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function claimSaleNotification(paystackReference, saleType) {
  const supabase = getSupabase()
  if (!supabase || !paystackReference) return { claimed: true, tracked: false }

  const { data, error } = await supabase
    .from('sale_notifications')
    .insert({ paystack_reference: paystackReference, sale_type: saleType })
    .select('id')
    .maybeSingle()

  if (!error) return { claimed: true, tracked: true, id: data?.id }
  if (error.code === '23505') return { claimed: false, tracked: true }
  throw error
}

async function releaseSaleNotification(paystackReference) {
  const supabase = getSupabase()
  if (!supabase || !paystackReference) return
  const { error } = await supabase.from('sale_notifications').delete().eq('paystack_reference', paystackReference)
  if (error) console.error('Sale notification release error:', error)
}

module.exports = { claimSaleNotification, releaseSaleNotification }
