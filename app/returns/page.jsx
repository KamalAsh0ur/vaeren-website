import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Returns & Cancellations | Vaeren Studios',
  description: 'Vaeren Studios policies regarding service cancellations and project returns.',
};

export default function ReturnsPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-vaeren-void)] text-[var(--color-vaeren-bone)] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="mb-16">
          <Link href="/" className="type-meta text-[var(--color-vaeren-ash)] hover:text-white transition-colors tracking-widest uppercase">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="type-h1 text-5xl md:text-6xl mb-12 text-white">Returns & Cancellations</h1>
        
        <div className="space-y-8 type-body text-lg text-[var(--color-vaeren-ash)] leading-relaxed">
          
          <div className="bg-[#d05c35]/10 border border-[#d05c35]/20 p-6 md:p-8 mb-12">
            <p className="text-white">
              <strong>Notice:</strong> Vaeren Studios is a B2B creative and technical development studio. We provide custom services, strategy, and physical product development for brands. We do not sell retail consumer goods through this website. Therefore, standard e-commerce return policies do not apply to our work.
            </p>
          </div>

          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">1. Custom Creative Services</h2>
            <p>
              Because our services (including creative direction, campaign photography, brand identity, and technical garment design) are entirely bespoke and require the allocation of highly specialized talent and studio time, all executed services are non-refundable. 
            </p>
          </section>

          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">2. Project Cancellations & Deposits</h2>
            <p>
              We operate on a milestone and contract basis. Before any project begins, a formal scope of work and contract is signed, which details the cancellation terms specific to your build. In general:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Initial project deposits are strictly non-refundable once creative or development work has commenced.</li>
              <li>If a project is cancelled by the client mid-development, the client is responsible for paying for all milestones completed and out-of-pocket production expenses incurred up to the date of cancellation.</li>
            </ul>
          </section>

          <section>
            <h2 className="type-meta text-white tracking-widest uppercase text-sm mb-4">3. Physical Prototypes & Samples</h2>
            <p>
              For clients utilizing our "Design With Us" or physical product development services, samples and prototypes are produced for review and iteration. These are bespoke developmental assets and cannot be "returned" for a refund. Any physical manufacturing defects during a full production run are handled according to the specific manufacturing agreement signed prior to bulk production.
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
