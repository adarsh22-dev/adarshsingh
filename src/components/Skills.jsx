import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import SkillsScene from './SkillsScene';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend',
    color: '#00d2ff',
    techs: [
      { name: 'React JS', icon: '/tech/reactjs.png' },
      { name: 'Next.js', icon: '/tech/nextjs.svg' },
      { name: 'TypeScript', icon: '/tech/typescript.png' },
      { name: 'JavaScript', icon: '/tech/javascript.png' },
      { name: 'HTML5', icon: '/tech/html.png' },
      { name: 'CSS3', icon: '/tech/css.png' },
      { name: 'jQuery', icon: '/tech/jquery.svg' },
      { name: 'Tailwind CSS', icon: '/tech/tailwind.png' },
      { name: 'Responsive Design', icon: '/tech/responsive.svg' },
      { name: 'Core Web Vitals', icon: '/tech/core-web-vitals.svg' },
    ],
  },
  {
    name: 'Ecommerce/CMS',
    color: '#00ff88',
    techs: [
      { name: 'Shopify Plus', icon: '/tech/shopify-plus.svg' },
      { name: 'Shopify', icon: '/tech/shopify.svg' },
      { name: 'WordPress', icon: '/tech/wordpress.svg' },
      { name: 'Magento 2', icon: '/tech/magento2.svg' },
      { name: 'Liquid', icon: '/tech/liquid.svg' },
    ],
  },
  {
    name: 'Backend',
    color: '#7a00ff',
    techs: [
      { name: 'Java 17', icon: '/tech/java.svg' },
      { name: 'Spring Boot', icon: '/tech/springboot.svg' },
      { name: 'Python', icon: '/tech/python.svg' },
      { name: 'FastAPI', icon: '/tech/fastapi.svg' },
      { name: 'Node.js', icon: '/tech/nodejs.png' },
      { name: 'Express.js', icon: '/tech/express.svg' },
      { name: 'REST APIs', icon: '/tech/restapi.svg' },
      { name: 'GraphQL', icon: '/tech/graphql.svg' },
      { name: 'JWT Auth', icon: '/tech/jwt.svg' },
      { name: 'Hibernate', icon: '/tech/hibernate.svg' },
    ],
  },
  {
    name: 'AI/ML',
    color: '#ff6b6b',
    techs: [
      { name: 'AI Agents', icon: '/tech/ai-agents.svg' },
      { name: 'CrewAI', icon: '/tech/crewai.svg' },
      { name: 'LangGraph', icon: '/tech/langgraph.svg' },
      { name: 'RAG', icon: '/tech/chromadb.svg' },
      { name: 'Prompt Engineering', icon: '/tech/prompt-engineering.svg' },
      { name: 'LLM Integration', icon: '/tech/llm.svg' },
    ],
  },
  {
    name: 'Data',
    color: '#ffd93d',
    techs: [
      { name: 'MySQL', icon: '/tech/mysql.svg' },
      { name: 'PostgreSQL', icon: '/tech/postgresql.svg' },
      { name: 'Django/SQL', icon: '/tech/django.svg' },
      { name: 'Oracle DB', icon: '/tech/oracle.svg' },
      { name: 'MongoDB', icon: '/tech/mongodb.png' },
    ],
  },
  {
    name: 'DevOps/Cloud',
    color: '#4fc3f7',
    techs: [
      { name: 'Docker', icon: '/tech/docker.png' },
      { name: 'CI/CD', icon: '/tech/cicd.svg' },
      { name: 'Git', icon: '/tech/git.png' },
      { name: 'Cloud Computing', icon: '/tech/cloud.svg' },
      { name: 'Kubernetes', icon: '/tech/kubernetes.svg' },
      { name: 'Testing', icon: '/tech/testing.svg' },
      { name: 'Playwright', icon: '/tech/playwright.svg' },
      { name: 'Vitest', icon: '/tech/vitest.svg' },
    ],
  },
];

const DECAGON_CLIP =
  'polygon(50% 0%, 79% 9%, 98% 35%, 98% 65%, 79% 91%, 50% 100%, 21% 91%, 2% 65%, 2% 35%, 21% 9%)';

