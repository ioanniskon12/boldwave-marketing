'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import BlogCard from '@/components/cards/BlogCard';
import { PageHero } from '@/components/sections';
import { blogPosts, getAllTags } from '@/data';
import { media } from '@/styles/theme';

const FilterSection = styled.section`
  padding: 40px 0;
  background: #ffffff;
`;

const TagFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const TagButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  border: 1px solid ${({ $isActive }) => ($isActive ? '#ff8c42' : '#e0e0e0')};
  background-color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#ffffff')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#666')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff8c42;
    color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#ff8c42')};
  }
`;

const BlogSection = styled.section`
  padding: 60px 0 100px;
  background: #ffffff;

  ${media.lg} {
    padding: 80px 0 120px;
  }
`;

export function BlogPageContent() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTags = getAllTags();

  const filteredPosts = activeTag
    ? blogPosts.filter((post) => post.tags.includes(activeTag))
    : blogPosts;

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
          <TagFilter>
            <TagButton
              $isActive={activeTag === null}
              onClick={() => setActiveTag(null)}
            >
              All
            </TagButton>
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                $isActive={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </TagButton>
            ))}
          </TagFilter>
        </Container>
      </FilterSection>

      <BlogSection>
        <Container>
          <Grid $columns={{ mobile: 1, tablet: 2, desktop: 3 }} $gap="32px">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </Grid>
        </Container>
      </BlogSection>
    </>
  );
}
