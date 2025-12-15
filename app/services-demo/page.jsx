'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { PageHero } from '@/components/sections';
import AnimatedButton from '@/components/ui/AnimatedButton';

// ============================================
// ANIMATIONS
// ============================================
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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// ============================================
// SHARED STYLED COMPONENTS
// ============================================
const Section = styled.section`
  padding: 80px 0;
  background: ${({ $background }) => $background || '#ffffff'};

  ${media.lg} {
    padding: 120px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: ${({ $align }) => $align || 'center'};
  margin-bottom: 48px;

  ${media.lg} {
    margin-bottom: 64px;
  }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
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
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 44px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

// ============================================
// SEO INTRO SECTION
// ============================================
const IntroSection = styled.section`
  padding: 80px 0 60px;
  background: #ffffff;

  ${media.lg} {
    padding: 100px 0 80px;
  }
`;

const IntroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const MainH1 = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 52px;
  }
`;

const IntroText = styled.p`
  font-size: 18px;
  color: #555555;
  line-height: 1.8;
  margin-bottom: 20px;

  ${media.lg} {
    font-size: 20px;
  }
`;

const TrustStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 48px;
  padding-top: 48px;
  border-top: 1px solid #e8e8e8;

  ${media.md} {
    gap: 32px;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #faf8f5;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

const TrustIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8c42;
  border-radius: 50%;
  color: #ffffff;
  font-size: 12px;
`;

// ============================================
// SERVICES GRID SECTION
// ============================================
const ServicesGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

const ServiceCard = styled.article`
  position: relative;
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #e8e8e8;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);
    border-color: transparent;
  }

  ${media.lg} {
    padding: 40px;
  }
`;

const ServiceIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.1));
  border-radius: 16px;
  margin-bottom: 24px;
  font-size: 32px;
`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const ServiceBenefit = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ServiceOutcomes = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const OutcomeItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: #555555;
  margin-bottom: 12px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    min-width: 20px;
    background: #ff8c42;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const ServiceCTA = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

// ============================================
// PROCESS SECTION
// ============================================
const ProcessGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
`;

const ProcessCard = styled.div`
  position: relative;
  text-align: center;
  padding: 32px 24px;
  background: #ffffff;
  border-radius: 20px;

  ${media.lg} {
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50px;
      right: -16px;
      width: 32px;
      height: 2px;
      background: linear-gradient(90deg, #ff8c42, transparent);
    }
  }
`;

const ProcessNumber = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  border-radius: 16px;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
`;

const ProcessTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const ProcessDesc = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.6;
`;


// ============================================
// TESTIMONIALS / SOCIAL PROOF SECTION
// ============================================
const TestimonialsGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 64px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

const TestimonialCard = styled.blockquote`
  position: relative;
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #e8e8e8;
  margin: 0;

  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 28px;
    font-size: 72px;
    font-weight: 800;
    color: rgba(255, 140, 66, 0.15);
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-size: 16px;
  color: #555555;
  line-height: 1.7;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.cite`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  font-style: normal;
`;

const AuthorRole = styled.span`
  font-size: 14px;
  color: #888888;
`;

const ResultsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 32px;
  background: #1a1a1a;
  border-radius: 24px;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
`;

const ResultItem = styled.div`
  text-align: center;
`;

const ResultValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #ff8c42;
  margin-bottom: 4px;

  ${media.lg} {
    font-size: 44px;
  }
`;

const ResultLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

// ============================================
// FAQ SECTION
// ============================================
const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  background: #ffffff;
  border-radius: 20px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.4s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }
`;

const FAQNumber = styled.span`
  font-size: 36px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.15);
  line-height: 1;
  flex-shrink: 0;

  ${media.md} {
    font-size: 48px;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 20px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  ${media.md} {
    gap: 20px;
    padding: 28px 32px;
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    flex: 1;
    transition: color 0.3s ease;

    ${media.md} {
      font-size: 18px;
    }
  }

  &:hover h4 {
    color: #ff8c42;
  }
`;

const FAQToggle = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isOpen }) => $isOpen ? '#ff8c42' : '#faf8f5'};
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;

  svg {
    color: ${({ $isOpen }) => $isOpen ? '#ffffff' : '#1a1a1a'};
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    transition: transform 0.3s ease;
  }
`;

const FAQAnswer = styled.div`
  max-height: ${({ $isOpen }) => $isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const FAQAnswerInner = styled.div`
  padding: 0 20px 24px;
  font-size: 15px;
  color: #666666;
  line-height: 1.7;

  ${media.md} {
    padding: 0 32px 28px 110px;
    font-size: 16px;
  }
`;

// ============================================
// FINAL CTA SECTION
// ============================================
const CTASection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
  }
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
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;

  ${media.md} {
    flex-direction: row;
  }
`;

const CTAButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: #ff8c42;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e67a35;
    transform: translateY(-2px);
  }
