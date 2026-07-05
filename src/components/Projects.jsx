import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

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

const Projects = () => {
  const containerRef = useRef();
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const navigate = useNavigate();

  const [isMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const cardWidth = isMobile ? window.innerWidth - 32 : 400;
  const cardGap = 32;
  const step = cardWidth + cardGap;

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (isMobile) {
        const dir = diff > 0 ? 1 : -1;
        const next = Math.max(0, Math.min(currentIndex + dir, projects.length - 1));
        setCurrentIndex(next);
      } else {
        scrollTo(diff > 0 ? 'next' : 'prev');
      }
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
    <section ref={containerRef} id="projects" className="projects-section">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-main)' }}>
          Selected <span className="glowing-text" style={{ color: 'var(--accent-blue)' }}>Works</span>
        </h2>
      </div>

      <div className="projects-slider-container">
        {isMobile ? (
          <>
            <div className="mobile-carousel-wrapper">
              <div
                className="mobile-carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {projects.map((proj) => (
                  <div key={proj.id} className="mobile-card-wrapper">
                    <div
                      className="mobile-project-card"
                      onClick={() => navigate(`/project/${proj.id}`)}
                    >
                      <img
                        src={proj.img}
                        alt={proj.title}
                        className="mobile-project-card-img"
                      />
                      <div>
                        <h3 style={{
                          fontSize: '1.2rem', marginBottom: '0.4rem',
                          color: 'var(--text-main)', display: 'flex',
                          justifyContent: 'space-between', alignItems: 'center'
                        }}>
                          {proj.title}
                          <ArrowUpRight size={20} color="var(--accent-blue)" />
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                          {proj.desc}
                        </p>
                        <span className="project-card-stack">{proj.stack}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="projects-dots">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className={`project-dot${i === currentIndex ? ' active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="projects-slider"
            >
              <div className="projects-track">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="project-card glass-panel"
                    onClick={() => navigate(`/project/${proj.id}`)}
                  >
                    <div className="project-card-img-wrap">
                      <img src={proj.img} alt={proj.title} className="project-card-img" />
                    </div>
                    <div>
                      <h3 className="project-card-title">
                        {proj.title}
                        <ArrowUpRight size={24} weight="light" color="var(--accent-blue)" />
                      </h3>
                      <p className="project-card-desc">{proj.desc}</p>
                      <span className="project-card-stack">{proj.stack}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => scrollTo('prev')} className="slider-nav slider-nav-left">
              <CaretLeft size={20} weight="bold" />
            </button>
            <button onClick={() => scrollTo('next')} className="slider-nav slider-nav-right">
              <CaretRight size={20} weight="bold" />
            </button>

            <div className="projects-dots">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className={`project-dot${i === currentIndex ? ' active' : ''}`}
                  onClick={() => {
                    const slider = sliderRef.current;
                    if (!slider) return;
                    slider.scrollTo({ left: i * step, behavior: 'smooth' });
                    setCurrentIndex(i);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
