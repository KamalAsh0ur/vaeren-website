'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ProjectLayout({ project }) {
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
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      
      const imageContainers = section.querySelectorAll('.image-reveal-container');
      imageContainers.forEach((container) => {
        const inner = container.querySelector('.image-reveal-inner');
        
        gsap.fromTo(
          container,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
            }
          }
        );
        
        if (inner) {
          gsap.fromTo(
            inner,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.5,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
              }
            }
          );
        }
      });

      gsap.to(section.querySelectorAll('.parallax-slow'), {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
      gsap.to(section.querySelectorAll('.parallax-medium'), {
        y: -180,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
      gsap.to(section.querySelectorAll('.parallax-fast'), {
        y: -250,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-black flex flex-col justify-center p-4 md:p-12 relative z-20 overflow-hidden pt-32 pb-16">
      <div className="w-full max-w-[1400px] mx-auto">
        
        <div className="flex flex-col items-center mb-16 md:mb-32">
          <p className="reveal-item type-meta text-[var(--color-vaeren-concrete)] mb-4 tracking-[0.2em] uppercase">{project.category} / {project.client}</p>
          <h1 className="reveal-item type-h1 text-[var(--color-vaeren-bone)] text-center max-w-4xl">{project.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
          
          <div className="parallax-slow md:col-span-5 md:col-start-1 md:mt-32 z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
             <div className="image-reveal-container overflow-hidden w-full">
                 <img src={project.sections.concept.image} alt={project.sections.concept.title} className="image-reveal-inner w-full h-auto object-contain opacity-90" />
             </div>
             <div className="reveal-item mt-6">
                 <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">{project.sections.concept.title}</div>
                 <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm">
                   {project.sections.concept.description}
                 </p>
             </div>
          </div>

          {project.sections.reel && (
            <div className="md:col-span-4 md:col-start-4 md:mt-64 relative w-full group cursor-pointer z-10" data-cursor-text="PLAY" style={{ transform: 'translateZ(0)' }}>
               <div className="image-reveal-container overflow-hidden w-full aspect-[4/5]">
                   <video 
                     src={project.sections.reel} 
                     autoPlay 
                     muted 
                     loop 
                     playsInline
                     className="image-reveal-inner w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 border border-white/10 pointer-events-none z-10"></div>
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ willChange: 'opacity' }}></div>
               </div>
            </div>
          )}

          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-16 md:gap-32 md:-mt-16 z-0">
             {project.sections.design && (
               <div className="parallax-fast" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                   <div className="image-reveal-container overflow-hidden w-[85%] mx-auto">
                       <img src={project.sections.design.image} alt={project.sections.design.title} className="image-reveal-inner w-full h-auto object-contain opacity-90" />
                   </div>
                   <div className="reveal-item mt-6 text-center">
                       <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">{project.sections.design.title}</div>
                       <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm mx-auto">
                         {project.sections.design.description}
                       </p>
                   </div>
               </div>
             )}
             {project.sections.world && (
               <div className="parallax-medium" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                   <div className="image-reveal-container overflow-hidden w-full">
                       <img src={project.sections.world.image} alt={project.sections.world.title} className="image-reveal-inner w-full h-auto object-contain opacity-90" />
                   </div>
                   <div className="reveal-item mt-6 text-right">
                       <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">{project.sections.world.title}</div>
                       <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm ml-auto">
                         {project.sections.world.description}
                       </p>
                   </div>
               </div>
             )}
          </div>

        </div>

        {/* Optional Extra Image */}
        {project.sections.extra && (
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start mt-16 md:mt-32">
             <div className="parallax-slow md:col-span-6 md:col-start-2 z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                 <div className="image-reveal-container overflow-hidden w-full">
                     <img src={project.sections.extra.image} alt={project.sections.extra.title} className="image-reveal-inner w-full h-auto object-contain opacity-90" />
                 </div>
                 <div className="reveal-item mt-6">
                     <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">{project.sections.extra.title}</div>
                     <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm">
                       {project.sections.extra.description}
                     </p>
                 </div>
             </div>
           </div>
        )}

        {/* Tech Pack Download Button */}
        {project.techPack && (
          <div className="mt-32 w-full flex justify-center border-t border-white/10 pt-16">
            <a 
              href={project.techPack} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              <span>Download Tech Pack</span>
              <span className="arrow ml-4">→</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
