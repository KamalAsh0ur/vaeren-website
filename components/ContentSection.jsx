'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ContentSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.reveal-item');
    // The section now acts as a solid black curtain sliding over the hero via negative margin, 
    // so we no longer scale or fade the entire section wrapper.

    // Stagger slide-up and fade-in for internal text content
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

    // Transitive Image Reveal: Clip-path unmasking + internal zoom
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

    // Parallax Effects on Desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
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
        
        <div id="work" className="flex flex-col items-center mb-16 md:mb-32 scroll-mt-32">
          <p className="reveal-item type-meta text-[var(--color-vaeren-concrete)] mb-4 tracking-[0.2em] uppercase">Selected Case Study</p>
          <h1 className="reveal-item type-h1 text-[var(--color-vaeren-bone)] text-center">Structure <br/> & Comfort</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
          
          {/* Parallax Image 1 (Left Column) */}
          <div className="parallax-slow md:col-span-5 md:col-start-1 md:mt-32 z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
             <div className="image-reveal-container overflow-hidden w-full aspect-[3/4]">
                 <img src="/drop1/shot1.jpg" alt="Vaeren Studios Case Study 01 - Idea" className="image-reveal-inner w-full h-full object-cover opacity-90" />
             </div>
             <div className="reveal-item mt-6">
                 <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">01 THE IDEA</div>
                 <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm">
                   We started with a simple premise: how do we translate the permanence of Brutalist architecture into an everyday garment without sacrificing comfort?
                 </p>
             </div>
          </div>

          {/* Center Anchor: Reel (Overlaps Left) */}
          <div className="md:col-span-4 md:col-start-4 md:mt-64 relative w-full group cursor-pointer z-10" data-cursor-text="PLAY" style={{ transform: 'translateZ(0)' }}>
             <div className="image-reveal-container overflow-hidden w-full aspect-[4/5]">
                 <video 
                   src="/drop1/reel.mp4" 
                   autoPlay 
                   muted 
                   loop 
                   playsInline
                   className="image-reveal-inner w-full h-full object-cover"
                   title="Vaeren Studios Winter 2027 Campaign Reel"
                 />
                 <div className="absolute inset-0 border border-white/10 pointer-events-none z-10"></div>
                 {/* Lightweight hover overlay */}
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ willChange: 'opacity' }}></div>
             </div>
          </div>

          {/* Parallax Images 2 & 3 (Right Column) (Overlaps Reel) */}
          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-16 md:gap-32 md:-mt-16 z-0">
             <div className="parallax-fast" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                 <div className="image-reveal-container overflow-hidden w-[85%] mx-auto">
                     <img src="/drop1/shot2.jpg" alt="Vaeren Studios Case Study 01 - Design" className="image-reveal-inner w-full h-auto object-cover opacity-90" />
                 </div>
                 <div className="reveal-item mt-6 text-center">
                     <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">02 THE DESIGN</div>
                     <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm mx-auto">
                       Heavyweight custom-milled cotton, engineered seams, and a silhouette designed to hold its shape completely independently of the wearer.
                     </p>
                 </div>
             </div>
             <div className="parallax-medium" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                 <div className="image-reveal-container overflow-hidden w-full aspect-[3/4]">
                     <img src="/drop1/shot3.jpg" alt="Vaeren Studios Case Study 01 - World" className="image-reveal-inner w-full h-full object-cover opacity-90" />
                 </div>
                 <div className="reveal-item mt-6 text-right">
                     <div className="type-meta text-[var(--color-vaeren-ash)] mb-2">03 THE WORLD</div>
                     <p className="type-body text-[var(--color-vaeren-concrete)] opacity-80 mb-4 max-w-sm ml-auto">
                       The visual identity and campaign were shot in stark, natural environments to contrast the rigid geometry of the clothing.
                     </p>
                     <a href="#collaboration" className="inline-block mt-2 type-meta uppercase tracking-widest text-white border-b border-white/30 hover:border-white transition-colors pb-1">
                       View Campaign
                     </a>
                 </div>
             </div>
          </div>

        </div>

        <div className="reveal-item mt-32 md:mt-48 flex justify-center pointer-events-auto">
            <a href="#" className="btn-primary" data-cursor-text="WORK">
              Explore All Projects <span className="arrow">&rarr;</span>
            </a>
        </div>
      </div>
    </section>
  );
}
