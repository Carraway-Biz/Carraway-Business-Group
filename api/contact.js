const AIRTABLE_BASE   = 'appf20RCOmCyu8BEx';
const AIRTABLE_TABLE  = 'tblZ8RvYDwXngf1gO';
const AIRTABLE_URL    = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;

export default async function handler(req, res) {
  // ── CORS ─────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  // ── API key ───────────────────────────────────────────────────────
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    console.error('AIRTABLE_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Parse body ────────────────────────────────────────────────────
  const {
    firstName,
    lastName,
    email,
    phone,
    businessType,
    fundingAmount,
    message,
  } = req.body || {};

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required' });
  }

  // ── Post to Airtable ──────────────────────────────────────────────
  try {
    const airtableRes = await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        fields: {
          'First Name':      firstName     || '',
          'Last Name':       lastName      || '',
          'Email':           email         || '',
          'Phone':           phone         || '',
          'Business Type':   businessType  || '',
          'Funding Amount':  fundingAmount || '',
          'Message':         message       || '',
        },
      }),
    });

    if (!airtableRes.ok) {
      const errBody = await airtableRes.json().catch(() => ({}));
      console.error('Airtable error:', errBody);
      return res.status(502).json({ error: 'Failed to save submission' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
