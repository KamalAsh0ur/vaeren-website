import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function ProjectVisualBackground({ src, overlay = 0.55, desktopPosition = 'center', mobilePosition = 'center' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Subtle crossfade and slight scale-down effect when image mounts/changes
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 1.03 }, 
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, [src]);

  if (!src) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" ref={containerRef}>
      <picture>
        <source media="(max-width: 768px)" srcSet={src} />
        <Image
          src={src}
          alt="Vaeren Studio"
          fill
          priority // Prioritize loading for LCP
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: typeof window !== 'undefined' && window.innerWidth < 768 ? mobilePosition : desktopPosition
          }}
        />
      </picture>
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out"
        style={{ opacity: overlay }}
      />
      
      {/* Subtle radial gradient for vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
