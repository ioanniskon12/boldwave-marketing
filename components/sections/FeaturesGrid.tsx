'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { Service } from '@/types';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Section = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);

  ${media.lg} {
    padding: 140px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;

  ${media.lg} {
    margin-bottom: 80px;
  }
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
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;

  ${media.lg} {
    font-size: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF4B4B, #FF8F8F, #FF4B4B);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    border-color: transparent;

    &::before {
      opacity: 1;
      animation: ${shimmer} 2s linear infinite;
    }
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 75, 75, 0.05));
  border-radius: 16px;
  font-size: 28px;
  margin-bottom: 24px;
  transition: all 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1) rotate(-5deg);
    background: linear-gradient(135deg, rgba(255, 75, 75, 0.15), rgba(255, 75, 75, 0.1));
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CardDescription = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: 24px;
  flex: 1;
`;

const CardLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  transition: gap 0.3s ease;

  ${Card}:hover & {
    gap: 12px;
  }
`;

const Arrow = styled.span`
  display: inline-flex;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: translateX(4px);
  }
`;

interface FeaturesGridProps {
  services: Service[];
}

export default function FeaturesGrid({ services }: FeaturesGridProps) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <Eyebrow>What We Do</Eyebrow>
          <Title>Full-service performance marketing</Title>
          <Description>
            From strategy to execution, we handle every aspect of your paid media
            to drive measurable growth.
          </Description>
        </SectionHeader>

        <Grid>
          {services.map((service) => (
            <Card key={service.id} href={`/services/${service.slug}`}>
              <IconWrapper>{service.icon}</IconWrapper>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.shortDescription}</CardDescription>
              <CardLink>
                Learn more <Arrow>&rarr;</Arrow>
              </CardLink>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
