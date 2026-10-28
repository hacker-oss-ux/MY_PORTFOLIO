const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const headerMatch = content.match(/<header[\s\S]*?<\/header>/i)[0];
const links = [...headerMatch.matchAll(/<a[\s\S]*?<\/a>/gi)];
links.forEach((l, i) => {
  console.log(`Link ${i}:`);
  console.log(l[0].slice(0, 300));
});
