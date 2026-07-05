import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  'Full Stack Application Development Capstone Project V2 — IBM',
  'Full Stack Software Developer Assessment V2 — IBM',
  'Front-end Development with React — IBM',
  'Node and Express Essentials — IBM',
  'Developing Applications with SQL, Databases, and Django — IBM',
  'Container & Kubernetes Essentials V2 — IBM',
  'Application Development using Microservices and Serverless — IBM',
  'Introduction to Cloud Computing — IBM',
  'Git and GitHub Essentials — IBM',
  'Web Development with HTML, CSS, JavaScript Essentials — IBM',
  'Python Essentials 1 — Cisco Networking Academy',
  'Python Essentials 2 — Cisco Networking Academy',
  'Python Project for AI and Application Development — IBM',
  'Python for Data Science and AI — IBM',
  'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI — IBM',
  'Building AI Agents and Agentic Workflows Specialization — IBM',
  'Generative AI Mastermind — Outskill',
  'Cyber Threat Management — Cisco Networking Academy',
  'Shopify Theme Development: Online Store 2.0 + TailwindCSS',
  'Shopify Foundations: Introduction to Cross-Border Selling',
  'Simplified Magento 2',
  'Google Project Management Certificate',
  'Google UX Design Certificate',
  'Claude Code in Action — Anthropic',
  'JPMorganChase Software Engineering Job Simulation — Forage',
  'Deloitte Australia Data Analytics Job Simulation — Forage',
];

const DesktopSlider = () => {
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = useCallback((dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 260;
    const step = cardW + 24;
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
    setCurrentIndex(Math.min(idx, certs.length - 1));
  }, []);

  return (
    <div style={{ position: 'relative', padding: '0 40px' }}>
      <button
        onClick={() => scrollTo('prev')}
        style={{
          position: 'absolute', left: '-8px', top: '45%',
          transform: 'translateY(-50%)',
          background: 'rgba(5,5,15,0.7)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-main)', zIndex: 10,
          backdropFilter: 'blur(8px)', transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#7a00ff'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}
      >
        <CaretLeft size={20} weight="bold" />
      </button>
      <button
        onClick={() => scrollTo('next')}
        style={{
          position: 'absolute', right: '-8px', top: '45%',
          transform: 'translateY(-50%)',
          background: 'rgba(5,5,15,0.7)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-main)', zIndex: 10,
          backdropFilter: 'blur(8px)', transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#7a00ff'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}
      >
        <CaretRight size={20} weight="bold" />
      </button>

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        style={{
          display: 'flex', gap: '1.5rem', overflowX: 'auto',
          scrollSnapType: 'x mandatory', padding: '20px 10px',
          scrollbarWidth: 'none',
        }}
        className="cert-slider"
      >
        {certs.map((cert, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto', width: '260px', scrollSnapAlign: 'center',
              padding: '1.25rem 1rem',
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
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #7a00ff, #00d2ff)',
              fontSize: '1.1rem', fontWeight: 800, color: '#fff',
            }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <span style={{
              fontSize: '0.78rem',
              color: index === currentIndex ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: 500, lineHeight: '1.4',
            }}>
              {cert}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', gap: '0.5rem',
        marginTop: '1.5rem', flexWrap: 'wrap', maxWidth: '400px',
        margin: '1.5rem auto 0',
      }}>
        {certs.map((_, i) => (
          <button
            key={i} onClick={() => scrollToIndex(i)}
            style={{
              width: i === currentIndex ? '24px' : '8px', height: '8px',
              borderRadius: '4px', border: 'none', padding: 0, cursor: 'pointer',
              background: i === currentIndex
                ? 'linear-gradient(90deg, #00d2ff, #7a00ff)'
                : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
            aria-label={`Go to certificate ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const MobileSlider = () => {
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback((i) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 260;
    const step = cardW + 16;
    slider.scrollTo({ left: i * step, behavior: 'smooth' });
    setCurrentIndex(i);
  }, []);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = slider.children[0]?.offsetWidth || 260;
    const step = cardW + 16;
    const idx = Math.round(slider.scrollLeft / step);
    setCurrentIndex(Math.min(idx, certs.length - 1));
  }, []);

  return (
    <div>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        style={{
          display: 'flex', gap: '1rem', overflowX: 'auto',
          scrollSnapType: 'x mandatory', padding: '0.5rem 12px',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        }}
        className="cert-mobile-slider"
      >
        {certs.map((cert, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 240px', scrollSnapAlign: 'start',
              padding: '1rem',
              background: index === currentIndex
                ? 'linear-gradient(135deg, rgba(122,0,255,0.15), rgba(0,210,255,0.05))'
                : 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: index === currentIndex
                ? '1px solid rgba(122,0,255,0.4)'
                : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
              transform: index === currentIndex ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #7a00ff, #00d2ff)',
              fontSize: '0.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem',
            }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <span style={{
              fontSize: '0.7rem', color: 'var(--text-muted)',
              fontWeight: 500, lineHeight: '1.4',
            }}>
              {cert}
            </span>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '0.4rem',
        marginTop: '1rem', flexWrap: 'wrap',
      }}>
        {certs.map((_, i) => (
          <button
            key={i} onClick={() => scrollToIndex(i)}
            style={{
              width: i === currentIndex ? '20px' : '6px', height: '6px',
              borderRadius: '3px', border: 'none', padding: 0, cursor: 'pointer',
              background: i === currentIndex
                ? 'linear-gradient(90deg, #00d2ff, #7a00ff)'
                : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
            aria-label={`Go to certificate ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Certifications = () => {
  const containerRef = useRef();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useGSAP(() => {
    if (containerRef.current?.querySelector('.cert-header')) {
      gsap.to('.cert-header', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, { scope: containerRef, dependencies: [isMobile] });

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
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '600px',
        background: 'radial-gradient(circle, rgba(122, 0, 255, 0.06), transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cert-header" style={{
          marginBottom: isMobile ? '1.5rem' : '3rem',
          opacity: 1,
          transform: 'translateY(0)',
        }}>
          <p style={{
            textTransform: 'uppercase', letterSpacing: '2px',
            color: 'var(--text-muted)',
            fontSize: isMobile ? '0.8rem' : '1rem',
            margin: 0, textAlign: 'center',
          }}>
            Verified credentials
          </p>
          <h2 style={{
            fontSize: isMobile ? '1.6rem' : '2.5rem',
            textAlign: 'center',
            color: 'var(--text-main)',
            margin: '0.4rem 0 0',
            lineHeight: '1.2',
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

        {isMobile ? <MobileSlider /> : <DesktopSlider />}
      </div>

      <style>{`
        .cert-slider::-webkit-scrollbar,
        .cert-mobile-slider::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Certifications;
