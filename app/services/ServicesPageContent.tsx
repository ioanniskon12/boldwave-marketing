'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import { services } from '@/data';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Services Section
const ServicesSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;
  position: relative;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  ${media.lg} {
    margin-bottom: 80px;
  }
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const LabelLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
`;

const LabelText = styled.span`
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
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
`;

const ServiceCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid transparent;
  min-height: 320px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, transparent, rgba(255, 140, 66, 0.3), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }
  }

  ${media.lg} {
    padding: 36px;
  }
`;

const CardIconWrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
`;

const CardIconBg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  border-radius: 20px;
  opacity: 0.1;
  transition: all 0.5s ease;

  ${ServiceCard}:hover & {
    opacity: 1;
    transform: rotate(-6deg) scale(1.1);
  }
`;

const CardIcon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  z-index: 1;
  transition: all 0.5s ease;

  ${ServiceCard}:hover & {
    transform: scale(1.1);
    filter: grayscale(1) brightness(10);
  }
`;

const CardNumber = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 48px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.03);
  line-height: 1;
  transition: all 0.5s ease;

  ${ServiceCard}:hover & {
    color: rgba(255, 140, 66, 0.1);
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  transition: color 0.3s ease;

  ${ServiceCard}:hover & {
    color: #ff8c42;
  }
`;

const CardDescription = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 20px;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  display: inline-flex;
  padding: 5px 10px;
  background: #faf8f5;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: #888888;
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    background: rgba(255, 140, 66, 0.1);
    color: #ff8c42;
  }
`;

const CardArrow = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf8f5;
  border-radius: 50%;
  color: #888888;
  transition: all 0.4s ease;
  flex-shrink: 0;

  ${ServiceCard}:hover & {
    background: #ff8c42;
    color: #ffffff;
    transform: translateX(4px);
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: 60px 0;
  background: #0d0d12;
  position: relative;
  overflow: hidden;
`;

const StatsGlow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.15), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(80px);
  pointer-events: none;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 24px;
`;

const StatValue = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff, #ff8c42);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media.lg} {
    font-size: 56px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

// Process Section
const ProcessSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const ProcessHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProcessCard = styled.div`
  position: relative;
  padding: 32px;
  background: #faf8f5;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    background: #ffffff;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  }
`;

const ProcessNumber = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  border-radius: 14px;
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
`;

const ProcessTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const ProcessDesc = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
`;

// CTA Section
const CTASection = styled.section`
  padding: 120px 0;
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
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
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

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  ${media.md} {
    flex-direction: row;
  }
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

const stats = [
  { value: '100+', label: 'Brands Scaled' },
  { value: '3.5x', label: 'Average ROAS' },
  { value: '50M+', label: 'Ad Spend Managed' },
  { value: '98%', label: 'Client Retention' },
];

const process = [
  { number: '01', title: 'Discovery', desc: 'Deep dive into your brand, goals, and target audience' },
  { number: '02', title: 'Strategy', desc: 'Custom roadmap tailored to your growth objectives' },
  { number: '03', title: 'Execute', desc: 'Launch campaigns with precision and creativity' },
  { number: '04', title: 'Optimize', desc: 'Continuous testing and refinement for peak performance' },
];

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
              <LabelLine />
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
                <CardIconWrapper>
                  <CardIconBg />
                  <CardIcon>{service.icon}</CardIcon>
                </CardIconWrapper>
                <CardContent>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                  <CardFooter>
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
                  </CardFooter>
                </CardContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsGlow />
        <Container>
          <StatsGrid>
            {stats.map((stat) => (
              <StatItem key={stat.label}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>

      {/* Process Section */}
      <ProcessSection>
        <Container>
          <ProcessHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>How We Work</LabelText>
            </SectionLabel>
            <SectionTitle>Our Process</SectionTitle>
            <SectionDescription>
              A proven framework that delivers consistent results for every client.
            </SectionDescription>
          </ProcessHeader>

          <ProcessGrid>
            {process.map((step) => (
              <ProcessCard key={step.number}>
                <ProcessNumber>{step.number}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDesc>{step.desc}</ProcessDesc>
              </ProcessCard>
            ))}
          </ProcessGrid>
        </Container>
      </ProcessSection>

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to be our <CTAHighlight>next success story?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Book a free strategy call and we&apos;ll help you figure out the best approach for your goals.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Book a Free Strategy Call</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
