const DEFAULT_NOTIFICATION_EMAIL = 'galaxyfirestudios@gmail.com'

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function money(amount) {
  return `₦${Number(amount || 0).toLocaleString('en-NG')}`
}

async function sendSaleEmail(order) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.warn('Sale email skipped: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.')
    return { sent: false, reason: 'email_not_configured' }
  }

  const to = process.env.SALES_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL
  const subject = order.type === 'Beat'
    ? `🔥 Galaxy Fire Beat Sale — ${order.title} (${order.license || 'License'})`
    : order.type === 'Equipment Store'
      ? `🛒 Galaxy Fire Equipment Sale — ${order.orderReference || order.paystackReference}`
      : `🔥 Galaxy Fire Sale — ${order.title || order.service || order.type}`

  const detailRows = [
    ['Sale type', order.type],
    order.title ? ['Product', order.title] : null,
    order.service ? ['Service', order.service] : null,
    order.license ? ['License', order.license] : null,
    ['Amount', money(order.amount)],
    ['Customer', order.customerName],
    ['Email', order.customerEmail],
    order.customerPhone ? ['Phone', order.customerPhone] : null,
    order.bookingDate ? ['Booking date', order.bookingDate] : null,
    order.bookingTime ? ['Preferred time', order.bookingTime] : null,
    order.city ? ['Delivery city', order.city] : null,
    order.address ? ['Delivery address', order.address] : null,
    ['Paystack reference', order.paystackReference],
    order.orderReference ? ['Galaxy Fire order', order.orderReference] : null,
  ].filter(Boolean)

  const products = order.items?.length
    ? `<h3>Equipment order</h3><ul>${order.items.map((item) => `<li>${esc(item.name)} × ${Number(item.quantity || 0)} — ${money(item.price)}</li>`).join('')}</ul>`
    : ''

  const exclusiveNotice = order.exclusiveSold
    ? '<p style="padding:12px;border-left:4px solid #e50914;background:#f7f7f7"><strong>EXCLUSIVE SOLD:</strong> This beat remains visible and playable for preview, but is no longer available for purchase.</p>'
    : ''

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5"><h2 style="margin-bottom:6px">Galaxy Fire Studios — New Sale</h2><p style="color:#666;margin-top:0">A successful Paystack transaction has been verified.</p><table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">${detailRows.map(([label, value]) => `<tr><td style="border-bottom:1px solid #eee;font-weight:700;width:180px">${esc(label)}</td><td style="border-bottom:1px solid #eee">${esc(value)}</td></tr>`).join('')}</table>${products}${exclusiveNotice}</body></html>`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [to],
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Resend error ${response.status}: ${body}`)
  }

  return { sent: true }
}

module.exports = { sendSaleEmail, DEFAULT_NOTIFICATION_EMAIL }
