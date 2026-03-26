// Vercel serverless function: POST /api/apply
// Creates an Airtable record and sends a Resend email notification.
//
// Required env vars:
//   AIRTABLE_API_KEY   — Airtable personal access token
//   AIRTABLE_TABLE_ID  — Table ID from Airtable API docs (e.g. tblXXXXXXXXXXXXXX)
//                        Go to airtable.com/appf20RCOmCyu8BEx/api/docs → Applications table
//   RESEND_API_KEY     — Resend API key

const AIRTABLE_BASE_ID = 'appf20RCOmCyu8BEx';
// Prefer the explicit table ID env var; fall back to name only as last resort
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_ID || 'Applications';

function generateAppId() {
  return 'CBG-' + String(Math.floor(100000 + Math.random() * 900000));
}

function formatCurrency(val) {
  if (!val) return '';
  const n = parseInt(String(val).replace(/[^0-9]/g, ''), 10);
  return isNaN(n) ? val : '$' + n.toLocaleString();
}

async function createAirtableRecord(fields) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  const body = JSON.stringify({ fields });

  console.log('[Airtable] POST', url);
  console.log('[Airtable] Fields being sent:', JSON.stringify(fields, null, 2));
  console.log('[Airtable] API key present:', !!process.env.AIRTABLE_API_KEY);
  console.log('[Airtable] API key prefix:', process.env.AIRTABLE_API_KEY ? process.env.AIRTABLE_API_KEY.slice(0, 8) + '...' : 'MISSING');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  const responseText = await res.text();
  console.log('[Airtable] Response status:', res.status, res.statusText);
  console.log('[Airtable] Response body:', responseText);

  if (!res.ok) {
    throw new Error(`Airtable ${res.status} ${res.statusText}: ${responseText}`);
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
}

