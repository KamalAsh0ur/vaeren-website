import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepDetails({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.details;
  const isRTL = dict.nav.work === 'أعمالنا';
  
  // Skip if they already filled it in the custom flow
  if (formData.projectType === 'custom' && formData.projectDescription) {
    onNext();
    return null;
  }

  return (
    <div className="w-full max-w-3xl">
      <h2 className="type-h2 mb-8 text-center">{d.title}</h2>
      
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-focus-within:opacity-100 transition duration-500 blur"></div>
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-1 transition-all duration-300 focus-within:border-white/30 focus-within:bg-black/60">
          <textarea 
            className={`w-full bg-transparent p-6 type-body focus:outline-none h-64 resize-none text-[var(--color-vaeren-bone)] placeholder:text-white/20 ${isRTL ? 'text-right' : ''}`}
            placeholder={d.placeholder}
            value={formData.projectDescription}
            onChange={(e) => updateFormData('projectDescription', e.target.value)}
          />
        </div>
        <div className={`mt-4 flex ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 border border-white/5 backdrop-blur-sm">
            <span className="text-white/40">💡</span>
            <p className="type-meta text-xs text-[var(--color-vaeren-concrete)] uppercase tracking-wider">
              {d.prompts}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center w-full px-4">
        <button onClick={onPrev} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase tracking-widest text-xs transition-colors">
          {dict.projectStarter.nav.back}
        </button>
        <MagneticElement strength={0.3}>
          <button onClick={onNext} className="btn-primary">
            {formData.projectDescription.trim() ? dict.projectStarter.nav.next : dict.projectStarter.nav.skip}
          </button>
        </MagneticElement>
      </div>
    </div>
  );
}