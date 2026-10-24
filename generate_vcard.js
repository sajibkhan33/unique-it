const QRCode = require('qrcode');
const path = require('path');

const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Unique IT
ORG:Unique IT
NOTE:Facebook & WhatsApp
URL;TYPE=Facebook:https://www.facebook.com/share/1JM3a5LaEK/?mibextid=wwXIfr
URL;TYPE=WhatsApp:https://wa.me/message/6SJXUJQS4BVCD1
END:VCARD`;

const outputPath = path.join(__dirname, 'qr_codes', 'vcard_combo_qr.png');
QRCode.toFile(outputPath, vcard, {
  errorCorrectionLevel: 'M',
  width: 1200,
  margin: 2
}).then(() => {
  console.log('vcard QR generated:', outputPath);
}).catch(err => {
  console.error(err);
});
