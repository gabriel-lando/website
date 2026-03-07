import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './App.css';
import { profile, skills, experience, education, stats } from './config';

const SKILL_PALETTE_SIZE = 7;
const CARD_BASE_WIDTH = 720;
const CARD_BASE_HEIGHT = 412;
const MIN_PAGE_GUTTER = 12;
const MAX_PAGE_GUTTER = 32;
const PAGE_GUTTER_RATIO = 0.025;

const categoryOrder = [...new Set(skills.map((s) => s.category))];
const skillColor = (cat: string) => `var(--skill-palette-${categoryOrder.indexOf(cat) % SKILL_PALETTE_SIZE})`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getPageGutter = (width: number, height: number) => clamp(Math.min(width, height) * PAGE_GUTTER_RATIO, MIN_PAGE_GUTTER, MAX_PAGE_GUTTER);

const getCardScale = (width: number, height: number) => {
  const gutter = getPageGutter(width, height);
  const availableWidth = Math.max(width - gutter * 2, 0);
  const availableHeight = Math.max(height - gutter * 2, 0);

  if (availableWidth === 0 || availableHeight === 0) {
    return 1;
  }

  return Math.min(1, availableWidth / CARD_BASE_WIDTH, availableHeight / CARD_BASE_HEIGHT);
};

const IconEmail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconGitHub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22, display: 'block' }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const IconPDF = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const IconLinkedIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function App() {
  const [flipped, setFlipped] = useState(false);
  const [cardScale, setCardScale] = useState(() => getCardScale(window.innerWidth, window.innerHeight));
  const pageRef = useRef<HTMLElement>(null);

  const handleClick = () => setFlipped((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setFlipped((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const updateCardScale = () => {
      const page = pageRef.current;
      const width = page?.clientWidth || window.innerWidth;
      const height = page?.clientHeight || window.innerHeight;
      const nextScale = getCardScale(width, height);

      setCardScale((currentScale) => (Math.abs(currentScale - nextScale) < 0.001 ? currentScale : nextScale));
    };

    updateCardScale();
    window.addEventListener('resize', updateCardScale);

    const page = pageRef.current;
    const resizeObserver = typeof ResizeObserver !== 'undefined' && page ? new ResizeObserver(updateCardScale) : null;

    if (resizeObserver && page) {
      resizeObserver.observe(page);
    }

    return () => {
      window.removeEventListener('resize', updateCardScale);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <main className="page" ref={pageRef} style={{ '--card-scale': cardScale } as CSSProperties}>
      <div className="card-wrapper">
        <div className="card-scene">
          <div className="card-scale">
            <div className={`card-inner ${flipped ? 'is-flipped' : ''}`} onClick={handleClick} role="button" aria-label={flipped ? 'Flip card to front' : 'Flip card to back'} tabIndex={0}>
              {/* ── FRONT ── */}
              <div className={`card-face card-front ${flipped ? 'is-inactive' : 'is-active'}`} aria-hidden={flipped}>
                <div className="bg-accent"></div>
                <div className="front-left">
                  <h1 className="card-name">{profile.name}</h1>
                  <p className="card-title">{profile.title}</p>
                  <p className="card-company">{profile.company}</p>
                  <p className="card-summary">{profile.summary}</p>

                  <ul className="card-links">
                    <li>
                      <a href={`mailto:${profile.links.email}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Email" data-tooltip="Email">
                        <IconEmail />
                        <span className="sr-only">Email</span>
                      </a>
                    </li>
                    <li>
                      <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="LinkedIn" data-tooltip="LinkedIn">
                        <IconLinkedIn />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </li>
                    <li>
                      <a href={profile.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="GitHub" data-tooltip="GitHub">
                        <IconGitHub />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </li>
                    <li>
                      <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Resume" data-tooltip="Resume">
                        <IconPDF />
                        <span className="sr-only">Resume</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="front-right">
                  <div className="front-photo">
                    <img src={profile.photo} alt={profile.name} fetchPriority="high" />
                  </div>
                </div>
              </div>

              {/* ── BACK ── */}
              <div className={`card-face card-back ${flipped ? 'is-active' : 'is-inactive'}`} aria-hidden={!flipped}>
                <div className="bg-accent"></div>

                <div className="back-section back-skills-section hide-scrollbar">
                  <h3>Skills</h3>
                  <div className="back-skills-container">
                    {skills.map((skill, i) => (
                      <span key={`skill-${i}`} className="skill-tag" style={{ '--i': i, '--skill-color': skillColor(skill.category) } as CSSProperties}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="back-grid">
                  <div className="back-section">
                    <h3>Experience</h3>
                    <ul className="back-list">
                      {experience.map((e, i) => (
                        <li key={`exp-${i}`}>
                          {e.role}
                          <span className="meta">{e.meta}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="back-section">
                    <h3>Education</h3>
                    <ul className="back-list">
                      {education.map((e, i) => (
                        <li key={`edu-${i}`}>
                          {e.degree}
                          <span className="meta">{e.meta}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="back-stats">
                  {stats.map((s, i) =>
                    s.url ? (
                      <a key={i} className="stat-item stat-link" href={s.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <span className="stat-number">{s.number}</span>
                        <span className="stat-label">{s.label}</span>
                      </a>
                    ) : (
                      <div key={i} className="stat-item">
                        <span className="stat-number">{s.number}</span>
                        <span className="stat-label">{s.label}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="flip-hint">Click or press Space to flip</p>
      </div>
    </main>
  );
}

export default App;
