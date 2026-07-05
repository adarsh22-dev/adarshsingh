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
    title: 'SreeMarket — Multi-Vendor E-Commerce Platform',
    desc: 'Solo-built full-stack multi-vendor marketplace with Spring Boot 3.2, React 19, Next.js 16, and MySQL 8. Features RBAC, Razorpay payments, and PWA support.',
    stack: 'Java 17 · Spring Boot · React 19 · Next.js 16 · MySQL 8',
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/600x400/0a0a1a/00d2ff?text=SreeMarket'
  },
  {
    id: 2,
    title: 'NexusAI OS — Enterprise Multi-Agent AI Platform',
    desc: 'Full-stack multi-agent AI platform with 30 CrewAI pipelines, FastAPI backend, ChromaDB RAG, OpenRouter multi-model gateway, and Docker Compose orchestration.',
    stack: 'Next.js 15 · React 19 · Python · FastAPI · CrewAI · ChromaDB',
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/600x400/0a0a1a/7a00ff?text=NexusAI+OS'
  },
  {
    id: 3,
    title: 'ECOM — Full-Stack E-Commerce with AI Assistant & Admin Copilot',
    desc: 'Dual-backend platform (Next.js 14 + .NET 8) with AI chat assistant, admin AI copilot, Razorpay payments, CI/CD pipelines, and Docker containerization.',
    stack: 'Next.js 14 · .NET 8 · TypeScript · PostgreSQL · Docker',
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/600x400/0a0a1a/00d2ff?text=ECOM+AI'
  },
  {
    id: 4,
    title: 'AI Coding Assistant CLI (In Progress)',
    desc: 'CLI-based AI coding assistant modeled on Claude Code, providing terminal-embedded coding assistance within VS Code. Built with Python and FastAPI.',
    stack: 'Python · FastAPI · LLM Integration · CLI',
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/600x400/0a0a1a/7a00ff?text=AI+CLI'
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
    if (containerRef.current?.querySelector('.project-card')) {
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
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="projects-section">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-main)' }}>
          Featured <span className="glowing-text" style={{ color: 'var(--accent-blue)' }}>Projects</span>
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
