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
    <section id="collaboration" ref={sectionRef} className="bg-[var(--color-vaeren-bone)] text-black flex flex-col justify-center p-4 md:p-12 relative z-20 overflow-hidden py-32 scroll-mt-20">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-start">
            
            {/* Header */}
            <div className="w-full md:w-1/3">
                <h2 className="reveal-item type-h1 leading-[1.1] mb-6">Collaboration <br/> Model</h2>
                <p className="reveal-item type-body text-[var(--color-vaeren-ash)] text-lg">
                    We do not operate as a rigid agency. We are creative partners. Here is how we integrate with brands.
                </p>
            </div>

            {/* Grid */}
            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {options.map((opt) => (
                    <div key={opt.id} className="reveal-item flex flex-col border-t border-black/20 pt-6">
                        <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">Option {opt.id}</div>
                        <h3 className="type-h3 mb-4">{opt.title}</h3>
                        <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80">{opt.description}</p>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
}
