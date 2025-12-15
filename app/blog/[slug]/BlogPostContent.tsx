'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import BlogCard from '@/components/cards/BlogCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { BlogPost } from '@/types';
import { getRelatedPosts } from '@/data';

interface BlogPostContentProps {
  post: BlogPost;
}

// Helper to save reading progress
const saveReadingProgress = (slug: string, progress: number) => {
  if (typeof window === 'undefined') return;
  const currentProgress = localStorage.getItem(`blog-progress-${slug}`);
  const current = currentProgress ? parseInt(currentProgress, 10) : 0;
  // Only save if new progress is higher
  if (progress > current) {
    localStorage.setItem(`blog-progress-${slug}`, Math.min(progress, 100).toString());
  }
};

// Reading Progress Bar - fixed under navbar
const ReadingProgressBar = styled.div<{ $progress: number }>`
  position: fixed;
  top: 80px;
  left: 0;
  width: ${({ $progress }) => $progress}%;
  height: 3px;
  background: linear-gradient(90deg, #ff8c42, #ff6b35);
  z-index: 1000;
  transition: width 0.1s ease-out;

  ${media.lg} {
    top: 100px;
    height: 4px;
  }
`;

// Hero Section - Full viewport height
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  background: #faf8f5;
  padding-top: 80px;

  ${media.lg} {
    min-height: 100vh;
    padding-top: 100px;
  }
`;

const HeroContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HeroInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  ${media.md} {
    padding: 24px 0;
  }

  ${media.lg} {
    padding: 32px 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Breadcrumb = styled.nav`
  display: none;

  ${media.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  ${media.lg} {
    margin-bottom: 20px;
  }
`;

const BreadcrumbLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #999999;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #dddddd;
  font-size: 12px;
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  ${media.md} {
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const CategoryLine = styled.span`
  width: 24px;
  height: 2px;
  background: #ff8c42;

  ${media.md} {
    width: 40px;
  }
`;

const CategoryText = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c42;

  ${media.md} {
    font-size: 12px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.25;
  margin-bottom: 16px;
  padding: 0 8px;

  ${media.md} {
    font-size: 32px;
    margin-bottom: 24px;
    padding: 0;
  }

  ${media.lg} {
    font-size: 44px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;

  ${media.md} {
    gap: 24px;
  }

  ${media.lg} {
    gap: 32px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  ${media.md} {
    gap: 10px;
  }
`;

const MetaIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 8px;
  color: #ff8c42;

  svg {
    width: 14px;
    height: 14px;
  }

  ${media.md} {
    width: 40px;
    height: 40px;
    border-radius: 10px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const MetaInfo = styled.div`
  text-align: left;
`;

const MetaLabel = styled.div`
  display: none;

  ${media.md} {
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999999;
    margin-bottom: 2px;
  }
`;

const MetaValue = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #1a1a1a;

  ${media.md} {
    font-size: 14px;
  }
`;

// Featured Image - Takes remaining space in hero
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  padding: 16px 0 24px;
  min-height: 200px;

  ${media.md} {
    min-height: 350px;
    padding: 24px 0 32px;
  }

  ${media.lg} {
    padding: 40px 0;
    min-height: 550px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;

  ${media.md} {
    border-radius: 16px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  }

  ${media.lg} {
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }
`;


// Content Section
const ContentSection = styled.section`
  padding: 40px 0;
  background: #ffffff;

  ${media.md} {
    padding: 60px 0;
  }

  ${media.lg} {
    padding: 100px 0;
    background: #faf8f5;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 40px;

  ${media.md} {
    gap: 60px;
  }

  ${media.lg} {
    grid-template-columns: 1fr 300px;
    gap: 80px;
  }
`;

const MainContent = styled.article`
  max-width: 100%;

  ${media.lg} {
    max-width: 720px;
  }
`;

const ArticleContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #444444;

  ${media.md} {
    font-size: 18px;
    line-height: 1.9;
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 40px;
    margin-bottom: 16px;
    line-height: 1.3;
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #ff8c42;
      border-radius: 2px;
    }

    ${media.md} {
      font-size: 28px;
      margin-top: 56px;
      margin-bottom: 24px;
      padding-left: 20px;

      &::before {
        width: 4px;
      }
    }

    ${media.lg} {
      font-size: 32px;
    }
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-top: 32px;
    margin-bottom: 12px;

    ${media.md} {
      font-size: 22px;
      margin-top: 40px;
      margin-bottom: 16px;
    }
  }

  p {
    margin-bottom: 20px;

    ${media.md} {
      margin-bottom: 28px;
    }
  }

  ul, ol {
    margin-bottom: 20px;
    padding-left: 0;

    ${media.md} {
      margin-bottom: 28px;
    }
  }

  li {
    margin-bottom: 8px;
    padding-left: 28px;
    position: relative;
    list-style: none;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      background: #ff8c42;
      border-radius: 50%;
    }

    ${media.md} {
      margin-bottom: 8px;
      padding-left: 32px;

      &::before {
        top: 10px;
        width: 8px;
        height: 8px;
      }
    }
  }

  ol li {
    counter-increment: item;

    &::before {
      content: counter(item);
      width: 20px;
      height: 20px;
      background: #ff8c42;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      color: #ffffff;
      top: 2px;
    }

    ${media.md} {
      &::before {
        width: 24px;
        height: 24px;
        font-size: 12px;
        top: 4px;
      }
    }
  }

  ol {
    counter-reset: item;
  }

  strong {
    font-weight: 700;
    color: #1a1a1a;
  }

  blockquote {
    margin: 32px 0;
    padding: 20px 24px;
    background: #faf8f5;
    border-radius: 12px;
    border-left: 3px solid #ff8c42;
    font-size: 16px;
    font-style: italic;
    color: #555555;
    line-height: 1.7;
    position: relative;

    &::before {
      content: '"';
      position: absolute;
      top: 12px;
      left: 16px;
      font-size: 36px;
      color: rgba(255, 140, 66, 0.2);
      font-family: Georgia, serif;
      line-height: 1;
    }

    ${media.md} {
      margin: 48px 0;
      padding: 32px 40px;
      border-radius: 16px;
      border-left-width: 4px;
      font-size: 20px;

      &::before {
        top: 16px;
        left: 24px;
        font-size: 48px;
      }
    }
  }
