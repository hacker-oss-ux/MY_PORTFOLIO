import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function checkAndMore() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { settleMs: 3500 });

  await page.eval(() => window.scrollTo(0, 9024));
  await new Promise(r => setTimeout(r, 1000));

  const info = await page.eval(() => {
    const el = document.querySelector('[data-client-more]');
    const list = document.querySelector('[data-clients-list]');
    const r = el ? el.getBoundingClientRect() : null;
    const lr = list ? list.getBoundingClientRect() : null;
    return {
      elRect: r,
      listRect: lr,
      elStyle: el ? el.getAttribute('style') : null,
      elClass: el ? el.className : null,
      parentClass: el ? el.parentElement.className : null,
      parentRect: el ? el.parentElement.getBoundingClientRect() : null
    };
  });

  console.log('And more info:', info);
  await browser.close();
}

checkAndMore().catch(console.error);
