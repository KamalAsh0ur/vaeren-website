'use client';

import React, { useState } from 'react';
import MagneticElement from './MagneticElement';
import { projects } from '../lib/projects';

export default function SelectedWorkSection() {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = ['ALL', 'DROPS', 'COLLABORATIONS', 'DESIGN / DEVELOPMENT'];

  const filteredProjects = activeTab === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="work" className="bg-[var(--color-vaeren-void)] text-[var(--color-vaeren-bone)] py-24 md:py-48 px-4 md:px-12 relative z-20 border-t border-white/5 scroll-mt-20">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Header Block */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-3xl">
            <h2 className="type-meta text-[var(--color-vaeren-concrete)] mb-4 tracking-[0.2em] uppercase">Selected Work</h2>
            <h3 className="type-h1 leading-[1.1] mb-6">FROM IDEA TO OBJECT.</h3>
            <p className="type-body text-[var(--color-vaeren-ash)] text-lg max-w-xl leading-relaxed">
              We collaborate with streetwear brands to create distinctive garments, drops, campaigns, and product systems — from the first concept to the final piece.
            </p>
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 type-meta uppercase tracking-widest text-sm border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`transition-colors duration-300 ${activeTab === cat ? 'text-white border-b-2 border-white pb-1 -mb-[25px]' : 'text-white/40 hover:text-white/70'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="flex flex-col gap-32">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div key={project.slug} className="group relative flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                
                {/* Image Block */}
                <a href={`/work/${project.slug}`} className="w-full md:w-2/3 block overflow-hidden aspect-[4/5] md:aspect-[3/2] relative bg-white/5" data-cursor-text="VIEW">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </a>

                {/* Meta Block (Technical Layout) */}
                <div className="w-full md:w-1/3 flex flex-col pt-4 md:sticky md:top-32">
                  <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-8">
                    <h4 className="type-h2">{project.title}</h4>
                    <span className="type-meta text-white/50">{project.year}</span>
                  </div>
                  
                  <div className="flex flex-col gap-6 type-meta text-[var(--color-vaeren-ash)]">
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs">CLIENT</span>
                      <span className="uppercase text-white">{project.client}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs">TYPE</span>
                      <span className="uppercase text-white">{project.type}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs">SCOPE OF WORK</span>
                      <ul className="flex flex-col gap-1 mt-1">
                        {project.work.map((w, i) => (
                          <li key={i} className="text-white">- {w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12">
                    <MagneticElement strength={0.2}>
                      <a href={`/work/${project.slug}`} className="inline-block uppercase type-meta tracking-widest text-white border-b border-white/30 hover:border-white transition-colors pb-1" data-cursor-text="EXPLORE">
                        View Project &rarr;
                      </a>
                    </MagneticElement>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="py-24 w-full text-center border border-white/10 bg-white/5">
              <span className="type-meta uppercase tracking-widest text-[var(--color-vaeren-ash)]">0 PROJECTS — IN DEVELOPMENT</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
