'use client';

import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

// Animations
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 140, 66, 0.3), 0 0 40px rgba(255, 140, 66, 0.1); }
  50% { box-shadow: 0 0 40px rgba(255, 140, 66, 0.5), 0 0 80px rgba(255, 140, 66, 0.2); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
`;

const particleFloat = keyframes`
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) rotate(360deg);
    opacity: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: rgba(255, 140, 66, 0.6);
  border-radius: 50%;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  --tx: ${props => props.$tx}px;
  --ty: ${props => props.$ty}px;
  animation: ${particleFloat} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  filter: blur(1px);
`;

const GlowOrb = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: 50%;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  filter: blur(80px);
  opacity: 0.4;
  animation: ${pulse} 4s ease-in-out infinite;
`;

const Content = styled.div`
  max-width: 700px;
  position: relative;
  z-index: 2;
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 40px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotateIn} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
             ${float} 6s ease-in-out infinite 1s,
             ${glow} 3s ease-in-out infinite;
  box-shadow: 0 20px 60px rgba(255, 140, 66, 0.3);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 30px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35, #ffb347, #ff8c42);
    background-size: 300% 300%;
    animation: ${gradientAnimation} 4s ease infinite;
    z-index: -1;
    opacity: 0.7;
  }
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  filter: invert(1) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.2));
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease forwards 0.3s, ${shimmer} 3s linear infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 22px;
  line-height: 1.7;
  margin-bottom: 50px;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: rgba(255, 140, 66, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 140, 66, 0.3);
  border-radius: 100px;
  color: #ff8c42;
  font-size: 16px;
  font-weight: 600;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.7s;
  opacity: 0;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 140, 66, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 140, 66, 0.2);
  }
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  background: #ff8c42;
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 0 10px #ff8c42;
`;

const SocialLinks = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 20px;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.9s;
  opacity: 0;
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 140, 66, 0.2);
    border-color: rgba(255, 140, 66, 0.5);
    color: #ff8c42;
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(255, 140, 66, 0.2);
  }
`;

const BrandName = styled.p`
  margin-top: 40px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 1.1s;
  opacity: 0;
`;

// Generate random particles
const generateParticles = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    tx: (Math.random() - 0.5) * 200,
    ty: (Math.random() - 0.5) * 200,
    duration: Math.random() * 10 + 10,
  }));
};

export default function ComingSoonPage() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <Container>
      {/* Background Glow Orbs */}
      <GlowOrb $x={20} $y={20} $size={400} $color="rgba(255, 140, 66, 0.3)" />
      <GlowOrb $x={80} $y={80} $size={300} $color="rgba(102, 126, 234, 0.3)" />
      <GlowOrb $x={70} $y={10} $size={250} $color="rgba(255, 107, 53, 0.2)" />

      {/* Floating Particles */}
      <ParticlesContainer>
        {particles.map((p) => (
          <Particle
            key={p.id}
            $delay={p.delay}
            $size={p.size}
            $x={p.x}
            $y={p.y}
            $tx={p.tx}
            $ty={p.ty}
            $duration={p.duration}
          />
        ))}
      </ParticlesContainer>

      <Content>
        <Logo>
          <LogoImage
            src="/owl.svg"
            alt="OwlMarketingHub"
          />
        </Logo>
        <Title>Something Amazing is Coming</Title>
        <Subtitle>
          We&apos;re crafting an exceptional digital experience just for you.
          Our new website will be launching very soon — stay tuned!
        </Subtitle>
        <Badge>
          <Dot />
          Under Development
        </Badge>

        <SocialLinks>
          <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </SocialLink>
        </SocialLinks>

        <BrandName>OwlMarketingHub</BrandName>
      </Content>
    </Container>
  );
}
