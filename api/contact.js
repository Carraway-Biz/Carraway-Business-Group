const AIRTABLE_BASE  = 'appf20RCOmCyu8BEx';
const AIRTABLE_TABLE = 'tblZ8RvYDwXngf1gO';
const AIRTABLE_URL   = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;
const RESEND_URL     = 'https://api.resend.com/emails';
const NOTIFY_TO      = 'Ben@gocarraway.com';
// Once you verify your domain in Resend, change this to e.g. noreply@gocarraway.com
const NOTIFY_FROM    = 'onboarding@resend.dev';

export default async function handler(req, res) {
  // ── CORS ─────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  // ── API keys ──────────────────────────────────────────────────────
  const airtableKey = process.env.AIRTABLE_API_KEY;
  if (!airtableKey) {
    console.error('[contact] AIRTABLE_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error: missing Airtable API key' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('[contact] RESEND_API_KEY is not set — email notification will be skipped');
  }

  // ── Parse body ────────────────────────────────────────────────────
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Request body is missing or invalid' });
  }

  const {
    firstName,
    lastName,
    businessName,
    email,
    phone,
    businessType,
    fundingAmount,
    message,
  } = body;

  console.log('[contact] Received submission:', {
    firstName,
    lastName,
    businessName: businessName || '(empty)',
    email:        email ? `${email.slice(0, 3)}***` : undefined,
    phone:        phone ? '(present)' : '(empty)',
    businessType: businessType  || '(empty)',
    fundingAmount: fundingAmount || '(empty)',
    message:      message ? `${String(message).slice(0, 40)}…` : '(empty)',
  });

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required' });
  }

  // ── Save to Airtable ──────────────────────────────────────────────
  const fields = {
    'First Name':     firstName    || '',
    'Last Name':      lastName     || '',
    'Business Name':  businessName || '',
    'Email':          email        || '',
    'Phone':          phone        || '',
    'Business Type':  businessType  || '',
    'Funding Amount': fundingAmount || '',
    'Message':        message      || '',
  };

  console.log('[contact] Posting to Airtable:', AIRTABLE_URL);
  console.log('[contact] Fields:', JSON.stringify(fields));

  try {
    const airtableRes = await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${airtableKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    const responseText = await airtableRes.text();
    console.log('[contact] Airtable status:', airtableRes.status);
    console.log('[contact] Airtable response:', responseText);

    let responseJson;
    try { responseJson = JSON.parse(responseText); } catch { responseJson = null; }

    if (!airtableRes.ok) {
      const detail = responseJson?.error?.message
        || responseJson?.error?.type
        || responseText
        || 'Unknown Airtable error';
      console.error('[contact] Airtable rejected the request:', detail);
      return res.status(502).json({
        error:           'Airtable rejected the submission',
        airtable_status: airtableRes.status,
        airtable_detail: detail,
      });
    }

    console.log('[contact] Record created, id:', responseJson?.id);

    // ── Send email notification via Resend ─────────────────────────
    if (resendKey) {
      const subject = `New Carraway Inquiry — ${businessName || `${firstName} ${lastName}`}`;
      const html = buildEmailHtml({ firstName, lastName, businessName, email, phone, businessType, fundingAmount, message });

      try {
        const resendRes = await fetch(RESEND_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            from:    NOTIFY_FROM,
            to:      NOTIFY_TO,
            subject,
            html,
          }),
        });

        const resendText = await resendRes.text();
        console.log('[contact] Resend status:', resendRes.status);
        console.log('[contact] Resend response:', resendText);

        if (!resendRes.ok) {
          // Log but don't fail the request — Airtable save already succeeded
          console.error('[contact] Resend failed (non-fatal):', resendText);
        } else {
          console.log('[contact] Notification email sent to', NOTIFY_TO);
        }
      } catch (emailErr) {
        console.error('[contact] Resend fetch error (non-fatal):', emailErr.message);
      }
    }

    return res.status(200).json({ success: true, id: responseJson?.id });

  } catch (err) {
    console.error('[contact] Error:', err.message, err.stack);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}

function buildEmailHtml({ firstName, lastName, businessName, email, phone, businessType, fundingAmount, message }) {
  const row = (label, value) => value
    ? `<tr>
        <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#6B7280;white-space:nowrap;vertical-align:top;width:160px;">${label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#111827;vertical-align:top;">${value}</td>
       </tr>`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0A0F1A,#0d1a30);padding:32px 36px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#00BFFF;">Carraway Business Group</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">New Form Submission</h1>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#FF6B35;padding:12px 36px;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;">
              📬 A new inquiry just came in — reply within 24 hours to hit your guarantee.
            </p>
          </td>
        </tr>

        <!-- Fields -->
        <tr>
          <td style="padding:24px 20px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
              ${row('First Name',      firstName)}
              ${row('Last Name',       lastName)}
              ${row('Business Name',   businessName)}
              ${row('Email',           `<a href="mailto:${email}" style="color:#00BFFF;text-decoration:none;">${email}</a>`)}
              ${row('Phone',           phone ? `<a href="tel:${phone}" style="color:#00BFFF;text-decoration:none;">${phone}</a>` : '')}
              ${row('Business Type',   businessType)}
              ${row('Funding Amount',  fundingAmount)}
              ${row('Message',         message ? `<span style="white-space:pre-wrap;">${message}</span>` : '')}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:24px 36px 36px;">
            <a href="mailto:${email}?subject=Re: Your Carraway Business Group Inquiry"
               style="display:inline-block;background:#00BFFF;color:#0A0F1A;font-size:14px;font-weight:800;
                      padding:14px 28px;border-radius:50px;text-decoration:none;">
              Reply to ${firstName} →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:20px 36px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              Submitted via carrawaygroup.com · Carraway Business Group · Arizona
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
