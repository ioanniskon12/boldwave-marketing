'use client';

import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
`;

const float2 = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
  50% { transform: translateY(15px) translateX(-10px); opacity: 0.5; }
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const Particle = styled.div<{ $size: number; $top: string; $left: string; $delay: number; $duration: number; $variant?: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${({ $variant }) => $variant === 2 ? float2 : float} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const particles = [
  { size: 3, top: '10%', left: '5%', delay: 0, duration: 6, variant: 1 },
  { size: 4, top: '20%', left: '15%', delay: 1, duration: 8, variant: 2 },
  { size: 2, top: '15%', left: '25%', delay: 2, duration: 7, variant: 1 },
  { size: 5, top: '30%', left: '80%', delay: 0.5, duration: 9, variant: 2 },
  { size: 3, top: '40%', left: '90%', delay: 1.5, duration: 6, variant: 1 },
  { size: 4, top: '60%', left: '10%', delay: 2.5, duration: 8, variant: 2 },
  { size: 2, top: '70%', left: '20%', delay: 0, duration: 7, variant: 1 },
  { size: 3, top: '50%', left: '70%', delay: 1, duration: 9, variant: 2 },
  { size: 5, top: '80%', left: '85%', delay: 2, duration: 6, variant: 1 },
  { size: 2, top: '25%', left: '50%', delay: 0.5, duration: 8, variant: 2 },
  { size: 4, top: '45%', left: '35%', delay: 1.5, duration: 7, variant: 1 },
  { size: 3, top: '75%', left: '60%', delay: 2.5, duration: 9, variant: 2 },
  { size: 2, top: '85%', left: '40%', delay: 0, duration: 6, variant: 1 },
  { size: 4, top: '55%', left: '95%', delay: 1, duration: 8, variant: 2 },
  { size: 3, top: '35%', left: '45%', delay: 2, duration: 7, variant: 1 },
];

export default function Particles() {
  return (
    <ParticlesWrapper>
      {particles.map((p, index) => (
        <Particle
          key={index}
          $size={p.size}
          $top={p.top}
          $left={p.left}
          $delay={p.delay}
          $duration={p.duration}
          $variant={p.variant}
        />
      ))}
    </ParticlesWrapper>
  );
}
