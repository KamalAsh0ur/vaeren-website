import React from 'react';

export default function ProjectProgress({ stepId, isRTL, dict }) {
  // Map step IDs to semantic phases
  // stepId maps:
  // 1 = Region -> ACCESS
  // 2 = AccessUnlocked -> ACCESS
  // 3 = ProjectType -> PROJECT
  // 4 = Stage -> PROJECT
  // 5 = Needs -> SCOPE
  // 6 = Budget -> SCALE
  // 7 = Details -> START
  // 8 = Contact -> START
  
  let phaseText = "01 — ACCESS";
  if (stepId >= 3 && stepId <= 4) phaseText = "02 — PROJECT";
  if (stepId === 5) phaseText = "03 — SCOPE";
  if (stepId === 6) phaseText = "04 — SCALE";
  if (stepId >= 7) phaseText = "05 — START";

  return (
    <div className={`flex items-center gap-4 type-meta text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
      <span className="tracking-[0.2em]">{phaseText}</span>
    </div>
  );
}