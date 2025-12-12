'use client';

import styled from 'styled-components';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Grid from '@/components/layout/Grid';
import { Heading, Text } from '@/components/typography';
import ServiceCard from '@/components/cards/ServiceCard';
import { Service } from '@/types';

interface ServicesPreviewProps {
  title: string;
  subtitle: string;
  services: Service[];
}

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export default function ServicesPreview({
  title,
  subtitle,
  services,
}: ServicesPreviewProps) {
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
        <Grid $columns={{ mobile: 1, tablet: 2, desktop: 4 }} $gap="24px">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
