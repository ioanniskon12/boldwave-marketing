'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { FAQAccordion } from '@/components/sections';
import { Icon } from '@/components/icons';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

// ============================================
// HERO SECTION
// ============================================
const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 160px 0 100px;
  background: #ffffff;
  overflow: hidden;

  ${media.lg} {
    min-height: 95vh;
    padding: 120px 0 80px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #fef6f0 0%, #fff8f3 100%);
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);

  ${media.lg} {
    width: 45%;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
`;

const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: rgba(255, 140, 66, 0.1);
  border-radius: 50px;
  margin-bottom: 24px;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const HeroTagText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.1;
  animation: ${fadeInUp} 0.6s ease 0.1s forwards;
  opacity: 0;

  ${media.lg} {
    font-size: 72px;
  }
`;

const TitleAccent = styled.span`
  color: #ff8c42;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 140, 66, 0.3);

    ${media.lg} {
      bottom: 12px;
      height: 6px;
    }
  }
`;

const HeroDescription = styled.p`
  font-size: 20px;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 48px;
  max-width: 540px;
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;
  opacity: 0;

  ${media.lg} {
    font-size: 22px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  animation: ${fadeInUp} 0.6s ease 0.3s forwards;
  opacity: 0;
`;

const OutlineButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

// ============================================
// WHAT YOU GET / BENEFITS SECTION
// ============================================
const BenefitsSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  justify-content: center;
`;

const TagLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
  animation: ${lineGrow} 0.6s ease forwards;
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
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BenefitsGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled.div`
  padding: 40px 32px;
  background: #ffffff;
  border-radius: 24px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 32px;
    right: 32px;
    height: 4px;
    background: linear-gradient(90deg, #ff8c42, #ffb380);
    border-radius: 0 0 4px 4px;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fff5ee, #fff0e6);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #ff8c42;
`;

const BenefitTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const BenefitDescription = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.6;
`;

// ============================================
// FOR WHO / TARGET AUDIENCE SECTION
// ============================================
const AudienceSection = styled.section`
  padding: 0;
  background: #ffffff;
  display: grid;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    min-height: 600px;
  }
`;

const AudienceLeft = styled.div`
  padding: 80px 40px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.lg} {
    padding: 100px 80px;
  }
`;

const AudienceTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const AudienceSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  max-width: 400px;
`;

const AudienceRight = styled.div`
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.lg} {
    padding: 100px 80px;
  }
`;

const AudienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const AudienceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px 0;
  border-bottom: 1px solid #eeeeee;
  transition: all 0.3s ease;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:hover {
    padding-left: 12px;
  }
`;

const AudienceIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #fff5ee, #fff0e6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
`;

const AudienceText = styled.p`
  font-size: 17px;
  color: #444444;
  line-height: 1.5;
  margin: 0;
  font-weight: 600;
`;

// ============================================
// FEATURES SECTION
// ============================================
const FeaturesSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 48px;
  margin-top: 60px;

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const FeatureNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.15);
  line-height: 1;
  min-width: 60px;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.7;
`;

// ============================================
// TOOLS & INTEGRATIONS SECTION
// ============================================
const ToolsSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const ToolsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 60px;
`;

const ToolItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const ToolIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #fff5ee, #fff0e6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
`;

const ToolName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
`;

// ============================================
// PRICING SECTION
// ============================================
const PricingSection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  gap: 32px;
  margin-top: 60px;

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
    max-width: 900px;
    margin: 60px auto 0;
  }
`;

const PricingCard = styled.div`
  padding: 48px 40px;
  background: ${({ $featured }) => ($featured ? 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)' : '#ffffff')};
  border-radius: 24px;
  border: ${({ $featured }) => ($featured ? 'none' : '2px solid #eeeeee')};
  position: relative;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);
  }
`;

const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  right: 32px;
  padding: 8px 16px;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 20px;
`;

const PricingName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $featured }) => ($featured ? '#ffffff' : '#1a1a1a')};
  margin-bottom: 8px;
`;

const PricingPrice = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${({ $featured }) => ($featured ? '#ffffff' : '#1a1a1a')};
  margin-bottom: 8px;

  span {
    font-size: 18px;
    font-weight: 500;
    color: ${({ $featured }) => ($featured ? 'rgba(255,255,255,0.8)' : '#999999')};
  }
`;

const PricingDescription = styled.p`
  font-size: 15px;
  color: ${({ $featured }) => ($featured ? 'rgba(255,255,255,0.85)' : '#666666')};
  margin-bottom: 32px;
  line-height: 1.6;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    font-size: 15px;
    color: ${({ $featured }) => ($featured ? '#ffffff' : '#444444')};
    border-bottom: 1px solid ${({ $featured }) => ($featured ? 'rgba(255,255,255,0.1)' : '#eeeeee')};

    &:last-child {
      border-bottom: none;
    }

    svg {
      color: ${({ $featured }) => ($featured ? '#ffffff' : '#ff8c42')};
      flex-shrink: 0;
    }
  }
