'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 240;
const FRAME_URL = (index) => `/hero-frames-webp/frame_${String(index).padStart(4, '0')}.webp`;

export default function CanvasSequence({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;
    
    // Set responsive bounds
    const frameCount = isMobile ? 192 : 240;
    const frameUrl = (index) => isMobile 
      ? `/hero-frames-mobile-webp/frame_${String(index).padStart(4, '0')}.webp`
      : `/hero-frames-webp/frame_${String(index).padStart(4, '0')}.webp`;
    
    canvas.width = isMobile ? 1080 : 1920;
    canvas.height = isMobile ? 1920 : 1080;

    const frameState = { frame: 1 };
    
    const render = () => {
      const frameIndex = Math.floor(frameState.frame);
      const img = images[frameIndex];
      
      // Enforce high-quality upscaling for retina/high-DPR screens
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      } else {
        let closestImg = null;
        for (let offset = 1; offset < 20; offset++) {
          if (images[frameIndex - offset] && images[frameIndex - offset].complete && images[frameIndex - offset].naturalWidth > 0) {
            closestImg = images[frameIndex - offset];
            break;
          }
          if (images[frameIndex + offset] && images[frameIndex + offset].complete && images[frameIndex + offset].naturalWidth > 0) {
            closestImg = images[frameIndex + offset];
            break;
          }
        }
        if (closestImg) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(closestImg, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    const loadFrame = (index, callback = null) => {
      if (images[index]) {
        if (callback && images[index].complete) callback();
        return;
      }
      const img = new Image();
      img.src = frameUrl(index);
      img.onload = () => {
        images[index] = img;
        if (callback) callback();
      };
      // We do NOT set images[index] = img here, because if we do, 
      // subsequent loadFrame(index, callback) calls will see images[index] exists 
      // but is not complete, and will silently drop the callback!
    };
    
    let preloadIndex = 1;
    const preloadAll = () => {
      if (preloadIndex > frameCount) return;
      loadFrame(preloadIndex, () => {
        preloadIndex++;
        setTimeout(preloadAll, 100);
      });
    };
    preloadAll();

    for (let i = 1; i <= Math.min(20, frameCount); i++) {
      loadFrame(i, i === 1 ? render : null);
    }

    const trigger = ScrollTrigger.create({
      trigger: '#sequence-spacer', 
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        frameState.frame = 1 + (frameCount - 1) * self.progress;
        render();
        
        // Depth Cross-Fade transition in the last 15% of scroll
        if (self.progress > 0.85) {
            const depthProgress = (self.progress - 0.85) / 0.15; // 0 to 1
            // Scale canvas from 1 to 0.9, opacity from 1 to 0
            const scale = 1 - (0.1 * depthProgress);
            const opacity = 1 - depthProgress;
            canvas.style.transform = `scale(${scale})`;
            canvas.style.opacity = Math.max(0, opacity);
        } else {
            canvas.style.transform = `scale(1)`;
            canvas.style.opacity = 1;
        }

        const currentIdx = Math.floor(frameState.frame);
        for(let i = currentIdx; i < Math.min(currentIdx + 15, frameCount + 1); i++) {
            loadFrame(i);
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-0"
        style={{ 
          willChange: 'transform, opacity', 
          objectPosition: 'center center',
          filter: 'contrast(1.05) saturate(1.15) brightness(0.95)',
        }}
      />
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
