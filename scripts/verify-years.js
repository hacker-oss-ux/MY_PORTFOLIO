const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const strip = html.substring(html.indexOf('data-year-strip'), html.indexOf('<!-- Name hero'));
const parts = strip.split('<span class="year-strip-cell');
console.log('Total cells:', parts.length - 1);

parts.slice(1).forEach((p, idx) => {
  const text = p.replace(/<[^>]+>/g, '').trim();
  console.log(`Cell [${idx}]: "${text}"`);
});
