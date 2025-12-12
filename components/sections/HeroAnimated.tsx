'use client';

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import AnimatedButton from '@/components/ui/AnimatedButton';

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0d0d12;
  padding: 100px 0 0;

  ${media.lg} {
    padding: 80px 0 0;
  }
`;

const CircularGlow = styled.div`
  position: absolute;
  top: 50%;
  left: -10%;
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 69, 180, 0.5) 0%, rgba(80, 40, 120, 0.3) 40%, transparent 70%);
  filter: blur(80px);
  animation: ${pulse} 8s ease-in-out infinite;
  pointer-events: none;

  ${media.lg} {
    width: 900px;
    height: 900px;
    left: -15%;
  }
`;

const CircularRings = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  pointer-events: none;

  ${media.lg} {
    width: 600px;
    height: 600px;
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
    inset: 60px;
  }
`;

const InnerRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid rgba(139, 69, 180, 0.2);

  ${media.lg} {
    width: 300px;
    height: 300px;
  }
`;

const SocialSidebar = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-direction: column;
  gap: 24px;
  z-index: 20;

  ${media.lg} {
    display: flex;
    left: 30px;
  }
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    color: #ff8c42;
    border-color: #ff8c42;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  gap: 40px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1.2fr;
    gap: 60px;
    padding: 0 80px;
  }
`;

const LeftContent = styled.div`
  text-align: center;
  padding-top: 40px;

  ${media.lg} {
    text-align: left;
    padding-top: 0;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 32px;
  font-style: italic;

  ${media.lg} {
    font-size: 52px;
  }
`;

const RightContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  ${media.lg} {
    justify-content: flex-end;
  }
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;

  ${media.lg} {
    max-width: 600px;
  }
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, #4a3a5a 0%, #2a2035 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    height: 500px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
`;

const DecorativeArrow = styled.div`
  position: absolute;
  top: -20px;
  right: 30%;
  color: #ff8c42;
  font-size: 24px;
  transform: rotate(-30deg);
`;

const StatsCard = styled.div`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 24px;
  min-width: 200px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  ${media.lg} {
    right: -40px;
    min-width: 240px;
    padding: 24px 28px;
  }
`;

const StatsTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16px;

  span {
    color: #ff8c42;
  }
`;

const ProgressItem = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const ProgressBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  background: ${({ $color }) => $color};
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
`;

const ProgressText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #333333;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: #e8e8e8;
  border-radius: 100px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $width: string; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background: ${({ $color }) => $color};
  border-radius: 100px;
`;

const BigText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 60px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.03) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  line-height: 1;
  padding-bottom: 10px;
  pointer-events: none;

  ${media.md} {
    font-size: 120px;
    padding-bottom: 20px;
  }

  ${media.lg} {
    font-size: 200px;
    padding-bottom: 30px;
  }

  @media (min-width: 1400px) {
    font-size: 240px;
  }
`;

export default function HeroAnimated() {
  return (
    <HeroSection>
      {/* Background Effects */}
      <CircularGlow />
      <CircularRings>
        <InnerRing />
      </CircularRings>

      {/* Social Sidebar */}
      <SocialSidebar>
        <SocialLink href="#" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </SocialLink>
        <SocialLink href="#" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </SocialLink>
        <SocialLink href="#" aria-label="Twitter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </SocialLink>
        <SocialLink href="#" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </SocialLink>
      </SocialSidebar>

      <ContentWrapper>
        <LeftContent>
          <Title>
            Cost-Effective and<br />
            Impactful Marketing<br />
            Strategies
          </Title>

          <AnimatedButton href="/contact">Free Consultation</AnimatedButton>
        </LeftContent>

        <RightContent>
          <HeroImageWrapper>
            <DecorativeArrow>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </DecorativeArrow>

            <HeroImage>
              <ImagePlaceholder>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </ImagePlaceholder>
            </HeroImage>

            <StatsCard>
              <StatsTitle>Project Statistic <span>2025</span></StatsTitle>

              <ProgressItem>
                <ProgressLabel>
                  <ProgressBadge $color="#10b981">92%</ProgressBadge>
                  <ProgressText>Happy Client</ProgressText>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill $width="92%" $color="#10b981" />
                </ProgressBar>
              </ProgressItem>

              <ProgressItem>
                <ProgressLabel>
                  <ProgressBadge $color="#ff8c42">96%</ProgressBadge>
                  <ProgressText>Project Success</ProgressText>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill $width="96%" $color="#ff8c42" />
                </ProgressBar>
              </ProgressItem>
            </StatsCard>
          </HeroImageWrapper>
        </RightContent>
      </ContentWrapper>

      <BigText>MARKETING</BigText>
    </HeroSection>
  );
}
