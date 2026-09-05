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
        <div className="w-full max-w-[1400px] mx-auto pb-16 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end">
          
          <div className="md:col-span-8">
            <h2 className="reveal-item type-h1 text-[var(--color-vaeren-bone)] w-full uppercase leading-[1.1] md:-ml-2">
              Don't Make What <br className="hidden lg:block" /> Already Exists.
            </h2>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-8 md:pb-3 lg:pb-6">
              <div className="reveal-item type-body text-[var(--color-vaeren-ash)] text-lg leading-relaxed">
                Streetwear moves quickly. Vaeren exists to challenge repetition. We collaborate with brands to create clothing, campaigns, and visual identities that feel new, specific, and unmistakably theirs.
              </div>
              
              <div className="reveal-item type-body text-[var(--color-vaeren-ash)] text-lg leading-relaxed">
                The objective isn't simply to make something beautiful. It's to make something people remember.
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
