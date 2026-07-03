import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Code, Sparkle, Database, FigmaLogo, PenNib
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Backend & Data",
        icons: [Code, Sparkle, Database],
      },
      {
        title: "AI / Agentic",
        icons: [Sparkle, Code],
      },
    ],
  },
  {
    title: "awards",
    info: [
      { title: "Generative AI Mastermind — Outskill", stage: "2024" },
      { title: "Building AI Agents & Agentic Workflows Specialization", stage: "2024" },
      { title: "Google Project Management Certificate", stage: "2023" },
      { title: "Shopify Theme Development: Online Store 2.0 + TailwindCSS", stage: "2022" },
      { title: "Simplified Magento 2 Certification", stage: "2022" },
    ],
  },
  {
    title: "experience",
    info: [
      { title: "Software Developer (AI) — CISAI", stage: "Jul 2025 – Present" },
      { title: "Software Developer — Ergode", stage: "Jan 2025 – Jun 2025" },
      { title: "Frontend Developer — Semtitans Digital", stage: "Nov 2021 – Oct 2024" },
      { title: "WordPress Developer — Biogetica", stage: "Jan 2020 – Oct 2021" },
    ],
  },
  {
    title: "credentials",
    info: [
      { title: "BCA, Computer Science — Bharati Vidyapeeth, Mumbai", stage: "2021" },
      { title: "Generative AI Mastermind — Outskill", stage: "2024" },
      { title: "Google Project Management Certificate", stage: "2023" },
      { title: "Shopify Theme Development: Online Store 2.0", stage: "2022" },
    ],
  },
];

const About = () => {
  const containerRef = useRef();
  const [index, setIndex] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.about-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.8'
    )
    .fromTo('.about-desc',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo('.about-counters',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.about-tabs',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, { scope: containerRef });

  const dividerStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '1px',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  };

  return (
    <section ref={containerRef} id="about" style={{
      padding: '100px 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4rem',
        position: 'relative',
        zIndex: 1,
        paddingLeft: 'clamp(20px, 30vw, 0px)' // Pushes content past the absolutely positioned image
      }}>
        
        {/* Center: Title, Bio, Counters */}
        <div style={{ flex: '1.2', minWidth: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="about-title" style={{ fontSize: '2.8rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: '1.1', fontWeight: 'bold' }}>
            Building AI-powered products that <span style={{ color: '#ff3333' }}>ship</span> to production.
          </h2>
          
          <p className="about-desc" style={{ fontSize: '1.05rem', marginBottom: '3rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            Full-Stack Software Engineer with 6+ years of experience building scalable web applications, ecommerce platforms, AI-powered products, and automation systems. Expertise spans AI Agents & Agentic Workflows, React.js, Next.js, TypeScript & JavaScript, Shopify Plus & Custom Theme Development, RAG Systems & AI Integrations, Frontend Architecture & Performance Optimization, and API Development & Automation. Built and optimized 50+ ecommerce stores and web applications, improved operational efficiency through intelligent automation, and developed AI-powered products and agentic workflows. Currently at CISAI working on AI-driven applications, frontend engineering, automation systems, and scalable product development. Open to AI Engineering, Full-Stack Development, Frontend Engineering, Shopify Plus Development, and remote product-based roles.
          </p>

          {/* Counters Grid */}
          <div className="about-counters" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            
              <div style={{ flex: '1', minWidth: '100px', position: 'relative', paddingRight: '1rem' }}>
              <div style={dividerStyle}></div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ff3333', marginBottom: '0.5rem' }}>
                6+
              </div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.4', maxWidth: '100px' }}>
                Years of experience.
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '100px', position: 'relative', paddingRight: '1rem' }}>
              <div style={dividerStyle}></div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ff3333', marginBottom: '0.5rem' }}>
                50+
              </div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.4', maxWidth: '100px' }}>
                Ecommerce stores built.
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '100px', position: 'relative', paddingRight: '1rem' }}>
              <div style={dividerStyle}></div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ff3333', marginBottom: '0.5rem' }}>
                70%
              </div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.4', maxWidth: '100px' }}>
                Manual effort reduction.
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '100px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ff3333', marginBottom: '0.5rem' }}>
                5
              </div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.4', maxWidth: '100px' }}>
                Professional certifications.
              </div>
            </div>

          </div>
        </div>

        {/* Right: Interactive Info Tabs */}
        <div className="about-tabs" style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Tab Headers */}
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                onClick={() => setIndex(itemI)}
                style={{
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: index === itemI ? '#ff3333' : 'var(--text-main)',
                  position: 'relative',
                  transition: 'color 0.3s'
                }}
              >
                {item.title}
                {/* Active underline indicator */}
                {index === itemI && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#ff3333',
                    transition: 'all 0.3s ease'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '150px' }}>
            {aboutData[index].info.map((item, itemI) => (
              <div key={itemI} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                
                <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{item.title}</div>
                {item.stage && <div>—</div>}
                {item.stage && <div style={{ color: 'var(--text-main)' }}>{item.stage}</div>}

                {/* Icons (only for skills tab) */}
                {item.icons && (
                  <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem', color: 'var(--text-main)' }}>
                    <span style={{ marginRight: '0.5rem' }}>—</span>
                    {item.icons.map((Icon, iconI) => (
                      <div key={iconI} style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>
                        <Icon weight="fill" />
                      </div>
                    ))}
                  </div>
                )}
                
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Mobile styling overrides */}
      <style>{`
        @media (max-width: 1024px) {
          #about .container {
            padding-left: 24px !important;
          }
          
        }
      `}</style>
    </section>
  );
};

export default About;
