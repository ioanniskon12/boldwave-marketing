'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Grid from '@/components/layout/Grid';
import { Heading } from '@/components/typography';
import { Accordion } from '@/components/Accordion';
import { CTASection, PageHero } from '@/components/sections';
import { AccordionItemType } from '@/types';

const StorySection = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};

  ${media.lg} {
    grid-template-columns: 1fr 1.5fr;
    gap: ${({ theme }) => theme.spacing['4xl']};
    align-items: start;
  }
`;

const StoryQuote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};

  ${media.lg} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const StoryContent = styled.div`
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.8;

    ${media.lg} {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ValueCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ValueTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ValueDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const approachItems: AccordionItemType[] = [
  {
    id: '1',
    question: 'Strategy first, tactics second',
    answer:
      "We don't jump into campaigns without understanding your business, audience, and goals. Every engagement starts with deep discovery.",
  },
  {
    id: '2',
    question: 'Creative that converts',
    answer:
      "We don't believe in pretty ads that don't perform. Our creative team works hand-in-hand with media buyers to produce assets built for results.",
  },
  {
    id: '3',
    question: 'Always-on optimisation',
    answer:
      "We don't set and forget. Our team monitors campaigns daily, making micro-adjustments that compound into major gains over time.",
  },
  {
    id: '4',
    question: 'Full transparency',
    answer:
      "You'll always know where your money is going. We provide detailed reporting, full platform access, and regular strategy calls.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="About OwlMarketingHub"
        description="We're a team of performance marketers, data nerds, and creative thinkers on a mission to help brands grow."
        bigText="ABOUT"
      />

      <Section $background="alt">
        <Container>
          <StorySection>
            <StoryQuote>
              &ldquo;Marketing should be measurable, creative should convert, and
              agencies should be partners—not vendors.&rdquo;
            </StoryQuote>
            <StoryContent>
              <p>
                Founded in 2019, OwlMarketingHub started with a simple belief: marketing
                should be measurable, creative should convert, and agencies should
                be partners—not vendors.
              </p>
              <p>
                We&apos;ve helped 50+ brands across e-commerce, SaaS, and D2C grow
                through a combination of paid media expertise, creative strategy,
                and relentless optimisation.
              </p>
              <p>
                Today, we manage over $25M in annual ad spend and have delivered an
                average of 120% ROAS improvement for our clients.
              </p>
            </StoryContent>
          </StorySection>
        </Container>
      </Section>

      <Section $background="default">
        <Container>
          <SectionHeader>
            <Heading as="h2" $align="center">
              Mission, Vision & Values
            </Heading>
          </SectionHeader>
          <Grid $columns={{ mobile: 1, tablet: 3, desktop: 3 }} $gap="24px">
            <ValueCard>
              <ValueTitle>Mission</ValueTitle>
              <ValueDescription>
                To help ambitious brands turn attention into sustainable revenue
                through data-driven marketing.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Vision</ValueTitle>
              <ValueDescription>
                To be the most results-obsessed marketing partner in the
                industry—where every dollar spent is a dollar working.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Values</ValueTitle>
              <ValueDescription>
                Results over vanity. Transparency always. Creative that converts.
                Partnership, not transactions.
              </ValueDescription>
            </ValueCard>
          </Grid>
        </Container>
      </Section>

      <Section $background="alt">
        <Container $maxWidth="md">
          <SectionHeader>
            <Heading as="h2" $align="center">
              Our Approach
            </Heading>
          </SectionHeader>
          <Accordion items={approachItems} />
        </Container>
      </Section>

      <CTASection
        title="Ready to work together?"
        subtitle="Let's discuss how we can help your brand grow."
        cta={{ label: 'Get in Touch', href: '/contact' }}
      />
    </>
  );
}
