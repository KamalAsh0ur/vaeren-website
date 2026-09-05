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
      { id: '#text-collection', start: 6000, end: 7500 },
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
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:px-12 md:py-10 z-10 text-[var(--color-vaeren-bone)] opacity-80">
        
        {/* Navigation Layer - Minimal */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center">
              <MagneticElement strength={0.3}>
                  <img src="/logo.png" alt="Vaeren Studios" className="h-6 object-contain" />
              </MagneticElement>
          </div>
          <nav className="flex items-center space-x-6 md:space-x-12 type-meta uppercase text-[var(--color-vaeren-concrete)] md:-mt-2 md:-mr-4">
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
          <div id="start-screen" className="absolute left-1/2 top-[75%] md:top-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full text-center px-4">
            <h1 className="type-h2 mb-4 tracking-[0.2em] opacity-100">VAEREN STUDIOS</h1>
            <h2 className="type-body text-white mb-4 tracking-[0.2em] uppercase opacity-90">Don't Make What Already Exists.</h2>
            <p className="type-body text-white/60 max-w-lg mx-auto mb-8 text-sm normal-case tracking-normal opacity-80">
              A creative studio collaborating with streetwear brands to design clothing, build visual worlds, and create campaigns that don't look like everything else.
            </p>
            <div className="w-[1px] h-12 md:h-16 bg-white/20 relative overflow-hidden">
                <div id="start-line" className="absolute top-0 left-0 w-full h-full bg-white"></div>
            </div>
          </div>

          {/* Origin - Content RIGHT (Desktop) / CENTER (Mobile) */}
          <div id="text-origin" className="absolute left-1/2 -translate-x-1/2 top-[78%] w-10/12 flex flex-col items-center px-4 md:px-0 md:left-auto md:-translate-x-0 md:right-[5%] md:top-[80%] md:items-end md:w-1/3 drop-shadow-xl">
            <h2 className="type-h2 mb-4 stagger-item opacity-0 text-center md:text-right">Building The World</h2>
            <p className="type-body text-white text-center md:text-right stagger-item opacity-0">
              We are building the concepts we want to see. Open to collaboration with brands who want in.
            </p>
          </div>

          {/* Movement - Content LEFT (Desktop) / CENTER (Mobile) */}
          <div id="text-movement" className="absolute left-1/2 -translate-x-1/2 top-[78%] w-10/12 flex flex-col items-center px-4 md:px-0 md:-translate-x-0 md:left-[5%] md:top-[80%] md:items-start md:w-1/3 drop-shadow-xl">
            <h2 className="type-h2 mb-4 stagger-item opacity-0 text-center md:text-left">Collaboration → World</h2>
            <p className="type-body text-white text-center md:text-left stagger-item opacity-0">
              Taking an ordinary clothing idea and pushing it into something unexpected, recognizable, and difficult to replicate.
            </p>
          </div>

          {/* Transformation - Content RIGHT (Desktop) / CENTER (Mobile) */}
          <div id="text-transformation" className="absolute left-1/2 -translate-x-1/2 top-[78%] w-10/12 flex flex-col items-center px-4 md:px-0 md:left-auto md:-translate-x-0 md:right-[5%] md:top-[80%] md:items-end md:w-1/3 drop-shadow-xl">
            <h2 className="type-h2 mb-4 stagger-item opacity-0 text-center md:text-right">Visual World → Campaign</h2>
            <p className="type-body text-white text-center md:text-right stagger-item opacity-0">
              A creative studio collaborating with streetwear brands to design clothing, build visual worlds, and create campaigns that don't look like everything else.
            </p>
          </div>

          {/* Collection - Centered (Moved down on mobile) */}
          <div id="text-collection" className="absolute left-1/2 top-[78%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-10/12 md:w-full px-4 md:px-0">
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
        
        <footer className="flex justify-between items-end pointer-events-auto type-meta text-[var(--color-vaeren-ash)] gap-2 w-full">
          <div className="flex-1 text-left shrink-0">Creative Studio</div>
          <div className="shrink-0 flex flex-col items-center justify-end pb-1">
              <MagneticElement strength={0.4}>
                  <a 
                    href="https://www.instagram.com/vaeren.studios/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-vaeren-bone)] transition-colors min-h-[32px] min-w-[48px] flex items-center justify-center underline underline-offset-4"
                    aria-label="Follow us on Instagram"
                    data-cursor-text="FOLLOW"
                  >
                      Instagram
                  </a>
              </MagneticElement>
          </div>
          <div className="flex-1 text-right shrink-0">Cairo, Egypt <br/> Estd. 2026</div>
        </footer>
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
