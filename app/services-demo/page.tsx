'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { services } from '@/data';

// Design Selector
const PageWrapper = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: #faf8f5;
`;

const DesignSelector = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const DesignButton = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ $active }) => ($active ? '#ff8c42' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};

  &:hover {
    background: ${({ $active }) => ($active ? '#ff8c42' : 'rgba(255, 140, 66, 0.1)')};
  }
`;

// Shared Styles
const Section = styled.section`
  padding: 80px 0 120px;

  ${media.lg} {
    padding: 100px 0 140px;
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

// =====================================================
// DESIGN 1: Minimal Cards with Left Accent
// =====================================================
const Grid1 = styled.div`
  display: grid;
  gap: 16px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

const Card1 = styled(Link)`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px;
  background: #ffffff;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.4s ease;
  border-left: 4px solid transparent;

  &:hover {
    border-left-color: #ff8c42;
    transform: translateX(8px);
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  }

  ${media.lg} {
    padding: 32px;
  }
`;

const Card1Icon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf8f5;
  border-radius: 14px;
  font-size: 28px;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${Card1}:hover & {
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    filter: grayscale(1) brightness(10);
  }
`;

const Card1Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Card1Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  transition: color 0.3s ease;

  ${Card1}:hover & {
    color: #ff8c42;
  }
`;

const Card1Desc = styled.p`
  font-size: 14px;
  color: #888888;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// =====================================================
// DESIGN 2: Bento Grid with Featured Card
// =====================================================
const Grid2 = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(200px, auto);
  }
`;

const Card2 = styled(Link)<{ $featured?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px;
  background: #ffffff;
  border-radius: 24px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  ${media.md} {
    grid-column: ${({ $featured }) => ($featured ? 'span 3' : 'span 2')};
    grid-row: ${({ $featured }) => ($featured ? 'span 2' : 'span 1')};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff8c42, #ff6b35);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.12);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const Card2Header = styled.div<{ $featured?: boolean }>`
  display: flex;
  align-items: ${({ $featured }) => ($featured ? 'flex-start' : 'center')};
  gap: 16px;
  margin-bottom: ${({ $featured }) => ($featured ? '24px' : '16px')};
  flex-direction: ${({ $featured }) => ($featured ? 'column' : 'row')};

  ${media.md} {
    flex-direction: ${({ $featured }) => ($featured ? 'column' : 'row')};
  }
`;

const Card2Icon = styled.div<{ $featured?: boolean }>`
  width: ${({ $featured }) => ($featured ? '72px' : '48px')};
  height: ${({ $featured }) => ($featured ? '72px' : '48px')};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.1));
  border-radius: ${({ $featured }) => ($featured ? '20px' : '14px')};
  font-size: ${({ $featured }) => ($featured ? '36px' : '24px')};
  flex-shrink: 0;
`;

const Card2Title = styled.h3<{ $featured?: boolean }>`
  font-size: ${({ $featured }) => ($featured ? '24px' : '16px')};
  font-weight: 700;
  color: #1a1a1a;
  transition: color 0.3s ease;

  ${Card2}:hover & {
    color: #ff8c42;
  }

  ${media.lg} {
    font-size: ${({ $featured }) => ($featured ? '28px' : '18px')};
  }
`;

const Card2Desc = styled.p<{ $featured?: boolean }>`
  font-size: ${({ $featured }) => ($featured ? '16px' : '14px')};
  color: #666666;
  line-height: 1.7;
  flex: 1;
  display: ${({ $featured }) => ($featured ? 'block' : '-webkit-box')};
  -webkit-line-clamp: ${({ $featured }) => ($featured ? 'unset' : '2')};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Card2Arrow = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf8f5;
  border-radius: 50%;
  color: #888888;
  margin-top: auto;
  align-self: flex-end;
  transition: all 0.3s ease;

  ${Card2}:hover & {
    background: #ff8c42;
    color: #ffffff;
  }
`;

// =====================================================
// DESIGN 3: List Style with Numbers
// =====================================================
const Grid3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
`;

const Card3 = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
  background: #ffffff;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
    transform: scale(1.02);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
  }

  ${media.lg} {
    padding: 28px 36px;
    gap: 32px;
  }
`;

const Card3Number = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #ff8c42;
  width: 32px;
  flex-shrink: 0;

  ${Card3}:hover & {
    color: #ff8c42;
  }
`;

const Card3Icon = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf8f5;
  border-radius: 14px;
  font-size: 26px;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${Card3}:hover & {
    background: rgba(255, 140, 66, 0.2);
  }
