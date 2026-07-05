import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend',
    color: '#00d2ff',
    techs: [
      { name: 'React JS', icon: '/tech/reactjs.png' },
      { name: 'TypeScript', icon: '/tech/typescript.png' },
      { name: 'JavaScript', icon: '/tech/javascript.png' },
      { name: 'HTML 5', icon: '/tech/html.png' },
      { name: 'CSS 3', icon: '/tech/css.png' },
      { name: 'Tailwind CSS', icon: '/tech/tailwind.png' },
      { name: 'Redux Toolkit', icon: '/tech/redux.png' },
      { name: 'Three JS', icon: '/tech/threejs.svg' },
      { name: 'Figma', icon: '/tech/figma.png' },
    ],
  },
  {
    name: 'Backend',
    color: '#7a00ff',
    techs: [
      { name: 'Node JS', icon: '/tech/nodejs.png' },
      { name: 'Python', icon: '/tech/python.svg' },
      { name: 'C', icon: '/tech/c.svg' },
      { name: 'C++', icon: '/tech/cpp.svg' },
      { name: '.NET', icon: '/tech/dotnet.svg' },
    ],
  },
  {
    name: 'Platforms',
    color: '#ff6b6b',
    techs: [
      { name: 'Shopify', icon: '/tech/shopify.svg' },
      { name: 'WordPress', icon: '/tech/wordpress.svg' },
      { name: 'Magento', icon: '/tech/magento.svg' },
      { name: 'CRM', icon: '/tech/crm.svg' },
    ],
  },
  {
    name: 'Tools',
    color: '#ffd93d',
    techs: [
      { name: 'Git', icon: '/tech/git.png' },
      { name: 'Docker', icon: '/tech/docker.png' },
      { name: 'MongoDB', icon: '/tech/mongodb.png' },
    ],
  },
];

const DECAGON_CLIP =
  'polygon(50% 0%, 79% 9%, 98% 35%, 98% 65%, 79% 91%, 50% 100%, 21% 91%, 2% 65%, 2% 35%, 21% 9%)';

const SkillBadge = ({ tech, color, size }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="skill-badge"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        width: size + 24,
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: size,
          height: size,
          clipPath: DECAGON_CLIP,
          position: 'relative',
          background: hover
            ? `linear-gradient(150deg, #f0f0f4 0%, #c4c4cc 45%, ${color}55 100%)`
            : 'linear-gradient(150deg, #e4e4e9 0%, #b3b3bc 45%, #7d7d86 100%)',
          boxShadow: hover
            ? `0 8px 24px ${color}55, 0 0 0 1px ${color}44 inset`
            : '0 6px 16px rgba(0,0,0,0.35)',
          transform: hover ? 'translateY(-6px) scale(1.06)' : 'translateY(0) scale(1)',
          transition: 'all 0.35s cubic-bezier(.2,.8,.2,1)',
          cursor: 'default',
        }}
      >
        <img
          src={tech.icon}
          alt={tech.name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 0.5,
            height: size * 0.5,
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '0.72rem',
          color: hover ? color : 'var(--text-muted)',
          fontWeight: 500,
          textAlign: 'center',
          transition: 'color 0.3s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {tech.name}
      </span>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.skills-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    gsap.fromTo('.category-chip',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    gsap.fromTo('.skill-badge',
      { opacity: 0, y: 24, scale: 0.85 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef, dependencies: [activeCategory, isMobile] });

  const visibleCategories =
    activeCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.name === activeCategory);

  const badgeSize = isMobile ? 64 : 92;

  return (
    <section ref={containerRef} id="skills" style={{
      position: 'relative',
      padding: isMobile ? '60px 0' : '100px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(122,0,255,0.08), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,210,255,0.06), transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="skills-header" style={{
          textAlign: 'center',
          marginBottom: isMobile ? '1.5rem' : '2rem'
        }}>
          <p style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            fontSize: isMobile ? '0.85rem' : '1rem',
            margin: 0
          }}>
            What I work with
          </p>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            color: 'var(--text-main)',
            margin: '0.5rem 0 0'
          }}>
            Skills &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d2ff, #7a00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Expertise
            </span>
          </h2>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: isMobile ? '2rem' : '3rem'
        }}>
          {['All', ...skillCategories.map((c) => c.name)].map((catName) => {
            const cat = skillCategories.find((c) => c.name === catName);
            const color = cat ? cat.color : '#f0f0ff';
            const isActive = activeCategory === catName;
            return (
              <button
                key={catName}
                className="category-chip"
                onClick={() => setActiveCategory(catName)}
                style={{
                  padding: '0.4rem 1.2rem',
                  borderRadius: '100px',
                  background: isActive ? `${color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? color : `${color}33`}`,
                  fontSize: '0.8rem',
                  color: color,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}15`;
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isActive ? `${color}22` : 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = isActive ? color : `${color}33`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {catName}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            gap: isMobile ? '1.4rem 0.6rem' : '2.2rem 1rem',
            maxWidth: '980px',
            margin: '0 auto',
            padding: isMobile ? '0 0.5rem' : '0',
          }}
        >
          {visibleCategories.map((cat) =>
            cat.techs.map((tech) => (
              <SkillBadge
                key={tech.name}
                tech={tech}
                color={cat.color}
                size={badgeSize}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