`;

const PricingButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 18px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;

  ${({ $featured }) =>
    $featured
      ? `
    background: #ffffff;
    color: #ff8c42;

    &:hover {
      background: #1a1a1a;
      color: #ffffff;
    }
  `
      : `
    background: #ff8c42;
    color: #ffffff;

    &:hover {
      background: #e67935;
    }
  `}
`;

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = styled.section`
  padding: 100px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 140px 0;
  }
`;

const FAQWrapper = styled.div`
  margin-top: 60px;
`;

// ============================================
// TESTIMONIALS SECTION
// ============================================
const TestimonialsSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);

  ${media.lg} {
    padding: 140px 0;
  }
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const TestimonialsTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const TestimonialsSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 500px;
  margin: 0 auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  gap: 32px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled.div`
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-8px);
  }
`;

const TestimonialQuote = styled.p`
  font-size: 16px;
  color: #ffffff;
  line-height: 1.8;
  margin-bottom: 24px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TestimonialAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;

const TestimonialRole = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

// ============================================
// CTA SECTION
// ============================================
const CTASection = styled.section`
  padding: 120px 0;
  background: #1a1a1a;
  text-align: center;

  ${media.lg} {
    padding: 160px 0;
  }
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 56px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 48px;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// ============================================
// DATA
// ============================================
const benefits = [
  {
    icon: '🚀',
    title: 'Launch Faster',
    description: 'Get your marketing campaigns up and running in days, not weeks. Our streamlined process saves you time.',
  },
  {
    icon: '📈',
    title: 'Scale Confidently',
    description: 'Proven strategies that grow with your business. From startup to enterprise, we adapt to your needs.',
  },
  {
    icon: '💰',
    title: 'Maximize ROI',
    description: 'Data-driven decisions that ensure every dollar works harder. Average 4.2x return on ad spend.',
  },
];

const audiences = [
  { icon: '🏢', text: 'Growing startups ready to scale' },
  { icon: '🛒', text: 'E-commerce brands seeking growth' },
  { icon: '💼', text: 'B2B companies generating leads' },
  { icon: '🎯', text: 'Businesses launching new products' },
];

const features = [
  {
    title: 'Strategy Development',
    description: 'Custom marketing roadmaps tailored to your specific goals, audience, and budget.',
  },
  {
    title: 'Content Creation',
    description: 'Engaging content that resonates with your audience across all platforms.',
  },
  {
    title: 'Performance Tracking',
    description: 'Real-time analytics and reporting to measure and optimize campaigns.',
  },
  {
    title: 'Audience Targeting',
    description: 'Precision targeting to reach the right people at the right time.',
  },
  {
    title: 'A/B Testing',
    description: 'Continuous optimization through testing and data analysis.',
  },
  {
    title: 'Dedicated Support',
    description: 'A team of experts available to guide you every step of the way.',
  },
];

const tools = [
  { icon: '📱', name: 'Meta Ads' },
  { icon: '🔍', name: 'Google Ads' },
  { icon: '📊', name: 'Analytics' },
  { icon: '📧', name: 'Mailchimp' },
  { icon: '🎨', name: 'Canva' },
  { icon: '📹', name: 'TikTok' },
  { icon: '💬', name: 'Slack' },
  { icon: '📝', name: 'Notion' },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for small businesses just getting started with marketing.',
    features: [
      'Basic social media setup',
      'Monthly content calendar',
      'Email support',
      'Performance reports',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$30',
    period: '/month',
    description: 'For growing businesses ready to scale their marketing efforts.',
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Paid advertising management',
      'Priority support',
      'Custom integrations',
    ],
    featured: true,
  },
];

const faqs = [
  {
    id: '1',
    question: 'How quickly can I expect to see results?',
    answer: 'Most clients start seeing initial results within the first 2-4 weeks. However, significant growth typically occurs within 2-3 months as we optimize campaigns based on data.',
  },
  {
    id: '2',
    question: 'What makes your approach different?',
    answer: 'We focus on data-driven strategies tailored to your specific business goals. Our team combines creativity with analytics to deliver measurable results.',
  },
  {
    id: '3',
    question: 'Do you offer custom packages?',
    answer: 'Absolutely! We understand every business is unique. Contact us to discuss a custom package tailored to your specific needs and budget.',
  },
  {
    id: '4',
    question: 'What kind of support do you provide?',
    answer: 'We offer dedicated support via email, chat, and scheduled calls. Pro plan clients get priority support with faster response times.',
  },
];

