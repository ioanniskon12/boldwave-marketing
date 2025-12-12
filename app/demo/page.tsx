'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { media } from '@/styles/theme';
import AnimatedButton from '@/components/ui/AnimatedButton';

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 140, 66, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 140, 66, 0.6); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

// Page Layout
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0f;
`;

// Hero Section Base
const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 140px 0 100px;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;

  ${media.lg} {
    padding: 0 80px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  margin-bottom: 24px;
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

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  ${media.md} {
    font-size: 48px;
  }

  ${media.lg} {
    font-size: 56px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto 32px;

  ${media.lg} {
    font-size: 18px;
  }
`;

const BigText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  font-size: 50px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  line-height: 1;
  pointer-events: none;

  ${media.md} {
    font-size: 80px;
  }

  ${media.lg} {
    font-size: 120px;
  }
`;

// Hero Backgrounds
const PurpleGlowSection = styled(HeroSection)`
  background: #0d0d12;
`;

const CircularGlow = styled.div`
  position: absolute;
  top: 50%;
  left: -10%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 69, 180, 0.5) 0%, rgba(80, 40, 120, 0.3) 40%, transparent 70%);
  filter: blur(80px);
  animation: ${pulse} 8s ease-in-out infinite;
  pointer-events: none;

  ${media.lg} {
    width: 700px;
    height: 700px;
  }
`;

const CircularRings = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  pointer-events: none;

  ${media.lg} {
    width: 500px;
    height: 500px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(139, 69, 180, 0.25);
  }

  &::before { inset: 0; }
  &::after { inset: 50px; }
`;

const InnerRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid rgba(139, 69, 180, 0.2);

  ${media.lg} {
    width: 250px;
    height: 250px;
  }
`;

const OrangeGradientSection = styled(HeroSection)`
  background: linear-gradient(135deg, #1a0a00 0%, #0d0d12 50%, #1a1020 100%);
`;

const OrangeGlow = styled.div`
  position: absolute;
  top: 20%;
  right: -5%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.4) 0%, rgba(255, 100, 50, 0.2) 40%, transparent 70%);
  filter: blur(100px);
  animation: ${pulse} 6s ease-in-out infinite;
  pointer-events: none;
`;

const OrangeAccent = styled.div`
  position: absolute;
  bottom: 30%;
  left: 10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 75, 75, 0.3) 0%, transparent 70%);
  filter: blur(60px);
  animation: ${pulse} 8s ease-in-out infinite 2s;
  pointer-events: none;
`;

const MeshGradientSection = styled(HeroSection)`
  background: #0a0a0f;
`;

const MeshGradient = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(at 20% 30%, rgba(139, 69, 180, 0.4) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(66, 140, 255, 0.3) 0%, transparent 50%),
    radial-gradient(at 60% 80%, rgba(255, 140, 66, 0.3) 0%, transparent 50%),
    radial-gradient(at 10% 70%, rgba(50, 200, 150, 0.2) 0%, transparent 50%);
  filter: blur(60px);
  pointer-events: none;
`;

const GridSection = styled(HeroSection)`
  background: #0d0d12;
`;

const AnimatedGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(139, 69, 180, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 69, 180, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const GridGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(139, 69, 180, 0.3) 0%, transparent 60%);
  filter: blur(40px);
  pointer-events: none;
`;

const AuroraSection = styled(HeroSection)`
  background: #050510;
`;

const Aurora = styled.div`
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(66, 140, 255, 0.1) 20%,
    rgba(139, 69, 180, 0.2) 40%,
    rgba(255, 140, 66, 0.1) 60%,
    transparent 100%
  );
  background-size: 200% 200%;
  animation: ${gradientMove} 15s ease infinite;
  filter: blur(80px);
  pointer-events: none;
  transform: skewY(-12deg);
`;

const AuroraAccent = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(100, 200, 255, 0.2) 0%, transparent 70%);
  filter: blur(60px);
  animation: ${float} 8s ease-in-out infinite;
  pointer-events: none;
`;

const ParticlesSection = styled(HeroSection)`
  background: linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%);
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

// Color Palette Section
const PaletteSection = styled.section`
  padding: 80px 20px;
  background: #0a0a0f;

  ${media.lg} {
    padding: 100px 40px;
  }
`;

const PaletteContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
`;

const ColorCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ColorSwatch = styled.div<{ $color: string }>`
  height: 120px;
  background: ${({ $color }) => $color};

  ${media.lg} {
    height: 140px;
  }
`;

const ColorInfo = styled.div`
  padding: 16px;
`;

const ColorName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

const ColorHex = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
`;

const ColorCategory = styled.div`
  margin-bottom: 40px;
`;

const ColorCategoryTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  text-align: center;
`;

// Buttons Section
const ButtonsSection = styled.section`
  padding: 80px 20px 200px;
  background: #0a0a0f;

  ${media.lg} {
    padding: 100px 40px 220px;
  }
`;

const ButtonsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 60px;

  ${media.lg} {
    font-size: 36px;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 50px;
`;

// Base Button
const BaseButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
`;

// Border Radius Buttons
const SharpButton = styled.button`
  ${BaseButton}
  border-radius: 0;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const SubtleButton = styled.button`
  ${BaseButton}
  border-radius: 4px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const SoftButton = styled.button`
  ${BaseButton}
  border-radius: 8px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const RoundedButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const MoreRoundedButton = styled.button`
  ${BaseButton}
  border-radius: 16px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const PillButton = styled.button`
  ${BaseButton}
  border-radius: 100px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

// Style Variations
const OutlineButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: transparent;
  color: #ff8c42;
  border: 2px solid #ff8c42;
  &:hover { background: rgba(255, 140, 66, 0.1); transform: translateY(-2px); }
`;

const GhostButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-2px); }
`;

const GradientButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b6b 100%);
  color: #ffffff;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255, 140, 66, 0.3); }
`;

const GlassButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  &:hover { background: rgba(255, 255, 255, 0.15); transform: translateY(-2px); }
`;

const DarkButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #1a1a2e;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover { background: #252540; transform: translateY(-2px); }
`;

const WhiteButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ffffff;
  color: #0d0d12;
  &:hover { background: #f0f0f0; transform: translateY(-2px); }
`;

// Special Effects
const GlowButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  animation: ${glow} 2s ease-in-out infinite;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const ShimmerButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: linear-gradient(90deg, #ff8c42 0%, #ffb380 25%, #ff8c42 50%, #ffb380 75%, #ff8c42 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 3s linear infinite;
  color: #ffffff;
  &:hover { transform: translateY(-2px); }
`;

const BounceButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { animation: ${bounce} 0.5s ease infinite; background: #ff9f5a; }
`;

const Button3D = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  box-shadow: 0 4px 0 #cc6a30;
  &:hover { transform: translateY(2px); box-shadow: 0 2px 0 #cc6a30; }
  &:active { transform: translateY(4px); box-shadow: none; }
`;

const NeonButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: transparent;
  color: #ff8c42;
  border: 2px solid #ff8c42;
  box-shadow: 0 0 10px rgba(255, 140, 66, 0.3), inset 0 0 10px rgba(255, 140, 66, 0.1);
  &:hover { box-shadow: 0 0 20px rgba(255, 140, 66, 0.5), 0 0 40px rgba(255, 140, 66, 0.3); transform: translateY(-2px); }
`;

// Icon Buttons
const IconButton = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  svg { transition: transform 0.3s ease; }
  &:hover { background: #ff9f5a; transform: translateY(-2px); svg { transform: translateX(4px); } }
`;

// Size Variations
const SmallButton = styled.button`
  ${BaseButton}
  border-radius: 8px;
  background: #ff8c42;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 13px;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

const LargeButton = styled.button`
  ${BaseButton}
  border-radius: 16px;
  background: #ff8c42;
  color: #ffffff;
  padding: 18px 36px;
  font-size: 16px;
  &:hover { background: #ff9f5a; transform: translateY(-2px); }
`;

// Hover Effect Buttons
const HoverLift = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(255, 140, 66, 0.3); }
`;

const HoverScale = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { transform: scale(1.05); }
`;

const HoverGlow = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { box-shadow: 0 0 30px rgba(255, 140, 66, 0.6); }
`;

const HoverFill = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: transparent;
  color: #ff8c42;
  border: 2px solid #ff8c42;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #ff8c42;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: #ffffff;
    &::before { transform: scaleX(1); }
  }
`;

const HoverSlide = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: linear-gradient(90deg, #ff8c42 50%, #ff6b6b 50%);
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #ffffff;
  transition: background-position 0.3s ease;
  &:hover { background-position: 100% 0%; }
`;

const HoverBorder = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  border: 2px solid transparent;
  &:hover { border-color: #ffffff; transform: translateY(-2px); }
`;

const HoverDarken = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #e67530; }
`;

const HoverNone = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
`;

// Normal State Buttons (for comparison)
const NormalFlat = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  &:hover { background: #ff9f5a; }
`;

const NormalWithShadow = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 140, 66, 0.3);
  &:hover { background: #ff9f5a; box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4); }
`;

const NormalWithBorder = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: #ff8c42;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  &:hover { background: #ff9f5a; }
`;

const NormalSubtle = styled.button`
  ${BaseButton}
  border-radius: 12px;
  background: rgba(255, 140, 66, 0.9);
  color: #ffffff;
  &:hover { background: #ff8c42; }
`;

// Test Button with Smooth Swap
const TestButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 6px 6px 24px;
  background: #ff8c42;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  position: relative;
`;

const TestButtonText = styled.span`
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${TestButton}:hover & {
    transform: translateX(52px);
  }
`;

const TestArrowCircle = styled.span`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  color: #1a1a1a;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${TestButton}:hover & {
    transform: translateX(calc(-100% - 30px));
  }
`;

// Light variant
const TestButtonLight = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 6px 6px 24px;
  background: #ffffff;
  border: none;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  position: relative;
`;

const TestButtonTextDark = styled.span`
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${TestButtonLight}:hover & {
    transform: translateX(52px);
  }
`;

const TestArrowCircleLight = styled.span`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8c42;
  border-radius: 50%;
  color: #ffffff;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${TestButtonLight}:hover & {
    transform: translateX(calc(-100% - 30px));
  }
`;

// Selected indicator for buttons
const ButtonWrapper = styled.div<{ $isSelected: boolean }>`
  position: relative;

  ${({ $isSelected }) => $isSelected && `
    &::after {
      content: '✓';
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      background: #22c55e;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
  `}
`;

// Selector Bar
const SelectorBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 20px;
  z-index: 100;
`;

const SelectorContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SelectorRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SelectorLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  text-align: center;
  min-width: 120px;

  ${media.md} {
    text-align: left;
  }
`;

const SelectedValue = styled.span`
  color: #ff8c42;
  font-weight: 600;
`;

const SelectorButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const SelectorButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $isActive }) => $isActive ? '#ff8c42' : 'rgba(255, 255, 255, 0.2)'};
  background: ${({ $isActive }) => $isActive ? 'rgba(255, 140, 66, 0.2)' : 'transparent'};
  color: ${({ $isActive }) => $isActive ? '#ff8c42' : '#ffffff'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #ff8c42;
    background: rgba(255, 140, 66, 0.1);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
`;

type HeroOption = 'purple-glow' | 'orange-gradient' | 'mesh-gradient' | 'animated-grid' | 'aurora' | 'particles' | 'spotlight' | 'magnetic' | '3d-tilt' | 'trail';

const heroOptions: { id: HeroOption; label: string }[] = [
  { id: 'purple-glow', label: 'Purple Glow' },
  { id: 'orange-gradient', label: 'Orange' },
  { id: 'mesh-gradient', label: 'Mesh' },
  { id: 'animated-grid', label: 'Grid' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'particles', label: 'Particles' },
  { id: 'spotlight', label: 'Spotlight' },
  { id: 'magnetic', label: 'Magnetic' },
  { id: '3d-tilt', label: '3D Tilt' },
  { id: 'trail', label: 'Trail' },
];

// Interactive Hero Sections

// Spotlight Hero
const SpotlightSection = styled(HeroSection)`
  background: #050510;
`;

const SpotlightOverlay = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    150px circle at ${({ $x }) => $x}px ${({ $y }) => $y}px,
    rgba(139, 69, 180, 0.4),
    transparent 60%
  );
  pointer-events: none;
  transition: background 0.05s ease;
`;

const SpotlightGlow = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.6) 0%, transparent 70%);
  filter: blur(15px);
  left: ${({ $x }) => $x - 25}px;
  top: ${({ $y }) => $y - 25}px;
  pointer-events: none;
  transition: all 0.05s ease;
