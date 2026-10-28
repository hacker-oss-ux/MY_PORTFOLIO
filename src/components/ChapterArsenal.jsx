import React, { useState } from 'react';
import { Search, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ChapterArsenal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = [
    { id: 'All', label: 'All Disciplines' },
    { id: 'Embedded', label: 'Embedded & Silicon' },
    { id: 'Web', label: 'Reactive Web' },
    { id: 'Vision', label: 'Signal & Vision' },
    { id: 'Systems', label: 'Protocols & OSINT' },
  ];

  const skills = [
    {
      name: 'ESP32 Dual-Core Architecture',
      category: 'Embedded',
      focus: 'Xtensa Microcontroller & FreeRTOS Pinning',
      deployment: 'Spatial Control Matrix',
      metric: 'Core 0/1 Task Split',
      details: 'Task pinning separating UART ring-buffer decoding on Core 0 from ultrasonic sonar polling and PWM actuator generation on Core 1.',
      tags: ['FreeRTOS', 'UART', 'Ring Buffers', 'Xtensa']
    },
    {
      name: 'Embedded C & C++17',
      category: 'Embedded',
      focus: 'Bare-Metal & RTOS Firmware Development',
      deployment: 'Spatial Control Matrix & IoT Nodes',
      metric: 'Zero-Allocation Runtime',
      details: 'Deterministic firmware engineering with fixed-size ring buffers, interrupt service routines (ISRs), and microsecond-accurate PWM timing.',
      tags: ['C/C++17', 'Memory Budgets', 'ISRs', 'Fixed Buffers']
    },
    {
      name: 'Hardware Serial Protocols',
      category: 'Embedded',
      focus: 'UART, I2C, SPI Bus Engineering',
      deployment: 'High-Baud Sensor Bridges',
      metric: '115,200 bps Framing',
      details: 'Custom framing byte structures with 0xAA start headers, command IDs, length markers, payload bytes, and XOR/CRC-8 integrity checksums.',
      tags: ['UART', 'I2C', 'SPI', 'CRC-8', 'XOR Checksum']
    },
    {
      name: 'Actuator & Sonar Integration',
      category: 'Embedded',
      focus: 'PWM Servos & HC-SR04 Ultrasonic Telemetry',
      deployment: 'Spatial Hand Matrix Actuators',
      metric: '< 16.4ms Closed-Loop',
      details: 'Sub-millimeter ultrasonic echo timing, dead-zone suppression, and multi-channel hardware PWM motor coordination without thread jitter.',
      tags: ['PWM', 'HC-SR04', 'Servo Control', 'Microsecond Timing']
    },
    {
      name: 'React 19 & Concurrent Mode',
      category: 'Web',
      focus: 'Modern Component Systems & Micro-Interactions',
      deployment: 'Atelier Portfolio & Spatial Dashboard',
      metric: 'Concurrent Reconciliation',
      details: 'Architecting high-frequency telemetry dashboards with memoized selectors, custom RAF hooks, and zero-flicker state synchronizations.',
      tags: ['React 19', 'Hooks', 'Concurrent Mode', 'Virtual DOM']
    },
    {
      name: 'TypeScript & Modern JavaScript',
      category: 'Web',
      focus: 'Type-Safe Runtimes & ArrayBuffer Manipulation',
      deployment: 'Transit Telemetry & Web Interfaces',
      metric: 'Zero-Any Strict Typing',
      details: 'Strongly typed telemetry contracts, ArrayBuffer/Uint8Array binary decoding, and modern async generator streams for sensor pipelines.',
      tags: ['TypeScript', 'ESNext', 'ArrayBuffer', 'Async Streams']
    },
    {
      name: 'Vite 5 Build Tooling',
      category: 'Web',
      focus: 'ESM Bundling, Fast Refresh & Rollup',
      deployment: 'All Portfolio & Web Applications',
      metric: '2.3s Cold Production Build',
      details: 'Custom asset pipelines, module alias mapping, proxy middleware for Node backends, and multi-page rollups.',
      tags: ['Vite 5', 'Rollup', 'ESM', 'Tree-Shaking']
    },
    {
      name: 'Node.js & Express Microservices',
      category: 'Web',
      focus: 'High-Throughput Telemetry API Middleware',
      deployment: 'Portfolio Telemetry Server',
      metric: '5-Min In-Memory Proxy Cache',
      details: 'RESTful API gateway orchestrating rate-limited GitHub ledger caching, flat-file persistence, and simulated hardware telemetry endpoints.',
      tags: ['Node.js', 'Express', 'Proxy Caching', 'REST APIs']
    },
    {
      name: '1D & Multi-State Kalman Filtering',
      category: 'Vision',
      focus: 'Sensor Noise Reduction & Dead-Reckoning',
      deployment: 'SmartTransit & Interactive Workbench',
      metric: '86% Variance Reduction',
      details: 'Formulation of recursive state estimation equations: time update (prediction) and measurement update (Kalman gain correction) for sensor fusion.',
      tags: ['Kalman Filter', 'Dead-Reckoning', 'Sensor Fusion', 'State Estimation']
    },
    {
      name: 'MediaPipe 3D Landmark Inference',
      category: 'Vision',
      focus: '21-Point Optical Hand Tracking',
      deployment: 'Spatial Control Matrix Host',
      metric: '60 FPS Real-Time Inference',
      details: 'Extracting normalized 3D hand coordinates (X, Y, Z depth) from live optical video streams, transforming vectors into spatial command codes.',
      tags: ['MediaPipe', '3D Landmarks', 'Computer Vision', 'Vector Extraction']
    },
    {
      name: 'Python & OpenCV Processing',
      category: 'Vision',
      focus: 'Video Pipelines, NumPy Matrix Operations',
      deployment: 'Computer Vision Host Ingestion',
      metric: 'Sub-10ms Frame Processing',
      details: 'Live frame buffer acquisition via V4L2/OpenCV, grayscale thresholding, bounding-box calculations, and PySerial bridge streaming.',
      tags: ['Python 3', 'OpenCV', 'NumPy', 'PySerial']
    },
    {
      name: 'Spatial Geodesic Algorithms',
      category: 'Vision',
      focus: 'GTFS Snapping & Dead-Reckoning Extrapolation',
      deployment: 'SmartTransit Kerala Coastal Engine',
      metric: '180s Tunnel Dead-Reckoning',
      details: 'Snapping erratic GPS points along Kerala coastal roads against OpenStreetMap transit vectors using haversine perpendicular distances.',
      tags: ['Haversine', 'OSM Vectors', 'GTFS', 'Geodesics']
    },
    {
      name: 'MQTT & WebSocket Streaming',
      category: 'Systems',
      focus: 'Low-Latency Full-Duplex Sensor Transport',
      deployment: 'Transit Telemetry Ingestion Hub',
      metric: '< 18ms End-to-End Latency',
      details: 'Publish/subscribe topic hierarchies for high-frequency GPS coordinate broadcasts, delta-compression, and automated reconnection backoffs.',
      tags: ['MQTT', 'WebSockets', 'Pub/Sub', 'Delta Compression']
    },
    {
      name: 'Linux / POSIX Systems & TTY',
      category: 'Systems',
      focus: 'Kernel TTY Configuration, Shell Scripting, Permissions',
      deployment: 'Embedded Linux Host & Development',
      metric: 'Native POSIX Tooling',
      details: 'Configuring udev rules for serial bridges (`/dev/ttyUSB0`), process isolation, memory-budget profiling, and automated build pipelines.',
      tags: ['Linux', 'Bash', 'udev Rules', 'POSIX TTY']
    },
    {
      name: 'Git & Version Control Mastery',
      category: 'Systems',
      focus: 'Atomic History, Branch Strategy, Multi-Remotes',
      deployment: 'GitHub @hacker-oss-ux Repositories',
      metric: 'Clean Commit Disciplinary Ledger',
      details: 'Monorepo project layouts, conventional commit semantics, branch hygiene, CI test verification, and open-source maintenance.',
      tags: ['Git', 'GitHub Flow', 'CI/CD', 'Semantics']
    },
    {
      name: 'Cyber Threat Anomaly Correlation',
      category: 'Systems',
      focus: 'OSINT Reconnaissance, IoC Matching, Anomaly Radar',
      deployment: 'CyberThreat Radar Engine',
      metric: 'O(1) Indicator Matching',
      details: 'Asynchronous multi-source intelligence ingestion, IoC signature correlation with Bloom filters, and automated network anomaly reporting.',
      tags: ['OSINT', 'IoC Matching', 'Bloom Filters', 'Threat Radar']
    }
  ];

  const filtered = skills.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section
      id="arsenal"
      data-section="arsenal"
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
              Technical Competencies ─ Systems Arsenal
            </div>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dark-muted)',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search C++, Kalman, ESP32..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: 'var(--bg-travertine)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                color: 'var(--text-dark)',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`editorial-tab ${activeCategory === cat.id ? 'active' : ''}`}
              style={{ color: 'var(--text-dark)' }}
            >
              <span>{cat.label}</span>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>
                ({cat.id === 'All' ? skills.length : skills.filter((s) => s.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((skill, idx) => (
            <div
              key={skill.name + idx}
              onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
              style={{
                background: '#edeae6',
                borderRadius: '8px',
                padding: '1.75rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e3ded8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#edeae6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: 'var(--text-dark-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {skill.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={12} /> {skill.metric}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: 'var(--text-dark)',
                    marginBottom: '6px',
                  }}
                >
                  {skill.name}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-dark-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {skill.focus}
                </p>

                <p style={{ fontSize: '14px', color: '#4a443e', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {skill.details}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-light-subtle)',
                    marginBottom: '8px',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ color: 'var(--text-dark-muted)' }}>Deployed in:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {skill.deployment} <ExternalLink size={11} />
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skill.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        padding: '2px 6px',
                        background: 'rgba(0,0,0,0.05)',
                        borderRadius: '3px',
                        color: 'var(--text-dark)',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
