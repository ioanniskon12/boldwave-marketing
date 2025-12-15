'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Icon } from '@/components/icons';

// Animations
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 140, 66, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 140, 66, 0.6); }
`;

// ============================================
// HERO SECTION - Premium Design
// ============================================
const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 120px 0 140px;
  background: linear-gradient(135deg, #000000 0%, #0a0a12 40%, #050508 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 20s ease infinite;
  overflow: hidden;
`;

const HeroOrb = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ $color }) => $color || 'radial-gradient(circle, rgba(255, 140, 66, 0.2), transparent 70%)'};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${pulse} ${({ $delay }) => 6 + $delay}s ease-in-out infinite;
  filter: blur(80px);
  pointer-events: none;
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 60px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 400px;
    gap: 80px;
  }
`;

const HeroLeft = styled.div``;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const BreadcrumbLink = styled(Link)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.2);
`;

const BreadcrumbCurrent = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const ClientBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px 8px 8px;
  background: rgba(255, 140, 66, 0.1);
  border: 1px solid rgba(255, 140, 66, 0.2);
  border-radius: 100px;
  margin-bottom: 28px;
`;

const ClientLogo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
`;

const ClientName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
`;

const HeroTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${media.lg} {
    font-size: 56px;
  }
`;

const HeroHighlight = styled.span`
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 540px;

  ${media.lg} {
    font-size: 20px;
  }
`;

const HeroTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const HeroTag = styled.span`
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 140, 66, 0.1);
    border-color: rgba(255, 140, 66, 0.3);
  }
`;

// Stats Card - Glass morphism
const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 36px;
  animation: ${float} 6s ease-in-out infinite;
`;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const StatsIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const StatsTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #ff8c42, #ffb088);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// ============================================
// RESULTS SECTION - Premium Dark Design
// ============================================
const ResultsSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);
  position: relative;
  overflow: hidden;
`;

const ResultsGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 140, 66, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 140, 66, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  z-index: 1;
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const TagLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
`;

const TagText = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c42;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: ${({ $light }) => ($light ? '#ffffff' : '#1a1a1a')};
  line-height: 1.2;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: ${({ $light }) => ($light ? 'rgba(255, 255, 255, 0.6)' : '#666666')};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ResultsCards = styled.div`
  display: grid;
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ResultCard = styled.div`
  position: relative;
  padding: 40px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s ease;
  animation: ${countUp} 0.6s ease forwards;
  animation-delay: ${({ $delay }) => $delay * 0.1}s;
  opacity: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-8px);
  }
`;

const ResultIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.15), rgba(255, 107, 53, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
  animation: ${glow} 3s ease-in-out infinite;
`;

const ResultValue = styled.div`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #ff8c42, #ffb088);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;

  ${media.lg} {
    font-size: 56px;
  }
`;

const ResultMetric = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
`;

const ResultDescription = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
`;

// ============================================
// MAIN IMAGE SHOWCASE SECTION
// ============================================
const ImageShowcaseSection = styled.section`
  padding: 0 0 100px;
  background: linear-gradient(180deg, #0a0a0a 0%, #faf8f5 50%);
  position: relative;
`;

const MainImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/8;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
  transform: translateY(-60px);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
  }
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  right: 32px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${media.lg} {
    bottom: 48px;
    left: 48px;
    right: 48px;
  }
`;

const CaptionText = styled.div`
  color: #ffffff;
`;

const CaptionTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;

  ${media.lg} {
    font-size: 24px;
  }
`;

const CaptionSubtitle = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const CaptionBadge = styled.div`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`;

// ============================================
// BEFORE/AFTER COMPARISON SECTION
// ============================================
const ComparisonSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;
`;

const ComparisonGrid = styled.div`
  display: grid;
  gap: 40px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;

const ComparisonCard = styled.div`
  padding: 40px;
  background: #ffffff;
  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
`;

const ComparisonBadge = styled.div`
  position: absolute;
  top: 0;
  left: 40px;
  padding: 10px 20px;
  background: ${({ $type }) => ($type === 'before' ? '#ef4444' : '#22c55e')};
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 0 0 12px 12px;
`;

const ComparisonTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 32px 0 24px;
`;

const ComparisonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ComparisonItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
  color: #666666;
  line-height: 1.6;

  &:last-child {
    border-bottom: none;
  }
`;

const ComparisonIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $type }) => ($type === 'before' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $type }) => ($type === 'before' ? '#ef4444' : '#22c55e')};
`;

// ============================================
// PROCESS TIMELINE SECTION
// ============================================
const ProcessSection = styled.section`
  padding: 100px 0;
  background: #ffffff;
`;

const ProcessTimeline = styled.div`
  display: grid;
  gap: 0;
  position: relative;

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProcessStep = styled.div`
  position: relative;
  padding: 40px 32px;
  text-align: center;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  transition: all 0.4s ease;

  &:hover {
    background: #faf8f5;
    border-color: rgba(255, 140, 66, 0.2);
    z-index: 1;
  }

  ${media.lg} {
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -20px;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #ff8c42, transparent);
      z-index: 2;
    }
  }
`;

const ProcessNumber = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
`;

const ProcessTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const ProcessDesc = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
`;

const ProcessDuration = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #e0e0e0;
  font-size: 12px;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// ============================================
// TESTIMONIAL SECTION - Premium
// ============================================
const TestimonialSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1f1f 100%);
  position: relative;
  overflow: hidden;
`;

const TestimonialOrb = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.15), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(100px);
  pointer-events: none;
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const QuoteIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #ffffff;
`;

const QuoteText = styled.blockquote`
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.6;
  margin: 0 0 40px;
  font-style: italic;

  ${media.lg} {
    font-size: 36px;
  }
