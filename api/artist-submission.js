const MAX_AUDIO_BYTES = 2 * 1024 * 1024
const MAX_ARTWORK_BYTES = 700 * 1024
const DESTINATION_EMAIL = 'fortheculture184@gmail.com'

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify(body))
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function purposeLabel(value) {
  return value === 'radio' ? 'RADIO CONSIDERATION'
    : value === 'editorial' ? 'BLOG / EDITORIAL CONSIDERATION'
    : 'RADIO + BLOG / EDITORIAL'
}

function attachment(file) {
  if (!file?.data) return null
  return {
    filename: file.name || 'submission-file',
    content: file.data,
    type: file.type || 'application/octet-stream',
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return json(res, 503, { error: 'Submission email service is not configured yet.' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const required = ['artistName', 'email', 'songTitle']
  if (required.some(key => !String(body[key] || '').trim())) {
    return json(res, 400, { error: 'Artist name, email and song title are required.' })
  }
  if (!body.songUrl && !body.audio?.data) {
    return json(res, 400, { error: 'Please provide an audio upload or a streaming/download link.' })
  }

  const audioBytes = body.audio?.data ? Math.floor(String(body.audio.data).length * 0.75) : 0
  const artworkBytes = body.artwork?.data ? Math.floor(String(body.artwork.data).length * 0.75) : 0
  if (audioBytes > MAX_AUDIO_BYTES) return json(res, 413, { error: 'The direct audio upload is too large. Please submit a streaming/download link instead.' })
  if (artworkBytes > MAX_ARTWORK_BYTES) return json(res, 413, { error: 'Artwork is too large. Please use an image under 700 KB.' })

  const details = [
    ['Artist / Stage Name', body.artistName],
    ['Email', body.email],
    ['Phone / WhatsApp', body.phone],
    ['Country', body.country],
    ['City', body.city],
    ['Genre', body.genre],
    ['Song Title', body.songTitle],
    ['Release Date', body.releaseDate],
    ['Submission Type', purposeLabel(body.purpose)],
    ['Song Link', body.songUrl],
    ['Social Links', body.socialLinks],
  ].filter(([, value]) => String(value || '').trim())

  const rows = details.map(([label, value]) =>
    `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:700;width:190px">${esc(label)}</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(value)}</td></tr>`
  ).join('')

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
    <h2>FOR THE CULTURE — New Artist Submission</h2>
    <p style="color:#666">Status: <strong>UNDER REVIEW</strong></p>
    <table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table>
    ${body.bio ? `<h3>Artist Bio</h3><p>${esc(body.bio).replace(/\n/g, '<br>')}</p>` : ''}
    ${body.songDescription ? `<h3>Song Description</h3><p>${esc(body.songDescription).replace(/\n/g, '<br>')}</p>` : ''}
    <p style="margin-top:24px;padding:12px;background:#f5f5f5;border-left:4px solid #d71920">
      This submission was sent through the FOR THE CULTURE artist portal. Submission does not guarantee radio play or editorial publication.
    </p>
  </body></html>`

  const attachments = [attachment(body.audio), attachment(body.artwork)].filter(Boolean)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [DESTINATION_EMAIL],
      reply_to: [body.email],
      subject: `🎵 FOR THE CULTURE Artist Submission — ${body.songTitle} — ${body.artistName}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    console.error('artist-submission Resend error:', message)
    return json(res, 502, { error: 'The submission email could not be sent. Please try again.' })
  }

  return json(res, 200, { ok: true, destination: DESTINATION_EMAIL })
}
