import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ChapterAbout() {
  return (
    <section
      id="about"
      data-section="about"
      data-header-bg="#faf9f6"
      data-header-text="#2e2b28"
      data-header-border="#b8b3ac"
      data-horizontal-panel
      style={{
        background: 'var(--bg-light)',
        color: 'var(--text-dark)',
      }}
      className="relative flex w-full flex-col shrink-0 overflow-hidden md:h-dvh md:w-screen justify-between px-6 py-16 md:pl-28 md:pr-16 md:py-16"
    >
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Chapter Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1rem',
          }}
        >
          <div className="chapter-tag" style={{ color: 'var(--text-dark-muted)', marginBottom: 0 }}>
            Chapter I ─ Profile
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-dark-muted)' }}>
            AUTHENTIC ACADEMIC & SYSTEMS GROUNDING
          </span>
        </div>

        {/* Asymmetric Core Split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            margin: 'auto 0',
            padding: '1.5rem 0',
          }}
        >
          {/* Left Column: Philosophical Overview */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dark-muted)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              QUICK INTRO
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                lineHeight: 1.25,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'var(--text-dark)',
                marginBottom: '1.5rem',
              }}
            >
              Hi, I’m Ajay — an engineer driven by the friction between raw physical computing hardware and modern browser runtimes.
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontSize: '15.5px',
                lineHeight: 1.65,
                color: 'var(--text-dark-muted)',
                maxWidth: '560px',
              }}
            >
              <p>
                Currently completing my <strong style={{ color: 'var(--text-dark)' }}>Bachelor of Computer Applications (BCA)</strong> in Kerala, India. My engineering practice spans bare-metal C++ on dual-core ESP32 microcontrollers, 60fps computer vision inference, and reactive high-throughput web frontends.
              </p>
              <p>
                I reject superficial cyber templates and category defaults in favor of mathematical rigor, deterministic execution, and tangible proof-of-work. Every system I document is backed by reproducible code, measured microsecond latencies, and active open-source repositories.
              </p>
            </div>
          </div>

          {/* Right Column: Framed Authentic Portrait Plate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '380px', margin: '0 auto' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#edeae6',
                border: '1px solid var(--border-light)',
                aspectRatio: '4/5',
                maxHeight: '400px',
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
                  filter: 'contrast(1.02) grayscale(0.04)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  background: 'rgba(250, 249, 246, 0.94)',
                  backdropFilter: 'blur(8px)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>AJAY GIRISH · BCA SCHOLAR</span>
                <span>KERALA, IN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light-subtle)',
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-dark-muted)', display: 'block', marginBottom: '2px' }}>
              ACADEMIC DEGREE
            </span>
            <span style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-dark)' }}>
              BCA Computer Science
            </span>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-dark-muted)', display: 'block', marginBottom: '2px' }}>
              PROFESSIONAL AFFILIATION
            </span>
            <span style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-dark)' }}>
              IEEE Student Member
            </span>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-dark-muted)', display: 'block', marginBottom: '2px' }}>
              COORDINATES
            </span>
            <span style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-dark)' }}>
              10.8505° N, 76.2711° E
            </span>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-dark-muted)', display: 'block', marginBottom: '2px' }}>
              OPEN SOURCE
            </span>
            <a
              href="https://github.com/hacker-oss-ux"
              target="_blank"
              rel="noreferrer"
              className="to-link-underline"
              style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-dark)' }}
            >
              @hacker-oss-ux <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
