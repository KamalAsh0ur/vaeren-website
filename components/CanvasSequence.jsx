'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CanvasSequence({ children }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set isMobile on mount to avoid hydration mismatch
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const video = videoRef.current;

    // Preload the video fully for scrubbing — no autoplay
    video.load();
    video.pause();
    // iOS Safari requires at least one seek before scrubbing is allowed
    video.currentTime = 0.001;

    // RAF-throttled scrubbing: batch all currentTime writes into one per frame
    // to prevent multiple decoder seeks per GSAP tick causing jank
    let pendingTime = null;
    let rafId = null;

    const flushSeek = () => {
      if (pendingTime !== null && video.readyState >= 2) {
        video.currentTime = pendingTime;
        pendingTime = null;
      }
      rafId = null;
    };

    const trigger = ScrollTrigger.create({
      trigger: '#sequence-spacer',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        if (!video.duration || isNaN(video.duration)) return;

        // Queue the seek — RAF collapses rapid ticks into one decode per frame
        pendingTime = self.progress * video.duration;
        if (!rafId) rafId = requestAnimationFrame(flushSeek);

        // Depth cross-fade in the last 15% of scroll
        if (self.progress > 0.85) {
          const t = (self.progress - 0.85) / 0.15;
          video.style.transform = `scale(${1 - 0.1 * t})`;
          video.style.opacity = Math.max(0, 1 - t);
        } else {
          video.style.transform = 'scale(1)';
          video.style.opacity = '1';
        }
      },
    });

    return () => {
      trigger.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <video 
        ref={videoRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-0"
        style={{ 
          willChange: 'transform, opacity', 
          objectPosition: 'center center',
          filter: 'contrast(1.05) saturate(1.15) brightness(0.95)',
        }}
        playsInline
        muted
        autoPlay={false}
        preload="auto"
        key={isMobile ? 'mobile' : 'desktop'}
      >
        <source src={isMobile ? '/hero-mobile.mp4' : '/hero-desktop.mp4'} type="video/mp4" />
      </video>
      
      {/* Cinematic Film Grain Overlay to mask compression artifacts */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0 mix-blend-overlay" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      {children}
    </div>
  );
}
