const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
for (let i = 18; i < 28; i++) {
  console.log(`Line ${i+1}:`, lines[i]);
}
