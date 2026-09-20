import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Vaeren Studios',
  description: 'How Vaeren Studios handles and protects your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-vaeren-void)] text-[var(--color-vaeren-bone)] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="mb-16">
          <Link href="/" className="type-meta text-[var(--color-vaeren-ash)] hover:text-white transition-colors tracking-widest uppercase">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="type-h1 text-5xl md:text-6xl mb-12 text-white">Privacy Policy</h1>
        
        <div className="space-y-8 type-body text-lg text-[var(--color-vaeren-ash)] leading-relaxed">
          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">1. Data Collection</h2>
            <p>
              When you submit a project inquiry through our website, we collect your name, email address, brand name, and the project details you provide. This information is securely transmitted to our studio inbox via our form processing partner (Formspree) and is used exclusively to evaluate and respond to your collaboration request.
            </p>
          </section>

          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">2. Analytics & Tracking</h2>
            <p>
              We use standard web analytics and the Meta Pixel (including the Conversions API) to understand how visitors interact with our website and to measure the effectiveness of our creative campaigns. This tracking helps us attribute project inquiries to specific marketing efforts. 
            </p>
          </section>

          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">3. Data Sharing</h2>
            <p>
              Vaeren Studios is a private creative practice. We do not sell, rent, or lease your personal information, project briefs, or brand ideas to any third parties. Your data is shared only with the internal team and necessary service providers (like email hosts) required to operate our studio.
            </p>
          </section>

          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">4. Your Rights</h2>
            <p>
              If you wish to review, update, or request the deletion of your personal information from our inquiry database, please contact us directly.
            </p>
          </section>
          
          <section className="pt-8 border-t border-white/10 mt-16">
            <p className="type-meta text-sm uppercase tracking-widest text-[var(--color-vaeren-concrete)]">
              Last Updated: September 2026<br/>
              Contact: hello@vaeren.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
