import { FAQPageContent } from './FAQPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/faq',
    'FAQ | OwlMarketingHub',
    'Frequently asked questions about working with OwlMarketingHub Marketing—pricing, process, results, and more.'
  );
}

export default function FAQPage() {
  return <FAQPageContent />;
}
