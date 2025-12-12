'use client';

import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Service } from '@/types';
import { services } from '@/data';

interface ServicePageContentProps {
  service: Service;
}

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #111111 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 15s ease infinite;
  overflow: hidden;

  ${media.lg} {
    min-height: 60vh;
    padding: 80px 0;
  }
`;

const HeroOrb = styled.div<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 75, 75, 0.25), transparent 70%);
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
    color: ${({ theme }) => theme.colors.accent};
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
  display: grid;
  gap: 48px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

const HeroLeft = styled.div``;

const ServiceBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 75, 75, 0.15);
  border: 1px solid rgba(255, 75, 75, 0.3);
  border-radius: 100px;
  margin-bottom: 24px;
`;

const BadgeIcon = styled.span`
  font-size: 20px;
`;

const BadgeText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.15;

  ${media.lg} {
    font-size: 56px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #FF4B4B, #FF8F8F);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 32px;

  ${media.lg} {
    font-size: 20px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;


const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 18px 36px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const HeroRight = styled.div`
  position: relative;
`;

const ImagePlaceholder = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 75, 75, 0.05));
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
  }
`;

const PlaceholderContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  animation: ${float} 3s ease-in-out infinite;
`;

const PlaceholderText = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
`;

const FloatingCard = styled.div<{ $top?: string; $bottom?: string; $left?: string; $right?: string }>`
  position: absolute;
  ${({ $top }) => $top && `top: ${$top};`}
  ${({ $bottom }) => $bottom && `bottom: ${$bottom};`}
  ${({ $left }) => $left && `left: ${$left};`}
  ${({ $right }) => $right && `right: ${$right};`}
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  animation: ${float} 4s ease-in-out infinite;
  z-index: 2;

  ${media.md} {
    display: block;
  }

  display: none;
`;

const FloatingCardText = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
`;

const FloatingCardValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

// Overview Section
const OverviewSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  gap: 60px;

  ${media.lg} {
    grid-template-columns: 1fr 400px;
    gap: 80px;
  }
`;

const OverviewContent = styled.div``;

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

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 40px;
  }
`;

const SectionText = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: 40px;
`;

const OverviewImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #f8f8f8, #f0f0f0);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 75, 75, 0.05), transparent);
  }
`;

const OverviewPlaceholderIcon = styled.div`
  font-size: 80px;
  position: relative;
  z-index: 1;
`;

// Included Section
const IncludedSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);

  ${media.lg} {
    padding: 120px 0;
  }
`;

const IncludedGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const IncludedCard = styled.div<{ $delay: number }>`
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const IncludedNumber = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 75, 75, 0.05));
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
`;

const IncludedTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.5;
`;

// Who Section
const WhoSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const WhoGrid = styled.div`
  display: grid;
  gap: 60px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

const WhoImageWrapper = styled.div`
  position: relative;
  order: 2;

  ${media.lg} {
    order: 1;
  }
`;

const WhoImage = styled.div`
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #f8f8f8, #f0f0f0);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 75, 75, 0.05), transparent);
  }
`;

const WhoImageIcon = styled.div`
  font-size: 100px;
  position: relative;
  z-index: 1;
`;

const WhoContent = styled.div`
  order: 1;

  ${media.lg} {
    order: 2;
  }
`;

const WhoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WhoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 75, 75, 0.05);
  }
`;

const WhoItemIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF4B4B, #FF8F8F);
  border-radius: 12px;
  flex-shrink: 0;
`;

const WhoItemCheck = styled.span`
  color: #ffffff;
  font-size: 18px;
`;

const WhoItemText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

// Outcomes Section
const OutcomesSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #111111 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const OutcomesGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-top: 60px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OutcomeCard = styled.div`
  padding: 40px 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const OutcomeIcon = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.2), rgba(255, 75, 75, 0.1));
  border-radius: 20px;
  font-size: 32px;
`;

const OutcomeTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
`;

const OutcomeDescription = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

const WhiteSectionTitle = styled(SectionTitle)`
  color: #ffffff;
  text-align: center;
`;

const WhiteSectionText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

// Other Services Section
const OtherServicesSection = styled.section`
  padding: 100px 0;
  background: #fafafa;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const OtherServicesGrid = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 48px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OtherServiceCard = styled(Link)`
  display: block;
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const OtherServiceIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const OtherServiceTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  transition: color 0.3s ease;

  ${OtherServiceCard}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const OtherServiceDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

