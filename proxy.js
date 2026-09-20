import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

function getLocale(request) {
  // 1. Check cookie first (user's explicit preference)
  const cookieLocale = request.cookies.get('VAEREN_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Negotiate from Accept-Language header
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  
  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, static files, API routes, and assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/logo') ||
    pathname.startsWith('/og-') ||
    pathname.startsWith('/drop') ||
    pathname.startsWith('/bolor') ||
    pathname.startsWith('/social') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/favicon') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.pdf') ||
    pathname.endsWith('.mp4') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.txt')
  ) {
    return;
  }

  // Check if path already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale-prefixed path, preserving query params (UTMs)
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon\\.png|logo\\.webp|og-image\\.webp).*)',
  ],
};
