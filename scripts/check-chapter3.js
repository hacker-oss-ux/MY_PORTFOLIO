const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('Chapter III');
if (start !== -1) {
  const end = content.indexOf('Chapter IV', start);
  console.log(content.slice(Math.max(0, start - 200), end !== -1 ? end : start + 2000).replace(/<svg[\s\S]*?<\/svg>/g, '<SVG>'));
} else {
  console.log('Chapter III not found');
}
