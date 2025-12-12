'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import { services } from '@/data';

// Services Section
const ServicesSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const LabelDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
`;

const SectionHeader = styled.div`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 40px;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled(Link)`
  position: relative;
  display: block;
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  }
`;

const CardNumber = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 75, 75, 0.05));
  border-radius: 20px;
  font-size: 28px;
  margin-bottom: 24px;
  transition: all 0.4s ease;

  ${ServiceCard}:hover & {
    background: linear-gradient(135deg, #FF4B4B, #FF8F8F);
    transform: scale(1.1) rotate(-5deg);
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
  transition: color 0.3s ease;

  ${ServiceCard}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CardArrow = styled.div`
  position: absolute;
  bottom: 32px;
  right: 32px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text.muted};
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    background: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
    transform: translateX(4px);
  }
`;

// CTA Section
const CTASection = styled.section`
  padding: 100px 0;
  background: #fafafa;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const CTACard = styled.div`
  padding: 60px 40px;
  background: linear-gradient(135deg, #111111, #1a1a2e);
  border-radius: 32px;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 80px 60px;
  }
`;

const CTAOrb = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 75, 75, 0.2), transparent 70%);
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(60px);
  pointer-events: none;
`;

const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;

  ${media.lg} {
    font-size: 44px;
  }
`;

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;


const featureTags: { [key: string]: string[] } = {
  'social-media-management': ['Instagram', 'TikTok', 'LinkedIn'],
  'content-creation': ['Reels', 'UGC', 'Photography'],
  'branding-creative-direction': ['Logo', 'Identity', 'Guidelines'],
  'paid-advertising': ['Meta Ads', 'Google', 'TikTok'],
  'website-development': ['Next.js', 'Shopify', 'WordPress'],
  'ui-ux-design': ['Wireframes', 'Prototypes', 'UX'],
  'seo-content-writing': ['SEO', 'Blogs', 'Keywords'],
  'email-marketing': ['Klaviyo', 'Flows', 'Campaigns'],
  'influencer-partnerships': ['Creators', 'UGC', 'Outreach'],
  'marketing-strategy': ['Strategy', 'Research', 'Planning'],
  'full-funnel-setup': ['CRM', 'Automation', 'Funnels'],
};

export function ServicesPageContent() {
  return (
    <>
      <PageHero
        badge="What We Do"
        title="Full-Service Marketing Solutions"
        description="From social media to custom websites, we provide everything your brand needs to grow. One team, seamless execution, measurable results."
        bigText="SERVICES"
      />

      {/* Services Grid */}
      <ServicesSection>
        <Container>
          <SectionHeader>
            <SectionLabel>
              <LabelDot />
              <LabelText>Our Services</LabelText>
            </SectionLabel>
            <SectionTitle>Everything you need to grow</SectionTitle>
            <SectionDescription>
              Choose individual services or combine them for a complete growth solution.
            </SectionDescription>
          </SectionHeader>

          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={service.id} href={`/services/${service.slug}`}>
                <CardNumber>{String(index + 1).padStart(2, '0')}</CardNumber>
                <CardIcon>{service.icon}</CardIcon>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.shortDescription}</CardDescription>
                <CardTags>
                  {featureTags[service.slug]?.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </CardTags>
                <CardArrow>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </CardArrow>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <CTACard>
            <CTAOrb />
            <CTATitle>Not sure which service you need?</CTATitle>
            <CTAText>
              Book a free strategy call and we&apos;ll help you figure out the best approach for your goals.
            </CTAText>
            <AnimatedButton href="/contact" variant="orange">Book a Free Strategy Call</AnimatedButton>
          </CTACard>
        </Container>
      </CTASection>
    </>
  );
}
