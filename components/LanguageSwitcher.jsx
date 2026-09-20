'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function LanguageSwitcher({ lang }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchLocale = (newLocale) => {
    // Set cookie for persistence
    document.cookie = `VAEREN_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;

    // Replace the current locale prefix with the new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    // Preserve query params (UTMs)
    const params = searchParams.toString();
    const url = params ? `${newPath}?${params}` : newPath;
    
    window.location.href = url;
  };

  return (
    <button
      onClick={() => switchLocale(lang === 'ar' ? 'en' : 'ar')}
      className="type-meta text-[var(--color-vaeren-concrete)] hover:text-[var(--color-vaeren-bone)] transition-colors tracking-widest uppercase text-[10px] md:text-xs py-2 px-3 border border-white/10 hover:border-white/30"
      data-cursor-text="LANG"
      aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      {lang === 'ar' ? 'EN' : 'عربي'}
    </button>
  );
}
