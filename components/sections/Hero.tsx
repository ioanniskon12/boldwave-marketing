'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Heading, Subheading, Text } from '@/components/typography';
import AnimatedButton from '@/components/ui/AnimatedButton';
import StatCard from '@/components/cards/StatCard';
import { Stat } from '@/types';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  stats?: Stat[];
}

const HeroGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.2fr 1fr;
    gap: ${({ theme }) => theme.spacing['4xl']};
  }
`;

const HeroContent = styled.div``;

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SubtitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 560px;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  stats,
}: HeroProps) {
  return (
    <Section $background="default">
      <Container>
        <HeroGrid>
          <HeroContent>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <TitleWrapper>
              <Heading as="h1">{title}</Heading>
            </TitleWrapper>
            <SubtitleWrapper>
              <Text $size="lg">{subtitle}</Text>
            </SubtitleWrapper>
            <CTAGroup>
              {primaryCTA && (
                <AnimatedButton href={primaryCTA.href} variant="orange">
                  {primaryCTA.label}
                </AnimatedButton>
              )}
              {secondaryCTA && (
                <AnimatedButton href={secondaryCTA.href} variant="light">
                  {secondaryCTA.label}
                </AnimatedButton>
              )}
            </CTAGroup>
          </HeroContent>
          {stats && stats.length > 0 && (
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} />
              ))}
            </StatsGrid>
          )}
        </HeroGrid>
      </Container>
    </Section>
  );
}
