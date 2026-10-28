const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /<section[^>]*data-section=\"home-clients\"[\s\S]*?<\/section>\s*<script type=\"module\" src=\"\/_astro\/Clients\.astro_astro_type_script_index_0_lang\.CkJXhcIa\.js\"><\/script>/;

const newSection = `<section class="relative flex w-full flex-col shrink-0 overflow-hidden md:h-dvh !overflow-clip bg-[#edeae6] text-[#2e2b28] md:!overflow-hidden" aria-label="Clients" data-section="home-clients" data-header-bg="#edeae6" data-header-text="#2e2b28" data-header-border="#b8b3ac" data-horizontal-panel>
  <div class="relative flex min-h-0 flex-1 flex-col gap-10 px-5 py-14 md:gap-0 md:px-0 md:py-0">
    <p class="font-serif text-lg font-normal uppercase leading-none md:absolute md:left-32 md:top-(--vg) md:text-2xl">
      Chapter IV
    </p>
    <div class="w-full md:absolute md:right-32 md:top-(--vg) md:max-w-[calc(61.2_*_var(--scale))]">
      <p class="text-[calc(1.1_*_var(--scale))] uppercase leading-[1.4] mb-5 opacity-0" data-reveal-line data-clients-label>
        Selected experiences
      </p>
      <div class="grid grid-cols-[minmax(0,1fr)_calc(5.6_*_var(--scale))] items-stretch gap-4 [--client-row-height:calc(5.04_*_var(--scale))] md:block" data-clients-mobile-grid>
        <ul class="flex min-w-0 flex-col gap-1 overflow-visible text-[calc(4.2_*_var(--scale))] font-medium leading-[1.2] opacity-0 md:text-(length:--list-fs) [&:not([data-clients-list-interactive])_li]:pointer-events-none [&:not([data-clients-list-interactive])_li]:cursor-default [&[data-clients-list-interactive]_li]:cursor-pointer" data-clients-list>
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
                <img src="/brands/tinkerhub.svg" alt="TinkerSpace" loading="lazy" decoding="async" width="140" height="140" class="w-full">
              </div>
            </div>
            <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
              <span class="block translate-z-0" data-line>TinkerSpace</span>
            </span>
          </li>
          <li class="relative group" data-client-row>
            <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
              <div class="shrink-0 w-[74.5%]">
                <img src="/brands/makergram.svg" alt="MakerGram" loading="lazy" decoding="async" width="140" height="140" class="w-full">
              </div>
            </div>
            <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
              <span class="block translate-z-0" data-line>MakerGram</span>
            </span>
          </li>
          <li class="relative group" data-client-row>
            <div class="pointer-events-none absolute right-full mr-6 hidden items-center justify-center overflow-hidden md:flex md:aspect-[188/251] md:w-[calc(18.8_*_var(--scale))] md:bg-[#faf9f6] [clip-path:inset(0_0_0_100%)] duration-500 ease-[cubic-bezier(.3,.86,.36,.95)] group-hover:[clip-path:inset(0_0_0_0)] top-0">
              <div class="shrink-0 w-[74.5%]">
                <img src="/brands/icfoss.svg" alt="ICFOSS" loading="lazy" decoding="async" width="140" height="140" class="w-full">
              </div>
            </div>
            <span class="block overflow-hidden transition-opacity duration-500 ease-out" data-client-text-wrap>
              <span class="block translate-z-0" data-line>ICFOSS</span>
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
        </ul>
        <div class="relative md:hidden">
          <div class="sticky top-[calc(50vh-var(--client-row-height)/2)] flex h-(--client-row-height) items-center justify-end" data-clients-mobile-logos>
            <div class="grid size-[calc(6.4_*_var(--scale))]">
              <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
                <img src="/brands/espressif.svg" alt="Espressif Labs logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
              </div>
              <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
                <img src="/brands/tinkerhub.svg" alt="TinkerSpace logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
              </div>
              <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
                <img src="/brands/makergram.svg" alt="MakerGram logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
              </div>
              <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
                <img src="/brands/icfoss.svg" alt="ICFOSS logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
              </div>
              <div class="col-start-1 row-start-1 flex size-[calc(6.4_*_var(--scale))] scale-0 items-center justify-center opacity-0 will-change-transform" data-client-mobile-logo>
                <img src="/brands/edge-impulse.svg" alt="Edge Impulse logo" loading="lazy" decoding="async" width="56" height="56" class="size-full object-contain">
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="relative opacity-0 text-[calc(4.2_*_var(--scale))] font-medium leading-[1.2] md:text-(length:--list-fs) block overflow-hidden transition-opacity duration-500 ease-out" data-client-row data-client-more data-client-text-wrap>
        <span class="block translate-z-0" data-line>And more</span>
      </p>
    </div>
    <p class="text-[calc(1.1_*_var(--scale))] font-normal uppercase leading-[1.4] md:absolute md:bottom-(--vg) md:left-32 md:max-w-[calc(29.4_*_var(--scale))]">
      Systems spanning embedded hardware, signal telemetry,<br>and distributed web runtimes.
    </p>
  </div>
</section>
<script type="module" src="/_astro/Clients.astro_astro_type_script_index_0_lang.CkJXhcIa.js"></script>`;

if (regex.test(html)) {
  html = html.replace(regex, newSection);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully updated Chapter IV section with clean markup!');
} else {
  console.error('Regex match failed!');
}
