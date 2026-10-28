const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Print lines with "Figma"
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (/figma|webflow|framer|trusting|vietnam/i.test(l)) {
    console.log(`Line ${i+1}: ${l.slice(0, 140)}`);
  }
});
