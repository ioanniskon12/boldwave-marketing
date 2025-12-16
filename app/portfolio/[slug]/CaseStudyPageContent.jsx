'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { caseStudies } from '@/data';
import { Icon, SearchIcon, LightbulbIcon, RocketIcon, GrowthIcon } from '@/components/icons';

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

// ============================================
// HERO SECTION
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

// Stats Card
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
// MAIN IMAGE SHOWCASE
// ============================================
const ImageShowcaseSection = styled.section`
  padding: 0 0 100px;
  background: linear-gradient(180deg, #000000 0%, #faf8f5 50%);
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
// SECTION COMMON STYLES
// ============================================
const SectionHeader = styled.div`
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

// ============================================
// COMPARISON SECTION
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
  background: ${({ $type }) => ($type === 'challenge' ? '#ef4444' : '#22c55e')};
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

const ComparisonText = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.8;
`;

// ============================================
// PROCESS SECTION - Design 3: Dark Modern Cards
// ============================================
const ProcessSection = styled.section`
  padding: 80px 0 100px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a12 100%);
  position: relative;
  overflow: hidden;
`;

const ProcessBackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const ProcessCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 28px;
  text-align: center;
  transition: all 0.4s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff8c42, #ff6b35);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProcessNumber = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 64px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.08);
  line-height: 1;
`;

const ProcessIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(255, 107, 53, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
  position: relative;
  z-index: 1;
`;

const ProcessTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const ProcessDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const ArrowConnector = styled.div`
  display: none;

  ${media.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    color: #ff8c42;
    opacity: 0.6;
  }
`;

const processStepIcons = [SearchIcon, LightbulbIcon, RocketIcon, GrowthIcon];

// ============================================
// WHAT WE DID SECTION
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
`;

const WhatWeDidImageInner = styled.div`
  position: relative;
  aspect-ratio: 4/3;
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

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);

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

// ============================================
// TESTIMONIAL SECTION
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
// OTHER CASE STUDIES SECTION
// ============================================
const OtherCasesSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;
`;

const OtherCasesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CaseCard = styled(Link)`
  display: block;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CaseImage = styled.div`
  aspect-ratio: 16/10;
  position: relative;
  overflow: hidden;

  img {
    transition: transform 0.6s ease;
  }

  ${CaseCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CaseContent = styled.div`
  padding: 24px;
`;

const CaseIndustry = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const CaseTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${CaseCard}:hover & {
    color: #ff8c42;
  }
`;

const CaseClient = styled.div`
  font-size: 14px;
  color: #666666;
`;

// ============================================
// CTA SECTION
// ============================================
const CTASection = styled.section`
  padding: 60px 0;
  background: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CTAPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 60px 60px;
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 36px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 28px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// ============================================
// DATA HELPERS
// ============================================
const processSteps = [
  { title: 'Discovery', desc: 'Deep dive into business goals, audience, and competitive landscape' },
  { title: 'Strategy', desc: 'Data-driven marketing plan tailored to objectives' },
  { title: 'Execution', desc: 'Launch campaigns with continuous optimization' },
  { title: 'Scale', desc: 'Amplify results and expand successful initiatives' },
];

const getWhatWeDid = (services) => {
  const items = {
    'Paid Social': { icon: '🎯', text: 'Built high-performance paid social campaigns across Meta and TikTok' },
    'Creative Strategy': { icon: '🎨', text: 'Created 50+ scroll-stopping creatives optimized for conversion' },
    'CRO': { icon: '📈', text: 'Implemented conversion rate optimization across the entire journey' },
    'Google Ads': { icon: '🔍', text: 'Built and optimized Google Search and Shopping campaigns' },
    'LinkedIn Ads': { icon: '💼', text: 'Targeted decision-makers with precision B2B advertising' },
    'Content Marketing': { icon: '📝', text: 'Produced compelling content that drove engagement and leads' },
    'Lead Generation': { icon: '🚀', text: 'Implemented multi-channel lead generation strategies' },
    'Brand Strategy': { icon: '✨', text: 'Developed distinctive brand positioning and messaging' },
    'Influencer Marketing': { icon: '⭐', text: 'Partnered with relevant influencers to expand reach' },
    'Email Marketing': { icon: '📧', text: 'Built automated email sequences for nurturing and retention' },
  };

  return services.map((service) => items[service] || { icon: '✅', text: `Implemented ${service} strategy` });
};

// ============================================
// MAIN COMPONENT
// ============================================
export function CaseStudyPageContent({ caseStudy }) {
  const otherCaseStudies = caseStudies.filter((c) => c.id !== caseStudy.id).slice(0, 3);
  const whatWeDid = getWhatWeDid(caseStudy.services);
  const clientInitials = caseStudy.client.split(' ').map(w => w[0]).join('').slice(0, 2);

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
                <BreadcrumbCurrent>{caseStudy.client}</BreadcrumbCurrent>
              </Breadcrumb>

              <ClientBadge>
                <ClientLogo>{clientInitials}</ClientLogo>
                <ClientName>{caseStudy.client}</ClientName>
              </ClientBadge>

              <HeroTitle>{caseStudy.title}</HeroTitle>

              <HeroDescription>{caseStudy.description}</HeroDescription>

              <HeroTags>
                {caseStudy.services.map((service, index) => (
                  <HeroTag key={index}>{service}</HeroTag>
                ))}
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
                {caseStudy.results.slice(0, 4).map((result, index) => (
                  <StatItem key={index}>
                    <StatValue>{result.value}</StatValue>
                    <StatLabel>{result.metric}</StatLabel>
                  </StatItem>
                ))}
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
              src={caseStudy.image}
              alt={`${caseStudy.client} case study`}
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            <ImageCaption>
              <CaptionText>
                <CaptionTitle>{caseStudy.client}</CaptionTitle>
                <CaptionSubtitle>{caseStudy.industry}</CaptionSubtitle>
              </CaptionText>
              <CaptionBadge>Featured Project</CaptionBadge>
            </ImageCaption>
          </MainImageWrapper>
        </Container>
      </ImageShowcaseSection>

      {/* Challenge & Solution */}
      <ComparisonSection>
        <Container>
          <SectionHeader style={{ marginBottom: '48px' }}>
            <SectionTag>
              <TagLine />
              <TagText>The Story</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Challenge & Solution</SectionTitle>
            <SectionSubtitle>
              Understanding the problem and crafting the right approach.
            </SectionSubtitle>
          </SectionHeader>

          <ComparisonGrid>
            <ComparisonCard>
              <ComparisonBadge $type="challenge">Challenge</ComparisonBadge>
              <ComparisonTitle>The Problem</ComparisonTitle>
              <ComparisonText>{caseStudy.challenge}</ComparisonText>
            </ComparisonCard>

            <ComparisonCard>
              <ComparisonBadge $type="solution">Solution</ComparisonBadge>
              <ComparisonTitle>Our Approach</ComparisonTitle>
              <ComparisonText>{caseStudy.solution}</ComparisonText>
            </ComparisonCard>
          </ComparisonGrid>
        </Container>
      </ComparisonSection>

      {/* Process */}
      <ProcessSection>
        <ProcessBackgroundGrid />
        <Container>
          <SectionHeader style={{ marginBottom: '48px' }}>
            <SectionTag>
              <TagLine />
              <TagText>Our Process</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle $light>How we delivered results</SectionTitle>
            <SectionSubtitle $light>
              A proven methodology refined over 100+ successful campaigns.
            </SectionSubtitle>
          </SectionHeader>

          <ProcessGrid>
            {processSteps.map((step, index) => {
              const IconComponent = processStepIcons[index] || SearchIcon;
              const stepNumber = String(index + 1).padStart(2, '0');
              return (
                <ProcessCard key={index}>
                  <ProcessNumber>{stepNumber}</ProcessNumber>
                  <ProcessIcon>
                    <IconComponent size={28} />
                  </ProcessIcon>
                  <ProcessTitle>{step.title}</ProcessTitle>
                  <ProcessDesc>{step.desc}</ProcessDesc>
                  {index < processSteps.length - 1 && (
                    <ArrowConnector>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </ArrowConnector>
                  )}
                </ProcessCard>
              );
            })}
          </ProcessGrid>
        </Container>
      </ProcessSection>

      {/* What We Did */}
      <WhatWeDidSection>
        <Container>
          <WhatWeDidGrid>
            <WhatWeDidContent>
              <SectionTag>
                <TagLine />
                <TagText>Our Work</TagText>
              </SectionTag>
              <SectionTitle style={{ marginBottom: '24px' }}>What We Did</SectionTitle>
              <WhatWeDidText>
                We partnered closely with {caseStudy.client} to develop and execute a comprehensive
                strategy that addressed their unique challenges and unlocked new opportunities for growth.
              </WhatWeDidText>
              <WhatWeDidList>
                {whatWeDid.map((item, index) => (
                  <WhatWeDidItem key={index}>
                    <WhatWeDidIcon>
                      <Icon name={item.icon} size={18} />
                    </WhatWeDidIcon>
                    {item.text}
                  </WhatWeDidItem>
                ))}
              </WhatWeDidList>
            </WhatWeDidContent>
            {caseStudy.galleryImages && caseStudy.galleryImages[0] && (
              <WhatWeDidImage>
                <WhatWeDidImageInner>
                  <Image
                    src={caseStudy.galleryImages[0]}
                    alt="Project showcase"
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </WhatWeDidImageInner>
              </WhatWeDidImage>
            )}
          </WhatWeDidGrid>
        </Container>
      </WhatWeDidSection>

      {/* Gallery */}
      {caseStudy.galleryImages && caseStudy.galleryImages.length > 1 && (
        <GallerySection>
          <Container>
            <SectionHeader style={{ marginBottom: '48px' }}>
              <SectionTag>
                <TagLine />
                <TagText>Project Gallery</TagText>
                <TagLine />
              </SectionTag>
              <SectionTitle>Visual Highlights</SectionTitle>
              <SectionSubtitle>
                A selection of creative assets and campaign visuals.
              </SectionSubtitle>
            </SectionHeader>

            <GalleryGrid>
              {caseStudy.galleryImages.slice(1, 4).map((image, index) => (
                <GalleryItem key={index}>
                  <Image
                    src={image}
                    alt={`${caseStudy.client} project image ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </GalleryItem>
              ))}
            </GalleryGrid>
          </Container>
        </GallerySection>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <TestimonialSection>
          <TestimonialOrb />
          <Container>
            <TestimonialContent>
              <QuoteIcon>&ldquo;</QuoteIcon>
              <QuoteText>{caseStudy.testimonial.quote}</QuoteText>
              <QuoteAuthor>
                <AuthorAvatar>
                  {caseStudy.testimonial.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </AuthorAvatar>
                <AuthorName>{caseStudy.testimonial.author}</AuthorName>
                <AuthorRole>{caseStudy.testimonial.role}</AuthorRole>
              </QuoteAuthor>
            </TestimonialContent>
          </Container>
        </TestimonialSection>
      )}

      {/* Other Case Studies */}
      <OtherCasesSection>
        <Container>
          <SectionHeader style={{ marginBottom: '48px' }}>
            <SectionTag>
              <TagLine />
              <TagText>More Work</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Explore Other Case Studies</SectionTitle>
          </SectionHeader>

          <OtherCasesGrid>
            {otherCaseStudies.map((otherCase) => (
              <CaseCard key={otherCase.id} href={`/portfolio/${otherCase.slug}`}>
                <CaseImage>
                  <Image
                    src={otherCase.image}
                    alt={otherCase.client}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </CaseImage>
                <CaseContent>
                  <CaseIndustry>{otherCase.industry}</CaseIndustry>
                  <CaseTitle>{otherCase.title}</CaseTitle>
                  <CaseClient>{otherCase.client}</CaseClient>
                </CaseContent>
              </CaseCard>
            ))}
          </OtherCasesGrid>
        </Container>
      </OtherCasesSection>

      {/* CTA */}
      <CTASection>
        <CTAPattern />
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
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
