import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", title: "About" },
    { id: "experience", title: "Experience" },
    { id: "projects", title: "Case Studies" },
    { id: "skills", title: "Skills" },
    { id: "certifications", title: "Certifications" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: scrolled ? '15px 0' : '25px 0',
        background: scrolled ? 'rgba(5, 5, 15, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        zIndex: 100,
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Logo */}
        <a href="#" style={{
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          Adarsh <span style={{ color: 'var(--accent-blue)', fontSize: '2rem', lineHeight: '0' }}>.</span>
        </a>

        {/* Links (Desktop) */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '2.5rem',
          margin: 0,
          padding: 0
        }} className="nav-links-desktop">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`} 
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease, text-shadow 0.3s ease'
                }}
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
        
        <style>{`
          @media (max-width: 768px) {
            .nav-links-desktop {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </nav>
  );
};

export default Navbar;
