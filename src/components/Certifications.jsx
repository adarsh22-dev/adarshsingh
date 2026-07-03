import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { img: '/badges/img1.png' },
  { img: '/badges/img2.png' },
  { img: '/badges/img3.png' },
  { img: '/badges/img4.png' },
  { img: '/badges/img5.png' },
  { img: '/badges/img6.png' },
  { img: '/badges/img7.png' },
  { img: '/badges/img8.png' },
  { img: '/badges/img9.png' },
  { img: '/badges/img10.png' },
  { img: '/badges/img11.png' },
  { img: '/badges/img12.png' },
  { img: '/badges/img13.png' },
  { img: '/badges/img14.png' },
  { img: '/badges/img15.png' },
  { img: '/badges/img16.png' },
  { img: '/badges/img17.png' },
  { img: '/badges/img18.png' },
  { img: '/badges/img19.png' },
  { img: '/badges/img20.png' },
  { img: '/badges/img21.png' },
];

const CertificationCard = ({ badge, index, activeIndex }) => {
  const isActive = index === activeIndex;

  return (
    <div
      className="cert-card"
      style={{
        flex: '0 0 320px',
        scrollSnapAlign: 'center',
        padding: '1.5rem',
        background: isActive
          ? 'linear-gradient(135deg, rgba(122,0,255,0.15), rgba(0,210,255,0.05))'
          : 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        border: isActive
          ? '1px solid rgba(122,0,255,0.4)'
          : '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        transform: isActive ? 'scale(1.02) translateY(-4px)' : 'scale(1)',
        boxShadow: isActive ? '0 8px 30px rgba(122,0,255,0.2)' : 'none',
      }}
    >
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <img
          src={badge.img}
          alt={badge.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML =
              '<div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem">Badge<br/>Image</div>';
          }}
        />
      </div>
      {badge.name && (<div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {badge.name}
        </p>
        {badge.issuer && (<p
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            margin: '0.35rem 0 0 0',
          }}
        >
          {badge.issuer}
        </p>)}
      </div>)}
    </div>
  );
};

const Certifications = () => {
  const containerRef = useRef();
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = useCallback(
    (dir) => {
      const slider = sliderRef.current;
      if (!slider) return;
      const step = 320 + 24;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      let newScroll = slider.scrollLeft + (dir === 'next' ? step : -step);
      newScroll = Math.max(0, Math.min(newScroll, maxScroll));
      slider.scrollTo({ left: newScroll, behavior: 'smooth' });
      setCurrentIndex(Math.round(newScroll / step));
    },
    []
  );

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const step = 320 + 24;
    const idx = Math.round(slider.scrollLeft / step);
    setCurrentIndex(Math.min(idx, badges.length - 1));
  }, []);

  useGSAP(() => {
    gsap.fromTo('.cert-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="certifications"
      style={{
        padding: '100px 0',
        minHeight: '80vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(122, 0, 255, 0.06), transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div className="cert-header" style={{ marginBottom: '3rem' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Verified credentials
          </p>
          <h2
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Certifications &{' '}
            <span
              className="glowing-text"
              style={{ color: 'var(--accent-violet)' }}
            >
              Badges
            </span>
          </h2>
        </div>

        <div style={{ position: 'relative', padding: '0 40px' }}>
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '20px 10px',
              scrollbarWidth: 'none',
            }}
            className="cert-slider"
          >
            {badges.map((badge, index) => (
              <CertificationCard
                key={index}
                badge={badge}
                index={index}
                activeIndex={currentIndex}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo('prev')}
            style={{
              position: 'absolute',
              left: '-8px',
              top: '45%',
              transform: 'translateY(-50%)',
              background: 'rgba(5,5,15,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-violet)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(5,5,15,0.7)';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            onClick={() => scrollTo('next')}
            style={{
              position: 'absolute',
              right: '-8px',
              top: '45%',
              transform: 'translateY(-50%)',
              background: 'rgba(5,5,15,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-violet)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(5,5,15,0.7)';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            <CaretRight size={20} weight="bold" />
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
            }}
          >
            {badges.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background:
                    i === currentIndex
                      ? 'var(--accent-violet)'
                      : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const slider = sliderRef.current;
                  if (!slider) return;
                  const step = 320 + 24;
                  slider.scrollTo({
                    left: i * step,
                    behavior: 'smooth',
                  });
                  setCurrentIndex(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cert-slider::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          .cert-card { flex: 0 0 260px !important; }
          #certifications { min-height: 60vh !important; }
        }
      `}</style>
    </section>
  );
};

export default Certifications;
