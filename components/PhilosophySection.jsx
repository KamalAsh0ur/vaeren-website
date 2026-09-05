'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function PhilosophySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.reveal-item');
    
    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 overflow-hidden">
      {/* Gradient veil: dissolves from transparent (showing hero video) to solid black */}
      <div className="h-[50vh] bg-gradient-to-b from-transparent to-black" />
      
      <div className="bg-black p-4 md:p-12">
        <div className="w-full max-w-[1400px] mx-auto text-center md:text-left pb-16 md:pb-32">
          <h2 className="reveal-item type-h1 text-[var(--color-vaeren-bone)] mb-12 md:mb-20 w-full uppercase leading-[1.1]">
            Don't Make What <br className="hidden md:block" /> Already Exists.
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 md:justify-between">
              <div className="reveal-item type-body text-[var(--color-vaeren-ash)] w-full md:w-[38%] text-lg leading-relaxed">
                Streetwear moves quickly. Vaeren exists to challenge repetition. We collaborate with brands to create clothing, campaigns, and visual identities that feel new, specific, and unmistakably theirs.
              </div>
              
              <div className="reveal-item type-body text-[var(--color-vaeren-ash)] w-full md:w-[38%] text-lg leading-relaxed md:text-right">
                The objective isn't simply to make something beautiful. It's to make something people remember.
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
