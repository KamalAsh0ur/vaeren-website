'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileStickyCTA({ lang, dict }) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Hide on the actual Project Starter page
  if (pathname && pathname.includes('/start-a-project')) return null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling past hero (approx 100vh)
      const pastHero = scrollY > windowHeight * 0.8;
      
      // Hide near footer to avoid overlap (bottom 500px)
      const nearBottom = scrollY + windowHeight >= documentHeight - 500;

      setIsVisible(pastHero && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRTL = lang === 'ar';

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 z-[40] md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <a 
        href={`/${lang}/start-a-project`}
        className={`w-full bg-black border border-[var(--color-vaeren-iron)] text-white p-4 flex justify-between items-center shadow-2xl ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <span className="type-meta text-xs tracking-widest text-[var(--color-vaeren-concrete)] uppercase">
          {dict.footer.headline3}
        </span>
        <span className="type-meta text-xs tracking-widest uppercase flex items-center">
          {dict.nav.startProject} <span className={isRTL ? 'mr-2' : 'ml-2'}>{isRTL ? '\u2190' : '\u2192'}</span>
        </span>
      </a>
    </div>
  );
}
