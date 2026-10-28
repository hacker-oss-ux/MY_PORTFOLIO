const fs = require('fs');
const path = require('path');

const terms = ['khanh', 'nguyen', 'vietnam', 'hcmc', 'saigon', 'hanoi', 'ho_chi_minh', 'trusting-social', 'trusting social', 'vietnamwork'];

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === '.taste-skill') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scan(full);
    } else if (/\.(html|js|mjs|jsx|css|json|svg|astro|md)$/i.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      terms.forEach(term => {
        const regex = new RegExp(term, 'gi');
        const matches = [...content.matchAll(regex)];
        if (matches.length > 0) {
          console.log(`Found ${matches.length} matches for '${term}' in ${full}`);
        }
      });
    }
  }
}

scan('.');