const SkillBadge = ({ tech, color, size }) => {
  const [hover, setHover] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="skill-badge"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        width: size + 24,
        flexShrink: 0,
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imgError ? (
          <span style={{ fontSize: size * 0.22, fontWeight: 700, color: '#555', textAlign: 'center', lineHeight: 1.2 }}>
            {tech.name.split(' ')[0]}
          </span>
        ) : (
          <img
            src={tech.icon}
            alt={tech.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: size * 0.5,
              height: size * 0.5,
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
            }}
          />
        )}
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
  const sliderRef = useRef();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const visibleCategories =
    activeCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.name === activeCategory);

  const allTechs = visibleCategories.flatMap((cat) =>
    cat.techs.map((tech) => ({ tech, color: cat.color }))
  );

  const badgeSize = isMobile ? 64 : 92;
  const visibleCount = isMobile ? 3 : 5;
  const maxIndex = Math.max(0, allTechs.length - visibleCount);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex || allTechs.length <= visibleCount;

  const scrollToIndex = useCallback((i) => {
    setCurrentIndex(Math.max(0, Math.min(i, maxIndex)));
  }, [maxIndex]);

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

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

  const sliderWidth = visibleCount * (badgeSize + 24 + 16);

  return (
    <section ref={containerRef} id="skills" style={{
      position: 'relative',
      padding: isMobile ? '60px 0' : '100px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <SkillsScene />

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
                onClick={() => { setActiveCategory(catName); setCurrentIndex(0); }}
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
                  backdropFilter: 'blur(8px)',
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

        {allTechs.length > 0 && (
          <div style={{
            position: 'relative',
            maxWidth: `${sliderWidth}px`,
            margin: '0 auto',
          }}>
            <button
              onClick={handlePrev}
              disabled={isAtStart}
              style={{
                position: 'absolute', left: '-20px', top: '50%',
                transform: 'translateY(-50%)', zIndex: 10,
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(5,5,15,0.6)',
                backdropFilter: 'blur(8px)',
                color: isAtStart ? 'rgba(255,255,255,0.2)' : 'var(--text-main)',
                cursor: isAtStart ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                opacity: isAtStart ? 0.3 : 1,
              }}
              onMouseEnter={(e) => { if (!isAtStart) { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#000'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.6)'; e.currentTarget.style.color = isAtStart ? 'rgba(255,255,255,0.2)' : 'var(--text-main)'; }}
            >
              <CaretLeft size={20} weight="bold" />
            </button>

            <div style={{
              overflow: 'hidden',
              borderRadius: '20px',
              padding: '1rem 0',
            }}>
              <div
                ref={sliderRef}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: `translateX(-${currentIndex * (badgeSize + 24 + 16)}px)`,
                }}
              >
                {allTechs.map((item, i) => (
                  <SkillBadge
                    key={`${item.tech.name}-${i}`}
                    tech={item.tech}
                    color={item.color}
                    size={badgeSize}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={isAtEnd}
              style={{
                position: 'absolute', right: '-20px', top: '50%',
                transform: 'translateY(-50%)', zIndex: 10,
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(5,5,15,0.6)',
                backdropFilter: 'blur(8px)',
                color: isAtEnd ? 'rgba(255,255,255,0.2)' : 'var(--text-main)',
                cursor: isAtEnd ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                opacity: isAtEnd ? 0.3 : 1,
              }}
              onMouseEnter={(e) => { if (!isAtEnd) { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#000'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.6)'; e.currentTarget.style.color = isAtEnd ? 'rgba(255,255,255,0.2)' : 'var(--text-main)'; }}
            >
              <CaretRight size={20} weight="bold" />
            </button>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: '0.5rem',
              marginTop: '1rem',
            }}>
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  style={{
                    width: i === currentIndex ? '24px' : '8px', height: '8px',
                    borderRadius: '4px', border: 'none', padding: 0, cursor: 'pointer',
                    background: i === currentIndex
                      ? 'linear-gradient(90deg, #00d2ff, #7a00ff)'
                      : 'rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
