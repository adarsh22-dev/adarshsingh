import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CaretLeft, CaretRight, Quotes } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    testimonial: "I thought it was impossible to make a website as beautiful as our product, but Adarsh proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial: "I've never met a web developer who truly cares about their clients' success like Adarsh does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial: "After Adarsh optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const Testimonials = () => {
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
    const cardW = slider.children[0]?.offsetWidth || 320;
    const gap = 24;
    const step = cardW + gap;
    const idx = Math.round(slider.scrollLeft / step);
    setCurrentIndex(Math.min(idx, testimonials.length - 1));
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const dir = diff > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(currentIndex + dir, testimonials.length - 1));
      scrollToIndex(next);
    }
    setTouchStart(null);
  };

  useGSAP(() => {
    gsap.fromTo('.testimonials-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="testimonials" style={{
      padding: isMobile ? '60px 0' : '100px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(122,0,255,0.06), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="testimonials-header" style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3rem' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', fontSize: isMobile ? '0.85rem' : '1rem', margin: 0 }}>
            What others say
          </p>
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '800', color: 'var(--text-main)', margin: '0.5rem 0 0' }}>
            Testimonials.
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Arrows (desktop) */}
          {!isMobile && currentIndex > 0 && (
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(5,5,15,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#7a00ff'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              <CaretLeft size={20} weight="bold" />
            </button>
          )}
          {!isMobile && currentIndex < testimonials.length - 1 && (
            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(5,5,15,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#7a00ff'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              <CaretRight size={20} weight="bold" />
            </button>
          )}

          {/* Slider */}
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
              padding: '20px 4px',
              WebkitOverflowScrolling: 'touch',
            }}
            className="testimonial-slider"
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: '0 0 auto',
                  width: isMobile ? 'calc(100vw - 3rem)' : '480px',
                  maxWidth: '480px',
                  scrollSnapAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(21,16,48,0.9), rgba(21,16,48,0.6))',
                  borderRadius: '24px',
                  padding: isMobile ? '2rem' : '2.5rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.4s ease',
                  transform: index === currentIndex ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(8px)',
                  opacity: index === currentIndex ? 1 : 0.5,
                }}
              >
                <Quotes size={32} color="#7a00ff" weight="fill" style={{ marginBottom: '1rem', opacity: 0.6 }} />
                <p style={{
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  color: '#fff',
                  lineHeight: '1.7',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{item.testimonial}"
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '1.25rem'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(122,0,255,0.3)'
                    }}
                  />
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', margin: 0 }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                      {item.designation} of {item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem'
          }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                style={{
                  width: i === currentIndex ? '28px' : '8px',
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
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-slider::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Testimonials;
