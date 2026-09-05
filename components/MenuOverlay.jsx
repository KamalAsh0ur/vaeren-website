'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from './MagneticElement';

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

const LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Collaboration', href: '#collaboration' },
  { name: 'Contact', href: MAILTO_HREF },
];

export default function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      // "Entering another room" transition
      gsap.to(overlay, {
        y: '0%',
        duration: 1.2,
        ease: 'power4.inOut',
        onStart: () => {
          overlay.style.pointerEvents = 'auto';
        }
      });

      // Staggered text reveal
      gsap.fromTo(
        linksRef.current,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.6,
        }
      );
    } else {
      // Exit animation
      gsap.to(overlay, {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          overlay.style.pointerEvents = 'none';
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[var(--color-vaeren-void)] flex flex-col justify-center items-center pointer-events-none"
      style={{ transform: 'translateY(-100%)' }}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-12 type-meta uppercase tracking-widest text-[var(--color-vaeren-concrete)] hover:text-[var(--color-vaeren-bone)] transition-colors p-4"
        data-cursor-text="CLOSE"
      >
        <MagneticElement strength={0.3}>
          Close &times;
        </MagneticElement>
      </button>

      <nav className="flex flex-col items-center space-y-6">
        {LINKS.map((link, index) => (
          <div key={link.name} className="overflow-hidden">
            <div ref={el => (linksRef.current[index] = el)}>
              <MagneticElement strength={0.2}>
                <a
                  href={link.href}
                  className="type-h2 hover:text-[var(--color-vaeren-concrete)] transition-colors inline-block"
                  data-cursor-text="ENTER"
                  onClick={onClose}
                >
                  {link.name}
                </a>
              </MagneticElement>
            </div>
          </div>
        ))}
      </nav>
      
      <div className="absolute bottom-12 type-meta text-[var(--color-vaeren-ash)]">
        Vaeren Studios &copy; 2026
      </div>
    </div>
  );
}
