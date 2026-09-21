import React from 'react';
import MagneticElement from '../MagneticElement';

export default function ProjectOption({ title, desc, isSelected, onClick, isRTL }) {
  return (
    <MagneticElement strength={0.1}>
      <button 
        onClick={onClick}
        className={`w-full text-left p-6 border transition-colors duration-300 ${
          isSelected 
            ? 'border-white bg-white/5' 
            : 'border-[var(--color-vaeren-iron)] hover:border-white/50 bg-transparent'
        } ${isRTL ? 'text-right' : ''}`}
      >
        <h3 className="type-h3 mb-2">{title}</h3>
        {desc && <p className="type-body text-[var(--color-vaeren-concrete)]">{desc}</p>}
      </button>
    </MagneticElement>
  );
}