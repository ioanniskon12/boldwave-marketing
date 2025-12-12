import type { Metadata } from 'next';
import { ServicesPageContent } from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore our full-service performance marketing offerings: paid social, search ads, creative strategy, CRO, and more.',
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
