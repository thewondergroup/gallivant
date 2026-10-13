/**
 * Gallivant Littlestone Beach – Friends sign-up
 * Saves each sign-up from /gallivant-littlestone-beach/ to a Google Sheet and emails a notification.
 *
 * Setup: create a Google Sheet ("Littlestone Friends"), Extensions → Apps Script, paste this file,
 * set NOTIFY, then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Paste the web app URL into gallivant-littlestone-beach/index.html:  var GVED_FORM_ENDPOINT='';
 */
var NOTIFY = 'enquiries@thegallivant.co.uk';
var FIELDS = ['submitted_at', 'first_name', 'last_name', 'email', 'mobile', 'campaign', 'source', 'medium', 'content', 'landing_page'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return ContentService.createTextOutput('ok');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(FIELDS);
  sheet.appendRow(FIELDS.map(function (k) { return p[k] || ''; }));
  MailApp.sendEmail({
    to: NOTIFY,
    subject: 'New Friend of Gallivant Littlestone Beach: ' + [p.first_name, p.last_name].join(' ').trim(),
    body: FIELDS.filter(function (k) { return p[k]; }).map(function (k) { return k.replace(/_/g, ' ') + ': ' + p[k]; }).join('\n')
  });
  return ContentService.createTextOutput('ok');
}
