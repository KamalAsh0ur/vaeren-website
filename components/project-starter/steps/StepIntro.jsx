import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepIntro({ dict, onNext }) {
  const d = dict.projectStarter.intro;
  return (
    <div className="text-center w-full max-w-3xl mx-auto flex flex-col items-center">
      
      {/* 2-Minute Brief Badge */}
      {d.badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-vaeren-bone)] animate-pulse"></span>
          <span className="type-meta text-[10px] md:text-xs tracking-widest uppercase text-[var(--color-vaeren-bone)]">{d.badge}</span>
        </div>
      )}

      <h1 className="type-h1 mb-6 max-w-2xl">{d.title}</h1>
      
      <div className="max-w-xl mx-auto mb-10 space-y-4">
        <p className="type-body text-[var(--color-vaeren-bone)] text-lg md:text-xl leading-relaxed">{d.subtitle}</p>
        <p className="type-meta text-[var(--color-vaeren-concrete)] leading-relaxed">{d.description}</p>
      </div>
      
      {/* Trust Benefits */}
      {d.benefits && d.benefits.length > 0 && (
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-8 mb-12 px-6 py-4 border border-white/5 bg-black/40 backdrop-blur-md rounded-lg">
          {d.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 type-meta text-[var(--color-vaeren-concrete)] uppercase tracking-wider text-xs">
              <span className="text-white/40">✓</span>
              {benefit}
            </div>
          ))}
        </div>
      )}
      
      <MagneticElement strength={0.3}>
        <button onClick={onNext} className="btn-primary" data-cursor-text="START">
          {d.cta}
        </button>
      </MagneticElement>
    </div>
  );
}