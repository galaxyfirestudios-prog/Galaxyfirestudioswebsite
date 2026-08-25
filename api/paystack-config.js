module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ publicKey: null })
  const publicKey = String(process.env.PAYSTACK_PUBLIC_KEY || process.env.VITE_PAYSTACK_PUBLIC_KEY || '').trim()
  if (!/^pk_live_[A-Za-z0-9]+$/.test(publicKey)) {
    return res.status(503).json({ publicKey: null, message: 'Paystack LIVE public key is not configured.' })
  }
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  return res.status(200).json({ publicKey })
}
