const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace email occurrences
html = html.replace(/ajaygirish@gmail\.com/g, 'ajaygirish025@gmail.com');

// Menu social links
const oldMenuLinks = `<div class="flex flex-wrap gap-6 border-t border-[#5f5a54] pt-5 text-sm font-medium leading-[1.2] md:absolute md:bottom-(--vg) md:right-16 md:border-0 md:pt-0 md:text-[1.8vh]"> <a class="to-link-underline opacity-0 outline-none" href="https://wa.me/916238550283" aria-label="Instagram" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> WhatsApp </a><a class="to-link-underline opacity-0 outline-none" href="https://github.com/hacker-oss-ux" aria-label="Behance" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> GitHub </a><a class="to-link-underline opacity-0 outline-none" href="https://github.com/hacker-oss-ux" aria-label="Linkedin" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> Linkedin </a> </div>`;

const newMenuLinks = `<div class="flex flex-wrap gap-6 border-t border-[#5f5a54] pt-5 text-sm font-medium leading-[1.2] md:absolute md:bottom-(--vg) md:right-16 md:border-0 md:pt-0 md:text-[1.8vh]">
  <a class="to-link-underline opacity-0 outline-none" href="https://github.com/hacker-oss-ux" aria-label="GitHub" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> GitHub </a>
  <a class="to-link-underline opacity-0 outline-none" href="https://www.linkedin.com/in/ajay-girish-/" aria-label="LinkedIn" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> LinkedIn </a>
  <a class="to-link-underline opacity-0 outline-none" href="https://www.instagram.com/mr__cluche_r/" aria-label="Instagram" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> Instagram </a>
  <a class="to-link-underline opacity-0 outline-none" href="https://wa.me/916238550283" aria-label="WhatsApp" target="_blank" rel="noreferrer" data-to-link-underline data-social-link data-reveal-line> WhatsApp </a>
</div>`;

if (html.includes(oldMenuLinks)) {
  html = html.replace(oldMenuLinks, newMenuLinks);
  console.log('Replaced menu social links');
} else {
  console.warn('Old menu links not exact match, using regex');
  html = html.replace(
    /<div class=\"flex flex-wrap gap-6 border-t border-\[#5f5a54\][\s\S]*?<\/div>/,
    newMenuLinks
  );
}

// Footer social links
const newFooterLinks = `<nav class="flex flex-col gap-1 text-2xl font-medium leading-[1.2] md:absolute md:right-16 md:top-(--vg) md:flex-row md:flex-wrap md:gap-6 md:text-base" aria-label="Social">
  <a class="to-link-underline" href="https://github.com/hacker-oss-ux" aria-label="GitHub" target="_blank" rel="noreferrer" data-to-link-underline> GitHub </a>
  <a class="to-link-underline" href="https://www.linkedin.com/in/ajay-girish-/" aria-label="LinkedIn" target="_blank" rel="noreferrer" data-to-link-underline> LinkedIn </a>
  <a class="to-link-underline" href="https://www.instagram.com/mr__cluche_r/" aria-label="Instagram" target="_blank" rel="noreferrer" data-to-link-underline> Instagram </a>
  <a class="to-link-underline" href="https://wa.me/916238550283" aria-label="WhatsApp" target="_blank" rel="noreferrer" data-to-link-underline> WhatsApp </a>
</nav>`;

html = html.replace(
  /<nav class=\"flex flex-col gap-1 text-2xl font-medium leading-\[1\.2\] md:absolute md:right-16 md:top-\(--vg\) md:flex-row md:flex-wrap md:gap-6 md:text-base\" aria-label=\"Social\">[\s\S]*?<\/nav>/,
  newFooterLinks
);
console.log('Replaced footer social links');

fs.writeFileSync('index.html', html, 'utf8');

// 2. Update PRODUCT.md and other files
const files = [
  'PRODUCT.md',
  'src/components/ChapterFooter.jsx',
  'src/components/CommandPalette.jsx',
  'src/components/ContactSection.jsx',
  'src/components/EditorialHero.jsx',
  'src/components/EditorialRailHeader.jsx',
  'src/components/Header.jsx',
  'src/components/Hero.jsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let t = fs.readFileSync(f, 'utf8');
    t = t.replace(/ajaygirish@gmail\.com/g, 'ajaygirish025@gmail.com');
    t = t.replace(/https:\/\/linkedin\.com[^\s"']*/g, 'https://www.linkedin.com/in/ajay-girish-/');
    fs.writeFileSync(f, t, 'utf8');
    console.log(`Updated ${f}`);
  }
});

console.log('Finished updating contacts everywhere!');
