const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const pageUrl = 'https://unique-it-rho.vercel.app/';
const outputDir = path.join(__dirname, 'qr_codes');

async function generate() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Standard Black & White PNG (1200x1200px)
  const standardPng = path.join(outputDir, 'unique_it_vercel_qr_standard.png');
  await QRCode.toFile(standardPng, pageUrl, {
    errorCorrectionLevel: 'H',
    width: 1200,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  // 2. Ultra-clean Dark Branded PNG (1200x1200px)
  const brandedPng = path.join(outputDir, 'unique_it_vercel_qr_branded.png');
  await QRCode.toFile(brandedPng, pageUrl, {
    errorCorrectionLevel: 'H',
    width: 1200,
    margin: 2,
    color: {
      dark: '#030712',
      light: '#FFFFFF'
    }
  });

  // 3. Infinite Scalable SVG (Vector for Banner/Signboard)
  const svgPath = path.join(outputDir, 'unique_it_vercel_qr.svg');
  const svgStr = await QRCode.toString(pageUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });
  fs.writeFileSync(svgPath, svgStr, 'utf8');

  console.log('Generated QR codes for:', pageUrl);
  console.log(' - Standard PNG:', standardPng);
  console.log(' - Branded PNG:', brandedPng);
  console.log(' - SVG Vector:', svgPath);
}

generate().catch(console.error);
