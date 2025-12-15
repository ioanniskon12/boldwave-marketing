'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const Section = styled.section`
  padding: 80px 0;
  background: #0d0d12;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.08), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(100px);
  pointer-events: none;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;

  ${media.lg} {
    margin-bottom: 64px;
  }
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const LabelLine = styled.span`
  width: 40px;
  height: 2px;
  background: #ff8c42;
`;

const LabelText = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c42;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 42px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

const ProductCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)'};
  border-radius: 24px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 320px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4);

    &::before {
      opacity: 1;
    }
  }

  ${media.lg} {
    padding: 36px;
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 20px;
  z-index: 2;
`;

const ProductIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  font-size: 28px;
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
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 24px;
  }
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const FeatureTag = styled.span`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const products = [
  {
    id: 'dm-automation',
    name: 'DM Automation',
    description: 'Automate your Instagram and Facebook DMs with intelligent flows and AI-powered responses.',
    icon: '💬',
    badge: 'Most Popular',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    features: ['Auto DMs', 'Workflows', 'AI Responses'],
    link: '/dashboard-demo',
  },
  {
    id: 'marketing-saas',
    name: 'Marketing SaaS',
    description: 'All-in-one marketing platform for social media management and campaign analytics.',
    icon: '📊',
    badge: 'New',
    gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
    features: ['Scheduler', 'Analytics', 'Campaigns'],
    link: '/dashboard-demo',
  },
  {
    id: 'ai-video',
    name: 'AI Video',
    description: 'Create stunning videos with AI. Generate, edit, and enhance video content in minutes.',
    icon: '🎬',
    badge: 'Coming Soon',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
    features: ['AI Generation', 'Auto Captions', 'Templates'],
    link: '/dashboard-demo',
  },
];

export default function SaasPreview() {
  return (
    <Section>
      <BackgroundGlow />
      <Container>
        <Header>
          <Label>
            <LabelLine />
            <LabelText>Our Products</LabelText>
          </Label>
          <Title>SaaS Tools Built to Scale Your Business</Title>
          <Subtitle>
            Discover our suite of powerful SaaS products designed to automate, optimize, and grow your digital presence.
          </Subtitle>
        </Header>

        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product.id} href={product.link} $gradient={product.gradient}>
              <ProductBadge>{product.badge}</ProductBadge>
              <ProductIconWrapper>{product.icon}</ProductIconWrapper>
              <ProductContent>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <FeatureList>
                  {product.features.map((feature, index) => (
                    <FeatureTag key={index}>{feature}</FeatureTag>
                  ))}
                </FeatureList>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductsGrid>

        <ButtonWrapper>
          <AnimatedButton href="/saas" variant="orange">View All Products</AnimatedButton>
        </ButtonWrapper>
      </Container>
    </Section>
  );
}
