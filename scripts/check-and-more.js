const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('data-client-more');
console.log(content.slice(start - 200, start + 400));
