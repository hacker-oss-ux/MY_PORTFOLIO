import React from 'react';

export default function ArchitecturePhilosophy() {
  const essays = [
    {
      title: 'Deterministic Serial Timing',
      topic: 'EMBEDDED SYSTEMS & HARDWARE INTERFACES',
      body:
        'When bridging commodity software runtimes with embedded silicon, non-deterministic garbage collection and operating system thread scheduling are fatal. In the Spatial Control Matrix, we deliberately eliminate dynamic memory allocation on the microcontroller, pin high-speed UART byte-parsing to Core 0 with dedicated FreeRTOS queues, and restrict frame serialization to fixed-width binary packets with zero string parsing overhead.',
    },
    {
      title: 'Streaming State Architecture',
      topic: 'CONCURRENCY & HIGH-THROUGHPUT WEB',
      body:
        'Web applications handling continuous telemetry—such as live transit coordinates or security event streams—frequently succumb to React reconciliation thrashing. Rather than dispatching thousands of discrete component re-renders per second, we implement delta-compression on the Node.js layer and batch updates into requestAnimationFrame frame budgets, ensuring the browser remains smooth and responsive.',
    },
    {
      title: 'Algorithmic Memory Budgets',
      topic: 'SYSTEMS DISCIPLINE & RIGOR',
      body:
        'True engineering craftsmanship is defined by restraint. Whether employing O(1) Bloom filters to deduplicate high-velocity OSINT threat indicators in memory, or restricting communication wire payloads to raw binary framing rather than bloated JSON, every architectural choice is governed by measurable latency, bounded memory consumption, and formal complexity analysis.',
    },
  ];

  return (
    <section
      id="architecture"
      style={{
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
          Systems Architecture & Technical Discipline
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '18px' }}>
          Core architectural principles guiding physical computing, distributed telemetry, and frontend engineering.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {essays.map((essay, i) => (
          <article
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '0.5rem 0',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.04em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                {essay.topic}
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                {essay.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7 }}>
                {essay.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
