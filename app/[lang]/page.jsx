import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import CanvasSequence from '../../components/CanvasSequence';
import OverlayUI from '../../components/OverlayUI';
import Cursor from '../../components/Cursor';
import PhilosophySection from '../../components/PhilosophySection';
import SelectedWorkSection from '../../components/SelectedWorkSection';
import ArchiveLoopSection from '../../components/ArchiveLoopSection';
import CollaborationSection from '../../components/CollaborationSection';
import SocialSection from '../../components/SocialSection';
import FooterSection from '../../components/FooterSection';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: lang === 'ar' ? 'Vaeren Studios | شريك إبداعي لعلامات الأزياء' : 'Vaeren Studios | Creative Partner for Streetwear Brands',
    description: dict.hero.description,
    openGraph: {
      title: lang === 'ar' ? 'Vaeren Studios | شريك إبداعي لعلامات الأزياء' : 'Vaeren Studios | Creative Partner for Streetwear Brands',
      description: dict.hero.description,
      url: `https://vaerenstudios.com/${lang}`,
      images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Vaeren Studios' }],
    },
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="relative w-full bg-black min-h-screen">
      <Cursor />
      
      {/* 8000px spacer for the sticky cinematic sequence */}
      <div id="sequence-spacer" className="relative w-full h-[8000px] bg-black">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <CanvasSequence>
            <OverlayUI dict={dict} lang={lang} />
          </CanvasSequence>
        </div>
      </div>
      
      {/* Philosophy acts as the curtain reveal overlapping the hero */}
      <div className="relative z-20 -mt-[100vh]">
         <PhilosophySection dict={dict} />
      </div>

      {/* Case Studies / Work Portfolio */}
      <SelectedWorkSection dict={dict} lang={lang} />

      {/* Archive Infinite Loop */}
      <ArchiveLoopSection dict={dict} />

      {/* Collaboration Models */}
      <CollaborationSection dict={dict} lang={lang} />

      {/* The Instagram infinite marquee feed */}
      <SocialSection dict={dict} />

      {/* Final Call to Action */}
      <FooterSection dict={dict} lang={lang} />
    </main>
  );
}