`;

const QuoteAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const AuthorAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const AuthorName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

// ============================================
// GALLERY SECTION
// ============================================
const GallerySection = styled.section`
  padding: 100px 0;
  background: #ffffff;
`;

const GalleryGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 280px);
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  ${media.lg} {
    &:nth-child(1) {
      grid-column: span 8;
      grid-row: span 2;
    }
    &:nth-child(2) {
      grid-column: span 4;
    }
    &:nth-child(3) {
      grid-column: span 4;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);

    &::before {
      opacity: 1;
    }

    img {
      transform: scale(1.05);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GalleryLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

// ============================================
// WHAT WE DID SECTION WITH IMAGE
// ============================================
const WhatWeDidSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;
`;

const WhatWeDidGrid = styled.div`
  display: grid;
  gap: 60px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

const WhatWeDidContent = styled.div``;

const WhatWeDidText = styled.p`
  font-size: 17px;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 32px;
`;

const WhatWeDidList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const WhatWeDidItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid #e8e8e8;
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;

  &:last-child {
    border-bottom: none;
  }
`;

const WhatWeDidIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.15), rgba(255, 107, 53, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ff8c42;
`;

const WhatWeDidImage = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 140, 66, 0.1), transparent 70%);
    pointer-events: none;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const WhatWeDidImageInner = styled.div`
  position: relative;
  aspect-ratio: 4/3;
`;

// ============================================
// CTA SECTION
// ============================================
const CTASection = styled.section`
  padding: 120px 0;
  background: #faf8f5;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 52px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 18px;
  color: #666666;
  margin-bottom: 40px;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// ============================================
// DEMO PAGE COMPONENT
// ============================================
export default function CaseStudyDemoPage() {
  const results = [
    { icon: '📈', value: '312%', metric: 'Revenue Growth', description: 'Year-over-year increase in total revenue' },
    { icon: '🎯', value: '4.2x', metric: 'ROAS Achieved', description: 'Return on ad spend across all channels' },
    { icon: '💰', value: '-47%', metric: 'CPA Reduction', description: 'Lower cost per acquisition' },
    { icon: '🚀', value: '89%', metric: 'Conversion Rate', description: 'Improvement in checkout completion' },
  ];

  const beforeItems = [
    'Scattered marketing efforts with no clear strategy',
    'High customer acquisition costs eating into margins',
    'Poor tracking and attribution across channels',
    'Generic creative that failed to stand out',
    'No systematic approach to testing and optimization',
  ];

  const afterItems = [
    'Unified full-funnel marketing strategy',
    'Optimized spend with 4.2x ROAS',
    'Complete visibility with proper attribution',
    'Scroll-stopping creative that converts',
    'Continuous A/B testing and iteration',
  ];

  const processSteps = [
    { title: 'Discovery', desc: 'Deep dive into your business, audience, and competitive landscape', duration: 'Week 1' },
    { title: 'Strategy', desc: 'Data-driven marketing plan tailored to your goals', duration: 'Week 2' },
    { title: 'Launch', desc: 'Execute campaigns across optimized channels', duration: 'Week 3-4' },
    { title: 'Scale', desc: 'Amplify what works and expand winning strategies', duration: 'Ongoing' },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOrb $size={700} $top="-20%" $left="-15%" $delay={0} />
        <HeroOrb $size={500} $top="60%" $left="75%" $delay={2} $color="radial-gradient(circle, rgba(107, 99, 255, 0.15), transparent 70%)" />
        <HeroGrid />

        <Container>
          <HeroContent>
            <HeroLeft>
              <Breadcrumb>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbLink href="/portfolio">Portfolio</BreadcrumbLink>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbCurrent>Fashion Brand</BreadcrumbCurrent>
              </Breadcrumb>

              <ClientBadge>
                <ClientLogo>LV</ClientLogo>
                <ClientName>LuxeVogue Fashion</ClientName>
              </ClientBadge>

              <HeroTitle>
                How we scaled a D2C fashion brand to{' '}
                <HeroHighlight>$2.4M/month</HeroHighlight> in 6 months
              </HeroTitle>

              <HeroDescription>
                A complete transformation from struggling startup to category leader through strategic paid media,
                conversion optimization, and data-driven creative.
              </HeroDescription>

              <HeroTags>
                <HeroTag>Paid Social</HeroTag>
                <HeroTag>Creative Strategy</HeroTag>
                <HeroTag>CRO</HeroTag>
                <HeroTag>Email Marketing</HeroTag>
              </HeroTags>
            </HeroLeft>

            <StatsCard>
              <StatsHeader>
                <StatsIcon>
                  <Icon name="📊" size={24} />
                </StatsIcon>
                <StatsTitle>Key Results</StatsTitle>
              </StatsHeader>
              <StatsGrid>
                <StatItem>
                  <StatValue>312%</StatValue>
                  <StatLabel>Revenue Growth</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>4.2x</StatValue>
                  <StatLabel>ROAS</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>-47%</StatValue>
                  <StatLabel>CPA</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>89%</StatValue>
                  <StatLabel>Conv. Rate</StatLabel>
                </StatItem>
              </StatsGrid>
            </StatsCard>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Main Image Showcase */}
      <ImageShowcaseSection>
        <Container>
          <MainImageWrapper>
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop"
              alt="LuxeVogue Fashion Campaign"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            <ImageCaption>
              <CaptionText>
                <CaptionTitle>Hero Campaign Launch</CaptionTitle>
                <CaptionSubtitle>Spring/Summer Collection 2024</CaptionSubtitle>
              </CaptionText>
              <CaptionBadge>Featured Project</CaptionBadge>
            </ImageCaption>
          </MainImageWrapper>
        </Container>
      </ImageShowcaseSection>

      {/* Before/After Comparison */}
      <ComparisonSection>
        <Container>
          <ResultsHeader style={{ marginBottom: '48px' }}>
            <SectionTag>
              <TagLine />
              <TagText>The Transformation</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>From struggling to scaling</SectionTitle>
            <SectionSubtitle>
              See the dramatic shift in marketing performance and business outcomes.
            </SectionSubtitle>
          </ResultsHeader>

          <ComparisonGrid>
            <ComparisonCard>
              <ComparisonBadge $type="before">Before</ComparisonBadge>
              <ComparisonTitle>The Challenges</ComparisonTitle>
              <ComparisonList>
                {beforeItems.map((item, index) => (
                  <ComparisonItem key={index}>
                    <ComparisonIcon $type="before">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </ComparisonIcon>
                    {item}
                  </ComparisonItem>
                ))}
              </ComparisonList>
            </ComparisonCard>

            <ComparisonCard>
              <ComparisonBadge $type="after">After</ComparisonBadge>
              <ComparisonTitle>The Solutions</ComparisonTitle>
              <ComparisonList>
                {afterItems.map((item, index) => (
                  <ComparisonItem key={index}>
                    <ComparisonIcon $type="after">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </ComparisonIcon>
                    {item}
                  </ComparisonItem>
                ))}
              </ComparisonList>
            </ComparisonCard>
          </ComparisonGrid>
        </Container>
      </ComparisonSection>

      {/* Process Timeline */}
      <ProcessSection>
        <Container>
          <ResultsHeader style={{ marginBottom: '48px' }}>
            <SectionTag>
              <TagLine />
              <TagText>Our Process</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>How we delivered results</SectionTitle>
            <SectionSubtitle>
              A proven methodology refined over 100+ successful campaigns.
            </SectionSubtitle>
          </ResultsHeader>

          <ProcessTimeline>
            {processSteps.map((step, index) => (
              <ProcessStep key={index}>
                <ProcessNumber>{index + 1}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDesc>{step.desc}</ProcessDesc>
                <ProcessDuration>{step.duration}</ProcessDuration>
              </ProcessStep>
            ))}
          </ProcessTimeline>
        </Container>
      </ProcessSection>

      {/* What We Did Section */}
      <WhatWeDidSection>
        <Container>
          <WhatWeDidGrid>
            <WhatWeDidContent>
              <SectionTag>
                <TagLine />
                <TagText>Our Approach</TagText>
              </SectionTag>
              <SectionTitle style={{ marginBottom: '24px' }}>What We Did</SectionTitle>
              <WhatWeDidText>
                We partnered closely with LuxeVogue to develop and execute a comprehensive
                growth strategy that addressed their unique challenges and unlocked new opportunities
                for scale.
              </WhatWeDidText>
              <WhatWeDidList>
                <WhatWeDidItem>
                  <WhatWeDidIcon>
                    <Icon name="🎯" size={18} />
                  </WhatWeDidIcon>
                  Built full-funnel Meta campaigns with 50+ creative variants
                </WhatWeDidItem>
                <WhatWeDidItem>
                  <WhatWeDidIcon>
                    <Icon name="📊" size={18} />
                  </WhatWeDidIcon>
                  Implemented advanced tracking and attribution system
                </WhatWeDidItem>
                <WhatWeDidItem>
                  <WhatWeDidIcon>
                    <Icon name="🎨" size={18} />
                  </WhatWeDidIcon>
                  Developed scroll-stopping UGC and studio creative
                </WhatWeDidItem>
                <WhatWeDidItem>
                  <WhatWeDidIcon>
                    <Icon name="📧" size={18} />
                  </WhatWeDidIcon>
                  Built automated email flows for retention
                </WhatWeDidItem>
                <WhatWeDidItem>
                  <WhatWeDidIcon>
                    <Icon name="🚀" size={18} />
                  </WhatWeDidIcon>
                  Optimized landing pages for 89% conversion lift
                </WhatWeDidItem>
              </WhatWeDidList>
            </WhatWeDidContent>
            <WhatWeDidImage>
              <WhatWeDidImageInner>
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                  alt="Campaign creative showcase"
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </WhatWeDidImageInner>
            </WhatWeDidImage>
          </WhatWeDidGrid>
        </Container>
      </WhatWeDidSection>

      {/* Gallery Section */}
      <GallerySection>
        <Container>
          <ResultsHeader style={{ marginBottom: '48px' }}>
            <SectionTag>
              <TagLine />
              <TagText>Project Gallery</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Creative Highlights</SectionTitle>
            <SectionSubtitle>
              A selection of high-performing creative assets and campaign visuals.
            </SectionSubtitle>
          </ResultsHeader>

          <GalleryGrid>
            <GalleryItem>
              <Image
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=800&fit=crop"
                alt="Campaign visual 1"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <GalleryOverlay>
                <GalleryLabel>Hero Campaign - 4.8x ROAS</GalleryLabel>
              </GalleryOverlay>
            </GalleryItem>
            <GalleryItem>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="Campaign visual 2"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <GalleryOverlay>
                <GalleryLabel>UGC Creative</GalleryLabel>
              </GalleryOverlay>
            </GalleryItem>
            <GalleryItem>
              <Image
                src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop"
                alt="Campaign visual 3"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <GalleryOverlay>
                <GalleryLabel>Product Showcase</GalleryLabel>
              </GalleryOverlay>
            </GalleryItem>
          </GalleryGrid>
        </Container>
      </GallerySection>

      {/* Testimonial */}
      <TestimonialSection>
        <TestimonialOrb />
        <Container>
          <TestimonialContent>
            <QuoteIcon>&ldquo;</QuoteIcon>
            <QuoteText>
              Working with OwlMarketingHub transformed our business. They didn&apos;t just run ads—they became
              a true growth partner. The results speak for themselves: we&apos;ve scaled to levels we never
              thought possible.
            </QuoteText>
            <QuoteAuthor>
              <AuthorAvatar>JM</AuthorAvatar>
              <AuthorName>Jessica Martinez</AuthorName>
              <AuthorRole>CEO & Founder, LuxeVogue Fashion</AuthorRole>
            </QuoteAuthor>
          </TestimonialContent>
        </Container>
      </TestimonialSection>

      {/* CTA */}
      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to be our next <CTAHighlight>success story?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Let&apos;s discuss how we can help your brand achieve extraordinary results with a
              data-driven marketing strategy tailored to your goals.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Start Your Project</AnimatedButton>
              <AnimatedButton href="/portfolio" variant="outline">View More Case Studies</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
