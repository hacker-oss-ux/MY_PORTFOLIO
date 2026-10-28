import React from 'react';

export default function BorderBeam({
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = '#38bdf8',
  colorTo = '#34d399',
  borderWidth = 1.5,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          aspectRatio: '1',
          width: `${size}px`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          background: `radial-gradient(circle at center, ${colorFrom}, ${colorTo}, transparent 70%)`,
          offsetPath: `rect(0 auto auto 0 round inherit)`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(4px)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
