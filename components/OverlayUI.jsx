'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Minus } from 'lucide-react';
import MagneticElement from './MagneticElement';
import MenuOverlay from './MenuOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EMAIL = 'kamal.ashour.bessa@gmail.com';
const SUBJECT = 'Collaboration Inquiry — Vaeren Studios';
const BODY = `Hey Vaeren,

I'm reaching out because I have a project I'd like to explore with you.

Brand / Project Name:
Website or Instagram:
What are you looking for? (Design, Creative Direction, Campaign, Full Collaboration, Other):

Brief description of the idea:


Looking forward to hearing from you.`;

const MAILTO_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export default function OverlayUI() {
  const overlayRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 8000px total scroll, split into distinct storytelling phases
    const phases = [
      { id: '#text-origin', start: 0, end: 2000 },
      { id: '#text-movement', start: 2000, end: 4000 },
      { id: '#text-transformation', start: 4000, end: 6000 },
      { id: '#text-collection', start: 6000, end: 8000 },
    ];

    phases.forEach(phase => {
      // Find all stagger items within this phase
      const phaseEl = document.querySelector(phase.id);
      if(!phaseEl) return;
      const items = phaseEl.querySelectorAll('.stagger-item');

      // Reveal with stagger
      if (items.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              start: phase.start,
              end: phase.end,
              scrub: true,
            }
          });

          // Show parent container, then fade children in
          tl.set(phaseEl, { visibility: 'visible', opacity: 1 })
          .fromTo(
            items,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' }
          )
          // Fade children out, then hide parent
          .to(
            items,
            { opacity: 0, y: -20, stagger: 0.05, duration: 0.25, ease: 'power2.in' },
            "+=0.45"
          )
          .set(phaseEl, { visibility: 'hidden', opacity: 0 });
      } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              start: phase.start,
              end: phase.end,
              scrub: true,
            }
          });

          tl.fromTo(
            phaseEl,
            { opacity: 0, y: 30, visibility: 'visible' },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          )
          .to(
            phaseEl,
            { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' },
            "+=0.45"
          )
          .set(phaseEl, { visibility: 'hidden' });
      }
    });

    // Start Screen scroll fade out
    const startScreen = document.querySelector('#start-screen');
    if (startScreen) {
      gsap.to(startScreen, {
        opacity: 0,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: '0px top',
          end: '300px top',
          scrub: true,
        }
      });

      gsap.fromTo(
        '#start-line',
        { yPercent: -100 },
        { yPercent: 100, duration: 1.5, repeat: -1, ease: 'power1.inOut' }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if(t.vars.trigger === document.body && String(t.vars.start).includes('px top')) {
            t.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-12 z-10 text-[var(--color-vaeren-bone)]">
        
        {/* Navigation Layer - Minimal */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="flex items-center">
              <MagneticElement strength={0.3}>
                  <img src="/logo.png" alt="Vaeren Studios" className="h-6 object-contain" />
              </MagneticElement>
          </div>
          <nav className="flex items-center space-x-6 md:space-x-12 type-meta uppercase text-[var(--color-vaeren-concrete)]">
            <div className="hidden md:block">
              <MagneticElement strength={0.4}>
                  <a href="#work" className="hover:text-[var(--color-vaeren-bone)] transition-colors py-2" data-cursor-text="WORK">Work</a>
              </MagneticElement>
            </div>
            <MagneticElement strength={0.4}>
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="hover:text-[var(--color-vaeren-bone)] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center" 
                  data-cursor-text="ENTER"
                  aria-label="Open Menu"
                >
                  Menu
                </button>
            </MagneticElement>
            <div className="hidden md:block">
              <MagneticElement strength={0.4}>
                  <a href={MAILTO_HREF} className="hover:text-[var(--color-vaeren-bone)] transition-colors py-2" data-cursor-text="START">Start a Project</a>
              </MagneticElement>
            </div>
          </nav>
        </header>

        {/* Cinematic Content Layer */}
        <div className="flex-1 w-full h-full relative">
          
          {/* Starting Screen */}
          <div id="start-screen" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full text-center">
            <h1 className="type-h1 mb-4 tracking-[0.1em] opacity-90">VAEREN STUDIOS</h1>
            <h2 className="type-meta text-[var(--color-vaeren-bone)] mb-6 tracking-[0.3em] uppercase opacity-75">WE CREATE WITH STREETWEAR.</h2>
            <div className="w-[1px] h-12 md:h-16 bg-white/20 relative overflow-hidden">
                <div id="start-line" className="absolute top-0 left-0 w-full h-full bg-white"></div>
            </div>
          </div>

          {/* Origin - Content RIGHT (Desktop) / CENTER (Mobile) */}
          <div id="text-origin" className="absolute left-1/2 -translate-x-1/2 top-[70%] w-11/12 flex flex-col items-center md:left-auto md:-translate-x-0 md:right-[5%] md:top-[35%] md:items-end md:w-1/3">
            <h2 className="type-h2 mb-4 stagger-item opacity-0 text-center md:text-right">Design → Concept</h2>
            <p className="type-body text-[var(--color-vaeren-concrete)] text-center md:text-right stagger-item opacity-0">
              We don't just make visuals for brands. We create with them.
            </p>
          </div>

          {/* Movement - Content LEFT (Desktop) / CENTER (Mobile) */}
          <div id="text-movement" className="absolute left-1/2 -translate-x-1/2 top-[75%] w-11/12 flex flex-col items-center md:-translate-x-0 md:left-[5%] md:top-[40%] md:items-start md:w-1/3">
            <h2 className="type-h2 mb-4 stagger-item opacity-0 text-center md:text-left">Collaboration → World</h2>
            <p className="type-body text-[var(--color-vaeren-concrete)] text-center md:text-left stagger-item opacity-0">
              Taking an ordinary clothing idea and pushing it into something unexpected, recognizable, and difficult to replicate.
            </p>
          </div>

          {/* Transformation - Content RIGHT (Desktop) / CENTER (Mobile) */}
          <div id="text-transformation" className="absolute left-1/2 -translate-x-1/2 top-[70%] w-11/12 flex flex-col items-center md:left-auto md:-translate-x-0 md:right-[5%] md:top-[50%] md:items-end md:w-1/3">
            <h2 className="type-h2 mb-4 stagger-item opacity-0 text-center md:text-right">Visual World → Campaign</h2>
            <p className="type-body text-[var(--color-vaeren-concrete)] text-center md:text-right stagger-item opacity-0">
              A creative studio collaborating with streetwear brands to design clothing, build visual worlds, and create campaigns that don't look like everything else.
            </p>
          </div>

          {/* Collection - Centered (Moved down on mobile) */}
          <div id="text-collection" className="absolute left-1/2 top-[75%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-11/12 md:w-full">
            <h2 className="type-h1 mb-8 stagger-item opacity-0">Start a Collaboration</h2>
            <div className="stagger-item opacity-0 pointer-events-auto flex flex-col md:flex-row gap-4">
                <MagneticElement strength={0.3}>
                    <a href={MAILTO_HREF} className="btn-primary" data-cursor-text="START">
                        Start A Project <span className="arrow">&rarr;</span>
                    </a>
                </MagneticElement>
                <MagneticElement strength={0.3}>
                    <a href="#work" className="btn-secondary" data-cursor-text="VIEW">
                        Explore The Work
                    </a>
                </MagneticElement>
            </div>
          </div>
        </div>
        
        <footer className="flex justify-between items-end pointer-events-auto type-meta text-[var(--color-vaeren-ash)]">
          <div>Creative Studio</div>
          <div className="flex flex-col items-center gap-2">
              <MagneticElement strength={0.4}>
                  <a 
                    href="https://www.instagram.com/vaeren.studios/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-vaeren-bone)] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center underline underline-offset-4"
                    aria-label="Follow us on Instagram"
                    data-cursor-text="FOLLOW"
                  >
                      Instagram
                  </a>
              </MagneticElement>
          </div>
          <div className="text-right">Cairo, Egypt <br/> Estd. 2026</div>
        </footer>
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
