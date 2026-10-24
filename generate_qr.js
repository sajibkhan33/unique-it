const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const links = [
  {
    name: 'Facebook',
    id: 'facebook',
    url: 'https://www.facebook.com/share/1JM3a5LaEK/?mibextid=wwXIfr',
    color: {
      dark: '#0866FF',
      light: '#FFFFFF'
    }
  },
  {
    name: 'WhatsApp',
    id: 'whatsapp',
    url: 'https://wa.me/message/6SJXUJQS4BVCD1',
    color: {
      dark: '#25D366',
      light: '#FFFFFF'
    }
  }
];

async function generateQRCodes() {
  const outputDir = path.join(__dirname, 'qr_codes');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const item of links) {
    // 1. High Resolution Standard Black/White PNG (Best for printing)
    const pngPathBW = path.join(outputDir, `${item.id}_qr_standard.png`);
    await QRCode.toFile(pngPathBW, item.url, {
      errorCorrectionLevel: 'H',
      type: 'png',
      quality: 1,
      margin: 2,
      width: 1200,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // 2. High Resolution Branded Color PNG
    const pngPathColor = path.join(outputDir, `${item.id}_qr_branded.png`);
    await QRCode.toFile(pngPathColor, item.url, {
      errorCorrectionLevel: 'H',
      type: 'png',
      quality: 1,
      margin: 2,
      width: 1200,
      color: {
        dark: item.color.dark,
        light: item.color.light
      }
    });

    // 3. Vector SVG (Scalable to ANY size without losing quality, ideal for banners/flyers)
    const svgPath = path.join(outputDir, `${item.id}_qr.svg`);
    const svgString = await QRCode.toString(item.url, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    fs.writeFileSync(svgPath, svgString, 'utf8');

    console.log(`Generated QR codes for ${item.name}:`);
    console.log(` - Standard PNG (1200x1200px): ${pngPathBW}`);
    console.log(` - Branded Color PNG (1200x1200px): ${pngPathColor}`);
    console.log(` - Scalable Vector SVG: ${svgPath}`);
  }
}

generateQRCodes().catch(err => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
