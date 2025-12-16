import { PortfolioPageContent } from './PortfolioPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/portfolio',
    'Portfolio | Case Studies | OwlMarketingHub',
    'Explore our case studies and see how we\'ve helped brands achieve remarkable growth through strategic marketing.'
  );
}

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
