import { createClient } from './server';

interface PageMeta {
  title: string;
  description: string;
  image: string;
  noindex?: boolean;
}

interface AllPagesMeta {
  [path: string]: PageMeta;
}

interface GlobalSettings {
  site_name: string;
  default_image: string;
  twitter_handle: string;
  global_noindex?: boolean;
}

const defaultGlobalSettings: GlobalSettings = {
  site_name: 'Owl Marketing Hub',
  default_image: '',
  twitter_handle: '@owlmarketinghub',
  global_noindex: false,
};

export async function getPageSEO(path: string) {
  const supabase = await createClient();

  // Fetch pages meta
  const { data: pagesData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'pages_meta')
    .single();

  // Fetch global settings
  const { data: globalData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'global_seo')
    .single();

  const pagesRecord = pagesData as { value: AllPagesMeta } | null;
  const globalRecord = globalData as { value: GlobalSettings } | null;
  const pagesMeta = pagesRecord?.value || {};
  const globalSettings = globalRecord?.value || defaultGlobalSettings;

  const pageMeta = pagesMeta[path] || {};

  // Determine if page should be noindex
  // Global noindex overrides individual page settings
  const shouldNoindex = globalSettings.global_noindex || pageMeta.noindex || false;

  return {
    title: pageMeta.title || null,
    description: pageMeta.description || null,
    image: pageMeta.image || globalSettings.default_image || null,
    siteName: globalSettings.site_name,
    twitterHandle: globalSettings.twitter_handle,
    noindex: shouldNoindex,
    globalNoindex: globalSettings.global_noindex || false,
  };
}

export async function generatePageMetadata(
  path: string,
  defaultTitle: string,
  defaultDescription: string
) {
  const seo = await getPageSEO(path);

  const title = seo.title || defaultTitle;
  const description = seo.description || defaultDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: seo.siteName,
      ...(seo.image && { images: [{ url: seo.image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(seo.image && { images: [seo.image] }),
      ...(seo.twitterHandle && { creator: seo.twitterHandle }),
    },
    // Add robots meta based on noindex setting
    ...(seo.noindex && {
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    }),
  };
}

// Helper to get just the global noindex setting for the root layout
export async function getGlobalNoindex(): Promise<boolean> {
  const supabase = await createClient();

  const { data: globalData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'global_seo')
    .single();

  const globalRecord = globalData as { value: GlobalSettings } | null;
  return globalRecord?.value?.global_noindex || false;
}

interface IntegrationSettings {
  google_search_console?: string;
  google_analytics?: string;
  facebook_pixel?: string;
}

// Helper to get integration settings
export async function getIntegrationSettings(): Promise<IntegrationSettings> {
  const supabase = await createClient();

  const { data: integrationData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'integrations')
    .single();

  const integrationRecord = integrationData as { value: IntegrationSettings } | null;
  return integrationRecord?.value || {};
}
