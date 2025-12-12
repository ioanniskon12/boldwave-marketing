import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Spotlight from '@/components/ui/Spotlight';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Spotlight />
          <Header />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
