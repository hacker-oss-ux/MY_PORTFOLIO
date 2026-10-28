import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        background: 'linear-gradient(90deg, #38bdf8 0%, #34d399 50%, #818cf8 100%)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 10000,
        boxShadow: '0 0 12px rgba(56, 189, 248, 0.6)',
      }}
    />
  );
}
