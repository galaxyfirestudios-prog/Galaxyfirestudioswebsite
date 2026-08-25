module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ publicKey: null })
  const publicKey = String(process.env.PAYSTACK_PUBLIC_KEY || process.env.VITE_PAYSTACK_PUBLIC_KEY || '').trim()
  if (!publicKey) return res.status(503).json({ publicKey: null, message: 'Paystack public key is not configured.' })
  return res.status(200).json({ publicKey })
}
