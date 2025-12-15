'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { caseStudies } from '@/data';

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 140px 0 100px;
  background: linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #111111 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 15s ease infinite;
  overflow: hidden;

  ${media.lg} {
    min-height: 70vh;
    padding: 100px 0;
  }
`;

const HeroOrb = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.25), transparent 70%);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${pulse} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  filter: blur(60px);
  pointer-events: none;
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const Breadcrumb = styled.nav`
  position: relative;
  z-index: 1;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbLink = styled(Link)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.3);
`;

const BreadcrumbCurrent = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
`;

const IndustryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 140, 66, 0.15);
  border: 1px solid rgba(255, 140, 66, 0.3);
  border-radius: 100px;
  margin-bottom: 24px;
`;

const BadgeText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 56px;
  }
`;

const HeroDescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 40px;

  ${media.lg} {
    font-size: 20px;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-bottom: 32px;
`;

const ClientLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
`;

const ClientDetails = styled.div``;

const ClientName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const ClientIndustry = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const ServiceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ServiceTag = styled.span`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
`;

// Results Section
const ResultsSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;
  margin-top: -60px;
  position: relative;
  z-index: 2;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ResultCard = styled.div`
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  animation: ${countUp} 0.6s ease forwards;
  animation-delay: ${({ $delay }) => $delay * 0.1}s;
  opacity: 0;
`;

const ResultValue = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: #ff8c42;
  margin-bottom: 8px;
  line-height: 1;

  ${media.lg} {
    font-size: 48px;
  }
`;

const ResultMetric = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const ResultDescription = styled.div`
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
`;

// Main Image Section
const MainImageSection = styled.section`
  padding: 0 0 80px;
  background: #faf8f5;

  ${media.lg} {
    padding: 0 0 100px;
  }
`;

const MainImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

// Section Header
const SectionHeader = styled.div`
  margin-bottom: 48px;
`;

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

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;

  ${media.lg} {
    font-size: 40px;
  }
`;

// What We Did Section
const WhatWeDidSection = styled.section`
  padding: 80px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const WhatWeDidGrid = styled.div`
  display: grid;
  gap: 40px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
`;

const WhatWeDidContent = styled.div``;

const WhatWeDidText = styled.p`
  font-size: 17px;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 24px;
`;

const WhatWeDidList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const WhatWeDidItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #fff5ee, #ffede0);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ff8c42;
`;

const ItemText = styled.span`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
  line-height: 1.5;
  padding-top: 4px;
`;

const WhatWeDidImage = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

// Challenge & Solution Section
const StorySection = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  gap: 40px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;

const StoryCard = styled.div`
  padding: 40px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

const StoryIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

const StoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 28px;
  }
`;

const StoryText = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.8;
`;

// Gallery Section
const GallerySection = styled.section`
  padding: 80px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GalleryItem = styled.div`
  position: relative;
  aspect-ratio: ${({ $isLarge }) => ($isLarge ? '16/10' : '4/3')};
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  ${({ $isLarge }) =>
    $isLarge &&
    `
    @media (min-width: 1024px) {
      grid-column: span 2;
    }
  `}

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const GalleryImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.4) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

// Process Section
const ProcessSection = styled.section`
  padding: 80px 0;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const ProcessPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 60px 60px;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 32px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProcessCard = styled.div`
  padding: 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-4px);
  }
`;

const ProcessNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.3);
  margin-bottom: 16px;
  line-height: 1;
`;

const ProcessTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
`;

const ProcessDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

// Testimonial Section
const TestimonialSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const QuoteIcon = styled.div`
  font-size: 64px;
  color: #ff8c42;
  margin-bottom: 24px;
  line-height: 1;
`;

const QuoteText = styled.blockquote`
  font-size: 24px;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.6;
  margin: 0 0 32px;
  font-style: italic;

  ${media.lg} {
    font-size: 28px;
  }
`;

const QuoteAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: #666666;
`;

// Other Case Studies Section
const OtherCasesSection = styled.section`
  padding: 80px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const OtherCasesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CaseCard = styled(Link)`
  display: block;
  background: #faf8f5;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CaseImage = styled.div`
  aspect-ratio: 16/10;
  position: relative;
  overflow: hidden;
`;

const CaseContent = styled.div`
  padding: 24px;
`;

const CaseIndustry = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const CaseTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${CaseCard}:hover & {
    color: #ff8c42;
  }
`;

const CaseClient = styled.div`
  font-size: 14px;
  color: #666666;
`;

