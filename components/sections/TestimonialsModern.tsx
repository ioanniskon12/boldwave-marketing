'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { Testimonial } from '@/types';

const Section = styled.section`
  padding: 60px 0 80px 0;
  background: linear-gradient(135deg, #ff8c42 0%, #1a3a5c 100%);
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 80px 0 100px 0;
  }
`;

const WaveBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(135deg, #ff8c42 0%, #1a3a5c 100%);
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
    transform: scaleX(1.5);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 40px;

  ${media.md} {
    margin-bottom: 50px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
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
  color: #ffffff;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  max-width: 400px;

  ${media.md} {
    font-size: 36px;
  }

  ${media.lg} {
    font-size: 42px;
  }
`;

const TestimonialWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  ${({ $direction }) => $direction === 'left' ? 'left: -60px' : 'right: -60px'};
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  ${media.xl} {
    display: flex;
  }
`;

const MobileNavButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;

  ${media.xl} {
    display: none;
  }
`;

const MobileNavButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const TestimonialCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  width: 100%;

  ${media.md} {
    flex-direction: row;
    padding: 32px;
    gap: 40px;
  }

  ${media.lg} {
    padding: 40px;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;

  ${media.md} {
    width: 240px;
    margin: 0;
  }

  ${media.lg} {
    width: 280px;
  }
`;

const ClientImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%);
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 64px;
  font-weight: 700;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Quote = styled.blockquote`
  font-size: 16px;
  line-height: 1.7;
  color: #444444;
  margin: 0 0 24px;
  font-style: italic;

  ${media.md} {
    font-size: 17px;
  }

  ${media.lg} {
    font-size: 18px;
    margin-bottom: 32px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const AuthorDetails = styled.div``;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 4px;

  ${media.lg} {
    font-size: 20px;
  }
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: #666666;
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span`
  color: #ff8c42;
  font-size: 18px;
`;

interface TestimonialsModernProps {
  testimonials: Testimonial[];
}

export default function TestimonialsModern({ testimonials }: TestimonialsModernProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Section>
      <WaveBottom />

      <Container>
        <ContentWrapper>
          <SectionHeader>
            <Badge>
              <BadgeDot />
              <BadgeText>Testimonials</BadgeText>
              <BadgeDot />
            </Badge>
            <Title>See What Our Customer Say About Us.</Title>
          </SectionHeader>

          <TestimonialWrapper>
            <NavButton $direction="left" onClick={prevTestimonial}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NavButton>

            <TestimonialCard>
              <ImageWrapper>
                <ClientImage>
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <PlaceholderImage>{initials}</PlaceholderImage>
                  )}
                </ClientImage>
              </ImageWrapper>

              <ContentSection>
                <Quote>&ldquo;{testimonial.quote}&rdquo;</Quote>
                <AuthorInfo>
                  <AuthorDetails>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}, {testimonial.company}</AuthorRole>
                  </AuthorDetails>
                  <StarRating>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i}>&#9733;</Star>
                    ))}
                  </StarRating>
                </AuthorInfo>
              </ContentSection>
            </TestimonialCard>

            <NavButton $direction="right" onClick={nextTestimonial}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </NavButton>
          </TestimonialWrapper>

          <MobileNavButtons>
            <MobileNavButton onClick={prevTestimonial}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </MobileNavButton>
            <MobileNavButton onClick={nextTestimonial}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </MobileNavButton>
          </MobileNavButtons>
        </ContentWrapper>
      </Container>
    </Section>
  );
}
