'use client';

import React from 'react';
import MagneticElement from './MagneticElement';

export default function SocialSection() {
  const images = [
    '/social/ig1.jpg',
    '/social/ig2.jpg',
    '/social/ig3.jpg',
    '/social/ig4.jpg',
    '/social/ig5.jpg',
  ];

  return (
    <section className="bg-black py-24 md:py-48 relative overflow-hidden z-20 border-t border-white/5">
      <div className="flex flex-col items-center mb-16 md:mb-24 px-4">
        <h2 className="type-h2 text-[var(--color-vaeren-bone)] text-center mb-8">@vaeren.studios</h2>
        <MagneticElement strength={0.2}>
            <a 
              href="https://www.instagram.com/vaeren.studios/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center min-h-[48px] px-8" 
              data-cursor-text="FOLLOW"
              aria-label="Follow Vaeren Studios on Instagram"
            >
                Follow on Instagram <span className="arrow ml-2">&rarr;</span>
            </a>
        </MagneticElement>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {images.map((src, i) => (
            <a 
              key={i} 
              href="https://www.instagram.com/vaeren.studios/"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-[4/5] relative group overflow-hidden block"
              aria-label="View on Instagram"
            >
              <img 
                src={src} 
                alt={`Vaeren Studios — Post ${i + 1}`} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
