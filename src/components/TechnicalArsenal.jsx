import React, { useState } from 'react';
import { Cpu, Globe, Eye, Terminal, Search, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function TechnicalArsenal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = [
    { id: 'All', label: 'All Disciplines', icon: Terminal },
    { id: 'Embedded', label: 'Embedded & Hardware', icon: Cpu },
    { id: 'Web', label: 'Reactive Web Runtimes', icon: Globe },
    { id: 'Vision', label: 'Signal, Vision & Math', icon: Eye },
    { id: 'Systems', label: 'Protocols & Infrastructure', icon: Terminal },
  ];

  const skills = [
    // 1. Embedded & Silicon
    {
      name: 'ESP32 Dual-Core Architecture',
      category: 'Embedded',
      focus: 'Xtensa LX6/LX7 Microcontrollers & Pinning',
      depth: 'Advanced Systems',
      deployment: 'Spatial Control Matrix',
      metric: 'FreeRTOS Core 0/1 Task Split',
      details: 'Dual-core task pinning separating real-time serial ring-buffer decoding on Core 0 from ultrasonic sonar polling and PWM actuator generation on Core 1.',
      tags: ['FreeRTOS', 'UART', 'Ring Buffers', 'Xtensa']
    },
    {
      name: 'Embedded C & C++',
      category: 'Embedded',
      focus: 'Bare-Metal & RTOS Firmware Development',
      depth: 'Production Grade',
      deployment: 'Spatial Control Matrix & IoT Nodes',
      metric: 'Zero-Allocation Runtime',
      details: 'Deterministic firmware engineering with fixed-size ring buffers, interrupt service routines (ISRs), hardware timers, and microsecond-accurate PWM.',
      tags: ['C/C++17', 'Memory Budgets', 'ISRs', 'Fixed Buffers']
    },
    {
      name: 'Hardware Serial Protocols',
      category: 'Embedded',
      focus: 'UART, I2C, SPI Bus Engineering',
      depth: 'Systems Level',
      deployment: 'High-Baud Sensor Bridges',
      metric: '115,200 bps Framing',
      details: 'Custom framing byte structures with 0xAA start headers, command IDs, length markers, payload bytes, and XOR/CRC-8 integrity checksums.',
      tags: ['UART', 'I2C', 'SPI', 'CRC-8', 'XOR Checksum']
    },
    {
      name: 'Actuator & Sonar Integration',
      category: 'Embedded',
      focus: 'PWM Servos & HC-SR04 Ultrasonic Telemetry',
      depth: 'Applied Robotics',
      deployment: 'Spatial Hand Matrix Actuators',
      metric: '< 16.4ms Closed-Loop',
      details: 'Sub-millimeter ultrasonic echo timing, dead-zone suppression, and multi-channel hardware PWM motor coordination without thread jitter.',
      tags: ['PWM', 'HC-SR04', 'Servo Control', 'Microsecond Timing']
    },

    // 2. Reactive Web Runtimes
    {
      name: 'React 19 & Concurrent Architecture',
      category: 'Web',
      focus: 'Modern Component Systems & Micro-Interactions',
      depth: 'Production Grade',
      deployment: 'Atelier Portfolio & Spatial Dashboard',
      metric: 'Concurrent Reconciliation',
      details: 'Architecting high-frequency telemetry dashboards with memoized selectors, custom RAF hooks, and zero-flicker state synchronizations.',
      tags: ['React 19', 'Hooks', 'Concurrent Mode', 'Virtual DOM']
    },
    {
      name: 'TypeScript & Modern JavaScript',
      category: 'Web',
      focus: 'Type-Safe Runtimes & ArrayBuffer Manipulation',
      depth: 'Senior Level',
      deployment: 'Transit Telemetry & Web Interfaces',
      metric: 'Zero-Any Strict Typing',
      details: 'Strongly typed telemetry contracts, ArrayBuffer/Uint8Array binary decoding, and modern async generator streams for sensor pipelines.',
      tags: ['TypeScript', 'ESNext', 'ArrayBuffer', 'Async Streams']
    },
    {
      name: 'Vite 5 Build Tooling',
      category: 'Web',
      focus: 'ESM Bundling, Fast Refresh & Rollup',
      depth: 'Production Tooling',
      deployment: 'All Portfolio & Web Applications',
      metric: '2.6s Cold Production Build',
      details: 'Configuration of custom Vite asset pipelines, module alias mapping, proxy middleware for Node backends, and multi-page rollups.',
      tags: ['Vite 5', 'Rollup', 'ESM', 'Tree-Shaking']
    },
    {
      name: 'Node.js & Express Microservices',
      category: 'Web',
      focus: 'High-Throughput Telemetry API Middleware',
      depth: 'Backend Systems',
      deployment: 'Portfolio Telemetry Server',
      metric: '5-Min In-Memory Proxy Cache',
      details: 'RESTful API gateway orchestrating rate-limited GitHub ledger caching, flat-file ledger persistence, and simulated hardware telemetry endpoints.',
      tags: ['Node.js', 'Express', 'Proxy Caching', 'REST APIs']
    },
    {
      name: 'Framer Motion & Spring Physics',
      category: 'Web',
      focus: 'GPU-Accelerated Kinematic Motion',
      depth: 'Atelier Level',
      deployment: 'Interactive Dock & Sticky Transitions',
      metric: '60 FPS Hardware Render',
      details: 'Mathematical spring physics (`mass: 0.1, stiffness: 160`), container 3D perspective transforms, and scroll-linked progress beams.',
      tags: ['Framer Motion', 'Spring Physics', 'Kinematics', 'Layout Animations']
    },

    // 3. Signal, Vision & Math
    {
      name: '1D & Multi-State Kalman Filtering',
      category: 'Vision',
      focus: 'Sensor Noise Reduction & Dead-Reckoning',
      depth: 'Mathematical Modeling',
      deployment: 'SmartTransit & Interactive Workbench',
      metric: '86% Variance Reduction',
      details: 'Formulation of recursive state estimation equations: time update (prediction) and measurement update (Kalman gain correction) for sensor fusion.',
      tags: ['Kalman Filter', 'Dead-Reckoning', 'Sensor Fusion', 'State Estimation']
    },
    {
      name: 'MediaPipe 3D Landmark Inference',
      category: 'Vision',
      focus: '21-Point Optical Hand Tracking',
      depth: 'Applied Computer Vision',
      deployment: 'Spatial Control Matrix Host',
      metric: '60 FPS Real-Time Inference',
      details: 'Extracting normalized 3D hand coordinates (X, Y, Z depth) from live optical video streams, transforming vectors into spatial command codes.',
      tags: ['MediaPipe', '3D Landmarks', 'Computer Vision', 'Vector Extraction']
    },
    {
      name: 'Python & OpenCV Processing',
      category: 'Vision',
      focus: 'Video Pipelines, NumPy Matrix Operations',
      depth: 'Applied Systems',
      deployment: 'Computer Vision Host Ingestion',
      metric: 'Sub-10ms Frame Processing',
      details: 'Live frame buffer acquisition via V4L2/OpenCV, grayscale thresholding, bounding-box calculations, and PySerial bridge streaming.',
      tags: ['Python 3', 'OpenCV', 'NumPy', 'PySerial']
    },
    {
      name: 'Spatial Geodesic Algorithms',
      category: 'Vision',
      focus: 'GTFS Snapping & Dead-Reckoning Extrapolation',
      depth: 'Algorithmic Transit',
      deployment: 'SmartTransit Kerala Coastal Engine',
      metric: '180s Tunnel Dead-Reckoning',
      details: 'Snapping erratic GPS points along Kerala coastal roads against OpenStreetMap transit vectors using haversine perpendicular distances.',
      tags: ['Haversine', 'OSM Vectors', 'GTFS', 'Geodesics']
    },

    // 4. Protocols & Infrastructure
    {
      name: 'MQTT & WebSocket Streaming',
      category: 'Systems',
      focus: 'Low-Latency Full-Duplex Sensor Transport',
      depth: 'Distributed Systems',
      deployment: 'Transit Telemetry Ingestion Hub',
      metric: '< 18ms End-to-End Latency',
      details: 'Publish/subscribe topic hierarchies for high-frequency GPS coordinate broadcasts, delta-compression, and automated reconnection backoffs.',
      tags: ['MQTT', 'WebSockets', 'Pub/Sub', 'Delta Compression']
    },
    {
      name: 'Linux / POSIX Systems & TTY',
      category: 'Systems',
      focus: 'Kernel TTY Configuration, Shell Scripting, Permissions',
      depth: 'Systems Administration',
      deployment: 'Embedded Linux Host & Development',
      metric: 'Native POSIX Tooling',
      details: 'Configuring udev rules for serial bridges (`/dev/ttyUSB0`), process isolation, memory-budget profiling, and automated build pipelines.',
      tags: ['Linux', 'Bash', 'udev Rules', 'POSIX TTY']
    },
    {
      name: 'Git & Version Control Mastery',
      category: 'Systems',
      focus: 'Atomic History, Branch Strategy, Multi-Remotes',
      depth: 'Workflow Rigor',
      deployment: 'GitHub @hacker-oss-ux Repositories',
      metric: 'Clean Commit Disciplinary Ledger',
      details: 'Monorepo project layouts, conventional commit semantics, branch hygiene, CI test verification, and open-source maintenance.',
      tags: ['Git', 'GitHub Flow', 'CI/CD', 'Semantics']
    },
    {
      name: 'Cyber Threat Anomaly Correlation',
      category: 'Systems',
      focus: 'OSINT Reconnaissance, IoC Matching, Anomaly Radar',
      depth: 'Security Telemetry',
      deployment: 'CyberThreat Radar Engine',
      metric: 'O(1) Indicator Matching',
      details: 'Asynchronous multi-source intelligence ingestion, IoC signature correlation with Bloom filters, and automated network anomaly reporting.',
      tags: ['OSINT', 'IoC Matching', 'Bloom Filters', 'Threat Radar']
    }
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="skills"
      style={{
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Terminal size={16} /> Technical Competencies & Systems Arsenal
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
            Engineering Capabilities & Tooling
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '18px' }}>
            Every discipline is grounded in verified production implementations—from bare-metal FreeRTOS silicon to streaming reactive web runtimes.
          </p>
        </div>

        {/* Live Search Input */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '320px',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search C++, Kalman, ESP32, React..."
            style={{
              width: '100%',
              padding: '12px 14px 12px 42px',
              background: 'var(--bg-surface)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="tab-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                background: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                color: isActive ? '#090a0f' : 'var(--text-secondary)',
                border: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#090a0f' : 'var(--text-muted)',
                }}
              >
                {cat.id === 'All' ? skills.length : skills.filter((s) => s.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredSkills.map((skill, idx) => (
          <div
            key={skill.name + idx}
            className="surface-card"
            onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
            style={{
              padding: '1.75rem',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, background 0.2s ease',
              border: selectedSkill?.name === skill.name ? '1px solid var(--accent-primary)' : '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'var(--bg-surface-elevated)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = selectedSkill?.name === skill.name ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)';
            }}
          >
            <div>
              {/* Top Meta Line */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--accent-primary)',
                    background: 'rgba(56, 189, 248, 0.1)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {skill.category}
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <CheckCircle2 size={13} /> {skill.metric}
                </span>
              </div>

              {/* Skill Headline */}
              <h3
                style={{
                  fontSize: '20px',
                  lineHeight: 1.25,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                {skill.name}
              </h3>

              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                  lineHeight: 1.4,
                }}
              >
                {skill.focus}
              </div>

              {/* Concrete Deployment Reference */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                }}
              >
                {skill.details}
              </p>
            </div>

            {/* Bottom Proof Anchor & Tags */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '0.85rem',
                }}
              >
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Applied in:</span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {skill.deployment} <ExternalLink size={12} color="var(--accent-primary)" />
                </span>
              </div>

              {/* Tag Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--text-muted)',
          }}
        >
          No competencies match '{searchQuery}'. Try searching for 'FreeRTOS', 'Kalman', 'React', or 'C++'.
        </div>
      )}
    </section>
  );
}
