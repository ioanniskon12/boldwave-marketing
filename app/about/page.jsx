import { AboutPageContent } from './AboutPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/about',
    'About Us | OwlMarketingHub',
    'A team of performance marketers, data nerds, and creative thinkers on a mission to help ambitious brands grow.'
  );
}

export default function AboutPage() {
  return <AboutPageContent />;
}
