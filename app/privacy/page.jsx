import { PrivacyPageContent } from './PrivacyPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/privacy',
    'Privacy Policy | OwlMarketingHub',
    'Learn how OwlMarketingHub collects, uses, and protects your personal information.'
  );
}

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
