import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepNeeds({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.needs;
  
  // Mapping options based on project type
  const typeToNeeds = {
    product: ['garment_design', 'pattern_development', 'technical_design', 'tech_pack', '3d_development', 'materials', 'production_support', 'something_else'],
    brand: ['brand_strategy', 'visual_identity', 'product_development', 'website', 'packaging', 'creative_direction', 'campaign', 'something_else'],
    campaign: ['creative_direction', 'art_direction', 'photography', 'styling', 'video', 'campaign_concept', 'social_content', 'something_else'],
    launch: ['launch_strategy', 'campaign_creative', 'landing_page', 'paid_media', 'meta_ads', 'content', 'conversion_optimization', 'something_else'],
  };

  const needsList = formData.projectType !== 'custom' ? (typeToNeeds[formData.projectType] || typeToNeeds.product) : [];

  const toggleNeed = (needKey) => {
    const current = [...formData.needs];
    const dictValue = d.options[needKey];
    if (current.includes(dictValue)) {
      updateFormData('needs', current.filter(n => n !== dictValue));
    } else {
      updateFormData('needs', [...current, dictValue]);
    }
  };

  const isRTL = dict.nav.work === 'أعمالنا';

  if (formData.projectType === 'custom') {
    return (
      <div className="w-full max-w-3xl text-center">
         <h2 className="type-h2 mb-12">{d.customTitle}</h2>
         <textarea 
            className={`w-full bg-transparent border border-[var(--color-vaeren-iron)] p-6 type-body focus:outline-none focus:border-white h-64 resize-none ${isRTL ? 'text-right' : ''}`}
            placeholder={dict.projectStarter.details.placeholder}
            value={formData.projectDescription}
            onChange={(e) => updateFormData('projectDescription', e.target.value)}
         />
         <div className="mt-12 flex justify-between items-center w-full">
            <button onClick={onPrev} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase">
              {dict.projectStarter.nav.back}
            </button>
            <MagneticElement strength={0.3}>
              <button 
                onClick={onNext} 
                className={`btn-primary ${!formData.projectDescription.trim() ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {dict.projectStarter.nav.next}
              </button>
            </MagneticElement>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <h2 className="type-h2 mb-12 text-center">{d.title}</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {needsList.map(key => {
          const title = d.options[key];
          const isSelected = formData.needs.includes(title);
          return (
            <button
              key={key}
              onClick={() => toggleNeed(key)}
              className={`px-6 py-4 border rounded-full transition-colors duration-300 type-body ${
                isSelected ? 'bg-white text-black border-white' : 'bg-transparent text-white border-[var(--color-vaeren-iron)] hover:border-white/50'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
      
      <div className="mt-12 flex justify-between items-center w-full px-4">
        <button onClick={onPrev} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase">
          {dict.projectStarter.nav.back}
        </button>
        <MagneticElement strength={0.3}>
          <button 
            onClick={onNext} 
            className={`btn-primary ${formData.needs.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {dict.projectStarter.nav.next}
          </button>
        </MagneticElement>
      </div>
    </div>
  );
}