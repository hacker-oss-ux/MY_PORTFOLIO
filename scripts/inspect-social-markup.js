const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const m1 = content.match(/<div class=\"flex flex-wrap gap-6 border-t border-\[#5f5a54\][\s\S]*?<\/div>/);
if (m1) console.log('Menu social links:\n', m1[0]);

const m2 = content.match(/<nav class=\"flex flex-col gap-1 text-2xl font-medium leading-\[1\.2\] md:absolute md:right-16 md:top-\(--vg\) md:flex-row md:flex-wrap md:gap-6 md:text-base\" aria-label=\"Social\">[\s\S]*?<\/nav>/);
if (m2) console.log('Footer social links:\n', m2[0]);
