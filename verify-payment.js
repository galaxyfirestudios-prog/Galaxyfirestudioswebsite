export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ verified: false, message: 'Method not allowed' });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ verified: false, message: 'Paystack secret key is not configured on the server.' });
  }

  try {
    const { reference, booking } = req.body || {};
    const prices = {
      'The Fire Session': 130000,
      'Studio Hour': 25000,
      'Professional Mix': 75000,
      'Mastering': 35000,
      'Mix + Master': 100000,
      'Production Session': 30000,
    };
    const basePrice = prices[booking?.service];
    const expectedAmount = booking?.payment === 'deposit' ? Math.round(basePrice * 0.5) : basePrice;
    if (!reference || !booking?.service || !basePrice || !booking?.email || !expectedAmount) {
      return res.status(400).json({ verified: false, message: 'Missing or invalid booking/payment details.' });
    }

    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const result = await paystackResponse.json();
    const transaction = result?.data;
    const verified = Boolean(
      paystackResponse.ok &&
      result?.status === true &&
      transaction?.status === 'success' &&
      Number(transaction?.amount) === Number(expectedAmount) &&
      transaction?.currency === 'NGN'
    );

    if (!verified) {
      return res.status(400).json({ verified: false, message: 'Payment could not be verified.', status: transaction?.status || null });
    }

    return res.status(200).json({
      verified: true,
      reference: transaction.reference,
      amount: transaction.amount,
      currency: transaction.currency,
      paidAt: transaction.paid_at,
    });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return res.status(500).json({ verified: false, message: 'Payment verification failed on the server.' });
  }
}
