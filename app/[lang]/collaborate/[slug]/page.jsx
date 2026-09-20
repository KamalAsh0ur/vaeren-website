import { notFound } from 'next/navigation';
import { services } from '@/lib/services';
import { getDictionary, hasLocale } from '../../dictionaries';
import Cursor from '@/components/Cursor';
import {
  ServiceHero,
  WorkShowcase,
  ImageBlock,
  PositioningStatement,
  EditorialCapabilities,
  MinimalProcess,
  DeepCaseStudy,
  ConversationalCTA
} from '@/components/services/ServiceBlocks';
import { locales } from '../../dictionaries';

export function generateStaticParams() {
  const params = [];
  services.forEach((service) => {
    locales.forEach((lang) => {
      params.push({ slug: service.slug, lang });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  
  // Array find since services is now an array
  const service = services.find(s => s.slug === slug);
  
  if (!service || !hasLocale(lang)) {
    return {
      title: 'Service Not Found | Vaeren Studios',
      description: 'The requested collaboration service could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const data = service[lang];
  const title = `${data.title.replace('\n', ' ')} | Vaeren Studios`;
  
  return {
    title,
    description: data.heroBody,
    alternates: { 
      canonical: `https://vaerenstudios.com/${lang}/collaborate/${service.slug}`,
      languages: {
        en: `/en/collaborate/${service.slug}`,
        ar: `/ar/collaborate/${service.slug}`
      }
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: data.heroBody,
      url: `https://vaerenstudios.com/${lang}/collaborate/${service.slug}`,
      siteName: 'Vaeren Studios',
      images: [ { url: service.heroImage, width: 1200, height: 630, alt: title } ],
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: data.heroBody,
      images: [service.heroImage],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug, lang } = await params;
  
  if (!hasLocale(lang)) notFound();
  
  const dict = await getDictionary(lang);
  const service = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  const data = service[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title.replace('\n', ' '),
    "provider": { "@type": "Organization", "name": "Vaeren Studios", "url": `https://vaerenstudios.com/${lang}` },
    "description": data.heroBody,
    "url": `https://vaerenstudios.com/${lang}/collaborate/${service.slug}`,
  };

  // We are currently mocking the case study data for all services since they are hardcoded in the old component.
  // In a real database, this would be attached to the service object.
  const getMockCaseStudy = (slug, dict) => {
    if (slug === 'design-with-us') {
       return {
         title: 'Bolor \u2014 \nInaugural Collection',
         project: 'Bolor',
         scope: [dict.selectedWork.labels.patternGrading, dict.selectedWork.labels.technicalFlats, dict.selectedWork.labels.pomSpec, 'TECH PACKS'],
         images: [
           { src: '/drop1/pattern-spec.webp', caption: dict.selectedWork.labels.patternGrading, full: false },
           { src: '/drop2/flats.webp', caption: dict.selectedWork.labels.technicalFlats, full: false },
         ],
         link: 'bolor'
       };
    }
    if (slug === 'build-the-world' || slug === 'launch-with-us') {
       return {
         title: 'Collection 02 \u2014 \nCampaign & Launch',
         project: 'Collection 02',
         scope: ['ART DIRECTION', 'PHOTOGRAPHY', 'E-COMMERCE', 'PAID MEDIA'],
         images: [
           { src: '/drop2/campaign.webp', caption: 'CAMPAIGN', full: true },
           { src: '/drop2/shot3.webp', caption: 'LOOKBOOK', full: false },
           { src: '/drop2/shot2.webp', caption: 'LOOKBOOK', full: false }
         ],
         link: 'drop2'
       };
    }
    if (slug === 'create-together') {
       return {
         title: 'Collection 01 \u2014 \nBrand & Product',
         project: 'Collection 01',
         scope: ['BRAND IDENTITY', 'PRODUCT DESIGN', 'CAMPAIGN', 'WEB DESIGN'],
         images: [
           { src: '/drop1/shot1.webp', caption: 'CAMPAIGN', full: false },
           { src: '/drop1/shot2.webp', caption: 'LOOKBOOK', full: false },
           { src: '/drop1/pom-spec.webp', caption: dict.selectedWork.labels.pomSpec, full: true }
         ],
         link: 'drop1'
       };
    }
    return null;
  };

  const caseStudy = getMockCaseStudy(slug, dict);

  return (
    <main className="bg-black min-h-screen text-white relative z-10 selection:bg-[var(--color-vaeren-concrete)] selection:text-black">
      <Cursor />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <ServiceHero hero={data} lang={lang} />
      
      {slug === 'something-else' ? (
        <PositioningStatement statement={data.positioningTitle} description={data.positioningBody} />
      ) : (
        <WorkShowcase>
           <ImageBlock src={service.heroImage} lang={lang} full={true} aspect="aspect-video" />
        </WorkShowcase>
      )}

      {slug !== 'something-else' && (
        <PositioningStatement statement={data.positioningTitle} description={data.positioningBody} />
      )}

      <EditorialCapabilities capabilities={data.capabilities} dict={dict} />
      <MinimalProcess steps={data.process} dict={dict} />
      <DeepCaseStudy study={caseStudy} dict={dict} lang={lang} />
      <ConversationalCTA dict={dict} lang={lang} serviceTitle={data.title.replace('\n', ' ')} />
    </main>
  );
}
