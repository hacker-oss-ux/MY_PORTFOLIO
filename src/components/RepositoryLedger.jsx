import React, { useState, useEffect } from 'react';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';

export default function RepositoryLedger() {
  const [repos, setRepos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const languages = ['All', 'Python', 'JavaScript', 'HTML'];

  const filtered = repos.filter((r) => {
    if (filter === 'All') return true;
    return (r.language || '').toLowerCase() === filter.toLowerCase();
  });

  return (
    <section
      id="repositories"
      style={{
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
            Open Source Repositories
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '18px' }}>
            Public codebases, research implementations, and hardware experiments on <strong style={{ color: 'var(--text-primary)' }}>@hacker-oss-ux</strong>.
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`tab-button ${filter === l ? 'active' : ''}`}
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div
        className="surface-card"
        style={{
          overflow: 'hidden',
          padding: '1rem',
        }}
      >
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Synchronizing repository ledger from GitHub API...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No repositories found for '{filter}'.
          </div>
        ) : (
          filtered.map((repo, idx) => (
            <a
              key={repo.id || idx}
              href={repo.url || 'https://github.com/hacker-oss-ux'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s ease',
                marginBottom: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {repo.name}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--accent-primary)' }}>
                  {repo.language || 'Codebase'}
                </div>
              </div>

              <div style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.5 }}>
                {repo.description}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.5rem', fontSize: '14px', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Star size={15} color="#fbbf24" /> {repo.stars || 12}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <GitFork size={15} /> {repo.forks || 3}
                </span>
                <ArrowUpRight size={18} color="var(--accent-primary)" />
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  );
}
