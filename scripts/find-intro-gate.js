const fs = require('fs');
const path = require('path');
const dir = 'public/_astro';
for (const file of fs.readdirSync(dir)) {
  if (file.endsWith('.js')) {
    const txt = fs.readFileSync(path.join(dir, file), 'utf8');
    if (txt.includes('loadingIntroGate')) {
      console.log('Imports loadingIntroGate in:', file);
      const matches = [...txt.matchAll(/import\{([^}]+)\}from["'][^"']*loadingIntroGate[^"']*["']/g)];
      matches.forEach(m => console.log('   imported symbols:', m[1]));
    }
  }
}