`;

const CTAButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const AnchorLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

const AnchorLink = styled.a`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 48px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
`;

const ContactInfo = styled.div``;

const ContactTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 44px;
  }
`;

const ContactText = styled.p`
  font-size: 18px;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 32px;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 12px;
  color: #ff8c42;
`;

const ContactItemText = styled.div`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
`;

const ContactForm = styled.form`
  padding: 40px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  background: #faf8f5;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  color: #1a1a1a;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff8c42;
    background: #ffffff;
  }

  &::placeholder {
    color: #999999;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  background: #faf8f5;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  color: #1a1a1a;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #ff8c42;
    background: #ffffff;
  }

  &::placeholder {
    color: #999999;
  }
`;

const FormSubmit = styled.button`
  width: 100%;
  padding: 18px 32px;
  background: #ff8c42;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e67a35;
    transform: translateY(-2px);
  }
`;

// ============================================
// DATA
// ============================================
const services = [
  {
    icon: '📱',
    title: 'Social Media Management',
    benefit: 'Build a loyal community and turn followers into customers.',
    outcomes: [
      'Consistent, on-brand content across all platforms',
      'Increased engagement and follower growth',
      'Community management that builds trust'
    ]
  },
  {
    icon: '🎬',
    title: 'Content Creation',
    benefit: 'Scroll-stopping visuals that capture attention and drive action.',
    outcomes: [
      'Professional photos and video content',
      'Reels, Stories, and UGC-style content',
      'Content that converts viewers to customers'
    ]
  },
  {
    icon: '📈',
    title: 'Paid Advertising',
    benefit: 'Targeted campaigns on Meta and Google that deliver ROI.',
    outcomes: [
      'Lower cost per acquisition',
      'Higher ROAS through continuous optimisation',
      'Scalable campaigns that grow with you'
    ]
  },
  {
    icon: '🎨',
    title: 'Branding & Visual Identity',
    benefit: 'A distinctive brand that stands out and stays memorable.',
    outcomes: [
      'Logo and visual identity system',
      'Brand guidelines for consistency',
      'Cohesive look across all touchpoints'
    ]
  },
  {
    icon: '💻',
    title: 'Website Design & Development',
    benefit: 'Fast, beautiful websites that convert visitors into leads.',
    outcomes: [
      'Mobile-first, SEO-optimised design',
      'Clear user journeys that drive conversions',
      'Easy-to-manage CMS integration'
    ]
  },
  {
    icon: '🔍',
    title: 'SEO & Local SEO',
    benefit: 'Get found when customers are searching for what you offer.',
    outcomes: [
      'Higher rankings on Google',
      'Increased organic traffic and leads',
      'Local visibility for service businesses'
    ]
  },
  {
    icon: '📧',
    title: 'Email Marketing & Funnels',
    benefit: 'Automated sequences that nurture leads and drive sales.',
    outcomes: [
      'Welcome sequences that convert',
      'Abandoned cart recovery flows',
      'Regular campaigns that keep you top of mind'
    ]
  },
  {
    icon: '📊',
    title: 'Analytics & Reporting',
    benefit: 'Clear insights that inform smarter marketing decisions.',
    outcomes: [
      'Custom dashboards for real-time tracking',
      'Monthly reports with actionable insights',
      'Data-driven recommendations for growth'
    ]
  }
];

const process = [
  { number: '01', title: 'Discover', desc: 'We learn your business, audience, and goals through a deep discovery session.' },
  { number: '02', title: 'Strategy', desc: 'We create a tailored marketing roadmap aligned with your objectives.' },
  { number: '03', title: 'Build', desc: 'We execute campaigns with creative excellence and technical precision.' },
  { number: '04', title: 'Optimise', desc: 'We continuously test, learn, and improve for peak performance.' }
];


