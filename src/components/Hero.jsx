import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from '@phosphor-icons/react';

const Hero = () => {
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
    const tl = gsap.timeline({ delay: 2.5 });

    tl.fromTo('.hero-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.hero-tags',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-btns',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    if (containerRef.current?.querySelector('.hero-visual')) {
      tl.fromTo('.hero-visual',
        { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
        '-=1'
      );
    }

    if (containerRef.current?.querySelector('.hero-orb')) {
      gsap.to('.hero-orb', {
        y: -40,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.8
      });
    }
  }, { scope: containerRef });

  const tags = ['Full-Stack Engineer', 'AI Engineer', 'Shopify Plus Expert', 'React & Next.js', 'TypeScript', 'AI Agents', 'RAG & Automation'];

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: isMobile ? '100px 0 60px' : '80px 0'
    }}>
      <div className="hero-orb" style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: isMobile ? '300px' : '600px',
        height: isMobile ? '300px' : '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(122,0,255,0.15), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div className="hero-orb" style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: isMobile ? '250px' : '500px',
        height: isMobile ? '250px' : '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,210,255,0.1), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        zIndex: 0
      }} />

      <div className="container" style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: isMobile ? '2rem' : '4rem',
        position: 'relative',
        zIndex: 1,
        flexDirection: isMobile ? 'column-reverse' : 'row',
      }}>
        <div style={{ flex: '1.1', minWidth: isMobile ? '0' : '320px', width: '100%' }}>
          <div className="hero-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.2rem',
            borderRadius: '100px',
            background: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            fontSize: isMobile ? '0.75rem' : '0.8rem',
            color: '#00ff88',
            marginBottom: '1.5rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00ff88',
              display: 'inline-block',
              boxShadow: '0 0 8px rgba(0,255,136,0.5)'
            }} />
            Available for opportunities
          </div>

          <h1 className="hero-title" style={{
            fontSize: isMobile ? 'clamp(2rem, 8vw, 2.8rem)' : 'clamp(2.8rem, 3.5vw, 5rem)',
            lineHeight: '1.05',
            marginBottom: '1.25rem',
            fontWeight: '800',
            letterSpacing: '-0.03em'
          }}>
            Hi, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d2ff, #7a00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Adarsh
            </span>
            <br />
            <span style={{ color: 'var(--text-main)', fontSize: isMobile ? 'clamp(0.85rem, 3vw, 1.2rem)' : '1.3rem', display: 'block', marginTop: '0.5rem', fontWeight: '500', letterSpacing: '-0.01em' }}>
              Full-Stack Software Engineer | AI Engineer | Shopify Plus Expert | React, Next.js & TypeScript
            </span>
          </h1>

          <div className="hero-tags" style={{
            display: 'flex',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            gap: '0.4rem',
            marginBottom: '1.5rem',
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? '4px' : '0',
            WebkitOverflowScrolling: 'touch',
          }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                flex: isMobile ? '0 0 auto' : '',
                padding: '0.3rem 0.8rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: isMobile ? '0.7rem' : '0.78rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <p className="hero-desc" style={{
            color: 'var(--text-muted)',
            fontSize: isMobile ? '0.9rem' : '1rem',
            lineHeight: '1.8',
            marginBottom: '2rem',
            maxWidth: '540px'
          }}>
            Full-Stack Software Engineer with 6+ years of experience building scalable web applications, ecommerce platforms, and AI-powered products. Professional strength in React.js/Next.js/TypeScript frontend engineering and Shopify Plus/WordPress ecommerce development, extended through independent full-stack and AI engineering projects into Java/Spring Boot, Python/FastAPI, multi-agent AI systems (CrewAI), and RAG.
          </p>

          <div className="hero-btns" style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <a href="#contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: isMobile ? '0.75rem 1.5rem' : '0.85rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7a00ff, #00d2ff)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(122,0,255,0.3)',
              textAlign: 'center',
            }}>
              Hire Me
            </a>
            <a href="/Adarsh_Singh_Resume.pdf" download style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: isMobile ? '0.75rem 1.5rem' : '0.85rem 2rem',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-main)',
              fontWeight: '500',
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              textAlign: 'center',
            }}>
              Download Resume
            </a>
          </div>

          <div className="hero-btns" style={{
            display: 'flex',
            gap: isMobile ? '1rem' : '2.5rem',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
          }}>
            {[
              { value: '6+', label: 'Years Exp' },
              { value: '50+', label: 'Projects' },
              { value: 'Mumbai', label: 'India' }
            ].map((stat) => (
              <div key={stat.label} style={{ flex: isMobile ? 1 : '', textAlign: isMobile ? 'center' : 'left' }}>
                <div style={{
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.55rem' : '0.7rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '0.35rem'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <div className="hero-visual" style={{
            flex: '1',
            minWidth: '300px',
            height: '500px',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)'
            }}>
              <iframe src='https://my.spline.design/interactivekeyboardbyabhinand-YRt3rU3PG6WvBQVpyyNYHoEB/' frameBorder='0' width='100%' height='100%' title="3D Interactive" />
            </div>
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-muted)',
        fontSize: '0.7rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        opacity: 0.4
      }}>
        <ArrowDown size={16} />
      </div>
      <style>{`.hero-tags::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default Hero;
