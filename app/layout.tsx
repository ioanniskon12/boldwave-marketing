import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        <StyledComponentsRegistry>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
