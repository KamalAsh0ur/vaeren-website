import React from 'react';

export default function ProjectProgress({ current, total, isRTL }) {
  return (
    <div className={`flex items-center gap-4 type-meta text-[var(--color-vaeren-concrete)] ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="w-16 h-[1px] bg-[var(--color-vaeren-iron)] relative">
        <div 
          className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} h-[1px] bg-white transition-all duration-300 ease-out`}
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span>0{current} / 0{total}</span>
    </div>
  );
}