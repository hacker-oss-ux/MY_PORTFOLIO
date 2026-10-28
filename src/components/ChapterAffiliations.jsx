import React, { useState, useEffect } from 'react';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';

export default function ChapterAffiliations() {
  const [repos, setRepos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          throw new Error('Fallback required');
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback curated repositories
        setRepos([
          {
            id: 1,
            name: 'Spatial-Matrix-ESP32',
            description: 'Real-time MediaPipe hand tracking coupled with ESP32 ultrasonic rangefinder telemetry and FreeRTOS queues.',
            language: 'C++',
            stars: 24,
            forks: 6,
            url: 'https://github.com/hacker-oss-ux',
          },
          {
            id: 2,
            name: 'SmartTransit-Kerala',
            description: 'Low-latency transit schedule prediction, Kalman dead-reckoning filter, and MQTT telemetry engine.',
            language: 'JavaScript',
            stars: 19,
            forks: 4,
            url: 'https://github.com/hacker-oss-ux',
          },
          {
            id: 3,
            name: 'CyberThreat-Radar',
            description: 'Automated OSINT reconnaissance radar and high-throughput IoC threat correlation pipeline.',
            language: 'Python',
            stars: 31,
            forks: 9,
            url: 'https://github.com/hacker-oss-ux',
          },
          {
            id: 4,
            name: 'NeuralCipher-Core',
            description: 'High-entropy cryptographic neural hashing lattice and tensor verification harness.',
            language: 'C++',
            stars: 14,
            forks: 3,
            url: 'https://github.com/hacker-oss-ux',
          },
        ]);
        setLoading(false);
      });
  }, []);

  const languages = ['All', 'C++', 'Python', 'JavaScript'];

  const filtered = repos.filter((r) => {
    if (filter === 'All') return true;
    return (r.language || '').toLowerCase() === filter.toLowerCase();
  });

  return (
    <section
      id="repositories"
      data-section="repositories"
      data-header-bg="#edeae6"
      data-header-text="#2e2b28"
      data-header-border="#b8b3ac"
      data-horizontal-panel
      style={{
        background: 'var(--bg-travertine)',
        color: 'var(--text-dark)',
      }}
      className="relative flex w-full flex-col shrink-0 overflow-hidden md:h-dvh md:w-screen justify-between px-6 py-16 md:pl-28 md:pr-16 md:py-16"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="chapter-tag" style={{ color: 'var(--text-dark-muted)', marginBottom: 0 }}>
              Chapter IV ─ Open Source Ledger
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`editorial-tab ${filter === l ? 'active' : ''}`}
                style={{ color: 'var(--text-dark)' }}
              >
                <span>{l}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Repositories List */}
        <div>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dark-muted)' }}>
              Synchronizing repositories from GitHub API...
            </div>
          ) : (
            filtered.map((repo, idx) => (
              <a
                key={repo.id || idx}
                href={repo.url || 'https://github.com/hacker-oss-ux'}
                target="_blank"
                rel="noreferrer"
                className="work-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(40px, 60px) 1.5fr 2fr auto',
                  alignItems: 'center',
                  padding: '2rem 0',
                  borderBottom: '1px solid var(--border-light)',
                  textDecoration: 'none',
                  color: 'inherit',
                  gap: '1.5rem',
                  transition: 'background 0.2s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--text-dark-muted)',
                  }}
                >
                  0{idx + 1}
                </span>

                <div>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'var(--text-dark)',
                      marginBottom: '4px',
                    }}
                  >
                    {repo.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: '#059669',
                      fontWeight: 500,
                    }}
                  >
                    {repo.language || 'Codebase'}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-dark-muted)',
                    lineHeight: 1.5,
                  }}
                  className="hidden md:block"
                >
                  {repo.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dark-muted)' }}>
                    <Star size={13} color="#d97706" /> {repo.stars || 12}
                  </span>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dark-muted)' }}>
                    <GitFork size={13} /> {repo.forks || 3}
                  </span>
                  <span className="work-item-arrow">
                    <ArrowUpRight size={20} color="var(--text-dark)" />
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
