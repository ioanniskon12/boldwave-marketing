'use client';

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Section = styled.section`
  padding: 40px 0;
  background: #faf8f5;
  overflow: hidden;

  ${media.lg} {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.p`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #999999;
  margin-bottom: 32px;
`;

const LogoWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #faf8f5, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #faf8f5, transparent);
  }

  ${media.lg} {
    &::before,
    &::after {
      width: 150px;
    }
  }
`;

const LogoTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  width: max-content;
  animation: ${scroll} 30s linear infinite;

  ${media.lg} {
    gap: 80px;
  }
`;

const LogoItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.7;
  transition: opacity 0.4s ease;
  cursor: default;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
  }
`;

const LogoIcon = styled.span`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.lg} {
    font-size: 28px;
  }
`;

const LogoText = styled.span<{ $color: string }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  white-space: nowrap;

  ${media.lg} {
    font-size: 18px;
  }
`;

const logos = [
  { name: 'TechFlow', icon: '⚡', color: '#6366f1' },
  { name: 'Glow Beauty', icon: '✨', color: '#ec4899' },
  { name: 'FitLife Pro', icon: '💪', color: '#ef4444' },
  { name: 'Urban Home', icon: '🏠', color: '#f59e0b' },
  { name: 'Bloom & Co', icon: '🌸', color: '#f472b6' },
  { name: 'Nexus SaaS', icon: '🚀', color: '#8b5cf6' },
  { name: 'Pure Foods', icon: '🌿', color: '#22c55e' },
  { name: 'Velocity', icon: '⚙️', color: '#64748b' },
  { name: 'Spark Media', icon: '🔥', color: '#f97316' },
  { name: 'CloudBase', icon: '☁️', color: '#0ea5e9' },
];

export default function ClientLogos() {
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <Section>
      <Container>
        <Title>Trusted by 50+ ambitious brands</Title>
        <LogoWrapper>
          <LogoTrack>
            {repeatedLogos.map((logo, index) => (
              <LogoItem key={`${logo.name}-${index}`} $color={logo.color}>
                <LogoIcon>{logo.icon}</LogoIcon>
                <LogoText $color={logo.color}>{logo.name}</LogoText>
              </LogoItem>
            ))}
          </LogoTrack>
        </LogoWrapper>
      </Container>
    </Section>
  );
}