`;

// Magnetic Hero
const MagneticSection = styled(HeroSection)`
  background: linear-gradient(180deg, #0a0a15 0%, #0d0d18 100%);
`;

const MagneticOrb = styled.div<{ $x: number; $y: number; $baseX: number; $baseY: number; $color: string }>`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(30px);
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const MagneticRing = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid rgba(255, 140, 66, 0.3);
  left: ${({ $x }) => $x - 75}px;
  top: ${({ $y }) => $y - 75}px;
  pointer-events: none;
  transition: all 0.2s ease;
`;

// 3D Tilt Hero
const TiltSection = styled(HeroSection)<{ $rotateX: number; $rotateY: number }>`
  background: #0a0a12;
  perspective: 1000px;
`;

const TiltInner = styled.div<{ $rotateX: number; $rotateY: number }>`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(${({ $rotateX }) => $rotateX}deg) rotateY(${({ $rotateY }) => $rotateY}deg);
  transition: transform 0.1s ease;
`;

const TiltLayer = styled.div<{ $depth: number }>`
  position: absolute;
  inset: 0;
  transform: translateZ(${({ $depth }) => $depth}px);
`;

const TiltGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(139, 69, 180, 0.3) 0%, transparent 60%);
`;

const TiltGrid = styled.div`
  position: absolute;
  inset: -100px;
  background-image:
    linear-gradient(rgba(255, 140, 66, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 140, 66, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
`;

// Trail Hero
const TrailSection = styled(HeroSection)`
  background: #060610;
`;

const TrailDot = styled.div<{ $x: number; $y: number; $opacity: number; $scale: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, ${({ $opacity }) => $opacity}) 0%, transparent 70%);
  left: ${({ $x }) => $x - 10}px;
  top: ${({ $y }) => $y - 10}px;
  transform: scale(${({ $scale }) => $scale});
  pointer-events: none;
`;

const TrailGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 69, 180, 0.2) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
`;

// Section Backgrounds Showcase
const BackgroundsSection = styled.section`
  padding: 80px 20px;
  background: #0a0a0f;

  ${media.lg} {
    padding: 100px 40px;
  }
`;

const BackgroundsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackgroundsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BackgroundCard = styled.div<{ $bg: string; $hasPattern?: boolean }>`
  height: 200px;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const BackgroundName = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const BackgroundCode = styled.code`
  font-size: 11px;
  color: #666;
  background: rgba(0, 0, 0, 0.05);
  padding: 6px 10px;
  border-radius: 6px;
  font-family: monospace;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DotPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #ddd 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
`;

const NoisePattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
`;

const sectionBackgrounds = [
  { name: 'Pure White', code: '#ffffff', bg: '#ffffff' },
  { name: 'Light Gray', code: '#f8f9fa', bg: '#f8f9fa' },
  { name: 'Warm Gray', code: '#f5f5f5', bg: '#f5f5f5' },
  { name: 'Off-White Cream', code: '#faf8f5', bg: '#faf8f5' },
  { name: 'Cool Blue Tint', code: '#f8fafc', bg: '#f8fafc' },
  { name: 'Light Purple Tint', code: '#faf8ff', bg: '#faf8ff' },
  { name: 'Light Peach', code: '#fff8f5', bg: '#fff8f5' },
  { name: 'Mint Tint', code: '#f5faf8', bg: '#f5faf8' },
  { name: 'Subtle Gradient', code: 'linear-gradient(180deg, #fff, #f5f5f5)', bg: 'linear-gradient(180deg, #ffffff, #f5f5f5)' },
  { name: 'Warm Gradient', code: 'linear-gradient(180deg, #fff, #faf8f5)', bg: 'linear-gradient(180deg, #ffffff, #faf8f5)' },
  { name: 'Cool Gradient', code: 'linear-gradient(180deg, #fff, #f8fafc)', bg: 'linear-gradient(180deg, #ffffff, #f8fafc)' },
  { name: 'Mesh Gradient', code: 'radial-gradient mesh', bg: 'radial-gradient(at 0% 0%, #faf8ff 0%, transparent 50%), radial-gradient(at 100% 0%, #fff8f5 0%, transparent 50%), radial-gradient(at 100% 100%, #f5faf8 0%, transparent 50%), #ffffff' },
];

