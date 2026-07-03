import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SkillItem = ({ tech }) => {
  return (
    <div title={tech.name} style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 60%, transparent)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      cursor: 'default',
      position: 'relative',
      boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(122,0,255,0.3)';
      e.currentTarget.style.boxShadow = 'inset 0 -2px 8px rgba(0,0,0,0.3), 0 4px 24px rgba(122,0,255,0.2)';
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.boxShadow = 'inset 0 -2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)';
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
    }}>
      <img
        src={tech.icon}
        alt={tech.name}
        style={{ width: '60%', height: '60%', objectFit: 'contain' }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

const technologies = [
  { name: 'HTML 5', icon: '/tech/html.png' },
  { name: 'CSS 3', icon: '/tech/css.png' },
  { name: 'JavaScript', icon: '/tech/javascript.png' },
  { name: 'TypeScript', icon: '/tech/typescript.png' },
  { name: 'React JS', icon: '/tech/reactjs.png' },
  { name: 'Redux Toolkit', icon: '/tech/redux.png' },
  { name: 'Tailwind CSS', icon: '/tech/tailwind.png' },
  { name: 'Node JS', icon: '/tech/nodejs.png' },
  { name: 'MongoDB', icon: '/tech/mongodb.png' },
  { name: 'Three JS', icon: '/tech/threejs.svg' },
  { name: 'Git', icon: '/tech/git.png' },
  { name: 'Figma', icon: '/tech/figma.png' },
  { name: 'Docker', icon: '/tech/docker.png' },
  { name: 'Python', icon: '/tech/python.svg' },
  { name: 'C', icon: '/tech/c.svg' },
  { name: 'C++', icon: '/tech/cpp.svg' },
  { name: '.NET', icon: '/tech/dotnet.svg' },
  { name: 'WordPress', icon: '/tech/wordpress.svg' },
  { name: 'Shopify', icon: '/tech/shopify.svg' },
  { name: 'Magento', icon: '/tech/magento.svg' },
  { name: 'CRM', icon: '/tech/crm.svg' },
];

const Skills = () => {
  const containerRef = useRef();

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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="skills" style={{
      padding: '100px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div className="container">
        <div className="skills-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            What I work with
          </p>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
            Skills.
          </h2>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          {technologies.map((tech) => (
            <SkillItem key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
