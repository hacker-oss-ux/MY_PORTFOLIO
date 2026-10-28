const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('data-section="home-about"');
const end = content.indexOf('data-section="home-work"');
console.log(content.slice(start, end));
