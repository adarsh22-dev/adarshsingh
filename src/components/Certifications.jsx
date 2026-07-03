import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const badges = Array.from({ length: 21 }, (_, i) => ({ img: `/badges/img${i + 1}.png` }));

const Certifications = () => {
  const containerRef = useRef();
  const sliderRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const scrollTo = useCallback((dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 260;
    const gap = 24;
    const step = cardW + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    let newScroll = slider.scrollLeft + (dir === 'next' ? step : -step);
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    slider.scrollTo({ left: newScroll, behavior: 'smooth' });
    setCurrentIndex(Math.round(newScroll / step));
  }, []);

  const scrollToIndex = useCallback((i) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 260;
    const step = cardW + 24;
    slider.scrollTo({ left: i * step, behavior: 'smooth' });
    setCurrentIndex(i);
  }, []);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 260;
    const step = cardW + 24;
    const idx = Math.round(slider.scrollLeft / step);
    setCurrentIndex(Math.min(idx, badges.length - 1));
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      scrollTo(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  useGSAP(() => {
    gsap.fromTo('.cert-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="certifications"
      style={{
        padding: isMobile ? '60px 0' : '100px 0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(122, 0, 255, 0.06), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cert-header" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
          <p style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            fontSize: isMobile ? '0.85rem' : '1rem',
            margin: 0,
            textAlign: 'center',
          }}>
            Verified credentials
          </p>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '2.5rem',
            textAlign: 'center',
            color: 'var(--text-main)',
            margin: '0.5rem 0 0',
          }}>
            Certifications &{' '}
            <span className="glowing-text" style={{
              background: 'linear-gradient(135deg, #00d2ff, #7a00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Badges
            </span>
          </h2>
        </div>

        <div style={{ position: 'relative', padding: isMobile ? '0 0' : '0 40px' }}>
          {/* Arrows (desktop only) */}
          {!isMobile && (
            <>
              <button
                onClick={() => scrollTo('prev')}
                style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '45%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(5,5,15,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  zIndex: 10,
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#7a00ff'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}
              >
                <CaretLeft size={20} weight="bold" />
              </button>
              <button
                onClick={() => scrollTo('next')}
                style={{
                  position: 'absolute',
                  right: '-8px',
                  top: '45%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(5,5,15,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  zIndex: 10,
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#7a00ff'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </>
          )}

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
              padding: isMobile ? '10px 0' : '20px 10px',
              scrollbarWidth: 'none',
            }}
            className="cert-slider"
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                style={{
                  flex: '0 0 auto',
                  width: isMobile ? '180px' : '220px',
                  scrollSnapAlign: 'center',
                  padding: isMobile ? '1rem' : '1.5rem',
                  background: index === currentIndex
                    ? 'linear-gradient(135deg, rgba(122,0,255,0.15), rgba(0,210,255,0.05))'
                    : 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  border: index === currentIndex
                    ? '1px solid rgba(122,0,255,0.4)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.4s ease',
                  transform: index === currentIndex ? 'scale(1.02) translateY(-4px)' : 'scale(1)',
                  boxShadow: index === currentIndex ? '0 8px 30px rgba(122,0,255,0.2)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{
                  width: isMobile ? '140px' : '160px',
                  height: isMobile ? '140px' : '160px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.2)',
                }}>
                  <img
                    src={badge.img}
                    alt={`Badge ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML =
                        '<div style="color:var(--text-muted);font-size:0.75rem;text-align:center;padding:1rem">Badge</div>';
                    }}
                  />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  color: index === currentIndex ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: 500,
                  textAlign: 'center'
                }}>
                  Certificate #{index + 1}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap',
            maxWidth: '400px',
            margin: '1.5rem auto 0'
          }}>
            {badges.map((_, i) => (
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
                aria-label={`Go to badge ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cert-slider::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Certifications;
