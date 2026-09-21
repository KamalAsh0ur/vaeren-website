import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepIntro({ dict, onNext }) {
  const d = dict.projectStarter.intro;
  return (
    <div className="text-center w-full max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="type-h1 mb-8">{d.title}</h1>
      <p className="type-body text-[var(--color-vaeren-concrete)] mb-2">{d.subtitle}</p>
      <p className="type-body text-[var(--color-vaeren-concrete)] mb-12">{d.description}</p>
      
      <MagneticElement strength={0.3}>
        <button onClick={onNext} className="btn-primary" data-cursor-text="START">
          {d.cta}
        </button>
      </MagneticElement>
    </div>
  );
}