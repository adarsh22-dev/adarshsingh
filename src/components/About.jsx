import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code, Sparkle, Database } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const aboutData = [
  {
    title: 'skills',
    info: [
      { title: 'Backend & Data', icons: [Code, Sparkle, Database] },
      { title: 'AI / Agentic', icons: [Sparkle, Code] },
    ],
  },
  {
    title: 'awards',
    info: [
      { title: 'Generative AI Mastermind — Outskill', stage: '2024' },
      { title: 'Building AI Agents & Agentic Workflows Specialization', stage: '2024' },
      { title: 'Google Project Management Certificate', stage: '2023' },
      { title: 'Shopify Theme Development: Online Store 2.0 + TailwindCSS', stage: '2022' },
      { title: 'Simplified Magento 2 Certification', stage: '2022' },
    ],
  },
  {
    title: 'experience',
    info: [
      { title: 'Software Developer (AI) — CISAI', stage: 'Jul 2025 – Present' },
      { title: 'Software Developer — Ergode', stage: 'Jan 2025 – Jun 2025' },
      { title: 'Frontend Developer — Semtitans Digital', stage: 'Nov 2021 – Oct 2024' },
      { title: 'WordPress Developer — Biogetica', stage: 'Jan 2020 – Oct 2021' },
    ],
  },
  {
    title: 'credentials',
    info: [
      { title: 'BCA, Computer Science — Bharati Vidyapeeth, Mumbai', stage: '2021' },
      { title: 'Generative AI Mastermind — Outskill', stage: '2024' },
      { title: 'Google Project Management Certificate', stage: '2023' },
      { title: 'Shopify Theme Development: Online Store 2.0', stage: '2022' },
    ],
  },
];

const About = () => {
  const containerRef = useRef();
  const tabsRef = useRef();
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [tabTouchStart, setTabTouchStart] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleTabTouchStart = (e) => setTabTouchStart(e.touches[0].clientX);
  const handleTabTouchEnd = (e) => {
    if (tabTouchStart === null) return;
    const diff = tabTouchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const dir = diff > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(index + dir, aboutData.length - 1));
      setIndex(next);
      if (tabsRef.current) {
        const tab = tabsRef.current.children[next];
        if (tab) tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
    setTabTouchStart(null);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.about-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8')
      .fromTo('.about-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo('.about-counters', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.about-tabs', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" style={{
      padding: isMobile ? '60px 0' : '100px 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '2.5rem' : '4rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          flex: '1.2',
          minWidth: isMobile ? '0' : '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 className="about-title" style={{
            fontSize: isMobile ? '1.8rem' : '2.8rem',
            marginBottom: '1.5rem',
            color: 'var(--text-main)',
            lineHeight: '1.1',
            fontWeight: 'bold',
          }}>
            Building AI-powered products that <span style={{ color: '#ff3333' }}>ship</span> to production.
          </h2>

          <p className="about-desc" style={{
            fontSize: isMobile ? '0.9rem' : '1.05rem',
            marginBottom: '2rem',
            lineHeight: '1.8',
            color: 'var(--text-muted)',
          }}>
            Full-Stack Software Engineer with 6+ years of experience building scalable web applications, ecommerce platforms, AI-powered products, and automation systems. Expertise spans AI Agents & Agentic Workflows, React.js, Next.js, TypeScript & JavaScript, Shopify Plus & Custom Theme Development, RAG Systems & AI Integrations, Frontend Architecture & Performance Optimization, and API Development & Automation. Built and optimized 50+ ecommerce stores and web applications, improved operational efficiency through intelligent automation, and developed AI-powered products and agentic workflows. Currently at CISAI working on AI-driven applications, frontend engineering, automation systems, and scalable product development. Open to AI Engineering, Full-Stack Development, Frontend Engineering, Shopify Plus Development, and remote product-based roles.
          </p>

          <div className="about-counters" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '1rem' : '2rem',
          }}>
            {[
              { value: '6+', label: 'Years of experience.' },
              { value: '50+', label: 'Ecommerce stores built.' },
              { value: '70%', label: 'Manual effort reduction.' },
              { value: '5', label: 'Professional certifications.' },
            ].map((stat, i) => (
              <div key={i} style={{
                position: 'relative',
                paddingRight: !isMobile && i < 3 ? '1rem' : 0,
                textAlign: isMobile ? 'center' : 'left',
                padding: isMobile ? '0.75rem 0' : 0,
                background: isMobile ? 'rgba(255,255,255,0.02)' : 'none',
                borderRadius: isMobile ? '12px' : 0,
              }}>
                {!isMobile && i < 3 && <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }} />}
                <div style={{
                  fontSize: isMobile ? '1.5rem' : '2.5rem',
                  fontWeight: '800',
                  color: '#ff3333',
                  marginBottom: '0.35rem',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.65rem' : '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  lineHeight: '1.4',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-tabs" style={{
          flex: '1',
          minWidth: isMobile ? '0' : '350px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div
            ref={tabsRef}
            style={{
              display: 'flex',
              gap: isMobile ? '0.75rem' : '2rem',
              marginBottom: '2rem',
              overflowX: isMobile ? 'auto' : 'visible',
              paddingBottom: isMobile ? '4px' : '0',
              WebkitOverflowScrolling: 'touch',
            }}
            className="about-tab-labels"
          >
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                onClick={() => setIndex(itemI)}
                style={{
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: isMobile ? '0.85rem' : '1.1rem',
                  fontWeight: '500',
                  color: index === itemI ? '#ff3333' : 'var(--text-main)',
                  position: 'relative',
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                  flex: isMobile ? '0 0 auto' : '',
                  padding: isMobile ? '0.5rem 0.25rem' : 0,
                }}
              >
                {item.title}
                {index === itemI && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#ff3333',
                    transition: 'all 0.3s ease',
                  }} />
                )}
              </div>
            ))}
          </div>

          <div
            onTouchStart={isMobile ? handleTabTouchStart : undefined}
            onTouchEnd={isMobile ? handleTabTouchEnd : undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              minHeight: isMobile ? '200px' : '150px',
              transition: 'opacity 0.3s ease',
              padding: isMobile ? '0.5rem' : 0,
              background: isMobile ? 'rgba(255,255,255,0.015)' : 'none',
              borderRadius: isMobile ? '16px' : 0,
            }}
          >
            {aboutData[index].info.map((item, itemI) => (
              <div key={itemI} style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-muted)',
                fontSize: isMobile ? '0.82rem' : '1rem',
                padding: isMobile ? '0.25rem 0' : 0,
              }}>
                <div style={{ color: 'var(--text-muted)' }}>{item.title}</div>
                {item.stage && <div style={{ color: 'var(--text-main)', fontSize: isMobile ? '0.78rem' : '1rem' }}>{item.stage}</div>}
                {item.icons && (
                  <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem', color: 'var(--text-main)' }}>
                    {item.icons.map((Icon, iconI) => (
                      <div key={iconI} style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>
                        <Icon weight="fill" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isMobile && (
              <div style={{
                textAlign: 'center',
                marginTop: '0.75rem',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                opacity: 0.5,
              }}>
                ← Swipe →
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`.about-tab-labels::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default About;
