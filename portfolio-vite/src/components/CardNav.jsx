import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CardNav.css';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

const CardNav = ({ items, className = '', ease = 'power3.out', buttonText = 'Hire Me', onHireClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calcHeight = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      const content = navRef.current?.querySelector('.card-nav-content');
      if (content) {
        const prev = { vis: content.style.visibility, pe: content.style.pointerEvents, pos: content.style.position, h: content.style.height };
        Object.assign(content.style, { visibility: 'visible', pointerEvents: 'auto', position: 'static', height: 'auto' });
        content.offsetHeight;
        const height = 64 + content.scrollHeight + 16;
        Object.assign(content.style, { visibility: prev.vis, pointerEvents: prev.pe, position: prev.pos, height: prev.h });
        return height;
      }
    }
    return 280;
  };

  const buildTimeline = () => {
    const nav = navRef.current;
    if (!nav) return null;
    gsap.set(nav, { height: 64, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 40, opacity: 0, scale: 0.95 });
    const tl = gsap.timeline({ paused: true });
    tl.to(nav, { height: calcHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease, stagger: 0.06 }, '-=0.15');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = buildTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
  }, [ease, items]);

  useLayoutEffect(() => {
    const onResize = () => {
      if (!tlRef.current) return;
      tlRef.current.kill();
      const tl = buildTimeline();
      if (tl) { if (isExpanded) tl.progress(1); tlRef.current = tl; }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isExpanded]);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsOpen(true); setIsExpanded(true); tl.play(0);
    } else {
      setIsOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
        <div className="card-nav-top">
          <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggle} role="button" aria-label={isExpanded ? 'Close menu' : 'Open menu'} tabIndex={0}>
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
          <span className="nav-logo-text">Prajwal Cordiero</span>
          <button type="button" className="card-nav-cta-button" onClick={onHireClick}>{buttonText}</button>
        </div>
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div key={idx} className="nav-card" ref={el => { if (el) cardsRef.current[idx] = el; }} style={{ '--card-accent': item.textColor }}>
              <div className="nav-card-label" style={{ color: item.textColor }}>{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((link, i) => (
                  <a key={i} className="nav-card-link" href={link.href || '#'} aria-label={link.ariaLabel} onClick={toggle}>
                    <ArrowUpRight />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;