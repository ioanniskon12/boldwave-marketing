'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Heading, Text } from '@/components/typography';
import { ProcessStep } from '@/types';

interface ProcessProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.lg} {
    flex-direction: row;
    justify-content: space-between;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 40px;
      left: 60px;
      right: 60px;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.border};
      z-index: 0;
    }
  }
`;

const StepItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;

  ${media.lg} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    position: relative;
    z-index: 1;
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const StepContent = styled.div`
  ${media.lg} {
    padding-top: ${({ theme }) => theme.spacing.lg};
  }
`;

const StepTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 240px;
  margin: 0 auto;
`;

export default function Process({ title, subtitle, steps }: ProcessProps) {
  return (
    <Section $background="alt">
      <Container>
        <HeaderWrapper>
          <TitleWrapper>
            <Heading as="h2" $align="center">
              {title}
            </Heading>
          </TitleWrapper>
          <Text $size="lg" $align="center">
            {subtitle}
          </Text>
        </HeaderWrapper>
        <StepsWrapper>
          {steps.map((step) => (
            <StepItem key={step.id}>
              <StepNumber>{step.icon}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </StepItem>
          ))}
        </StepsWrapper>
      </Container>
    </Section>
  );
}
