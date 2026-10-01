import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepSuccess({ dict, lang }) {
  const d = dict.projectStarter.success;
  return (
    <div className="text-center w-full max-w-2xl mx-auto flex flex-col items-center">
      
      {/* Premium Success Icon / Badge */}
      <div className="mb-8 relative flex justify-center items-center">
        <div className="absolute w-24 h-24 bg-[var(--color-vaeren-bone)] rounded-full blur-3xl opacity-20"></div>
        <div className="w-16 h-16 rounded-full border border-[var(--color-vaeren-bone)]/30 bg-white/5 backdrop-blur-md flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--color-vaeren-bone)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="type-h1 mb-4">{d.title}</h1>
      <h2 className="text-lg md:text-xl font-normal tracking-wide text-[var(--color-vaeren-concrete)] mb-8">{d.subtitle}</h2>
      
      <div className="max-w-md mx-auto mb-12">
        <p className="type-body text-[var(--color-vaeren-bone)] leading-relaxed">{d.body}</p>
      </div>
      
      <MagneticElement strength={0.3}>
        <a href={`/${lang}`} className="btn-primary" data-cursor-text="GO">
          {d.backBtn}
        </a>
      </MagneticElement>
      
      <p className="mt-12 type-meta text-[var(--color-vaeren-concrete)] uppercase tracking-widest text-xs">
        {d.exploreText} <a href={`/${lang}#work`} className="text-white underline underline-offset-4 ml-2 hover:text-[var(--color-vaeren-bone)] transition-colors">Work</a>.
      </p>
    </div>
  );
}