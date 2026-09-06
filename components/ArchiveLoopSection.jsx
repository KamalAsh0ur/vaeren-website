'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ArchiveLoopSection() {
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  
  const drop1Images = [
    '/drop1/shot1.webp',
    '/drop1/shot2.webp',
    '/drop1/shot3.webp',
  ];

  const drop2Images = [
    '/drop2/campaign.webp',
    '/drop2/shot1.webp',
    '/drop2/shot2.webp',
    '/drop2/shot3.webp',
  ];

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;
    
    // We duplicate the arrays 4 times in the DOM, so 1 set is 25% of the total width.
    // Moving xPercent to -25 perfectly loops 1 set.
    const anim1 = gsap.to(track1, {
      xPercent: -25,
      ease: 'none',
      duration: 15, // Accelerated speed
      repeat: -1,
      force3D: true,
    });

    const anim2 = gsap.to(track2, {
      xPercent: -25,
      ease: 'none',
      duration: 20, // Accelerated speed
      repeat: -1,
      force3D: true,
    });

    // Optional: Reverse direction for track 2
    // gsap.set(track2, { xPercent: -25 });
    // const anim2 = gsap.to(track2, {
    //   xPercent: 0,
    //   ease: 'none',
    //   duration: 45,
    //   repeat: -1,
    //   force3D: true,
    // });

    const mm = gsap.matchMedia();

    mm.add("(hover: hover)", () => {
      const handleMouseEnter1 = () => gsap.to(anim1, { timeScale: 0.2, duration: 1, ease: 'power2.out' });
      const handleMouseLeave1 = () => gsap.to(anim1, { timeScale: 1, duration: 1, ease: 'power2.out' });
      
      const handleMouseEnter2 = () => gsap.to(anim2, { timeScale: 0.2, duration: 1, ease: 'power2.out' });
      const handleMouseLeave2 = () => gsap.to(anim2, { timeScale: 1, duration: 1, ease: 'power2.out' });

      track1.addEventListener('mouseenter', handleMouseEnter1);
      track1.addEventListener('mouseleave', handleMouseLeave1);
      track2.addEventListener('mouseenter', handleMouseEnter2);
      track2.addEventListener('mouseleave', handleMouseLeave2);

      return () => {
        track1.removeEventListener('mouseenter', handleMouseEnter1);
        track1.removeEventListener('mouseleave', handleMouseLeave1);
        track2.removeEventListener('mouseenter', handleMouseEnter2);
        track2.removeEventListener('mouseleave', handleMouseLeave2);
      };
    });

    return () => {
      anim1.kill();
      anim2.kill();
      mm.revert();
    };
  }, []);

  return (
    <section className="bg-[var(--color-vaeren-void)] py-24 md:py-32 relative overflow-hidden z-20 border-t border-white/5">
      <div className="flex flex-col items-center mb-16 md:mb-24 px-4">
        <h2 className="type-meta text-[var(--color-vaeren-concrete)] tracking-[0.3em] uppercase border-b border-white/10 pb-4">
          ARCHIVE / VISUAL WORLD
        </h2>
      </div>

      <div className="w-full flex flex-col gap-8 md:gap-16">
        
        {/* Track 1: Drop 1 */}
        <div className="w-full relative flex items-center" data-cursor-text="DRAG">
          <div ref={track1Ref} className="flex gap-4 md:gap-8 w-max px-2 md:px-4" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
              {/* Render 4 sets of the images to guarantee enough width to loop seamlessly */}
              {[...Array(4)].map((_, setIndex) => (
                <React.Fragment key={`set1-${setIndex}`}>
                  {drop1Images.map((src, i) => (
                    <div 
                      key={`d1-${setIndex}-${i}`} 
                      className="h-[25vh] md:h-[50vh] flex-shrink-0 relative overflow-hidden bg-white/5"
                    >
                        <img 
                          src={src} 
                          alt={`Drop 1 Archive ${i + 1}`} 
                          className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-700 ease-out" 
                        />
                    </div>
                  ))}
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Track 2: Drop 2 */}
        <div className="w-full relative flex items-center" data-cursor-text="DRAG">
          <div ref={track2Ref} className="flex gap-4 md:gap-8 w-max px-2 md:px-4" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
              {/* Render 4 sets of the images to guarantee enough width to loop seamlessly */}
              {[...Array(4)].map((_, setIndex) => (
                <React.Fragment key={`set2-${setIndex}`}>
                  {drop2Images.map((src, i) => (
                    <div 
                      key={`d2-${setIndex}-${i}`} 
                      className="h-[25vh] md:h-[50vh] flex-shrink-0 relative overflow-hidden bg-white/5"
                    >
                        <img 
                          src={src} 
                          alt={`Drop 2 Archive ${i + 1}`} 
                          className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-700 ease-out" 
                        />
                    </div>
                  ))}
                </React.Fragment>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}
