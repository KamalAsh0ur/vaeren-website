'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    // Hide native cursor completely using a body class (already done in layout)
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Follow mouse
    const onMouseMove = (e) => {
      // Use GSAP for smooth interpolation
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    // Detect hovers on interactive elements
    const handleMouseOver = (e) => {
      // Find closest interactive element
      const interactiveEl = e.target.closest('a, button, [data-cursor]');
      
      if (interactiveEl) {
        setIsHovering(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setHoverText(text || '');
      }
    };

    const handleMouseOut = (e) => {
      const interactiveEl = e.target.closest('a, button, [data-cursor]');
      if (interactiveEl) {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] items-center justify-center mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)' }} // Center the cursor on coordinates
    >
      <div 
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center
          ${isHovering ? 'w-12 h-12 border border-[var(--color-vaeren-bone)] bg-transparent rounded-full' : 'w-2 h-2 bg-[var(--color-vaeren-bone)] rounded-full'}
        `}
      >
        {isHovering && hoverText && (
          <span className="type-meta text-[8px] absolute tracking-widest text-[var(--color-vaeren-bone)]">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
}
