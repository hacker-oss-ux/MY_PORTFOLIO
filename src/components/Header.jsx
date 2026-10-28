import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('ajaygirish025@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(9, 10, 15, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '1.25rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {/* Identity & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            style={{
              textDecoration: 'none',
              color: 'var(--text-primary)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em' }}>
              Ajay Girish
            </span>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Systems Engineer
            </span>
          </a>

          <div
            className="hide-tablet"
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span className="motion-node" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
            <span>Kerala, India · {time || 'IST'}</span>
          </div>
        </div>

        {/* Clean Nav Links */}
        <nav
          className="hide-tablet"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            fontSize: '14px',
            color: 'var(--text-secondary)',
          }}
        >
          <a
            href="#systems"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('systems');
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Systems
          </a>
          <a
            href="#workbench"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('workbench');
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Workbench
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('skills');
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Arsenal
          </a>
          <a
            href="#architecture"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('architecture');
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Architecture
          </a>
          <a
            href="#repositories"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('repositories');
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Repositories
          </a>
        </nav>

        {/* Direct Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleCopy}
            className="btn-action btn-secondary hide-tablet"
            style={{ padding: '9px 16px', fontSize: '14px' }}
            title="Copy email to clipboard"
          >
            {copied ? <Check size={15} color="#34d399" /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'ajaygirish025@gmail.com'}</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('contact');
            }}
            className="btn-action btn-primary"
            style={{ padding: '9px 18px', fontSize: '14px' }}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
