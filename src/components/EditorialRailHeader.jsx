import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function EditorialRailHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [railTheme, setRailTheme] = useState({
    bg: '#262220',
    text: '#f3eee8',
    border: '#5a524d',
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  // 1. Live Kerala IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Scroll Progress & Dynamic Section Theme Inversion
  useEffect(() => {
    // Desktop horizontal story listener
    const onHorizontalProgress = (e) => {
      const p = e.detail?.progress ?? 0;
      setScrollProgress(p);

      const panels = document.querySelectorAll('[data-horizontal-panel]');
      panels.forEach((pnl) => {
        const rect = pnl.getBoundingClientRect();
        if (rect.left <= 150 && rect.right > 150) {
          const bg = pnl.getAttribute('data-header-bg') || '#262220';
          const text = pnl.getAttribute('data-header-text') || '#f3eee8';
          const border = pnl.getAttribute('data-header-border') || '#5a524d';
          const id = pnl.getAttribute('data-section') || 'hero';
          setRailTheme({ bg, text, border });
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('horizontal-scroll-progress', onHorizontalProgress);

    // Native vertical scroll listener (mobile fallback)
    const handleScroll = () => {
      if (window.innerWidth >= 768) return; // Managed by GSAP on desktop
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      const sections = document.querySelectorAll('[data-section]');
      const scrollPos = window.scrollY + 200;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          const bg = sec.getAttribute('data-header-bg') || '#262220';
          const text = sec.getAttribute('data-header-text') || '#f3eee8';
          const border = sec.getAttribute('data-header-border') || '#5a524d';
          const id = sec.getAttribute('data-section') || 'hero';

          setRailTheme({ bg, text, border });
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('horizontal-scroll-progress', onHorizontalProgress);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Prologue', id: 'hero', chapter: '00' },
    { label: 'Chapter I ─ About', id: 'about', chapter: '01' },
    { label: 'Chapter II ─ Selected Works', id: 'work', chapter: '02' },
    { label: 'Chapter III ─ Disciplines & Lab', id: 'disciplines', chapter: '03' },
    { label: 'Technical Arsenal', id: 'arsenal', chapter: '04' },
    { label: 'Chapter IV ─ Repositories', id: 'repositories', chapter: '05' },
    { label: 'Next Chapter ─ Contact', id: 'contact', chapter: '06' },
  ];

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    if (window.innerWidth >= 768) {
      const track = document.querySelector('[data-horizontal-track]');
      if (track) {
        const totalTrackScroll = track.scrollWidth - window.innerWidth;
        const panelOffset = el.offsetLeft;
        const progressRatio = totalTrackScroll > 0 ? Math.min(1, Math.max(0, panelOffset / totalTrackScroll)) : 0;
        const maxPageScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: progressRatio * maxPageScroll,
          behavior: 'smooth',
        });
        return;
      }
    }

    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Editorial Header Rail */}
      <header
        style={{
          position: 'fixed',
          zIndex: 100,
          background: railTheme.bg,
          color: railTheme.text,
          borderColor: railTheme.border,
          transition: 'background 0.5s ease, color 0.5s ease, border-color 0.5s ease',
        }}
        className="inset-x-0 top-0 flex h-16 w-full flex-row items-center justify-between border-b px-5 md:inset-x-auto md:inset-y-0 md:left-0 md:h-full md:w-16 md:flex-col md:border-b-0 md:border-r md:px-0 md:py-8"
        aria-label="Editorial Rail Header"
      >
        {/* Hairline Scroll Progress */}
        <div
          className="bottom-0 left-0 h-[2px] w-full origin-left md:left-auto md:right-0 md:top-0 md:h-full md:w-[2px] md:origin-top"
          style={{
            transform: typeof window !== 'undefined' && window.innerWidth >= 768
              ? `scaleY(${scrollProgress})`
              : `scaleX(${scrollProgress})`,
            transformOrigin: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'top' : 'left',
            position: 'absolute',
            background: '#8a8178',
            pointerEvents: 'none',
            zIndex: 10,
            width: typeof window !== 'undefined' && window.innerWidth >= 768 ? '2px' : '100%',
            height: typeof window !== 'undefined' && window.innerWidth >= 768 ? '100%' : '2px',
            right: 0,
            top: 0,
            bottom: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'auto' : 0,
            left: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'auto' : 0,
          }}
        />

        {/* Top / Brand Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          style={{ textDecoration: 'none', color: 'inherit' }}
          className="flex items-center gap-2"
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '26px',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            AG
          </span>
        </a>

        {/* Desktop Middle: Rotated Vertical Typography */}
        <div
          className="hidden md:flex flex-col items-center justify-center gap-4"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.75,
          }}
        >
          <span>Ajay Girish ─ Systems Builder</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>10.85°N, 76.27°E</span>
        </div>

        {/* Bottom / Mobile Right: Time & Menu Toggle */}
        <div className="flex items-center gap-4 md:flex-col md:gap-6">
          <span
            className="hidden text-xs md:block tabular-nums"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              opacity: 0.65,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            {time}
          </span>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '4px',
            }}
            aria-label="Toggle Fullscreen Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Editorial Navigation Modal */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: '#1f1d1b',
            color: '#f3eee8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '5rem 2rem 3rem 2rem',
            animation: 'fadeIn 0.3s ease-out forwards',
          }}
          className="md:pl-28 md:pr-16 md:py-16"
        >
          <div>
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#8a8178',
                marginBottom: '2rem',
              }}
            >
              Navigation Index
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  className="to-link-underline"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                    lineHeight: 1.1,
                    color: activeSection === link.id ? '#faf9f6' : '#8a8178',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
                    {link.chapter}
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              borderTop: '1px solid #3a3632',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '13px',
              color: '#8a8178',
            }}
          >
            <div>KERALA, INDIA · IST (UTC+5:30) · {time}</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="mailto:ajaygirish025@gmail.com" className="to-link-underline">
                ajaygirish025@gmail.com <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/hacker-oss-ux"
                target="_blank"
                rel="noreferrer"
                className="to-link-underline"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
