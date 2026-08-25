module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ publicKey: null, mode: 'unknown' })

  const publicKey = String(process.env.PAYSTACK_PUBLIC_KEY || process.env.VITE_PAYSTACK_PUBLIC_KEY || '').trim()
  if (!publicKey) {
    return res.status(503).json({
      publicKey: null,
      mode: 'unknown',
      message: 'Paystack public key is not configured.'
    })
  }

  // Safe diagnostic metadata only: the public key is already intended for browser use.
  // Never expose PAYSTACK_SECRET_KEY here.
  const mode = publicKey.startsWith('pk_live_')
    ? 'live'
    : publicKey.startsWith('pk_test_')
      ? 'test'
      : 'unknown'

  return res.status(200).json({
    publicKey,
    mode
  })
}
