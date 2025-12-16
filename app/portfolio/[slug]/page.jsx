import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, caseStudies } from '@/data';
import { CaseStudyPageContent } from './CaseStudyPageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  // Try to get custom SEO from Supabase, fall back to case study data
  return generatePageMetadata(
    `/portfolio/${slug}`,
    `${caseStudy.client} Case Study | OwlMarketingHub`,
    caseStudy.description
  );
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPageContent caseStudy={caseStudy} />;
}
