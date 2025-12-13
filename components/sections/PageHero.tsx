'use client';

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0d0d12;
  padding: 140px 0 80px;

  ${media.lg} {
    min-height: 60vh;
    padding: 80px 0;
  }
`;

const CircularGlow = styled.div`
  position: absolute;
  top: 50%;
  left: -10%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 69, 180, 0.5) 0%, rgba(80, 40, 120, 0.3) 40%, transparent 70%);
  filter: blur(80px);
  animation: ${pulse} 8s ease-in-out infinite;
  pointer-events: none;

  ${media.lg} {
    width: 700px;
    height: 700px;
    left: -15%;
  }
`;

const CircularRings = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  pointer-events: none;

  ${media.lg} {
    width: 500px;
    height: 500px;
    left: 0;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(139, 69, 180, 0.25);
  }

  &::before {
    inset: 0;
  }

  &::after {
    inset: 50px;
  }
`;

const InnerRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid rgba(139, 69, 180, 0.2);

  ${media.lg} {
    width: 250px;
    height: 250px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;

  ${media.lg} {
    padding: 0 80px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const BadgeLine = styled.span`
  width: 24px;
  height: 2px;
  background: #ff8c42;
`;

const BadgeText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  ${media.md} {
    font-size: 48px;
  }

  ${media.lg} {
    font-size: 56px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;

  ${media.lg} {
    font-size: 18px;
  }
`;

const BigText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 50px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  line-height: 1;
  padding-bottom: 10px;
  pointer-events: none;

  ${media.md} {
    font-size: 100px;
    padding-bottom: 15px;
  }

  ${media.lg} {
    font-size: 160px;
    padding-bottom: 20px;
  }

  @media (min-width: 1400px) {
    font-size: 200px;
  }
`;

interface PageHeroProps {
  badge: string;
  title: string;
  description?: string;
  bigText: string;
}

export default function PageHero({ badge, title, description, bigText }: PageHeroProps) {
  return (
    <HeroSection>
      {/* Background Effects */}
      <CircularGlow />
      <CircularRings>
        <InnerRing />
      </CircularRings>

      <ContentWrapper>
        <Badge>
          <BadgeLine />
          <BadgeText>{badge}</BadgeText>
        </Badge>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </ContentWrapper>

      <BigText>{bigText}</BigText>
    </HeroSection>
  );
}
