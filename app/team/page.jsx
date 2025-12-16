import { TeamPageContent } from './TeamPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/team',
    'Our Team | OwlMarketingHub',
    'Meet the OwlMarketingHub team—performance marketers, data nerds, and creative thinkers dedicated to helping brands grow.'
  );
}

export default function TeamPage() {
  return <TeamPageContent />;
}
