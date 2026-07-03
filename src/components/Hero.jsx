import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from '@phosphor-icons/react';

const Hero = () => {
  const containerRef = useRef();
  const contentRef = useRef();
  const visualRef = useRef();

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
    )
    .fromTo('.hero-visual',
      { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
      '-=1'
    );

    gsap.to('.hero-orb', {
      y: -40,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.8
    });
  }, { scope: containerRef });

  const tags = ['AI Engineer', 'Shopify Plus Expert', 'React, Next.js & TypeScript', 'AI Agents', 'RAG & Automation'];

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '80px 0'
    }}>
      {/* Animated gradient background */}
      <div className="hero-orb" style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(122,0,255,0.15), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div className="hero-orb" style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,210,255,0.1), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Subtle grid */}
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
        gap: '4rem',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        {/* Left: Content */}
        <div ref={contentRef} style={{
          flex: '1.1',
          minWidth: '320px'
        }}>
          {/* Badge */}
          <div className="hero-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.2rem',
            borderRadius: '100px',
            background: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            fontSize: '0.8rem',
            color: '#00ff88',
            marginBottom: '2rem'
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

          {/* Heading */}
          <h1 className="hero-title" style={{
            fontSize: 'clamp(2.8rem, 3.5vw, 5rem)',
            lineHeight: '1.05',
            marginBottom: '1.5rem',
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
            <span style={{ color: 'var(--text-main)' }}>Senior Software Engineer</span>
          </h1>

          {/* Tags */}
          <div className="hero-tags" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                padding: '0.35rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(122,0,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(122,0,255,0.3)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="hero-desc" style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
            maxWidth: '540px'
          }}>
            Full-Stack Software Engineer with 6+ years of experience building scalable web applications, ecommerce platforms, AI-powered products, and automation systems.
          </p>

          {/* Buttons */}
          <div className="hero-btns" style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <a href="#contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7a00ff, #00d2ff)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 20px rgba(122,0,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,0,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(122,0,255,0.3)';
            }}>
              Hire Me
            </a>
            <a href="/resume.txt" download style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-main)',
              fontWeight: '500',
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}>
              Download Resume
            </a>
          </div>

          {/* Stats */}
          <div className="hero-btns" style={{
            display: 'flex',
            gap: '2.5rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            {[
              { value: '6+', label: 'Years Exp' },
              { value: '50+', label: 'Projects' },
              { value: '70%', label: 'Effort Reduction' }
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: '1.5rem',
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
                  fontSize: '0.7rem',
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

        {/* Right: 3D Visual */}
        <div ref={visualRef} className="hero-visual" style={{
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
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
};

export default Hero;
