import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync } from 'node:fs';

mkdirSync('.taste-skill/audit/stations', { recursive: true });

async function checkStations() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { settleMs: 3000 });

  const stations = [
    { label: '01-hero-settled', y: 1600 },
    { label: '02-chapter1-about', y: 3200 },
    { label: '03-the-work-expand', y: 4800 },
    { label: '04-chapter2-selected-work', y: 6400 },
    { label: '05-chapter3-disciplines', y: 8400 },
    { label: '06-chapter4-clients', y: 9800 },
    { label: '07-next-chapter-footer', y: 11200 }
  ];

  for (const st of stations) {
    console.log(`Scrolling to y = ${st.y} (${st.label})...`);
    // Scroll window smoothly using evaluate
    await page.eval((targetY) => {
      window.scrollTo(0, targetY);
    }, st.y);
    
    // Give lenis / GSAP ticker a moment to interpolate
    await sleep(800);

    const info = await page.eval(() => {
      const track = document.querySelector('[data-horizontal-track]');
      const panels = [...document.querySelectorAll('[data-horizontal-panel]')].map(p => {
        const r = p.getBoundingClientRect();
        return {
          name: p.getAttribute('data-section') || p.getAttribute('aria-label') || 'panel',
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          inView: r.right > 50 && r.left < window.innerWidth - 50
        };
      });
      return {
        scrollY: window.scrollY,
        transform: track ? track.style.transform : 'none',
        visiblePanels: panels.filter(p => p.inView).map(p => `${p.name} [${p.left}..${p.right}]`)
      };
    });

    console.log(`At y=${st.y}:`, info);
    await page.screenshot({ path: `.taste-skill/audit/stations/${st.label}.jpg` });
  }

  await browser.close();
}

checkStations().catch(console.error);