`;

// Sidebar
const Sidebar = styled.aside`
  ${media.lg} {
    position: sticky;
    top: 140px;
    height: fit-content;
  }
`;

const SidebarCard = styled.div`
  background: #faf8f5;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;

  ${media.md} {
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 24px;
  }

  ${media.lg} {
    background: #ffffff;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eeeeee;

  ${media.md} {
    font-size: 14px;
    margin-bottom: 24px;
    padding-bottom: 16px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AuthorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
`;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: #888888;
  margin-bottom: 16px;
`;

const AuthorBio = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 8px 16px;
  background: #faf8f5;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: #666666;
  transition: all 0.3s ease;

  &:hover {
    background: #ff8c42;
    color: #ffffff;
  }
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ShareButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #faf8f5;
  color: #666666;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff8c42;
    color: #ffffff;
  }
`;

// Related Section
const RelatedSection = styled.section`
  padding: 48px 0;
  background: #faf8f5;

  ${media.md} {
    padding: 60px 0;
    background: #ffffff;
  }

  ${media.lg} {
    padding: 120px 0;
  }
`;

const RelatedHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 48px;
  }
`;

const RelatedTitleGroup = styled.div``;

const RelatedLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  ${media.md} {
    gap: 12px;
    margin-bottom: 12px;
  }
`;

const LabelLine = styled.span`
  width: 24px;
  height: 2px;
  background: #ff8c42;

  ${media.md} {
    width: 40px;
  }
`;

const LabelText = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c42;

  ${media.md} {
    font-size: 12px;
  }
`;

const RelatedTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;

  ${media.md} {
    font-size: 32px;
  }

  ${media.lg} {
    font-size: 40px;
  }
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
  const contentRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track reading progress based on scroll position
  const handleScroll = useCallback(() => {
    // Calculate overall page scroll progress for the progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    setScrollProgress(Math.min(scrollPercent, 100));

    // Save reading progress based on content section
    if (!contentRef.current) return;

    const contentElement = contentRef.current;
    const contentRect = contentElement.getBoundingClientRect();
    const contentTop = contentRect.top + window.scrollY;
    const contentHeight = contentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // Calculate how much of the content has been scrolled past
    const scrolledPastContent = scrollPosition + windowHeight - contentTop;
    const totalScrollableContent = contentHeight;

    if (scrolledPastContent > 0 && totalScrollableContent > 0) {
      const progress = Math.round((scrolledPastContent / totalScrollableContent) * 100);
      saveReadingProgress(post.slug, progress);
    }
  }, [post.slug]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar $progress={scrollProgress} />

      {/* Hero Section - 100vh */}
      <HeroSection>
        <HeroContainer>
          <HeroInner>
            <HeaderContent>
              <Breadcrumb>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbSeparator>—</BreadcrumbSeparator>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </Breadcrumb>

              <CategoryBadge>
                <CategoryLine />
                <CategoryText>{post.tags[0] || 'Article'}</CategoryText>
                <CategoryLine />
              </CategoryBadge>

              <Title>{post.title}</Title>

              <MetaRow>
                <MetaItem>
                  <MetaIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </MetaIcon>
                  <MetaInfo>
                    <MetaLabel>Published</MetaLabel>
                    <MetaValue>{post.date}</MetaValue>
                  </MetaInfo>
                </MetaItem>

                <MetaItem>
                  <MetaIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </MetaIcon>
                  <MetaInfo>
                    <MetaLabel>Read Time</MetaLabel>
                    <MetaValue>{post.readTime}</MetaValue>
                  </MetaInfo>
                </MetaItem>

                <MetaItem>
                  <MetaIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </MetaIcon>
                  <MetaInfo>
                    <MetaLabel>Author</MetaLabel>
                    <MetaValue>{post.author.name}</MetaValue>
                  </MetaInfo>
                </MetaItem>
              </MetaRow>
            </HeaderContent>

            <ImageContainer>
              <ImageWrapper>
                <Image
                  src={heroImage}
                  alt={post.title}
                  fill
                  priority
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              </ImageWrapper>
            </ImageContainer>
          </HeroInner>
        </HeroContainer>
      </HeroSection>

      {/* Content Section */}
      <ContentSection ref={contentRef}>
        <Container>
          <ContentGrid>
            <MainContent>
              <ArticleContent
                dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
              />
            </MainContent>

            <Sidebar>
              {/* Author Card */}
              <SidebarCard>
                <SidebarTitle>About the Author</SidebarTitle>
                <AuthorInfo>
                  <AuthorAvatar>{authorInitials}</AuthorAvatar>
                  <AuthorName>{post.author.name}</AuthorName>
                  <AuthorRole>Marketing Expert</AuthorRole>
                  <AuthorBio>
                    Passionate about helping brands grow through strategic marketing and data-driven insights.
                  </AuthorBio>
                </AuthorInfo>
              </SidebarCard>

              {/* Tags Card */}
              <SidebarCard>
                <SidebarTitle>Topics</SidebarTitle>
                <TagsList>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsList>
              </SidebarCard>

              {/* Share Card */}
              <SidebarCard>
                <SidebarTitle>Share Article</SidebarTitle>
                <ShareButtons>
                  <ShareButton aria-label="Share on Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </ShareButton>
                  <ShareButton aria-label="Share on LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </ShareButton>
                </ShareButtons>
              </SidebarCard>
            </Sidebar>
          </ContentGrid>
        </Container>
      </ContentSection>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <RelatedSection>
          <Container>
            <RelatedHeader>
              <RelatedTitleGroup>
                <RelatedLabel>
                  <LabelLine />
                  <LabelText>Keep Reading</LabelText>
                </RelatedLabel>
                <RelatedTitle>Related Articles</RelatedTitle>
              </RelatedTitleGroup>
              <AnimatedButton href="/blog" variant="orange">View All Articles</AnimatedButton>
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
