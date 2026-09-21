import React from 'react';
import ProjectOption from '../ProjectOption';

export default function StepRegion({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.region;
  
  const handleSelect = (val) => {
    updateFormData('region', val);
    setTimeout(onNext, 300);
  };

  return (
    <div className="w-full max-w-3xl">
      <h2 className="type-h2 mb-12 text-center">{d.title}</h2>
      <div className="flex flex-col gap-4">
        {Object.entries(d.options).map(([key, item]) => (
          <ProjectOption 
            key={key}
            title={item.title} 
            desc={item.desc}
            isSelected={formData.region === key}
            onClick={() => handleSelect(key)}
            isRTL={dict.nav.work === 'أعمالنا'}
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
