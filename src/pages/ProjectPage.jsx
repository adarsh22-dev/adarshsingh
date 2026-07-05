import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';

const projects = [
  {
    id: 1,
    title: 'RAG Document Intelligence',
    desc: 'Ingested 10K+ internal documents, built chunking/embedding pipeline, exposed REST chat API. Took from prototype to production solo in 3 weeks.',
    fullDesc: 'Built a production-ready RAG (Retrieval-Augmented Generation) system from scratch. Designed and implemented a document ingestion pipeline that processed over 10,000 internal documents, created an intelligent chunking and embedding strategy using LangChain, and exposed the entire system via a FastAPI REST API. The system went from concept to production deployment in just 3 weeks.',
    stack: ['Python', 'LangChain', 'ChromaDB', 'FastAPI', 'OpenAI'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/00d2ff?text=RAG+Pipeline',
    features: [
      'Custom chunking strategy for optimal retrieval',
      'Embedding pipeline with OpenAI ADA-002',
      'Vector search with ChromaDB',
      'REST API with FastAPI',
      'Production deployment with Docker',
    ],
  },
  {
    id: 2,
    title: 'Confucius Code Agent',
    desc: 'Open-source multi-agent CLI with TF-IDF context retrieval, cost-first LLM routing, and Planner-Coder-Reviewer orchestration.',
    fullDesc: 'An open-source multi-agent CLI tool that orchestrates a team of AI agents (Planner, Coder, Reviewer) to solve complex coding tasks. Features TF-IDF based context retrieval from codebases, cost-aware LLM routing that selects the most cost-effective model for each subtask, and a robust review loop that ensures code quality.',
    stack: ['Bun', 'TypeScript', 'LangChain', 'Multi-Agent'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/7a00ff?text=Code+Agent',
    features: [
      'Multi-agent orchestration (Planner → Coder → Reviewer)',
      'TF-IDF based codebase context retrieval',
      'Cost-first LLM routing strategy',
      'Extensible plugin system',
      'CLI interface with rich feedback',
    ],
  },
  {
    id: 3,
    title: 'NexusKit — MCP Server Monorepo',
    desc: 'Bun/TypeScript monorepo: local stdio MCP, remote HTTP MCP with Clerk OAuth, CLI binary. Deep API-first, modular architecture.',
    fullDesc: 'A comprehensive MCP (Model Context Protocol) server monorepo built with Bun and TypeScript. Supports both local stdio transport and remote HTTP transport with Clerk OAuth authentication. Features a modular, API-first architecture with a CLI binary for easy deployment and management.',
    stack: ['Bun', 'TypeScript', 'Clerk OAuth', 'MCP'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/00d2ff?text=NexusKit',
    features: [
      'Local stdio MCP transport',
      'Remote HTTP MCP with OAuth',
      'Clerk authentication integration',
      'CLI binary for deployment',
      'Modular monorepo architecture',
    ],
  },
  {
    id: 4,
    title: 'E-Commerce Data Pipeline',
    desc: 'Python ETL pipeline syncing Shopify orders + inventory → PostgreSQL → S3 → nightly reconciliation reports. Handled schema drift in production.',
    fullDesc: 'Designed and built a robust ETL pipeline for e-commerce data processing. The pipeline syncs orders and inventory data from Shopify to PostgreSQL, archives to S3, and generates nightly reconciliation reports. Built to handle schema drift gracefully in production, ensuring data integrity across the entire flow.',
    stack: ['Python', 'Pandas', 'PostgreSQL', 'AWS S3', 'Shopify API'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/7a00ff?text=ETL+Pipeline',
    features: [
      'Shopify API integration',
      'PostgreSQL data warehouse',
      'S3 archival storage',
      'Nightly reconciliation reports',
      'Automatic schema drift handling',
    ],
  },
  {
    id: 5,
    title: 'AWS Lambda Event-Driven Architecture',
    desc: 'Designed Lambda + S3 + SQS architecture for async data processing jobs, handling spiky IoT workloads without server management at CISAI.',
    fullDesc: 'Architected an event-driven data processing system using AWS Lambda, S3, and SQS. Designed to handle spiky IoT workloads with automatic scaling, the system eliminates server management overhead while maintaining high throughput and reliability. Built and deployed at CISAI for production workloads.',
    stack: ['AWS Lambda', 'S3', 'SQS', 'Python', 'CloudWatch'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/00d2ff?text=AWS+Architecture',
    features: [
      'Event-driven serverless architecture',
      'Auto-scaling for spiky workloads',
      'SQS queue-based async processing',
      'CloudWatch monitoring and alerting',
      'Cost-optimized Lambda configuration',
    ],
  },
  {
    id: 6,
    title: 'Celery + Redis Job Scheduler',
    desc: 'Built scheduled Python jobs for nightly data aggregations, reconciliation reports, and alert triggers — all with retry logic and dead-letter handling.',
    fullDesc: 'Developed a robust job scheduling system using Celery and Redis. Manages nightly data aggregations, automated reconciliation reports, and intelligent alert triggers. Features comprehensive retry logic with exponential backoff and dead-letter queues for failed jobs, ensuring no data is ever lost.',
    stack: ['Python', 'Celery', 'Redis', 'PostgreSQL', 'FastAPI'],
    link: 'https://github.com/adarsh22-dev',
    img: 'https://placehold.co/800x500/0a0a1a/7a00ff?text=Job+Scheduler',
    features: [
      'Celery distributed task queue',
      'Redis message broker',
      'Retry with exponential backoff',
      'Dead-letter queue for failed jobs',
      'Real-time job monitoring dashboard',
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
