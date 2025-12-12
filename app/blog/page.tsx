import type { Metadata } from 'next';
import { BlogPageContent } from './BlogPageContent';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, strategies, and lessons from the trenches of performance marketing.',
};

export default function BlogPage() {
  return <BlogPageContent />;
}
