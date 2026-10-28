import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 0.95] : [1.02, 0.98];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.7], isMobile ? [0, 0] : [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], isMobile ? [1, 1] : scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.7], isMobile ? [0, 0] : [0, -40]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      }}
    >
      <div style={{ width: '100%', marginBottom: '2.5rem' }}>
        {titleComponent}
      </div>

      <div
        style={{
          width: '100%',
          perspective: '1200px',
        }}
      >
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            translateY: translate,
            transformStyle: 'preserve-3d',
            width: '100%',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
