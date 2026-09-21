import React from 'react';
import ProjectOption from '../ProjectOption';

export default function StepStage({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.stage;
  
  const handleSelect = (val) => {
    updateFormData('projectStage', val);
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
            isSelected={formData.projectStage === key}
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