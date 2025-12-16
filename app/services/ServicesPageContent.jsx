'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import { services } from '@/data';
import { ServiceIcon, SearchIcon, LightbulbIcon, RocketIcon, GrowthIcon } from '@/components/icons';

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
  min-height: 420px;

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
  z-index: 1;
  transition: all 0.5s ease;
  color: #ff8c42;

  ${ServiceCard}:hover & {
    transform: scale(1.1);
    color: #ffffff;
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
  margin-bottom: 16px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  flex: 1;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #555555;
  margin-bottom: 8px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    min-width: 18px;
    background: #ff8c42;
    border-radius: 50%;
    margin-top: 1px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease;
  }

  ${ServiceCard}:hover &::before {
    background-color: #ff6b35;
    transform: scale(1.1);
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
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

// Process Section - Design 3: Dark Modern Cards
const ProcessSection = styled.section`
  padding: 80px 0 100px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a12 100%);
  position: relative;
  overflow: hidden;
`;

const ProcessBackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const ProcessHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  z-index: 1;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const ProcessCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 28px;
  text-align: center;
  transition: all 0.4s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff8c42, #ff6b35);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProcessNumber = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 64px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.08);
  line-height: 1;
`;

const ProcessIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(255, 107, 53, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
  position: relative;
  z-index: 1;
`;

const ProcessTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const ProcessDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const ArrowConnector = styled.div`
  display: none;

  ${media.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    color: #ff8c42;
    opacity: 0.6;
  }
`;

const processStepIcons = [SearchIcon, LightbulbIcon, RocketIcon, GrowthIcon];

// CTA Section
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
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
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

const CTAText = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 28px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
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



const featureTags = {
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
                  <CardIcon><ServiceIcon slug={service.slug} size={36} /></CardIcon>
                </CardIconWrapper>
                <CardContent>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                  <BulletList>
                    {service.included?.slice(0, 4).map((item, i) => (
                      <BulletItem key={i}>{item}</BulletItem>
                    ))}
                  </BulletList>
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

      {/* Process Section */}
      <ProcessSection>
        <ProcessBackgroundGrid />
        <Container>
          <ProcessHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>How We Work</LabelText>
              <LabelLine />
            </SectionLabel>
            <SectionTitle style={{ color: '#ffffff' }}>Our Process</SectionTitle>
            <SectionDescription style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              A proven framework that delivers consistent results for every client.
            </SectionDescription>
          </ProcessHeader>

          <ProcessGrid>
            {process.map((step, index) => {
              const IconComponent = processStepIcons[index] || SearchIcon;
              return (
                <ProcessCard key={step.number}>
                  <ProcessNumber>{step.number}</ProcessNumber>
                  <ProcessIcon>
                    <IconComponent size={28} />
                  </ProcessIcon>
                  <ProcessTitle>{step.title}</ProcessTitle>
                  <ProcessDesc>{step.desc}</ProcessDesc>
                  {index < process.length - 1 && (
                    <ArrowConnector>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </ArrowConnector>
                  )}
                </ProcessCard>
              );
            })}
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
