import { NextRequest, NextResponse } from 'next/server';
import { isValidLanguage, DEFAULT_LANGUAGE } from '@/lib/i18n';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const langParam = searchParams.get('lang');

  // --- 1. Bare root: / -> /en/ ---
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    if (langParam && isValidLanguage(langParam)) {
      url.pathname = `/${langParam}/`;
    } else {
      url.pathname = `/${DEFAULT_LANGUAGE}/`;
    }
    url.searchParams.delete('lang');
    return NextResponse.redirect(url, 308);
  }

  // --- 2. Check if first segment is a valid language ---
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    // Already has a valid lang prefix.
    // If there's still a ?lang= param, strip it (normalize).
    if (langParam) {
      const url = request.nextUrl.clone();
      url.searchParams.delete('lang');
      return NextResponse.redirect(url, 308);
    }
    // Valid lang prefix, no ?lang= — pass through.
    return NextResponse.next();
  }

  // --- 3. No valid lang prefix — this is a legacy URL ---
  // Determine target language from ?lang= or default to 'en'
  const targetLang = (langParam && isValidLanguage(langParam)) ? langParam : DEFAULT_LANGUAGE;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}${pathname}`;
  url.searchParams.delete('lang');
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.webmanifest|og-image.png|images/|robots.txt|sitemap.xml).*)',
  ],
};
