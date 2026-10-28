import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Copy, Check } from 'lucide-react';

export default function EditorialHero({ onNotify }) {
  const [activeYear, setActiveYear] = useState('21');
  const [copied, setCopied] = useState(false);

  const years = ['21', '22', '23', '24', '25', '26'];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < years.length) {
        setActiveYear(years[idx]);
      } else {
        clearInterval(interval);
      }
    }, 240);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('ajaygirish025@gmail.com');
    setCopied(true);
    if (onNotify) onNotify('Email copied to clipboard.');
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      data-section="hero"
      data-header-bg="#262220"
      data-header-text="#f3eee8"
      data-header-border="#5a524d"
      data-horizontal-panel
      style={{
        background: 'var(--bg-dark)',
        color: 'var(--text-light)',
      }}
      className="relative flex w-full flex-col shrink-0 overflow-hidden md:h-dvh md:w-screen justify-between px-6 py-16 md:pl-28 md:pr-16 md:py-16"
    >
      {/* Top Meta Header: Location, Discipline & Rolling Year */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border-dark)',
          paddingBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-light-muted)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            DISCIPLINE & GROUNDING
          </span>
          <span style={{ fontSize: '15px', fontWeight: 500 }}>
            Systems Builder · Kerala, India (10.85°N, 76.27°E)
          </span>
        </div>

        {/* Rolling Odometer Year Slot (Matching ajaygirish.dev) */}
        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-light-muted)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            ACTIVE TIMELINE
          </span>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              display: 'inline-flex',
              alignItems: 'baseline',
            }}
            className="tabular-nums"
          >
            <span>20</span>
            <span style={{ color: '#8a8178', transition: 'all 0.2s ease' }}>{activeYear}</span>
            <span style={{ fontSize: '12px', marginLeft: '6px', fontFamily: 'var(--font-mono)', opacity: 0.6 }}>
              EDITION
            </span>
          </div>
        </div>
      </div>

      {/* Main Monumental Name Display */}
      <div style={{ margin: 'auto 0', padding: '3.5rem 0' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--text-light-muted)',
            marginBottom: '1rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Prologue ─ Systems Monograph
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--name-fs)',
            lineHeight: 0.9,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            marginBottom: '2.5rem',
            textTransform: 'uppercase',
          }}
        >
          Ajay <span style={{ fontStyle: 'italic', textTransform: 'none', color: '#edeae6' }}>Girish</span>
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            maxWidth: '1080px',
            alignItems: 'baseline',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              lineHeight: 1.4,
              color: 'var(--text-light)',
              fontWeight: 400,
            }}
          >
            Independent systems builder and BCA Computer Science scholar crafting physical computing bridges, low-latency telemetry pipelines, and reactive web runtimes.
          </p>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--text-light-muted)',
            }}
          >
            Operating where deterministic dual-core microcontrollers interface with modern browser runtimes—grounded in rigorous hardware timing, statistical signal filters, and production craft.
          </p>
        </div>
      </div>

      {/* Bottom Editorial Actions Line */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
          borderTop: '1px solid var(--border-dark)',
          paddingTop: '2rem',
        }}
      >
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="to-link-underline"
            style={{ fontSize: '15px', fontWeight: 500 }}
          >
            Chapter I ─ Profile <ArrowDownRight size={15} style={{ marginLeft: '4px' }} />
          </a>

          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('work');
            }}
            className="to-link-underline"
            style={{ fontSize: '15px', fontWeight: 500 }}
          >
            Chapter II ─ Selected Systems <ArrowDownRight size={15} style={{ marginLeft: '4px' }} />
          </a>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button
            onClick={handleCopy}
            className="to-link-underline"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--text-light-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'ajaygirish025@gmail.com'}</span>
          </button>

          <a
            href="https://wa.me/916238550283"
            target="_blank"
            rel="noreferrer"
            className="to-link-underline"
            style={{ fontSize: '14px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            WhatsApp <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
