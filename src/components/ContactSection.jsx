import React, { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, Send, ArrowUpRight } from 'lucide-react';

export default function ContactSection({ onNotify }) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('ajaygirish025@gmail.com');
    setCopied(true);
    onNotify('Email copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setMessage('');
        onNotify('Message dispatched to inbox. Thank you.');
      }
    } catch (err) {
      onNotify('Failed to dispatch message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <footer
      id="contact"
      style={{
        padding: '5rem 2rem 4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
          Direct Communication & Colophon
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '18px' }}>
          Open for engineering consultations, forward-deployed hardware projects, and technical collaboration.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem',
        }}
      >
        {/* Contact Form */}
        <form
          onSubmit={handleSend}
          className="surface-card"
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-primary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@domain.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-primary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Project Scope or Inquiry *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the system, timeline, or engineering inquiry..."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-primary)',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-action btn-primary"
            style={{ width: '100%' }}
          >
            <Send size={16} />
            <span>{sending ? 'Transmitting...' : 'Dispatch Inquiry'}</span>
          </button>
        </form>

        {/* Direct Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            className="surface-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                DIRECT EMAIL INBOX
              </div>
              <div style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                ajaygirish025@gmail.com
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.5 }}>
                Primary inbox. Monitored throughout active Kerala engineering hours (IST).
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="btn-action btn-secondary"
              style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}
            >
              {copied ? <Check size={15} color="#34d399" /> : <Copy size={15} />}
              <span>{copied ? 'Copied' : 'Copy Email Address'}</span>
            </button>
          </div>

          <div
            className="surface-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', color: '#34d399', marginBottom: '0.5rem', fontWeight: 600 }}>
                RAPID MESSAGING
              </div>
              <div style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                +91 6238550283
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.5 }}>
                Direct WhatsApp channel for quick technical questions or project discussions.
              </p>
            </div>

            <a
              href="https://wa.me/916238550283"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action btn-secondary"
              style={{ marginTop: '1.5rem', alignSelf: 'flex-start', color: '#34d399' }}
            >
              Open Direct WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Colophon & Standards */}
      <div
        style={{
          paddingTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontSize: '14px',
          color: 'var(--text-muted)',
        }}
      >
        <div>
          Handcrafted by Ajay Girish. Engineered with React 19 & Node.js Express.
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <a
            href="https://github.com/hacker-oss-ux"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
          >
            GitHub @hacker-oss-ux
          </a>
          <span>10.8505° N, 76.2711° E (Kerala)</span>
        </div>
      </div>
    </footer>
  );
}
