import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepError({ dict, onRetry }) {
  const d = dict.projectStarter.error;
  return (
    <div className="text-center w-full max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="type-h1 mb-4">{d.title}</h1>
      <h2 className="type-h2 mb-12 text-[var(--color-vaeren-concrete)]">{d.subtitle}</h2>
      
      <MagneticElement strength={0.3}>
        <button onClick={onRetry} className="btn-primary mb-6" data-cursor-text="RETRY">
          {d.tryAgainBtn}
        </button>
      </MagneticElement>
      
      <button onClick={onRetry} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase">
        {d.backBtn}
      </button>
    </div>
  );
}