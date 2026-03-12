const AIRTABLE_BASE  = 'appf20RCOmCyu8BEx';
const AIRTABLE_TABLE = 'tblZ8RvYDwXngf1gO';
const AIRTABLE_URL   = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;

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
    console.error('[contact] AIRTABLE_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error: missing API key' });
  }
  console.log('[contact] AIRTABLE_API_KEY present, length:', apiKey.length);

  // ── Parse body (Vercel parses JSON automatically, but guard anyway) ──
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error('[contact] Failed to parse request body as JSON:', body);
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }
  if (!body || typeof body !== 'object') {
    console.error('[contact] Request body is empty or not an object:', body);
    return res.status(400).json({ error: 'Request body is missing or invalid' });
  }

  const { firstName, lastName, email, phone, businessType, fundingAmount, message } = body;

  console.log('[contact] Received fields:', {
    firstName,
    lastName,
    email: email ? `${email.slice(0, 3)}***` : undefined, // partial redact
    phone:         phone         ? '(present)' : '(empty)',
    businessType:  businessType  || '(empty)',
    fundingAmount: fundingAmount || '(empty)',
    message:       message       ? `${message.slice(0, 40)}…` : '(empty)',
  });

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required' });
  }

  // ── Post to Airtable ──────────────────────────────────────────────
  const fields = {
    'First Name':     firstName     || '',
    'Last Name':      lastName      || '',
    'Email':          email         || '',
    'Phone':          phone         || '',
    'Business Type':  businessType  || '',
    'Funding Amount': fundingAmount || '',
    'Message':        message       || '',
  };

  console.log('[contact] Posting to Airtable URL:', AIRTABLE_URL);
  console.log('[contact] Fields being sent:', JSON.stringify(fields));

  try {
    const airtableRes = await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    const responseText = await airtableRes.text();
    console.log('[contact] Airtable HTTP status:', airtableRes.status);
    console.log('[contact] Airtable response body:', responseText);

    let responseJson;
    try { responseJson = JSON.parse(responseText); } catch { responseJson = null; }

    if (!airtableRes.ok) {
      // Expose the Airtable error detail so it shows up in the browser network tab
      const detail = responseJson?.error?.message
        || responseJson?.error?.type
        || responseText
        || 'Unknown Airtable error';

      console.error('[contact] Airtable rejected the request:', detail);
      return res.status(502).json({
        error:         'Airtable rejected the submission',
        airtable_status: airtableRes.status,
        airtable_detail: detail,
      });
    }

    console.log('[contact] Record created successfully, id:', responseJson?.id);
    return res.status(200).json({ success: true, id: responseJson?.id });

  } catch (err) {
    console.error('[contact] Network/fetch error reaching Airtable:', err.message, err.stack);
    return res.status(500).json({ error: 'Could not reach Airtable', detail: err.message });
  }
}
