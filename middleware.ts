import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ACCESS_KEY = 'owl2024';
const ADMIN_SECRET_KEY = 'owladmin2024'; // Secret key to access admin panel

// TEMPORARILY DISABLED until December 16, 2025 midnight UTC
const PROTECTION_DISABLED_UNTIL = new Date('2025-12-16T00:00:00Z');

// ============================================
// RATE LIMITING (In-Memory - Free Solution)
// ============================================
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 100; // Max requests per IP per minute
const BLOCK_DURATION = 5 * 60 * 1000; // Block for 5 minutes if exceeded

type RateLimitEntry = {
  count: number;
  firstRequest: number;
  blocked?: boolean;
  blockedUntil?: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Check if IP is blocked
  if (entry?.blocked && entry.blockedUntil && now < entry.blockedUntil) {
    return { allowed: false, remaining: 0 };
  }

  // Reset if window expired
  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  // Increment count
  entry.count++;

  // Check if exceeded
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    entry.blocked = true;
    entry.blockedUntil = now + BLOCK_DURATION;
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}

// ============================================
// BOT DETECTION (Block Malicious Bots)
// ============================================
const BLOCKED_USER_AGENTS = [
  // Malicious bots
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'dotbot',
  'blexbot',
  'dataforseo',
  'serpstatbot',
  'seokicks',
  'petalbot',
  'bytespider',
  'claudebot', // AI scrapers (optional - remove if you want AI indexing)
  'gptbot',
  'ccbot',
  // Scrapers
  'scrapy',
  'python-requests',
  'go-http-client',
  'java/',
  'wget',
  'curl/',
  // Attack tools
  'sqlmap',
  'nikto',
  'nmap',
  'masscan',
  'zgrab',
];

// Known good bots (whitelist)
const ALLOWED_BOTS = [
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
];

function isBlockedBot(userAgent: string | null): boolean {
  if (!userAgent) return false;

  const ua = userAgent.toLowerCase();

  // Allow known good bots
  if (ALLOWED_BOTS.some(bot => ua.includes(bot))) {
    return false;
  }

  // Block known bad bots
  return BLOCKED_USER_AGENTS.some(bot => ua.includes(bot));
}

// ============================================
// REDIRECT CACHE
// ============================================
// Redirect cache to avoid database hits on every request
type RedirectEntry = {
  from_path: string;
  to_path: string;
  redirect_type: number;
  active: boolean;
};

let redirectsCache: RedirectEntry[] | null = null;
let redirectsCacheTime = 0;
const CACHE_TTL = 60 * 1000; // 1 minute cache

async function getRedirects(supabaseUrl: string, supabaseKey: string): Promise<RedirectEntry[]> {
  const now = Date.now();

  // Return cached redirects if still valid
  if (redirectsCache && now - redirectsCacheTime < CACHE_TTL) {
    return redirectsCache;
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/redirects?active=eq.true&select=from_path,to_path,redirect_type,active`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 },
    });

    if (response.ok) {
      redirectsCache = await response.json();
      redirectsCacheTime = now;
      return redirectsCache || [];
    }
  } catch (error) {
    console.error('Error fetching redirects:', error);
  }

  return redirectsCache || [];
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip security checks for static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // ============================================
  // SECURITY CHECK 1: Bot Detection
  // ============================================
  const userAgent = request.headers.get('user-agent');
  if (isBlockedBot(userAgent)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // ============================================
  // SECURITY CHECK 2: Rate Limiting
  // ============================================
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '300', // 5 minutes
        'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
        'X-RateLimit-Remaining': '0',
      },
    });
  }

  // ============================================
  // URL REDIRECTS
  // ============================================
  // Check for URL redirects first (before any other logic)
  // Skip for admin, API, static files
  if (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.includes('.')
  ) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const redirects = await getRedirects(supabaseUrl, supabaseKey);
      const redirect = redirects.find(r => r.from_path === pathname);

      if (redirect) {
        const destination = redirect.to_path.startsWith('http')
          ? redirect.to_path
          : new URL(redirect.to_path, request.url).toString();

        return NextResponse.redirect(destination, {
          status: redirect.redirect_type === 301 ? 301 : 302,
        });
      }
    }
  }
  // Handle demos route - localhost only
  if (request.nextUrl.pathname.startsWith('/demos')) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
    return NextResponse.next();
  }

  // Handle admin routes with Supabase auth
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for admin secret key - must have ?key=owladmin2024 or admin-access cookie
    const adminKey = request.nextUrl.searchParams.get('key');
    const adminCookie = request.cookies.get('admin-access')?.value;

    // If secret key is provided in URL, set cookie and continue
    if (adminKey === ADMIN_SECRET_KEY) {
      let response = NextResponse.next({ request });
      // Add noindex header to prevent search engine indexing
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
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
    // Add noindex header to prevent search engine indexing
    supabaseResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');

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
