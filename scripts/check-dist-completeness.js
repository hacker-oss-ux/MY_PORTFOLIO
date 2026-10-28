const fs = require('fs');

const html = fs.readFileSync('dist/index.html', 'utf8');
const assets = [...html.matchAll(/(?:src|href)=["'](\/[^"']+)["']/g)].map(m => m[1]);
console.log('Total asset references in dist/index.html:', assets.length);

const missing = [];
assets.forEach(a => {
  // strip query or hash
  const clean = a.split('?')[0].split('#')[0];
  const localPath = 'dist' + clean;
  if (!fs.existsSync(localPath)) {
    missing.push({ asset: a, localPath });
  }
});

console.log('Missing assets in dist:', missing.length);
if (missing.length > 0) {
  missing.forEach(m => console.log('  Missing:', m.asset, '->', m.localPath));
}
