import React, { useState } from 'react';
import { X, ExternalLink, Code2 } from 'lucide-react';

export default function ChapterWork() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'spatial',
      index: '01',
      title: 'Spatial Control Matrix',
      category: 'Computer Vision & Dual-Core Embedded Bridge',
      year: '2025',
      image: '/images/project_spatial.png',
      summary: 'Deterministic physical computing bridge marrying MediaPipe optical vision with ESP32 microcontrollers over high-baud UART.',
      metrics: [
        { label: 'Closed-Loop Latency', value: '< 16.4 ms' },
        { label: 'Frame Drop Rate', value: '0.00 %' },
        { label: 'FreeRTOS Task Split', value: 'Dual-core pinned' },
      ],
      architecture: [
        'Webcam frames captured at 60fps running MediaPipe 21-landmark 3D coordinate inference.',
        'Extracted hand vector coordinates serialized into 8-byte framed binary packet with XOR checksum.',
        'High-baud UART (115200 bps) streams packets to ESP32 dual-core Xtensa microcontroller.',
        'Core 0 handles ring-buffer decoding; Core 1 coordinates ultrasonic HC-SR04 sonar pulses and PWM actuators.',
      ],
      codeSnippet: `// ESP32 FreeRTOS Packet Parser & Checksum Verification
void vTaskSerialParser(void *pvParameters) {
  uint8_t buffer[8];
  for (;;) {
    if (Serial2.available() >= 8) {
      if (Serial2.read() == 0xAA) { // Header
        uint8_t cmd = Serial2.read();
        uint8_t x   = Serial2.read();
        uint8_t y   = Serial2.read();
        uint8_t z   = Serial2.read();
        uint8_t len = Serial2.read();
        uint8_t crc = Serial2.read();
        if ((cmd ^ x ^ y ^ z ^ len) == crc) {
          xQueueSend(xMotorQueue, &cmd, 0);
        }
      }
    }
    vTaskDelay(pdMS_TO_TICKS(1));
  }
}`,
      repo: 'https://github.com/hacker-oss-ux',
    },
    {
      id: 'transit',
      index: '02',
      title: 'SmartTransit Kerala',
      category: 'Reactive Transportation & Telemetry Engine',
      year: '2025',
      image: '/images/project_transit.png',
      summary: 'Real-time urban transit vehicle schedule reconciliation and trajectory estimation engine across dense Kerala coastal corridors.',
      metrics: [
        { label: 'Estimation Accuracy', value: '98.4 % on-time' },
        { label: 'Dead-Reckoning Max', value: '180s without loss' },
        { label: 'Broadcast Latency', value: '18 ms end-to-end' },
      ],
      architecture: [
        'Vehicle on-board units publish raw NMEA GPS coordinates and timestamped ticks over MQTT.',
        'Ingestion microservice feeds coordinates into 1D Kalman Filter to filter sensor variance and extrapolate dead-reckoning.',
        'Spatial reconciliation service snaps filtered trajectories against OpenStreetMap GTFS transit route vectors.',
        'High-throughput WebSocket cluster broadcasts binary delta updates to passenger web clients.',
      ],
      codeSnippet: `// 1D Kalman Filter Implementation for GPS Distance Estimation
class KalmanFilter1D {
  constructor(q = 0.05, r = 2.0, initialEst = 0.0) {
    this.q = q; // Process noise covariance
    this.r = r; // Measurement noise covariance
    this.x = initialEst; // State estimate
    this.p = 1.0; // Estimation error covariance
  }

  update(measurement) {
    this.p = this.p + this.q;
    const k = this.p / (this.p + this.r); // Kalman gain
    this.x = this.x + k * (measurement - this.x);
    this.p = (1 - k) * this.p;
    return this.x;
  }
}`,
      repo: 'https://github.com/hacker-oss-ux',
    },
    {
      id: 'threat',
      index: '03',
      title: 'CyberThreat Radar & OSINT Pipeline',
      category: 'Cybersecurity Telemetry & Anomaly Radar',
      year: '2024',
      image: '/images/project_threat.png',
      summary: 'Asynchronous multi-source threat intelligence ingestion, IoC signature correlation, and automated network anomaly reporting.',
      metrics: [
        { label: 'Indicator Ingestion', value: '12,000 / sec' },
        { label: 'Correlation Speed', value: 'O(1) Bloom filter' },
        { label: 'False Positive Reduction', value: '94.2 %' },
      ],
      architecture: [
        'Multi-source OSINT scraper ingests real-time threat indicators (hashes, malicious IPs, DNS tunnels).',
        'In-memory Bloom filter allows sub-microsecond pre-filtering of high-volume network telemetry logs.',
        'Graph correlation service clusters related attack infrastructure based on ASN and certificate telemetry.',
        'Alerting pipeline triggers automated firewall ACL updates and dispatch webhooks.',
      ],
      codeSnippet: `// O(1) Threat Signature Hash Verification
def verify_ioc_signature(raw_payload: bytes, bloom_filter: BloomFilter) -> bool:
    payload_hash = hashlib.sha256(raw_payload).hexdigest()
    if payload_hash in bloom_filter:
        return quarantine_cluster_node(payload_hash)
    return True`,
      repo: 'https://github.com/hacker-oss-ux',
    },
    {
      id: 'neural',
      index: '04',
      title: 'NeuralCipher Core',
      category: 'Cryptographic Hashing & Tensor Verifier',
      year: '2024',
      image: '/images/ajay_plate.png',
      summary: 'High-entropy cryptographic neural hashing lattice and tensor verification runtime for distributed integrity verification.',
      metrics: [
        { label: 'Entropy Density', value: '7.994 bits/byte' },
        { label: 'Avalanche Effect', value: '50.12 % delta' },
        { label: 'Throughput', value: '450 MB/s' },
      ],
      architecture: [
        'Non-linear tensor diffusion layer generating pseudo-random lattice states from seed data.',
        'Hardware-accelerated bitwise permutation rounds ensuring strict avalanche criteria.',
        'Verification harness testing output against NIST SP 800-22 statistical test suite.',
      ],
      codeSnippet: `// Tensor Permutation Round Core
void tensor_permute_round(uint64_t state[4], const uint64_t round_const) {
  state[0] ^= round_const;
  state[1] = (state[1] << 13) | (state[1] >> 51);
  state[2] += state[3];
  state[3] ^= (state[0] + state[1]);
}`,
      repo: 'https://github.com/hacker-oss-ux',
    },
  ];

  return (
    <section
      id="work"
      data-section="work"
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
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '3.5rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem',
          }}
        >
          <div className="chapter-tag" style={{ color: 'var(--text-dark-muted)', marginBottom: 0 }}>
            Chapter II ─ Selected Systems
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              textTransform: 'uppercase',
              color: 'var(--text-dark-muted)',
            }}
          >
            RELATED WORKS
          </span>
        </div>

        {/* Project List */}
        <div>
          {projects.map((project) => (
            <div
              key={project.id}
              className="work-item group relative"
              onClick={() => setSelectedProject(project)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(40px, 60px) 1fr auto',
                alignItems: 'center',
                padding: '2.25rem 0',
                borderBottom: '1px solid var(--border-light)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Index */}
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  color: 'var(--text-dark-muted)',
                }}
              >
                {project.index}
              </span>

              {/* Title & Domain */}
              <div style={{ paddingRight: '2rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--list-fs)',
                    lineHeight: 1.1,
                    fontWeight: 500,
                    color: 'var(--text-dark)',
                    marginBottom: '6px',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--text-dark-muted)' }}>
                  {project.category}
                </p>
              </div>

              {/* Right Side: Year + Ajay Girish Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span
                  className="hidden md:inline-block"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-dark-muted)' }}
                >
                  {project.year}
                </span>

                {/* Exact Ajay Girish Arrow SVG */}
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 56 56"
                  fill="none"
                  className="work-item-arrow"
                  style={{ color: 'var(--text-dark)' }}
                >
                  <mask id={`mask_${project.id}`} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                    <rect width="56" height="56" fill="#D9D9D9" />
                  </mask>
                  <g mask={`url(#mask_${project.id})`}>
                    <path
                      d="M14 42L42 14M42 14H21M42 14V35"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>

              {/* Ajay Girish Curtain-Reveal Floating Image */}
              <div
                className="curtain-reveal pointer-events-none hidden md:block"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '18%',
                  transform: 'translateY(-50%)',
                  width: '320px',
                  aspectRatio: '16/10',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#faf9f6',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.16)',
                  border: '1px solid var(--border-light)',
                  zIndex: 30,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            background: 'rgba(31, 29, 27, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: '#faf9f6',
              color: '#2e2b28',
              borderRadius: '12px',
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#2e2b28',
              }}
            >
              <X size={22} />
            </button>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#8a8178',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              PROJECT DOSSIER ─ {selectedProject.index}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              {selectedProject.title}
            </h2>

            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#6e6761', marginBottom: '2rem' }}>
              {selectedProject.summary}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                padding: '1.5rem',
                background: '#edeae6',
                borderRadius: '8px',
                marginBottom: '2rem',
              }}
            >
              {selectedProject.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: '#8a8178', fontFamily: 'var(--font-mono)' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#2e2b28' }}>{m.value}</div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Architectural Pipeline
            </h4>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedProject.architecture.map((step, i) => (
                <li key={i} style={{ fontSize: '15px', lineHeight: 1.6, color: '#4a443e' }}>
                  {step}
                </li>
              ))}
            </ul>

            <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Production Implementation Excerpt
            </h4>
            <div
              style={{
                background: '#1f1d1b',
                color: '#edeae6',
                borderRadius: '8px',
                padding: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                overflowX: 'auto',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              <pre>{selectedProject.codeSnippet}</pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <a
                href={selectedProject.repo}
                target="_blank"
                rel="noreferrer"
                className="to-link-underline"
                style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Inspect Code on GitHub <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
