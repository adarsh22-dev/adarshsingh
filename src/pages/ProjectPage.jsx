import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';

const projects = [
  {
    id: 1,
    title: 'SreeMarket — Multi-Vendor E-Commerce Platform',
    desc: 'Solo-built full-stack multi-vendor marketplace.',
    fullDesc: 'Solo-built full-stack platform architected as three separate services: a Spring Boot 3.2.3 (Java 17) REST API backend, a React 19 admin/vendor/wholesaler dashboard (Vite), and a Next.js 16 customer storefront (SSR/App Router), backed by MySQL 8. Implemented authentication and role-based access control (Customer, Vendor, Admin, Wholesaler) using session-based auth, BCrypt password hashing, and Google OAuth via Spring Security. Designed 30+ REST endpoints covering authentication, product catalog, cart/checkout, order management, vendor operations, wholesaler workflows (RFQ, tiered pricing), and admin analytics, using Spring Data JPA/Hibernate for persistence. Integrated third-party services including Razorpay for payments, MailerSend for transactional email, and Apache POI for Excel-based bulk product upload and reporting.',
    stack: ['Java 17', 'Spring Boot', 'React 19', 'Next.js 16', 'MySQL 8', 'Spring Security', 'Razorpay'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/00d2ff?text=SreeMarket',
    features: [
      'Three-service architecture (Spring Boot API + React 19 Admin + Next.js 16 Storefront)',
      'Role-based access control with Spring Security & Google OAuth',
      '30+ REST endpoints with Spring Data JPA/Hibernate',
      'Razorpay payment integration & MailerSend email',
      'PWA support with offline caching (vite-plugin-pwa & next-pwa)',
    ],
  },
  {
    id: 2,
    title: 'NexusAI OS — Enterprise Multi-Agent AI Platform',
    desc: 'Full-stack multi-agent AI platform with 30 CrewAI pipelines.',
    fullDesc: 'Built and deployed a full-stack multi-agent AI platform (Next.js 15/React 19/TypeScript frontend, Python/FastAPI backend) featuring 30 production-shaped CrewAI multi-agent pipelines across beginner, intermediate, and advanced complexity tiers. Implemented production-grade FastAPI backends with JWT authentication, per-client rate limiting, and WebSocket streaming for real-time agent output. Built RAG and memory systems using ChromaDB vector search and SQLAlchemy-backed conversation memory for knowledge-grounded, stateful agents. Integrated a multi-model LLM gateway (OpenRouter) routing to GPT-4o, Claude, Llama, and Mistral, plus live data integrations for research and analysis agents.',
    stack: ['Next.js 15', 'React 19', 'Python', 'FastAPI', 'CrewAI', 'ChromaDB', 'OpenRouter'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/7a00ff?text=NexusAI+OS',
    features: [
      '30+ production-ready CrewAI multi-agent pipelines',
      'FastAPI backend with JWT auth & WebSocket streaming',
      'ChromaDB RAG system with vector search',
      'Multi-model LLM gateway (OpenRouter)',
      'Docker Compose orchestration & Langfuse observability',
    ],
  },
  {
    id: 3,
    title: 'ECOM — Full-Stack E-Commerce with AI Assistant & Admin Copilot',
    desc: 'Dual-backend platform with AI chat assistant and admin AI copilot.',
    fullDesc: 'Designed a dual-backend architecture (Next.js 14 API routes + .NET 8/C# API) over shared PostgreSQL (Supabase), separating fast customer-facing CRUD from compute-heavy admin analytics. Built production LLM features using the Vercel AI SDK and OpenRouter (GPT-4o): a customer-facing AI chat with tool calling (product search, product details, store info) and an admin AI copilot that queries live analytics and manages products/orders/coupons via natural language, both with real-time streaming responses. Implemented JWT Bearer authentication on the .NET API and Supabase Auth on the Next.js side with Row Level Security enforced at the database level across 20 tables.',
    stack: ['Next.js 14', '.NET 8', 'TypeScript', 'PostgreSQL', 'OpenRouter', 'Docker'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/00d2ff?text=ECOM+AI',
    features: [
      'Dual-backend architecture (Next.js + .NET 8)',
      'AI customer chat with tool calling & streaming',
      'Admin AI copilot for live analytics & management',
      'Full CI/CD pipeline (GitHub Actions) & test suite',
      'Docker containerization with Razorpay payments',
    ],
  },
  {
    id: 4,
    title: 'AI Coding Assistant CLI (In Progress)',
    desc: 'CLI-based AI coding assistant modeled on Claude Code.',
    fullDesc: 'Building a CLI-based AI coding assistant (Python, FastAPI, GPT-based model integration) modeled on Claude Code, providing terminal-embedded coding assistance within VS Code. The assistant will feature natural language code generation, file manipulation, git integration, and context-aware code suggestions directly from the terminal.',
    stack: ['Python', 'FastAPI', 'LLM Integration', 'CLI'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/7a00ff?text=AI+CLI',
    features: [
      'Terminal-embedded AI coding assistance',
      'Natural language code generation & manipulation',
      'Git-aware context suggestions',
      'Built with Python & FastAPI',
      'VS Code integration (in development)',
    ],
  },
];

const ProjectPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--accent-blue)' }}>← Back home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '6rem 0 3rem', minHeight: '100vh' }}>
      <div className="container">
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          color: 'var(--text-muted)', textDecoration: 'none',
          fontSize: '0.9rem', marginBottom: '2rem',
          transition: 'color 0.3s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={18} /> Back to projects
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
        }}
          className="project-page-grid"
        >
          <div>
            <img
              src={project.img}
              alt={project.title}
              style={{
                width: '100%', borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </div>

          <div>
            <h1 style={{
              fontSize: '2.5rem', fontWeight: '800',
              color: 'var(--text-main)', marginBottom: '1rem',
              lineHeight: '1.15',
            }}>
              {project.title}
            </h1>

            <p style={{
              fontSize: '1rem', color: 'var(--text-muted)',
              lineHeight: '1.7', marginBottom: '2rem',
            }}>
              {project.fullDesc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {project.stack.map((tech) => (
                <span key={tech} style={{
                  padding: '0.3rem 0.9rem', borderRadius: '8px',
                  background: 'rgba(122,0,255,0.1)',
                  border: '1px solid rgba(122,0,255,0.2)',
                  fontSize: '0.8rem', color: 'var(--accent-violet)',
                }}>
                  {tech}
                </span>
              ))}
            </div>

            <ul style={{
              listStyle: 'none', padding: 0, marginBottom: '2rem',
            }}>
              {project.features.map((f, i) => (
                <li key={i} style={{
                  padding: '0.5rem 0', color: 'var(--text-muted)',
                  fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ color: '#00ff88', fontSize: '1.1rem' }}>✦</span> {f}
                </li>
              ))}
            </ul>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 2rem', borderRadius: '12px',
                background: 'linear-gradient(135deg, #7a00ff, #00d2ff)',
                color: '#fff', fontWeight: '600', fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 4px 20px rgba(122,0,255,0.3)',
              }}
            >
              View on GitHub <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-page-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectPage;
