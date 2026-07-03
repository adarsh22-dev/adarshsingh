import React, { useRef } from 'react';
import { GithubLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef();

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
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden'
    }}>
      {/* Particles background layer placeholder */}
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
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Adarsh</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Building the future, one pixel at a time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="#about" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>About</a>
            <a href="#skills" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Skills</a>
            <a href="#experience" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Experience</a>
            <a href="#certifications" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Certifications</a>
            <a href="#testimonials" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Testimonials</a>
            <a href="#projects" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Projects</a>
            <a href="#learning" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Learning</a>
            <a href="#contact" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e)=>e.target.style.color='var(--accent-blue)'} onMouseLeave={(e)=>e.target.style.color='var(--text-main)'}>Contact</a>
          </div>
        </div>

        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
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
