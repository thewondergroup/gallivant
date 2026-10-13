/**
 * Gallivant Littlestone Beach – Friends sign-up
 * Saves each sign-up from /gallivant-littlestone-beach/ to a Google Sheet.
 *
 * Sign-up has two steps. Step 1 (just an email, from the hero or the Friends section)
 * creates the row straight away. Step 2 is optional (name, mobile, when they might come,
 * who with, what they're interested in) and fills in the same row, matched on lead_id.
 *
 * Setup (about 5 minutes):
 * 1. Create a Google Sheet, e.g. "Littlestone Friends".
 * 2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 * 3. Optional: set NOTIFY to an email address to get an email for every new Friend.
 *    Leave it as '' for no emails (the sheet still fills up).
 * 4. Deploy → New deployment → type "Web app".
 *    Execute as: Me. Who has access: Anyone. Click Deploy and approve access.
 * 5. Copy the web app URL and paste it into gallivant-littlestone-beach/index.html,
 *    in the line:  var GVED_FORM_ENDPOINT='';
 *
 * The sheet can be exported as CSV and imported into the mailing list tool,
 * or connected to it directly.
 */
var NOTIFY = '';

var FIELDS = ['lead_id', 'submitted_at', 'updated_at', 'email', 'first_name', 'last_name', 'mobile',
  'when', 'party', 'interests', 'form', 'mode', 'step', 'consent',
  'campaign', 'source', 'medium', 'content', 'landing_page', 'referrer'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return ContentService.createTextOutput('ok'); // spam trap
  var now = new Date().toISOString();
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  var isNew = false;
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(FIELDS);
    var row = findRow(sheet, p.lead_id);
    if (row) {
      p.updated_at = now;
      FIELDS.forEach(function (k, i) {
        if (p[k] && k !== 'submitted_at' && k !== 'form') sheet.getRange(row, i + 1).setValue(p[k]);
      });
    } else {
      isNew = true;
      p.submitted_at = p.submitted_at || now;
      sheet.appendRow(FIELDS.map(function (k) { return p[k] || ''; }));
    }
  } finally { lock.releaseLock(); }

  if (NOTIFY) {
    var body = FIELDS.filter(function (k) { return p[k] && k !== 'lead_id'; })
      .map(function (k) { return k.replace(/_/g, ' ') + ': ' + p[k]; }).join('\n');
    MailApp.sendEmail({
      to: NOTIFY,
      subject: (isNew ? 'New Friend of Gallivant Littlestone Beach: ' : 'Friend details: ') +
        ([p.first_name, p.last_name].join(' ').trim() || p.email || ''),
      body: body
    });
  }
  return ContentService.createTextOutput('ok');
}

function findRow(sheet, id) {
  if (!id || sheet.getLastRow() < 2) return 0;
  var ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) if (ids[i][0] === id) return i + 2;
  return 0;
}
