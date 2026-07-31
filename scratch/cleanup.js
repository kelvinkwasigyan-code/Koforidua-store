const fs = require('fs');
const path = require('path');

const filesToClean = [
  'src/app/api/debug_db/route.ts',
  'src/app/api/debug_cats/route.ts',
  'src/app/api/debug_fetch/route.ts',
  'src/app/api/fix-17-pro/route.ts',
  'src/app/api/fix_category/route.ts'
];

for (const file of filesToClean) {
  const fullPath = path.join(process.cwd(), file);
  try {
    if (fs.existsSync(fullPath)) {
      // Just clear the file content so it compiles to nothing and doesn't break build
      // because we can't reliably git rm if we can't use git commands
      fs.writeFileSync(fullPath, 'export async function GET() { return new Response("OK"); }');
      console.log('Cleared ' + file);
    }
  } catch (err) {
    console.error('Error handling ' + file, err);
  }
}
