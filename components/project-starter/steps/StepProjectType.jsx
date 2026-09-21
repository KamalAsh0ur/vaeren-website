import React from 'react';
import ProjectOption from '../ProjectOption';

export default function StepProjectType({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.projectType;
  
  const handleSelect = (val) => {
    updateFormData('projectType', val);
    updateFormData('needs', []); // Reset needs when type changes
    setTimeout(onNext, 300); // slight delay for visual feedback
  };

  const imageMap = {
    'product': { src: '/images/project-starter/vs-ps-04-garment-prototype.png', pos: 'center' },
    'brand': { src: '/images/project-starter/vs-ps-08-brand-wall.png', pos: 'center' },
    'campaign': { src: '/images/project-starter/vs-ps-07-campaign-set.png', pos: 'center' },
    'launch': { src: '/images/project-starter/vs-ps-09-digital-launch.png', pos: 'center' },
    'custom': { src: '/images/project-starter/vs-ps-11-empty-project-table.png', pos: 'center' }
  };

  return (
    <div className="w-full max-w-4xl px-4 md:px-0 mx-auto z-10 relative">
      <h2 className="type-h2 mb-12 text-center text-white drop-shadow-md">{d.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(d.options).map(([key, item]) => (
          <div key={key} className={key === 'custom' ? 'md:col-span-2' : ''}>
            <ProjectOption 
              title={item.title} 
              desc={item.desc}
              isSelected={formData.projectType === key}
              onClick={() => handleSelect(key)}
              isRTL={dict.nav.work === 'أعمالنا'}
              imageSrc={imageMap[key]?.src}
              imagePosition={imageMap[key]?.pos}
            />
          </div>
        ))}
      </div>
    </div>
  );
}