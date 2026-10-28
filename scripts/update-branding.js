const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace mobile SVG logo
const mobileSvgRegex = /<a href=\"\/\" class=\"block w-15 shrink-0 text-\(--header-text\) md:hidden\" aria-label=\"Back to home\">[\s\S]*?<\/a>/;
const mobileReplacement = `<a href="/" class="block shrink-0 text-(--header-text) select-none outline-none md:hidden" aria-label="Back to home">
  <span class="text-xs font-semibold uppercase tracking-[0.18em] font-sans text-current">AJAY GIRISH</span>
</a>`;

if (mobileSvgRegex.test(html)) {
  html = html.replace(mobileSvgRegex, mobileReplacement);
  console.log('Replaced mobile SVG logo');
} else {
  console.warn('Mobile SVG logo regex failed');
}

// 2. Replace desktop SVG logo
const desktopSvgRegex = /<a href=\"\/\" class=\"block w-\[calc\(1\.33_\*_var\(--scale\)\)\] shrink-0 text-\(--header-text\)\" aria-label=\"Back to home\">[\s\S]*?<\/a>/;
const desktopReplacement = `<a href="/" class="block shrink-0 text-(--header-text) select-none outline-none" aria-label="Back to home">
  <span class="vt-rl vt-reading-up text-[calc(1.1_*_var(--scale))] font-medium uppercase tracking-[0.22em] font-sans text-current">AJAY GIRISH™</span>
</a>`;

if (desktopSvgRegex.test(html)) {
  html = html.replace(desktopSvgRegex, desktopReplacement);
  console.log('Replaced desktop SVG logo');
} else {
  console.warn('Desktop SVG logo regex failed');
}

// 3. Replace Vietnam in tagline
if (html.includes('Independent designer based in Vietnam — focused on thoughtful, considered')) {
  html = html.replace(
    /Independent designer based in Vietnam — focused on thoughtful, considered\s*digital work\./g,
    'Independent systems builder and BCA scholar in Kerala — crafting physical computing bridges and streaming runtimes.'
  );
  console.log('Replaced Vietnam tagline');
}

// 4. Replace HCMC, Vietnam and GMT+7
if (html.includes('HCMC, Vietnam')) {
  html = html.replace(/HCMC, Vietnam/g, 'Kerala, India');
  console.log('Replaced HCMC, Vietnam with Kerala, India');
}

if (html.includes('(GMT+7)')) {
  html = html.replace(/\(GMT\+7\)/g, '(GMT+5:30)');
  console.log('Replaced (GMT+7) with (GMT+5:30)');
}

// 5. Replace LinkedIn URL
if (html.includes('https://www.linkedin.com/in/khanh-nguyen-6b47a3177/')) {
  html = html.replace(/https:\/\/www\.linkedin\.com\/in\/khanh-nguyen-6b47a3177\//g, 'https://github.com/hacker-oss-ux');
  console.log('Replaced LinkedIn URL');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully written index.html!');
