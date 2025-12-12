import type { Metadata } from 'next';
import { TeamPageContent } from './TeamPageContent';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the OwlMarketingHub team—performance marketers, data nerds, and creative thinkers dedicated to helping brands grow.',
};

export default function TeamPage() {
  return <TeamPageContent />;
}
