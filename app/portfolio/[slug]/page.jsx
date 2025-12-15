import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, caseStudies } from '@/data';
import { CaseStudyPageContent } from './CaseStudyPageContent';

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

  return {
    title: `${caseStudy.client} Case Study`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPageContent caseStudy={caseStudy} />;
}
