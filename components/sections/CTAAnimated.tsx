'use client';

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

const Section = styled.section`
  position: relative;
  padding: 120px 0;
  background: linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #111111 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 15s ease infinite;
  overflow: hidden;

  ${media.lg} {
    padding: 160px 0;
  }
`;

const BackgroundOrb = styled.div<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 75, 75, 0.3), transparent 70%);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${pulse} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  filter: blur(40px);
  pointer-events: none;
`;

const FloatingElement = styled.div<{ $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 75, 75, 0.2);
  border-radius: 8px;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${float} ${({ $delay }) => 5 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(255, 75, 75, 0.15);
  border: 1px solid rgba(255, 75, 75, 0.3);
  border-radius: 100px;
  margin-bottom: 24px;
`;

const EyebrowIcon = styled.span`
  font-size: 16px;
`;

const EyebrowText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.05em;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;

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

const Subtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  line-height: 1.7;

  ${media.lg} {
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TrustIndicators = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 48px;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
`;

const TrustIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.2);
  border-radius: 50%;
  color: #10B981;
  font-size: 10px;
`;

export default function CTAAnimated() {
  return (
    <Section>
      <BackgroundOrb $size={500} $top="-20%" $left="-10%" $delay={0} />
      <BackgroundOrb $size={400} $top="50%" $left="80%" $delay={1} />
      <BackgroundOrb $size={300} $top="70%" $left="20%" $delay={2} />

      <FloatingElement $top="15%" $left="10%" $delay={0} />
      <FloatingElement $top="20%" $left="85%" $delay={1} />
      <FloatingElement $top="75%" $left="5%" $delay={0.5} />
      <FloatingElement $top="80%" $left="90%" $delay={1.5} />

      <Container>
        <ContentWrapper>
          <Eyebrow>
            <EyebrowIcon>🚀</EyebrowIcon>
            <EyebrowText>Ready to grow?</EyebrowText>
          </Eyebrow>

          <Title>
            Let&apos;s scale your <GradientText>brand together</GradientText>
          </Title>

          <Subtitle>
            Book a free 30-minute strategy call and discover how we can help
            you achieve your growth goals.
          </Subtitle>

          <ButtonWrapper>
            <AnimatedButton href="/contact" variant="orange">Book a Free Strategy Call</AnimatedButton>
          </ButtonWrapper>

          <TrustIndicators>
            <TrustItem>
              <TrustIcon>✓</TrustIcon>
              No commitment required
            </TrustItem>
            <TrustItem>
              <TrustIcon>✓</TrustIcon>
              30-minute call
            </TrustItem>
            <TrustItem>
              <TrustIcon>✓</TrustIcon>
              Custom strategy insights
            </TrustItem>
          </TrustIndicators>
        </ContentWrapper>
      </Container>
    </Section>
  );
}
