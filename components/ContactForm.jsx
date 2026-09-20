'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MagneticElement from './MagneticElement';

export default function ContactForm({ dict, lang, serviceName = 'General Inquiry' }) {
  const [status, setStatus] = useState(''); // 'idle', 'submitting', 'success', 'error'
  const searchParams = useSearchParams();
  const isRTL = lang === 'ar';
  const arrow = isRTL ? '\u2190' : '\u2192';
  
  const utmSource = searchParams.get('utm_source') || '';
  const utmMedium = searchParams.get('utm_medium') || '';
  const utmCampaign = searchParams.get('utm_campaign') || '';
  const utmContent = searchParams.get('utm_content') || '';
  const utmTerm = searchParams.get('utm_term') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'moeqnakl';
    if (!formspreeId) {
      console.error('Formspree ID is missing');
      setStatus('error');
      return;
    }

    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        
        // Fire Meta Pixel Lead Event
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Project Inquiry',
            currency: 'USD'
          });
        }
        
        // Fire Server-Side CAPI Lead Event
        if (typeof window !== 'undefined') {
          fetch('/api/meta-capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'Lead',
              sourceUrl: window.location.href,
              customData: {
                content_name: 'Project Inquiry',
                currency: 'USD'
              }
            })
          }).catch(err => console.error('CAPI proxy error:', err));
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
        <h3 className="type-h3 mb-4">{dict.contact.successTitle}</h3>
        <p className="type-body text-[var(--color-vaeren-ash)]">{dict.contact.successBody}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm uppercase tracking-widest text-[var(--color-vaeren-concrete)] hover:text-white transition-colors underline underline-offset-4"
        >
          {dict.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto flex flex-col gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      <input type="hidden" name="utm_source" value={utmSource} />
      <input type="hidden" name="utm_medium" value={utmMedium} />
      <input type="hidden" name="utm_campaign" value={utmCampaign} />
      <input type="hidden" name="utm_content" value={utmContent} />
      <input type="hidden" name="utm_term" value={utmTerm} />
      <input type="hidden" name="service" value={serviceName} />
      <input type="hidden" name="language" value={lang} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="type-meta text-[var(--color-vaeren-ash)]">{dict.contact.nameLabel}</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20"
            placeholder={dict.contact.namePlaceholder}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="type-meta text-[var(--color-vaeren-ash)]">{dict.contact.emailLabel}</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            className="bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20"
            placeholder={dict.contact.emailPlaceholder}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="project" className="type-meta text-[var(--color-vaeren-ash)]">{dict.contact.projectLabel}</label>
        <select 
          id="project" 
          name="project"
          className={`bg-black border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors appearance-none rounded-none ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <option value="">{dict.contact.projectOptions.discuss}</option>
          <option value="design">{dict.contact.projectOptions.design}</option>
          <option value="campaign">{dict.contact.projectOptions.campaign}</option>
          <option value="full">{dict.contact.projectOptions.full}</option>
          <option value="other">{dict.contact.projectOptions.other}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="message" className="type-meta text-[var(--color-vaeren-ash)]">{dict.contact.messageLabel}</label>
        <textarea 
          id="message" 
          name="message" 
          required
          rows={4}
          className="bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors resize-none rounded-none placeholder:text-white/20"
          placeholder={dict.contact.messagePlaceholder}
        />
      </div>

      {status === 'error' && (
        <div className="text-red-400 type-meta mt-2">{dict.contact.errorMessage}</div>
      )}

      <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8 border-t border-white/10 pt-8">
        <MagneticElement strength={0.2}>
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className={`btn-primary flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
            data-cursor-text={status === 'submitting' ? 'WAIT' : 'SEND'}
          >
            {status === 'submitting' ? dict.contact.submitting : dict.contact.submitButton} <span className={`arrow ${isRTL ? 'mr-2' : 'ml-2'}`}>{arrow}</span>
          </button>
        </MagneticElement>

        <div className={`text-center md:text-left flex flex-col gap-2 ${isRTL ? 'md:text-right md:items-start' : 'md:items-start'}`}>
          <span className="type-meta text-[var(--color-vaeren-ash)]">{dict.contact.preferChat}</span>
          <a href="https://wa.me/201234567890?text=I'm%20interested%20in%20collaborating%20with%20Vaeren%20Studios" target="_blank" rel="noopener noreferrer" className={`type-meta text-[var(--color-vaeren-concrete)] underline underline-offset-4 hover:text-[var(--color-vaeren-bone)] transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`} data-cursor-text="CHAT">
            {dict.contact.whatsapp} <span className={isRTL ? 'mr-1' : 'ml-1'}>{arrow}</span>
          </a>
          
          <span className="type-meta text-[var(--color-vaeren-ash)] mt-2">{dict.contact.notReady}</span>
          <a href="https://www.instagram.com/vaeren.studios/" target="_blank" rel="noopener noreferrer" className={`type-meta text-[var(--color-vaeren-concrete)] underline underline-offset-4 hover:text-[var(--color-vaeren-bone)] transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`} data-cursor-text="FOLLOW">
            {dict.contact.followBuild} <span className={isRTL ? 'mr-1' : 'ml-1'}>{arrow}</span>
          </a>
        </div>
      </div>
    </form>
  );
}
