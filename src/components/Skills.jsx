import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SkillsScene from './SkillsScene';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { name: 'Frontend', color: '#00d2ff', techs: ['React JS', 'TypeScript', 'JavaScript', 'HTML 5', 'CSS 3', 'Tailwind CSS', 'Redux Toolkit', 'Three JS', 'Figma'] },
  { name: 'Backend', color: '#7a00ff', techs: ['Node JS', 'Python', 'C', 'C++', '.NET'] },
  { name: 'Platforms', color: '#ff6b6b', techs: ['Shopify', 'WordPress', 'Magento', 'CRM'] },
  { name: 'Tools', color: '#ffd93d', techs: ['Git', 'Docker', 'MongoDB'] },
];

const Skills = () => {
  const containerRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.skills-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    gsap.fromTo('.category-chip',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="skills" style={{
      position: 'relative',
      padding: isMobile ? '60px 0' : '100px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(122,0,255,0.08), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,210,255,0.06), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="skills-header" style={{
          textAlign: 'center',
          marginBottom: isMobile ? '1.5rem' : '2rem'
        }}>
          <p style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            fontSize: isMobile ? '0.85rem' : '1rem',
            margin: 0
          }}>
            What I work with
          </p>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            color: 'var(--text-main)',
            margin: '0.5rem 0 0'
          }}>
            Skills &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d2ff, #7a00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Expertise
            </span>
          </h2>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: isMobile ? '1.5rem' : '2rem'
        }}>
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="category-chip"
              style={{
                padding: '0.4rem 1.2rem',
                borderRadius: '100px',
                background: `rgba(255,255,255,0.04)`,
                border: `1px solid ${cat.color}33`,
                fontSize: '0.8rem',
                color: cat.color,
                fontWeight: 500,
                cursor: 'default',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${cat.color}15`;
                e.currentTarget.style.borderColor = cat.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = `${cat.color}33`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>

        <div style={{
          width: '100%',
          height: isMobile ? '400px' : '550px',
          position: 'relative',
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden'
        }}>
          <SkillsScene isMobile={isMobile} />
        </div>

        <div style={{
          display: 'flex',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: '0.5rem',
          marginTop: isMobile ? '1.5rem' : '2rem',
          maxWidth: '800px',
          margin: `${isMobile ? '1.5rem' : '2rem'} auto 0`,
          overflowX: isMobile ? 'auto' : 'visible',
          paddingBottom: isMobile ? '8px' : '0',
          WebkitOverflowScrolling: 'touch',
        }}
        className={isMobile ? 'skills-tags-scroll' : ''}
        >
          {skillCategories.map((cat) => (
            <React.Fragment key={cat.name}>
              {cat.techs.map((techName) => (
                <span
                  key={techName}
                  style={{
                    padding: '0.3rem 0.9rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${cat.color}15`;
                    e.currentTarget.style.borderColor = cat.color;
                    e.currentTarget.style.color = cat.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {techName}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`
        .skills-tags-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Skills;
