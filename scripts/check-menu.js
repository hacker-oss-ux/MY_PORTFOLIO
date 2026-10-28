const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const menuMatch = content.match(/<dialog[^>]*id=\"fullscreen-menu\"[\s\S]*?<\/dialog>/i);
if (menuMatch) {
  console.log(menuMatch[0].replace(/<svg[\s\S]*?<\/svg>/g, '<SVG>'));
} else {
  console.log('Menu not found');
}
