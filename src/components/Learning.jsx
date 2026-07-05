import React, { useRef, useState, useCallback, useEffect } from 'react';
import { BookOpenText, Cube, Robot } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Learning = () => {
  const containerRef = useRef();
  const sliderRef = useRef();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const learningItems = [
    {
      title: 'Advanced WebGL & Three.js',
      desc: 'Diving deep into custom shaders, particle systems, and rendering complex 3D scenes for immersive web experiences.',
      icon: <Cube size={32} weight="light" />,
      color: 'var(--accent-blue)'
    },
    {
      title: 'AI Integration in UI',
      desc: 'Exploring how to seamlessly weave LLMs and autonomous agents into user interfaces for smarter, context-aware web apps.',
      icon: <Robot size={32} weight="light" />,
      color: 'var(--accent-violet)'
    },
    {
      title: 'Modern Architecture',
      desc: 'Studying micro-frontends and advanced server-side rendering patterns to build scalable enterprise solutions.',
      icon: <BookOpenText size={32} weight="light" />,
      color: '#00ffa3'
    }
  ];

  const scrollToIndex = useCallback((i) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.children[i];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setCurrentIndex(i);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 300;
    const gap = 24;
    const step = cardW + gap;
    const idx = Math.round(slider.scrollLeft / step);
    setCurrentIndex(Math.min(idx, learningItems.length - 1));
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const dir = diff > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(currentIndex + dir, learningItems.length - 1));
      scrollToIndex(next);
    }
    setTouchStart(null);
  };

  useGSAP(() => {
    gsap.fromTo('.learning-card',
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1, scale: 1, y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="learning" style={{
      padding: '100px 0',
      minHeight: '60vh',
      position: 'relative'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.05), transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', color: 'var(--text-main)' }}>
          Continuous <span className="glowing-text" style={{ color: 'var(--accent-blue)' }}>Learning</span>
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--text-muted)' }}>
          What I'm currently studying to stay at the bleeding edge of tech.
        </p>

        {isMobile ? (
          <div style={{ position: 'relative' }}>
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                padding: '10px 4px 20px',
                WebkitOverflowScrolling: 'touch',
              }}
              className="learning-slider"
            >
              {learningItems.map((item, index) => (
                <div key={index} className="learning-card glass-panel" style={{
                  flex: '0 0 auto',
                  width: 'calc(100vw - 4rem)',
                  maxWidth: '340px',
                  scrollSnapAlign: 'center',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  transition: 'all 0.4s ease',
                  transform: index === currentIndex ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                  opacity: index === currentIndex ? 1 : 0.5,
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `${item.color}22`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 15px ${item.color}44`
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--text-main)' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              {learningItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  style={{
                    width: i === currentIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: i === currentIndex
                      ? 'linear-gradient(90deg, #00d2ff, #7a00ff)'
                      : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <style>{`.learning-slider::-webkit-scrollbar { display: none; }`}</style>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {learningItems.map((item, index) => (
              <div key={index} className="learning-card glass-panel" style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 10px 30px ${item.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  background: `${item.color}22`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 15px ${item.color}44`
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--text-main)' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Learning;