async function sendResendEmail(applicationId, payload) {
  const ownerName = payload.owners && payload.owners.length > 0
    ? [payload.owners[0].firstName, payload.owners[0].lastName].filter(Boolean).join(' ')
    : '—';

  const ownersHtml = (payload.owners || []).map((o, i) => `
    <tr><td colspan="2" style="padding:12px 0 4px;font-weight:700;color:#00BFFF">Owner ${i + 1}</td></tr>
    <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Name</td><td>${[o.firstName, o.mi, o.lastName].filter(Boolean).join(' ')}</td></tr>
    <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Email</td><td>${o.email || '—'}</td></tr>
    <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Phone</td><td>${o.phone || '—'}</td></tr>
    <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Ownership</td><td>${o.ownership ? o.ownership + '%' : '—'}</td></tr>
    <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">DOB</td><td>${o.dob || '—'}</td></tr>
    <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Address</td><td>${[o.street, o.city, o.state, o.zip].filter(Boolean).join(', ') || '—'}</td></tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Inter,Arial,sans-serif;background:#0A0F1A;color:#E5E7EB;margin:0;padding:0">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px">
    <div style="background:#111827;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:32px">
      <h1 style="font-size:22px;font-weight:900;margin:0 0 4px;color:#ffffff">New Application Received</h1>
      <p style="color:#6B7280;font-size:14px;margin:0 0 24px">Submitted via gocarraway.com</p>

      <div style="background:rgba(0,191,255,.08);border:2px solid rgba(0,191,255,.3);border-radius:10px;padding:14px 20px;margin-bottom:24px;text-align:center">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6B7280;margin-bottom:4px">Application ID</div>
        <div style="font-size:22px;font-weight:900;color:#00BFFF;letter-spacing:.08em">${applicationId}</div>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td colspan="2" style="padding:0 0 8px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#6B7280;border-bottom:1px solid rgba(255,255,255,.08)">Business Information</td></tr>
        <tr><td style="color:#9CA3AF;padding:8px 16px 4px 0;width:160px">Business Name</td><td style="font-weight:600;color:#ffffff">${payload.businessName || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">DBA</td><td>${payload.dba || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Entity Type</td><td>${payload.entityType || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Industry</td><td>${payload.industry || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Date Started</td><td>${payload.startDate || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">EIN</td><td>${payload.ein || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Address</td><td>${payload.address || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Phone</td><td>${payload.phone || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Email</td><td>${payload.email || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Website</td><td>${payload.website || '—'}</td></tr>

        <tr><td colspan="2" style="padding:16px 0 8px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#6B7280;border-bottom:1px solid rgba(255,255,255,.08)">Owner Information</td></tr>
        ${ownersHtml}

        <tr><td colspan="2" style="padding:16px 0 8px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#6B7280;border-bottom:1px solid rgba(255,255,255,.08)">Financial Information</td></tr>
        <tr><td style="color:#9CA3AF;padding:8px 16px 4px 0">Monthly Revenue</td><td>${formatCurrency(payload.monthlyRevenue)}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Annual Revenue</td><td>${formatCurrency(payload.annualRevenue)}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Monthly Expenses</td><td>${formatCurrency(payload.monthlyExpenses)}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Current Debt</td><td>${formatCurrency(payload.currentDebt)}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Existing Loans/MCAs</td><td>${payload.hasLoans || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Bank Name</td><td>${payload.bankName || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Account Age</td><td>${payload.bankAccountAge || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Avg Bank Balance</td><td>${formatCurrency(payload.avgBankBalance)}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">NSF / Overdrafts</td><td>${payload.nsfOverdrafts || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Bankruptcy</td><td>${payload.bankruptcy || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Credit Score</td><td>${payload.creditScoreRange || '—'}</td></tr>

        <tr><td colspan="2" style="padding:16px 0 8px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#6B7280;border-bottom:1px solid rgba(255,255,255,.08)">Funding Request</td></tr>
        <tr><td style="color:#9CA3AF;padding:8px 16px 4px 0">Funding Amount</td><td style="font-weight:700;color:#00BFFF;font-size:16px">${formatCurrency(payload.fundingAmount)}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Use of Funds</td><td>${payload.useOfFunds || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Loan Type</td><td>${payload.useOfFunds || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Timeline</td><td>${payload.fundingTimeline || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Applied Elsewhere</td><td>${payload.appliedElsewhere || '—'}</td></tr>
        <tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">How Heard</td><td>${payload.referral || '—'}</td></tr>
        ${payload.fundingDescription ? `<tr><td style="color:#9CA3AF;padding:4px 16px 4px 0">Details</td><td>${payload.fundingDescription}</td></tr>` : ''}
      </table>

      <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08);text-align:center">
        <p style="color:#6B7280;font-size:12px;margin:0">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} MST · Carraway Business Group</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Carraway Applications <notifications@gocarraway.com>',
      to: ['Ben@gocarraway.com'],
      subject: `New Application — ${payload.businessName || 'Unknown'} — ${formatCurrency(payload.fundingAmount)}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    // Log but don't fail the whole request — Airtable record is already saved
    console.error(`Resend error ${res.status}: ${text}`);
  }
}

