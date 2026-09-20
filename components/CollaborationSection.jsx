'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

export default function CollaborationSection({ dict, lang }) {
  const sectionRef = useRef(null);
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.collab-card');
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
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

  const slugs = ['design-with-us', 'build-the-world', 'create-together', 'launch-with-us', 'something-else'];
  const images = ['/drop2/flats.webp', '/drop1/shot3.webp', '/bolor/promo.webp', '/drop2/campaign.webp', '/drop2/shot1.webp'];
  const spans = ['col-span-1 lg:col-span-2', 'col-span-1 lg:col-span-2', 'col-span-1 lg:col-span-2', 'col-span-1 lg:col-span-3', 'col-span-1 lg:col-span-3'];

  return (
    <section id="collaboration" ref={sectionRef} className="bg-black relative z-20 scroll-mt-20 py-2">
      <div className="w-full mx-auto">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
            {dict.collaboration.options.map((opt, i) => (
                <Link href={`/${lang}/collaborate/${slugs[i]}`} key={opt.id} className={`collab-card group relative flex flex-col overflow-hidden min-h-[600px] lg:min-h-[750px] bg-[#050505] cursor-pointer ${spans[i]}`}>
                    
                    {/* Background Image & Overlay */}
                    <img 
                      src={images[i]} 
                      alt={opt.title.replace('\n', ' ')}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-80 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>

                    {/* Card Content Container */}
                    <div className="relative z-10 flex flex-col h-full p-6 md:p-10 justify-between">
                      
                      {/* Top Row */}
                      <div className="flex justify-between items-start w-full">
                        <div className="text-white text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase leading-relaxed whitespace-pre-wrap">
                          {dict.collaboration.studioLabel}
                        </div>
                        <div className={`text-[var(--color-vaeren-ash)] text-[9px] md:text-[10px] tracking-[0.15em] uppercase ${isRTL ? 'text-left' : 'text-right'} leading-relaxed whitespace-pre-wrap`}>
                          {dict.collaboration.contextLabel}
                        </div>
                      </div>

                      {/* Middle Content */}
                      <div className="flex-1 flex flex-col justify-center mt-12 mb-10 max-w-lg">
                        <span className="text-[#d05c35] text-2xl md:text-3xl font-medium mb-4">{opt.id}</span>
                        <h3 className="text-white font-medium text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight mb-6 whitespace-pre-wrap">
                          {opt.title}
                        </h3>
                        <p className="text-white text-base md:text-lg font-medium leading-relaxed mb-6 whitespace-pre-wrap">
                          {opt.subtitle}
                        </p>
                        <p className="text-[var(--color-vaeren-concrete)] text-sm md:text-base leading-relaxed mb-10 whitespace-pre-wrap max-w-sm">
                          {opt.description}
                        </p>
                        
                        {opt.footer && (
                          <div className="text-white text-[10px] md:text-xs tracking-wider uppercase font-medium mt-auto">
                            {opt.footer}
                          </div>
                        )}
                      </div>

                      {/* Bottom Row */}
                      <div className="flex justify-between items-end w-full">
                        <div className="text-[var(--color-vaeren-ash)] text-[9px] md:text-[10px] tracking-[0.15em] uppercase leading-relaxed whitespace-pre-wrap">
                          {dict.collaboration.bottomLabel}
                        </div>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white ${isRTL ? 'rotate-180 group-hover:rotate-180' : ''}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>

                    </div>
                </Link>
            ))}
        </div>

      </div>
    </section>
  );
}
