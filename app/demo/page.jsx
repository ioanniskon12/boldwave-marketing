'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { PageHero } from '@/components/sections';

// ============================================
// STYLED COMPONENTS
// ============================================
const Section = styled.section`
  padding: 80px 0;
  background: ${({ $background }) => $background || '#ffffff'};

  ${media.lg} {
    padding: 120px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
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
// PRICING / PACKAGES SECTION
// ============================================
const PricingGrid = styled.div`
  display: grid;
  gap: 24px;
  align-items: stretch;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

const PricingCard = styled.article`
  position: relative;
  padding: 40px 32px;
  background: ${({ $featured }) => $featured ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' : '#ffffff'};
  border-radius: 28px;
  border: ${({ $featured }) => $featured ? 'none' : '1px solid #e8e8e8'};
  color: ${({ $featured }) => $featured ? '#ffffff' : '#1a1a1a'};
  transform: ${({ $featured }) => $featured ? 'scale(1.02)' : 'none'};
  box-shadow: ${({ $featured }) => $featured ? '0 24px 48px rgba(0, 0, 0, 0.2)' : 'none'};

  ${media.lg} {
    padding: 48px 36px;
    transform: ${({ $featured }) => $featured ? 'scale(1.05)' : 'none'};
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 20px;
  background: #ff8c42;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffffff;
`;

const PricingName = styled.h3`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const PricingBestFor = styled.p`
  font-size: 15px;
  color: ${({ $featured }) => $featured ? 'rgba(255, 255, 255, 0.7)' : '#666666'};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const PricingPrice = styled.div`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;

  span {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.7;
  }
`;

const PricingDivider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ $featured }) => $featured ? 'rgba(255, 255, 255, 0.1)' : '#e8e8e8'};
  margin: 24px 0;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const PricingFeature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: ${({ $featured }) => $featured ? 'rgba(255, 255, 255, 0.9)' : '#555555'};
  margin-bottom: 14px;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const PricingOutcomes = styled.div`
  padding: 20px;
  background: ${({ $featured }) => $featured ? 'rgba(255, 255, 255, 0.05)' : '#faf8f5'};
  border-radius: 16px;
  margin-bottom: 24px;
`;

const OutcomeLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff8c42;
  margin-bottom: 12px;
`;

const OutcomeText = styled.p`
  font-size: 14px;
  color: ${({ $featured }) => $featured ? 'rgba(255, 255, 255, 0.8)' : '#666666'};
  margin-bottom: 8px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PricingCTA = styled(Link)`
  display: block;
  width: 100%;
  padding: 16px 32px;
  background: ${({ $featured }) => $featured ? '#ff8c42' : 'transparent'};
  border: 2px solid ${({ $featured }) => $featured ? '#ff8c42' : '#1a1a1a'};
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ $featured }) => $featured ? '#ffffff' : '#1a1a1a'};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $featured }) => $featured ? '#e67a35' : '#1a1a1a'};
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const PricingNote = styled.p`
  text-align: center;
  font-size: 14px;
  color: #888888;
  margin-top: 48px;
  font-style: italic;
`;

// ============================================
// DATA
// ============================================
const packages = [
  {
    name: 'Starter',
    bestFor: 'Small businesses just getting started with digital marketing.',
    price: '€499',
    features: [
      '8–10 posts per month',
      'Basic community management',
      '1 content shoot plan or asset guidance',
      'Monthly performance report'
    ],
    outcomes: [
      'Consistent brand presence',
      'Foundation for growth'
    ]
  },
  {
    name: 'Growth',
    bestFor: 'Brands ready to scale with content and paid advertising.',
    price: '€999',
    features: [
      '12–16 posts per month + 4 Reels',
      'Ads management (one platform)',
      'Bi-weekly campaign optimisation',
      'Monthly report + strategy call'
    ],
    outcomes: [
      '2–3x engagement increase',
      'Measurable lead growth'
    ],
    featured: true
  },
  {
    name: 'Scale',
    bestFor: 'Established brands seeking full-funnel marketing support.',
    price: '€1,999',
    features: [
      '20+ posts per month + 6–8 Reels',
      'Multi-platform ads management',
      'Landing page optimisation',
      'Weekly optimisation + advanced reporting'
    ],
    outcomes: [
      'Significant revenue growth',
      'Market leadership positioning'
    ]
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function DemoPage() {
  return (
    <>
      <PageHero
        badge="Demo"
        title="Pricing Demo Page"
        description="This is a demo page containing the pricing section for future use."
        bigText="DEMO"
      />

      {/* Pricing / Packages Section */}
      <Section id="packages" $background="#faf8f5">
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Pricing</TagText>
            </SectionTag>
            <SectionTitle>Packages for Every Stage</SectionTitle>
            <SectionSubtitle>
              Transparent pricing with flexible packages designed to grow with your business.
            </SectionSubtitle>
          </SectionHeader>

          <PricingGrid>
            {packages.map((pkg, index) => (
              <PricingCard key={index} $featured={pkg.featured}>
                {pkg.featured && <FeaturedBadge>Most Popular</FeaturedBadge>}
                <PricingName>{pkg.name}</PricingName>
                <PricingBestFor $featured={pkg.featured}>{pkg.bestFor}</PricingBestFor>
                <PricingPrice>
                  {pkg.price}<span> / month</span>
                </PricingPrice>
                <PricingDivider $featured={pkg.featured} />
                <PricingFeatures>
                  {pkg.features.map((feature, i) => (
                    <PricingFeature key={i} $featured={pkg.featured}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#ff8c42" strokeWidth="2"/>
                        <path d="M8 12l3 3 5-6" stroke="#ff8c42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </PricingFeature>
                  ))}
                </PricingFeatures>
                <PricingOutcomes $featured={pkg.featured}>
                  <OutcomeLabel>Typical Outcomes</OutcomeLabel>
                  {pkg.outcomes.map((outcome, i) => (
                    <OutcomeText key={i} $featured={pkg.featured}>• {outcome}</OutcomeText>
                  ))}
                </PricingOutcomes>
                <PricingCTA href="/contact" $featured={pkg.featured}>
                  Book a Call
                </PricingCTA>
              </PricingCard>
            ))}
          </PricingGrid>

          <PricingNote>
            Packages can be tailored based on your specific goals and platforms.
            <Link href="/contact" style={{ color: '#ff8c42', marginLeft: '8px' }}>Get a custom quote →</Link>
          </PricingNote>
        </Container>
      </Section>
    </>
  );
}
