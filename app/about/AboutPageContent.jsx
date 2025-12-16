'use client';

import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Stats Bar under Hero
const StatsBar = styled.section`
  background: #1a1a1a;
  padding: 40px 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #ff8c42;
  line-height: 1;
  margin-bottom: 8px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// Section Tag
const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
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

// Story Section
const StorySection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  gap: 48px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

const StoryContent = styled.div``;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 24px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionText = styled.p`
  font-size: 18px;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const HighlightText = styled.span`
  color: #ff8c42;
  font-weight: 600;
`;

const StoryImageWrapper = styled.div`
  position: relative;
  height: 500px;
  border-radius: 24px;
  overflow: hidden;

  ${media.lg} {
    height: 600px;
  }
`;

const StoryImage = styled(Image)`
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.4) 100%);
`;

const FloatingCard = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  animation: ${float} 4s ease-in-out infinite;
`;

const FloatingCardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const FloatingCardValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
`;

// Values Section
const ValuesSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const ValuesHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 64px;
`;

const ValuesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ValueCard = styled.div`
  background: #faf8f5;
  border-radius: 20px;
  padding: 36px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #ff8c42, #ffb380);
    transform: scaleY(0);
    transition: transform 0.3s ease;
    transform-origin: top;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);

    &::before {
      transform: scaleY(1);
    }
  }
`;

const ValueIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #fff5ee 0%, #ffe8d6 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #ff8c42;
`;

const ValueTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const ValueDescription = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.7;
  margin: 0;
`;

// Approach Section
const ApproachSection = styled.section`
  padding: 100px 0;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const ApproachPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 60px 60px;
`;

const ApproachContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ApproachHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 64px;
`;

const ApproachTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 20px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const ApproachSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
`;

const ApproachGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ApproachCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 36px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-4px);
  }
`;

const ApproachNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: #ff8c42;
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 16px;
`;

const ApproachCardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
`;

const ApproachCardText = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0;
`;

// Timeline Section
const TimelineSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const TimelineHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 64px;
`;

const TimelineGrid = styled.div`
  display: grid;
  gap: 32px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TimelineCard = styled.div`
  text-align: center;
  position: relative;
`;

const TimelineYear = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
`;

const TimelineTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const TimelineText = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
`;

// Partners Section
const PartnersSection = styled.section`
  padding: 80px 0;
  background: #ffffff;
`;

const PartnersHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const PartnersTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const PartnersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  align-items: center;
`;

const PartnerLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #d0d0d0;
  transition: color 0.3s ease;

  &:hover {
    color: #1a1a1a;
  }
`;

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
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: #1a1a1a;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #000000;
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
`;

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Results Over Vanity',
    description: 'We measure success by revenue generated, not impressions served. Every campaign is optimized for real business outcomes.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: 'Full Transparency',
    description: 'You always know where your money goes. We provide full platform access, detailed reporting, and regular strategy calls.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Partnership Mindset',
    description: 'We see ourselves as an extension of your team. Your goals are our goals, and we celebrate your wins together.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Creative Excellence',
    description: 'Beautiful ads that actually convert. Our creative team works hand-in-hand with media buyers to produce assets built for results.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Data-Driven Decisions',
    description: 'Every decision is backed by data. We test, measure, and iterate constantly to find what works best for your brand.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Expert Team',
    description: 'Our team has managed over $50M in ad spend. You get senior-level expertise from day one, not junior account managers.',
  },
];

const approach = [
  {
    number: '01',
    title: 'Strategy First',
    description: 'We don\'t jump into campaigns blindly. Every engagement starts with deep discovery to understand your business, audience, and goals.',
  },
  {
    number: '02',
    title: 'Creative That Converts',
    description: 'We don\'t believe in pretty ads that don\'t perform. Our creative is designed for results, not awards.',
  },
  {
    number: '03',
    title: 'Always-On Optimization',
    description: 'We don\'t set and forget. Our team monitors campaigns daily, making micro-adjustments that compound into major gains.',
  },
  {
    number: '04',
    title: 'Scale With Confidence',
    description: 'Once we find what works, we scale aggressively while maintaining efficiency. Growth without sacrificing profitability.',
  },
];

const timeline = [
  {
    year: '2019',
    title: 'Founded',
    description: 'Started with a simple belief: marketing should be measurable.',
  },
  {
    year: '2020',
    title: 'First $1M',
    description: 'Managed our first $1M in annual ad spend across 10 clients.',
  },
  {
    year: '2022',
    title: 'Team Growth',
    description: 'Expanded to 15 team members across media, creative, and strategy.',
  },
  {
    year: '2024',
    title: 'Today',
    description: 'Managing $25M+ in ad spend with 50+ active brand partners.',
  },
];

