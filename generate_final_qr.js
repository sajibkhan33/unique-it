const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const finalUrl = 'https://unique-it-official.vercel.app/';
const outputDir = path.join(__dirname, 'qr_codes');

async function generateFinalQRCodes() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. High-Res Standard Black & White (1200x1200px) - Level H (30% Damage recovery)
  const standardPng = path.join(outputDir, 'unique_it_official_qr_standard.png');
  await QRCode.toFile(standardPng, finalUrl, {
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

  // 2. High-Res Branded Dark (1200x1200px)
  const brandedPng = path.join(outputDir, 'unique_it_official_qr_branded.png');
  await QRCode.toFile(brandedPng, finalUrl, {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 1,
    margin: 2,
    width: 1200,
    color: {
      dark: '#090D16',
      light: '#FFFFFF'
    }
  });

  // 3. Scalable Vector SVG (Infinite Resolution for Large Banners/Signboards)
  const svgPath = path.join(outputDir, 'unique_it_official_qr.svg');
  const svgStr = await QRCode.toString(finalUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });
  fs.writeFileSync(svgPath, svgStr, 'utf8');

  console.log('Final QR codes generated successfully for:', finalUrl);
  console.log(' - Standard PNG:', standardPng);
  console.log(' - Branded PNG:', brandedPng);
  console.log(' - Scalable SVG:', svgPath);
}

generateFinalQRCodes().catch(err => {
  console.error(err);
  process.exit(1);
});
