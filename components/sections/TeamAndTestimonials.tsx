'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Testimonial } from '@/types';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

// Main Section
const Section = styled.section`
  padding: 80px 0;
  background: #faf8f5;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const Particle = styled.div<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: rgba(255, 140, 66, 0.15);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${float} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

const ParticleGlow = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.08) 0%, rgba(139, 69, 180, 0.05) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
`;




// Team Section Styles
const TeamSection = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 80px;

  ${media.lg} {
    margin-bottom: 120px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div``;

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
  color: #ff8c42;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  max-width: 400px;

  ${media.md} {
    font-size: 36px;
  }

  ${media.lg} {
    font-size: 42px;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  ${media.lg} {
    gap: 24px;
  }
`;

const TeamCard = styled.div<{ $rotation?: number }>`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  transform: rotate(${({ $rotation }) => $rotation || 0}deg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${media.lg} {
    border-radius: 28px;
  }

  &:hover {
    transform: rotate(0deg) scale(1.02);
    border-radius: 40px;
    z-index: 2;

    .overlay {
      opacity: 1;
    }

    .icon {
      opacity: 0;
    }
  }
`;

const CardImage = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  border-radius: inherit;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(135deg, #e8eef5 0%, #d1dbe8 100%);
  color: #8899aa;
  border-radius: inherit;
`;

const PlaceholderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #8899aa;

  ${media.lg} {
    font-size: 14px;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;

  ${media.lg} {
    padding: 24px;
  }
`;

const MemberName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;

  ${media.lg} {
    font-size: 18px;
  }
`;

const MemberRole = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);

  ${media.lg} {
    font-size: 14px;
  }
`;

const CardIcon = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  transition: opacity 0.3s ease;

  ${media.lg} {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }
`;

// Testimonials Section Styles
const TestimonialsSection = styled.div`
  position: relative;
  z-index: 1;
`;

const TestimonialHeader = styled.div`
  margin-bottom: 40px;

  ${media.md} {
    margin-bottom: 50px;
  }
`;

const TestimonialBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff8c42;
  margin-bottom: 16px;
  display: block;
`;

const TestimonialTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  max-width: 500px;

  ${media.md} {
    font-size: 36px;
  }

  ${media.lg} {
    font-size: 42px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 20px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lg} {
    gap: 24px;
  }
`;

const TestimonialCard = styled.div<{ $isFeatured?: boolean }>`
  flex-shrink: 0;
  width: 280px;
  background: ${({ $isFeatured }) => $isFeatured ? 'transparent' : 'rgba(255, 255, 255, 0.95)'};
  border-radius: 20px;
  padding: ${({ $isFeatured }) => $isFeatured ? '0' : '24px'};
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;
  transition: transform 0.3s ease;

  ${media.md} {
    width: 300px;
    padding: ${({ $isFeatured }) => $isFeatured ? '0' : '28px'};
  }

  ${media.lg} {
    width: 320px;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const FeaturedCard = styled.div`
  position: relative;
  width: 280px;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
  scroll-snap-align: center;

  ${media.md} {
    width: 300px;
    height: 400px;
  }

  ${media.lg} {
    width: 320px;
    height: 420px;
  }
`;

const FeaturedImage = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: #ffffff;
  }
`;

const FeaturedAvatar = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #ffffff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
`;

const FeaturedName = styled.div`
  font-family: 'Georgia', serif;
  font-size: 24px;
  font-style: italic;
  color: #ffffff;
  margin-bottom: 4px;
`;

const FeaturedRole = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
`;

const CardAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const CardQuote = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #333333;
  margin-bottom: 24px;
  flex: 1;

  ${media.lg} {
    font-size: 15px;
  }
`;

const CardSignature = styled.div`
  font-family: 'Georgia', serif;
  font-size: 22px;
  font-style: italic;
  color: #111111;
  margin-bottom: 4px;

  ${media.lg} {
    font-size: 24px;
  }
`;

const CardRole = styled.div`
  font-size: 13px;
  color: #666666;
`;

// Data
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Michael Chen', role: 'Founder & CEO' },
  { id: '2', name: 'Isabella Garcia', role: 'Marketing Specialist' },
  { id: '3', name: 'David Williams', role: 'Creative Director' },
  { id: '4', name: 'Sophia Martinez', role: 'Account Manager' },
];

const particles = [
  { size: 4, top: '5%', left: '5%', delay: 0 },
  { size: 6, top: '10%', left: '15%', delay: 1.5 },
  { size: 3, top: '8%', left: '80%', delay: 0.5 },
  { size: 5, top: '15%', left: '90%', delay: 2 },
  { size: 4, top: '25%', left: '8%', delay: 1 },
  { size: 7, top: '30%', left: '85%', delay: 0.8 },
  { size: 3, top: '35%', left: '20%', delay: 1.8 },
  { size: 5, top: '40%', left: '75%', delay: 0.3 },
  { size: 4, top: '45%', left: '10%', delay: 2.2 },
  { size: 6, top: '50%', left: '95%', delay: 1.2 },
  { size: 3, top: '55%', left: '50%', delay: 0.7 },
  { size: 5, top: '60%', left: '40%', delay: 1.5 },
  { size: 4, top: '65%', left: '60%', delay: 0.9 },
  { size: 6, top: '70%', left: '25%', delay: 2.1 },
  { size: 3, top: '75%', left: '35%', delay: 0.4 },
  { size: 5, top: '80%', left: '70%', delay: 1.3 },
  { size: 4, top: '85%', left: '15%', delay: 0.6 },
  { size: 6, top: '90%', left: '88%', delay: 1.9 },
];

interface TeamAndTestimonialsProps {
  testimonials: Testimonial[];
}

export default function TeamAndTestimonials({ testimonials }: TeamAndTestimonialsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const rotations = [-3, 2, -2, 3];

  return (
    <Section>
      <ParticleGlow />
      {particles.map((particle, index) => (
        <Particle
          key={index}
          $size={particle.size}
          $top={particle.top}
          $left={particle.left}
          $delay={particle.delay}
        />
      ))}
      <ContentWrapper>
        <Container>
          {/* Team Members */}
          <TeamSection>
            <Header>
              <HeaderLeft>
                <Badge>
                  <BadgeDot />
                  <BadgeText>Team Member</BadgeText>
                  <BadgeDot />
                </Badge>
                <Title>Meet the Expert Team Members</Title>
              </HeaderLeft>
              <AnimatedButton href="/about" variant="white">View All More</AnimatedButton>
            </Header>

            <TeamGrid>
              {teamMembers.map((member, index) => {
                const initials = member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('');

                return (
                  <TeamCard
                    key={member.id}
                    $rotation={rotations[index]}
                    onMouseEnter={() => setHoveredId(member.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <CardImage>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <PlaceholderImage>
                          <PlaceholderIcon>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="12" cy="8" r="4" />
                              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                            </svg>
                          </PlaceholderIcon>
                          <PlaceholderText>Add Photo</PlaceholderText>
                        </PlaceholderImage>
                      )}
                    </CardImage>

                    <CardOverlay className="overlay">
                      <MemberName>{member.name}</MemberName>
                      <MemberRole>{member.role}</MemberRole>
                    </CardOverlay>

                    <CardIcon className="icon">
                      {hoveredId === member.id ? '×' : '+'}
                    </CardIcon>
                  </TeamCard>
                );
              })}
            </TeamGrid>
          </TeamSection>

          {/* Testimonials */}
          <TestimonialsSection>
            <TestimonialHeader>
              <TestimonialBadge>TESTIMONIALS</TestimonialBadge>
              <TestimonialTitle>Don&apos;t take our word for it! Hear it from our partners.</TestimonialTitle>
            </TestimonialHeader>

            <CarouselContainer>
              <CarouselTrack>
                {testimonials.map((item, index) => {
                  const initials = item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('');

                  // Make every 3rd card (index 1, 4, 7...) a featured card
                  if ((index + 2) % 3 === 0) {
                    return (
                      <FeaturedCard key={item.id}>
                        <FeaturedImage>
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                        </FeaturedImage>
                        <FeaturedAvatar>{initials}</FeaturedAvatar>
                        <PlayButton>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </PlayButton>
                        <FeaturedOverlay>
                          <FeaturedName>{item.name}</FeaturedName>
                          <FeaturedRole>{item.role} at {item.company}</FeaturedRole>
                        </FeaturedOverlay>
                      </FeaturedCard>
                    );
                  }

                  return (
                    <TestimonialCard key={item.id}>
                      <CardAvatar>{initials}</CardAvatar>
                      <CardQuote>&ldquo;{item.quote}&rdquo;</CardQuote>
                      <div>
                        <CardSignature>{item.name}</CardSignature>
                        <CardRole>{item.role} at {item.company}</CardRole>
                      </div>
                    </TestimonialCard>
                  );
                })}
              </CarouselTrack>
            </CarouselContainer>
          </TestimonialsSection>
        </Container>
      </ContentWrapper>
    </Section>
  );
}
