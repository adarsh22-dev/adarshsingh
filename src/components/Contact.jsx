import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EarthCanvas from './EarthCanvas';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef();
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Form section slides in from left
    tl.fromTo('.contact-left',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    // Earth section slides in from right
    .fromTo('.contact-right',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
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
      }
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    background: '#151030', // JS Mastery specific form background
    border: 'none',
    borderRadius: '12px',
    color: 'var(--text-main)',
    fontFamily: 'Inter',
    fontSize: '1rem',
    outline: 'none',
    transition: 'box-shadow 0.3s ease'
  };

  const focusStyle = (e) => {
    e.target.style.boxShadow = '0 0 15px var(--neon-glow)';
  };

  const blurStyle = (e) => {
    e.target.style.boxShadow = 'none';
  };

  return (
    <section ref={containerRef} id="contact" style={{
      padding: '100px 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap-reverse', // Earth stacks on top on mobile
        gap: '2rem',
        alignItems: 'center',
        width: '100%'
      }}>
        
        {/* Left: Form */}
        <div className="contact-left glass-panel" style={{ 
          flex: '1', 
          minWidth: '350px',
          padding: '3rem',
          background: 'rgba(16, 13, 37, 0.8)', // Classic dark blue tint
          borderRadius: '24px'
        }}>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem' }}>
            Get in touch
          </p>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Contact.
          </h2>
           <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            adarshsingh55555ac@gmail.com &nbsp;|&nbsp; +91 8828186537<br/>
            <a href="https://linkedin.com/in/adarshvinodkumarsingh" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>LinkedIn</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/adarsh22-dev" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>GitHub</a>
            &nbsp;|&nbsp;
            <a href="https://adarshsinghportfoliofive.vercel.app/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Portfolio</a>
            &nbsp;|&nbsp;
            <a href="/resume.txt" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Download Resume</a>
          </p>
          
          <form ref={formRef} onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div>
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>Your Name</span>
              <input 
                type="text" 
                placeholder="What's your good name?" 
                required
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            <div>
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>Your Email</span>
              <input 
                type="email" 
                placeholder="What's your web address?" 
                required
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            <div>
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>Your Message</span>
              <textarea 
                placeholder="What do you want to say?" 
                required
                rows="6"
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            
            <button type="submit" className="contact-submit" style={{
              marginTop: '1rem',
              alignSelf: 'flex-start',
              background: '#050816', // Darker blue button
              color: 'white',
              padding: '1rem 3rem',
              border: '1px solid var(--accent-blue)',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 10px var(--neon-glow)',
              transition: 'box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px var(--neon-glow)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 10px var(--neon-glow)'}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>

        {/* Right: 3D Earth Canvas */}
        <div className="contact-right" style={{ 
          flex: '1.5', 
          minWidth: '350px',
          height: '600px'
        }}>
          <EarthCanvas />
        </div>

      </div>
    </section>
  );
};

export default Contact;
