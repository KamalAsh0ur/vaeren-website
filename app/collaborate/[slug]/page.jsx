import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/lib/services';
import FooterSection from '@/components/FooterSection';
import Cursor from '@/components/Cursor';
import MenuOverlay from '@/components/MenuOverlay'; // Check if this exists, actually we might not need it if layout has it, wait, layout.jsx doesn't have a nav. I will just render what I can.

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

  const title = `${service.title} | Vaeren Studios`;
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
    "name": service.title,
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

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start mt-auto">
          <span className="text-[#d05c35] text-xl md:text-2xl font-medium tracking-widest mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            {service.id} — COLLABORATION
          </span>
          <h1 className="type-h1 text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <span className="block text-[var(--color-vaeren-concrete)]">{service.hero.subtitle}</span>
            <span className="block text-white">{service.hero.title}</span>
          </h1>
          <p className="type-body text-xl text-[var(--color-vaeren-concrete)] max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            {service.description}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left Column: sticky index or visual anchor */}
        <div className="lg:col-span-4 hidden lg:flex flex-col relative">
          <div className="sticky top-32 flex flex-col gap-12">
             <div>
               <h3 className="type-meta text-[var(--color-vaeren-ash)] mb-6">Service Area</h3>
               <h2 className="type-h2 text-3xl">{service.title}</h2>
             </div>
             
             <div>
                <h3 className="type-meta text-[var(--color-vaeren-ash)] mb-6">Capabilities</h3>
                <ul className="flex flex-col gap-3">
                  {service.whatWeDo.map((item, idx) => (
                    <li key={idx} className="type-body text-[var(--color-vaeren-concrete)] flex items-start">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d05c35] block shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

        {/* Right Column: Detailed content */}
        <div className="lg:col-span-8 flex flex-col gap-24 md:gap-32">
           
           {/* Mobile Capabilities (only shown on small screens) */}
           <div className="lg:hidden">
              <h2 className="type-h2 text-3xl mb-8">Capabilities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.whatWeDo.map((item, idx) => (
                  <li key={idx} className="type-body text-[var(--color-vaeren-concrete)] flex items-start border-b border-white/10 pb-4">
                    <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d05c35] block shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
           </div>

           {/* Selected Work Image */}
           <div className="w-full overflow-hidden relative aspect-video bg-[#050505]">
              <img 
                src={service.image} 
                alt={`${service.title} Work Sample`}
                className="w-full h-full object-cover"
              />
           </div>

           {/* Deliverables */}
           <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-white/10 pt-16">
              <div className="md:w-1/3 shrink-0">
                <h2 className="type-h3 text-2xl">Deliverables</h2>
              </div>
              <div className="md:w-2/3">
                <p className="type-body text-lg leading-relaxed text-[var(--color-vaeren-concrete)]">
                  {service.whatWeCanDeliver}
                </p>
              </div>
           </div>

           {/* Process */}
           <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-white/10 pt-16">
              <div className="md:w-1/3 shrink-0">
                <h2 className="type-h3 text-2xl">Process</h2>
              </div>
              <div className="md:w-2/3">
                <p className="type-body text-lg leading-relaxed text-[var(--color-vaeren-concrete)]">
                  {service.process}
                </p>
              </div>
           </div>

           {/* Case Studies */}
           <div className="flex flex-col gap-12 border-t border-white/10 pt-16">
              <h2 className="type-h3 text-2xl">Relevant Case Studies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {service.caseStudies.map((study, idx) => (
                   <Link key={idx} href={study.link} className="group block p-8 border border-white/10 bg-[#050505] hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                      <div className="type-meta text-[var(--color-vaeren-ash)] mb-4">View Project</div>
                      <h3 className="type-body text-xl font-medium group-hover:text-white transition-colors">{study.name}</h3>
                      <div className="mt-8 flex justify-end">
                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </div>
                   </Link>
                 ))}
              </div>
           </div>

        </div>
      </div>

      {/* CTA Footer Section */}
      <FooterSection />
    </main>
  );
}
