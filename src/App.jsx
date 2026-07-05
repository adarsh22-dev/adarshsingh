import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import Learning from './components/Learning';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectPage from './pages/ProjectPage';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: !isMobile,
    });

    if (!isMobile) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      lenis.destroy();
      mq.removeEventListener('change', handler);
      if (!isMobile) {
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
      }
    };
  }, [isMobile]);

  const sections = [
    { id: 'hero', Component: Hero },
    { id: 'about', Component: About },
    { id: 'skills', Component: Skills },
    { id: 'experience', Component: Experience },
    { id: 'certifications', Component: Certifications },
    { id: 'testimonials', Component: Testimonials },
    { id: 'projects', Component: Projects },
    { id: 'learning', Component: Learning },
    { id: 'contact', Component: Contact },
    { id: 'footer', Component: Footer },
  ];

  return (
    <div className={isMobile ? 'fullpage-container' : ''}>
      <Preloader />
      <Navbar />
      {sections.map(({ id, Component }) => (
        <div key={id} className={isMobile ? 'snap-section' : ''}>
          <Component />
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
