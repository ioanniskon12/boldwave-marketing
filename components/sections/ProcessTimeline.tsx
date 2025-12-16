'use client';

/**
 * PROCESS TIMELINE COMPONENT
 *
 * Design 3: Dark Modern Cards with glass-morphism effect
 *
 * IMPORTANT: Icon Usage Guidelines
 * ================================
 * Always use professional SVG icon components directly from '@/components/icons'.
 */

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { ProcessStep } from '@/types';
import {
  SearchIcon,
  LightbulbIcon,
  RocketIcon,
  GrowthIcon
} from '@/components/icons';

// ============================================
// STYLED COMPONENTS
// ============================================
const Section = styled.section`
  padding: 80px 0 100px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a12 100%);
  position: relative;
  overflow: hidden;
`;

const BackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  z-index: 1;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const BadgeLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
`;

const BadgeText = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ff8c42;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 16px;

  ${media.md} {
    font-size: 40px;
  }

  ${media.lg} {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const ProcessCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 28px;
  text-align: center;
  transition: all 0.4s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff8c42, #ff6b35);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProcessNumber = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 64px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.08);
  line-height: 1;
`;

const ProcessIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(255, 107, 53, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
  position: relative;
  z-index: 1;
`;

const ProcessTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const ProcessDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const ArrowConnector = styled.div`
  display: none;

  ${media.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    color: #ff8c42;
    opacity: 0.6;
  }
`;

// ============================================
// ICON MAPPING
// ============================================
const stepIcons = [SearchIcon, LightbulbIcon, RocketIcon, GrowthIcon];

// ============================================
// MAIN COMPONENT
// ============================================
interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

export default function ProcessTimeline({
  steps,
  title = "Turning Insights into Impactful Strategies",
  subtitle = "A proven methodology refined over 100+ successful campaigns."
}: ProcessTimelineProps) {
  return (
    <Section>
      <BackgroundGrid />
      <Container>
        <SectionHeader>
          <Badge>
            <BadgeLine />
            <BadgeText>Work Process</BadgeText>
            <BadgeLine />
          </Badge>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </SectionHeader>

        <ProcessGrid>
          {steps.map((step, index) => {
            const IconComponent = stepIcons[index] || SearchIcon;
            const stepNumber = String(index + 1).padStart(2, '0');
            return (
              <ProcessCard key={step.id}>
                <ProcessNumber>{stepNumber}</ProcessNumber>
                <ProcessIcon>
                  <IconComponent size={28} />
                </ProcessIcon>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDesc>{step.description}</ProcessDesc>
                {index < steps.length - 1 && (
                  <ArrowConnector>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </ArrowConnector>
                )}
              </ProcessCard>
            );
          })}
        </ProcessGrid>
      </Container>
    </Section>
  );
}
