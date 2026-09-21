'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import ProjectProgress from './ProjectProgress';
import ProjectVisualBackground from './ProjectVisualBackground';
import StepIntro from './steps/StepIntro';
import StepRegion from './steps/StepRegion';
import StepAccessUnlocked from './steps/StepAccessUnlocked';
import StepProjectType from './steps/StepProjectType';
import StepStage from './steps/StepStage';
import StepNeeds from './steps/StepNeeds';
import StepBudget from './steps/StepBudget';
import StepDetails from './steps/StepDetails';
import StepContact from './steps/StepContact';
import StepReview from './steps/StepReview';
import StepSuccess from './steps/StepSuccess';
import StepError from './steps/StepError';
import MagneticElement from '../MagneticElement';

// Master Asset Configuration
export const projectStarterVisuals = {
  atelier: { src: '/images/project-starter/vs-ps-01-atelier.png', desktopPosition: 'center', mobilePosition: '70% center' },
  worktable: { src: '/images/project-starter/vs-ps-02-worktable.png', desktopPosition: 'center', mobilePosition: 'center' },
  materialWall: { src: '/images/project-starter/vs-ps-03-material-wall.png', desktopPosition: 'center', mobilePosition: 'center' },
  garmentPrototype: { src: '/images/project-starter/vs-ps-04-garment-prototype.png', desktopPosition: 'center', mobilePosition: 'center' },
  patternDevelopment: { src: '/images/project-starter/vs-ps-05-pattern-development.png', desktopPosition: 'center', mobilePosition: 'center' },
  campaignSet: { src: '/images/project-starter/vs-ps-07-campaign-set.png', desktopPosition: 'center', mobilePosition: 'center' },
  brandWall: { src: '/images/project-starter/vs-ps-08-brand-wall.png', desktopPosition: 'center', mobilePosition: 'center' },
  digitalLaunch: { src: '/images/project-starter/vs-ps-09-digital-launch.png', desktopPosition: 'center', mobilePosition: 'center' },
  technicalGrid: { src: '/images/project-starter/vs-ps-10-technical-grid.png', desktopPosition: 'center', mobilePosition: 'center' },
  emptyTable: { src: '/images/project-starter/vs-ps-11-empty-project-table.png', desktopPosition: 'center', mobilePosition: 'center' }
};

