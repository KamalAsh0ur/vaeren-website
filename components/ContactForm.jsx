'use client';

import React, { useState } from 'react';
import MagneticElement from './MagneticElement';

export default function ContactForm() {
  const [status, setStatus] = useState(''); // 'idle', 'submitting', 'success', 'error'

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
        <h3 className="type-h3 mb-4">Request Sent.</h3>
        <p className="type-body text-[var(--color-vaeren-ash)]">We'll review your brief and get back to you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm uppercase tracking-widest text-[var(--color-vaeren-concrete)] hover:text-white transition-colors underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col gap-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="type-meta text-[var(--color-vaeren-ash)]">Name / Brand</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20"
            placeholder="Vaeren Studios"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="type-meta text-[var(--color-vaeren-ash)]">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            className="bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20"
            placeholder="hello@vaeren.com"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="project" className="type-meta text-[var(--color-vaeren-ash)]">Project Type</label>
        <select 
          id="project" 
          name="project"
          className="bg-black border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors appearance-none rounded-none"
        >
          <option value="design">Design Collaboration</option>
          <option value="campaign">Campaign / Art Direction</option>
          <option value="full">Full Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="message" className="type-meta text-[var(--color-vaeren-ash)]">Brief Description</label>
        <textarea 
          id="message" 
          name="message" 
          required
          rows={4}
          className="bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-white transition-colors resize-none rounded-none placeholder:text-white/20"
          placeholder="Tell us what you're building..."
        />
      </div>

      {status === 'error' && (
        <div className="text-red-400 type-meta mt-2">There was a problem sending your message. Please try again or use the email link.</div>
      )}

      <div className="mt-8 flex justify-center">
        <MagneticElement strength={0.2}>
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="btn-primary"
            data-cursor-text={status === 'submitting' ? 'WAIT' : 'SEND'}
          >
            {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'} <span className="arrow ml-2">&rarr;</span>
          </button>
        </MagneticElement>
      </div>
    </form>
  );
}
