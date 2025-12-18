'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666666;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg { width: 20px; height: 20px; color: #ff8c42; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 16px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666666;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
`;

const Button = styled.button<{ $primary?: boolean; $success?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  margin-bottom: 12px;

  ${({ $primary, $success }) =>
    $success
      ? `background: #16a34a; color: #ffffff;`
      : $primary
      ? `background: #ff8c42; color: #ffffff; &:hover { background: #e67d35; }`
      : `background: #f5f5f5; color: #666666; &:hover { background: #e5e5e5; }`}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg { width: 18px; height: 18px; }
`;

const URLList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
`;

const URLItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;

  &:last-child { border-bottom: none; }
`;

const URLPath = styled.span`
  flex: 1;
  font-family: monospace;
  color: #1a1a1a;
`;

const URLPriority = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  color: #666666;
`;

const URLType = styled.span<{ $type: string }>`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${({ $type }) => {
    switch ($type) {
      case 'page': return '#dbeafe';
      case 'blog': return '#dcfce7';
      case 'portfolio': return '#fef3c7';
      default: return '#f0f0f0';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'page': return '#2563eb';
      case 'blog': return '#16a34a';
      case 'portfolio': return '#d97706';
      default: return '#666666';
    }
  }};
`;

const PreviewBox = styled.pre`
  background: #1a1a1a;
  color: #e5e5e5;
  border-radius: 10px;
  padding: 16px;
  font-size: 12px;
  overflow-x: auto;
  max-height: 400px;
  margin: 0;
`;

const StatusMessage = styled.div<{ $success?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ $success }) => ($success ? '#dcfce7' : '#fef3c7')};
  color: ${({ $success }) => ($success ? '#16a34a' : '#d97706')};
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;

  svg { width: 18px; height: 18px; }
`;

const LastGenerated = styled.div`
  font-size: 13px;
  color: #666666;
  margin-bottom: 16px;
`;

interface SitemapURL {
  loc: string;
  type: 'page' | 'blog' | 'portfolio';
  priority: string;
  lastmod?: string;
}

export default function SitemapPage() {
  const [urls, setUrls] = useState<SitemapURL[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [sitemapContent, setSitemapContent] = useState('');
  const supabase = createClient();

  const staticPages: SitemapURL[] = [
    { loc: '/', type: 'page', priority: '1.0' },
    { loc: '/about', type: 'page', priority: '0.8' },
    { loc: '/services', type: 'page', priority: '0.8' },
    { loc: '/portfolio', type: 'page', priority: '0.8' },
    { loc: '/blog', type: 'page', priority: '0.8' },
    { loc: '/contact', type: 'page', priority: '0.7' },
    { loc: '/faq', type: 'page', priority: '0.6' },
  ];

  const fetchDynamicPages = async () => {
    const dynamicUrls: SitemapURL[] = [...staticPages];

    // Fetch published blog posts
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true);

    if (posts) {
      posts.forEach((post) => {
        dynamicUrls.push({
          loc: `/blog/${post.slug}`,
          type: 'blog',
          priority: '0.7',
          lastmod: post.updated_at,
        });
      });
    }

    // Fetch published portfolio items
    const { data: portfolio } = await supabase
      .from('portfolio_items')
      .select('slug, updated_at')
      .eq('published', true);

    if (portfolio) {
      portfolio.forEach((item) => {
        dynamicUrls.push({
          loc: `/portfolio/${item.slug}`,
          type: 'portfolio',
          priority: '0.7',
          lastmod: item.updated_at,
        });
      });
    }

    setUrls(dynamicUrls);
    setLoading(false);
  };

  useEffect(() => {
    fetchDynamicPages();
  }, []);

  const generateSitemap = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://owlmarketinghub.com';

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach((url) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
      if (url.lastmod) {
        xml += `    <lastmod>${new Date(url.lastmod).toISOString().split('T')[0]}</lastmod>\n`;
      }
      xml += `    <changefreq>${url.type === 'blog' ? 'weekly' : 'monthly'}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  };

  const handleGenerate = async () => {
    setGenerating(true);

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const xml = generateSitemap();
    setSitemapContent(xml);
    setGenerated(true);
    setGenerating(false);
  };

  const handleDownload = () => {
    const xml = sitemapContent || generateSitemap();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const xml = sitemapContent || generateSitemap();
    navigator.clipboard.writeText(xml);
    alert('Sitemap XML copied to clipboard!');
  };

  const pageCount = urls.filter((u) => u.type === 'page').length;
  const blogCount = urls.filter((u) => u.type === 'blog').length;
  const portfolioCount = urls.filter((u) => u.type === 'portfolio').length;

  if (loading) {
    return (
      <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
        Loading...
      </Card>
    );
  }

  return (
    <>
      <PageHeader>
        <Title>Sitemap Generator</Title>
        <Subtitle>Generate and manage your XML sitemap for search engines</Subtitle>
      </PageHeader>

      <Grid>
        <div>
          <Card>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              Sitemap Statistics
            </CardTitle>

            <StatsGrid>
              <StatItem>
                <StatLabel>Total URLs</StatLabel>
                <StatValue>{urls.length}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Static Pages</StatLabel>
                <StatValue>{pageCount}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Blog Posts</StatLabel>
                <StatValue>{blogCount}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Portfolio</StatLabel>
                <StatValue>{portfolioCount}</StatValue>
              </StatItem>
            </StatsGrid>

            {generated && (
              <StatusMessage $success>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sitemap generated successfully
              </StatusMessage>
            )}

            <Button $primary onClick={handleGenerate} disabled={generating}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1.24 6.36 3.36" />
                <path d="M21 3v6h-6" />
              </svg>
              {generating ? 'Generating...' : 'Generate Sitemap'}
            </Button>

            <Button onClick={handleDownload}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download sitemap.xml
            </Button>

            <Button onClick={handleCopy}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy to Clipboard
            </Button>
          </Card>

          <Card style={{ marginTop: '24px' }}>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              URLs in Sitemap
            </CardTitle>

            <URLList>
              {urls.map((url, index) => (
                <URLItem key={index}>
                  <URLType $type={url.type}>{url.type}</URLType>
                  <URLPath>{url.loc}</URLPath>
                  <URLPriority>{url.priority}</URLPriority>
                </URLItem>
              ))}
            </URLList>
          </Card>
        </div>

        <div>
          <Card>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              XML Preview
            </CardTitle>

            {sitemapContent ? (
              <PreviewBox>{sitemapContent}</PreviewBox>
            ) : (
              <PreviewBox style={{ color: '#888888' }}>
                Click &quot;Generate Sitemap&quot; to preview the XML content
              </PreviewBox>
            )}
          </Card>

          <Card style={{ marginTop: '24px' }}>
            <CardTitle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Instructions
            </CardTitle>

            <div style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>1. Generate:</strong> Click the generate button to create your sitemap with all published content.
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>2. Download:</strong> Save the sitemap.xml file to your project&apos;s public folder.
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>3. Submit:</strong> Submit your sitemap URL to Google Search Console:
              </p>
              <code style={{
                display: 'block',
                background: '#f5f5f5',
                padding: '12px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#1a1a1a',
                marginBottom: '12px'
              }}>
                https://yourdomain.com/sitemap.xml
              </code>
              <p>
                <strong>Tip:</strong> Regenerate your sitemap whenever you publish new content for better SEO indexing.
              </p>
            </div>
          </Card>
        </div>
      </Grid>
    </>
  );
}
