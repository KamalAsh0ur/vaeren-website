import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepReview({ dict, lang, formData, onNext, onPrev, onEdit, isSubmitting }) {
  const d = dict.projectStarter.review;
  const isRTL = lang === 'ar';

  // Determine recommendation logic
  let recommendedService = 'Something Else';
  let startingPrice = '$100';
  
  const needsStr = formData.needs.join(' ');
  if (needsStr.includes('Brand Strategy') || needsStr.includes('استراتيجية البراند')) {
    recommendedService = 'CREATE TOGETHER';
    startingPrice = '$350';
  } else if (needsStr.includes('Garment Design') || needsStr.includes('تصميم القطع')) {
    recommendedService = 'DESIGN WITH US';
    startingPrice = '$100';
  } else if (needsStr.includes('Art Direction')) {
    recommendedService = 'BUILD THE WORLD';
    startingPrice = '$150';
  } else if (needsStr.includes('Launch Strategy') || needsStr.includes('استراتيجية الإطلاق')) {
    recommendedService = 'LAUNCH WITH US';
    startingPrice = '$150';
  } else {
    const typeMap = {
      'product': { name: 'DESIGN WITH US', price: '$100' },
      'brand': { name: 'CREATE TOGETHER', price: '$350' },
      'campaign': { name: 'BUILD THE WORLD', price: '$150' },
      'launch': { name: 'LAUNCH WITH US', price: '$150' },
      'custom': { name: 'SOMETHING ELSE', price: '$100' }
    };
    if (typeMap[formData.projectType]) {
      recommendedService = typeMap[formData.projectType].name;
      startingPrice = typeMap[formData.projectType].price;
    }
  }

  const getLabel = (obj, key) => {
    return obj.options[key]?.title || obj.options[key] || key;
  };

  return (
    <div className={`w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Left: Recommendation */}
      <div className="flex flex-col">
        <h3 className="type-meta text-[var(--color-vaeren-concrete)] mb-4 uppercase tracking-[0.2em]">
          {d.recommendationPrefix}
        </h3>
        <h2 className="type-h1 leading-[1.1] mb-2">{recommendedService}</h2>
        <h3 className="type-meta text-[var(--color-vaeren-concrete)] mb-8 uppercase tracking-[0.2em]">
          {d.recommendationSuffix}
        </h3>
        <p className="type-body text-[var(--color-vaeren-concrete)] mb-12 max-w-sm">
          {d.recommendationDesc}
        </p>

        {formData.needs.length > 0 && (
          <div className="mb-12">
            <h4 className="type-h3 mb-6 uppercase tracking-[0.1em]">{d.willHelpWith}</h4>
            <ul className="space-y-3 type-body">
              {formData.needs.map((need, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white block"></span>
                  {need}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border border-[var(--color-vaeren-iron)] p-6 mt-auto">
          <p className="type-meta text-[var(--color-vaeren-concrete)] mb-2 uppercase">{d.startingFrom}</p>
          <p className="type-h2 mb-4">{startingPrice}</p>
          <p className="text-xs text-[var(--color-vaeren-ash)]">{d.priceDisclaimer}</p>
        </div>
      </div>

      {/* Right: Summary */}
      <div className="flex flex-col h-full bg-[var(--color-vaeren-iron)]/10 p-6 md:p-12 relative">
        <button onClick={() => onEdit(1)} className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} type-meta text-white hover:text-[var(--color-vaeren-concrete)] underline underline-offset-4`}>
          {d.editBtn}
        </button>
        
        <h3 className="type-h3 mb-10 uppercase tracking-[0.1em]">{d.yourProject}</h3>
        
        <div className="space-y-8 mb-12">
          {formData.projectType && (
            <div>
              <p className="type-meta text-[var(--color-vaeren-concrete)] mb-1">{d.projectLabel}</p>
              <p className="type-body">{getLabel(dict.projectStarter.projectType, formData.projectType)}</p>
            </div>
          )}
          {formData.projectStage && (
            <div>
              <p className="type-meta text-[var(--color-vaeren-concrete)] mb-1">{d.stageLabel}</p>
              <p className="type-body">{getLabel(dict.projectStarter.stage, formData.projectStage)}</p>
            </div>
          )}
          {formData.budget && (
            <div>
              <p className="type-meta text-[var(--color-vaeren-concrete)] mb-1">{d.budgetLabel}</p>
              <p className="type-body">{getLabel(dict.projectStarter.budget, formData.budget)}</p>
            </div>
          )}
          <div>
            <p className="type-meta text-[var(--color-vaeren-concrete)] mb-1">{d.contactLabel}</p>
            <p className="type-body">{formData.name}</p>
            {formData.brand && <p className="type-body">{formData.brand}</p>}
            <p className="type-body">{formData.email}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <MagneticElement strength={0.2}>
            <button 
              onClick={onNext} 
              className={`btn-primary w-full justify-center ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {isSubmitting ? dict.contact.submitting : d.submitBtn}
            </button>
          </MagneticElement>
          <button onClick={() => onEdit(1)} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white text-center w-full">
            {d.changeAnswers}
          </button>
        </div>
      </div>
    </div>
  );
}