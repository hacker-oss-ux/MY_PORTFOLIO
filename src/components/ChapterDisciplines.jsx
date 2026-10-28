import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ChapterDisciplines() {
  const disciplines = [
    {
      num: '01',
      title: 'Embedded Silicon & FreeRTOS',
      focus: 'Dual-Core Xtensa & Task Pinning',
      desc: 'Deterministic FreeRTOS task scheduling. Core 0 handles UART ring-buffer packet decoding with XOR checksum validation; Core 1 coordinates ultrasonic HC-SR04 sonar pulses and microsecond-accurate PWM motor actuators.',
      metric: '< 16.4ms Closed-Loop',
      image: '/images/project_spatial.png',
      tags: ['ESP32', 'FreeRTOS', 'UART 115200', 'PWM Actuators'],
    },
    {
      num: '02',
      title: 'Reactive Web Runtimes',
      focus: 'Concurrent React 19 & High-Throughput Streams',
      desc: 'Architecting high-frequency telemetry web frontends without reconciliation thrashing. Utilizing modern React 19 Concurrent Mode, memoized selectors, custom requestAnimationFrame render loops, and GPU-accelerated spring kinematics.',
      metric: '60 FPS Hardware Render',
      image: '/images/project_transit.png',
      tags: ['React 19', 'TypeScript', 'Vite 5', 'Spring Physics'],
    },
    {
      num: '03',
      title: 'Signal Processing & Vision',
      focus: 'Kalman State Estimation & 3D Tracking',
      desc: 'Formulation and implementation of recursive 1D and multidimensional Kalman filter state estimation algorithms. Filtering erratic sensor noise, calculating dynamic Kalman gain, and running 21-landmark optical 3D hand vector inference at 60fps.',
      metric: '86% Variance Reduction',
      image: '/images/project_threat.png',
      tags: ['Kalman Filter', 'Dead-Reckoning', 'MediaPipe', 'OpenCV'],
    },
    {
      num: '04',
      title: 'Systems Telemetry & OSINT',
      focus: 'Distributed Protocols & Threat Anomaly Radar',
      desc: 'Full-duplex MQTT message broker clustering and binary telemetry ingestion. Utilizing in-memory O(1) Bloom filters for sub-microsecond threat indicator deduplication and automated graph correlation of infrastructure anomalies.',
      metric: '12,000 Events / Sec',
      image: '/images/ajay_plate.png',
      tags: ['MQTT', 'WebSockets', 'Bloom Filter', 'OSINT Radar'],
    },
  ];

  return (
    <section
      id="disciplines"
      data-section="disciplines"
      data-header-bg="#262220"
      data-header-text="#f3eee8"
      data-header-border="#5a524d"
      data-horizontal-panel
      style={{
        background: 'var(--bg-dark)',
        color: 'var(--text-light)',
      }}
      className="relative flex w-full flex-col shrink-0 overflow-hidden md:h-dvh md:w-max md:flex-row md:flex-nowrap"
    >
      {/* Chapter Intro Column (Left on Desktop) */}
      <div
        style={{
          borderRight: '1px solid var(--border-dark)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="w-full md:w-[460px] md:h-full p-8 md:pl-28 md:pr-12 md:py-16 shrink-0"
      >
        <div>
          <div className="chapter-tag" style={{ color: 'var(--text-light-muted)', marginBottom: '1.5rem' }}>
            Chapter III ─ What I Architect
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 3.2vw, 3rem)',
              fontWeight: 500,
              color: 'var(--text-light)',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            Architecting physical computing bridges, low-latency telemetry pipelines, and reactive web runtimes.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-light-muted)', lineHeight: 1.6 }}>
            Every discipline is grounded in verified production implementations—from bare-metal FreeRTOS dual-core silicon to streaming browser runtimes.
          </p>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8a8178', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          4 ARCHITECTURAL PILLARS ─ 01 TO 04
        </div>
      </div>

      {/* 4 Majestic Columns Sitting Side-by-Side (Matching ajaygirish.dev) */}
      <div className="flex flex-col md:flex-row md:flex-nowrap md:h-full">
        {disciplines.map((d) => (
          <article
            key={d.num}
            className="group relative overflow-hidden w-full md:w-[380px] md:h-full p-8 md:p-12 shrink-0 md:border-b-0"
            style={{
              background: '#1f1d1b',
              borderRight: '1px solid var(--border-dark)',
              borderBottom: '1px solid var(--border-dark)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background 0.4s ease',
            }}
          >
            {/* Background Media with Hover Zoom and Dark Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0.1,
                transition: 'opacity 0.45s ease',
              }}
              className="group-hover:opacity-25"
            >
              <img
                src={d.image}
                alt={d.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(0.6) contrast(1.1)',
                  transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className="group-hover:scale-110"
              />
            </div>

            {/* Top Content: Large Serif Numeral */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '2.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                    color: '#8a8178',
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  {d.num}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(52, 211, 153, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  <CheckCircle2 size={12} /> {d.metric}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '22px',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: 'var(--text-light)',
                  marginBottom: '6px',
                }}
              >
                {d.title}
              </h3>

              <p
                style={{
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-mono)',
                  color: '#8a8178',
                  marginBottom: '1.25rem',
                }}
              >
                {d.focus}
              </p>

              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: '#c8c0b8',
                }}
              >
                {d.desc}
              </p>
            </div>

            {/* Bottom Tags */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                marginTop: '1.5rem',
              }}
            >
              {d.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 7px',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#edeae6',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
