import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepSuccess({ dict, lang }) {
  const d = dict.projectStarter.success;
  return (
    <div className="text-center w-full max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="type-h1 mb-4">{d.title}</h1>
      <h2 className="type-h2 mb-8 text-[var(--color-vaeren-concrete)]">{d.subtitle}</h2>
      <p className="type-body text-[var(--color-vaeren-concrete)] mb-12">{d.body}</p>
      
      <MagneticElement strength={0.3}>
        <a href={`/${lang}`} className="btn-primary" data-cursor-text="GO">
          {d.backBtn}
        </a>
      </MagneticElement>
      
      <p className="mt-12 type-meta text-[var(--color-vaeren-concrete)]">
        {d.exploreText} <a href={`/${lang}#work`} className="text-white underline underline-offset-4">Work</a>.
      </p>
    </div>
  );
}