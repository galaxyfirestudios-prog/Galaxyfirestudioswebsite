function generateReference() {
  const d = new Date()
  const date =
    String(d.getFullYear()).slice(-2) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `GFS-SHOP-${date}-${code}`
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ verified: false, message: 'Method not allowed' })

  try {
    const { reference, expectedAmount } = req.body || {}
    if (!reference || !expectedAmount) {
      return res.status(400).json({ verified: false, message: 'Missing payment reference or amount.' })
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ verified: false, message: 'Payment verification is not configured on the server.' })
    }

    const verify = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    })
    const result = await verify.json()

    if (!verify.ok || !result.status || result.data?.status !== 'success') {
      return res.status(400).json({ verified: false, message: 'Payment verification failed.' })
    }

    if (Number(result.data.amount) !== Number(expectedAmount)) {
      return res.status(400).json({ verified: false, message: 'Payment amount could not be verified.' })
    }

    return res.json({
      verified: true,
      orderReference: generateReference(),
      paidAmount: result.data.amount,
    })
  } catch (error) {
    console.error('Store payment verification error:', error)
    return res.status(500).json({ verified: false, message: 'Could not verify payment right now.' })
  }
}
