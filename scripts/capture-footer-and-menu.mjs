import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

async function captureFooterAndMenu() {
  const browser = await Browser.launch({ width: 1440, height: 900 });
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');

  // Wait for intro to unlock
  while (true) {
    const isLocked = await page.eval(() => document.body.style.overflow === 'hidden');
    if (!isLocked) break;
    await sleep(150);
  }

  // 1. Scroll to Footer
  console.log('Scrolling to Footer...');
  await page.eval(() => window.scrollTo(0, 10464));
  await sleep(1200);

  const footerState = await page.eval(() => {
    const email = document.querySelector('[data-section=\"home-footer\"] [data-from-link-underline]');
    const links = [...document.querySelectorAll('[data-section=\"home-footer\"] nav a')].map(a => ({
      text: a.textContent.trim(),
      href: a.href
    }));
    return {
      email: email ? email.textContent.trim() : null,
      emailHref: email ? email.href : null,
      links
    };
  });
  console.log('Footer state:', JSON.stringify(footerState, null, 2));
  await page.screenshot({ path: '.taste-skill/audit/v2/footer-updated-contacts.jpg' });

  // 2. Open Fullscreen Menu
  console.log('Opening Fullscreen Menu...');
  await page.eval(() => {
    const btn = document.getElementById('menu-toggle');
    if (btn) btn.click();
  });
  await sleep(1000);

  const menuState = await page.eval(() => {
    const dialog = document.getElementById('fullscreen-menu');
    const links = [...dialog.querySelectorAll('a')].map(a => ({
      text: a.textContent.trim(),
      href: a.href
    }));
    return {
      isOpen: dialog ? dialog.open : false,
      links
    };
  });
  console.log('Menu state:', JSON.stringify(menuState, null, 2));
  await page.screenshot({ path: '.taste-skill/audit/v2/menu-updated-contacts.jpg' });

  await browser.close();
  console.log('Finished capturing footer and menu!');
}

captureFooterAndMenu().catch(console.error);
