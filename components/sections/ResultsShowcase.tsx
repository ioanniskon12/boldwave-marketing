'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Icon } from '@/components/icons';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 75, 75, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 75, 75, 0.5); }
`;

const Section = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const BackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px;
  position: relative;
  z-index: 1;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
`;

const ResultsGrid = styled.div`
  display: grid;
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ResultCard = styled.div<{ $isVisible: boolean; $delay: number }>`
  position: relative;
  padding: 40px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isVisible }) => $isVisible ? 'translateY(0)' : 'translateY(40px)'};
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transition-delay: ${({ $delay }) => $delay}s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 75, 75, 0.3);
    transform: translateY(-8px);
  }
`;

const ResultIcon = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.2), rgba(255, 75, 75, 0.1));
  border-radius: 16px;
  color: #FF4B4B;
  animation: ${glow} 3s ease-in-out infinite;
`;

const ResultValue = styled.div`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #FF4B4B, #FF8F8F);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;

  ${media.lg} {
    font-size: 56px;
  }
`;

const ResultLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CaseStudyBar = styled.div`
  margin-top: 60px;
  padding: 32px 40px;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 75, 75, 0.05));
  border: 1px solid rgba(255, 75, 75, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;

  ${media.lg} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const CaseStudyContent = styled.div``;

const CaseStudyTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const CaseStudyDescription = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
`;


const results = [
  { icon: '📈', value: '120%', label: 'Avg. ROAS Increase' },
  { icon: '💰', value: '$25M', label: 'Ad Spend Managed' },
  { icon: '🎯', value: '40%', label: 'Lower CPA' },
  { icon: '🚀', value: '3.5x', label: 'Revenue Growth' },
];

export default function ResultsShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef}>
      <BackgroundGrid />
      <Container>
        <SectionHeader>
          <Eyebrow>Results That Speak</Eyebrow>
          <Title>Performance you can measure</Title>
          <Description>
            We don&apos;t just promise results—we deliver them. Here&apos;s what our
            clients have achieved working with OwlMarketingHub.
          </Description>
        </SectionHeader>

        <ResultsGrid>
          {results.map((result, index) => (
            <ResultCard
              key={result.label}
              $isVisible={isVisible}
              $delay={index * 0.1}
            >
              <ResultIcon><Icon name={result.icon} size={28} /></ResultIcon>
              <ResultValue>{result.value}</ResultValue>
              <ResultLabel>{result.label}</ResultLabel>
            </ResultCard>
          ))}
        </ResultsGrid>

        <CaseStudyBar>
          <CaseStudyContent>
            <CaseStudyTitle>See how we scaled a D2C brand 10x in 6 months</CaseStudyTitle>
            <CaseStudyDescription>
              Deep dive into the strategy, creative, and optimisation that drove $1.6M/month
            </CaseStudyDescription>
          </CaseStudyContent>
          <AnimatedButton href="/blog/dtc-brand-scale-case-study" variant="orange">Read Case Study</AnimatedButton>
        </CaseStudyBar>
      </Container>
    </Section>
  );
}
