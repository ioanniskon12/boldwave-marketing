'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { PageHero } from '@/components/sections';
import { blogPosts, getAllTags } from '@/data';
import { media } from '@/styles/theme';

// Helper to get reading progress from localStorage
const getReadingProgress = (slug) => {
  if (typeof window === 'undefined') return 0;
  const progress = localStorage.getItem(`blog-progress-${slug}`);
  return progress ? parseInt(progress, 10) : 0;
};

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Map slugs to images
const blogImages = {
  'strategies-drive-growth': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  'business-consultants-role': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
  'strategic-business-consulting': 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop',
  'ios-14-playbook-paid-social-2024': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
  'roas-obsession-hurting-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  '5-ad-creative-frameworks': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop',
  'attribution-problem-solution': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'dtc-brand-scale-case-study': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  'google-ads-vs-meta-ads': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop',
};

// ============================================
// FILTER SECTION
// ============================================
const FilterSection = styled.section`
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
`;

const FilterScrollWrapper = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 60px;
    background: linear-gradient(to left, transparent, #ffffff);
    pointer-events: none;
    z-index: 10;
    opacity: ${({ $showLeftShadow }) => ($showLeftShadow ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60px;
    background: linear-gradient(to right, transparent, #ffffff);
    pointer-events: none;
    z-index: 10;
    opacity: ${({ $showRightShadow }) => ($showRightShadow ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

const FilterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  border-bottom: 2px solid #e0e0e0;
  padding: 0 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lg} {
    justify-content: center;
    gap: 24px;
  }
`;

const TabButton = styled.button`
  padding: 16px 8px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#666666')};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #ff8c42;
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transition: transform 0.3s ease;
    border-radius: 3px 3px 0 0;
  }

  &:hover {
    color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#1a1a1a')};
  }
`;

const PostCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#e0e0e0')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#666666')};
  border-radius: 12px;
  transition: all 0.3s ease;
`;

// ============================================
// BLOG SECTION
// ============================================
const BlogSection = styled.section`
  padding: 60px 0 100px;
  background: #faf8f5;

  ${media.lg} {
    padding: 80px 0 140px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ResultsText = styled.p`
  font-size: 16px;
  color: #666666;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
`;

const ViewButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid ${({ $isActive }) => ($isActive ? '#1a1a1a' : '#e0e0e0')};
  background: ${({ $isActive }) => ($isActive ? '#1a1a1a' : '#ffffff')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#666666')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a1a1a;
  }
`;

// ============================================
// FEATURED POST
// ============================================
const FeaturedPost = styled(Link)`
  display: grid;
  gap: 32px;
  margin-bottom: 60px;
  text-decoration: none;
  animation: ${fadeInUp} 0.6s ease forwards;

  ${media.lg} {
    grid-template-columns: 1.2fr 1fr;
    gap: 48px;
    align-items: center;
  }
`;

const FeaturedImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 24px;
  overflow: hidden;

  ${media.lg} {
    height: 400px;
  }
`;

const FeaturedImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${FeaturedPost}:hover & {
    transform: scale(1.05);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 50px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const FeaturedContent = styled.div``;

const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const FeaturedCategory = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FeaturedDate = styled.span`
  font-size: 14px;
  color: #999999;
`;

const FeaturedTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 16px;
  transition: color 0.3s ease;

  ${media.lg} {
    font-size: 36px;
  }

  ${FeaturedPost}:hover & {
    color: #ff8c42;
  }
`;

const FeaturedExcerpt = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 24px;

  ${media.lg} {
    font-size: 17px;
  }
`;

const FeaturedFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FeaturedReadMore = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ff8c42;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  ${FeaturedPost}:hover & {
    gap: 12px;

    svg {
      transform: translateX(4px);
    }
  }
`;

const FeaturedReadingProgress = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 6px 14px;
  border-radius: 20px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

// ============================================
// BLOG GRID
// ============================================
const BlogGrid = styled.div`
  display: grid;
  gap: 32px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlogCard = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${({ $index }) => $index * 0.1}s;
  opacity: 0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${BlogCard}:hover & {
    transform: scale(1.1);
  }
`;

const CardCategory = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 6px 12px;
  background: #ffffff;
  font-size: 11px;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 20px;
`;

const CardContent = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const CardDate = styled.span`
  font-size: 13px;
  color: #999999;
`;

const CardReadTime = styled.span`
  font-size: 13px;
  color: #999999;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '•';
    color: #ddd;
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
  margin-bottom: 12px;
  flex: 1;
  transition: color 0.3s ease;

  ${BlogCard}:hover & {
    color: #ff8c42;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
`;

const ReadMoreLink = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  ${BlogCard}:hover & {
    gap: 10px;

    svg {
      transform: translateX(4px);
    }
  }
`;

const ReadingProgress = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 10px;
  border-radius: 20px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

// ============================================
// NO RESULTS
// ============================================
const NoResults = styled.div`
  text-align: center;
  padding: 80px 20px;

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: #666666;
  }
`;

// ============================================
// COMPONENT
// ============================================
export function BlogPageContent() {
  const [activeTag, setActiveTag] = useState(null);
  const [readingProgress, setReadingProgress] = useState({});
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const filterInnerRef = useRef(null);
  const allTags = getAllTags();

  // Load reading progress from localStorage on mount
  useEffect(() => {
    const progress = {};
    blogPosts.forEach((post) => {
      const stored = getReadingProgress(post.slug);
      if (stored > 0) {
        progress[post.slug] = stored;
      }
    });
    setReadingProgress(progress);
  }, []);

  // Handle scroll to update shadow indicators
  const handleScroll = () => {
    if (filterInnerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterInnerRef.current;
      setShowLeftShadow(scrollLeft > 5);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Check scroll position on mount and resize
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const filteredPosts = activeTag
    ? blogPosts.filter((post) => post.tags.includes(activeTag))
    : blogPosts;

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  const getPostCount = (tag) => {
    if (tag === null) return blogPosts.length;
    return blogPosts.filter((post) => post.tags.includes(tag)).length;
  };

  const getImage = (slug) => {
    return blogImages[slug] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop';
  };

  return (
    <>
      <PageHero
        badge="Blog"
        title="Insights & Strategies"
        description="Insights, strategies, and lessons from the trenches of performance marketing."
        bigText="BLOG"
      />

      <FilterSection>
        <Container>
          <FilterScrollWrapper $showLeftShadow={showLeftShadow} $showRightShadow={showRightShadow}>
            <FilterInner ref={filterInnerRef} onScroll={handleScroll}>
              <TabButton
                $isActive={activeTag === null}
                onClick={() => setActiveTag(null)}
              >
                All Posts
                <PostCount $isActive={activeTag === null}>{getPostCount(null)}</PostCount>
              </TabButton>
              {allTags.map((tag) => (
                <TabButton
                  key={tag}
                  $isActive={activeTag === tag}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                  <PostCount $isActive={activeTag === tag}>{getPostCount(tag)}</PostCount>
                </TabButton>
              ))}
            </FilterInner>
          </FilterScrollWrapper>
        </Container>
      </FilterSection>

      <BlogSection>
        <Container>
          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <FeaturedPost href={`/blog/${featuredPost.slug}`}>
                  <FeaturedImageWrapper>
                    <FeaturedImage
                      src={getImage(featuredPost.slug)}
                      alt={featuredPost.title}
                      width={800}
                      height={600}
                      unoptimized
                    />
                    <FeaturedBadge>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Featured
                    </FeaturedBadge>
                  </FeaturedImageWrapper>
                  <FeaturedContent>
                    <FeaturedMeta>
                      <FeaturedCategory>{featuredPost.tags[0]}</FeaturedCategory>
                      <FeaturedDate>{featuredPost.date}</FeaturedDate>
                    </FeaturedMeta>
                    <FeaturedTitle>{featuredPost.title}</FeaturedTitle>
                    <FeaturedExcerpt>{featuredPost.excerpt}</FeaturedExcerpt>
                    <FeaturedFooter>
                      {readingProgress[featuredPost.slug] > 0 && (
                        <FeaturedReadingProgress>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          Read {readingProgress[featuredPost.slug]}%
                        </FeaturedReadingProgress>
                      )}
                      <FeaturedReadMore>
                        Read more
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </FeaturedReadMore>
                    </FeaturedFooter>
                  </FeaturedContent>
                </FeaturedPost>
              )}

              {/* Results Header */}
              <SectionHeader>
                <ResultsText>
                  Showing <strong>{remainingPosts.length}</strong> {remainingPosts.length === 1 ? 'article' : 'articles'}
                  {activeTag && <> in <strong>{activeTag}</strong></>}
                </ResultsText>
              </SectionHeader>

              {/* Blog Grid */}
              <BlogGrid>
                {remainingPosts.map((post, index) => (
                  <BlogCard key={post.id} href={`/blog/${post.slug}`} $index={index}>
                    <CardImageWrapper>
                      <CardImage
                        src={getImage(post.slug)}
                        alt={post.title}
                        width={600}
                        height={400}
                        unoptimized
                      />
                      <CardCategory>{post.tags[0]}</CardCategory>
                    </CardImageWrapper>
                    <CardContent>
                      <CardMeta>
                        <CardDate>{post.date}</CardDate>
                        <CardReadTime>{post.readTime}</CardReadTime>
                      </CardMeta>
                      <CardTitle>{post.title}</CardTitle>
                      <CardFooter>
                        {readingProgress[post.slug] > 0 && (
                          <ReadingProgress>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Read {readingProgress[post.slug]}%
                          </ReadingProgress>
                        )}
                        <ReadMoreLink>
                          Read more
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </ReadMoreLink>
                      </CardFooter>
                    </CardContent>
                  </BlogCard>
                ))}
              </BlogGrid>
            </>
          ) : (
            <NoResults>
              <h3>No articles found</h3>
              <p>Try selecting a different category or check back later for new content.</p>
            </NoResults>
          )}
        </Container>
      </BlogSection>
    </>
  );
}
