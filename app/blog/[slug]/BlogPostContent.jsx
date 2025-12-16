'use client';

/**
 * BLOG POST PAGE
 *
 * IMPORTANT: Icon Usage Guidelines
 * ================================
 * Always use professional SVG icon components directly from '@/components/icons'.
 * DO NOT use the emoji-based Icon component (e.g., <Icon name="🎨" />).
 *
 * Available icons include:
 * - PaletteIcon, CalendarIcon, ClockIcon, PenIcon, ClipboardIcon, TagIcon, ShareIcon
 * - RocketIcon, ChartIcon, TargetIcon, StarIcon, CheckIcon, SearchIcon, etc.
 *
 * Usage example:
 *   import { CalendarIcon } from '@/components/icons';
 *   <CalendarIcon size={20} color="#ff8c42" />
 *
 * See /components/icons/Icons.jsx for full list of available icons.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { getRelatedPosts } from '@/data';
import {
  PaletteIcon,
  CalendarIcon,
  ClockIcon,
  PenIcon,
  ClipboardIcon,
  TagIcon,
  ShareIcon,
  DocumentIcon,
  ChartIcon,
  TargetIcon,
  RocketIcon,
  LightbulbIcon
} from '@/components/icons';

// ============================================
// ANIMATIONS
// ============================================
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

// ============================================
// READING PROGRESS BAR
// ============================================
const ProgressBar = styled.div`
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

// ============================================
// HERO SECTION
// ============================================
const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #000000 0%, #0a0a12 40%, #050508 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 20s ease infinite;
  overflow: hidden;

  ${media.lg} {
    min-height: 75vh;
    padding: 140px 0 100px;
  }
`;

const HeroOrb = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ $color }) => $color || 'radial-gradient(circle, rgba(255, 140, 66, 0.2), transparent 70%)'};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${pulse} ${({ $delay }) => 6 + $delay}s ease-in-out infinite;
  filter: blur(80px);
  pointer-events: none;
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const BreadcrumbLink = styled(Link)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.2);
`;

const BreadcrumbCurrent = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  background: rgba(255, 140, 66, 0.1);
  border: 1px solid rgba(255, 140, 66, 0.2);
  border-radius: 100px;
  margin-bottom: 28px;
`;

const CategoryIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #ff8c42;
`;

const CategoryText = styled.span`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff8c42;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;
  letter-spacing: -0.02em;

  ${media.md} {
    font-size: 48px;
  }

  ${media.lg} {
    font-size: 56px;
  }
`;

const HeroExcerpt = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  ${media.lg} {
    font-size: 20px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ff8c42;
`;

const MetaInfo = styled.div`
  text-align: left;
`;

const MetaLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2px;
`;

const MetaValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

// ============================================
// FEATURED IMAGE
// ============================================
const ImageSection = styled.section`
  padding: 0 0 60px;
  background: linear-gradient(180deg, #000000 0%, #faf8f5 40%);
  position: relative;

  ${media.lg} {
    padding: 0 0 80px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/7;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
  transform: translateY(-60px);

  ${media.lg} {
    border-radius: 32px;
    transform: translateY(-80px);
  }
`;

// ============================================
// CONTENT SECTION
// ============================================
const ContentSection = styled.section`
  padding: 0 0 100px;
  background: #faf8f5;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 40px;

  ${media.lg} {
    grid-template-columns: 1fr 320px;
    gap: 60px;
  }
`;

// ============================================
// MAIN ARTICLE
// ============================================
const MainContent = styled.article`
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  ${media.md} {
    padding: 48px 40px;
  }

  ${media.lg} {
    padding: 60px 56px;
  }
`;

const ArticleContent = styled.div`
  font-size: 17px;
  line-height: 1.9;
  color: #444444;

  ${media.md} {
    font-size: 18px;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 48px;
    margin-bottom: 20px;
    line-height: 1.3;
    position: relative;
    padding-left: 20px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 4px;
      background: linear-gradient(180deg, #ff8c42, #ff6b35);
      border-radius: 2px;
    }

    ${media.md} {
      font-size: 30px;
      margin-top: 64px;
      margin-bottom: 24px;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin-top: 36px;
    margin-bottom: 14px;

    ${media.md} {
      font-size: 22px;
      margin-top: 44px;
      margin-bottom: 16px;
    }
  }

  p {
    margin-bottom: 24px;

    ${media.md} {
      margin-bottom: 28px;
    }
  }

  ul, ol {
    margin-bottom: 24px;
    padding-left: 0;
  }

  li {
    margin-bottom: 12px;
    padding-left: 32px;
    position: relative;
    list-style: none;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #ff8c42, #ff6b35);
      border-radius: 50%;
    }
  }

  ol {
    counter-reset: item;
  }

  ol li {
    counter-increment: item;

    &::before {
      content: counter(item);
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #ff8c42, #ff6b35);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
      top: 2px;
    }
  }

  strong {
    font-weight: 700;
    color: #1a1a1a;
  }

  blockquote {
    margin: 40px 0;
    padding: 28px 32px;
    background: linear-gradient(135deg, rgba(255, 140, 66, 0.08), rgba(255, 107, 53, 0.04));
    border-radius: 16px;
    border-left: 4px solid #ff8c42;
    font-size: 18px;
    font-style: italic;
    color: #555555;
    line-height: 1.7;
    position: relative;

    &::before {
      content: '"';
      position: absolute;
      top: 16px;
      left: 20px;
      font-size: 48px;
      color: rgba(255, 140, 66, 0.2);
      font-family: Georgia, serif;
      line-height: 1;
    }

    ${media.md} {
      margin: 56px 0;
      padding: 36px 44px;
      font-size: 20px;
    }
  }
`;

// ============================================
// SIDEBAR
// ============================================
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.lg} {
    position: sticky;
    top: 140px;
    height: fit-content;
  }
`;

const SidebarCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

const SidebarTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SidebarIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.15), rgba(255, 107, 53, 0.1));
  border-radius: 8px;
  color: #ff8c42;
`;

// Author Card
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
  box-shadow: 0 8px 24px rgba(255, 140, 66, 0.3);
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

// Tags Card
const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  padding: 10px 18px;
  background: #faf8f5;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: #666666;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #ff8c42;
    color: #ffffff;
  }
`;

// Share Card
const ShareButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ShareButton = styled.button`
  width: 44px;
  height: 44px;
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
    transform: translateY(-2px);
  }
`;

// ============================================
// RELATED ARTICLES
// ============================================
const RelatedSection = styled.section`
  padding: 100px 0;
  background: #ffffff;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const TagLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
`;

const TagText = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c42;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;

  ${media.lg} {
    font-size: 44px;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RelatedCard = styled(Link)`
  display: block;
  background: #faf8f5;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const RelatedImage = styled.div`
  aspect-ratio: 16/10;
  position: relative;
  overflow: hidden;

  img {
    transition: transform 0.6s ease;
  }

  ${RelatedCard}:hover & img {
    transform: scale(1.05);
  }
`;

const RelatedContent = styled.div`
  padding: 24px;
`;

const RelatedCategory = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const RelatedTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${RelatedCard}:hover & {
    color: #ff8c42;
  }
`;

const RelatedMeta = styled.div`
  font-size: 14px;
  color: #888888;
  display: flex;
  align-items: center;
  gap: 16px;
`;

// ============================================
// CTA SECTION
// ============================================
const CTASection = styled.section`
  padding: 60px 0;
  background: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CTAPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 60px 60px;
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 36px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 28px;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// ============================================
// HELPERS
// ============================================

// Map slugs to images
const blogImages = {
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

// Category to icon mapping
const categoryIcons = {
  'Paid Social': TargetIcon,
  'Strategy': ChartIcon,
  'Creative': PaletteIcon,
  'Analytics': ChartIcon,
  'Case Study': RocketIcon,
  'Business': LightbulbIcon,
  'Consulting': DocumentIcon,
};

// Content parser
function parseContent(content) {
  return content
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .split('\n\n')
    .map((para) => {
      if (para.startsWith('<h2>') || para.startsWith('<h3>') || para.startsWith('<ul>')) {
        return para;
      }
      return `<p>${para}</p>`;
    })
    .join('');
}

// Helper to save reading progress
const saveReadingProgress = (slug, progress) => {
  if (typeof window === 'undefined') return;
  const currentProgress = localStorage.getItem(`blog-progress-${slug}`);
  const current = currentProgress ? parseInt(currentProgress, 10) : 0;
  if (progress > current) {
    localStorage.setItem(`blog-progress-${slug}`, Math.min(progress, 100).toString());
  }
};

// ============================================
// MAIN COMPONENT
// ============================================
export function BlogPostContent({ post }) {
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const authorInitials = post.author.name.split(' ').map((n) => n[0]).join('');
  const heroImage = blogImages[post.slug] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop';
  const category = post.tags[0] || 'Article';
  const CategoryIconComponent = categoryIcons[category] || DocumentIcon;

  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    setScrollProgress(Math.min(scrollPercent, 100));

    // Save reading progress
    if (!contentRef.current) return;
    const contentElement = contentRef.current;
    const contentRect = contentElement.getBoundingClientRect();
    const contentTop = contentRect.top + window.scrollY;
    const contentHeight = contentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrolledPastContent = scrollPosition + windowHeight - contentTop;
    const totalScrollableContent = contentHeight;

    if (scrolledPastContent > 0 && totalScrollableContent > 0) {
      const progress = Math.round((scrolledPastContent / totalScrollableContent) * 100);
      saveReadingProgress(post.slug, progress);
    }
  }, [post.slug]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Reading Progress Bar */}
      <ProgressBar $progress={scrollProgress} />

      {/* Hero Section */}
      <HeroSection>
        <HeroOrb $size={700} $top="-20%" $left="-15%" $delay={0} />
        <HeroOrb $size={500} $top="60%" $left="80%" $delay={2} $color="radial-gradient(circle, rgba(107, 99, 255, 0.15), transparent 70%)" />
        <HeroGrid />

        <Container>
          <HeroContent>
            <Breadcrumb>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbCurrent>{category}</BreadcrumbCurrent>
            </Breadcrumb>

            <CategoryBadge>
              <CategoryIcon><CategoryIconComponent size={18} /></CategoryIcon>
              <CategoryText>{category}</CategoryText>
            </CategoryBadge>

            <HeroTitle>{post.title}</HeroTitle>

            <HeroExcerpt>{post.excerpt}</HeroExcerpt>

            <MetaRow>
              <MetaItem>
                <MetaIcon>
                  <CalendarIcon size={20} />
                </MetaIcon>
                <MetaInfo>
                  <MetaLabel>Published</MetaLabel>
                  <MetaValue>{post.date}</MetaValue>
                </MetaInfo>
              </MetaItem>

              <MetaItem>
                <MetaIcon>
                  <ClockIcon size={20} />
                </MetaIcon>
                <MetaInfo>
                  <MetaLabel>Read Time</MetaLabel>
                  <MetaValue>{post.readTime}</MetaValue>
                </MetaInfo>
              </MetaItem>

              <MetaItem>
                <MetaIcon>
                  <PenIcon size={20} />
                </MetaIcon>
                <MetaInfo>
                  <MetaLabel>Author</MetaLabel>
                  <MetaValue>{post.author.name}</MetaValue>
                </MetaInfo>
              </MetaItem>
            </MetaRow>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Featured Image */}
      <ImageSection>
        <Container>
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
        </Container>
      </ImageSection>

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
                <SidebarTitle>
                  <SidebarIcon><PenIcon size={14} /></SidebarIcon>
                  About the Author
                </SidebarTitle>
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
                <SidebarTitle>
                  <SidebarIcon><TagIcon size={14} /></SidebarIcon>
                  Topics
                </SidebarTitle>
                <TagsList>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsList>
              </SidebarCard>

              {/* Share Card */}
              <SidebarCard>
                <SidebarTitle>
                  <SidebarIcon><ShareIcon size={14} /></SidebarIcon>
                  Share Article
                </SidebarTitle>
                <ShareButtons>
                  <ShareButton
                    aria-label="Share on Facebook"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                      }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </ShareButton>
                  <ShareButton
                    aria-label="Share on Instagram"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open('https://www.instagram.com/', '_blank');
                      }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </ShareButton>
                  <ShareButton
                    aria-label="Share on Twitter"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank');
                      }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </ShareButton>
                  <ShareButton
                    aria-label="Share on LinkedIn"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                      }
                    }}
                  >
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
            <SectionHeader>
              <SectionTag>
                <TagLine />
                <TagText>Keep Reading</TagText>
                <TagLine />
              </SectionTag>
              <SectionTitle>Related Articles</SectionTitle>
            </SectionHeader>

            <RelatedGrid>
              {relatedPosts.map((relatedPost) => (
                <RelatedCard key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <RelatedImage>
                    <Image
                      src={blogImages[relatedPost.slug] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop'}
                      alt={relatedPost.title}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </RelatedImage>
                  <RelatedContent>
                    <RelatedCategory>{relatedPost.tags[0] || 'Article'}</RelatedCategory>
                    <RelatedTitle>{relatedPost.title}</RelatedTitle>
                    <RelatedMeta>
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </RelatedMeta>
                  </RelatedContent>
                </RelatedCard>
              ))}
            </RelatedGrid>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <AnimatedButton href="/blog" variant="orange">View All Articles</AnimatedButton>
            </div>
          </Container>
        </RelatedSection>
      )}

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to transform your <CTAHighlight>marketing?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Get more insights like this delivered to your inbox, or let&apos;s chat about how we can help grow your brand.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Get in Touch</AnimatedButton>
              <AnimatedButton href="/blog" variant="outline">More Articles</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
