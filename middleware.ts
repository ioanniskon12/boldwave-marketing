import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ACCESS_KEY = 'owl2024';

// Disable protection only for December 15, 2024
const isProtectionDisabled = () => {
  const now = new Date();
  const disableDate = new Date('2024-12-15');
  return now.toDateString() === disableDate.toDateString();
};

export function middleware(request: NextRequest) {
  // Temporarily allow all access for today only
  if (isProtectionDisabled()) {
    return NextResponse.next();
  }

  // Skip for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname === '/coming-soon'
  ) {
    return NextResponse.next();
  }

  // Check for access parameter in URL or cookie
  const urlKey = request.nextUrl.searchParams.get('access');
  const cookieKey = request.cookies.get('site-access')?.value;

  // If URL has the key, set cookie and continue
  if (urlKey === ACCESS_KEY) {
    const response = NextResponse.next();
    response.cookies.set('site-access', ACCESS_KEY, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }

  // If cookie has the key, continue
  if (cookieKey === ACCESS_KEY) {
    return NextResponse.next();
  }

  // Otherwise redirect to coming soon page
  return NextResponse.redirect(new URL('/coming-soon', request.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
