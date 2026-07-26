const fs = require('fs');
const path = require('path');

const src1 = 'C:\\Users\\isaac\\.gemini\\antigravity-ide\\brain\\08f46f66-8f28-4b9b-b8d6-3889748ca239\\showcase_iphone16pro_1785022385238.png';
const dest1 = path.join(__dirname, '..', '..', 'public', 'showcase_iphone16pro.png');

const src2 = 'C:\\Users\\isaac\\.gemini\\antigravity-ide\\brain\\08f46f66-8f28-4b9b-b8d6-3889748ca239\\showcase_smartwatch_1785022398135.png';
const dest2 = path.join(__dirname, '..', '..', 'public', 'showcase_smartwatch.png');

if (fs.existsSync(src1)) {
  fs.copyFileSync(src1, dest1);
  console.log('Copied src1 to dest1');
}

if (fs.existsSync(src2)) {
  fs.copyFileSync(src2, dest2);
  console.log('Copied src2 to dest2');
}
