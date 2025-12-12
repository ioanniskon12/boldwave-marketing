'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Accordion } from '@/components/Accordion';
import { CTASection, PageHero } from '@/components/sections';
import { getFaqsByCategory } from '@/data';
import { media } from '@/styles/theme';

const SearchWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: #ffffff;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(255, 140, 66, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.muted};
`;

const TabsContainer = styled.div`
  position: relative;
  margin-bottom: 48px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background: linear-gradient(to right, #f8f8f8, transparent);
    z-index: 1;
    pointer-events: none;
    opacity: 0;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background: linear-gradient(to left, #f8f8f8, transparent);
    z-index: 1;
    pointer-events: none;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button<{ $isActive: boolean; $color?: string }>`
  padding: 12px 20px;
  background: ${({ $isActive, $color }) =>
    $isActive ? $color || '#ff8c42' : '#ffffff'};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#666666')};
  border: 2px solid ${({ $isActive, $color }) =>
    $isActive ? $color || '#ff8c42' : 'rgba(0, 0, 0, 0.08)'};
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ $isActive, $color }) =>
      $isActive ? $color || '#ff8c42' : 'rgba(255, 140, 66, 0.1)'};
    border-color: ${({ $color }) => $color || '#ff8c42'};
    color: ${({ $isActive, $color }) => ($isActive ? '#ffffff' : $color || '#ff8c42')};
    transform: translateY(-2px);
  }
`;

const TabIcon = styled.span`
  font-size: 16px;
`;

const TabCount = styled.span<{ $isActive: boolean }>`
  background: ${({ $isActive }) =>
    $isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.06)'};
  padding: 2px 8px;
  border-radius: 100px;
  font-size: 12px;
`;

const CategorySection = styled.div`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px 24px;
  background: ${({ $color }) => $color}10;
  border-left: 4px solid ${({ $color }) => $color};
  border-radius: 0 16px 16px 0;
`;

const CategoryIcon = styled.span`
  font-size: 32px;
`;

const CategoryInfo = styled.div``;

const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;

  ${media.lg} {
    font-size: 22px;
  }
`;

const CategoryCount = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const AccordionWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;

  ${media.lg} {
    font-size: 32px;
  }
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const NoResultsIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const NoResultsText = styled.p`
  font-size: 16px;
`;

const categoryData: { [key: string]: { icon: string; color: string } } = {
  'Getting Started': { icon: '🚀', color: '#6366f1' },
  'Pricing & Engagement': { icon: '💰', color: '#10b981' },
  'Working Together': { icon: '🤝', color: '#8b5cf6' },
  'Results & Reporting': { icon: '📊', color: '#f59e0b' },
  'Social Media Management': { icon: '📱', color: '#ec4899' },
  'Content Creation': { icon: '🎬', color: '#ef4444' },
  'Branding & Creative': { icon: '🎨', color: '#f97316' },
  'Paid Advertising': { icon: '📈', color: '#14b8a6' },
  'Website Development': { icon: '💻', color: '#3b82f6' },
  'SEO & Content Writing': { icon: '🔍', color: '#84cc16' },
  'Email Marketing': { icon: '💌', color: '#e879f9' },
  'Influencer Partnerships': { icon: '⭐', color: '#fbbf24' },
  'Marketing Strategy': { icon: '🧭', color: '#06b6d4' },
  'Full Funnel Setup': { icon: '⚡', color: '#ff8c42' },
};

export function FAQPageContent() {
  const faqsByCategory = getFaqsByCategory();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Filter by search
  const searchFilteredCategories = faqsByCategory.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  // Filter by category
  const filteredCategories =
    activeCategory === 'all'
      ? searchFilteredCategories
      : searchFilteredCategories.filter((cat) => cat.category === activeCategory);

  const totalResults = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <>
      <PageHero
        badge="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about working with us. Can't find what you're looking for? Get in touch."
        bigText="FAQ"
      />

      <Section $background="alt">
        <Container>
          <SectionHeader>
            <SectionTitle>How can we help?</SectionTitle>
            <SectionDescription>
              Search for answers or browse by category.
            </SectionDescription>
          </SectionHeader>

          <SearchWrapper>
            <SearchIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>

          <TabsContainer>
            <TabsWrapper ref={tabsRef}>
              <Tab
                $isActive={activeCategory === 'all'}
                $color="#ff8c42"
                onClick={() => setActiveCategory('all')}
              >
                <TabIcon>📋</TabIcon>
                All
                <TabCount $isActive={activeCategory === 'all'}>
                  {searchFilteredCategories.reduce((acc, cat) => acc + cat.items.length, 0)}
                </TabCount>
              </Tab>
              {faqsByCategory.map((cat) => {
                const data = categoryData[cat.category] || { icon: '📋', color: '#666' };
                const filteredCount = searchFilteredCategories.find(c => c.category === cat.category)?.items.length || 0;
                return (
                  <Tab
                    key={cat.category}
                    $isActive={activeCategory === cat.category}
                    $color={data.color}
                    onClick={() => setActiveCategory(cat.category)}
                  >
                    <TabIcon>{data.icon}</TabIcon>
                    {cat.category}
                    <TabCount $isActive={activeCategory === cat.category}>
                      {filteredCount}
                    </TabCount>
                  </Tab>
                );
              })}
            </TabsWrapper>
          </TabsContainer>

          <AccordionWrapper>
            {filteredCategories.length === 0 ? (
              <NoResults>
                <NoResultsIcon>🔍</NoResultsIcon>
                <NoResultsText>
                  No results found for &quot;{searchQuery}&quot;. Try a different search term.
                </NoResultsText>
              </NoResults>
            ) : (
              filteredCategories.map((cat) => {
                const data = categoryData[cat.category] || { icon: '📋', color: '#666' };
                return (
                  <CategorySection key={cat.category}>
                    <CategoryHeader $color={data.color}>
                      <CategoryIcon>{data.icon}</CategoryIcon>
                      <CategoryInfo>
                        <CategoryTitle>{cat.category}</CategoryTitle>
                        <CategoryCount>
                          {cat.items.length} question{cat.items.length !== 1 ? 's' : ''}
                        </CategoryCount>
                      </CategoryInfo>
                    </CategoryHeader>
                    <Accordion
                      items={cat.items.map((faq) => ({
                        id: faq.id,
                        question: faq.question,
                        answer: faq.answer,
                      }))}
                      allowMultiple
                    />
                  </CategorySection>
                );
              })
            )}
          </AccordionWrapper>
        </Container>
      </Section>

      <CTASection
        title="Still have questions?"
        subtitle="We're happy to chat and answer any questions you might have."
        cta={{ label: 'Get in Touch', href: '/contact' }}
      />
    </>
  );
}
