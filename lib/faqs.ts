import { createClient } from '@/lib/supabase/client';
import { faqs as staticFaqs, getFaqsByServiceSlug as getStaticFaqsByService, getGeneralFaqs as getStaticGeneralFaqs } from '@/data/faqs';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Fetch FAQs from Supabase by category
export async function getFaqsByCategory(category: string): Promise<FAQItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('category', category.toLowerCase())
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return (data as FAQItem[]) || [];
}

// Fetch all published FAQs from Supabase grouped by category
export async function getAllSupabaseFaqs(): Promise<{ category: string; items: FAQItem[] }[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Group by category
  const faqs = data as FAQItem[];
  const grouped: { [key: string]: FAQItem[] } = {};
  faqs.forEach((faq) => {
    const cat = faq.category || 'general';
    if (!grouped[cat]) {
      grouped[cat] = [];
    }
    grouped[cat].push(faq);
  });

  return Object.entries(grouped).map(([category, items]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    items,
  }));
}

// Get FAQs for services page - tries Supabase first, falls back to static
export async function getServiceFaqs(serviceSlug: string): Promise<FAQItem[]> {
  // Map service slugs to FAQ categories in Supabase
  const serviceToCategoryMap: { [key: string]: string } = {
    'social-media-management': 'social media',
    'content-creation': 'content',
    'branding-creative-direction': 'branding',
    'paid-advertising': 'advertising',
    'website-development': 'website',
    'ui-ux-design': 'design',
    'seo-content-writing': 'seo',
    'email-marketing': 'email',
    'influencer-partnerships': 'influencer',
    'marketing-strategy': 'strategy',
    'full-funnel-setup': 'funnel',
  };

  const category = serviceToCategoryMap[serviceSlug] || serviceSlug;

  // Try service-specific category first
  let supabaseFaqs = await getFaqsByCategory(category);

  // If no service-specific FAQs, try the general "services" category
  if (supabaseFaqs.length === 0) {
    supabaseFaqs = await getFaqsByCategory('services');
  }

  if (supabaseFaqs.length > 0) {
    return supabaseFaqs;
  }

  // Fall back to static FAQs
  return getStaticFaqsByService(serviceSlug);
}

// Category display names and icons for the public FAQ page
export const faqCategoryConfig: { [key: string]: { displayName: string; icon: string } } = {
  general: { displayName: 'General', icon: '📋' },
  services: { displayName: 'Our Services', icon: '⚙️' },
  pricing: { displayName: 'Pricing', icon: '💰' },
  support: { displayName: 'Support', icon: '🤝' },
  other: { displayName: 'Other', icon: '❓' },
};
