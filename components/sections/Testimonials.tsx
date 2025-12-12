'use client';

import styled from 'styled-components';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Heading } from '@/components/typography';
import { Carousel } from '@/components/Carousel';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { Testimonial } from '@/types';

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const CarouselWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

export default function Testimonials({ title, testimonials }: TestimonialsProps) {
  return (
    <Section $background="default">
      <Container>
        <HeaderWrapper>
          <Heading as="h2" $align="center">
            {title}
          </Heading>
        </HeaderWrapper>
        <CarouselWrapper>
          <Carousel
            items={testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            autoPlay
            autoPlayInterval={6000}
            showArrows
            showDots
            gap={24}
          />
        </CarouselWrapper>
      </Container>
    </Section>
  );
}
