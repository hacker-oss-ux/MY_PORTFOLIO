import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function VisitorDesk({ onNotify }) {
  const [entries, setEntries] = useState([]);
  const [author, setAuthor] = useState('');
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/guestbook')
      .then((r) => r.json())
      .then((data) => setEntries(data))
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
        onNotify('Message recorded to visitor ledger.');
      }
    } catch (err) {
      onNotify('Failed to record message to backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="guestbook"
      style={{
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
          Visitor Ledger
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '18px' }}>
          Leave a note, technical critique, or dispatch from your engineering team.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Form */}
        <form
          onSubmit={handleSubmit}
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
                Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Linus Torvalds"
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
                Handle / Team
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@kernel"
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
              Note *
            </label>
            <textarea
              required
              rows={4}
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your note or observation..."
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
            <div style={{ textAlign: 'right', fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {message.length}/300
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-action btn-primary"
            style={{ width: '100%' }}
          >
            <Send size={16} />
            <span>{submitting ? 'Recording...' : 'Inscribe Message'}</span>
          </button>
        </form>

        {/* Message Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '480px', overflowY: 'auto' }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="surface-card"
              style={{
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '16px' }}>
                    {entry.author}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {entry.handle}
                  </span>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
