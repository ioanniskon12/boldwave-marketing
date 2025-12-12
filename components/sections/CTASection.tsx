'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Heading, Text } from '@/components/typography';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface CTASectionProps {
  title: string;
  subtitle: string;
  cta: {
    label: string;
    href: string;
  };
  trustIndicators?: string[];
}

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SubtitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CTAWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TrustIndicators = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TrustItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: currentColor;
  }

  &:first-child::before {
    display: none;
  }
`;

export default function CTASection({
  title,
  subtitle,
  cta,
  trustIndicators,
}: CTASectionProps) {
  return (
    <Section $background="dark">
      <Container>
        <ContentWrapper>
          <TitleWrapper>
            <Heading as="h2" $color="inverse" $align="center">
              {title}
            </Heading>
          </TitleWrapper>
          <SubtitleWrapper>
            <Text $size="lg" $color="inverse" $align="center">
              {subtitle}
            </Text>
          </SubtitleWrapper>
          <CTAWrapper>
            <AnimatedButton href={cta.href} variant="orange">{cta.label}</AnimatedButton>
          </CTAWrapper>
          {trustIndicators && trustIndicators.length > 0 && (
            <TrustIndicators>
              {trustIndicators.map((indicator, index) => (
                <TrustItem key={index}>{indicator}</TrustItem>
              ))}
            </TrustIndicators>
          )}
        </ContentWrapper>
      </Container>
    </Section>
  );
}
