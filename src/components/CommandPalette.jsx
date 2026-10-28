import React, { useState, useEffect } from 'react';
import { Search, Compass, Cpu, Layers, GitBranch, MessageSquare, Mail, Phone, Volume2, X } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CommandPalette({ isOpen, onClose, onToggleSound, soundEnabled, onCopyEmail }) {
  const [query, setQuery] = useState('');

  const commands = [
    {
      id: 'work',
      title: 'Jump to Interactive Engineering Lab',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'projects',
      title: 'Jump to Selected Works & Plates',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'studio',
      title: 'Jump to Engineering Philosophy',
      category: 'Navigation',
      icon: Compass,
      action: () => {
        document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'repos',
      title: 'Jump to GitHub Open Source Ledger',
      category: 'Navigation',
      icon: GitBranch,
      action: () => {
        document.getElementById('repos')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'guestbook',
      title: 'Jump to Visitor Dispatch Desk',
      category: 'Navigation',
      icon: MessageSquare,
      action: () => {
        document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'email',
      title: 'Copy Direct Email (ajaygirish025@gmail.com)',
      category: 'Contact',
      icon: Mail,
      action: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: 'whatsapp',
      title: 'Open Direct WhatsApp (+91 6238550283)',
      category: 'Contact',
      icon: Phone,
      action: () => {
        window.open('https://wa.me/916238550283', '_blank');
        onClose();
      },
    },
    {
      id: 'audio',
      title: `Toggle Micro-interaction Sound FX (${soundEnabled ? 'Disable' : 'Enable'})`,
      category: 'Preferences',
      icon: Volume2,
      action: () => {
        onToggleSound();
        onClose();
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(7, 8, 12, 0.85)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '620px',
          background: 'rgba(15, 18, 28, 0.95)',
          border: '1px solid var(--border-strong)',
          borderRadius: '24px',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 243, 255, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={18} color="var(--accent-cyan)" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, section, or action..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Command List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              No matching commands.
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    sound.playClick();
                    cmd.action();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  className="interactive-target"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={16} color="var(--accent-cyan)" />
                    <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
                      {cmd.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
