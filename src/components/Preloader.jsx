import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = () => {
  const container = useRef();
  const progressBar = useRef();
  const [isComplete, setIsComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      }
    });

    tl.to(progressBar.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out'
    })
    .to(container.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.inOut',
      display: 'none'
    });
  }, { scope: container });

  if (isComplete) return null;

  const isMobile = windowWidth <= 768;

  return (
    <div 
      ref={container} 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#05050f',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f0f0ff'
      }}
    >
      <h1 className="glowing-text" style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '2rem' }}>Adarsh</h1>
      <div 
        style={{
          width: isMobile ? '200px' : '300px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <div 
          ref={progressBar}
          style={{
            width: '0%',
            height: '100%',
            background: 'linear-gradient(90deg, #00d2ff, #7a00ff)'
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
