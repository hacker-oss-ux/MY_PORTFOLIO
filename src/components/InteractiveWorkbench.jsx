import React, { useState, useEffect, useRef } from 'react';
import { Activity, Binary } from 'lucide-react';

export default function InteractiveWorkbench() {
  const [activeTool, setActiveTool] = useState('kalman');

  // Tool 1: ESP32 UART Packet Builder State
  const [commandByte, setCommandByte] = useState(0x02);
  const [payloadX, setPayloadX] = useState(42);
  const [payloadY, setPayloadY] = useState(128);
  const [payloadZ, setPayloadZ] = useState(15);

  // Compute XOR checksum
  const header = 0xAA;
  const length = 0x03; // 3 payload bytes
  const checksum = header ^ commandByte ^ length ^ payloadX ^ payloadY ^ payloadZ;

  const hexString = [header, commandByte, length, payloadX, payloadY, payloadZ, checksum]
    .map((b) => '0x' + b.toString(16).toUpperCase().padStart(2, '0'))
    .join(' ');

  // Tool 2: Real Kalman Filter Interactive State
  const [processNoiseQ, setProcessNoiseQ] = useState(0.08); // Process Noise
  const [measurementNoiseR, setMeasurementNoiseR] = useState(4.0); // Sensor Noise
  const [kalmanGainDisplay, setKalmanGainDisplay] = useState('0.1428');
  const [varianceReductionDisplay, setVarianceReductionDisplay] = useState(86);

  const canvasRef = useRef(null);

  // Kalman Filter Simulation Loop
  useEffect(() => {
    if (activeTool !== 'kalman') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 340);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 340;
    };
    window.addEventListener('resize', onResize);

    // Filter state
    let stateEst = height / 2;
    let errorCov = 1.0;

    const dataPoints = [];
    const maxPoints = Math.floor(width / 6);

    let time = 0;

    const step = () => {
      time += 0.04;

      // Ground truth trajectory (smooth sinusoid)
      const groundTruth = height / 2 + Math.sin(time) * (height * 0.32);

      // Add Gaussian-like sensor measurement noise
      const noise = (Math.random() + Math.random() + Math.random() - 1.5) * Math.sqrt(measurementNoiseR) * 28;
      const measurement = groundTruth + noise;

      // Real 1D Kalman Filter Algorithm
      // 1. Time Update (Predict)
      const pPred = errorCov + processNoiseQ;

      // 2. Measurement Update (Correct)
      const kalmanGain = pPred / (pPred + measurementNoiseR);
      stateEst = stateEst + kalmanGain * (measurement - stateEst);
      errorCov = (1 - kalmanGain) * pPred;

      // Update UI readouts periodically
      if (Math.floor(time * 25) % 15 === 0) {
        setKalmanGainDisplay(kalmanGain.toFixed(4));
        const varRed = Math.max(0, Math.min(100, Math.round((1 - kalmanGain) * 100)));
        setVarianceReductionDisplay(varRed);
      }

      dataPoints.push({ truth: groundTruth, raw: measurement, est: stateEst });
      if (dataPoints.length > maxPoints) {
        dataPoints.shift();
      }

      // Draw visualization
      ctx.clearRect(0, 0, width, height);

      // Grid rules
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Plot Raw Noisy Measurements (Red dots)
      ctx.fillStyle = 'rgba(244, 63, 94, 0.65)';
      dataPoints.forEach((pt, i) => {
        const x = (i / maxPoints) * width;
        ctx.beginPath();
        ctx.arc(x, pt.raw, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Plot Ground Truth (Subtle dashed blue)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      dataPoints.forEach((pt, i) => {
        const x = (i / maxPoints) * width;
        if (i === 0) ctx.moveTo(x, pt.truth);
        else ctx.lineTo(x, pt.truth);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Plot Filtered Kalman Estimate (Solid Green)
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.beginPath();
      dataPoints.forEach((pt, i) => {
        const x = (i / maxPoints) * width;
        if (i === 0) ctx.moveTo(x, pt.est);
        else ctx.lineTo(x, pt.est);
      });
      ctx.stroke();

      animId = requestAnimationFrame(step);
    };

    step();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [activeTool, processNoiseQ, measurementNoiseR]);

  return (
    <section
      id="workbench"
      style={{
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
          Interactive Protocol Workbench
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '18px' }}>
          Functional interactive tools evaluating binary packet serialization and real-time mathematical state estimation.
        </p>
      </div>

      {/* Mode Selector */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveTool('kalman')}
          className={`tab-button ${activeTool === 'kalman' ? 'active' : ''}`}
        >
          <Activity size={16} /> 1D Kalman Filter State Estimator
        </button>
        <button
          onClick={() => setActiveTool('packet')}
          className={`tab-button ${activeTool === 'packet' ? 'active' : ''}`}
        >
          <Binary size={16} /> ESP32 UART Binary Packet Inspector
        </button>
      </div>

      {activeTool === 'kalman' ? (
        /* Tool 1: Kalman Filter */
        <div
          className="surface-card"
          style={{
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Controls */}
          <div>
            <h3 style={{ fontSize: '22px', marginBottom: '0.75rem' }}>
              Kalman Filter Parameters
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '2rem' }}>
              Tune the covariance ratio between process noise (system dynamics uncertainty) and sensor measurement noise (GPS or sonar jitter) to observe state convergence.
            </p>

            {/* Slider Q */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Process Noise (Q):</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{processNoiseQ.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.5"
                step="0.005"
                value={processNoiseQ}
                onChange={(e) => setProcessNoiseQ(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8' }}
              />
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Higher Q trusts new measurements faster; lower Q enforces smoother inertia.
              </div>
            </div>

            {/* Slider R */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Measurement Noise (R):</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{measurementNoiseR.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.2"
                value={measurementNoiseR}
                onChange={(e) => setMeasurementNoiseR(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#f43f5e' }}
              />
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Higher R penalizes noisy sensor spikes; lower R follows raw data closely.
              </div>
            </div>

            {/* Real-time Math Metrics */}
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Kalman Gain (K):</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{kalmanGainDisplay}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Noise Attenuation:</span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>{varianceReductionDisplay}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Convergence:</span>
                <span style={{ color: 'var(--text-primary)' }}>Asymptotically Stable</span>
              </div>
            </div>
          </div>

          {/* Plot Canvas */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>TRAJECTORY OSCILLOSCOPE</span>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ color: '#94a3b8' }}>-- Ground Truth</span>
                <span style={{ color: '#f43f5e' }}>● Raw Sensor</span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>— Kalman Filtered</span>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '340px',
                background: '#040508',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
              }}
            >
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      ) : (
        /* Tool 2: ESP32 UART Packet Builder */
        <div
          className="surface-card"
          style={{
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Controls */}
          <div>
            <h3 style={{ fontSize: '22px', marginBottom: '0.75rem' }}>
              Packet Fields Configuration
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '2rem' }}>
              Modify opcode and payload values to inspect deterministic byte framing and real-time XOR checksum parity.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Command Opcode (Byte 1)
              </label>
              <select
                value={commandByte}
                onChange={(e) => setCommandByte(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-primary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  outline: 'none',
                }}
              >
                <option value={0x01}>0x01 — CMD_SYSTEM_PING</option>
                <option value={0x02}>0x02 — CMD_SONAR_POLL</option>
                <option value={0x03}>0x03 — CMD_MOTOR_PWM</option>
                <option value={0x04}>0x04 — CMD_SYNC_TELEMETRY</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  X Vector
                </label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={payloadX}
                  onChange={(e) => setPayloadX(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-primary)',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Y Vector
                </label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={payloadY}
                  onChange={(e) => setPayloadY(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-primary)',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Z Depth
                </label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={payloadZ}
                  onChange={(e) => setPayloadZ(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-primary)',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Frame Size: <strong>7 Bytes</strong> · Baud: <strong>115200 bps</strong> · Serial Transfer Time: <strong>~60.7 µs</strong>
            </div>
          </div>

          {/* Packet Hex Dump */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                SERIAL WIRE HEX DUMP
              </div>
              <div
                style={{
                  padding: '1.5rem',
                  background: '#040508',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '18px',
                  letterSpacing: '0.05em',
                  color: '#38bdf8',
                }}
              >
                {hexString}
              </div>
            </div>

            {/* Byte Structural Breakdown */}
            <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span style={{ color: 'var(--text-muted)' }}>[0x00] Header</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>0xAA (Sync Delimiter)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span style={{ color: 'var(--text-muted)' }}>[0x01] Opcode</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{'0x' + commandByte.toString(16).toUpperCase().padStart(2, '0')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span style={{ color: 'var(--text-muted)' }}>[0x02] Length</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>0x03 (3 Bytes)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span style={{ color: 'var(--text-muted)' }}>[0x03..05] Payload</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{[payloadX, payloadY, payloadZ].map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(' ')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>[0x06] Checksum</span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>{'0x' + checksum.toString(16).toUpperCase().padStart(2, '0')} (XOR Parity)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
