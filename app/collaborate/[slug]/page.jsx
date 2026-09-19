import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/lib/services';
import FooterSection from '@/components/FooterSection';
import Cursor from '@/components/Cursor';

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const service = services[params.slug];
  
  if (!service) {
    return {
      title: 'Service Not Found | Vaeren Studios',
      description: 'The requested collaboration service could not be found.',
      robots: {
        index: false,
        follow: false,
      }
    };
  }

  const title = `${service.catalogTitle || service.title} | Vaeren Studios`;
  const description = service.description;
  const canonicalUrl = `https://vaerenstudios.com/collaborate/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Vaeren Studios',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} — Vaeren Studios`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.image],
    },
  };
}

export default function ServicePage({ params }) {
  const service = services[params.slug];

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.catalogTitle || service.title,
    "provider": {
      "@type": "Organization",
      "name": "Vaeren Studios",
      "url": "https://vaerenstudios.com"
    },
    "description": service.description,
    "url": `https://vaerenstudios.com/collaborate/${service.slug}`,
    "image": `https://vaerenstudios.com${service.image}`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <main className="bg-black min-h-screen text-white relative z-10 selection:bg-[var(--color-vaeren-concrete)] selection:text-black">
      <Cursor />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-auto">
          <span className="text-[#d05c35] text-xl md:text-2xl font-medium tracking-widest mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 uppercase">
            {service.catalogTitle}
          </span>
          <h1 className="type-h1 text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <span className="block text-[var(--color-vaeren-concrete)]">{service.hero.subtitle}</span>
            <span className="block text-white">{service.hero.title}</span>
          </h1>
          <p className="type-body text-xl text-[var(--color-vaeren-concrete)] max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            {service.description}
          </p>
        </div>
      </section>

      {/* 2. PROOF OF WORK (Selected Work Image) */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
         <div className="w-full overflow-hidden relative aspect-video bg-[#050505] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <img 
              src={service.image} 
              alt={`${service.title} Work Sample`}
              className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
            />
         </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="md:w-1/3 shrink-0">
            <h2 className="type-meta text-[#d05c35] mb-4 tracking-widest uppercase">What We Do</h2>
            <h3 className="type-h2 text-4xl mb-8">Capabilities</h3>
          </div>
          <div className="md:w-2/3 flex flex-col gap-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {service.whatWeDo.map((item, idx) => (
                <li key={idx} className="type-body text-lg text-[var(--color-vaeren-bone)] flex items-start">
                  <span className="mr-4 mt-2 w-1.5 h-1.5 rounded-full bg-[#d05c35] block shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="pt-12 border-t border-white/10">
              <h4 className="type-h3 text-2xl mb-6">What We Can Deliver</h4>
              <p className="type-body text-xl leading-relaxed text-[var(--color-vaeren-concrete)]">
                {service.whatWeCanDeliver}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="md:w-1/3 shrink-0">
            <h2 className="type-meta text-[#d05c35] mb-4 tracking-widest uppercase">How We Work</h2>
            <h3 className="type-h2 text-4xl mb-8">Process</h3>
          </div>
          <div className="md:w-2/3">
            <p className="type-body text-xl leading-relaxed text-[var(--color-vaeren-concrete)]">
              {service.process}
            </p>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/10">
        <div className="mb-12">
          <h2 className="type-meta text-[#d05c35] mb-4 tracking-widest uppercase">Proof</h2>
          <h3 className="type-h2 text-4xl">Relevant Case Studies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.caseStudies.map((study, idx) => (
              <Link key={idx} href={study.link} className="group block p-10 border border-white/10 bg-[#050505] hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                <div className="type-meta text-[var(--color-vaeren-ash)] mb-6 tracking-widest uppercase">View Project</div>
                <h4 className="type-h3 text-2xl group-hover:text-white transition-colors">{study.name}</h4>
                <div className="mt-12 flex justify-end">
                  <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* 6. CTA (Reusing FooterSection which has the Start A Project CTA) */}
      <FooterSection />
    </main>
  );
}
