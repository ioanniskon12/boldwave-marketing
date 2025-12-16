import { createClient } from './server';

interface PageMeta {
  title: string;
  description: string;
  image: string;
}

interface AllPagesMeta {
  [path: string]: PageMeta;
}

interface GlobalSettings {
  site_name: string;
  default_image: string;
  twitter_handle: string;
}

const defaultGlobalSettings: GlobalSettings = {
  site_name: 'Owl Marketing Hub',
  default_image: '',
  twitter_handle: '@owlmarketinghub',
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

  const pagesMeta = (pagesData?.value as AllPagesMeta) || {};
  const globalSettings = (globalData?.value as GlobalSettings) || defaultGlobalSettings;

  const pageMeta = pagesMeta[path] || {};

  return {
    title: pageMeta.title || null,
    description: pageMeta.description || null,
    image: pageMeta.image || globalSettings.default_image || null,
    siteName: globalSettings.site_name,
    twitterHandle: globalSettings.twitter_handle,
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
  };
}
