'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function CollaborationSection() {
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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
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

  const options = [
    {
      id: "01",
      title: "Design With Us",
      description: "You have the brand. We create the clothing concept and design together."
    },
    {
      id: "02",
      title: "Build The World",
      description: "You already have the product. We create the visual identity, art direction, and campaign around it."
    },
    {
      id: "03",
      title: "Create Together",
      description: "We start with an idea and develop the entire concept together — product, branding, campaign, and visual world."
    },
    {
      id: "04",
      title: "Something Else",
      description: "Have an idea that doesn't fit a category? Let's build it."
    }
  ];

  return (
    <section id="collaboration" ref={sectionRef} className="bg-[var(--color-vaeren-bone)] text-black p-4 md:p-12 relative z-20 overflow-hidden py-24 md:py-32 scroll-mt-20">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Header — full width, stacked above the grid */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="reveal-item type-h1 leading-[1.1]">Collaboration <br/> Model</h2>
            <p className="reveal-item type-body text-[var(--color-vaeren-ash)] text-lg md:max-w-md md:text-right">
                We do not operate as a rigid agency. We are creative partners. Here is how we integrate with brands.
            </p>
        </div>

        {/* Options Grid — 2x2 staggered on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-0 relative">
            {options.map((opt, i) => (
                <div key={opt.id} className={`reveal-item flex flex-col border-t border-black/20 pt-6 ${i % 2 !== 0 ? 'md:mt-32' : 'md:mb-32'}`}>
                    <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">Option {opt.id}</div>
                    <h3 className="type-h3 mb-4">{opt.title}</h3>
                    <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 max-w-sm">{opt.description}</p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}
