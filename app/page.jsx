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
