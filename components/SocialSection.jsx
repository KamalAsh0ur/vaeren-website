'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from './MagneticElement';

export default function SocialSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  const images = [
    '/social/ig1.webp',
    '/social/ig2.webp',
    '/social/ig3.webp',
    '/social/ig4.webp',
    '/social/ig5.webp',
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // We animate the track to move exactly 50% of its width
    // Because we duplicated the items perfectly, -50% brings us exactly to the start of the second set
    const animation = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 35, // Smooth, slow speed
      repeat: -1,
      force3D: true, // Forces GPU acceleration in GSAP
    });

    const handleMouseEnter = () => gsap.to(animation, { timeScale: 0.1, duration: 1, ease: 'power2.out' });
    const handleMouseLeave = () => gsap.to(animation, { timeScale: 1, duration: 1, ease: 'power2.out' });

    const container = containerRef.current;
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-black py-24 md:py-48 relative overflow-hidden z-20 border-t border-white/5">
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

      <div className="w-full relative flex items-center" data-cursor-text="DRAG">
        {/* We use w-max to allow it to be as wide as its children, so xPercent: -50 works precisely. Promoted to GPU. */}
        <div ref={trackRef} className="flex gap-4 md:gap-8 w-max px-2 md:px-4" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
            {/* First Set */}
            {images.map((src, i) => (
                <a 
                  key={i} 
                  href="https://www.instagram.com/vaeren.studios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[70vw] md:w-[22vw] aspect-[4/5] flex-shrink-0 relative group overflow-hidden block"
                  aria-label="View Instagram Post"
                >
                    <img 
                      src={src} 
                      alt={`Vaeren Studios Instagram Post ${i + 1}`} 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                </a>
            ))}
            {/* Duplicated Set for Seamless Infinite Loop */}
            {images.map((src, i) => (
                <a 
                  key={`dup-${i}`} 
                  href="https://www.instagram.com/vaeren.studios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[70vw] md:w-[22vw] aspect-[4/5] flex-shrink-0 relative group overflow-hidden block"
                  aria-label="View Instagram Post"
                >
                    <img 
                      src={src} 
                      alt={`Vaeren Studios Instagram Post ${i + 1}`} 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                </a>
            ))}
        </div>
      </div>
    </section>
  );
}
