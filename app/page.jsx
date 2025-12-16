import {
  HeroAnimated,
  ClientLogos,
  AboutCompany,
  ServicesAccordion,
  ProcessTimeline,
  TeamAndTestimonials,
  BlogPreview,
} from '@/components/sections';
import { testimonials, processSteps } from '@/data';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateMetadata() {
  return generatePageMetadata(
    '/',
    'OwlMarketingHub | Performance Marketing Agency',
    'We help brands turn attention into revenue with data-driven performance marketing. Paid social, search ads, creative strategy & more.'
  );
}

export default function HomePage() {
  return (
    <>
      <HeroAnimated />
      <ClientLogos />
      <AboutCompany />
      <ServicesAccordion />
      <ProcessTimeline steps={processSteps} />
      <TeamAndTestimonials testimonials={testimonials} />
      <BlogPreview />
      <ScrollToTop />
    </>
  );
}
