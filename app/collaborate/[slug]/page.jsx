import { notFound } from 'next/navigation';
import { services } from '@/lib/services';
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

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services[slug];
  
  if (!service) {
    return {
      title: 'Service Not Found | Vaeren Studios',
      description: 'The requested collaboration service could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const title = `${service.catalogTitle || service.title} | Vaeren Studios`;
  return {
    title,
    description: service.hero.sentence,
    alternates: { canonical: `https://vaerenstudios.com/collaborate/${service.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: service.hero.sentence,
      url: `https://vaerenstudios.com/collaborate/${service.slug}`,
      siteName: 'Vaeren Studios',
      images: [ { url: service.workImages[0]?.src || '', width: 1200, height: 630, alt: service.title } ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.hero.sentence,
      images: [service.workImages[0]?.src || ''],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const data = services[slug];

  if (!data) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.catalogTitle || data.title,
    "provider": { "@type": "Organization", "name": "Vaeren Studios", "url": "https://vaerenstudios.com" },
    "description": data.hero.sentence,
    "url": `https://vaerenstudios.com/collaborate/${data.slug}`,
  };

  return (
    <main className="bg-black min-h-screen text-white relative z-10 selection:bg-[var(--color-vaeren-concrete)] selection:text-black">
      <Cursor />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {slug === 'design-with-us' && <DesignWithUsPage data={data} />}
      {slug === 'build-the-world' && <BuildTheWorldPage data={data} />}
      {slug === 'create-together' && <CreateTogetherPage data={data} />}
      {slug === 'launch-with-us' && <LaunchWithUsPage data={data} />}
      {slug === 'something-else' && <SomethingElsePage data={data} />}
    </main>
  );
}

function DesignWithUsPage({ data }) {
  return (
    <>
      <ServiceHero hero={data.hero} />
      <WorkShowcase>
        {data.workImages.map((img, i) => (
            <ImageBlock key={i} src={img.src} caption={img.caption} full={img.full} aspect={img.aspect} />
        ))}
      </WorkShowcase>
      <PositioningStatement statement={data.positioning} description={data.positioningDescription} />
      <EditorialCapabilities capabilities={data.capabilities} />
      <DeepCaseStudy study={data.caseStudy} />
      <MinimalProcess steps={data.process} />
      <ConversationalCTA prompt={data.cta.prompt} ctaText={data.cta.button} />
    </>
  );
}

function BuildTheWorldPage({ data }) {
  return (
    <>
      <ServiceHero hero={data.hero} />
      <WorkShowcase>
        {data.workImages.map((img, i) => (
            <ImageBlock key={i} src={img.src} caption={img.caption} full={img.full} aspect={img.aspect} />
        ))}
      </WorkShowcase>
      <DeepCaseStudy study={data.caseStudy} />
      <PositioningStatement statement={data.positioning} description={data.positioningDescription} />
      <EditorialCapabilities capabilities={data.capabilities} />
      <MinimalProcess steps={data.process} />
      <ConversationalCTA prompt={data.cta.prompt} ctaText={data.cta.button} />
    </>
  );
}

function CreateTogetherPage({ data }) {
  return (
    <>
      <ServiceHero hero={data.hero} />
      <WorkShowcase>
        {data.workImages.map((img, i) => (
            <ImageBlock key={i} src={img.src} caption={img.caption} full={img.full} aspect={img.aspect} />
        ))}
      </WorkShowcase>
      <PositioningStatement statement={data.positioning} description={data.positioningDescription} />
      <MinimalProcess steps={data.process} />
      <DeepCaseStudy study={data.caseStudy} />
      <EditorialCapabilities capabilities={data.capabilities} />
      <ConversationalCTA prompt={data.cta.prompt} ctaText={data.cta.button} />
    </>
  );
}

function LaunchWithUsPage({ data }) {
  return (
    <>
      <ServiceHero hero={data.hero} />
      <WorkShowcase>
        {data.workImages.map((img, i) => (
            <ImageBlock key={i} src={img.src} caption={img.caption} full={img.full} aspect={img.aspect} />
        ))}
      </WorkShowcase>
      <PositioningStatement statement={data.positioning} description={data.positioningDescription} />
      <EditorialCapabilities capabilities={data.capabilities} />
      <MinimalProcess steps={data.process} />
      <DeepCaseStudy study={data.caseStudy} />
      <ConversationalCTA prompt={data.cta.prompt} ctaText={data.cta.button} />
    </>
  );
}

function SomethingElsePage({ data }) {
  return (
    <>
      <ServiceHero hero={data.hero} />
      <PositioningStatement statement={data.positioning} description={data.positioningDescription} />
      <WorkShowcase>
        <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] mx-auto px-4 md:px-12 mb-16">
           <div className="w-full md:w-1/3 mt-0 md:mt-32">
             <ImageBlock src={data.workImages[1].src} caption={data.workImages[1].caption} aspect="aspect-square" full={true} />
           </div>
           <div className="w-full md:w-2/3">
             <ImageBlock src={data.workImages[0].src} caption={data.workImages[0].caption} aspect="aspect-[4/3]" full={true} />
           </div>
        </div>
        <ImageBlock src={data.workImages[2].src} caption={data.workImages[2].caption} full={false} aspect="aspect-video" />
      </WorkShowcase>
      <EditorialCapabilities capabilities={data.capabilities} />
      <DeepCaseStudy study={data.caseStudy} />
      <ConversationalCTA prompt={data.cta.prompt} ctaText={data.cta.button} />
    </>
  );
}
