'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { services, getFaqsByServiceSlug } from '@/data';
import { FAQAccordion } from '@/components/sections';
import { ServiceIcon } from '@/components/icons';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 160px 0 100px;
  background: #ffffff;
  overflow: hidden;

  ${media.lg} {
    min-height: 90vh;
    padding: 120px 0 80px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #fef6f0 0%, #fff8f3 100%);
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);

  ${media.lg} {
    width: 45%;
  }
`;

const HeroAccentLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 120px;
  height: 2px;
  background: #ff8c42;
  transform: translateY(-50%);

  ${media.md} {
    display: block;
  }

  display: none;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const BreadcrumbLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #999999;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #dddddd;
  font-size: 12px;
`;

const BreadcrumbCurrent = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
`;

const ServiceNumber = styled.div`
  font-size: 120px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.08);
  line-height: 1;
  margin-bottom: -40px;
  animation: ${fadeInUp} 0.6s ease 0.1s forwards;
  opacity: 0;

  ${media.lg} {
    font-size: 180px;
    margin-bottom: -60px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.1;
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;
  opacity: 0;

  ${media.lg} {
    font-size: 72px;
  }
`;

const TitleAccent = styled.span`
  color: #ff8c42;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 140, 66, 0.3);

    ${media.lg} {
      bottom: 12px;
      height: 6px;
    }
  }
`;

const HeroDescription = styled.p`
  font-size: 20px;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 48px;
  max-width: 540px;
  animation: ${fadeInUp} 0.6s ease 0.3s forwards;
  opacity: 0;

  ${media.lg} {
    font-size: 22px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  animation: ${fadeInUp} 0.6s ease 0.4s forwards;
  opacity: 0;
`;

const OutlineButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
    color: #ffffff;
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const HeroStats = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-direction: column;
  gap: 40px;
  animation: ${scaleIn} 0.8s ease 0.5s forwards;
  opacity: 0;

  ${media.xl} {
    display: flex;
  }
`;

const StatItem = styled.div`
  text-align: right;
`;

const StatValue = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: #ff8c42;
  line-height: 1;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// Intro Section
const IntroSection = styled.section`
  padding: 100px 0;
  background: #1a1a1a;
  position: relative;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const IntroQuote = styled.blockquote`
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.6;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;

  ${media.lg} {
    font-size: 36px;
  }

  &::before {
    content: '"';
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 120px;
    color: #ff8c42;
    opacity: 0.3;
    font-family: Georgia, serif;
    line-height: 1;
  }
`;

// Features Section
const FeaturesSection = styled.section`
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

// Stacked Cards Layout
const StackedSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${media.lg} {
    flex-direction: row;
    gap: 80px;
    align-items: center;
  }
`;

const StackedSideContent = styled.div`
  flex: 1;
  order: 2;

  ${media.lg} {
    order: 1;
  }
`;

const StackedCounter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 16px;
`;

const StackedCurrentNumber = styled.span`
  font-size: 56px;
  font-weight: 800;
  color: #ff8c42;
  line-height: 1;

  ${media.lg} {
    font-size: 72px;
  }
`;

const StackedTotalNumber = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #cccccc;

  ${media.lg} {
    font-size: 32px;
  }
`;

const StackedSideTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.3;

  ${media.lg} {
    font-size: 36px;
  }
`;

const StackedSideDesc = styled.p`
  font-size: 17px;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 32px;

  ${media.lg} {
    font-size: 18px;
  }
`;

const StackedProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e8e8e8;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const StackedProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ff8c42, #ffb380);
  border-radius: 2px;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.5s ease;
`;

const StackNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StackArrow = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  border: 2px solid #e8e8e8;
  background: #ffffff;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    border-color: #ff8c42;
    background: #ff8c42;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 140, 66, 0.3);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const StackDots = styled.div`
  display: flex;
  gap: 6px;
`;

const StackDot = styled.button`
  width: ${({ $isActive }) => ($isActive ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#e0e0e0')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#ccc')};
  }
`;

const StackedCardsWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 420px;
  order: 1;

  ${media.lg} {
    min-height: 480px;
    order: 2;
  }
`;

const StackedCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  transition: all 0.5s ease;
  cursor: pointer;

  ${({ $index, $activeIndex }) => {
    const diff = $index - $activeIndex;
    if (diff === 0) {
      return `
        transform: translateY(0) scale(1);
        z-index: 10;
        opacity: 1;
      `;
    } else if (diff === 1) {
      return `
        transform: translateY(30px) scale(0.95);
        z-index: 5;
        opacity: 0.7;
      `;
    } else if (diff === 2) {
      return `
        transform: translateY(60px) scale(0.9);
        z-index: 3;
        opacity: 0.4;
      `;
    } else {
      return `
        transform: translateY(90px) scale(0.85);
        z-index: 1;
        opacity: 0;
        pointer-events: none;
      `;
    }
  }}

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  }
`;

const StackedCardImageOnly = styled.div`
  height: 350px;
  position: relative;

  ${media.lg} {
    height: 420px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Target Audience Section
const AudienceSection = styled.section`
  padding: 0;
  background: #ffffff;
  display: grid;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    min-height: 600px;
  }
`;

const AudienceLeft = styled.div`
  padding: 80px 40px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.lg} {
    padding: 100px 80px;
  }
`;

const AudienceTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const AudienceSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  max-width: 400px;
`;

const AudienceRight = styled.div`
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.lg} {
    padding: 100px 80px;
  }
`;

const AudienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const AudienceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px 0;
  border-bottom: 1px solid #eeeeee;
  transition: all 0.3s ease;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:hover {
    padding-left: 12px;
  }
`;

const AudienceIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ee, #fff0e6);
  border-radius: 10px;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: #ff8c42;
  }
