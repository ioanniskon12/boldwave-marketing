import type { Metadata } from 'next';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Ready to scale your brand? Get in touch with OwlMarketingHub Marketing to discuss your growth goals.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
