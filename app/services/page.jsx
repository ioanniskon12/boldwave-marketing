import { ServicesPageContent } from './ServicesPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/services',
    'Our Services | OwlMarketingHub',
    'Explore our full-service performance marketing offerings: paid social, search ads, creative strategy, CRO, and more.'
  );
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
