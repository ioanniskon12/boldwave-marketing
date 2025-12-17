import { Poppins } from 'next/font/google';
import Script from 'next/script';
import StyledComponentsRegistry from '@/lib/registry';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { getGlobalNoindex, getIntegrationSettings } from '@/lib/supabase/seo';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export async function generateMetadata() {
  // Check if global noindex is enabled
  const globalNoindex = await getGlobalNoindex();
  // Get integration settings for verification tags
  const integrations = await getIntegrationSettings();

  return {
    metadataBase: new URL('https://owlmarketinghub.com'),
    title: {
      default: 'OwlMarketingHub | Performance Marketing Agency',
      template: '%s | OwlMarketingHub',
    },
    description:
      'We help brands turn attention into revenue with data-driven performance marketing. Paid social, search ads, creative strategy & more.',
    keywords: [
      'performance marketing',
      'paid social',
      'Facebook ads',
      'Google ads',
      'marketing agency',
      'growth marketing',
    ],
    authors: [{ name: 'OwlMarketingHub' }],
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: 'https://owlmarketinghub.com',
      siteName: 'OwlMarketingHub',
      title: 'OwlMarketingHub | Performance Marketing Agency',
      description: 'We help brands turn attention into revenue...',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'OwlMarketingHub | Performance Marketing Agency',
      description: 'We help brands turn attention into revenue...',
      images: ['/og-image.jpg'],
    },
    // Robots meta is now controlled by admin settings
    ...(globalNoindex && {
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    }),
    // Google Search Console verification
    ...(integrations.google_search_console && {
      verification: {
        google: integrations.google_search_console,
      },
    }),
  };
}

export default async function RootLayout({ children }) {
  // Fetch integration settings for analytics scripts
  const integrations = await getIntegrationSettings();

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="6u7LeVYDtS2xF5sEcUW3-pZ4BTtDxl9ZYU1nVWFb2t8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        {/* Google Analytics */}
        {integrations.google_analytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${integrations.google_analytics}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${integrations.google_analytics}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        {integrations.facebook_pixel && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${integrations.facebook_pixel}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        <StyledComponentsRegistry>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
