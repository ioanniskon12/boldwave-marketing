import { TermsPageContent } from './TermsPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/terms',
    'Terms of Service | OwlMarketingHub',
    'Read the terms and conditions for using OwlMarketingHub services.'
  );
}

export default function TermsPage() {
  return <TermsPageContent />;
}