const testimonials = [
  {
    text: "Owl Marketing completely transformed our social presence. We went from 500 followers to 15,000 in 6 months, and more importantly, we're seeing real leads come through.",
    name: 'Sarah Mitchell',
    role: 'Founder, Bloom Skincare',
    initials: 'SM'
  },
  {
    text: "The team's strategic approach to paid advertising has been a game-changer. Our ROAS improved by 280% within the first quarter of working together.",
    name: 'James O\'Connor',
    role: 'CEO, TechStart Ireland',
    initials: 'JO'
  },
  {
    text: "Finally, a marketing agency that actually delivers. Transparent reporting, creative content, and results we can see in our bottom line.",
    name: 'Emma Walsh',
    role: 'Director, Walsh Properties',
    initials: 'EW'
  }
];

const results = [
  { value: '+340%', label: 'Average Engagement Increase' },
  { value: '3.5x', label: 'Average ROAS' },
  { value: '€2M+', label: 'Revenue Generated for Clients' },
  { value: '98%', label: 'Client Retention Rate' }
];

const faqs = [
  {
    question: 'How quickly will I see results?',
    answer: 'Most clients see initial improvements within the first month—increased engagement, better content quality, and clearer brand messaging. Significant results like lead growth and revenue impact typically become evident within 3–6 months of consistent effort.'
  },
  {
    question: 'Do you handle content and ads together?',
    answer: 'Absolutely. We believe in integrated marketing. When content and advertising work together, they amplify each other\'s impact. Our Growth and Scale packages include both, ensuring your messaging is consistent across organic and paid channels.'
  },
  {
    question: 'What platforms do you work with?',
    answer: 'We work across all major platforms including Instagram, Facebook, TikTok, LinkedIn, Google Ads, and YouTube. We\'ll recommend the right platform mix based on where your audience spends their time.'
  },
  {
    question: 'Do I need to sign a long contract?',
    answer: 'We offer flexible arrangements. While we recommend a minimum 3-month commitment to see meaningful results, we don\'t lock you into long-term contracts. Our client retention speaks for itself.'
  },
  {
    question: 'Can you work with my existing brand?',
    answer: 'Of course! We can work within your existing brand guidelines or help refresh and strengthen your visual identity. Many clients come to us with established brands that just need expert execution.'
  },
  {
    question: 'What do you need from me to start?',
    answer: 'We\'ll need access to your social accounts, any brand assets you have, and some time for a discovery session. From there, we handle the heavy lifting while keeping you informed and involved in key decisions.'
  }
];

