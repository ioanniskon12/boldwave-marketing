'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import LandingFooter from './LandingFooter';
import Spotlight from '@/components/ui/Spotlight';

const PAGES_WITHOUT_LAYOUT = ['/coming-soon'];
const PAGES_WITH_LANDING_FOOTER = ['/landing'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = PAGES_WITHOUT_LAYOUT.includes(pathname) || pathname?.startsWith('/admin');
  const useLandingFooter = PAGES_WITH_LANDING_FOOTER.includes(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Spotlight />
      <Header />
      <main>{children}</main>
      {useLandingFooter ? <LandingFooter /> : <Footer />}
    </>
  );
}
