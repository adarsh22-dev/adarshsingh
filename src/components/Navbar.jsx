import React, { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Case Studies' },
    { id: 'skills', title: 'Skills' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'contact', title: 'Contact' },
  ];

  const linkStyle = {
    textDecoration: 'none',
    color: 'var(--text-main)',
    fontSize: isMobile ? '1.2rem' : '0.95rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(5,5,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      zIndex: 100,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="#" style={{
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          Adarsh <span style={{ color: 'var(--accent-blue)', fontSize: '2rem', lineHeight: '0' }}>.</span>
        </a>

        {isMobile ? (
          <>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-main)',
                cursor: 'pointer',
                padding: '4px',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <List size={28} />}
            </button>

            {menuOpen && (
              <div style={{
                position: 'fixed',
                top: '60px',
                left: 0,
                width: '100%',
                background: 'rgba(5,5,15,0.95)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                padding: '1rem 0',
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
              }}>
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      ...linkStyle,
                      padding: '0.75rem 2rem',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2.5rem',
            margin: 0,
            padding: 0,
          }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-blue)';
                    e.currentTarget.style.textShadow = '0 0 10px var(--neon-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-main)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
