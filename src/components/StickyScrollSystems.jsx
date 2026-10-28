import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function StickyScrollSystems() {
  const [activeId, setActiveId] = useState('spatial');

  const systems = [
    {
      id: 'spatial',
      title: 'Spatial Control Matrix',
      tagline: 'Computer Vision & Embedded Hardware Bridge',
      summary: 'Deterministic physical computing bridge marrying MediaPipe optical vision with ESP32 microcontrollers over high-baud UART.',
      image: '/images/project_spatial.png',
      problem:
        'Optical hand-tracking models run on commodity host processors in non-deterministic Python environments, while embedded actuators require microsecond-accurate PWM control and continuous ultrasonic distance polling without thread contention.',
      architecture: [
        'Python host captures webcam frames at 60fps and runs MediaPipe 21-landmark 3D coordinate inference.',
        'Extracted hand vector coordinates (X, Y, Z depth) are serialized into a compact 8-byte framed binary packet with XOR checksum.',
        'High-baud UART (115200 bps) streams packets to an ESP32 dual-core Xtensa microcontroller running FreeRTOS.',
        'Core 0 handles asynchronous ring-buffer byte decoding and CRC verification; Core 1 coordinates ultrasonic HC-SR04 sonar pulses and multi-channel PWM actuators.',
      ],
      metrics: [
        { label: 'Closed-Loop Latency', value: '< 16.4 ms' },
        { label: 'Frame Drop Rate', value: '0.00 % nominal' },
        { label: 'Packet Overhead', value: '8 bytes / frame' },
        { label: 'RTOS Task Split', value: 'Dual-core pinned' },
      ],
      codeSnippet: `// ESP32 FreeRTOS Packet Parser & Checksum Verification
void vTaskSerialParser(void *pvParameters) {
  uint8_t buffer[8];
  for (;;) {
    if (Serial2.available() >= 8) {
      if (Serial2.read() == 0xAA) { // Frame Header
        uint8_t cmd = Serial2.read();
        uint8_t x   = Serial2.read();
        uint8_t y   = Serial2.read();
        uint8_t z   = Serial2.read();
        uint8_t len = Serial2.read();
        uint8_t crc = Serial2.read();
        
        // XOR checksum validation
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
      title: 'SmartTransit Kerala',
      tagline: 'Reactive Transportation & Telemetry Engine',
      summary: 'Real-time urban transit vehicle schedule reconciliation and trajectory estimation engine across dense state corridors.',
      image: '/images/project_transit.png',
      problem:
        'Cellular network blackspots and severe GPS multipath reflection in dense Kerala coastal corridors cause erratic location jumps, false delay reports, and broken passenger arrival predictions.',
      architecture: [
        'Vehicle on-board units publish raw NMEA GPS coordinates and timestamped speedometer ticks over MQTT.',
        'Ingestion microservice feeds coordinates into a 1-dimensional Kalman Filter to filter sensor variance and extrapolate vehicle dead-reckoning during tunnel outages.',
        'Spatial reconciliation service snaps filtered trajectories against OpenStreetMap GTFS transit route vectors.',
        'High-throughput WebSocket cluster broadcasts binary delta updates to thousands of passenger web clients.',
      ],
      metrics: [
        { label: 'Estimation Accuracy', value: '98.4 % on-time' },
        { label: 'Dead-Reckoning Max', value: '180s without loss' },
        { label: 'Broadcast Latency', value: '18 ms end-to-end' },
        { label: 'Throughput', value: '1,200 events/sec' },
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
    // Prediction step
    this.p = this.p + this.q;
    
    // Measurement update step
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
      title: 'CyberThreat Radar & OSINT Pipeline',
      tagline: 'Cybersecurity Telemetry & Threat Ingestion',
      summary: 'Asynchronous multi-source threat intelligence ingestion, IoC correlation, and automated network anomaly reporting.',
      image: '/images/project_threat.png',
      problem:
        'Security teams are overwhelmed by thousands of disparate vulnerability feeds and unstructured OSINT data sources with duplicate records, stale indicators, and slow manual lookup latencies.',
      architecture: [
        'Asynchronous Python workers continuously stream structured STIX/TAXII threat feeds and Shodan port telemetry.',
        'In-memory Bloom filters deduplicate millions of IP/hash indicators in sub-microsecond time before persistent database writes.',
        'Correlates observed perimeter packet flows against confirmed CVE exploits and known command-and-control signatures.',
        'Generates actionable incident dossiers with cryptographically signed audit logs.',
      ],
      metrics: [
        { label: 'Deduplication Speed', value: '< 2 µs / indicator' },
        { label: 'Feed Sources', value: 'Shodan, OTX, CISA' },
        { label: 'False Positive Red.', value: '84.2 % reduction' },
        { label: 'Ingestion Engine', value: 'AsyncIO Worker Pool' },
      ],
      codeSnippet: `// Async Python Indicator Ingestion Pipeline (Excerpt)
async def process_threat_stream(feed_queue: asyncio.Queue, bloom_filter: ScalableBloomFilter):
    while True:
        ioc_event = await feed_queue.get()
        ioc_hash = hashlib.sha256(ioc_event['indicator'].encode()).hexdigest()
        
        # O(1) Bloom filter membership check
        if ioc_hash not in bloom_filter:
            bloom_filter.add(ioc_hash)
            await persist_and_correlate(ioc_event)
            
        feed_queue.task_done()`,
      repo: 'https://github.com/hacker-oss-ux',
    },
  ];

  const current = systems.find((s) => s.id === activeId) || systems[0];

  return (
    <section
      id="systems"
      style={{
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
          Selected Systems & Case Studies
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '18px' }}>
          Architectural breakdowns of production-tested hardware bridges, stateful telemetry pipelines, and systems software.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}
      >
        {systems.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`tab-button ${activeId === s.id ? 'active' : ''}`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Dynamic Animated Case Study Presentation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="surface-card"
          style={{
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Technical Analysis */}
          <div>
            <h3 style={{ fontSize: '22px', marginBottom: '1rem' }}>
              {current.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '2rem' }}>
              {current.summary}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                The Engineering Challenge
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
                {current.problem}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Architectural Strategy
              </div>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7 }}>
                {current.architecture.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {current.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    {m.label}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={current.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action btn-secondary"
            >
              <GithubIcon size={16} /> View Code on GitHub <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right: Code Sample & Visual Plate */}
          <div>
            <div
              style={{
                width: '100%',
                height: '260px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                background: '#040508',
              }}
            >
              <img
                src={current.image}
                alt={current.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.05)',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>PRODUCTION CODE IMPLEMENTATION</span>
                <span style={{ color: 'var(--accent-primary)' }}>C++ / PYTHON VERIFIED</span>
              </div>
              <pre className="code-container">
                <code>{current.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Gallery Plate Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {systems.map((s) => (
          <div
            key={s.id}
            onClick={() => setActiveId(s.id)}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              cursor: 'pointer',
              opacity: activeId === s.id ? 1 : 0.65,
              transition: 'opacity 0.2s ease',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '140px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                marginBottom: '0.75rem',
              }}
            >
              <img
                src={s.image}
                alt={s.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
