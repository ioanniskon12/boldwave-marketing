'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import { Icon } from '@/components/icons';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

// Products Section
const ProductsSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;
  position: relative;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  ${media.lg} {
    margin-bottom: 80px;
  }
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const LabelLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
`;

const LabelText = styled.span`
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
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ProductsGrid = styled.div`
  display: grid;
  gap: 32px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
`;

const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)'};
  border-radius: 28px;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 480px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  ${media.lg} {
    padding: 48px;
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 30px;
  z-index: 2;
`;

const ProductIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  color: #ffffff;
  animation: ${float} 4s ease-in-out infinite;
  z-index: 1;
`;

const ProductContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const ProductTitle = styled.h3`
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 32px;
  }
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 24px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
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
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const ProductButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  font-size: 15px;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: #ffffff;
    transform: translateX(4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: 60px 0;
  background: #0d0d12;
  position: relative;
  overflow: hidden;
`;

const StatsGlow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.15), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(80px);
  pointer-events: none;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 24px;
`;

const StatValue = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff, #ff8c42);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media.lg} {
    font-size: 56px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

// Why SaaS Section
const WhySection = styled.section`
  padding: 100px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const WhyGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const WhyCard = styled.div`
  position: relative;
  padding: 32px;
  background: #faf8f5;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    background: #ffffff;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  }
`;

const WhyIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  border-radius: 18px;
  color: #ffffff;
`;

const WhyTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const WhyDesc = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
`;

// Coming Soon Section
const ComingSoonSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;
`;

const ComingSoonHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const ComingSoonGrid = styled.div`
  display: grid;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ComingSoonCard = styled.div`
  position: relative;
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  border: 2px dashed #e0e0e0;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff8c42;
    transform: translateY(-4px);
  }
`;

const ComingSoonIcon = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf8f5;
  border-radius: 14px;
  color: #ff8c42;
  opacity: 0.6;
`;

const ComingSoonTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 140, 66, 0.1);
  color: #ff8c42;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 20px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

// CTA Section
const CTASection = styled.section`
  padding: 120px 0;
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
  position: relative;
  z-index: 1;
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
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

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  ${media.md} {
    flex-direction: row;
  }
`;

// Product Data
const products = [
  {
    id: 'dm-automation',
    name: 'DM Automation',
    description: 'Automate your Instagram and Facebook DMs with intelligent flows, triggers, and AI-powered responses.',
    icon: '💬',
    badge: 'Most Popular',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    features: [
      'Automated DM sequences',
      'Multi-trigger workflows',
      'AI-powered responses',
      'Unified inbox management',
      'Advanced analytics',
    ],
    link: '/dashboard-demo',
  },
  {
    id: 'marketing-saas',
    name: 'Marketing SaaS',
    description: 'All-in-one marketing platform for social media management, content scheduling, and campaign analytics.',
    icon: '📊',
    badge: 'New',
    gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
    features: [
      'Social media scheduler',
      'Content calendar',
      'Campaign management',
      'Performance insights',
      'Team collaboration',
    ],
    link: '/dashboard-demo',
  },
  {
    id: 'ai-video',
    name: 'AI Video',
    description: 'Create stunning videos with AI. Generate, edit, and enhance video content in minutes.',
    icon: '🎬',
    badge: 'Coming Soon',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
    features: [
      'AI video generation',
      'Smart editing tools',
      'Auto captions & subtitles',
      'Template library',
      'Brand kit integration',
    ],
    link: '/dashboard-demo',
  },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '5M+', label: 'Messages Automated' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const whyItems = [
  { icon: '🚀', title: 'Fast Setup', desc: 'Get started in minutes with our intuitive onboarding' },
  { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security for your data' },
  { icon: '📈', title: 'Scalable', desc: 'Grows with your business needs' },
  { icon: '💡', title: 'Innovative', desc: 'Cutting-edge AI technology' },
];

const comingSoon = [
  { icon: '🎯', title: 'Lead Scoring AI' },
  { icon: '📧', title: 'Email Automation' },
  { icon: '🤖', title: 'Chatbot Builder' },
];

export function SaasPageContent() {
  return (
    <>
      <PageHero
        badge="Our Products"
        title="SaaS Tools Built to Scale Your Business"
        description="Discover our suite of powerful SaaS products designed to automate, optimize, and grow your digital presence."
        bigText="SAAS"
      />

      {/* Products Grid */}
      <ProductsSection>
        <Container>
          <SectionHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>Our Products</LabelText>
            </SectionLabel>
            <SectionTitle>Powerful tools for modern businesses</SectionTitle>
            <SectionDescription>
              Each product is designed with scalability, ease of use, and powerful features in mind.
            </SectionDescription>
          </SectionHeader>

          <ProductsGrid>
            {products.map((product) => (
              <ProductCard key={product.id} $gradient={product.gradient}>
                <ProductBadge>{product.badge}</ProductBadge>
                <ProductIconWrapper><Icon name={product.icon} size={36} /></ProductIconWrapper>
                <ProductContent>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <FeatureList>
                    {product.features.map((feature, index) => (
                      <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                  </FeatureList>
                  <ProductButton href={product.link}>
                    View Demo
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </ProductButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>
        </Container>
      </ProductsSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsGlow />
        <Container>
          <StatsGrid>
            {stats.map((stat) => (
              <StatItem key={stat.label}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>

      {/* Why Section */}
      <WhySection>
        <Container>
          <SectionHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>Why Choose Us</LabelText>
            </SectionLabel>
            <SectionTitle>Built for success</SectionTitle>
            <SectionDescription>
              Our products are designed with your success in mind, combining cutting-edge technology with intuitive design.
            </SectionDescription>
          </SectionHeader>

          <WhyGrid>
            {whyItems.map((item) => (
              <WhyCard key={item.title}>
                <WhyIcon><Icon name={item.icon} size={28} /></WhyIcon>
                <WhyTitle>{item.title}</WhyTitle>
                <WhyDesc>{item.desc}</WhyDesc>
              </WhyCard>
            ))}
          </WhyGrid>
        </Container>
      </WhySection>

      {/* Coming Soon Section */}
      <ComingSoonSection>
        <Container>
          <ComingSoonHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>In Development</LabelText>
            </SectionLabel>
            <SectionTitle>Coming Soon</SectionTitle>
            <SectionDescription>
              We&apos;re always working on new tools to help you succeed.
            </SectionDescription>
          </ComingSoonHeader>

          <ComingSoonGrid>
            {comingSoon.map((item) => (
              <ComingSoonCard key={item.title}>
                <ComingSoonIcon><Icon name={item.icon} size={24} /></ComingSoonIcon>
                <ComingSoonTitle>{item.title}</ComingSoonTitle>
                <ComingSoonBadge>Coming Soon</ComingSoonBadge>
              </ComingSoonCard>
            ))}
          </ComingSoonGrid>
        </Container>
      </ComingSoonSection>

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to <CTAHighlight>transform</CTAHighlight> your business?
            </CTATitle>
            <CTAText>
              Get started with our SaaS tools today and see the difference automation can make.
            </CTAText>
            <CTAButtons>
              <AnimatedButton href="/contact" variant="orange">Get Started Free</AnimatedButton>
              <AnimatedButton href="/dashboard-demo" variant="outlineLight">View Demo</AnimatedButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