export default function ProjectStarter({ dict, lang, preselectedService }) {
  // Define Steps
  // 0: Intro
  // 1: Region
  // 2: AccessUnlocked
  // 3: Project Type
  // 4: Stage
  // 5: Needs
  // 6: Budget
  // 7: Details
  // 8: Contact
  // 9: Review
  // 10: Success / 11: Error
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    region: '',
    projectType: '',
    projectStage: '',
    needs: [],
    budget: '',
    projectDescription: '',
    name: '',
    brand: '',
    email: '',
    whatsapp: '',
    instagram: '',
    website: ''
  });

  const contentRef = useRef(null);

  // Dynamic Background Engine
  const activeBackground = useMemo(() => {
    const typeVisualMap = {
      'product': projectStarterVisuals.garmentPrototype,
      'brand': projectStarterVisuals.brandWall,
      'campaign': projectStarterVisuals.campaignSet,
      'launch': projectStarterVisuals.digitalLaunch,
      'custom': projectStarterVisuals.emptyTable
    };

    switch (currentStep) {
      case 0: return { ...projectStarterVisuals.atelier, overlay: 0.55 }; // Intro
      case 1: return { ...projectStarterVisuals.worktable, overlay: 0.5 }; // Region
      case 2: return { ...projectStarterVisuals.worktable, overlay: 0.6 }; // Access Unlocked
      case 3: return { ...projectStarterVisuals.atelier, overlay: 0.65 }; // Project Type (Cards are visuals)
      case 4: return { ...projectStarterVisuals.technicalGrid, overlay: 0.7 }; // Stage
      case 5: // Needs dynamically maps to Project Type
        return { ...(typeVisualMap[formData.projectType] || projectStarterVisuals.technicalGrid), overlay: 0.65 };
      case 6: return { ...projectStarterVisuals.technicalGrid, overlay: 0.75 }; // Budget
      case 7: return { ...projectStarterVisuals.emptyTable, overlay: 0.45 }; // Details
      case 8: return { ...projectStarterVisuals.digitalLaunch, overlay: 0.65 }; // Contact
      case 9: return null; // Review Screen renders its own background / collage
      case 10: return { ...projectStarterVisuals.emptyTable, overlay: 0.5 }; // Success
      case 11: return { ...projectStarterVisuals.atelier, overlay: 0.75 }; // Error
      default: return null;
    }
  }, [currentStep, formData.projectType]);

  useEffect(() => {
    // Initial preselection if passed via URL
    if (preselectedService && !formData.projectType) {
      const typeMap = {
        'design-with-us': 'product',
        'build-the-world': 'campaign',
        'create-together': 'brand',
        'launch-with-us': 'launch',
        'something-else': 'custom'
      };
      if (typeMap[preselectedService]) {
        setFormData(prev => ({ ...prev, projectType: typeMap[preselectedService] }));
        setCurrentStep(1); // Skip intro, go straight to Region
      }
    }
  }, [preselectedService, formData.projectType]);

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };

  const goToStep = (stepIndex) => {
    setDirection(stepIndex > currentStep ? 1 : -1);
    setCurrentStep(stepIndex);
  };

  // GSAP Transition Effect when step changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: direction > 0 ? 20 : -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentStep, direction]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate recommendation based on spec logic
    let recommendedService = 'Something Else';
    let recommendedServiceSlug = 'something-else';
    
    // Needs take priority
    const needsStr = formData.needs.join(' ');
    if (needsStr.includes('Brand Strategy') || needsStr.includes('استراتيجية البراند')) {
      recommendedService = 'Create Together';
      recommendedServiceSlug = 'create-together';
    } else if (needsStr.includes('Garment Design') || needsStr.includes('تصميم القطع')) {
      recommendedService = 'Design With Us';
      recommendedServiceSlug = 'design-with-us';
    } else if (needsStr.includes('Art Direction')) {
      recommendedService = 'Build The World';
      recommendedServiceSlug = 'build-the-world';
    } else if (needsStr.includes('Launch Strategy') || needsStr.includes('استراتيجية الإطلاق')) {
      recommendedService = 'Launch With Us';
      recommendedServiceSlug = 'launch-with-us';
    } else {
      // Fallback to projectType
      const typeMap = {
        'product': { name: 'Design With Us', slug: 'design-with-us' },
        'brand': { name: 'Create Together', slug: 'create-together' },
        'campaign': { name: 'Build The World', slug: 'build-the-world' },
        'launch': { name: 'Launch With Us', slug: 'launch-with-us' },
        'custom': { name: 'Something Else', slug: 'something-else' }
      };
      if (typeMap[formData.projectType]) {
        recommendedService = typeMap[formData.projectType].name;
        recommendedServiceSlug = typeMap[formData.projectType].slug;
      }
    }

    // Capture UTMs
    const getQueryParam = (param) => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || '';
      }
      return '';
    };

    const payload = {
      ...formData,
      recommendedService,
      recommendedServiceSlug,
      utm_source: getQueryParam('utm_source'),
      utm_medium: getQueryParam('utm_medium'),
      utm_campaign: getQueryParam('utm_campaign'),
      utm_content: getQueryParam('utm_content'),
      utm_term: getQueryParam('utm_term'),
      landing_page: getQueryParam('landing_page') || (typeof window !== 'undefined' ? window.location.href : ''),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      fbclid: getQueryParam('fbclid')
    };

    try {
      const res = await fetch('https://formspree.io/f/mqazknoo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        // Fire Meta Pixel ONLY on success
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead');
        }
        setCurrentStep(10); // Success
      } else {
        setCurrentStep(11); // Error
      }
    } catch (err) {
      setCurrentStep(11); // Error
    }
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepIntro dict={dict} onNext={nextStep} />;
      case 1: return <StepRegion dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 2: return <StepAccessUnlocked dict={dict} formData={formData} onNext={nextStep} />;
      case 3: return <StepProjectType dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <StepStage dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <StepNeeds dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 6: return <StepBudget dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 7: return <StepDetails dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 8: return <StepContact dict={dict} formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 9: return <StepReview dict={dict} lang={lang} formData={formData} onNext={handleSubmit} onPrev={prevStep} onEdit={goToStep} isSubmitting={isSubmitting} />;
      case 10: return <StepSuccess dict={dict} lang={lang} />;
      case 11: return <StepError dict={dict} onRetry={() => setCurrentStep(9)} />;
      default: return null;
    }
  };

  const isRTL = lang === 'ar';

  return (
    <div className="min-h-screen w-full bg-black text-[var(--color-vaeren-bone)] flex flex-col pt-6 md:pt-12 px-4 md:px-12 relative overflow-hidden font-sans">
      
      {/* Dynamic Master Background */}
      {activeBackground && (
        <ProjectVisualBackground 
          src={activeBackground.src} 
          overlay={activeBackground.overlay} 
          desktopPosition={activeBackground.desktopPosition}
          mobilePosition={activeBackground.mobilePosition}
        />
      )}

      {/* Header */}
      <header className={`flex justify-between items-center w-full z-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <MagneticElement strength={0.2}>
          <a href={`/${lang}`} className="block">
            <img src="/logo.webp" alt="Vaeren Studios" className="h-6 object-contain" />
          </a>
        </MagneticElement>
        
        <div className="hidden md:block">
          {currentStep > 0 && currentStep < 10 && (
            <ProjectProgress stepId={currentStep} isRTL={isRTL} dict={dict} />
          )}
        </div>
        <div className="w-6 hidden md:block"></div> {/* Spacer for balance */}
      </header>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl mx-auto py-12" ref={contentRef}>
        {renderStep()}
      </div>
    </div>
  );
}
