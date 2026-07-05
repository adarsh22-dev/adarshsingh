import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EarthCanvas from './EarthCanvas';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef();
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.contact-left', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
      .fromTo('.contact-right', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.8');
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    gsap.to('.contact-submit', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setTimeout(() => setIsSubmitting(false), 1500);
      },
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: '#151030',
    border: 'none',
    borderRadius: '12px',
    color: 'var(--text-main)',
    fontFamily: 'Inter',
    fontSize: '1rem',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
    boxSizing: 'border-box',
  };

  return (
    <section ref={containerRef} id="contact" style={{
      padding: isMobile ? '60px 0' : '100px 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap-reverse',
        gap: '2rem',
        alignItems: isMobile ? 'stretch' : 'center',
        width: '100%',
      }}>
        <div className="contact-left glass-panel" style={{
          flex: '1',
          minWidth: isMobile ? '0' : '350px',
          padding: isMobile ? '1.5rem' : '3rem',
          background: 'rgba(16, 13, 37, 0.8)',
          borderRadius: '24px',
        }}>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: isMobile ? '0.85rem' : '1rem' }}>
            Get in touch
          </p>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            marginBottom: '0.5rem',
            fontWeight: '800',
            color: 'var(--text-main)',
          }}>
            Contact.
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            fontSize: isMobile ? '0.82rem' : '0.95rem',
            lineHeight: '1.6',
            wordBreak: 'break-all',
          }}>
            adarshsingh55555ac@gmail.com<br />
            +91 8828186537<br />
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 0.6rem', marginTop: '0.5rem' }}>
              <a href="https://linkedin.com/in/adarshvinodkumarsingh" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>LinkedIn</a>
              <a href="https://github.com/adarsh22-dev" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>GitHub</a>
              <a href="https://adarshsinghportfoliofive.vercel.app/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Portfolio</a>
              <a href="/Adarsh_Singh_Resume.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Resume</a>
            </span>
          </p>

          <form ref={formRef} onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            <div>
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                Your Name
              </span>
              <input
                type="text"
                placeholder="What's your good name?"
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.boxShadow = '0 0 15px var(--neon-glow)'; }}
                onBlur={(e) => { e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                Your Email
              </span>
              <input
                type="email"
                placeholder="What's your web address?"
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.boxShadow = '0 0 15px var(--neon-glow)'; }}
                onBlur={(e) => { e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                Your Message
              </span>
              <textarea
                placeholder="What do you want to say?"
                required
                rows="5"
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => { e.target.style.boxShadow = '0 0 15px var(--neon-glow)'; }}
                onBlur={(e) => { e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <button type="submit" className="contact-submit" style={{
              marginTop: '0.5rem',
              alignSelf: isMobile ? 'stretch' : 'flex-start',
              background: '#050816',
              color: 'white',
              padding: '1rem 2rem',
              border: '1px solid var(--accent-blue)',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 10px var(--neon-glow)',
              transition: 'box-shadow 0.3s ease',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px var(--neon-glow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 10px var(--neon-glow)'; }}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>

        <div className="contact-right" style={{
          flex: '1.5',
          minWidth: isMobile ? '0' : '350px',
          height: isMobile ? '400px' : '600px',
          order: isMobile ? -1 : 0,
          borderRadius: '24px',
          overflow: 'hidden',
        }}>
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
};

export default Contact;