const testimonials = [
  {
    quote: 'Working with this team transformed our marketing. We saw a 300% increase in leads within the first quarter.',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    avatar: '👩',
  },
  {
    quote: 'The ROI on our ad spend exceeded all expectations. Highly recommend for any e-commerce brand.',
    name: 'Michael Chen',
    role: 'Founder, ShopBright',
    avatar: '👨',
  },
  {
    quote: 'Professional, creative, and results-driven. They truly understand what it takes to grow a business.',
    name: 'Emily Davis',
    role: 'Marketing Director',
    avatar: '👩‍💼',
  },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroBackground />
        <Container>
          <HeroContent>
            <HeroTag>
              <HeroTagText>🚀 Marketing Made Simple</HeroTagText>
            </HeroTag>

            <HeroTitle>
              Grow Your Business{' '}
              <TitleAccent>Faster</TitleAccent>
            </HeroTitle>

            <HeroDescription>
              Transform your marketing with data-driven strategies that deliver real results.
              Join hundreds of businesses that trust us to scale their growth.
            </HeroDescription>

            <HeroButtons>
              <AnimatedButton href="/contact" variant="orange">Get Started Free</AnimatedButton>
              <OutlineButton href="#pricing">
                View Pricing
              </OutlineButton>
            </HeroButtons>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* What You Get / Benefits Section */}
      <BenefitsSection>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>What You Get</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Everything you need to succeed</SectionTitle>
            <SectionSubtitle>
              Comprehensive marketing solutions designed to help your business grow and thrive.
            </SectionSubtitle>
          </SectionHeader>

          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index}>
                <BenefitIcon><Icon name={benefit.icon} size={28} /></BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </Container>
      </BenefitsSection>

      {/* For Who / Target Audience Section */}
      <AudienceSection>
        <AudienceLeft>
          <AudienceTitle>For who?</AudienceTitle>
          <AudienceSubtitle>
            Our solutions are perfect for businesses at any stage who are ready to take their marketing to the next level.
          </AudienceSubtitle>
        </AudienceLeft>

        <AudienceRight>
          <AudienceList>
            {audiences.map((item, index) => (
              <AudienceItem key={index}>
                <AudienceIcon><Icon name={item.icon} size={24} /></AudienceIcon>
                <AudienceText>{item.text}</AudienceText>
              </AudienceItem>
            ))}
          </AudienceList>
        </AudienceRight>
      </AudienceSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Features</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Features you&apos;ll love</SectionTitle>
            <SectionSubtitle>
              Powerful tools and strategies to accelerate your growth.
            </SectionSubtitle>
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureNumber>{String(index + 1).padStart(2, '0')}</FeatureNumber>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Tools & Integrations Section */}
      <ToolsSection>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Integrations</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Tools & Integrations</SectionTitle>
            <SectionSubtitle>
              We work with the platforms you already use and love.
            </SectionSubtitle>
          </SectionHeader>

          <ToolsGrid>
            {tools.map((tool, index) => (
              <ToolItem key={index}>
                <ToolIcon><Icon name={tool.icon} size={20} /></ToolIcon>
                <ToolName>{tool.name}</ToolName>
              </ToolItem>
            ))}
          </ToolsGrid>
        </Container>
      </ToolsSection>

      {/* Pricing Section */}
      <PricingSection id="pricing">
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Pricing</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Simple, transparent pricing</SectionTitle>
            <SectionSubtitle>
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </SectionSubtitle>
          </SectionHeader>

          <PricingGrid>
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} $featured={plan.featured}>
                {plan.featured && <PricingBadge>Most Popular</PricingBadge>}
                <PricingName $featured={plan.featured}>{plan.name}</PricingName>
                <PricingPrice $featured={plan.featured}>
                  {plan.price}<span>{plan.period}</span>
                </PricingPrice>
                <PricingDescription $featured={plan.featured}>
                  {plan.description}
                </PricingDescription>
                <PricingFeatures $featured={plan.featured}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </PricingFeatures>
                <PricingButton href="/contact" $featured={plan.featured}>
                  Get Started
                </PricingButton>
              </PricingCard>
            ))}
          </PricingGrid>
        </Container>
      </PricingSection>

      {/* FAQ Section */}
      <FAQSection>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>FAQ</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>Frequently asked questions</SectionTitle>
            <SectionSubtitle>
              Got questions? We&apos;ve got answers.
            </SectionSubtitle>
          </SectionHeader>

          <FAQWrapper>
            <FAQAccordion faqs={faqs} />
          </FAQWrapper>
        </Container>
      </FAQSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Container>
          <TestimonialsHeader>
            <TestimonialsTitle>Testimonials</TestimonialsTitle>
            <TestimonialsSubtitle>
              See what our clients have to say about working with us.
            </TestimonialsSubtitle>
          </TestimonialsHeader>

          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <TestimonialQuote>&ldquo;{testimonial.quote}&rdquo;</TestimonialQuote>
                <TestimonialAuthor>
                  <TestimonialAvatar>{testimonial.avatar}</TestimonialAvatar>
                  <TestimonialInfo>
                    <TestimonialName>{testimonial.name}</TestimonialName>
                    <TestimonialRole>{testimonial.role}</TestimonialRole>
                  </TestimonialInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </Container>
      </TestimonialsSection>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to <CTAHighlight>grow</CTAHighlight> your business?
            </CTATitle>
            <CTAText>
              Join hundreds of businesses that trust us to scale their marketing. Start your free trial today.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Get Started Free</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
