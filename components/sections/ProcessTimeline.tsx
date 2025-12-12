'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { ProcessStep } from '@/types';

const Section = styled.section`
  padding: 60px 0 0 0;
  background: #faf8f5;
  overflow: hidden;

  ${media.md} {
    padding: 80px 0 0 0;
  }

  ${media.lg} {
    padding: 120px 0 0 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  ${media.md} {
    margin-bottom: 60px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #e8e8e8;
  border-radius: 100px;
  margin-bottom: 24px;
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  background: #ff8c42;
  border-radius: 50%;
`;

const BadgeText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #111111;
  line-height: 1.2;
  max-width: 600px;
  margin: 0 auto;

  ${media.md} {
    font-size: 32px;
  }

  ${media.lg} {
    font-size: 48px;
  }
`;

const GridWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;

  ${media.md} {
    padding: 0 32px;
  }

  ${media.lg} {
    padding: 0 48px;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  width: 100%;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StepCard = styled.div`
  position: relative;
  padding: 24px 20px 0 20px;
  border-left: none;
  border-top: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  min-height: 280px;

  &:first-child {
    border-top: none;
  }

  ${media.md} {
    padding: 32px 24px 0 24px;
    min-height: 320px;
    border-top: none;
    border-left: 1px solid #e8e8e8;

    &:nth-child(1),
    &:nth-child(3) {
      border-left: none;
    }
  }

  ${media.lg} {
    padding: 40px 32px 0 32px;
    min-height: 400px;

    &:nth-child(1) {
      border-left: none;
    }

    &:nth-child(3) {
      border-left: 1px solid #e8e8e8;
    }
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 12px;

  ${media.md} {
    font-size: 20px;
    margin-bottom: 16px;
  }

  ${media.lg} {
    font-size: 22px;
  }
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;

  ${media.md} {
    font-size: 15px;
    line-height: 1.7;
  }
`;

const SemicircleContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 30px;

  ${media.md} {
    padding-top: 40px;
  }
`;

const SemicircleClip = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  overflow: hidden;

  ${media.md} {
    width: 240px;
    height: 120px;
  }

  ${media.lg} {
    width: 280px;
    height: 140px;
  }
`;

const Semicircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 140, 66, 0.25);
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 200, 170, 0.12) 0%, rgba(255, 220, 200, 0.05) 100%);

  ${media.md} {
    width: 240px;
    height: 240px;
  }

  ${media.lg} {
    width: 280px;
    height: 280px;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8c42;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  z-index: 2;

  ${media.md} {
    top: 16px;
    width: 48px;
    height: 48px;
    font-size: 16px;
  }

  ${media.lg} {
    top: 14px;
    width: 52px;
    height: 52px;
    font-size: 17px;
  }
`;

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <Badge>
            <BadgeDot />
            <BadgeText>Work Process</BadgeText>
            <BadgeDot />
          </Badge>
          <Title>Turning Insights into Impactful Strategies</Title>
        </SectionHeader>
      </Container>

      <GridWrapper>
        <StepsGrid>
          {steps.map((step, index) => (
            <StepCard key={step.id}>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>

              <SemicircleContainer>
                <StepNumber>{String(index + 1).padStart(2, '0')}</StepNumber>
                <SemicircleClip>
                  <Semicircle />
                </SemicircleClip>
              </SemicircleContainer>
            </StepCard>
          ))}
        </StepsGrid>
      </GridWrapper>
    </Section>
  );
}
