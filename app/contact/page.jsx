import { ContactPageContent } from './ContactPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/contact',
    'Contact Us | OwlMarketingHub',
    'Ready to scale your brand? Get in touch with OwlMarketingHub Marketing to discuss your growth goals.'
  );
}

export default function ContactPage() {
  return <ContactPageContent />;
}
