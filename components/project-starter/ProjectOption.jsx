import React from 'react';
import Image from 'next/image';
import MagneticElement from '../MagneticElement';

export default function ProjectOption({ title, desc, isSelected, onClick, isRTL, imageSrc, imagePosition = 'center' }) {
  return (
    <MagneticElement strength={0.1}>
      <button 
        onClick={onClick}
        className={`
          relative group overflow-hidden w-full text-left transition-all duration-500 ease-out border 
          ${isSelected ? 'border-white bg-[var(--color-vaeren-iron)]/20' : 'border-[var(--color-vaeren-iron)] hover:border-[var(--color-vaeren-concrete)] bg-transparent'}
        `}
      >
        <div className={`flex flex-col md:flex-row min-h-[140px] md:min-h-[160px] ${isRTL ? 'md:flex-row-reverse text-right' : ''}`}>
          
          {/* Optional Image Area */}
          {imageSrc && (
            <div className="w-full md:w-[40%] h-[120px] md:h-auto relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-[var(--color-vaeren-iron)]">
              <Image 
                src={imageSrc} 
                alt={title} 
                fill 
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isSelected ? 'scale-105 opacity-90' : 'opacity-70 group-hover:opacity-100'}`}
                style={{ objectPosition: imagePosition }}
              />
            </div>
          )}

          {/* Text Area */}
          <div className="p-6 md:p-8 flex flex-col justify-center flex-grow z-10 bg-black/40 backdrop-blur-[2px]">
            <h3 className={`type-h3 mb-2 uppercase tracking-[0.1em] transition-colors duration-300 ${isSelected ? 'text-white' : 'text-white group-hover:text-white'}`}>
              {title}
            </h3>
            {desc && <p className="type-body text-[var(--color-vaeren-concrete)]">{desc}</p>}
          </div>
        </div>
      </button>
    </MagneticElement>
  );
}