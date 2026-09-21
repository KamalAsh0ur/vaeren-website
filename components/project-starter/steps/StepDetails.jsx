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
      
      <div className="relative">
        <textarea 
          className={`w-full bg-transparent border border-[var(--color-vaeren-iron)] p-6 type-body focus:outline-none focus:border-white h-64 resize-none ${isRTL ? 'text-right' : ''}`}
          placeholder={d.placeholder}
          value={formData.projectDescription}
          onChange={(e) => updateFormData('projectDescription', e.target.value)}
        />
        <p className={`mt-4 type-meta text-[var(--color-vaeren-concrete)] ${isRTL ? 'text-right' : ''}`}>
          {d.prompts}
        </p>
      </div>

      <div className="mt-12 flex justify-between items-center w-full px-4">
        <button onClick={onPrev} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase">
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