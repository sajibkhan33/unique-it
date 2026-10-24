const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const pageUrl = 'https://sajibkhan33.github.io/unique-it/';
const outputDir = path.join(__dirname, 'qr_codes');

async function generate() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Standard Black/White 1200px
  const standardPng = path.join(outputDir, 'unique_it_qr_standard.png');
  await QRCode.toFile(standardPng, pageUrl, {
    errorCorrectionLevel: 'H',
    width: 1200,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  // 2. Branded Blue 1200px
  const brandedPng = path.join(outputDir, 'unique_it_qr_branded.png');
  await QRCode.toFile(brandedPng, pageUrl, {
    errorCorrectionLevel: 'H',
    width: 1200,
    margin: 2,
    color: {
      dark: '#0F172A',
      light: '#FFFFFF'
    }
  });

  // 3. Scalable SVG Vector
  const svgPath = path.join(outputDir, 'unique_it_qr.svg');
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

  console.log('GitHub Pages QR codes generated successfully for:', pageUrl);
  console.log('Standard PNG:', standardPng);
  console.log('Branded PNG:', brandedPng);
  console.log('SVG Vector:', svgPath);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
