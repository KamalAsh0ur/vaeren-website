import React from 'react';
import { getDictionary } from '../dictionaries';
import ProjectStarter from '../../../components/project-starter/ProjectStarter';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' }
  ];
}

export default async function StartAProjectPage({ params, searchParams }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const resolvedSearchParams = await searchParams;
  
  if (lang !== 'en' && lang !== 'ar') {
    notFound();
  }
  
  const dict = await getDictionary(lang);
  const service = resolvedSearchParams?.service || null;

  return (
    <main className="bg-black min-h-screen">
      <ProjectStarter dict={dict} lang={lang} preselectedService={service} />
    </main>
  );
}
