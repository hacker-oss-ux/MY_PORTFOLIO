const fs = require('fs');
const path = require('path');

const dir = 'public/brands';
fs.mkdirSync(dir, { recursive: true });

// 1. Espressif Labs: geometric chip with central matrix
const espressif = `<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="35" y="35" width="70" height="70" rx="14" stroke="#2e2b28" stroke-width="6"/>
  <rect x="52" y="52" width="36" height="36" rx="6" fill="#2e2b28"/>
  <path d="M70 16V35M70 105V124M16 70H35M105 70H124" stroke="#2e2b28" stroke-width="6" stroke-linecap="round"/>
  <path d="M48 20V35M48 105V120M92 20V35M92 105V120" stroke="#2e2b28" stroke-width="4" stroke-linecap="round"/>
  <path d="M20 48H35M105 48H120M20 92H35M105 92H120" stroke="#2e2b28" stroke-width="4" stroke-linecap="round"/>
</svg>`;

// 2. TinkerHub Foundation: modern geometric bracket / tech hub
const tinkerhub = `<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M28 42C28 34.268 34.268 28 42 28H98C105.732 28 112 34.268 112 42V52H28V42Z" fill="#2e2b28"/>
  <path d="M54 52H86V102C86 107.523 81.523 112 76 112H64C58.477 112 54 107.523 54 102V52Z" fill="#2e2b28"/>
  <circle cx="70" cy="80" r="6" fill="#faf9f6"/>
</svg>`;

// 3. MakerGram Systems: geometric M circuit
const makergram = `<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24 108V40L70 82L116 40V108" stroke="#2e2b28" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="82" r="7" fill="#2e2b28"/>
  <circle cx="24" cy="40" r="7" fill="#2e2b28"/>
  <circle cx="116" cy="40" r="7" fill="#2e2b28"/>
</svg>`;

// 4. ICFOSS Kerala: open source node lattice
const icfoss = `<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="70" cy="70" r="48" stroke="#2e2b28" stroke-width="6"/>
  <circle cx="70" cy="38" r="10" fill="#2e2b28"/>
  <circle cx="42" cy="88" r="10" fill="#2e2b28"/>
  <circle cx="98" cy="88" r="10" fill="#2e2b28"/>
  <path d="M70 48V70L48 84M70 70L92 84" stroke="#2e2b28" stroke-width="6" stroke-linecap="round"/>
</svg>`;

// 5. Edge Impulse: neural telemetry pulse
const edgeImpulse = `<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M70 20L118 70L70 120L22 70L70 20Z" stroke="#2e2b28" stroke-width="8" stroke-linejoin="round"/>
  <path d="M42 70H56L64 50L76 90L84 70H98" stroke="#2e2b28" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

fs.writeFileSync(path.join(dir, 'espressif.svg'), espressif);
fs.writeFileSync(path.join(dir, 'tinkerhub.svg'), tinkerhub);
fs.writeFileSync(path.join(dir, 'makergram.svg'), makergram);
fs.writeFileSync(path.join(dir, 'icfoss.svg'), icfoss);
fs.writeFileSync(path.join(dir, 'edge-impulse.svg'), edgeImpulse);

console.log('Created 5 brand SVG logos in public/brands/');