// CTA Section
const CTASection = styled.section`
  padding: 100px 0;
  background: #ffffff;

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


const outcomeIcons = ['📈', '💰', '🚀'];

export function ServicePageContent({ service }: ServicePageContentProps) {
  const otherServices = services.filter(s => s.id !== service.id).slice(0, 3);

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
            <BreadcrumbLink href="/services">Services</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbCurrent>{service.title}</BreadcrumbCurrent>
          </Breadcrumb>

          <HeroContent>
            <HeroLeft>
              <ServiceBadge>
                <BadgeIcon>{service.icon}</BadgeIcon>
                <BadgeText>Service</BadgeText>
              </ServiceBadge>

              <HeroTitle>
                {service.title.split(' ').slice(0, -1).join(' ')}{' '}
                <GradientText>{service.title.split(' ').slice(-1)}</GradientText>
              </HeroTitle>

              <HeroDescription>{service.shortDescription}</HeroDescription>

              <HeroButtons>
                <AnimatedButton href="/contact" variant="orange">Get Started</AnimatedButton>
                <SecondaryButton href="#overview">
                  Learn More
                  <span>↓</span>
                </SecondaryButton>
              </HeroButtons>
            </HeroLeft>

            <HeroRight>
              <ImagePlaceholder>
                <PlaceholderContent>
                  <PlaceholderIcon>{service.icon}</PlaceholderIcon>
                  <PlaceholderText>Service illustration</PlaceholderText>
                </PlaceholderContent>
              </ImagePlaceholder>

              <FloatingCard $top="-20px" $right="-20px" style={{ animationDelay: '0s' }}>
                <FloatingCardText>Average ROAS</FloatingCardText>
                <FloatingCardValue>4.2x</FloatingCardValue>
              </FloatingCard>

              <FloatingCard $bottom="40px" $left="-30px" style={{ animationDelay: '1s' }}>
                <FloatingCardText>Brands Scaled</FloatingCardText>
                <FloatingCardValue>50+</FloatingCardValue>
              </FloatingCard>
            </HeroRight>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Overview Section */}
      <OverviewSection id="overview">
        <Container>
          <OverviewGrid>
            <OverviewContent>
              <SectionLabel>
                <LabelDot />
                <LabelText>Overview</LabelText>
              </SectionLabel>

              <SectionTitle>What we do</SectionTitle>

              <SectionText>{service.fullDescription}</SectionText>

              <SectionText>
                Our approach combines data-driven strategy with creative excellence to deliver
                measurable results. We don&apos;t just run campaigns—we become an extension of your
                team, deeply invested in your success.
              </SectionText>
            </OverviewContent>

            <OverviewImage>
              <OverviewPlaceholderIcon>{service.icon}</OverviewPlaceholderIcon>
            </OverviewImage>
          </OverviewGrid>
        </Container>
      </OverviewSection>

      {/* What's Included Section */}
      <IncludedSection>
        <Container>
          <SectionLabel>
            <LabelDot />
            <LabelText>What&apos;s Included</LabelText>
          </SectionLabel>

          <SectionTitle>Everything you need to succeed</SectionTitle>

          <IncludedGrid>
            {service.included.map((item, index) => (
              <IncludedCard key={index} $delay={index * 0.1}>
                <IncludedNumber>0{index + 1}</IncludedNumber>
                <IncludedTitle>{item}</IncludedTitle>
              </IncludedCard>
            ))}
          </IncludedGrid>
        </Container>
      </IncludedSection>

      {/* Who It's For Section */}
      <WhoSection>
        <Container>
          <WhoGrid>
            <WhoImageWrapper>
              <WhoImage>
                <WhoImageIcon>🎯</WhoImageIcon>
              </WhoImage>
            </WhoImageWrapper>

            <WhoContent>
              <SectionLabel>
                <LabelDot />
                <LabelText>Who It&apos;s For</LabelText>
              </SectionLabel>

              <SectionTitle>Is this service right for you?</SectionTitle>

              <WhoList>
                {service.whoItsFor.map((item, index) => (
                  <WhoItem key={index}>
                    <WhoItemIcon>
                      <WhoItemCheck>✓</WhoItemCheck>
                    </WhoItemIcon>
                    <WhoItemText>{item}</WhoItemText>
                  </WhoItem>
                ))}
              </WhoList>
            </WhoContent>
          </WhoGrid>
        </Container>
      </WhoSection>

      {/* Outcomes Section */}
      <OutcomesSection>
        <HeroOrb $size={500} $top="50%" $left="-10%" $delay={0} />
        <Container>
          <SectionLabel style={{ justifyContent: 'center' }}>
            <LabelDot />
            <LabelText>Results</LabelText>
          </SectionLabel>

          <WhiteSectionTitle>What you can expect</WhiteSectionTitle>

          <WhiteSectionText>
            Our clients consistently see measurable improvements across key metrics.
          </WhiteSectionText>

          <OutcomesGrid>
            {service.outcomes.map((outcome, index) => (
              <OutcomeCard key={index}>
                <OutcomeIcon>{outcomeIcons[index] || '✨'}</OutcomeIcon>
                <OutcomeTitle>{outcome.title}</OutcomeTitle>
                <OutcomeDescription>{outcome.description}</OutcomeDescription>
              </OutcomeCard>
            ))}
          </OutcomesGrid>
        </Container>
      </OutcomesSection>

      {/* Other Services Section */}
      <OtherServicesSection>
        <Container>
          <SectionLabel>
            <LabelDot />
            <LabelText>Explore More</LabelText>
          </SectionLabel>

          <SectionTitle>Other services you might like</SectionTitle>

          <OtherServicesGrid>
            {otherServices.map((otherService) => (
              <OtherServiceCard key={otherService.id} href={`/services/${otherService.slug}`}>
                <OtherServiceIcon>{otherService.icon}</OtherServiceIcon>
                <OtherServiceTitle>{otherService.title}</OtherServiceTitle>
                <OtherServiceDescription>{otherService.shortDescription}</OtherServiceDescription>
              </OtherServiceCard>
            ))}
          </OtherServicesGrid>
        </Container>
      </OtherServicesSection>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <CTACard>
            <CTAOrb />
            <CTATitle>
              Ready to get started with {service.title.toLowerCase()}?
            </CTATitle>
            <CTAText>
              Book a free strategy call and discover how we can help you achieve your growth goals.
            </CTAText>
            <AnimatedButton href="/contact" variant="orange">Book a Free Strategy Call</AnimatedButton>
          </CTACard>
        </Container>
      </CTASection>
    </>
  );
}
