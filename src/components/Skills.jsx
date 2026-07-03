import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SkillsScene from './SkillsScene';

gsap.registerPlugin(ScrollTrigger);

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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="skills" style={{
      padding: isMobile ? '60px 0' : '100px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div className="skills-header" style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3rem' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', fontSize: isMobile ? '0.85rem' : '1rem', margin: 0 }}>
            What I work with
          </p>
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
            Skills.
          </h2>
        </div>

        <div style={{
          width: '100%',
          height: isMobile ? '420px' : '650px',
          position: 'relative'
        }}>
          <SkillsScene isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
