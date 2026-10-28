const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('data-start-year="2013"')) {
  console.error('Could not find data-start-year="2013"');
  process.exit(1);
}
html = html.replace('data-start-year="2013"', 'data-start-year="2006"');

let yearsMarkup = '<span class="year-strip-cell flex h-[1em] items-center leading-none tabular-nums"> <span class="flex h-full min-w-0 max-w-full items-center overflow-hidden [&_.char]:inline-block" data-year-start-line> <span class="block whitespace-nowrap leading-none" data-year-start-text> 06 </span> </span> </span>';
for (let yr = 7; yr <= 26; yr++) {
  const s = yr < 10 ? '0' + yr : '' + yr;
  yearsMarkup += `<span class="year-strip-cell flex h-[1em] items-center leading-none tabular-nums">${s}</span>`;
}

const oldStripRegex = /<div data-year-strip class="translate-z-0">[\s\S]*?<\/div>/;
const match = html.match(oldStripRegex);
if (!match) {
  console.error('Could not match oldStripRegex');
  process.exit(1);
}

const newStrip = '<div data-year-strip class="translate-z-0"> ' + yearsMarkup + ' </div>';
html = html.replace(oldStripRegex, newStrip);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html to start from 2006');

// 2. Update Loading JS bundle
let js = fs.readFileSync('public/_astro/Loading.astro_astro_type_script_index_0_lang.zYvD-WGL.js', 'utf8');
js = js.replaceAll('dataset.startYear??"2013"', 'dataset.startYear??"2006"');
fs.writeFileSync('public/_astro/Loading.astro_astro_type_script_index_0_lang.zYvD-WGL.js', js, 'utf8');
console.log('Successfully updated Loading JS bundle fallback to 2006');