const trustPoints = [
  'Strategy-Led',
  'Content + Ads',
  'Transparent Reporting',
  'No Lock-In Contracts',
  'Dedicated Account Manager'
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function ServicesDemo() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section - Keep as is */}
      <PageHero
        badge="What We Do"
        title="Full-Service Marketing Solutions"
        description="From social media to custom websites, we provide everything your brand needs to grow. One team, seamless execution, measurable results."
        bigText="SERVICES"
      />

      {/* SEO Intro Section */}
      <IntroSection>
        <Container>
          <IntroContent>
            <SectionTag>
              <TagLine />
              <TagText>Our Services</TagText>
              <TagLine />
            </SectionTag>
            <MainH1>Digital Marketing Services That Drive Real Growth</MainH1>
            <IntroText>
              At Owl Marketing Hub, we partner with ambitious brands and businesses across Ireland and beyond.
              Whether you&apos;re a startup finding your voice or an established company ready to scale,
              our team delivers strategic, creative marketing that moves the needle.
            </IntroText>
            <IntroText>
              We don&apos;t believe in one-size-fits-all solutions. Every strategy we create is tailored to your
              unique goals, audience, and market position. From social media management to paid advertising,
              content creation to web development—we handle the full spectrum.
            </IntroText>
            <IntroText>
              The result? More visibility. More leads. More growth. And a marketing partner who genuinely
              cares about your success.
            </IntroText>

            <TrustStrip>
              {trustPoints.map((point, index) => (
                <TrustItem key={index}>
                  <TrustIcon>✓</TrustIcon>
                  {point}
                </TrustItem>
              ))}
            </TrustStrip>
          </IntroContent>
        </Container>
      </IntroSection>

      {/* Services Grid Section */}
      <Section id="services" $background="#faf8f5">
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>What We Offer</TagText>
            </SectionTag>
            <SectionTitle>Services That Deliver Results</SectionTitle>
            <SectionSubtitle>
              Choose individual services or combine them for a complete growth solution tailored to your needs.
            </SectionSubtitle>
          </SectionHeader>

          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceBenefit>{service.benefit}</ServiceBenefit>
                <ServiceOutcomes>
                  {service.outcomes.map((outcome, i) => (
                    <OutcomeItem key={i}>{outcome}</OutcomeItem>
                  ))}
                </ServiceOutcomes>
                <ServiceCTA onClick={scrollToContact}>
                  Enquire Now
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ServiceCTA>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </Section>

      {/* Process Section */}
      <Section $background="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>How It Works</TagText>
            </SectionTag>
            <SectionTitle>Our Proven Process</SectionTitle>
            <SectionSubtitle>
              A strategic framework that delivers consistent results for every client we work with.
            </SectionSubtitle>
          </SectionHeader>

          <ProcessGrid>
            {process.map((step, index) => (
              <ProcessCard key={index}>
                <ProcessNumber>{step.number}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDesc>{step.desc}</ProcessDesc>
              </ProcessCard>
            ))}
          </ProcessGrid>
        </Container>
      </Section>

      {/* Social Proof Section */}
      <Section $background="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Client Success</TagText>
            </SectionTag>
            <SectionTitle>What Our Clients Say</SectionTitle>
            <SectionSubtitle>
              Real feedback from brands we&apos;ve helped grow.
            </SectionSubtitle>
          </SectionHeader>

          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>{testimonial.initials}</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>

          <ResultsStrip>
            {results.map((result, index) => (
              <ResultItem key={index}>
                <ResultValue>{result.value}</ResultValue>
                <ResultLabel>{result.label}</ResultLabel>
              </ResultItem>
            ))}
          </ResultsStrip>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" $background="#faf8f5">
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>FAQ</TagText>
            </SectionTag>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <SectionSubtitle>
              Everything you need to know before getting started.
            </SectionSubtitle>
          </SectionHeader>

          <FAQList>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion
                  $isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  aria-expanded={openFAQ === index}
                >
                  <FAQNumber>{String(index + 1).padStart(2, '0')}</FAQNumber>
                  <h4>{faq.question}</h4>
                  <FAQToggle $isOpen={openFAQ === index}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </FAQToggle>
                </FAQQuestion>
                <FAQAnswer $isOpen={openFAQ === index}>
                  <FAQAnswerInner>{faq.answer}</FAQAnswerInner>
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to <CTAHighlight>accelerate your growth?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Let&apos;s discuss your goals and create a marketing strategy that delivers real results.
              Book a free discovery call or request a custom quote.
            </CTAText>
            <CTAButtons>
              <CTAButtonPrimary href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                Book a Call
              </CTAButtonPrimary>
              <CTAButtonSecondary href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                Get a Quote
              </CTAButtonSecondary>
            </CTAButtons>
            <AnchorLinks>
              <AnchorLink href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</AnchorLink>
              <AnchorLink href="#packages" onClick={(e) => { e.preventDefault(); scrollToSection('packages'); }}>Packages</AnchorLink>
              <AnchorLink href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</AnchorLink>
              <AnchorLink href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>Contact</AnchorLink>
            </AnchorLinks>
          </CTAContent>
        </Container>
      </CTASection>

      {/* Contact Section */}
      <ContactSection id="contact">
        <Container>
          <ContactGrid>
            <ContactInfo>
              <SectionTag>
                <TagLine />
                <TagText>Get in Touch</TagText>
              </SectionTag>
              <ContactTitle>Let&apos;s Start Your Growth Journey</ContactTitle>
              <ContactText>
                Ready to transform your marketing? Fill out the form and we&apos;ll get back to you
                within 24 hours to schedule your free discovery call.
              </ContactText>
              <ContactDetails>
                <ContactItem>
                  <ContactIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </ContactIcon>
                  <ContactItemText>hello@owlmarketinghub.com</ContactItemText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </ContactIcon>
                  <ContactItemText>Dublin, Ireland</ContactItemText>
                </ContactItem>
              </ContactDetails>
            </ContactInfo>

            <ContactForm onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <FormLabel htmlFor="name">Your Name</FormLabel>
                <FormInput type="text" id="name" name="name" placeholder="John Smith" required />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormInput type="email" id="email" name="email" placeholder="john@company.com" required />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="message">Your Message</FormLabel>
                <FormTextarea id="message" name="message" placeholder="Tell us about your project and goals..." required />
              </FormGroup>
              <FormSubmit type="submit">Send Message</FormSubmit>
            </ContactForm>
          </ContactGrid>
        </Container>
      </ContactSection>
    </>
  );
}
