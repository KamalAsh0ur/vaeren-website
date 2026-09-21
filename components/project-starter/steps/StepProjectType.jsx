import React from 'react';
import ProjectOption from '../ProjectOption';

export default function StepProjectType({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.projectType;
  
  const handleSelect = (val) => {
    updateFormData('projectType', val);
    updateFormData('needs', []); // Reset needs when type changes
    setTimeout(onNext, 300); // slight delay for visual feedback
  };

  return (
    <div className="w-full max-w-3xl">
      <h2 className="type-h2 mb-12 text-center">{d.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(d.options).map(([key, item]) => (
          <div key={key} className={key === 'custom' ? 'md:col-span-2' : ''}>
            <ProjectOption 
              title={item.title} 
              desc={item.desc}
              isSelected={formData.projectType === key}
              onClick={() => handleSelect(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}