const patternBackgrounds = [
  { name: 'Dot Pattern', code: 'dots on #fafafa', pattern: 'dots' },
  { name: 'Noise/Grain', code: 'noise on #ffffff', pattern: 'noise' },
  { name: 'Grid Pattern', code: 'grid on #fafafa', pattern: 'grid' },
];

// Work Process Section Styles
const ProcessSection = styled.section`
  padding: 80px 20px;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 40px;
  }
`;

// Option 1 specific wrapper with dark background
const Option1Wrapper = styled.div`
  background: linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%);
  border-radius: 24px;
  padding: 60px 30px;
  margin-bottom: 60px;
`;

const ProcessContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessOptionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
  text-align: center;

  span {
    color: #ff8c42;
  }
`;

// Option 1: Curved Path Timeline
const curvedFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const curvedGlow = keyframes`
  0%, 100% { box-shadow: 0 10px 40px rgba(255, 140, 66, 0.3); }
  50% { box-shadow: 0 15px 50px rgba(255, 140, 66, 0.5); }
`;

const pathDraw = keyframes`
  from { stroke-dashoffset: 1500; }
  to { stroke-dashoffset: 0; }
`;

const CurvedTimeline = styled.div`
  position: relative;
  padding: 80px 0;
`;

const CurvedPath = styled.svg`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 200px;
  display: none;
  z-index: 0;

  ${media.lg} {
    display: block;
  }

  path {
    stroke-dasharray: 1500;
    stroke-dashoffset: 1500;
    animation: ${pathDraw} 2s ease-out forwards;
  }
`;

const CurvedStepsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
`;

const CurvedStepCard = styled.div<{ $index: number; $color: string }>`
  position: relative;
  text-align: center;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${curvedFloat} 4s ease-in-out infinite;
  animation-delay: ${({ $index }) => $index * 0.2}s;

  ${media.lg} {
    margin-top: ${({ $index }) => ($index % 2 === 0 ? '0' : '80px')};
  }

  &:hover {
    transform: translateY(-10px);

    .step-number {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const CurvedStepNumber = styled.div<{ $color: string }>`
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: ${({ $color }) => $color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${curvedGlow} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px dashed ${({ $color }) => `${$color}40`};
    animation: ${pulse} 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    background: ${({ $color }) => `${$color}10`};
    z-index: -1;
  }
`;

const CurvedStepIcon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

const CurvedStepTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const CurvedStepDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 200px;
  margin: 0 auto;
`;

// Option 2: Hexagon Cards
const HexagonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 40px 0;
`;

const HexagonCard = styled.div`
  position: relative;
  width: 200px;
  text-align: center;

  &:nth-child(even) {
    ${media.lg} {
      margin-top: 60px;
    }
  }
`;

const HexagonShape = styled.div`
  width: 120px;
  height: 104px;
  margin: 0 auto 24px;
  position: relative;
  background: linear-gradient(180deg, #0a0a12 0%, #1a1a2e 100%);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    background: linear-gradient(180deg, #1a1a2e 0%, #0a0a12 100%);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
`;

const HexagonIcon = styled.div`
  position: relative;
  z-index: 1;
  font-size: 36px;
`;

const HexagonNumber = styled.div`
  position: absolute;
  top: -10px;
  right: 30px;
  width: 32px;
  height: 32px;
  background: #ff8c42;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 140, 66, 0.4);
`;

const HexagonTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const HexagonDesc = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
`;

// Option 3: Floating Cards with Connector
const FloatingTimeline = styled.div`
  position: relative;
  padding: 40px 0;
`;

const FloatingConnector = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 4px;
  background: linear-gradient(90deg, #ff8c42, #8b45b0, #4285f4, #22c55e);
  border-radius: 2px;
  transform: translateY(-50%);
  display: none;

  ${media.lg} {
    display: block;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  &::before {
    left: 0;
    background: #ff8c42;
    box-shadow: 0 0 20px rgba(255, 140, 66, 0.6);
  }

  &::after {
    right: 0;
    background: #22c55e;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
  }
`;

const FloatingCardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  position: relative;
  z-index: 2;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FloatingCard = styled.div<{ $color: string; $index: number }>`
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${media.lg} {
    transform: translateY(${({ $index }) => ($index % 2 === 0 ? '-20px' : '20px')});
  }

  &:hover {
    transform: translateY(-30px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ $color }) => $color};
    border-radius: 20px 20px 0 0;
  }
`;

const FloatingCardIcon = styled.div<{ $color: string }>`
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: ${({ $color }) => `${$color}15`};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 20px;
    border: 2px dashed ${({ $color }) => `${$color}40`};
  }
`;

const FloatingCardNumber = styled.div<{ $color: string }>`
  position: absolute;
  top: -15px;
  right: 20px;
  width: 36px;
  height: 36px;
  background: ${({ $color }) => $color};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  box-shadow: 0 4px 15px ${({ $color }) => `${$color}50`};
`;

const FloatingCardTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
`;

const FloatingCardDesc = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

// Process Steps Data
const processSteps = [
  { number: 1, title: 'Discovery', description: 'Deep dive into your business goals and market', icon: '🔍', color: '#ff8c42' },
  { number: 2, title: 'Strategy', description: 'Craft data-driven marketing strategy', icon: '📊', color: '#8b45b0' },
  { number: 3, title: 'Execute', description: 'Launch and manage your campaigns', icon: '🚀', color: '#4285f4' },
  { number: 4, title: 'Optimize', description: 'Continuous testing and improvement', icon: '📈', color: '#22c55e' },
];

const ProcessDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  margin: 60px 0;
`;

// Color Palette Data
const colorPalette = {
  brand: [
    { name: 'Coral', hex: '#F97B6A' },
    { name: 'Coral Light', hex: '#FA9A8D' },
    { name: 'Navy', hex: '#162A3D' },
    { name: 'Navy Dark', hex: '#0F1E2C' },
  ],
  accent: [
    { name: 'Purple', hex: '#A020A0' },
    { name: 'Magenta', hex: '#B833B8' },
    { name: 'Purple Dark', hex: '#7A1A7A' },
    { name: 'Violet', hex: '#6B4EAF' },
  ],
  gradients: [
    { name: 'Brand Gradient', hex: 'linear-gradient(135deg, #B5985A 0%, #A020A0 50%, #4B5FA6 100%)' },
    { name: 'Coral to Navy', hex: 'linear-gradient(135deg, #F97B6A 0%, #162A3D 100%)' },
    { name: 'Purple to Blue', hex: 'linear-gradient(135deg, #A020A0 0%, #4B5FA6 100%)' },
    { name: 'Sunset', hex: 'linear-gradient(135deg, #B5985A 0%, #A020A0 100%)' },
  ],
  backgrounds: [
    { name: 'Navy Base', hex: '#162A3D' },
    { name: 'Navy Dark', hex: '#0F1E2C' },
    { name: 'Navy Light', hex: '#1E3A50' },
    { name: 'Dark', hex: '#0a0a0f' },
  ],
  text: [
    { name: 'White', hex: '#ffffff' },
    { name: 'White 70%', hex: 'rgba(255, 255, 255, 0.7)' },
    { name: 'Coral Text', hex: '#F97B6A' },
    { name: 'Navy Text', hex: '#162A3D' },
  ],
  extended: [
    { name: 'Gold', hex: '#B5985A' },
    { name: 'Olive', hex: '#8B8B3D' },
    { name: 'Blue', hex: '#4B5FA6' },
    { name: 'Teal', hex: '#2D7A8C' },
  ],
  neon: [
    { name: 'Neon Pink', hex: '#FF10F0' },
    { name: 'Neon Blue', hex: '#00D4FF' },
    { name: 'Neon Green', hex: '#39FF14' },
    { name: 'Neon Yellow', hex: '#FFFF00' },
    { name: 'Neon Orange', hex: '#FF6600' },
    { name: 'Neon Purple', hex: '#BF00FF' },
    { name: 'Neon Cyan', hex: '#00FFFF' },
    { name: 'Neon Red', hex: '#FF073A' },
  ],
};

type ButtonSelection = {
  radius: string;
  style: string;
  effect: string;
  size: string;
  hover: string;
};

// Trail point interface
interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function DemoPage() {
  const [activeHero, setActiveHero] = useState<HeroOption>('purple-glow');
  const [selectedButtons, setSelectedButtons] = useState<ButtonSelection>({
    radius: '',
    style: '',
    effect: '',
    size: '',
    hover: '',
  });

  // Mouse tracking state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tiltRotation, setTiltRotation] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const trailIdRef = useRef(0);

  // Magnetic orbs base positions
  const magneticOrbs = [
    { baseX: 15, baseY: 30, color: 'rgba(139, 69, 180, 0.5)' },
    { baseX: 80, baseY: 20, color: 'rgba(255, 140, 66, 0.5)' },
    { baseX: 70, baseY: 70, color: 'rgba(66, 140, 255, 0.5)' },
    { baseX: 20, baseY: 60, color: 'rgba(255, 100, 100, 0.4)' },
    { baseX: 50, baseY: 40, color: 'rgba(100, 200, 150, 0.4)' },
  ];

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });

        // Calculate tilt (for 3D tilt hero)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
        const rotateX = -((y - centerY) / centerY) * 10;
        setTiltRotation({ x: rotateX, y: rotateY });

        // Add to trail (for trail hero)
        if (activeHero === 'trail') {
          trailIdRef.current += 1;
          setTrail(prev => [...prev.slice(-15), { x, y, id: trailIdRef.current }]);
        }
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [activeHero]);

  // Clear trail when switching away from trail hero
  useEffect(() => {
    if (activeHero !== 'trail') {
      setTrail([]);
    }
  }, [activeHero]);

  // Calculate magnetic orb positions
  const getMagneticPosition = (baseX: number, baseY: number) => {
    if (!heroRef.current) return { x: baseX, y: baseY };
    const rect = heroRef.current.getBoundingClientRect();
    const orbX = (baseX / 100) * rect.width;
    const orbY = (baseY / 100) * rect.height;

    const dx = mousePos.x - orbX;
    const dy = mousePos.y - orbY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 200;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      return {
        x: orbX + dx * force * 0.3,
        y: orbY + dy * force * 0.3,
      };
    }
    return { x: orbX, y: orbY };
  };

  const selectButton = (category: keyof ButtonSelection, value: string) => {
    setSelectedButtons(prev => ({ ...prev, [category]: value }));
  };

  const renderHero = () => {
    const content = (
      <ContentWrapper>
        <Badge>
          <BadgeDot />
          <BadgeText>Demo Page</BadgeText>
          <BadgeDot />
        </Badge>
        <Title>Style Showcase</Title>
        <Description>
          Preview different hero backgrounds and button styles. Use the selector at the bottom to switch hero styles.
        </Description>
      </ContentWrapper>
    );

    switch (activeHero) {
      case 'purple-glow':
        return (
          <PurpleGlowSection>
            <CircularGlow />
            <CircularRings><InnerRing /></CircularRings>
            {content}
            <BigText>PURPLE</BigText>
          </PurpleGlowSection>
        );
      case 'orange-gradient':
        return (
          <OrangeGradientSection>
            <OrangeGlow />
            <OrangeAccent />
            {content}
            <BigText>ORANGE</BigText>
          </OrangeGradientSection>
        );
      case 'mesh-gradient':
        return (
          <MeshGradientSection>
            <MeshGradient />
            {content}
            <BigText>MESH</BigText>
          </MeshGradientSection>
        );
      case 'animated-grid':
        return (
          <GridSection>
            <AnimatedGrid />
            <GridGlow />
            {content}
            <BigText>GRID</BigText>
          </GridSection>
        );
      case 'aurora':
        return (
          <AuroraSection>
            <Aurora />
            <AuroraAccent />
            {content}
            <BigText>AURORA</BigText>
          </AuroraSection>
        );
      case 'particles':
        return (
          <ParticlesSection>
            <ParticleGlow />
            <Particle $size={4} $top="20%" $left="15%" $delay={0} />
            <Particle $size={6} $top="30%" $left="80%" $delay={1} />
            <Particle $size={3} $top="60%" $left="25%" $delay={2} />
            <Particle $size={5} $top="70%" $left="70%" $delay={0.5} />
            <Particle $size={4} $top="40%" $left="50%" $delay={1.5} />
            {content}
            <BigText>PARTICLES</BigText>
          </ParticlesSection>
        );
      case 'spotlight':
        return (
          <SpotlightSection ref={heroRef as React.RefObject<HTMLElement>}>
            <SpotlightOverlay $x={mousePos.x} $y={mousePos.y} />
            <SpotlightGlow $x={mousePos.x} $y={mousePos.y} />
            {content}
            <BigText>SPOTLIGHT</BigText>
          </SpotlightSection>
        );
      case 'magnetic':
        return (
          <MagneticSection ref={heroRef as React.RefObject<HTMLElement>}>
            {magneticOrbs.map((orb, index) => {
              const pos = getMagneticPosition(orb.baseX, orb.baseY);
              return (
                <MagneticOrb
                  key={index}
                  $x={pos.x}
                  $y={pos.y}
                  $baseX={orb.baseX}
                  $baseY={orb.baseY}
                  $color={orb.color}
                />
              );
            })}
            <MagneticRing $x={mousePos.x} $y={mousePos.y} />
            {content}
            <BigText>MAGNETIC</BigText>
          </MagneticSection>
        );
      case '3d-tilt':
        return (
          <TiltSection
            ref={heroRef as React.RefObject<HTMLElement>}
            $rotateX={tiltRotation.x}
            $rotateY={tiltRotation.y}
          >
            <TiltInner $rotateX={tiltRotation.x} $rotateY={tiltRotation.y}>
              <TiltLayer $depth={-50}>
                <TiltGrid />
              </TiltLayer>
              <TiltLayer $depth={0}>
                <TiltGradient />
              </TiltLayer>
            </TiltInner>
            {content}
            <BigText>3D TILT</BigText>
          </TiltSection>
        );
      case 'trail':
        return (
          <TrailSection ref={heroRef as React.RefObject<HTMLElement>}>
            <TrailGlow />
            {trail.map((point, index) => {
              const opacity = (index + 1) / trail.length;
              const scale = 0.5 + (index / trail.length) * 1.5;
              return (
                <TrailDot
                  key={point.id}
                  $x={point.x}
                  $y={point.y}
                  $opacity={opacity}
                  $scale={scale}
                />
              );
            })}
            {content}
            <BigText>TRAIL</BigText>
          </TrailSection>
        );
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      {renderHero()}

      <BackgroundsSection>
        <BackgroundsContainer>
          <SectionTitle>Section Backgrounds</SectionTitle>
          <ColorCategoryTitle>Solid Colors & Gradients</ColorCategoryTitle>
          <BackgroundsGrid>
            {sectionBackgrounds.map((bg) => (
              <BackgroundCard key={bg.name} $bg={bg.bg}>
                <BackgroundName>{bg.name}</BackgroundName>
                <BackgroundCode>{bg.code}</BackgroundCode>
              </BackgroundCard>
            ))}
          </BackgroundsGrid>

          <ColorCategoryTitle style={{ marginTop: '40px' }}>With Patterns</ColorCategoryTitle>
          <BackgroundsGrid>
            {patternBackgrounds.map((bg) => (
              <BackgroundCard key={bg.name} $bg={bg.pattern === 'noise' ? '#ffffff' : '#fafafa'}>
                {bg.pattern === 'dots' && <DotPattern />}
                {bg.pattern === 'noise' && <NoisePattern />}
                {bg.pattern === 'grid' && <GridPattern />}
                <BackgroundName style={{ position: 'relative', zIndex: 1 }}>{bg.name}</BackgroundName>
                <BackgroundCode style={{ position: 'relative', zIndex: 1 }}>{bg.code}</BackgroundCode>
              </BackgroundCard>
            ))}
          </BackgroundsGrid>
        </BackgroundsContainer>
      </BackgroundsSection>

      <ProcessSection>
        <ProcessContainer>
          <SectionTitle>Work Process Options</SectionTitle>

          <Option1Wrapper>
            <ProcessOptionTitle style={{ color: '#ffffff' }}>Option 1: <span>Curved Path Timeline</span></ProcessOptionTitle>
            <CurvedTimeline>
            <CurvedPath viewBox="0 0 1200 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff8c42" />
                  <stop offset="33%" stopColor="#8b45b0" />
                  <stop offset="66%" stopColor="#4285f4" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <path
                d="M0,100 C150,20 300,180 450,100 C600,20 750,180 900,100 C1050,20 1200,100 1200,100"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </CurvedPath>
            <CurvedStepsContainer>
              {processSteps.map((step, index) => (
                <CurvedStepCard key={step.number} $index={index} $color={step.color}>
                  <CurvedStepNumber $color={step.color} className="step-number">
                    {step.number}
                  </CurvedStepNumber>
                  <CurvedStepTitle>{step.title}</CurvedStepTitle>
                  <CurvedStepDesc>{step.description}</CurvedStepDesc>
                </CurvedStepCard>
              ))}
            </CurvedStepsContainer>
          </CurvedTimeline>
          </Option1Wrapper>

          <ProcessDivider />

          <ProcessOptionTitle>Option 2: <span>Hexagon Cards</span></ProcessOptionTitle>
          <HexagonGrid>
            {processSteps.map((step) => (
              <HexagonCard key={step.number}>
                <HexagonShape>
                  <HexagonIcon>{step.icon}</HexagonIcon>
                </HexagonShape>
                <HexagonNumber>{step.number}</HexagonNumber>
                <HexagonTitle>{step.title}</HexagonTitle>
                <HexagonDesc>{step.description}</HexagonDesc>
              </HexagonCard>
            ))}
          </HexagonGrid>

          <ProcessDivider />

          <ProcessOptionTitle>Option 3: <span>Floating Cards</span></ProcessOptionTitle>
          <FloatingTimeline>
            <FloatingConnector />
            <FloatingCardsContainer>
              {processSteps.map((step, index) => (
                <FloatingCard key={step.number} $color={step.color} $index={index}>
                  <FloatingCardNumber $color={step.color}>{step.number}</FloatingCardNumber>
                  <FloatingCardIcon $color={step.color}>{step.icon}</FloatingCardIcon>
                  <FloatingCardTitle>{step.title}</FloatingCardTitle>
                  <FloatingCardDesc>{step.description}</FloatingCardDesc>
                </FloatingCard>
              ))}
            </FloatingCardsContainer>
          </FloatingTimeline>
        </ProcessContainer>
      </ProcessSection>

      <PaletteSection>
        <PaletteContainer>
          <SectionTitle>Color Palette</SectionTitle>

          <ColorCategory>
            <ColorCategoryTitle>Brand Colors</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.brand.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>

          <ColorCategory>
            <ColorCategoryTitle>Accent Colors</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.accent.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>

          <ColorCategory>
            <ColorCategoryTitle>Gradients</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.gradients.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex style={{ fontSize: '10px' }}>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>

          <ColorCategory>
            <ColorCategoryTitle>Background Colors</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.backgrounds.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>

          <ColorCategory>
            <ColorCategoryTitle>Text Colors</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.text.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>

          <ColorCategory>
            <ColorCategoryTitle>Extended Palette</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.extended.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>

          <ColorCategory>
            <ColorCategoryTitle>Neon Colors</ColorCategoryTitle>
            <PaletteGrid>
              {colorPalette.neon.map((color) => (
                <ColorCard key={color.name}>
                  <ColorSwatch $color={color.hex} />
                  <ColorInfo>
                    <ColorName>{color.name}</ColorName>
                    <ColorHex>{color.hex}</ColorHex>
                  </ColorInfo>
                </ColorCard>
              ))}
            </PaletteGrid>
          </ColorCategory>
        </PaletteContainer>
      </PaletteSection>

      <ButtonsSection>
        <ButtonsContainer>
          <SectionTitle>Button Styles</SectionTitle>

          <CategoryTitle>Your Current Button</CategoryTitle>
          <ButtonGrid>
            <AnimatedButton href="#" variant="orange">Get Started</AnimatedButton>
            <AnimatedButton href="#" variant="light">Learn More</AnimatedButton>
          </ButtonGrid>

          <CategoryTitle>Test: Smooth Swap Animation with Owl</CategoryTitle>
          <ButtonGrid>
            <TestButton>
              <TestButtonText>Get Started</TestButtonText>
              <TestArrowCircle>
                <img src="/owl.svg" alt="owl" width="20" height="20" style={{ filter: 'invert(1)' }} />
              </TestArrowCircle>
            </TestButton>
            <TestButtonLight>
              <TestButtonTextDark>Learn More</TestButtonTextDark>
              <TestArrowCircleLight>
                <img src="/owl.svg" alt="owl" width="20" height="20" />
              </TestArrowCircleLight>
            </TestButtonLight>
          </ButtonGrid>

          <CategoryTitle>Border Radius</CategoryTitle>
          <ButtonGrid>
            <ButtonWrapper $isSelected={selectedButtons.radius === 'Sharp (0px)'}>
              <SharpButton onClick={() => selectButton('radius', 'Sharp (0px)')}>Sharp (0px)</SharpButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.radius === 'Subtle (4px)'}>
              <SubtleButton onClick={() => selectButton('radius', 'Subtle (4px)')}>Subtle (4px)</SubtleButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.radius === 'Soft (8px)'}>
              <SoftButton onClick={() => selectButton('radius', 'Soft (8px)')}>Soft (8px)</SoftButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.radius === 'Rounded (12px)'}>
              <RoundedButton onClick={() => selectButton('radius', 'Rounded (12px)')}>Rounded (12px)</RoundedButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.radius === 'More (16px)'}>
              <MoreRoundedButton onClick={() => selectButton('radius', 'More (16px)')}>More (16px)</MoreRoundedButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.radius === 'Pill (100px)'}>
              <PillButton onClick={() => selectButton('radius', 'Pill (100px)')}>Pill (100px)</PillButton>
            </ButtonWrapper>
          </ButtonGrid>

          <CategoryTitle>Style Variations</CategoryTitle>
          <ButtonGrid>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Solid'}>
              <RoundedButton onClick={() => selectButton('style', 'Solid')}>Solid</RoundedButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Outline'}>
              <OutlineButton onClick={() => selectButton('style', 'Outline')}>Outline</OutlineButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Ghost'}>
              <GhostButton onClick={() => selectButton('style', 'Ghost')}>Ghost</GhostButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Gradient'}>
              <GradientButton onClick={() => selectButton('style', 'Gradient')}>Gradient</GradientButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Glass'}>
              <GlassButton onClick={() => selectButton('style', 'Glass')}>Glass</GlassButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Dark'}>
              <DarkButton onClick={() => selectButton('style', 'Dark')}>Dark</DarkButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'White'}>
              <WhiteButton onClick={() => selectButton('style', 'White')}>White</WhiteButton>
            </ButtonWrapper>
          </ButtonGrid>

          <CategoryTitle>Special Effects</CategoryTitle>
          <ButtonGrid>
            <ButtonWrapper $isSelected={selectedButtons.effect === 'Glow'}>
              <GlowButton onClick={() => selectButton('effect', 'Glow')}>Glow</GlowButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.effect === 'Shimmer'}>
              <ShimmerButton onClick={() => selectButton('effect', 'Shimmer')}>Shimmer</ShimmerButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.effect === 'Bounce'}>
              <BounceButton onClick={() => selectButton('effect', 'Bounce')}>Bounce</BounceButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.effect === '3D'}>
              <Button3D onClick={() => selectButton('effect', '3D')}>3D Button</Button3D>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.effect === 'Neon'}>
              <NeonButton onClick={() => selectButton('effect', 'Neon')}>Neon</NeonButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.effect === 'None'}>
              <RoundedButton onClick={() => selectButton('effect', 'None')}>None</RoundedButton>
            </ButtonWrapper>
          </ButtonGrid>

          <CategoryTitle>Sizes</CategoryTitle>
          <ButtonGrid>
            <ButtonWrapper $isSelected={selectedButtons.size === 'Small'}>
              <SmallButton onClick={() => selectButton('size', 'Small')}>Small</SmallButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.size === 'Medium'}>
              <RoundedButton onClick={() => selectButton('size', 'Medium')}>Medium</RoundedButton>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.size === 'Large'}>
              <LargeButton onClick={() => selectButton('size', 'Large')}>Large</LargeButton>
            </ButtonWrapper>
          </ButtonGrid>

          <CategoryTitle>Hover Effects</CategoryTitle>
          <ButtonGrid>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Lift'}>
              <HoverLift onClick={() => selectButton('hover', 'Lift')}>Lift Up</HoverLift>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Scale'}>
              <HoverScale onClick={() => selectButton('hover', 'Scale')}>Scale</HoverScale>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Glow'}>
              <HoverGlow onClick={() => selectButton('hover', 'Glow')}>Glow</HoverGlow>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Fill'}>
              <HoverFill onClick={() => selectButton('hover', 'Fill')}>Fill In</HoverFill>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Slide'}>
              <HoverSlide onClick={() => selectButton('hover', 'Slide')}>Color Slide</HoverSlide>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Border'}>
              <HoverBorder onClick={() => selectButton('hover', 'Border')}>Border</HoverBorder>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'Darken'}>
              <HoverDarken onClick={() => selectButton('hover', 'Darken')}>Darken</HoverDarken>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.hover === 'None'}>
              <HoverNone onClick={() => selectButton('hover', 'None')}>No Hover</HoverNone>
            </ButtonWrapper>
          </ButtonGrid>

          <CategoryTitle>Normal State (Default Look)</CategoryTitle>
          <ButtonGrid>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Flat'}>
              <NormalFlat onClick={() => selectButton('style', 'Flat')}>Flat</NormalFlat>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'With Shadow'}>
              <NormalWithShadow onClick={() => selectButton('style', 'With Shadow')}>With Shadow</NormalWithShadow>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'With Border'}>
              <NormalWithBorder onClick={() => selectButton('style', 'With Border')}>With Border</NormalWithBorder>
            </ButtonWrapper>
            <ButtonWrapper $isSelected={selectedButtons.style === 'Subtle'}>
              <NormalSubtle onClick={() => selectButton('style', 'Subtle')}>Subtle</NormalSubtle>
            </ButtonWrapper>
          </ButtonGrid>
        </ButtonsContainer>
      </ButtonsSection>

      <SelectorBar>
        <SelectorContent>
          <SelectorRow>
            <SelectorLabel>Hero Background:</SelectorLabel>
            <SelectorButtons>
              {heroOptions.map((option) => (
                <SelectorButton
                  key={option.id}
                  $isActive={activeHero === option.id}
                  onClick={() => setActiveHero(option.id)}
                >
                  {option.label}
                </SelectorButton>
              ))}
            </SelectorButtons>
          </SelectorRow>

          <Divider />

          <SelectorRow>
            <SelectorLabel>Your Selection:</SelectorLabel>
            <SelectorButtons>
              <SelectorLabel>
                Radius: <SelectedValue>{selectedButtons.radius || '-'}</SelectedValue>
              </SelectorLabel>
              <SelectorLabel>
                Style: <SelectedValue>{selectedButtons.style || '-'}</SelectedValue>
              </SelectorLabel>
              <SelectorLabel>
                Effect: <SelectedValue>{selectedButtons.effect || '-'}</SelectedValue>
              </SelectorLabel>
              <SelectorLabel>
                Size: <SelectedValue>{selectedButtons.size || '-'}</SelectedValue>
              </SelectorLabel>
              <SelectorLabel>
                Hover: <SelectedValue>{selectedButtons.hover || '-'}</SelectedValue>
              </SelectorLabel>
            </SelectorButtons>
          </SelectorRow>
        </SelectorContent>
      </SelectorBar>
    </PageWrapper>
  );
}
