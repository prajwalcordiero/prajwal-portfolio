import { useRef } from 'react';
import Ballpit from './components/Ballpit';
import CardNav from './components/CardNav';
import './App.css';

const NAV_ITEMS = [
  {
    label: 'Work',
    bgColor: 'transparent',
    textColor: '#5c3aff', // Glossy Purple matching image_4a6bdd.png
    links: [
      { label: 'Projects', href: '#projects', ariaLabel: 'View Projects' },
      { label: 'Hackathons', href: '#hackathons', ariaLabel: 'View Hackathons' },
    ],
  },
  {
    label: 'About',
    bgColor: 'transparent',
    textColor: '#ffffff', // Crisp White accent
    links: [
      { label: 'Skills', href: '#skills', ariaLabel: 'View Skills' },
      { label: 'Education', href: '#education', ariaLabel: 'View Education' },
      { label: 'Experience', href: '#experience', ariaLabel: 'View Experience' },
    ],
  },
  {
    label: 'Connect',
    bgColor: 'transparent',
    textColor: '#9ca3af', // Polished Charcoal grey tone
    links: [
      { label: 'GitHub', href: 'https://github.com/prajwalcordiero', ariaLabel: 'GitHub Profile' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwal-cordiero-294257300', ariaLabel: 'LinkedIn Profile' },
      { label: 'Email', href: 'mailto:prajwalcordiero@gmail.com', ariaLabel: 'Send Email' },
    ],
  },
];

const SKILLS = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'C', 'C++', 'Java'] },
  { category: 'Frontend', items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind'] },
  { category: 'Backend', items: ['Node.js', 'Flask', 'REST APIs'] },
  { category: 'ML / CV', items: ['YOLO', 'CNNs', 'OpenCV', 'TensorFlow'] },
  { category: 'IoT', items: ['ESP32', 'Arduino', 'Sensor Integration'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Linux', 'VS Code'] },
];

const PROJECTS = [
  {
    title: 'Hazmat Reroute Authorization Platform',
    award: '🥉 3rd Place — Code & Core (SJEC)',
    desc: 'Real-time route deviation validator for hazardous material transport vehicles. Integrates live GPS with contextual road data to auto-approve or flag path deviations.',
    tech: ['Python', 'Flask', 'React.js', 'Google Maps API'],
    color: '#5c3aff',
  },
  {
    title: 'Autonomous Hardware Bot',
    award: '🏆 Best IoT Project — Nexathon',
    desc: 'Self-navigating bot with ESP32 and sensor arrays featuring real-time obstacle detection. Designed and built from scratch under 48-hour competition constraints.',
    tech: ['ESP32', 'Arduino', 'C++', 'Sensor Arrays'],
    color: '#ffffff',
  },
  {
    title: 'IoT Patient Vitals Monitor',
    award: '❤️ Best Social Impact — Canara Hackathon',
    desc: 'Arduino-based connected healthcare device capturing heart rate, SpO2 and temperature. Data relayed via Wi-Fi to a live dashboard for remote patient monitoring.',
    tech: ['Arduino', 'ESP32', 'Python', 'Flask'],
    color: '#9ca3af',
  },
];

export default function App() {
  const contactRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio">
      <CardNav items={NAV_ITEMS} onHireClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })} buttonText="Hire Me" />

      {/* Upgraded Site-Wide Glossy Bubble Backdrop */}
      <Ballpit count={100} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">B.E. CSE · 4th Year · SJEC Mangaluru</div>
          <h1 className="hero-name">Prajwal<br />Cordiero</h1>
          <p className="hero-tagline">Full-Stack · Machine Learning · IoT</p>
          <p className="hero-sub">Building real things that solve real problems -<br />from React apps to YOLO vision systems to ESP32 bots.</p>
          <div className="hero-actions">
            <a href="#projects" onClick={e => { e.preventDefault(); scrollTo('projects'); }} className="btn-primary">View Projects</a>
            <a href="mailto:prajwalcordiero@gmail.com" className="btn-ghost">Get in Touch</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">10+</span><span className="stat-label">Hackathons</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">3</span><span className="stat-label">Awards Won</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">8.85</span><span className="stat-label">CGPA</span></div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Projects</span>
            <h2 className="section-title">Hackathon-proven builds</h2>
            <p className="section-sub">Each project was shipped end-to-end within a 24–48 hour competition window.</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card" style={{ '--card-accent': p.color }}>
                <div className="project-award">{p.award}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section section-dark" id="skills">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Skills</span>
            <h2 className="section-title">Technical toolkit</h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div key={i} className="skill-row">
                <span className="skill-cat">{s.category}</span>
                <div className="skill-tags">
                  {s.items.map(item => <span key={item} className="skill-tag">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION + EXPERIENCE */}
      <section className="section" id="education">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Background</span>
            <h2 className="section-title">Education & Experience</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <span className="timeline-date">2023 – 2027</span>
                <h3 className="timeline-title">B.E. Computer Science & Engineering</h3>
                <p className="timeline-org">St. Joseph Engineering College, Mangaluru</p>
                <p className="timeline-detail">3rd Year (6th Sem) · CGPA: <strong>8.85 / 10</strong></p>
                <p className="timeline-detail">DSA · DBMS · OS · Computer Networks</p>
              </div>
            </div>
            <div className="timeline-item" id="experience">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <span className="timeline-date">2025 · 1 month</span>
                <h3 className="timeline-title">Software Development Intern</h3>
                <p className="timeline-org">Accolade Tech Solutions, Kankanady — Mangaluru</p>
                <p className="timeline-detail">Completed a structured 1-month AI/ML training programme covering core ML concepts, model building, and practical applications under industry professionals.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <span className="timeline-date">2021 – 2023</span>
                <h3 className="timeline-title">Pre-University (PCMB)</h3>
                <p className="timeline-org">Alva's Pre-University College, Moodbidri</p>
                <p className="timeline-detail">Physics · Chemistry · Mathematics · Biology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section section-dark" id="hackathons">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Achievements</span>
            <h2 className="section-title">Beyond the classroom</h2>
          </div>
          <div className="achieve-grid">
            <div className="achieve-card">
              <div className="achieve-icon">🏆</div>
              <h3>3 Hackathon Awards</h3>
              <p>Best IoT, Best Social Impact, and 3rd Place across AI, IoT, and full-stack tracks.</p>
            </div>
            <div className="achieve-card">
              <div className="achieve-icon">⚡</div>
              <h3>10+ Competitions</h3>
              <p>Consistently shipping working MVPs under 24–48 hour deadlines across multiple colleges.</p>
            </div>
            <div className="achieve-card">
              <div className="achieve-icon">🎤</div>
              <h3>AI Workshop Speaker</h3>
              <p>Invited as Resource Person for a student workshop on AI Hallucinations — risks, causes, and mitigation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-contact" id="contact" ref={contactRef}>
        <div className="contact-content">
          <span className="section-eyebrow">Contact</span>
          <h2 className="contact-title">Let's build something</h2>
          <p className="contact-sub">Open to internships, collaborations, and interesting problems.</p>
          <div className="contact-links">
            <a href="mailto:prajwalcordiero@gmail.com" className="contact-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              prajwalcordiero@gmail.com
            </a>
            <a href="https://github.com/prajwalcordiero" target="_blank" rel="noreferrer" className="contact-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              github.com/prajwalcordiero
            </a>
            <a href="https://www.linkedin.com/in/prajwal-cordiero-294257300" target="_blank" rel="noreferrer" className="contact-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin.com/in/prajwal-cordiero
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Prajwal Royston Cordiero · Mangaluru, Karnataka</p>
      </footer>
    </div>
  );
}