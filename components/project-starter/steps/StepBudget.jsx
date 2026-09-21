import React from 'react';
import ProjectOption from '../ProjectOption';

export default function StepBudget({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.budget;
  
  const handleSelect = (val) => {
    updateFormData('budget', val);
    setTimeout(onNext, 300);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="type-h2 mb-4">{d.title}</h2>
        <p className="type-body text-[var(--color-vaeren-concrete)]">{d.subtitle}</p>
        <p className="type-body text-[var(--color-vaeren-concrete)]">{d.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(d.options).map(([key, title]) => (
          <ProjectOption 
            key={key}
            title={title} 
            isSelected={formData.budget === key}
            onClick={() => handleSelect(key)}
          />
        ))}
      </div>
      <div className="mt-12 text-center">
        <button onClick={onPrev} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase">
          {dict.projectStarter.nav.back}
        </button>
      </div>
    </div>
  );
}