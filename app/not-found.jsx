'use client';

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import AnimatedButton from '@/components/ui/AnimatedButton';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const glitch = keyframes`
  0%, 100% {
    text-shadow:
      2px 0 #ff8c42,
      -2px 0 #00D4FF;
    transform: translate(0);
  }
  20% {
    text-shadow:
      -2px 0 #ff8c42,
      2px 0 #00D4FF;
    transform: translate(-2px, 2px);
  }
  40% {
    text-shadow:
      2px 0 #ff8c42,
      -2px 0 #00D4FF;
    transform: translate(2px, -2px);
  }
  60% {
    text-shadow:
      -2px 0 #ff8c42,
      2px 0 #00D4FF;
    transform: translate(-2px, -2px);
  }
  80% {
    text-shadow:
      2px 0 #ff8c42,
      -2px 0 #00D4FF;
    transform: translate(2px, 2px);
  }
`;

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

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 120px 20px 60px;
`;

const Particle = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${float} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

const ParticleGlow = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 69, 180, 0.25) 0%, rgba(66, 140, 255, 0.15) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  animation: ${pulse} 8s ease-in-out infinite;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 700px;
`;

const ErrorCode = styled.div`
  font-size: 120px;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 20px;
  animation: ${glitch} 3s ease-in-out infinite, ${fadeInUp} 0.8s ease-out;
  position: relative;

  ${media.md} {
    font-size: 180px;
  }

  ${media.lg} {
    font-size: 220px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  ${media.md} {
    font-size: 36px;
  }

  ${media.lg} {
    font-size: 42px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  ${media.lg} {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  animation: ${bounce} 2s ease infinite;
`;

const ArrowDown = styled.div`
  width: 24px;
  height: 24px;
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  transform: rotate(45deg);
`;

const particles = [
  { size: 4, top: '10%', left: '5%', delay: 0 },
  { size: 6, top: '20%', left: '15%', delay: 1.5 },
  { size: 3, top: '15%', left: '80%', delay: 0.5 },
  { size: 5, top: '30%', left: '90%', delay: 2 },
  { size: 4, top: '50%', left: '8%', delay: 1 },
  { size: 7, top: '60%', left: '85%', delay: 0.8 },
  { size: 3, top: '70%', left: '20%', delay: 1.8 },
  { size: 5, top: '80%', left: '75%', delay: 0.3 },
  { size: 4, top: '85%', left: '10%', delay: 2.2 },
  { size: 6, top: '40%', left: '95%', delay: 1.2 },
  { size: 3, top: '25%', left: '50%', delay: 0.7 },
  { size: 5, top: '55%', left: '40%', delay: 1.5 },
];

export default function NotFound() {
  return (
    <PageWrapper>
      <ParticleGlow />
      {particles.map((particle, index) => (
        <Particle
          key={index}
          $size={particle.size}
          $top={particle.top}
          $left={particle.left}
          $delay={particle.delay}
        />
      ))}

      <ContentWrapper>
        <ErrorCode>404</ErrorCode>
        <Title>Oops! Page Not Found</Title>
        <Description>
          The page you&apos;re looking for seems to have wandered off into the digital void.
          Don&apos;t worry, let&apos;s get you back on track.
        </Description>
        <ButtonGroup>
          <AnimatedButton href="/" variant="orange">Back to Home</AnimatedButton>
          <AnimatedButton href="/contact" variant="light">Contact Us</AnimatedButton>
        </ButtonGroup>
      </ContentWrapper>
    </PageWrapper>
  );
}
