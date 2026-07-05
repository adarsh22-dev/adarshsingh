import React, { useRef, useState, useEffect } from 'react';
import { GithubLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef();
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
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} style={{
      position: 'relative',
      padding: isMobile ? '3rem 0 1.5rem 0' : '4rem 0 2rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 100%, rgba(122,0,255,0.1), transparent 50%)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: 'bold' }}>Adarsh</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Building the future, one pixel at a time.
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: isMobile ? '1rem' : '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {['About', 'Skills', 'Experience', 'Certifications', 'Testimonials', 'Projects', 'Learning', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                fontSize: isMobile ? '0.8rem' : '0.95rem',
              }}
              onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'}
              onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>
                {link}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: isMobile ? '2rem' : '3rem',
          paddingTop: isMobile ? '1.5rem' : '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '0.75rem' : '0.8rem' }}>
            &copy; {new Date().getFullYear()} Adarsh. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[<GithubLogo size={20} />, <LinkedinLogo size={20} />, <TwitterLogo size={20} />].map((icon, i) => (
              <a key={i} href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s, textShadow 0.3s' }}
                 onMouseEnter={(e)=>{e.currentTarget.style.color='var(--accent-violet)'; e.currentTarget.style.filter='drop-shadow(0 0 5px var(--violet-glow))';}}
                 onMouseLeave={(e)=>{e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.filter='none';}}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
