import React, { useState, useEffect, useRef } from 'react';
import { List, X } from '@phosphor-icons/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const menuRef = useRef();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen || !isMobile) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, isMobile]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
    <>
      <style>{`@keyframes menuFadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
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
              <div
                ref={menuRef}
                style={{
                  position: 'fixed',
                  top: '60px',
                  left: 0,
                  width: '100%',
                  background: 'rgba(5,5,15,0.96)',
                  backdropFilter: 'blur(20px)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  padding: '0.75rem 0',
                  zIndex: 99,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.15rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  animation: 'menuFadeIn 0.2s ease',
                }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      ...linkStyle,
                      padding: '0.7rem 2rem',
                      width: '100%',
                      textAlign: 'center',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.background = 'rgba(122,0,255,0.1)';
                      setTimeout(() => { e.currentTarget.style.background = ''; }, 200);
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
    </>
  );
};

export default Navbar;
