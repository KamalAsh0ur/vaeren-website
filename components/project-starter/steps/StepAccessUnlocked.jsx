import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepAccessUnlocked({ dict, formData, onNext }) {
  const d = dict.projectStarter.accessUnlocked[formData.region || 'international'];
  const isRTL = dict.nav.work === 'أعمالنا';

  return (
    <div className="text-center w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full border-t border-b border-[var(--color-vaeren-iron)] py-12 px-6 flex flex-col items-center">
        <h2 className="type-meta text-xs tracking-[0.2em] uppercase text-[var(--color-vaeren-concrete)] mb-4">
          {dict.projectStarter.region.options[formData.region || 'international'].title}
        </h2>
        <h1 className="type-h2 mb-6 uppercase tracking-wider text-white drop-shadow-lg">
          {d.title}
        </h1>
        <p className="type-body text-[var(--color-vaeren-concrete)] mb-12 max-w-md">
          {d.body}
        </p>
        
        <ul className="space-y-4 type-body text-left w-full max-w-sm mx-auto mb-6">
          {d.benefits.map((benefit, idx) => (
            <li key={idx} className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <span className="text-white">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <MagneticElement strength={0.3}>
          <button onClick={onNext} className="btn-primary" data-cursor-text="CONTINUE">
            {dict.projectStarter.accessUnlocked.continueBtn}
          </button>
        </MagneticElement>
      </div>
    </div>
  );
}
