import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Briefcase } from "@phosphor-icons/react";

const experiences = [
  {
    title: "Software Developer — AI & Frontend",
    companyName: "Centre for Internet Studies & Artificial Intelligence (CISAI)",
    location: "Kerala, India",
    iconBg: "#1d1836",
    date: "July 2025 – Present (1 yr 1 mo)",
    points: [
      "Developed production-ready AI-powered web applications using React, TypeScript, and modern frontend architecture.",
      "Built intelligent automation systems and agentic AI workflows that streamlined business operations.",
      "Integrated LLMs, APIs, and AI tooling into scalable frontend applications.",
      "Optimized application performance, reducing load times and improving user experience.",
      "Collaborated with cross-functional teams to deliver AI-enabled products from concept to deployment.",
    ],
  },
  {
    title: "Software Developer",
    companyName: "Ergode",
    location: "India",
    iconBg: "#232631",
    date: "January 2025 – June 2025 (6 mos)",
    points: [
      "Built scalable frontend features supporting large ecommerce catalogs and high-traffic user journeys.",
      "Automated business workflows, reducing manual effort by approximately 70%.",
      "Integrated API-driven systems to improve operational efficiency and data synchronization.",
      "Contributed to performance optimization and production stability initiatives.",
    ],
  },
  {
    title: "Frontend Web Developer",
    companyName: "Semtitans Digital Private Limited",
    location: "Navi Mumbai",
    iconBg: "#1d1836",
    date: "November 2021 – October 2024 (3 yrs)",
    points: [
      "Developed 50+ Shopify and WordPress websites for D2C and ecommerce brands.",
      "Built custom Shopify themes, landing pages, and conversion-focused storefronts.",
      "Improved Core Web Vitals, page speed, and SEO performance across multiple projects.",
      "Integrated third-party APIs, payment gateways, and marketing tools.",
      "Led frontend development initiatives and reusable component architecture.",
    ],
  },
  {
    title: "WordPress Developer",
    companyName: "Biogetica",
    location: "Mumbai",
    iconBg: "#232631",
    date: "January 2020 – October 2021 (1 yr 10 mos)",
    points: [
      "Built and maintained frontend interfaces for content-driven and ecommerce websites.",
      "Improved UI performance, responsiveness, and accessibility across the platform.",
      "Resolved UI and integration issues with minimal downtime.",
    ],
  },
];

const ExperienceCard = ({ experience, isMobile }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        padding: isMobile ? '1.25rem' : undefined,
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date}
      dateClassName={isMobile ? "exp-date-mobile" : ""}
      iconStyle={{ background: experience.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      icon={
        <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Briefcase size={isMobile ? 18 : 22} color="#00d2ff" weight="fill" />
        </div>
      }
    >
      <div>
        <h3 style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: 'bold', color: '#fff', margin: 0, lineHeight: '1.3' }}>{experience.title}</h3>
        <p style={{ margin: '4px 0 0 0', color: '#00d2ff', fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
          {experience.companyName} · {experience.location}
        </p>
      </div>
      <ul style={{ marginTop: '1rem', marginLeft: '1rem', paddingLeft: '0.5rem', listStyleType: 'disc' }}>
        {experience.points.map((point, index) => (
          <li key={`point-${index}`} style={{
            fontSize: isMobile ? '12px' : '13px',
            letterSpacing: '0.02em',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '0.4rem',
            lineHeight: '1.5',
          }}>
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="experience" style={{
      padding: isMobile ? '60px 0' : '100px 0',
      minHeight: isMobile ? 'auto' : '100vh',
      position: 'relative',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', fontSize: isMobile ? '0.85rem' : '1rem', margin: 0 }}>
            What I have done so far
          </p>
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '800', color: 'var(--text-main)', margin: '0.5rem 0 0' }}>
            Work Experience.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
          <VerticalTimeline lineColor="rgba(255,255,255,0.08)">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} isMobile={isMobile} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
      {isMobile && (
        <style>{`
          .exp-date-mobile { font-size: 11px !important; padding: 0 0 0.5rem 0 !important; color: var(--text-muted) !important; }
          .vertical-timeline-element-content { margin-left: 45px !important; }
          .vertical-timeline-element-icon { width: 35px !important; height: 35px !important; left: 0 !important; }
          .vertical-timeline::before { left: 17px !important; }
          .vertical-timeline-element-date { font-size: 11px !important; }
        `}</style>
      )}
    </section>
  );
};

export default Experience;
