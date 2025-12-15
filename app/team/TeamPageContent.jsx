'use client';

import styled, { keyframes } from 'styled-components';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import TeamCard from '@/components/cards/TeamCard';
import { CTASection, PageHero } from '@/components/sections';
import { team } from '@/data';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const TeamSection = styled.section`
  position: relative;
  padding: 100px 0;
  background: linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%);
  overflow: hidden;
`;

const Particle = styled.div`
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
  { size: 4, top: '75%', left: '60%', delay: 0.9 },
  { size: 6, top: '35%', left: '25%', delay: 2.1 },
  { size: 3, top: '65%', left: '35%', delay: 0.4 },
];

export function TeamPageContent() {
  return (
    <>
      <PageHero
        badge="Our Team"
        title="Meet the Team"
        description="The humans behind the results."
        bigText="TEAM"
      />

      <TeamSection>
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
            <Grid $columns={{ mobile: 1, tablet: 2, desktop: 3 }} $gap="24px">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </Grid>
          </Container>
        </ContentWrapper>
      </TeamSection>

      <CTASection
        title="Want to join the team?"
        subtitle="We're always looking for talented people who are passionate about performance marketing."
        cta={{ label: 'Get in Touch', href: '/contact' }}
      />
    </>
  );
}
