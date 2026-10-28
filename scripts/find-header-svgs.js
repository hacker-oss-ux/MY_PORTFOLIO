const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const m1 = content.match(/<a href=\"\/\" class=\"block w-15 shrink-0 text-\(--header-text\) md:hidden\"[\s\S]*?<\/a>/);
if (m1) {
  console.log('Mobile logo link length:', m1[0].length);
  console.log(m1[0].slice(0, 150));
}

const m2 = content.match(/<a href=\"\/\" class=\"block w-\[calc\(1\.33_\*_var\(--scale\)\)\] shrink-0 text-\(--header-text\)\"[\s\S]*?<\/a>/);
if (m2) {
  console.log('Desktop logo link length:', m2[0].length);
  console.log(m2[0].slice(0, 150));
}
