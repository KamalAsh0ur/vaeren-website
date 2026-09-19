'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import ContactForm from '../ContactForm';

export function ServiceHero({ hero, ctaText = "Start a project" }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-start mt-auto">
        <h1 className="type-h1 text-6xl md:text-8xl lg:text-[7rem] leading-[1.0] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <span className="block text-[var(--color-vaeren-concrete)]">{hero.subtitle}</span>
          <span className="block text-white">{hero.title}</span>
        </h1>
        <p className="type-body text-2xl md:text-3xl text-white max-w-2xl leading-snug animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 mb-12">
          {hero.sentence}
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <a href="#contact-flow" className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white transition-colors underline underline-offset-8 tracking-widest uppercase text-sm md:text-base">
                {ctaText} &rarr;
            </a>
        </div>
      </div>
    </section>
  );
}

export function WorkShowcase({ children }) {
  return (
    <section className="w-full mx-auto pb-24 md:pb-48 bg-black">
      {children}
    </section>
  );
}

export function ImageBlock({ src, alt, caption, full = false, aspect = "aspect-[4/5]" }) {
    return (
        <div className={`relative ${full ? 'w-full' : 'w-full max-w-[1400px] mx-auto px-4 md:px-12'} mb-8 md:mb-16`}>
            <div className={`w-full overflow-hidden bg-[#050505] relative ${aspect}`}>
                <img src={src} alt={alt} className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" />
                {caption && (
                    <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 type-meta text-[10px] md:text-xs uppercase bg-black/50 backdrop-blur-md px-3 py-1.5 text-white/80 border border-white/10 tracking-widest">
                        {caption}
                    </div>
                )}
            </div>
        </div>
    );
}

export function PositioningStatement({ statement, description }) {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-48 border-t border-white/10">
      <h2 className="type-h2 text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-12 max-w-4xl tracking-tight text-white">
        {statement}
      </h2>
      <p className="type-body text-xl md:text-2xl leading-relaxed text-[var(--color-vaeren-ash)] max-w-3xl">
        {description}
      </p>
    </section>
  );
}

export function EditorialCapabilities({ capabilities }) {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/10">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3 shrink-0">
          <h2 className="type-meta text-[#d05c35] tracking-widest uppercase">WE HANDLE</h2>
        </div>
        <div className="md:w-2/3">
          <ul className="flex flex-wrap gap-x-8 gap-y-4 type-meta text-xs md:text-sm tracking-widest text-[var(--color-vaeren-concrete)] uppercase">
            {capabilities.map((cap, idx) => (
              <li key={idx} className="flex items-center">
                {cap}
                {idx !== capabilities.length - 1 && <span className="text-white/20 ml-8 hidden md:inline">/</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MinimalProcess({ steps }) {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/10">
       <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3 shrink-0">
          <h2 className="type-meta text-[#d05c35] tracking-widest uppercase">PROCESS</h2>
        </div>
        <div className="md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col">
                        <div className="type-meta text-white tracking-widest uppercase text-xs mb-3 flex gap-4">
                            <span className="text-[var(--color-vaeren-ash)]">{step.num}</span>
                            <span>{step.title}</span>
                        </div>
                        <p className="type-body text-sm md:text-base text-[var(--color-vaeren-ash)] leading-relaxed">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

export function DeepCaseStudy({ study }) {
  if (!study) return null;
  return (
    <section className="w-full mx-auto bg-[#050505] py-24 md:py-48 mt-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <h2 className="type-meta text-[#d05c35] mb-8 tracking-widest uppercase">CASE STUDY</h2>
            <h3 className="type-h1 text-5xl md:text-7xl mb-16 max-w-4xl">{study.title}</h3>
            
            <div className="mb-24 flex flex-col md:flex-row justify-between border-t border-white/10 pt-8 gap-8">
                <div>
                    <span className="type-meta text-white/40 block mb-4 uppercase tracking-widest text-[10px]">PROJECT</span>
                    <span className="type-meta text-white uppercase tracking-widest text-sm">{study.project}</span>
                </div>
                <div className="md:text-right max-w-xl">
                    <span className="type-meta text-white/40 block mb-4 uppercase tracking-widest text-[10px]">SCOPE</span>
                    <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-2 type-meta uppercase text-white/80 text-xs md:text-sm">
                        {study.scope.map((s, i) => (
                            <React.Fragment key={i}>
                            <span>{s}</span>
                            {i < study.scope.length - 1 && <span className="text-white/20">/</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {study.images.map((img, i) => (
                    <div key={i} className={`relative overflow-hidden bg-[#0a0a0a] ${img.full ? 'col-span-1 md:col-span-2 aspect-[21/9]' : 'aspect-square md:aspect-[4/5]'}`}>
                        <img src={img.src} alt="Case study visual" className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                        {img.caption && (
                             <div className="absolute bottom-4 left-4 type-meta text-[10px] uppercase bg-black/50 backdrop-blur-md px-3 py-1.5 text-white/80 border border-white/10 tracking-widest">
                                 {img.caption}
                             </div>
                        )}
                    </div>
                ))}
            </div>
            
            {study.link && (
                <div className="mt-16 text-center">
                    <Link href={study.link} className="btn-secondary uppercase tracking-widest" data-cursor-text="VIEW">
                        Explore Full Project &rarr;
                    </Link>
                </div>
            )}
        </div>
    </section>
  );
}

export function ConversationalCTA({ prompt, ctaText = "Start a project", serviceTitle = "General Inquiry" }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <section id="contact-flow" className="w-full bg-[#d05c35] text-black py-32 md:py-48 px-6 md:px-12 flex flex-col items-center text-center relative z-20">
            <h2 className="type-h1 text-5xl md:text-7xl lg:text-[6rem] leading-[1.0] tracking-tight mb-16 max-w-5xl">
                {prompt}
            </h2>
            
            {showForm ? (
               <div className="w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <Suspense fallback={<div className="type-meta uppercase tracking-widest text-xs">Loading form...</div>}>
                   <ContactForm serviceName={serviceTitle} />
                 </Suspense>
              </div>
            ) : (
              <button 
                onClick={() => setShowForm(true)} 
                className="group relative inline-flex items-center justify-center bg-black text-white px-10 py-5 rounded-sm overflow-hidden border border-black transition-all hover:bg-transparent hover:text-black"
              >
                  <span className="type-meta tracking-widest uppercase text-xs md:text-sm relative z-10 font-medium">
                      {ctaText} &rarr;
                  </span>
              </button>
            )}

            <div className="mt-24 flex flex-col md:flex-row gap-6 md:gap-12 items-center type-meta tracking-widest text-black/60 text-xs">
                <a href="https://www.instagram.com/vaeren.studios/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline underline-offset-4">
                    @vaeren.studios
                </a>
                <span className="hidden md:inline">·</span>
                <span>Cairo, Egypt</span>
            </div>
        </section>
    );
}
