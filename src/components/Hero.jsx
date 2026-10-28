import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react';
import ContainerScroll from './ContainerScroll';
import FloatingDock from './FloatingDock';

export default function Hero({ onNotify }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('ajaygirish025@gmail.com');
    setCopied(true);
    if (onNotify) onNotify('Email copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const titleComponent = (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1
        style={{
          fontSize: 'clamp(3.5rem, 8vw, 6.2rem)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
        }}
      >
        Systems Engineer
      </h1>

      <p
        style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '680px',
          margin: '0 auto 2.5rem auto',
        }}
      >
        I am <strong style={{ color: 'var(--text-primary)' }}>Ajay Girish</strong>, a software systems engineer based in Kerala, India. I architect low-latency physical computing interfaces, streaming transit telemetry engines, and reactive web runtimes.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <a href="#systems" className="btn-action btn-primary">
          Examine Systems <ArrowUpRight size={16} />
        </a>

        <button onClick={handleCopy} className="btn-action btn-secondary">
          {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
          <span>{copied ? 'Copied' : 'Copy Direct Email'}</span>
        </button>

        <a
          href="https://wa.me/916238550283"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-action btn-secondary"
          style={{ color: '#34d399' }}
        >
          <MessageSquare size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );

  return (
    <section id="hero" style={{ width: '100%', overflow: 'hidden' }}>
      <ContainerScroll titleComponent={titleComponent}>
        {/* 3D Showcase Panel */}
        <div
          className="surface-card"
          style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2.5rem',
            background: 'var(--bg-surface)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* Authentic Portrait Image Plate */}
            <div
              style={{
                width: '100%',
                height: '420px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#040508',
              }}
            >
              <img
                src="/images/ajay_photo.jpg"
                alt="Ajay Girish Portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'contrast(1.02) grayscale(0.06)',
                }}
              />
            </div>

            {/* Systems Identity Dossier */}
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                Ajay Girish
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '2rem' }}>
                Operating across sensor fusion, embedded C++ on dual-core microcontrollers, and modern reactive TypeScript/React runtimes.
              </p>

              {/* Technical Grounding Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    ENGINEERING FOCUS
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)' }}>
                    Embedded & Reactive Web
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    ACADEMIC RIGOR
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)' }}>
                    BCA Computer Science
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    TECHNICAL AFFILIATION
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)' }}>
                    IEEE Student Member
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    LOCATION
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--accent-emerald)' }}>
                    10.85°N, 76.27°E (Kerala)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>GitHub Repository:</span>
                <a
                  href="https://github.com/hacker-oss-ux"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  @hacker-oss-ux ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>

      {/* Interactive Systems Navigation Dock */}
      <div style={{ marginTop: '1.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FloatingDock fixed={false} />
      </div>
    </section>
  );
}
