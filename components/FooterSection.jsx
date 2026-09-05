'use client';

import React from 'react';
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

export default function FooterSection() {
  return (
    <footer className="bg-black text-[var(--color-vaeren-bone)] flex flex-col justify-center p-4 md:p-12 relative z-20 overflow-hidden py-32 md:py-48 border-t border-white/10">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
        
        <h2 className="type-h1 uppercase leading-[1.1] mb-12 max-w-4xl tracking-tight">
          Got a brand? <br />
          Got an idea? <br />
          <span className="text-[var(--color-vaeren-concrete)]">Let's make something strange.</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <MagneticElement strength={0.2}>
                <a href={MAILTO_HREF} className="btn-primary" data-cursor-text="START">
                    Start A Project <span className="arrow">&rarr;</span>
                </a>
            </MagneticElement>
            <MagneticElement strength={0.2}>
                <a 
                  href="https://www.instagram.com/vaeren.studios/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary" 
                  data-cursor-text="FOLLOW"
                >
                    Follow on Instagram <span className="arrow">&rarr;</span>
                </a>
            </MagneticElement>
        </div>

        <div className="mt-16 flex flex-col md:flex-row gap-6 md:gap-12 items-center type-meta text-[var(--color-vaeren-ash)]">
            <span>{EMAIL}</span>
            <span className="hidden md:inline">·</span>
            <a 
              href="https://www.instagram.com/vaeren.studios/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--color-vaeren-bone)] transition-colors underline underline-offset-4"
            >
                @vaeren.studios
            </a>
            <span className="hidden md:inline">·</span>
            <span>Cairo, Egypt</span>
        </div>

      </div>
    </footer>
  );
}
