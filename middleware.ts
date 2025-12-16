import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ACCESS_KEY = 'owl2024';

// TEMPORARILY DISABLED until December 16, 2025 midnight UTC
const PROTECTION_DISABLED_UNTIL = new Date('2025-12-16T00:00:00Z');

export async function middleware(request: NextRequest) {
  // Handle admin routes with Supabase auth
  if (request.nextUrl.pathname.startsWith('/admin')) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      if (user) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return supabaseResponse;
    }

    // Redirect to login if not authenticated
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return supabaseResponse;
  }

  // Temporarily allow all access until the specified date (for non-admin routes)
  if (new Date() < PROTECTION_DISABLED_UNTIL) {
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