`;

const Card3Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Card3Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
  transition: color 0.3s ease;

  ${Card3}:hover & {
    color: #ffffff;
  }

  ${media.lg} {
    font-size: 20px;
  }
`;

const Card3Desc = styled.p`
  font-size: 14px;
  color: #888888;
  line-height: 1.5;
  display: none;
  transition: color 0.3s ease;

  ${Card3}:hover & {
    color: rgba(255, 255, 255, 0.6);
  }

  ${media.md} {
    display: block;
  }
`;

const Card3Arrow = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e8e8e8;
  border-radius: 50%;
  color: #888888;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${Card3}:hover & {
    border-color: #ff8c42;
    background: #ff8c42;
    color: #ffffff;
  }
`;

const featureTags: { [key: string]: string[] } = {
  'social-media-management': ['Instagram', 'TikTok', 'LinkedIn'],
  'content-creation': ['Reels', 'UGC', 'Photography'],
  'branding-creative-direction': ['Logo', 'Identity', 'Guidelines'],
  'paid-advertising': ['Meta Ads', 'Google', 'TikTok'],
  'website-development': ['Next.js', 'Shopify', 'WordPress'],
  'ui-ux-design': ['Wireframes', 'Prototypes', 'UX'],
  'seo-content-writing': ['SEO', 'Blogs', 'Keywords'],
  'email-marketing': ['Klaviyo', 'Flows', 'Campaigns'],
  'influencer-partnerships': ['Creators', 'UGC', 'Outreach'],
  'marketing-strategy': ['Strategy', 'Research', 'Planning'],
  'full-funnel-setup': ['CRM', 'Automation', 'Funnels'],
};

export default function ServicesDemo() {
  const [activeDesign, setActiveDesign] = useState(1);

  return (
    <PageWrapper>
      <DesignSelector>
        <DesignButton $active={activeDesign === 1} onClick={() => setActiveDesign(1)}>
          Design 1
        </DesignButton>
        <DesignButton $active={activeDesign === 2} onClick={() => setActiveDesign(2)}>
          Design 2
        </DesignButton>
        <DesignButton $active={activeDesign === 3} onClick={() => setActiveDesign(3)}>
          Design 3
        </DesignButton>
      </DesignSelector>

      <Section>
        <Container>
          <SectionHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>Our Services</LabelText>
            </SectionLabel>
            <SectionTitle>Everything you need to grow</SectionTitle>
            <SectionDescription>
              Choose individual services or combine them for a complete growth solution.
            </SectionDescription>
          </SectionHeader>

          {/* Design 1: Minimal Cards with Left Accent */}
          {activeDesign === 1 && (
            <Grid1>
              {services.map((service) => (
                <Card1 key={service.id} href={`/services/${service.slug}`}>
                  <Card1Icon>{service.icon}</Card1Icon>
                  <Card1Content>
                    <Card1Title>{service.title}</Card1Title>
                    <Card1Desc>{service.shortDescription}</Card1Desc>
                  </Card1Content>
                </Card1>
              ))}
            </Grid1>
          )}

          {/* Design 2: Bento Grid */}
          {activeDesign === 2 && (
            <Grid2>
              {services.map((service, index) => {
                const isFeatured = index === 0 || index === 4;
                return (
                  <Card2 key={service.id} href={`/services/${service.slug}`} $featured={isFeatured}>
                    <Card2Header $featured={isFeatured}>
                      <Card2Icon $featured={isFeatured}>{service.icon}</Card2Icon>
                      <Card2Title $featured={isFeatured}>{service.title}</Card2Title>
                    </Card2Header>
                    <Card2Desc $featured={isFeatured}>{service.shortDescription}</Card2Desc>
                    <Card2Arrow>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Card2Arrow>
                  </Card2>
                );
              })}
            </Grid2>
          )}

          {/* Design 3: List Style */}
          {activeDesign === 3 && (
            <Grid3>
              {services.map((service, index) => (
                <Card3 key={service.id} href={`/services/${service.slug}`}>
                  <Card3Number>{String(index + 1).padStart(2, '0')}</Card3Number>
                  <Card3Icon>{service.icon}</Card3Icon>
                  <Card3Content>
                    <Card3Title>{service.title}</Card3Title>
                    <Card3Desc>{service.shortDescription}</Card3Desc>
                  </Card3Content>
                  <Card3Arrow>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Card3Arrow>
                </Card3>
              ))}
            </Grid3>
          )}
        </Container>
      </Section>
    </PageWrapper>
  );
}
