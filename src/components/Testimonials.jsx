import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    testimonial: "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial: "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial: "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const FeedbackCard = ({ testimonial, name, designation, company, image, index }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        delay: index * 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      style={{
        background: '#151030',
        width: '320px',
        borderRadius: '24px',
        padding: '2.5rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(122, 0, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <p style={{ fontSize: '48px', fontWeight: 900, color: '#fff', lineHeight: '0.8', marginBottom: '0.5rem' }}>"</p>

      <p style={{ fontSize: '18px', color: '#fff', lineHeight: '1.6', fontWeight: 400 }}>{testimonial}</p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginTop: '1.75rem'
      }}>
        <div>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#fff', margin: 0 }}>
            <span style={{ background: 'linear-gradient(90deg, #2f80ed, #56ccf2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>@</span> {name}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(240, 240, 255, 0.5)', margin: '0.25rem 0 0 0' }}>
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={name}
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      </div>
    </div>
  );
};

const Testimonials = () => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.fromTo('.testimonials-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="testimonials" style={{
      padding: '100px 0',
      minHeight: '60vh',
      position: 'relative',
    }}>
      <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(122, 0, 255, 0.15), rgba(0, 0, 0, 0))',
          minHeight: '300px',
          padding: '4rem 0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="container">
            <div className="testimonials-header" style={{ textAlign: 'center' }}>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(240, 240, 255, 0.6)', fontSize: '1rem', margin: 0 }}>
                What others say
              </p>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Testimonials.
              </h2>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: '-3rem', paddingBottom: '3.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
          }}>
            {testimonials.map((item, index) => (
              <FeedbackCard key={item.name} index={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
