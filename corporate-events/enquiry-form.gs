/**
 * The Gallivant – corporate enquiry form
 * Saves each enquiry from /corporate-events/ to a Google Sheet and emails it.
 *
 * The form has two steps. Step 1 (name, email, guests, dates) creates the lead
 * and emails it straight away. Step 2 (company, phone, nights, budget, notes) is
 * optional and adds to the same row, using the lead_id, then emails the extra details.
 *
 * Setup (about 5 minutes):
 * 1. Create a Google Sheet, e.g. "Gallivant corporate enquiries".
 * 2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 * 3. Set NOTIFY below to Holly's email address (add more, separated by commas).
 * 4. Deploy → New deployment → type "Web app".
 *    Execute as: Me. Who has access: Anyone. Click Deploy and approve access.
 * 5. Copy the web app URL and paste it into corporate-events/index.html,
 *    in the line:  var GVED_FORM_ENDPOINT='';
 */
var NOTIFY = 'enquiries@thegallivant.co.uk';

var FIELDS = ['lead_id', 'submitted_at', 'name', 'email', 'guests', 'dates', 'company', 'phone',
  'nights', 'exclusive', 'budget', 'message', 'campaign', 'source', 'medium', 'content',
  'landing_page', 'referrer', 'step'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return ContentService.createTextOutput('ok'); // spam trap
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(FIELDS);
    var row = findRow(sheet, p.lead_id);
    if (row) {
      FIELDS.forEach(function (k, i) {
        if (p[k] && k !== 'submitted_at') sheet.getRange(row, i + 1).setValue(p[k]);
      });
    } else {
      sheet.appendRow(FIELDS.map(function (k) { return p[k] || ''; }));
    }
  } finally { lock.releaseLock(); }

  var body = FIELDS.filter(function (k) { return p[k] && k !== 'lead_id' && k !== 'step'; })
    .map(function (k) { return k.replace(/_/g, ' ') + ': ' + p[k]; }).join('\n');
  var who = p.name || p.email || 'website';
  MailApp.sendEmail({
    to: NOTIFY,
    replyTo: p.email || NOTIFY,
    subject: (p.step === '2' ? 'More details: ' : 'Corporate enquiry: ') + who +
      (p.company ? ' (' + p.company + ')' : '') + (p.campaign ? ' [' + p.campaign + ']' : ''),
    body: body
  });
  return ContentService.createTextOutput('ok');
}

function findRow(sheet, id) {
  if (!id || sheet.getLastRow() < 2) return 0;
  var ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) if (ids[i][0] === id) return i + 2;
  return 0;
}
