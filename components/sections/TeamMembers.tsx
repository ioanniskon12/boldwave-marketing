'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const Section = styled.section`
  padding: 80px 0 60px 0;
  background: linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%);
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 100px 0 80px 0;
  }
`;

const Particle = styled.div<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
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
  background: radial-gradient(circle, rgba(139, 69, 180, 0.25) 0%, rgba(66, 140, 255, 0.15) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const WaveTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #ffffff;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%);
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    transform: scaleX(1.5);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding-bottom: 40px;

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
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  transform: rotate(${({ $rotation }) => $rotation || 0}deg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${media.lg} {
    border-radius: 24px;
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
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 48px;
  font-weight: 700;

  ${media.lg} {
    font-size: 64px;
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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Michael Chen',
    role: 'Founder & CEO',
  },
  {
    id: '2',
    name: 'Isabella Garcia',
    role: 'Marketing Specialist',
  },
  {
    id: '3',
    name: 'David Williams',
    role: 'Creative Director',
  },
  {
    id: '4',
    name: 'Sophia Martinez',
    role: 'Account Manager',
  },
];

const particles = [
  { size: 4, top: '10%', left: '5%', delay: 0 },
  { size: 6, top: '20%', left: '15%', delay: 1.5 },
  { size: 3, top: '15%', left: '80%', delay: 0.5 },
  { size: 5, top: '30%', left: '90%', delay: 2 },
  { size: 4, top: '50%', left: '8%', delay: 1 },
  { size: 7, top: '60%', left: '85%', delay: 0.8 },
  { size: 3, top: '70%', left: '20%', delay: 1.8 },
  { size: 5, top: '80%', left: '75%', delay: 0.3 },
  { size: 4, top: '85%', left: '10%', delay: 2.2 },
  { size: 6, top: '40%', left: '95%', delay: 1.2 },
  { size: 3, top: '25%', left: '50%', delay: 0.7 },
  { size: 5, top: '55%', left: '40%', delay: 1.5 },
];

export default function TeamMembers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const rotations = [-3, 2, -2, 3];

  return (
    <Section>
      <WaveTop />
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
                      <PlaceholderImage>{initials}</PlaceholderImage>
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
        </Container>
      </ContentWrapper>
    </Section>
  );
}
