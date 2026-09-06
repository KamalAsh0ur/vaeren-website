'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from './MagneticElement';

export default function ArchiveLoopSection() {
  const trackRef = useRef(null);
  
  const images = [
    '/drop1/shot1.jpg',
    '/drop1/shot2.jpg',
    '/drop1/shot3.jpg',
    '/drop2/campaign.png',
    '/drop2/shot1.png',
    '/drop2/shot2.png',
    '/drop2/shot3.png',
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // Smooth infinite scroll to the left
    const animation = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 50, // Very slow, ambient movement
      repeat: -1,
      force3D: true,
    });

    const handleMouseEnter = () => gsap.to(animation, { timeScale: 0.2, duration: 1, ease: 'power2.out' });
    const handleMouseLeave = () => gsap.to(animation, { timeScale: 1, duration: 1, ease: 'power2.out' });

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-[var(--color-vaeren-void)] py-24 md:py-32 relative overflow-hidden z-20 border-t border-white/5">
      <div className="flex flex-col items-center mb-16 md:mb-24 px-4">
        <h2 className="type-meta text-[var(--color-vaeren-concrete)] tracking-[0.3em] uppercase border-b border-white/10 pb-4">
          ARCHIVE / VISUAL WORLD
        </h2>
      </div>

      <div className="w-full relative flex items-center" data-cursor-text="DRAG">
        <div ref={trackRef} className="flex gap-4 md:gap-8 w-max px-2 md:px-4" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
            {/* First Set */}
            {images.map((src, i) => (
                <div 
                  key={`a-${i}`} 
                  className="w-[70vw] md:w-[25vw] aspect-[4/5] flex-shrink-0 relative overflow-hidden"
                >
                    <img 
                      src={src} 
                      alt={`Archive Image ${i + 1}`} 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 ease-out" 
                    />
                </div>
            ))}
            {/* Duplicated Set for Seamless Infinite Loop */}
            {images.map((src, i) => (
                <div 
                  key={`b-${i}`} 
                  className="w-[70vw] md:w-[25vw] aspect-[4/5] flex-shrink-0 relative overflow-hidden"
                >
                    <img 
                      src={src} 
                      alt={`Archive Image ${i + 1}`} 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 ease-out" 
                    />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
