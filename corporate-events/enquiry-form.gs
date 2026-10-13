/**
 * The Gallivant – corporate enquiry form
 * Saves each enquiry from /corporate-events/ to a Google Sheet and emails it.
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

var FIELDS = ['submitted_at', 'first_name', 'last_name', 'company', 'email', 'phone', 'guests',
  'nights', 'exclusive', 'dates', 'budget', 'message', 'campaign', 'source', 'medium', 'content',
  'landing_page', 'referrer'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return ContentService.createTextOutput('ok'); // spam trap

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(FIELDS);
  sheet.appendRow(FIELDS.map(function (k) { return p[k] || ''; }));

  var name = [p.first_name, p.last_name].join(' ').trim();
  var body = FIELDS.filter(function (k) { return p[k]; })
    .map(function (k) { return k.replace(/_/g, ' ') + ': ' + p[k]; }).join('\n');
  MailApp.sendEmail({
    to: NOTIFY,
    replyTo: p.email || NOTIFY,
    subject: 'Corporate enquiry: ' + (p.company || name) + (p.campaign ? ' (from ' + p.campaign + ')' : ''),
    body: body
  });
  return ContentService.createTextOutput('ok');
}
