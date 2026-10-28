const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('data-section="home-clients"');
const end = content.indexOf('data-section="home-footer"');
console.log(content.slice(start, end));
