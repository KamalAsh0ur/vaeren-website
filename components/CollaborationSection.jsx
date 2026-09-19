'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

export default function CollaborationSection() {
  const sectionRef = useRef(null);

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

  const options = [
    {
      id: "01",
      title: "Design\nWith Us",
      subtitle: "You have the brand.\nWe create the product.",
      description: "We work with you to develop the clothing concept — from silhouettes and details to the design language, materials, and visual decisions that make the product feel unmistakably yours.",
      footer: "Brand → Concept → Product",
      image: "/collaboration/01.png",
      span: "col-span-1 lg:col-span-2",
      slug: "design-with-us"
    },
    {
      id: "02",
      title: "Build\nThe World",
      subtitle: "You have the product.\nWe build everything\naround it.",
      description: "We create the visual world that gives it meaning — from art direction and photography to campaign concepts, content, and creative direction.",
      footer: "Product → Identity → Campaign → World",
      image: "/collaboration/02.png",
      span: "col-span-1 lg:col-span-2",
      slug: "build-the-world"
    },
    {
      id: "03",
      title: "Create\nTogether",
      subtitle: "Start with an idea.\nBuild the whole thing.",
      description: "Nothing is fully defined yet.\nThat's where we come in. We develop the idea with you from the ground up — product, brand identity, visual language, website, campaign, and the creative world around it.",
      footer: "Idea → Product → Brand → Launch",
      image: "/collaboration/03.png",
      span: "col-span-1 lg:col-span-2",
      slug: "create-together"
    },
    {
      id: "04",
      title: "Launch\nWith Us",
      subtitle: "Your brand is ready.\nNow let's put it in front of people.",
      description: "We create the digital and marketing layer that connects your creative with the right audience — from conversion-focused landing pages and campaign creative to paid media and performance optimization.",
      footer: "Landing Page → Creative → Media → Conversion",
      image: "/collaboration/04.png",
      span: "col-span-1 lg:col-span-3",
      slug: "launch-with-us"
    },
    {
      id: "05",
      title: "Something\nElse",
      subtitle: "Have an idea that doesn't\nfit a category?",
      description: "Good.\nNot every project needs to fit inside a predefined service.\nBring us the idea. Bring us the problem.\nBring us the direction.\n\nWe'll figure out what it needs.",
      image: "/collaboration/05.png",
      span: "col-span-1 lg:col-span-3",
      slug: "something-else"
    }
  ];

  return (
    <section id="collaboration" ref={sectionRef} className="bg-black relative z-20 scroll-mt-20 py-2">
      <div className="w-full mx-auto">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
            {options.map((opt, i) => (
                <Link href={`/collaborate/${opt.slug}`} key={opt.id} className={`collab-card group relative flex flex-col overflow-hidden min-h-[600px] lg:min-h-[750px] bg-[#050505] cursor-pointer ${opt.span}`}>
                    
                    {/* Background Image & Overlay */}
                    <img 
                      src={opt.image} 
                      alt={opt.title.replace('\n', ' ')}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-80 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>

                    {/* Card Content Container */}
                    <div className="relative z-10 flex flex-col h-full p-6 md:p-10 justify-between">
                      
                      {/* Top Row */}
                      <div className="flex justify-between items-start w-full">
                        <div className="text-white text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase leading-relaxed">
                          VAEREN <br/> STUDIOS
                        </div>
                        <div className="text-[var(--color-vaeren-ash)] text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-right leading-relaxed">
                          BRANDS <br/> PRODUCTS <br/> CULTURE
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
                        <div className="text-[var(--color-vaeren-ash)] text-[9px] md:text-[10px] tracking-[0.15em] uppercase leading-relaxed">
                          A CREATIVE STUDIO <br/> FOR BOLD BRANDS
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white">
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