export function AboutPageContent() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="We're OwlMarketingHub"
        description="A team of performance marketers, data nerds, and creative thinkers on a mission to help ambitious brands grow."
        bigText="ABOUT"
      />

      {/* Story Section */}
      <StorySection>
        <Container>
          <StoryGrid>
            <StoryContent>
              <SectionTag>
                <TagLine />
                <TagText>Our Story</TagText>
              </SectionTag>
              <SectionTitle>Marketing Should Be Measurable</SectionTitle>
              <SectionText>
                Founded in 2019, OwlMarketingHub started with a simple belief: <HighlightText>marketing should be measurable, creative should convert, and agencies should be partners—not vendors.</HighlightText>
              </SectionText>
              <SectionText>
                We&apos;ve helped 50+ brands across e-commerce, SaaS, and D2C grow through a combination of paid media expertise, creative strategy, and relentless optimization.
              </SectionText>
              <SectionText>
                Today, we manage over $25M in annual ad spend and have delivered an average of 120% ROAS improvement for our clients. But we&apos;re just getting started.
              </SectionText>
              <AnimatedButton href="/contact" variant="orange" style={{ marginTop: '16px' }}>
                Work With Us
              </AnimatedButton>
            </StoryContent>
            <StoryImageWrapper>
              <StoryImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop"
                alt="Our team collaborating"
                fill
                unoptimized
              />
              <ImageOverlay />
              <FloatingCard>
                <FloatingCardTitle>Since 2019</FloatingCardTitle>
                <FloatingCardValue>5+ Years of Growth</FloatingCardValue>
              </FloatingCard>
            </StoryImageWrapper>
          </StoryGrid>
        </Container>
      </StorySection>

      {/* Values Section */}
      <ValuesSection>
        <Container>
          <ValuesHeader>
            <SectionTag>
              <TagLine />
              <TagText>Our Values</TagText>
            </SectionTag>
            <SectionTitle>What We Stand For</SectionTitle>
            <SectionText style={{ marginBottom: 0 }}>
              These aren&apos;t just words on a wall. They guide every decision we make and every campaign we run.
            </SectionText>
          </ValuesHeader>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard key={index}>
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </Container>
      </ValuesSection>

      {/* Stats Section */}
      <StatsBar>
        <Container>
          <StatsGrid>
            <StatItem>
              <StatValue>50+</StatValue>
              <StatLabel>Brands Scaled</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>$25M+</StatValue>
              <StatLabel>Ad Spend Managed</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>120%</StatValue>
              <StatLabel>Avg. ROAS Improvement</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>4.2x</StatValue>
              <StatLabel>Average ROAS</StatLabel>
            </StatItem>
          </StatsGrid>
        </Container>
      </StatsBar>

      {/* Approach Section */}
      <ApproachSection>
        <ApproachPattern />
        <Container>
          <ApproachContent>
            <ApproachHeader>
              <SectionTag>
                <TagLine />
                <TagText style={{ color: '#ff8c42' }}>Our Approach</TagText>
              </SectionTag>
              <ApproachTitle>How We Work</ApproachTitle>
              <ApproachSubtitle>
                A proven methodology that delivers consistent results across every client and every campaign.
              </ApproachSubtitle>
            </ApproachHeader>
            <ApproachGrid>
              {approach.map((item, index) => (
                <ApproachCard key={index}>
                  <ApproachNumber>{item.number}</ApproachNumber>
                  <ApproachCardTitle>{item.title}</ApproachCardTitle>
                  <ApproachCardText>{item.description}</ApproachCardText>
                </ApproachCard>
              ))}
            </ApproachGrid>
          </ApproachContent>
        </Container>
      </ApproachSection>

      {/* Timeline Section */}
      <TimelineSection>
        <Container>
          <TimelineHeader>
            <SectionTag>
              <TagLine />
              <TagText>Our Journey</TagText>
            </SectionTag>
            <SectionTitle>Growing Together</SectionTitle>
          </TimelineHeader>
          <TimelineGrid>
            {timeline.map((item, index) => (
              <TimelineCard key={index}>
                <TimelineYear>{item.year}</TimelineYear>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineText>{item.description}</TimelineText>
              </TimelineCard>
            ))}
          </TimelineGrid>
        </Container>
      </TimelineSection>

      {/* Partners Section */}
      <PartnersSection>
        <Container>
          <PartnersHeader>
            <PartnersTitle>Trusted Partners & Certifications</PartnersTitle>
          </PartnersHeader>
          <PartnersGrid>
            <PartnerLogo>Meta Partner</PartnerLogo>
            <PartnerLogo>Google Partner</PartnerLogo>
            <PartnerLogo>TikTok Partner</PartnerLogo>
            <PartnerLogo>Shopify Partner</PartnerLogo>
            <PartnerLogo>Klaviyo Partner</PartnerLogo>
          </PartnersGrid>
        </Container>
      </PartnersSection>

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>Ready to Grow Together?</CTATitle>
            <CTAText>
              Let&apos;s discuss how we can help your brand achieve extraordinary results. No pressure, just a conversation.
            </CTAText>
            <CTAButton href="/contact">
              Start a Conversation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
