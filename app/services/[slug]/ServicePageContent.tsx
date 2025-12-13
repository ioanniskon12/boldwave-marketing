'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Service } from '@/types';
import { services } from '@/data';

interface ServicePageContentProps {
  service: Service;
}

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

// Hero Section - Clean, minimal with large typography
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

// Intro Section - Full width quote style
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

// Features Section - Horizontal scrolling cards
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

const FeaturesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  padding: 40px 32px;
  background: #ffffff;
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

// Target Audience Section - Split layout
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

// Results Section - Big numbers
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

// Related Services - Minimal cards
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
  font-size: 40px;
  margin-bottom: 20px;
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

// CTA Section - Bold statement
const CTASection = styled.section`
  padding: 120px 0;
  background: #faf8f5;
  text-align: center;

  ${media.lg} {
    padding: 160px 0;
  }
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: #1a1a1a;
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
  color: #666666;
  margin-bottom: 48px;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const outcomeIcons = ['📈', '💰', '🚀'];

export function ServicePageContent({ service }: ServicePageContentProps) {
  const otherServices = services.filter(s => s.id !== service.id).slice(0, 3);
  const serviceIndex = services.findIndex(s => s.id === service.id) + 1;

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

          <FeaturesGrid>
            {service.included.map((item, index) => (
              <FeatureCard key={index}>
                <FeatureNumber>0{index + 1}</FeatureNumber>
                <FeatureTitle>{item}</FeatureTitle>
              </FeatureCard>
            ))}
          </FeaturesGrid>
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
                <RelatedIcon>{otherService.icon}</RelatedIcon>
                <RelatedTitle>{otherService.title}</RelatedTitle>
                <RelatedDescription>{otherService.shortDescription}</RelatedDescription>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </Container>
      </RelatedSection>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to <CTAHighlight>transform</CTAHighlight> your brand?
            </CTATitle>
            <CTAText>
              Book a free strategy call and let&apos;s discuss how {service.title.toLowerCase()} can accelerate your growth.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Book a Strategy Call</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
