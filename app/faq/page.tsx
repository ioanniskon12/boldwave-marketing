import type { Metadata } from 'next';
import { FAQPageContent } from './FAQPageContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about working with OwlMarketingHub Marketing—pricing, process, results, and more.',
};

export default function FAQPage() {
  return <FAQPageContent />;
}
