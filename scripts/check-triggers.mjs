import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function checkTriggers() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  const triggers = await page.eval(() => {
    // Look for GSAP triggers
    // In setup.ehf6vWB0.js, ScrollTrigger is imported
    // Let's inspect elements with data-char-line-heading
    const heading = document.querySelector('[data-section=\"home-footer\"] [data-char-line-heading]');
    const footer = document.querySelector('[data-section=\"home-footer\"]');
    return {
      headingExists: !!heading,
      headingClass: heading ? heading.className : null,
      headingHtml: heading ? heading.outerHTML.slice(0, 300) : null,
      footerExists: !!footer
    };
  });

  console.log('Triggers/Footer:', triggers);
  await browser.close();
}

checkTriggers().catch(console.error);
