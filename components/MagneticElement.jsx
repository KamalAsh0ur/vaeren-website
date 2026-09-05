'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticElement({ children, strength = 0.5 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let hoverTimeout;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 1,
        ease: 'power3.out',
      });
    };

    const onMouseLeave = () => {
      hoverTimeout = setTimeout(() => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
      }, 100);
    };

    const onMouseEnter = () => {
      clearTimeout(hoverTimeout);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseenter', onMouseEnter);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseenter', onMouseEnter);
      clearTimeout(hoverTimeout);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
