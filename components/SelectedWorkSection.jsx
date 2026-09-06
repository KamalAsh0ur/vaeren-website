'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { projects } from '../lib/projects';

const ProjectBlock = ({ project }) => (
  <div className="mb-32 md:mb-48 group">
    <a href={`/work/${project.slug}`} className="block w-full overflow-hidden mb-8 relative image-reveal-container bg-white/5" data-cursor-text="VIEW">
      <img 
        src={project.thumbnail} 
        alt={project.title} 
        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 ease-out image-reveal-inner" 
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
    </a>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/20 pb-8 reveal-item">
      <div className="max-w-4xl">
        <h4 className="type-h2 md:text-6xl uppercase mb-2 tracking-tight leading-none">
          {project.client} <span className="text-white/40 font-light mx-2">&times;</span> {project.title}
        </h4>
        <div className="type-meta text-white/50 tracking-widest uppercase mt-4">
          {project.category} / {project.year}
        </div>
      </div>
      <div className="text-left md:text-right w-full md:w-1/3 mt-4 md:mt-0">
         <span className="type-meta text-white/40 block mb-2">SCOPE</span>
         <div className="flex flex-wrap md:justify-end gap-x-3 gap-y-1 type-meta uppercase text-white/80">
           {project.work.map((w, i) => (
             <React.Fragment key={i}>
               <span>{w}</span>
               {i < project.work.length - 1 && <span className="text-white/20">/</span>}
             </React.Fragment>
           ))}
         </div>
      </div>
    </div>
  </div>
);

export default function SelectedWorkSection() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Parallax and reveals for images
    const containers = document.querySelectorAll('.image-reveal-container');
    containers.forEach((container) => {
      const inner = container.querySelector('.image-reveal-inner');
      
      gsap.fromTo(
        container,
        { clipPath: 'inset(10% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        }
      );

      if (inner) {
        gsap.to(inner, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

  }, []);

  const dropProjects = projects.filter(p => p.category === 'DROPS');
  const collabProjects = projects.filter(p => p.category === 'COLLABORATIONS');
  const designProjects = projects.filter(p => p.category === 'DESIGN / DEVELOPMENT');

  const renderCategory = (title, categoryProjects) => {
    if (categoryProjects.length === 0) return null;
    return (
      <div className="mb-32">
        <h3 className="type-meta text-[var(--color-vaeren-concrete)] tracking-[0.3em] uppercase border-b border-white/10 pb-4 mb-16">
          {title}
        </h3>
        {categoryProjects.map(p => (
          <ProjectBlock key={p.slug} project={p} />
        ))}
      </div>
    );
  };

  return (
    <section id="work" className="bg-[var(--color-vaeren-void)] text-[var(--color-vaeren-bone)] py-24 md:py-48 px-4 md:px-12 relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Header Block */}
        <div className="mb-32 md:mb-48">
          <h2 className="type-meta text-[var(--color-vaeren-concrete)] mb-4 tracking-[0.2em] uppercase">Selected Work</h2>
          <h3 className="type-h1 leading-[1.1] mb-6 max-w-4xl">DESIGNED TO EXIST OUTSIDE THE ORDINARY.</h3>
          <p className="type-body text-[var(--color-vaeren-ash)] text-lg max-w-xl leading-relaxed">
            A selection of drops, collaborations, product systems, and creative work developed with brands and independent labels.
          </p>
        </div>

        {/* Sequential Editorial Categories */}
        {renderCategory('DROPS', dropProjects)}
        {renderCategory('COLLABORATIONS', collabProjects)}
        
        {/* DESIGN / DEVELOPMENT Technical Gallery */}
        <div className="mb-32">
          <h3 className="type-meta text-[var(--color-vaeren-concrete)] tracking-[0.3em] uppercase border-b border-white/10 pb-4 mb-16">
            DESIGN / DEVELOPMENT
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mb-8">
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[3/4] bg-white/5 overflow-hidden group">
                <img src="/drop1/pattern-spec.webp" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Pattern Spec" />
                <div className="absolute bottom-4 left-4 type-meta text-xs uppercase bg-black/50 backdrop-blur-md px-3 py-1 text-white/80 border border-white/10">PATTERN GRADING</div>
              </div>
            </div>
            
            <div className="md:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-video bg-white/5 overflow-hidden group">
                <img src="/drop2/flats.webp" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Technical Flats" />
                <div className="absolute bottom-4 left-4 type-meta text-xs uppercase bg-black/50 backdrop-blur-md px-3 py-1 text-white/80 border border-white/10">TECHNICAL FLATS</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="relative bg-white/5 overflow-hidden group aspect-square md:aspect-auto">
                  <img src="/drop1/pom-spec.webp" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="POM Spec" />
                  <div className="absolute bottom-4 left-4 type-meta text-xs uppercase bg-black/50 backdrop-blur-md px-3 py-1 text-white/80 border border-white/10">POM SPEC</div>
                </div>
                <div className="relative bg-white/5 overflow-hidden group aspect-square md:aspect-auto">
                  <img src="/drop1/tech-flats.webp" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Tech Flats" />
                  <div className="absolute bottom-4 left-4 type-meta text-xs uppercase bg-black/50 backdrop-blur-md px-3 py-1 text-white/80 border border-white/10">CONSTRUCTION</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border border-white/10 bg-white/5 rounded-sm overflow-hidden block relative group">
            {/* Native Iframe for Desktop */}
            <iframe 
              src="/drop2/techpack.pdf#toolbar=0" 
              className="w-full h-[80vh] hidden md:block" 
              title="Tech Pack PDF"
            />
            {/* Rasterized Image Preview for Mobile */}
            <img 
              src="/drop2/techpack-preview.webp" 
              alt="Tech Pack Preview" 
              className="w-full h-auto object-cover opacity-90 block md:hidden" 
            />
            {/* Overlay link for Mobile to click through directly to PDF */}
            <a href="/drop2/techpack.pdf" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 md:hidden">
              <span className="sr-only">View PDF</span>
            </a>
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-6 mt-6">
            <span className="type-meta text-white/40 text-[10px] md:text-xs">PREVIEW (TAP IMAGE ON MOBILE TO OPEN FULL PDF)</span>
            <a href="/drop2/techpack.pdf" target="_blank" rel="noopener noreferrer" className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white transition-colors underline underline-offset-4 uppercase tracking-widest text-xs ml-auto" data-cursor-text="VIEW">
              VIEW COMPLETE TECH PACK &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
