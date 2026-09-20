import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '../dictionaries';
import Cursor from '../../../components/Cursor';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.privacy.title} | Vaeren Studios`,
    robots: { index: false, follow: true }
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="bg-[var(--color-vaeren-void)] min-h-screen text-[var(--color-vaeren-bone)] selection:bg-[var(--color-vaeren-concrete)] selection:text-[var(--color-vaeren-void)] relative z-10 px-6 md:px-12 py-32 md:py-48">
      <Cursor />
      
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}`} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white transition-colors underline underline-offset-4 mb-16 inline-block">
          &larr; {dict.privacy.backToHome}
        </Link>
        
        <h1 className="type-h1 mb-16">{dict.privacy.title}</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="type-h3 mb-4">{dict.privacy.section1Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed">
              {dict.privacy.section1Body}
            </p>
          </section>

          <section>
            <h2 className="type-h3 mb-4">{dict.privacy.section2Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed">
              {dict.privacy.section2Body}
            </p>
          </section>

          <section>
            <h2 className="type-h3 mb-4">{dict.privacy.section3Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed">
              {dict.privacy.section3Body}
            </p>
          </section>

          <section>
            <h2 className="type-h3 mb-4">{dict.privacy.section4Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed">
              {dict.privacy.section4Body}
            </p>
          </section>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 type-meta text-[var(--color-vaeren-ash)]">
          <p className="mb-2">{dict.privacy.lastUpdated}</p>
          <p>{dict.privacy.contactEmail}</p>
        </div>
      </div>
    </main>
  );
}
