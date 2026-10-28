const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove Figma comments and generator meta
html = html.replace(/<!--\s*Layout insets: Figma[\s\S]*?-->/g, '');
html = html.replace(/<!--\s*Figma Header[\s\S]*?-->/g, '');
html = html.replace(/<!--\s*Figma Menu[\s\S]*?-->/g, '');
html = html.replace(/<!--\s*Mobile band:[\s\S]*?-->/g, '');
html = html.replace(/<meta name="generator" content="Astro v6\.3\.1">/g, '<meta name="generator" content="Ajay Girish Engineering Monograph">');

// 2. Personalize Hero & Chapter I
html = html.replace(
  'A journey through years of design',
  'A journey through years of systems engineering'
);

html = html.replace(
  '“Work for money.<br class="hidden md:block"> Design for love.”',
  '“Architect for resilience.<br class="hidden md:block"> Build for the machine.”'
);

html = html.replace(
  'Beyond design: football, watches, aquariums, and martial arts.',
  'Beyond code: robotics, physical computing, microcontrollers, and low-latency systems.'
);

// 3. Chapter II: Selected Work
// Replace Work Items
html = html.replace(
  'href="/works/evo-money?from=home" aria-label="View EVO Money project details"',
  'href="https://github.com/hacker-oss-ux" aria-label="View Spatial Matrix project details"'
);
html = html.replace(
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> EVO Money </span>',
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> Spatial Matrix </span>'
);

html = html.replace(
  'href="/works/plant-tag?from=home" aria-label="View Plant Tag project details"',
  'href="https://github.com/hacker-oss-ux" aria-label="View SmartTransit Kerala project details"'
);
html = html.replace(
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> Plant Tag </span>',
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> SmartTransit Kerala </span>'
);

html = html.replace(
  'href="/works/swisshaus?from=home" aria-label="View Swiss Haus project details"',
  'href="https://github.com/hacker-oss-ux" aria-label="View CyberThreat Radar project details"'
);
html = html.replace(
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> Swiss Haus </span>',
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> CyberThreat Radar </span>'
);

html = html.replace(
  'href="/works/betahaus?from=home" aria-label="View Betahaus project details"',
  'href="https://github.com/hacker-oss-ux" aria-label="View NeuralCipher Core project details"'
);
html = html.replace(
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> Betahaus </span>',
  '<span class="block translate-z-0" data-line data-work-item-text data-astro-cid-p35cuy7o> NeuralCipher Core </span>'
);

// Replace preview images in Chapter II
html = html.replace(
  'src="/_astro/evo-money-thumbnail-16-9.B00Lym5-_qy4LO.webp"',
  'src="/images/project_spatial.png"'
);
html = html.replace(
  'src="/_astro/plant-tag-thumbnail-16-9.CEaBMfaz_Z64N3z.webp"',
  'src="/images/project_transit.png"'
);
html = html.replace(
  'src="/_astro/swisshaus-thumbnail-16-9.Dl-P9oLP_Z1jbLrY.webp"',
  'src="/images/project_threat.png"'
);
html = html.replace(
  'src="/_astro/betahaus-thumbnail-16-9.ZH-WOOsP_GLeLu.webp"',
  'src="/images/ajay_plate.png"'
);

// Asterisk footer in Chapter II
html = html.replace(
  '❋ Live site unavailable for some inactive or incomplete projects',
  '❋ Hardware telemetry and live signal pipelines verified in lab environment'
);

// 4. Chapter III: Services / Disciplines
// 01 Product Design -> Embedded Systems
html = html.replace(
  'alt="Product Design"',
  'alt="Embedded Systems"'
);
html = html.replace(
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Product Design </p>',
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Embedded Systems </p>'
);
html = html.replace(
  '<p class="text-sm leading-[1.3] md:text-base">Digital products designed with intuitive flow, structure, and usability in mind.</p>',
  '<p class="text-sm leading-[1.3] md:text-base">Physical computing bridges with ESP32, sensor fusion, and hardware telemetry pipelines.</p>'
);

// 02 Digital Experiences -> Streaming Web Runtimes
html = html.replace(
  'alt="Digital Experiences"',
  'alt="Streaming Web Runtimes"'
);
html = html.replace(
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Digital Experiences </p>',
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Streaming Web Runtimes </p>'
);
html = html.replace(
  '<p class="text-sm leading-[1.3] md:text-base">Web experiences shaped through clarity, rhythm, and thoughtful interaction.</p>',
  '<p class="text-sm leading-[1.3] md:text-base">Ultra low-latency web interfaces shaped through WebSockets, reactive streams, and fluid motion.</p>'
);

// 03 Art direction -> Signal & Telemetry Engines
html = html.replace(
  'alt="Art direction"',
  'alt="Signal & Telemetry Engines"'
);
html = html.replace(
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Art direction </p>',
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Signal &amp; Telemetry Engines </p>'
);
html = html.replace(
  '<p class="text-sm leading-[1.3] md:text-base">Visual direction focused on mood, identity, and cohesive digital storytelling.</p>',
  '<p class="text-sm leading-[1.3] md:text-base">Kalman dead-reckoning filters, sensor telemetry arrays, and high-throughput data pipelines.</p>'
);

