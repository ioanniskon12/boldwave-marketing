'use client';

import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Service } from '@/types';
import { ServiceIcon } from '@/components/icons';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 75, 75, 0.2); }
  50% { box-shadow: 0 0 40px rgba(255, 75, 75, 0.4); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Section = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #fafafa 100%);
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const BackgroundAccent = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 75, 75, 0.03) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 60px;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 400px 1fr;
    gap: 80px;
  }
`;

const LeftColumn = styled.div`
  position: relative;

  ${media.lg} {
    position: sticky;
    top: 120px;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 75, 75, 0.08);
  border-radius: 100px;
  margin-bottom: 20px;
`;

const EyebrowDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
`;

const EyebrowText = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const Description = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: 32px;
`;

const StatRow = styled.div`
  display: flex;
  gap: 32px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div``;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const RightColumn = styled.div``;

const ServicesGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceCard = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  display: block;
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accent : 'rgba(0, 0, 0, 0.06)'};
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  ${({ $isActive }) => $isActive && css`
    background: linear-gradient(135deg, #ffffff, #fff8f8);
    animation: ${glow} 2s ease-in-out infinite;
  `}

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isActive }) => $isActive
    ? 'linear-gradient(135deg, #FF4B4B, #FF8F8F)'
    : 'linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 75, 75, 0.05))'};
  border-radius: 16px;
  transition: all 0.4s ease;
  color: ${({ $isActive }) => $isActive ? '#ffffff' : '#FF4B4B'};

  ${({ $isActive }) => $isActive && css`
    animation: ${float} 3s ease-in-out infinite;
  `}

  ${ServiceCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
`;

const CardNumber = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.muted};
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

const CardFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FeatureTag = styled.span`
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

const BottomCTA = styled.div`
  margin-top: 40px;
  padding: 32px;
  background: linear-gradient(135deg, #111111, #1a1a1a);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const CTAContent = styled.div``;

const CTATitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
`;

const CTAText = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;


interface ServicesShowcaseProps {
  services: Service[];
}

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <Section>
      <BackgroundAccent />
      <Container>
        <ContentWrapper>
          <LeftColumn>
            <Eyebrow>
              <EyebrowDot />
              <EyebrowText>Our Services</EyebrowText>
            </Eyebrow>
            <Title>Everything you need to scale</Title>
            <Description>
              From paid acquisition to retention, we handle every aspect of your
              growth marketing. No fragmented agencies, no dropped balls—just
              results.
            </Description>
            <StatRow>
              <StatItem>
                <StatValue>11</StatValue>
                <StatLabel>Core Services</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>50+</StatValue>
                <StatLabel>Brands Scaled</StatLabel>
              </StatItem>
            </StatRow>
          </LeftColumn>

          <RightColumn>
            <ServicesGrid>
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  href={`/services/${service.slug}`}
                  $isActive={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <CardHeader>
                    <IconWrapper $isActive={activeIndex === index}>
                      <ServiceIcon slug={service.slug} size={24} />
                    </IconWrapper>
                    <CardNumber>{String(index + 1).padStart(2, '0')}</CardNumber>
                  </CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                  <CardFeatures>
                    {featureTags[service.slug]?.map((tag) => (
                      <FeatureTag key={tag}>{tag}</FeatureTag>
                    ))}
                  </CardFeatures>
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

            <BottomCTA>
              <CTAContent>
                <CTATitle>Not sure where to start?</CTATitle>
                <CTAText>Get a free audit and custom growth roadmap</CTAText>
              </CTAContent>
              <AnimatedButton href="/contact" variant="orange">Book Free Consultation</AnimatedButton>
            </BottomCTA>
          </RightColumn>
        </ContentWrapper>
      </Container>
    </Section>
  );
}
