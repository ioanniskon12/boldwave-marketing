import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ACCESS_KEY = 'owl2024';
const ADMIN_SECRET_KEY = 'owladmin2024'; // Secret key to access admin panel

// TEMPORARILY DISABLED until December 16, 2025 midnight UTC
const PROTECTION_DISABLED_UNTIL = new Date('2025-12-16T00:00:00Z');

export async function middleware(request: NextRequest) {
  // Handle admin routes with Supabase auth
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for admin secret key - must have ?key=owladmin2024 or admin-access cookie
    const adminKey = request.nextUrl.searchParams.get('key');
    const adminCookie = request.cookies.get('admin-access')?.value;

    // If secret key is provided in URL, set cookie and continue
    if (adminKey === ADMIN_SECRET_KEY) {
      let response = NextResponse.next({ request });
      response.cookies.set('admin-access', ADMIN_SECRET_KEY, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      // Still need to check Supabase auth after setting cookie
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();

      if (request.nextUrl.pathname === '/admin/login') {
        if (user) {
          response = NextResponse.redirect(new URL('/admin', request.url));
          response.cookies.set('admin-access', ADMIN_SECRET_KEY, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
        }
        return response;
      }

      if (!user) {
        response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.set('admin-access', ADMIN_SECRET_KEY, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        });
      }
      return response;
    }

    // If no valid admin access, return 404
    if (adminCookie !== ADMIN_SECRET_KEY) {
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    // Has cookie, proceed with Supabase auth check
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
