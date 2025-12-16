import { BlogPageContent } from './BlogPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/blog',
    'Blog | OwlMarketingHub',
    'Insights, strategies, and lessons from the trenches of performance marketing.'
  );
}

export default function BlogPage() {
  return <BlogPageContent />;
}