// CTA Section
const CTASection = styled.section`
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

// Process steps data
const processSteps = [
  { title: 'Discovery', desc: 'Deep dive into business goals, audience, and market research' },
  { title: 'Strategy', desc: 'Develop data-driven approach tailored to objectives' },
  { title: 'Execution', desc: 'Launch campaigns with continuous optimization' },
  { title: 'Scale', desc: 'Amplify results and expand successful initiatives' },
];

// What we did items based on services
const getWhatWeDid = (services) => {
  const items = {
    'Paid Social': 'Developed and executed high-performing paid social campaigns across Meta and TikTok',
    'Creative Strategy': 'Created 50+ scroll-stopping creatives optimized for conversion',
    'CRO': 'Implemented conversion rate optimization across the entire customer journey',
    'Google Ads': 'Built and optimized Google Search and Shopping campaigns',
    'LinkedIn Ads': 'Targeted decision-makers with precision B2B advertising',
    'Content Marketing': 'Produced compelling content that drove engagement and leads',
    'Lead Generation': 'Implemented multi-channel lead generation strategies',
    'Brand Strategy': 'Developed distinctive brand positioning and messaging',
    'Influencer Marketing': 'Partnered with relevant influencers to expand reach',
    'Email Marketing': 'Built automated email sequences for nurturing and retention',
    'Local Marketing': 'Executed hyperlocal campaigns to drive foot traffic',
    'Social Media': 'Managed organic social presence across all platforms',
    'App Marketing': 'Launched mobile-first acquisition campaigns',
    'TikTok Ads': 'Created viral video content for TikTok advertising',
    'Apple Search Ads': 'Optimized App Store visibility and downloads',
    'Creative Production': 'Produced high-quality video and static creative assets',
    'YouTube Ads': 'Developed video ad campaigns for YouTube',
    'Landing Pages': 'Designed and built high-converting landing pages',
  };

  return services.map((service) => items[service] || `Implemented ${service} strategy`);
};

export function CaseStudyPageContent({ caseStudy }) {
  const otherCaseStudies = caseStudies.filter((c) => c.id !== caseStudy.id).slice(0, 3);
  const whatWeDid = getWhatWeDid(caseStudy.services);

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOrb $size={600} $top="-20%" $left="-10%" $delay={0} />
        <HeroOrb $size={400} $top="60%" $left="80%" $delay={1} />
        <HeroGrid />

        <Container>
          <Breadcrumb>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbLink href="/portfolio">Portfolio</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbCurrent>{caseStudy.client}</BreadcrumbCurrent>
          </Breadcrumb>

          <HeroContent>
            <IndustryBadge>
              <BadgeText>{caseStudy.industry}</BadgeText>
            </IndustryBadge>

            <HeroTitle>{caseStudy.title}</HeroTitle>

            <HeroDescription>{caseStudy.description}</HeroDescription>

            <ClientInfo>
              <ClientLogo>{caseStudy.client.charAt(0)}</ClientLogo>
              <ClientDetails>
                <ClientName>{caseStudy.client}</ClientName>
                <ClientIndustry>{caseStudy.industry}</ClientIndustry>
              </ClientDetails>
            </ClientInfo>

            <ServiceTags>
              {caseStudy.services.map((service, index) => (
                <ServiceTag key={index}>{service}</ServiceTag>
              ))}
            </ServiceTags>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Results Section */}
      <ResultsSection>
        <Container>
          <ResultsGrid>
            {caseStudy.results.map((result, index) => (
              <ResultCard key={index} $delay={index}>
                <ResultValue>{result.value}</ResultValue>
                <ResultMetric>{result.metric}</ResultMetric>
                <ResultDescription>{result.description}</ResultDescription>
              </ResultCard>
            ))}
          </ResultsGrid>
        </Container>
      </ResultsSection>

      {/* Main Project Image */}
      <MainImageSection>
        <Container>
          <MainImageWrapper>
            <Image
              src={caseStudy.image}
              alt={`${caseStudy.client} case study`}
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </MainImageWrapper>
        </Container>
      </MainImageSection>

      {/* What We Did Section */}
      <WhatWeDidSection>
        <Container>
          <WhatWeDidGrid>
            <WhatWeDidContent>
              <SectionHeader>
                <SectionTag>
                  <TagLine />
                  <TagText>Our Approach</TagText>
                </SectionTag>
                <SectionTitle>What We Did</SectionTitle>
              </SectionHeader>
              <WhatWeDidText>
                We partnered closely with {caseStudy.client} to develop and execute a comprehensive
                marketing strategy that addressed their unique challenges and opportunities.
              </WhatWeDidText>
              <WhatWeDidList>
                {whatWeDid.map((item, index) => (
                  <WhatWeDidItem key={index}>
                    <ItemIcon>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </ItemIcon>
                    <ItemText>{item}</ItemText>
                  </WhatWeDidItem>
                ))}
              </WhatWeDidList>
            </WhatWeDidContent>
            <WhatWeDidImage>
              {caseStudy.galleryImages && caseStudy.galleryImages[0] && (
                <Image
                  src={caseStudy.galleryImages[0]}
                  alt="Project showcase"
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              )}
            </WhatWeDidImage>
          </WhatWeDidGrid>
        </Container>
      </WhatWeDidSection>

      {/* Challenge & Solution Section */}
      <StorySection>
        <Container>
          <StoryGrid>
            <StoryCard>
              <StoryIcon $color="rgba(255, 140, 66, 0.15)">
                <span role="img" aria-label="challenge">🎯</span>
              </StoryIcon>
              <StoryTitle>The Challenge</StoryTitle>
              <StoryText>{caseStudy.challenge}</StoryText>
            </StoryCard>

            <StoryCard>
              <StoryIcon $color="rgba(34, 197, 94, 0.15)">
                <span role="img" aria-label="solution">💡</span>
              </StoryIcon>
              <StoryTitle>Our Solution</StoryTitle>
              <StoryText>{caseStudy.solution}</StoryText>
            </StoryCard>
          </StoryGrid>
        </Container>
      </StorySection>

      {/* Our Process Section */}
      <ProcessSection>
        <ProcessPattern />
        <Container>
          <SectionHeader style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionTag style={{ justifyContent: 'center' }}>
              <TagLine />
              <TagText style={{ color: '#ff8c42' }}>Our Process</TagText>
            </SectionTag>
            <SectionTitle style={{ color: '#ffffff' }}>How We Delivered Results</SectionTitle>
          </SectionHeader>
          <ProcessGrid>
            {processSteps.map((step, index) => (
              <ProcessCard key={index}>
                <ProcessNumber>0{index + 1}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDesc>{step.desc}</ProcessDesc>
              </ProcessCard>
            ))}
          </ProcessGrid>
        </Container>
      </ProcessSection>

      {/* Gallery Section */}
      {caseStudy.galleryImages && caseStudy.galleryImages.length > 0 && (
        <GallerySection>
          <Container>
            <SectionHeader>
              <SectionTag>
                <TagLine />
                <TagText>Project Gallery</TagText>
              </SectionTag>
              <SectionTitle>Visual Highlights</SectionTitle>
            </SectionHeader>
            <GalleryGrid>
              {caseStudy.galleryImages.map((image, index) => (
                <GalleryItem key={index} $isLarge={index === 0}>
                  <GalleryImage
                    src={image}
                    alt={`${caseStudy.client} project image ${index + 1}`}
                    fill
                    unoptimized
                  />
                  <GalleryOverlay />
                </GalleryItem>
              ))}
            </GalleryGrid>
          </Container>
        </GallerySection>
      )}

      {/* Testimonial Section */}
      {caseStudy.testimonial && (
        <TestimonialSection>
          <Container>
            <TestimonialContent>
              <QuoteIcon>&ldquo;</QuoteIcon>
              <QuoteText>{caseStudy.testimonial.quote}</QuoteText>
              <QuoteAuthor>
                <AuthorName>{caseStudy.testimonial.author}</AuthorName>
                <AuthorRole>{caseStudy.testimonial.role}</AuthorRole>
              </QuoteAuthor>
            </TestimonialContent>
          </Container>
        </TestimonialSection>
      )}

      {/* Other Case Studies */}
      <OtherCasesSection>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>More Success Stories</TagText>
            </SectionTag>
            <SectionTitle>Explore Other Case Studies</SectionTitle>
          </SectionHeader>

          <OtherCasesGrid>
            {otherCaseStudies.map((otherCase) => (
              <CaseCard key={otherCase.id} href={`/portfolio/${otherCase.slug}`}>
                <CaseImage>
                  <Image
                    src={otherCase.image}
                    alt={otherCase.client}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </CaseImage>
                <CaseContent>
                  <CaseIndustry>{otherCase.industry}</CaseIndustry>
                  <CaseTitle>{otherCase.title}</CaseTitle>
                  <CaseClient>{otherCase.client}</CaseClient>
                </CaseContent>
              </CaseCard>
            ))}
          </OtherCasesGrid>
        </Container>
      </OtherCasesSection>

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to be our next <CTAHighlight>success story?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Let&apos;s discuss how we can help your brand achieve extraordinary results.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Start Your Project</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
