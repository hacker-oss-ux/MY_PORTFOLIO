import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';

export default function ChapterFooter({ onNotify }) {
  const [entries, setEntries] = useState([]);
  const [author, setAuthor] = useState('');
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/guestbook')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setEntries(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setSubmitting(true);
    const payload = {
      author: author.trim(),
      handle: handle.trim() || '@colleague',
      message: message.trim(),
    };

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        setAuthor('');
        setHandle('');
        setMessage('');
        if (onNotify) onNotify('Message recorded to visitor ledger.');
      } else {
        throw new Error('Failed to post');
      }
    } catch (err) {
      const optimistic = {
        id: 'opt_' + Date.now(),
        author: payload.author,
        handle: payload.handle,
        message: payload.message,
        timestamp: new Date().toISOString(),
      };
      setEntries([optimistic, ...entries]);
      setAuthor('');
      setHandle('');
      setMessage('');
      if (onNotify) onNotify('Message recorded (local dispatch).');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      data-section="contact"
      data-header-bg="#1f1d1b"
      data-header-text="#ccc"
      data-header-border="#5a524d"
      data-horizontal-panel
      style={{
        background: 'var(--bg-dark-deep)',
        color: '#ccc',
      }}
      className="relative flex w-full flex-col shrink-0 overflow-hidden md:h-dvh md:w-screen justify-between px-6 py-16 md:pl-28 md:pr-16 md:py-16"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Top Tagline & Social Rail */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid #3a3632',
            paddingBottom: '1.5rem',
            marginBottom: '4.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a8178' }}>
            Where physical computing meets streaming web runtimes.
          </p>

          <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '14px', fontWeight: 500 }}>
            <a
              href="https://wa.me/916238550283"
              target="_blank"
              rel="noreferrer"
              className="to-link-underline"
              style={{ color: '#ccc' }}
            >
              WhatsApp ↗
            </a>
            <a
              href="https://github.com/hacker-oss-ux"
              target="_blank"
              rel="noreferrer"
              className="to-link-underline"
              style={{ color: '#ccc' }}
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/ajay-girish-/"
              target="_blank"
              rel="noreferrer"
              className="to-link-underline"
              style={{ color: '#ccc' }}
            >
              LinkedIn ↗
            </a>
          </nav>
        </div>

        {/* Monumental Editorial Heading */}
        <div style={{ marginBottom: '4.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--name-fs)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              fontWeight: 400,
              textTransform: 'uppercase',
              color: '#f3eee8',
              marginBottom: '2.5rem',
            }}
          >
            <span style={{ display: 'block' }}>Next</span>
            <span style={{ display: 'block', fontStyle: 'italic', textTransform: 'none', color: '#8a8178' }}>
              chapter
            </span>
          </h2>

          <div>
            <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a8178', marginBottom: '8px' }}>
              Contact to
            </p>
            <a
              className="from-link-underline"
              href="mailto:ajaygirish025@gmail.com"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--display-fs)',
                lineHeight: 1.2,
                fontWeight: 500,
                color: '#f3eee8',
              }}
            >
              ajaygirish025@gmail.com
            </a>
          </div>
        </div>

        {/* Split Grid: Visitor Ledger Form & Live Telemetry Colophon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
        >
          {/* Visitor Desk Form */}
          <div
            style={{
              background: '#262220',
              padding: '2.25rem',
              borderRadius: '8px',
              border: '1px solid #3a3632',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#8a8178',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              PUBLIC VISITOR DESK
            </span>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    background: '#1a1816',
                    border: '1px solid #3a3632',
                    borderRadius: '4px',
                    color: '#f3eee8',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                  }}
                />
                <input
                  type="text"
                  placeholder="@handle or org"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    background: '#1a1816',
                    border: '1px solid #3a3632',
                    borderRadius: '4px',
                    color: '#f3eee8',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                  }}
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Leave an engineering critique, technical note, or dispatch..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  padding: '10px 14px',
                  background: '#1a1816',
                  border: '1px solid #3a3632',
                  borderRadius: '4px',
                  color: '#f3eee8',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  resize: 'none',
                }}
              />

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '12px 20px',
                  background: '#f3eee8',
                  color: '#1f1d1b',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <span>{submitting ? 'Dispatching...' : 'Dispatch Note to Ledger'}</span>
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Recent Ledger Entries */}
          <div>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#8a8178',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              RECORDED DISPATCHES ({entries.length})
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '280px', overflowY: 'auto' }}>
              {entries.slice(0, 4).map((entry, idx) => (
                <div
                  key={entry.id || idx}
                  style={{
                    padding: '1rem 1.25rem',
                    background: '#262220',
                    border: '1px solid #3a3632',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600, color: '#f3eee8' }}>{entry.author}</span>
                    <span style={{ color: '#8a8178', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                      {entry.handle}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#b8b3ac', lineHeight: 1.5 }}>{entry.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colophon Bar */}
        <div
          style={{
            borderTop: '1px solid #3a3632',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: '#8a8178',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>© 2026 — AJAY GIRISH</div>
          <div>FOLIO — EDITION ─ KERALA, IN (10.8505° N, 76.2711° E)</div>
        </div>
      </div>
    </footer>
  );
}
