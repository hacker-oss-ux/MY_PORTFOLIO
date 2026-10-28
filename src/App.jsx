import React, { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EditorialRailHeader from './components/EditorialRailHeader';
import EditorialHero from './components/EditorialHero';
import ChapterAbout from './components/ChapterAbout';
import ChapterWork from './components/ChapterWork';
import ChapterDisciplines from './components/ChapterDisciplines';
import ChapterArsenal from './components/ChapterArsenal';
import ChapterAffiliations from './components/ChapterAffiliations';
import ChapterFooter from './components/ChapterFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [notification, setNotification] = useState('');
  const storyRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  // 1. Lenis Smooth Momentum Scroll Engine (Matching ajaygirish.dev)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. GSAP ScrollTrigger Pinned Horizontal Story Track on Desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      const trigger = ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        animation: tween,
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Broadcast progress for Left Rail Hairline indicator & active panel detection
          window.dispatchEvent(
            new CustomEvent('horizontal-scroll-progress', {
              detail: { progress: self.progress },
            })
          );
        },
      });

      return () => {
        trigger.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Editorial Header Rail */}
      <EditorialRailHeader />

      {/* Main Narrative Flow Pinned Horizontally on Desktop (Matching ajaygirish.dev) */}
      <main id="main-content">
        <div ref={storyRef} data-horizontal-story className="bg-[#edeae6]" id="site-top">
          <div ref={pinRef} data-horizontal-pin className="relative w-full md:h-dvh md:overflow-hidden">
            <div ref={trackRef} data-horizontal-track className="flex w-full flex-col md:h-dvh md:flex-row md:flex-nowrap">
              {/* Prologue: Monograph & Rolling Year Counter */}
              <EditorialHero onNotify={triggerNotification} />

              {/* Chapter I: About, Profile & Academic Rigor */}
              <ChapterAbout />

              {/* Chapter II: Selected Systems & Floating Curtain Hover Previews */}
              <ChapterWork />

              {/* Chapter III: Disciplines & Architectural Practice (No Graphs) */}
              <ChapterDisciplines />

              {/* Technical Arsenal: Searchable Skills & Competencies */}
              <ChapterArsenal />

              {/* Chapter IV: Open Source Repositories & Affiliations */}
              <ChapterAffiliations />

              {/* Next Chapter: Monumental Heading, Direct Channels & Visitor Desk */}
              <ChapterFooter onNotify={triggerNotification} />
            </div>
          </div>
        </div>
      </main>

      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 10000,
            background: '#faf9f6',
            color: '#1f1d1b',
            border: '1px solid #b8b3ac',
            borderRadius: '6px',
            padding: '0.75rem 1.25rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}
