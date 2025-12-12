'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import BlogCard from '@/components/cards/BlogCard';
import { BlogPost } from '@/types';
import { getRelatedPosts } from '@/data';

interface BlogPostContentProps {
  post: BlogPost;
}

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  ${media.lg} {
    height: 500px;
  }
`;

const HeroImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 18, 0.3) 0%,
    rgba(10, 10, 18, 0.7) 100%
  );
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 0;

  ${media.lg} {
    padding: 60px 0;
  }
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 14px;
`;

const BreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`;

const BreadcrumbCurrent = styled.span`
  color: #ffffff;
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.md} {
    max-width: 400px;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 140, 66, 0.2);
  color: #ff8c42;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin: 0 0 20px 0;
  max-width: 800px;

  ${media.md} {
    font-size: 36px;
  }

  ${media.lg} {
    font-size: 44px;
  }
`;

const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const MetaDivider = styled.span`
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
`;

const ContentSection = styled.section`
  padding: 60px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 80px 0;
  }
`;

const ArticleWrapper = styled.article`
  max-width: 720px;
  margin: 0 auto;
`;

const AuthorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 16px;
  margin-bottom: 40px;
`;

const AuthorAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0a0a12;
  margin-bottom: 4px;
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.8;
  color: #444;

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #0a0a12;
    margin-top: 48px;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #0a0a12;
    margin-top: 32px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 24px;
  }

  ul,
  ol {
    margin-bottom: 24px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 12px;
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  strong {
    font-weight: 600;
    color: #0a0a12;
  }

  blockquote {
    border-left: 4px solid #ff8c42;
    padding-left: 24px;
    margin: 32px 0;
    font-style: italic;
    color: #666;
  }
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 0;
  border-top: 1px solid #eee;
  margin-top: 48px;
`;

const ShareLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0a0a12;
`;

const ShareButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f5f5;
  color: #666;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff8c42;
    color: #ffffff;
  }
`;

const RelatedSection = styled.section`
  padding: 80px 0;
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
`;

const RelatedHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const RelatedLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const LabelDot = styled.span`
  width: 6px;
  height: 6px;
  background: #ff8c42;
  border-radius: 50%;
`;

const LabelText = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff8c42;
`;

const RelatedTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0a0a12;
  margin: 0;
`;

function parseContent(content: string): string {
  return content
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .split('\n\n')
    .map((para) => {
      if (
        para.startsWith('<h2>') ||
        para.startsWith('<h3>') ||
        para.startsWith('<ul>')
      ) {
        return para;
      }
      return `<p>${para}</p>`;
    })
    .join('');
}

// Map slugs to images
const blogImages: Record<string, string> = {
  'strategies-drive-growth': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
  'business-consultants-role': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop',
  'strategic-business-consulting': 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=600&fit=crop',
  'ios-14-playbook-paid-social-2024': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop',
  'roas-obsession-hurting-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  '5-ad-creative-frameworks': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop',
  'attribution-problem-solution': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
  'dtc-brand-scale-case-study': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
  'google-ads-vs-meta-ads': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=600&fit=crop',
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const authorInitials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const heroImage = blogImages[post.slug] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop';

  return (
    <>
      <HeroSection>
        <HeroImage
          src={heroImage}
          alt={post.title}
          width={1200}
          height={600}
          priority
          unoptimized
        />
        <HeroOverlay />
        <HeroContent>
          <Container>
            <Breadcrumbs>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbCurrent>{post.title}</BreadcrumbCurrent>
            </Breadcrumbs>
            <TagsWrapper>
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagsWrapper>
            <HeroTitle>{post.title}</HeroTitle>
            <HeroMeta>
              <MetaItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {post.date}
              </MetaItem>
              <MetaDivider />
              <MetaItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {post.readTime}
              </MetaItem>
              <MetaDivider />
              <MetaItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {post.author.name}
              </MetaItem>
            </HeroMeta>
          </Container>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <ArticleWrapper>
            <AuthorCard>
              <AuthorAvatar>{authorInitials}</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>{post.author.name}</AuthorName>
                <AuthorRole>Author</AuthorRole>
              </AuthorInfo>
            </AuthorCard>
            <Content
              dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
            />
            <ShareSection>
              <ShareLabel>Share this article:</ShareLabel>
              <ShareButton aria-label="Share on Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </ShareButton>
              <ShareButton aria-label="Share on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </ShareButton>
              <ShareButton
                aria-label="Copy link"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </ShareButton>
            </ShareSection>
          </ArticleWrapper>
        </Container>
      </ContentSection>

      {relatedPosts.length > 0 && (
        <RelatedSection>
          <Container>
            <RelatedHeader>
              <RelatedLabel>
                <LabelDot />
                <LabelText>Related Articles</LabelText>
              </RelatedLabel>
              <RelatedTitle>You May Also Like</RelatedTitle>
            </RelatedHeader>
            <Grid $columns={{ mobile: 1, tablet: 2, desktop: 3 }} $gap="24px">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </Grid>
          </Container>
        </RelatedSection>
      )}
    </>
  );
}