`;

const AudienceText = styled.p`
  font-size: 17px;
  color: #444444;
  line-height: 1.6;
  margin: 0;
  padding-top: 8px;
`;

// Results Section
const ResultsSection = styled.section`
  padding: 100px 0;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const ResultsPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 60px 60px;
`;

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
`;

const ResultsTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const ResultsSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  margin: 0 auto;
`;

const ResultsGrid = styled.div`
  display: grid;
  gap: 32px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResultCard = styled.div`
  text-align: center;
  padding: 48px 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-8px);
  }
`;

const ResultIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

const ResultTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
`;

const ResultDescription = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

// Related Services
const RelatedSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-top: 60px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RelatedCard = styled(Link)`
  display: block;
  padding: 40px 32px;
  background: #faf8f5;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '→';
    position: absolute;
    bottom: 40px;
    right: 32px;
    font-size: 24px;
    color: #ff8c42;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  &:hover {
    background: #fff5ee;

    &::after {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const RelatedIcon = styled.div`
  margin-bottom: 20px;
  color: #ff8c42;
`;

const RelatedTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  transition: color 0.3s ease;

  ${RelatedCard}:hover & {
    color: #ff8c42;
  }
`;

const RelatedDescription = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.6;
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

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// FAQ Section
const FAQSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const FAQWrapper = styled.div`
  margin-top: 60px;
`;

const outcomeIcons = ['📈', '💰', '🚀'];

const featureImages = [
  'https://picsum.photos/seed/feature1/600/500',
  'https://picsum.photos/seed/feature2/600/500',
  'https://picsum.photos/seed/feature3/600/500',
  'https://picsum.photos/seed/feature4/600/500',
  'https://picsum.photos/seed/feature5/600/500',
  'https://picsum.photos/seed/feature6/600/500',
  'https://picsum.photos/seed/feature7/600/500',
  'https://picsum.photos/seed/feature8/600/500',
];

export function ServicePageContent({ service }) {
  const otherServices = services.filter(s => s.id !== service.id).slice(0, 3);
  const serviceIndex = services.findIndex(s => s.id === service.id) + 1;
  const serviceFaqs = getFaqsByServiceSlug(service.slug);
  const [stackedCardIndex, setStackedCardIndex] = useState(0);

  const nextStackedCard = () => {
    setStackedCardIndex(prev => Math.min(prev + 1, service.included.length - 1));
  };

  const prevStackedCard = () => {
    setStackedCardIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroBackground />
        <HeroAccentLine />

        <Container>
          <Breadcrumb>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>—</BreadcrumbSeparator>
            <BreadcrumbLink href="/services">Services</BreadcrumbLink>
            <BreadcrumbSeparator>—</BreadcrumbSeparator>
            <BreadcrumbCurrent>{service.title}</BreadcrumbCurrent>
          </Breadcrumb>

          <HeroContent>
            <ServiceNumber>0{serviceIndex}</ServiceNumber>

            <HeroTitle>
              {service.title.split(' ').slice(0, -1).join(' ')}{' '}
              <TitleAccent>{service.title.split(' ').slice(-1)}</TitleAccent>
            </HeroTitle>

            <HeroDescription>{service.shortDescription}</HeroDescription>

            <HeroButtons>
              <AnimatedButton href="/contact" variant="orange">Start Your Project</AnimatedButton>
              <OutlineButton href="#features">
                Explore Features
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </OutlineButton>
            </HeroButtons>
          </HeroContent>

          <HeroStats>
            <StatItem>
              <StatValue>50+</StatValue>
              <StatLabel>Projects</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>4.2x</StatValue>
              <StatLabel>Avg ROAS</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>95%</StatValue>
              <StatLabel>Retention</StatLabel>
            </StatItem>
          </HeroStats>
        </Container>
      </HeroSection>

      {/* Intro Quote Section */}
      <IntroSection>
        <Container>
          <IntroQuote>
            {service.fullDescription}
          </IntroQuote>
        </Container>
      </IntroSection>

      {/* Features Section */}
      <FeaturesSection id="features">
        <Container>
          <SectionHeader>
            <div>
              <SectionTag>
                <TagLine />
                <TagText>What&apos;s Included</TagText>
              </SectionTag>
              <SectionTitle>Everything you need</SectionTitle>
            </div>
            <SectionSubtitle>
              Comprehensive solutions designed to drive real results for your business.
            </SectionSubtitle>
          </SectionHeader>

          <StackedSectionWrapper>
            <StackedSideContent>
              <StackedCounter>
                <StackedCurrentNumber>{String(stackedCardIndex + 1).padStart(2, '0')}</StackedCurrentNumber>
                <StackedTotalNumber>/ {String(service.included.length).padStart(2, '0')}</StackedTotalNumber>
              </StackedCounter>
              <StackedSideTitle>{service.included[stackedCardIndex]}</StackedSideTitle>
              <StackedSideDesc>
                Each element of our service is designed to drive measurable results and help your brand stand out.
              </StackedSideDesc>
              <StackedProgressBar>
                <StackedProgressFill $progress={((stackedCardIndex + 1) / service.included.length) * 100} />
              </StackedProgressBar>
              <StackNavigation>
                <StackArrow onClick={prevStackedCard} disabled={stackedCardIndex === 0}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </StackArrow>
                <StackDots>
                  {service.included.map((_, index) => (
                    <StackDot
                      key={index}
                      $isActive={index === stackedCardIndex}
                      onClick={() => setStackedCardIndex(index)}
                    />
                  ))}
                </StackDots>
                <StackArrow onClick={nextStackedCard} disabled={stackedCardIndex === service.included.length - 1}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </StackArrow>
              </StackNavigation>
            </StackedSideContent>
            <StackedCardsWrapper>
              {service.included.map((item, index) => {
                const diff = index - stackedCardIndex;
                const isVisible = diff >= 0 && diff <= 2;
                if (!isVisible) return null;

                return (
                  <StackedCard
                    key={index}
                    $index={index}
                    $activeIndex={stackedCardIndex}
                    onClick={() => index === stackedCardIndex + 1 && nextStackedCard()}
                  >
                    <StackedCardImageOnly>
                      <img src={featureImages[index % featureImages.length]} alt={item} />
                    </StackedCardImageOnly>
                  </StackedCard>
                );
              })}
            </StackedCardsWrapper>
          </StackedSectionWrapper>
        </Container>
      </FeaturesSection>

      {/* Target Audience Section */}
      <AudienceSection>
        <AudienceLeft>
          <AudienceTitle>Is this right for you?</AudienceTitle>
          <AudienceSubtitle>
            We work with ambitious brands ready to scale. Here&apos;s who benefits most from this service.
          </AudienceSubtitle>
        </AudienceLeft>

        <AudienceRight>
          <AudienceList>
            {service.whoItsFor.map((item, index) => (
              <AudienceItem key={index}>
                <AudienceIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </AudienceIcon>
                <AudienceText>{item}</AudienceText>
              </AudienceItem>
            ))}
          </AudienceList>
        </AudienceRight>
      </AudienceSection>

      {/* Results Section */}
      <ResultsSection>
        <ResultsPattern />
        <Container>
          <ResultsHeader>
            <SectionTag style={{ justifyContent: 'center' }}>
              <TagLine />
              <TagText style={{ color: '#ff8c42' }}>Expected Results</TagText>
            </SectionTag>
            <ResultsTitle>What you can expect</ResultsTitle>
            <ResultsSubtitle>
              Our clients consistently see measurable improvements across key metrics.
            </ResultsSubtitle>
          </ResultsHeader>

          <ResultsGrid>
            {service.outcomes.map((outcome, index) => (
              <ResultCard key={index}>
                <ResultIcon>{outcomeIcons[index] || '✨'}</ResultIcon>
                <ResultTitle>{outcome.title}</ResultTitle>
                <ResultDescription>{outcome.description}</ResultDescription>
              </ResultCard>
            ))}
          </ResultsGrid>
        </Container>
      </ResultsSection>

      {/* Related Services Section */}
      <RelatedSection>
        <Container>
          <SectionTag>
            <TagLine />
            <TagText>Explore More</TagText>
          </SectionTag>
          <SectionTitle>Related services</SectionTitle>

          <RelatedGrid>
            {otherServices.map((otherService) => (
              <RelatedCard key={otherService.id} href={`/services/${otherService.slug}`}>
                <RelatedIcon><ServiceIcon slug={otherService.slug} size={40} /></RelatedIcon>
                <RelatedTitle>{otherService.title}</RelatedTitle>
                <RelatedDescription>{otherService.shortDescription}</RelatedDescription>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </Container>
      </RelatedSection>

      {/* FAQ Section */}
      {serviceFaqs.length > 0 && (
        <FAQSection>
          <Container>
            <SectionTag>
              <TagLine />
              <TagText>Common Questions</TagText>
            </SectionTag>
            <SectionTitle>Frequently asked questions</SectionTitle>

            <FAQWrapper>
              <FAQAccordion faqs={serviceFaqs} />
            </FAQWrapper>
          </Container>
        </FAQSection>
      )}

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
