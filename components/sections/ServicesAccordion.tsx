'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: '1',
    title: 'Social Media Management',
    shortDescription: 'Full social media account management with content calendars, community management, and performance tracking.',
    icon: '📱',
    slug: 'social-media-management',
    image: '/images/services/social-media.jpg',
  },
  {
    id: '2',
    title: 'Content Creation',
    shortDescription: 'Scroll-stopping content including static posts, carousels, reels, UGC videos, and professional photography.',
    icon: '🎬',
    slug: 'content-creation',
    image: '/images/services/content-creation.jpg',
  },
  {
    id: '3',
    title: 'Paid Advertising',
    shortDescription: 'High-performance ad campaigns across Meta, TikTok, and Google with full creative and optimization.',
    icon: '📈',
    slug: 'paid-advertising',
    image: '/images/services/paid-advertising.jpg',
  },
  {
    id: '4',
    title: 'Branding & Creative Direction',
    shortDescription: 'Complete brand identity development including logo design, brand guidelines, and marketing collateral.',
    icon: '🎨',
    slug: 'branding-creative-direction',
    image: '/images/services/branding.jpg',
  },
  {
    id: '5',
    title: 'Custom Website Development',
    shortDescription: 'Fully custom, high-performance websites built with Next.js, Shopify, or WordPress—designed to convert.',
    icon: '💻',
    slug: 'website-development',
    image: '/images/services/website.jpg',
  },
  {
    id: '6',
    title: 'SEO & Content Writing',
    shortDescription: 'Comprehensive SEO services with keyword research, technical optimization, and content strategy.',
    icon: '🔍',
    slug: 'seo-content-writing',
    image: '/images/services/seo.jpg',
  },
  {
    id: '7',
    title: 'Marketing Strategy',
    shortDescription: 'Strategic guidance with brand positioning, content strategy, competitor research, and funnel planning.',
    icon: '🧭',
    slug: 'marketing-strategy',
    image: '/images/services/strategy.jpg',
  },
];

const Section = styled.section`
  position: relative;
  padding: 80px 0;
  background: #faf8f5;
  overflow: hidden;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const HeaderLeft = styled.div``;

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
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  max-width: 400px;

  ${media.lg} {
    font-size: 36px;
  }
`;

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.lg} {
    flex-direction: row;
    height: 500px;
    gap: 8px;
  }
`;

const AccordionItem = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? 'rgba(255, 140, 66, 0.3)' : 'rgba(0, 0, 0, 0.08)')};
  border-radius: ${({ $isOpen }) => ($isOpen ? '24px' : '12px')};
  overflow: hidden;
  cursor: pointer;
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '#ffffff')};
  box-shadow: ${({ $isOpen }) => ($isOpen ? '0 10px 40px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.04)')};

  ${media.lg} {
    flex-direction: row;
    flex: ${({ $isOpen }) => ($isOpen ? 4 : 1)};
    border-radius: ${({ $isOpen }) => ($isOpen ? '24px' : '16px')};
  }
`;

const TabSection = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  ${media.lg} {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 24px 16px;
    min-width: 80px;
    height: 100%;
  }
`;

const ArrowButton = styled.div<{ $isOpen: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $isOpen }) => ($isOpen ? '#ff8c42' : 'rgba(0, 0, 0, 0.08)')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    color: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '#1a1a1a')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
    transition: transform 0.3s ease;
  }

  ${media.lg} {
    svg {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(90deg)')};
    }
  }
`;

const VerticalTitle = styled.div<{ $isOpen: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
  transition: color 0.3s ease;

  ${media.lg} {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-size: 15px;
  }
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isOpen }) => ($isOpen ? 'rgba(255, 140, 66, 0.15)' : 'rgba(0, 0, 0, 0.05)')};
  border-radius: 12px;
  font-size: 24px;
  transition: background 0.3s ease;
`;

const ContentPanel = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  padding: 20px;
  flex: 1;

  ${media.lg} {
    padding: 32px;
    display: flex;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    width: ${({ $isOpen }) => ($isOpen ? 'auto' : '0')};
    overflow: hidden;
    transition: opacity 0.5s ease 0.2s;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
`;

const ContentTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;

  ${media.lg} {
    font-size: 28px;
  }
`;

const ContentDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #666666;
  margin: 0 0 24px;
`;

const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
  text-decoration: none;
  transition: gap 0.3s ease;
  margin-bottom: 24px;

  &:hover {
    gap: 12px;
    color: #ff8c42;
  }

  &:visited {
    color: #ff8c42;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: #f0f0f0;

  ${media.lg} {
    height: 280px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: rgba(0, 0, 0, 0.3);
  border: 2px dashed rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState<string>('1');

  return (
    <Section>
      <Container>
        <Header>
          <HeaderLeft>
            <Label>
              <LabelLine />
              <LabelText>Our Services</LabelText>
            </Label>
            <Title>We Provide Superior Service with Guaranteed Quality.</Title>
          </HeaderLeft>
          <AnimatedButton href="/services" variant="orange">View All Services</AnimatedButton>
        </Header>

        <AccordionWrapper>
          {servicesData.map((service) => (
            <AccordionItem
              key={service.id}
              $isOpen={openId === service.id}
              onClick={() => setOpenId(service.id)}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) {
                  setOpenId(service.id);
                }
              }}
            >
              {openId !== service.id && (
                <TabSection $isOpen={openId === service.id}>
                  <ArrowButton $isOpen={openId === service.id}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </ArrowButton>
                  <VerticalTitle $isOpen={openId === service.id}>
                    {service.title}
                  </VerticalTitle>
                  <IconWrapper $isOpen={openId === service.id}>
                    {service.icon}
                  </IconWrapper>
                </TabSection>
              )}

              <ContentPanel $isOpen={openId === service.id}>
                <ContentHeader>
                  <ContentTitle>{service.title}</ContentTitle>
                </ContentHeader>
                <ContentDescription>{service.shortDescription}</ContentDescription>
                <LearnMoreLink href={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </LearnMoreLink>
                <ImageWrapper>
                  <ImagePlaceholder>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Add Image</span>
                  </ImagePlaceholder>
                </ImageWrapper>
              </ContentPanel>
            </AccordionItem>
          ))}
        </AccordionWrapper>
      </Container>
    </Section>
  );
}
