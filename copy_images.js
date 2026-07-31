const fs = require('fs');

try {
  fs.copyFileSync(
    'C:\\Users\\isaac\\.gemini\\antigravity-ide\\brain\\51b2ab73-cd89-4445-8b4e-ffbed956cee9\\store_front_1785456826265.png',
    'c:\\Users\\isaac\\Desktop\\koforidua-store\\public\\store_front.png'
  );
  fs.copyFileSync(
    'C:\\Users\\isaac\\.gemini\\antigravity-ide\\brain\\51b2ab73-cd89-4445-8b4e-ffbed956cee9\\store_interior_1785456923830.png',
    'c:\\Users\\isaac\\Desktop\\koforidua-store\\public\\store_interior.png'
  );
  console.log('Images copied successfully.');
} catch (e) {
  console.error('Error copying images', e);
}
