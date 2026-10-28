const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('data-section=\"home-work\"');
const end = content.indexOf('data-section=\"home-services\"');
console.log(content.slice(start, end !== -1 ? end : start + 3000));
