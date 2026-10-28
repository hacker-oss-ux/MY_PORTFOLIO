const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const headerMatch = content.match(/<header[\s\S]*?<\/header>/i)[0];
// replace the big svgs with a placeholder to read the structure
const clean = headerMatch.replace(/<svg[\s\S]*?<\/svg>/g, '<SVG_PLACEHOLDER>');
console.log(clean);