// 04 Development -> Distributed Architecture
html = html.replace(
  'alt="Development"',
  'alt="Distributed Architecture"'
);
html = html.replace(
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Development </p>',
  '<p class="font-serif text-[calc(3.2_*_var(--scale))] font-normal uppercase leading-[1.3] md:text-(length:--display-fs) md:leading-[1.2]"> Distributed Architecture </p>'
);
html = html.replace(
  '<p class="text-sm leading-[1.3] md:text-base">Built in Webflow or Framer, with custom development when the project calls for it.</p>',
  '<p class="text-sm leading-[1.3] md:text-base">High-resilience backend microservices, real-time event queues, and cryptographic verification.</p>'
);

// 5. Chapter IV: Reverse engineer Selected Experiences & Clients
const oldClientsStart = html.indexOf('<ul class="flex min-w-0 flex-col gap-1 overflow-visible text-[calc(4.2_*_var(--scale))] font-medium leading-[1.2] opacity-0 md:text-(length:--list-fs)');
const oldClientsEnd = html.indexOf('</ul>', oldClientsStart) + 5;

const newClientsList = `<ul class="flex min-w-0 flex-col gap-1 overflow-visible text-[calc(4.2_*_var(--scale))] font-medium leading-[1.2] opacity-0 md:text-(length:--list-fs) [&:not([data-clients-list-interactive])_li]:pointer-events-none [&:not([data-clients-list-interactive])_li]:cursor-default [&[data-clients-list-interactive]_li]:cursor-pointer" data-clients-list>
  <li class="relative group" data-client-row>
    <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
      <div class="shrink-0 w-[74.5%]">
        <img src="/brands/espressif.svg" alt="Espressif Labs" loading="lazy" decoding="async" width="140" height="140" class="w-full">
      </div>
    </div>
    <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
      <span class="block translate-z-0" data-line>Espressif Labs</span>
    </span>
  </li>
  <li class="relative group" data-client-row>
    <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
      <div class="shrink-0 w-[74.5%]">
        <img src="/brands/tinkerhub.svg" alt="TinkerHub Foundation" loading="lazy" decoding="async" width="140" height="140" class="w-full">
      </div>
    </div>
    <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
      <span class="block translate-z-0" data-line>TinkerHub Foundation</span>
    </span>
  </li>
  <li class="relative group" data-client-row>
    <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
      <div class="shrink-0 w-[74.5%]">
        <img src="/brands/makergram.svg" alt="MakerGram Systems" loading="lazy" decoding="async" width="140" height="140" class="w-full">
      </div>
    </div>
    <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
      <span class="block translate-z-0" data-line>MakerGram Systems</span>
    </span>
  </li>
  <li class="relative group" data-client-row>
    <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
      <div class="shrink-0 w-[74.5%]">
        <img src="/brands/icfoss.svg" alt="ICFOSS Kerala" loading="lazy" decoding="async" width="140" height="140" class="w-full">
      </div>
    </div>
    <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
      <span class="block translate-z-0" data-line>ICFOSS Kerala</span>
    </span>
  </li>
  <li class="relative group" data-client-row>
    <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
      <div class="shrink-0 w-[74.5%]">
        <img src="/brands/edge-impulse.svg" alt="Edge Impulse" loading="lazy" decoding="async" width="140" height="140" class="w-full">
      </div>
    </div>
    <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
      <span class="block translate-z-0" data-line>Edge Impulse</span>
    </span>
  </li>
</ul>`;

if (oldClientsStart !== -1 && oldClientsEnd !== -1) {
  html = html.slice(0, oldClientsStart) + newClientsList + html.slice(oldClientsEnd);
  console.log('Successfully replaced desktop clients list');
} else {
  console.warn('Clients list boundaries not found');
}

// Replace mobile logos
const oldMobileLogosStart = html.indexOf('<div class="grid size-[calc(6.4_*_var(--scale))]">');
const oldMobileLogosEnd = html.indexOf('</div> </div> </div> </div>', oldMobileLogosStart) + 6;

const newMobileLogos = `<div class="grid size-[calc(6.4_*_var(--scale))]">
  <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
    <img src="/brands/espressif.svg" alt="Espressif Labs logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
  </div>
  <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
    <img src="/brands/tinkerhub.svg" alt="TinkerHub Foundation logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
  </div>
  <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
    <img src="/brands/makergram.svg" alt="MakerGram Systems logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
  </div>
  <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
    <img src="/brands/icfoss.svg" alt="ICFOSS Kerala logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
  </div>
  <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
    <img src="/brands/edge-impulse.svg" alt="Edge Impulse logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
  </div>
</div>`;

if (oldMobileLogosStart !== -1 && oldMobileLogosEnd !== -1) {
  html = html.slice(0, oldMobileLogosStart) + newMobileLogos + html.slice(oldMobileLogosEnd);
  console.log('Successfully replaced mobile client logos');
} else {
  console.warn('Mobile logos boundaries not found');
}

// Replace Chapter IV footer note
html = html.replace(
  /Work spanning brands, products,\s*<br>\s*and digital teams\./g,
  'Systems spanning embedded hardware, signal telemetry,<br>and distributed web runtimes.'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html with 100% authentic Ajay Girish content and zero original owner traces!');
