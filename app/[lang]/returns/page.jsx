import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '../dictionaries';
import Cursor from '../../../components/Cursor';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.returns.title} | Vaeren Studios`,
    robots: { index: false, follow: true }
  };
}

export default async function ReturnsPolicyPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="bg-[var(--color-vaeren-void)] min-h-screen text-[var(--color-vaeren-bone)] selection:bg-[var(--color-vaeren-concrete)] selection:text-[var(--color-vaeren-void)] relative z-10 px-6 md:px-12 py-32 md:py-48">
      <Cursor />
      
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}`} className="type-meta text-[var(--color-vaeren-concrete)] hover:text-white transition-colors underline underline-offset-4 mb-16 inline-block">
          &larr; {dict.returns.backToHome}
        </Link>
        
        <h1 className="type-h1 mb-16">{dict.returns.title}</h1>

        <div className="bg-[#d05c35]/10 border border-[#d05c35]/30 p-8 mb-16">
          <p className="type-body text-[#d05c35] leading-relaxed font-medium">
             {dict.returns.notice}
          </p>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="type-h3 mb-4">{dict.returns.section1Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed">
              {dict.returns.section1Body}
            </p>
          </section>

          <section>
            <h2 className="type-h3 mb-4">{dict.returns.section2Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed mb-4">
              {dict.returns.section2Body}
            </p>
            <ul className="list-disc list-outside ml-6 type-body text-[var(--color-vaeren-ash)] space-y-4">
               {dict.returns.section2List.map((item, idx) => (
                 <li key={idx} className="leading-relaxed pl-2">{item}</li>
               ))}
            </ul>
          </section>

          <section>
            <h2 className="type-h3 mb-4">{dict.returns.section3Title}</h2>
            <p className="type-body text-[var(--color-vaeren-ash)] leading-relaxed">
              {dict.returns.section3Body}
            </p>
          </section>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 type-meta text-[var(--color-vaeren-ash)]">
          <p className="mb-2">{dict.returns.lastUpdated}</p>
          <p>{dict.returns.contactEmail}</p>
        </div>
      </div>
    </main>
  );
}
