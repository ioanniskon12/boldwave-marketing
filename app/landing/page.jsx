import { LandingPageContent } from './LandingPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/landing',
    'Grow Your Business Faster | OwlMarketingHub',
    'Transform your marketing with data-driven strategies that deliver real results. Join hundreds of businesses that trust us to scale their growth.'
  );
}

export default function LandingPage() {
  return <LandingPageContent />;
}
