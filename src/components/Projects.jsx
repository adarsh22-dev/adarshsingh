import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, CaretLeft, CaretRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef();
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const [cardWidth, setCardWidth] = useState(400);
  const cardGap = 32;
  const step = cardWidth + cardGap;

  useEffect(() => {
    const updateWidth = () => setCardWidth(window.innerWidth <= 768 ? 300 : 400);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      scrollTo(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  const scrollTo = useCallback((dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    let newScroll = slider.scrollLeft + (dir === 'next' ? step : -step);
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    slider.scrollTo({ left: newScroll, behavior: 'smooth' });
    setCurrentIndex(Math.round(newScroll / step));
  }, [step]);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const idx = Math.round(slider.scrollLeft / step);
    setCurrentIndex(Math.min(idx, projects.length - 1));
  }, [step]);

  const projects = [
    {
      id: 1,
      title: 'RAG Document Intelligence',
      desc: 'Ingested 10K+ internal documents, built chunking/embedding pipeline, exposed REST chat API. Took from prototype to production solo in 3 weeks.',
      stack: 'Python · LangChain · ChromaDB · FastAPI · OpenAI',
      link: 'https://github.com/adarsh22-dev',
      img: 'https://placehold.co/600x400/0a0a1a/00d2ff?text=RAG+Pipeline'
    },
    {
      id: 2,
      title: 'Confucius Code Agent',
      desc: 'Open-source multi-agent CLI with TF-IDF context retrieval, cost-first LLM routing, and Planner-Coder-Reviewer orchestration.',
      stack: 'Bun · TypeScript · LangChain · Multi-Agent',
      link: 'https://github.com/adarsh22-dev',
      img: 'https://placehold.co/600x400/0a0a1a/7a00ff?text=Code+Agent'
    },
    {
      id: 3,
      title: 'NexusKit — MCP Server Monorepo',
      desc: 'Bun/TypeScript monorepo: local stdio MCP, remote HTTP MCP with Clerk OAuth, CLI binary. Deep API-first, modular architecture.',
      stack: 'Bun · TypeScript · Clerk OAuth · MCP',
      link: 'https://github.com/adarsh22-dev',
      img: 'https://placehold.co/600x400/0a0a1a/00d2ff?text=NexusKit'
    },
    {
      id: 4,
      title: 'E-Commerce Data Pipeline',
      desc: 'Python ETL pipeline syncing Shopify orders + inventory → PostgreSQL → S3 → nightly reconciliation reports. Handled schema drift in production.',
      stack: 'Python · Pandas · PostgreSQL · AWS S3 · Shopify API',
      link: 'https://github.com/adarsh22-dev',
      img: 'https://placehold.co/600x400/0a0a1a/7a00ff?text=ETL+Pipeline'
    },
    {
      id: 5,
      title: 'AWS Lambda Event-Driven Architecture',
      desc: 'Designed Lambda + S3 + SQS architecture for async data processing jobs, handling spiky IoT workloads without server management at CISAI.',
      stack: 'AWS Lambda · S3 · SQS · Python · CloudWatch',
      link: 'https://github.com/adarsh22-dev',
      img: 'https://placehold.co/600x400/0a0a1a/00d2ff?text=AWS+Architecture'
    },
    {
      id: 6,
      title: 'Celery + Redis Job Scheduler',
      desc: 'Built scheduled Python jobs for nightly data aggregations, reconciliation reports, and alert triggers — all with retry logic and dead-letter handling.',
      stack: 'Python · Celery · Redis · PostgreSQL · FastAPI',
      link: 'https://github.com/adarsh22-dev',
      img: 'https://placehold.co/600x400/0a0a1a/7a00ff?text=Job+Scheduler'
    },
  ];

  useGSAP(() => {
    gsap.fromTo('.project-card',
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" style={{
      padding: '100px 0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-main)' }}>
          Selected <span className="glowing-text" style={{ color: 'var(--accent-blue)' }}>Works</span>
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              overflowX: 'auto',
              padding: '20px 24px',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
            }}
            className="projects-slider"
          >
          <div style={{
            display: 'flex',
            gap: '2rem',
            padding: '0 calc((100vw - 1200px) / 2 + 24px)',
            width: 'max-content'
          }}>
            {projects.map((proj) => (
              <div key={proj.id} className="project-card glass-panel" style={{
                width: `${cardWidth}px`,
                flexShrink: 0,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                scrollSnapAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 10px 30px var(--violet-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img src={proj.img} alt={proj.title} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {proj.title}
                    <a href="#" style={{ color: 'var(--accent-blue)' }}><ArrowUpRight size={24} weight="light" /></a>
                  </h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{proj.desc}</p>
                  <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', fontSize: '0.8rem', color: 'var(--accent-violet)' }}>
                    {proj.stack}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => scrollTo('prev')} className="slider-nav slider-nav-left" style={{
          position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(5,5,15,0.7)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-main)', zIndex: 10,
          backdropFilter: 'blur(8px)', transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}>
          <CaretLeft size={20} weight="bold" />
        </button>
        <button onClick={() => scrollTo('next')} className="slider-nav slider-nav-right" style={{
          position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(5,5,15,0.7)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-main)', zIndex: 10,
          backdropFilter: 'blur(8px)', transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,5,15,0.7)'; e.currentTarget.style.color = 'var(--text-main)'; }}>
          <CaretRight size={20} weight="bold" />
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {projects.map((_, i) => (
            <div key={i} style={{
              width: i === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === currentIndex ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onClick={() => {
              const slider = sliderRef.current;
              if (!slider) return;
              slider.scrollTo({ left: i * step, behavior: 'smooth' });
              setCurrentIndex(i);
            }} />
          ))}
        </div>
      </div>
      <style>{`
        .projects-slider::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .project-card { width: 300px !important; }
          .slider-nav { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
