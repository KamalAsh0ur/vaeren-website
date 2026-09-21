import React from 'react';
import MagneticElement from '../../MagneticElement';

export default function StepContact({ dict, formData, updateFormData, onNext, onPrev }) {
  const d = dict.projectStarter.contact;
  const isRTL = dict.nav.work === 'أعمالنا';

  const isValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.email.includes('@');

  return (
    <div className="w-full max-w-2xl">
      <h2 className="type-h2 mb-12 text-center">{d.title}</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder={d.name} 
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className={`w-full bg-transparent border-b border-[var(--color-vaeren-iron)] p-4 type-body focus:outline-none focus:border-white ${isRTL ? 'text-right' : ''}`}
          />
          <input 
            type="text" 
            placeholder={d.brand} 
            value={formData.brand}
            onChange={(e) => updateFormData('brand', e.target.value)}
            className={`w-full bg-transparent border-b border-[var(--color-vaeren-iron)] p-4 type-body focus:outline-none focus:border-white ${isRTL ? 'text-right' : ''}`}
          />
        </div>
        <input 
          type="email" 
          placeholder={d.email} 
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className={`w-full bg-transparent border-b border-[var(--color-vaeren-iron)] p-4 type-body focus:outline-none focus:border-white ${isRTL ? 'text-right' : ''}`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder={d.whatsapp} 
            value={formData.whatsapp}
            onChange={(e) => updateFormData('whatsapp', e.target.value)}
            className={`w-full bg-transparent border-b border-[var(--color-vaeren-iron)] p-4 type-body focus:outline-none focus:border-white ${isRTL ? 'text-right' : ''}`}
          />
          <input 
            type="text" 
            placeholder={d.instagram} 
            value={formData.instagram}
            onChange={(e) => updateFormData('instagram', e.target.value)}
            className={`w-full bg-transparent border-b border-[var(--color-vaeren-iron)] p-4 type-body focus:outline-none focus:border-white ${isRTL ? 'text-right' : ''}`}
          />
        </div>
        <input 
          type="text" 
          placeholder={d.website} 
          value={formData.website}
          onChange={(e) => updateFormData('website', e.target.value)}
          className={`w-full bg-transparent border-b border-[var(--color-vaeren-iron)] p-4 type-body focus:outline-none focus:border-white ${isRTL ? 'text-right' : ''}`}
        />
      </div>

      <p className={`mt-6 type-meta text-[var(--color-vaeren-concrete)] ${isRTL ? 'text-right' : ''}`}>{d.requiredNote}</p>

      <div className="mt-12 flex justify-between items-center w-full px-4">
        <button onClick={onPrev} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white uppercase">
          {dict.projectStarter.nav.back}
        </button>
        <MagneticElement strength={0.3}>
          <button 
            onClick={onNext} 
            className={`btn-primary ${!isValid ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {dict.projectStarter.nav.next}
          </button>
        </MagneticElement>
      </div>
    </div>
  );
}