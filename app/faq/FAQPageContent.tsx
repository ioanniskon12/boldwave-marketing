'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import { getGeneralFaqs } from '@/data';
import { media } from '@/styles/theme';

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;


const SearchWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 20px 24px 20px 60px;
  background: #faf8f5;
  border: 2px solid transparent;
  border-radius: 60px;
  font-size: 16px;
  color: #1a1a1a;
  transition: all 0.3s ease;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #ff8c42;
    background: #ffffff;
    box-shadow: 0 8px 30px rgba(255, 140, 66, 0.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #999999;
`;

// FAQ Section - Like Features Section from service page
const FAQSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 60px;

  ${media.lg} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const TagLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
  animation: ${lineGrow} 0.6s ease forwards;
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
    font-size: 48px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 400px;
  line-height: 1.6;
`;

// Features Section - What's Included
const FeaturesSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  padding: 40px 32px;
  background: #faf8f5;
  border-radius: 24px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 32px;
    right: 32px;
    height: 4px;
    background: linear-gradient(90deg, #ff8c42, #ffb380);
    border-radius: 0 0 4px 4px;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const FeatureNumber = styled.span`
  font-size: 64px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.12);
  line-height: 1;
  display: block;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.5;
`;

// FAQ Grid - Like Features Grid
const FAQGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
`;

const FAQCard = styled.div<{ $isOpen: boolean }>`
  padding: 0;
  background: #ffffff;
  border-radius: 24px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 32px;
    right: 32px;
    height: 4px;
    background: linear-gradient(90deg, #ff8c42, #ffb380);
    border-radius: 0 0 4px 4px;
    transform: scaleX(${({ $isOpen }) => ($isOpen ? 1 : 0)});
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const FAQCardHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px 32px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 24px;

  ${media.md} {
    padding: 40px 40px;
    align-items: center;
  }
`;

const FAQNumber = styled.span`
  font-size: 48px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.12);
  line-height: 1;
  flex-shrink: 0;
  display: none;

  ${media.md} {
    display: block;
    font-size: 64px;
  }
`;

const FAQQuestion = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.5;
  flex: 1;

  ${media.md} {
    font-size: 18px;
  }
`;

const FAQToggle = styled.div<{ $isOpen: boolean }>`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isOpen }) => ($isOpen ? '#ff8c42' : 'transparent')};
  border: 2px solid ${({ $isOpen }) => ($isOpen ? '#ff8c42' : '#e0e0e0')};
  border-radius: 50%;
  transition: all 0.3s ease;

  svg {
    color: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '#1a1a1a')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #ff8c42;
    background: ${({ $isOpen }) => ($isOpen ? '#ff8c42' : 'rgba(255, 140, 66, 0.1)')};
  }
`;

const FAQContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '600px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const FAQAnswer = styled.div`
  padding: 0 32px 32px;
  font-size: 16px;
  color: #666666;
  line-height: 1.8;

  ${media.md} {
    padding: 0 40px 40px 144px;
    font-size: 17px;
  }
`;

// Category Section
const CategorySection = styled.div`
  margin-bottom: 80px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;

const CategoryIcon = styled.span`
  font-size: 28px;
`;

const CategoryTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;

  ${media.lg} {
    font-size: 26px;
  }
`;

const CategoryCount = styled.span`
  font-size: 14px;
  color: #999999;
  margin-left: auto;
`;

// CTA Section - Like service page
const CTAWrapper = styled.section`
  padding: 120px 0;
  background: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 160px 0;
  }
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
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 56px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 48px;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const categoryData: { [key: string]: { icon: string } } = {
  'Getting Started': { icon: '🚀' },
  'Pricing & Engagement': { icon: '💰' },
  'Working Together': { icon: '🤝' },
  'Results & Reporting': { icon: '📊' },
  'Social Media Management': { icon: '📱' },
  'Content Creation': { icon: '🎬' },
  'Branding & Creative': { icon: '🎨' },
  'Paid Advertising': { icon: '📈' },
  'Website Development': { icon: '💻' },
  'SEO & Content Writing': { icon: '🔍' },
  'Email Marketing': { icon: '💌' },
  'Influencer Partnerships': { icon: '⭐' },
  'Marketing Strategy': { icon: '🧭' },
  'Full Funnel Setup': { icon: '⚡' },
};

export function FAQPageContent() {
  const faqsByCategory = getGeneralFaqs();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  // Filter by search
  const filteredCategories = faqsByCategory
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  // Track question numbers globally
  let questionNumber = 0;

  return (
    <>
      {/* Hero Section */}
      <PageHero
        badge="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about working with us. Can't find what you're looking for? Get in touch."
        bigText="FAQ"
      />

      {/* FAQ Section */}
      <FAQSection>
        <Container>
          <SectionHeader>
            <div>
              <SectionTag>
                <TagLine />
                <TagText>Knowledge Base</TagText>
              </SectionTag>
              <SectionTitle>Find your answers</SectionTitle>
            </div>
            <SectionSubtitle>
              Browse through our frequently asked questions organized by topic.
            </SectionSubtitle>
          </SectionHeader>

          {/* Search bar under section header */}
          <SearchWrapper style={{ marginBottom: '60px' }}>
            <SearchIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>

          {filteredCategories.map((cat) => {
            const data = categoryData[cat.category] || { icon: '📋' };
            return (
              <CategorySection key={cat.category}>
                <CategoryHeader>
                  <CategoryIcon>{data.icon}</CategoryIcon>
                  <CategoryTitle>{cat.category}</CategoryTitle>
                  <CategoryCount>{cat.items.length} questions</CategoryCount>
                </CategoryHeader>
                <FAQGrid>
                  {cat.items.map((faq) => {
                    questionNumber++;
                    const formattedNumber = String(questionNumber).padStart(2, '0');
                    return (
                      <FAQCard key={faq.id} $isOpen={openItem === faq.id}>
                        <FAQCardHeader
                          onClick={() => toggleItem(faq.id)}
                          aria-expanded={openItem === faq.id}
                        >
                          <FAQNumber>{formattedNumber}</FAQNumber>
                          <FAQQuestion>{faq.question}</FAQQuestion>
                          <FAQToggle $isOpen={openItem === faq.id}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path
                                d="M10 4V16M4 10H16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </FAQToggle>
                        </FAQCardHeader>
                        <FAQContent $isOpen={openItem === faq.id}>
                          <FAQAnswer>{faq.answer}</FAQAnswer>
                        </FAQContent>
                      </FAQCard>
                    );
                  })}
                </FAQGrid>
              </CategorySection>
            );
          })}
        </Container>
      </FAQSection>

      {/* CTA Section */}
      <CTAWrapper>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Still have <CTAHighlight>questions?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Can&apos;t find what you&apos;re looking for? Our team is here to help you with any questions about our services.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Get in Touch</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTAWrapper>
    </>
  );
}
