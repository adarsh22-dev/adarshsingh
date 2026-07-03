import React, { useRef, useEffect, useState } from 'react';
import BallCanvas from './BallCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function useSvgToDataUrl(svgPath) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    if (!svgPath?.endsWith('.svg')) { setDataUrl(svgPath); return; }

    fetch(svgPath)
      .then(r => r.text())
      .then(svg => {
        const img = new Image();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = 256; c.height = 256;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, 256, 256);
          URL.revokeObjectURL(url);
          setDataUrl(c.toDataURL('image/png'));
        };
        img.src = url;
      })
      .catch(() => setDataUrl(svgPath));
  }, [svgPath]);

  return dataUrl;
}

const SkillItem = ({ tech }) => {
  const iconUrl = useSvgToDataUrl(tech.icon);

  return (
    <div title={tech.name} style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {iconUrl && <BallCanvas icon={iconUrl} />}
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
