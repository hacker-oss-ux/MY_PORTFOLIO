const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
console.log('Line 20:', lines[19]);
console.log('Line 22:', lines[21]);
console.log('Line 126:', lines[125]);
