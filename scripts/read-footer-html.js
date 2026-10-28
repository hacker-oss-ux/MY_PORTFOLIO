const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('data-section="home-footer"');
if (start !== -1) {
  console.log(content.slice(start, start + 3000).replace(/<svg[\s\S]*?<\/svg>/g, '<SVG>'));
} else {
  console.log('home-footer not found');
}
