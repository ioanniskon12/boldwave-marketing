import { notFound } from 'next/navigation';
import { getServiceBySlug, services } from '@/data';
import { ServicePageContent } from './ServicePageContent';
import { generatePageMetadata } from '@/lib/supabase/seo';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  // Try to get custom SEO from Supabase, fall back to service data
  return generatePageMetadata(
    `/services/${slug}`,
    `${service.title} | OwlMarketingHub`,
    service.shortDescription
  );
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageContent service={service} />;
}
