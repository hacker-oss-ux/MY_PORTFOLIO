const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

if (!html.includes('id="about"')) {
  html = html.replace('data-section="home-about"', 'id="about" data-section="home-about"');
  console.log('Added id="about"');
}

if (!html.includes('id="works"')) {
  html = html.replace('data-section="home-work"', 'id="works" data-section="home-work"');
  console.log('Added id="works"');
}

fs.writeFileSync('index.html', html, 'utf8');
