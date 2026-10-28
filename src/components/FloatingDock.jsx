import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Layers, Activity, Cpu, Compass, GitBranch, MessageSquare, Mail } from 'lucide-react';

function DockIcon({ mouseX, item }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [42, 62, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  const Icon = item.icon;

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(item.href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width,
        height: width,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: '#1a1e2d',
        color: '#ffffff',
        textDecoration: 'none',
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '-34px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#121520',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
            }}
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>

      <Icon size={18} />
    </motion.a>
  );
}

export default function FloatingDock({ fixed = false }) {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { title: 'Home', icon: Home, href: '#hero' },
    { title: 'Selected Systems', icon: Layers, href: '#systems' },
    { title: 'Protocol Workbench', icon: Activity, href: '#workbench' },
    { title: 'Technical Arsenal', icon: Cpu, href: '#skills' },
    { title: 'Architecture', icon: Compass, href: '#architecture' },
    { title: 'Repositories', icon: GitBranch, href: '#repositories' },
    { title: 'Visitor Ledger', icon: MessageSquare, href: '#guestbook' },
    { title: 'Direct Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <div
      className="hide-mobile"
      style={{
        position: fixed ? 'fixed' : 'relative',
        bottom: fixed ? '1.75rem' : 'auto',
        left: fixed ? 0 : 'auto',
        right: fixed ? 0 : 'auto',
        display: 'flex',
        justifyContent: 'center',
        zIndex: fixed ? 1000 : 20,
        pointerEvents: fixed ? 'none' : 'auto',
        margin: fixed ? 0 : '2rem auto 0 auto',
      }}
    >
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 14px',
          borderRadius: '999px',
          background: '#121520',
          border: '1px solid #1a1e2d',
        }}
      >
        {items.map((item) => (
          <DockIcon key={item.title} mouseX={mouseX} item={item} />
        ))}
      </motion.nav>
    </div>
  );
}