export default async function handler(req, res) {
  // Outer catch-all — ensures every uncaught error is logged with full stack
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('[apply] Handler invoked');
    console.log('[apply] AIRTABLE_TABLE resolved to:', AIRTABLE_TABLE);
    console.log('[apply] AIRTABLE_TABLE_ID env var:', process.env.AIRTABLE_TABLE_ID || '(not set — using name fallback)');

    if (!process.env.AIRTABLE_API_KEY) {
      console.error('[apply] FATAL: AIRTABLE_API_KEY env var is not set');
      return res.status(500).json({ error: 'Server configuration error. Please contact Ben@gocarraway.com.' });
    }

    let payload;
    try {
      payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (parseErr) {
      console.error('[apply] Body parse error:', parseErr.message);
      return res.status(400).json({ error: 'Invalid request body.' });
    }

    console.log('[apply] Payload keys received:', Object.keys(payload || {}));

    const applicationId = generateAppId();
    const submittedDate = new Date().toISOString().split('T')[0];

    // Owner details — folded into Internal Notes
    const owner = payload.owners && payload.owners.length > 0 ? payload.owners[0] : {};
    const ownerName  = [owner.firstName, owner.lastName].filter(Boolean).join(' ');
    const ownerEmail = owner.email || '';
    const ownerPhone = owner.phone || '';

    // Currency fields — Airtable expects plain numbers for currency field type
    const toInt = v => v ? parseInt(String(v).replace(/[^0-9]/g, ''), 10) || 0 : 0;
    const fundingAmountRaw  = toInt(payload.fundingAmount);
    const monthlyRevenueRaw = toInt(payload.monthlyRevenue);

    // Time in Business — derive from business start date
    // Bucket labels must match the exact single-select options in Airtable.
    // If these don't match, set AIRTABLE_TABLE_ID correctly and check field options.
    function calcTimeInBusiness(startDateStr) {
      if (!startDateStr) return '';
      const months = (Date.now() - new Date(startDateStr).getTime()) / (1000 * 60 * 60 * 24 * 30.44);
      if (months < 12)  return 'Less than 1 year';
      if (months < 24)  return '1-2 years';
      if (months < 60)  return '2-5 years';
      return '5+ years';
    }

    // Use of Funds / Loan Type — form is multi-select, Airtable fields are single-select.
    // Take the first selected value; omit entirely if empty to avoid INVALID_VALUE errors.
    const useOfFundsFirst = payload.useOfFunds
      ? String(payload.useOfFunds).split(',')[0].trim()
      : '';

    // Internal Notes — long text, no type restrictions
    const internalNotes = [
      `Application ID: ${applicationId}`,
      ownerName  ? `Owner Name: ${ownerName}`   : null,
      ownerEmail ? `Email: ${ownerEmail}`        : null,
      ownerPhone ? `Phone: ${ownerPhone}`        : null,
      payload.owners && payload.owners.length > 1
        ? `Additional owners: ${payload.owners.slice(1)
            .map(o => [o.firstName, o.lastName].filter(Boolean).join(' ')).join(', ')}`
        : null,
    ].filter(Boolean).join('\n');

    // Helper — omit a key entirely if value is empty string/null/undefined,
    // preventing INVALID_VALUE_FOR_COLUMN on single-select fields.
    function ifPresent(val) { return (val !== '' && val != null) ? val : undefined; }

    const airtableFields = {
      'Business Name':            payload.businessName || '',
      'Status':                   'New',
      'Funding Amount Requested': fundingAmountRaw,
      'Loan Type':                ifPresent(useOfFundsFirst),
      'Time in Business':         ifPresent(calcTimeInBusiness(payload.startDate)),
      'Monthly Revenue':          monthlyRevenueRaw,
      'Credit Score Range':       ifPresent(payload.creditScoreRange),
      'Use of Funds':             ifPresent(useOfFundsFirst),
      'Submitted Date':           submittedDate,
      'Internal Notes':           internalNotes,
    };

    // Strip undefined values before sending
    const cleanFields = Object.fromEntries(
      Object.entries(airtableFields).filter(([, v]) => v !== undefined)
    );

    console.log('[apply] Application ID:', applicationId);
    console.log('[apply] Fields being sent to Airtable:', JSON.stringify(cleanFields, null, 2));

    try {
      const record = await createAirtableRecord(cleanFields);
      console.log('[apply] Airtable record created. Record ID:', record.id);
    } catch (airtableErr) {
      console.error('[apply] Airtable error:', airtableErr.message);
      return res.status(500).json({ error: 'Failed to save your application. Please try again or contact Ben@gocarraway.com.' });
    }

    // Email notification — failure is logged but does not fail the request
    try {
      await sendResendEmail(applicationId, payload);
    } catch (emailErr) {
      console.error('[apply] Resend error:', emailErr.message);
    }

    return res.status(200).json({ applicationId });

  } catch (unexpectedErr) {
    // Catches anything not handled above — runtime errors, etc.
    console.error('[apply] UNEXPECTED ERROR:', unexpectedErr.message);
    console.error('[apply] Stack trace:', unexpectedErr.stack);
    return res.status(500).json({ error: 'An unexpected error occurred. Please contact Ben@gocarraway.com.' });
  }
}
