'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero, FAQAccordion } from '@/components/sections';
import { getGeneralFaqs } from '@/data';
import { getAllSupabaseFaqs, faqCategoryConfig } from '@/lib/faqs';
import { media } from '@/styles/theme';
import { Icon } from '@/components/icons';

const FAQSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
  text-align: center;

  ${media.lg} {
    margin-bottom: 64px;
  }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
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
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;

  ${media.lg} {
    font-size: 44px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CategorySection = styled.div`
  margin-bottom: 64px;

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.1));
  border-radius: 12px;
  color: #ff8c42;
`;

const CategoryTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;

  ${media.lg} {
    font-size: 24px;
  }
`;

const CategoryCount = styled.span`
  font-size: 14px;
  color: #999999;
  margin-left: auto;
`;

const CTAWrapper = styled.section`
  padding: 100px 0;
  background: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
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
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const categoryData = {
  // Static FAQ categories
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
  // Supabase FAQ categories (from admin)
  'General': { icon: '📋' },
  'Services': { icon: '⚙️' },
  'Pricing': { icon: '💰' },
  'Support': { icon: '🤝' },
  'Other': { icon: '❓' },
};

export function FAQPageContent() {
  const [supabaseFaqs, setSupabaseFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const faqs = await getAllSupabaseFaqs();
      setSupabaseFaqs(faqs);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  // Use Supabase FAQs if available, otherwise fall back to static
  const faqsByCategory = supabaseFaqs.length > 0 ? supabaseFaqs : getGeneralFaqs();

  let questionNumber = 0;

  return (
    <>
      <PageHero
        badge="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about working with us. Can't find what you're looking for? Get in touch."
        bigText="FAQ"
      />

      <FAQSection>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Knowledge Base</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Find your answers</SectionTitle>
            <SectionSubtitle>
              Browse through our frequently asked questions organised by topic.
            </SectionSubtitle>
          </SectionHeader>

          {faqsByCategory.map((cat) => {
            const data = categoryData[cat.category] || { icon: '📋' };
            const startNum = questionNumber + 1;
            questionNumber += cat.items.length;

            return (
              <CategorySection key={cat.category}>
                <CategoryHeader>
                  <CategoryIcon><Icon name={data.icon} size={24} /></CategoryIcon>
                  <CategoryTitle>{cat.category}</CategoryTitle>
                  <CategoryCount>{cat.items.length} questions</CategoryCount>
                </CategoryHeader>
                <FAQAccordion
                  faqs={cat.items}
                  startNumber={startNum}
                />
              </CategorySection>
            );
          })}
        </Container>
      </FAQSection>

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
