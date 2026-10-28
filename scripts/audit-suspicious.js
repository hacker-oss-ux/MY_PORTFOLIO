const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const suspicious = [
  'vietnam', 'hcmc', 'saigon', 'hanoi', 'khanh', 'nguyen',
  'figma', 'webflow', 'framer', 'trusting', 'autonomous', 'ven agency', 'glass egg',
  'evo money', 'plant tag', 'swiss haus', 'betahaus',
  'football, watches, aquariums'
];

suspicious.forEach(word => {
  const reg = new RegExp(word, 'gi');
  const count = (content.match(reg) || []).length;
  if (count > 0) {
    console.log(`Found "${word}": ${count} times`);
  }
});
