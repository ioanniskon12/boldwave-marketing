'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { CaseStudy, caseStudies } from '@/data';

interface CaseStudyPageContentProps {
  caseStudy: CaseStudy;
}

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #111111 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 15s ease infinite;
  overflow: hidden;

  ${media.lg} {
    min-height: 60vh;
    padding: 80px 0;
  }
`;

const HeroOrb = styled.div<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.25), transparent 70%);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  animation: ${pulse} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  filter: blur(60px);
  pointer-events: none;
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const Breadcrumb = styled.nav`
  position: relative;
  z-index: 1;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbLink = styled(Link)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.3);
`;

const BreadcrumbCurrent = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
`;

const IndustryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 140, 66, 0.15);
  border: 1px solid rgba(255, 140, 66, 0.3);
  border-radius: 100px;
  margin-bottom: 24px;
`;

const BadgeText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 52px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 40px;

  ${media.lg} {
    font-size: 20px;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-bottom: 32px;
`;

const ClientLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
`;

const ClientDetails = styled.div``;

const ClientName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const ClientIndustry = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const ServiceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ServiceTag = styled.span`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
`;

// Results Section
const ResultsSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;
  margin-top: -60px;
  position: relative;
  z-index: 2;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ResultCard = styled.div<{ $delay: number }>`
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  animation: ${countUp} 0.6s ease forwards;
  animation-delay: ${({ $delay }) => $delay * 0.1}s;
  opacity: 0;
`;

const ResultValue = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: #ff8c42;
  margin-bottom: 8px;
  line-height: 1;

  ${media.lg} {
    font-size: 48px;
  }
`;

const ResultMetric = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const ResultDescription = styled.div`
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
`;

// Challenge & Solution Section
const StorySection = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  gap: 40px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;

const StoryCard = styled.div`
  padding: 40px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

const StoryIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

const StoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 28px;
  }
`;

const StoryText = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.8;
`;

// Image Section
const ImageSection = styled.section`
  padding: 0 0 80px;
  background: #faf8f5;

  ${media.lg} {
    padding: 0 0 100px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: rgba(0, 0, 0, 0.3);
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
`;

const PlaceholderText = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

// Testimonial Section
const TestimonialSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #111111 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const QuoteIcon = styled.div`
  font-size: 64px;
  color: #ff8c42;
  margin-bottom: 24px;
  line-height: 1;
`;

const QuoteText = styled.blockquote`
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.6;
  margin: 0 0 32px;
  font-style: italic;

  ${media.lg} {
    font-size: 28px;
  }
`;

const QuoteAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

// Other Case Studies Section
const OtherCasesSection = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const LabelDot = styled.span`
  width: 8px;
  height: 8px;
  background: #ff8c42;
  border-radius: 50%;
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff8c42;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 48px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 40px;
  }
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
  border: 1px solid rgba(0, 0, 0, 0.06);
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CaseImage = styled.div`
  aspect-ratio: 16/10;
  background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
  position: relative;
  overflow: hidden;
`;

const CaseImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: rgba(0, 0, 0, 0.1);
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

// CTA Section
const CTASection = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const CTACard = styled.div`
  padding: 60px 40px;
  background: linear-gradient(135deg, #111111, #1a1a2e);
  border-radius: 32px;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 80px 60px;
  }
`;

const CTAOrb = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.2), transparent 70%);
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(60px);
  pointer-events: none;
`;

const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;

  ${media.lg} {
    font-size: 44px;
  }
`;

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export function CaseStudyPageContent({ caseStudy }: CaseStudyPageContentProps) {
  const otherCaseStudies = caseStudies.filter(c => c.id !== caseStudy.id).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOrb $size={600} $top="-20%" $left="-10%" $delay={0} />
        <HeroOrb $size={400} $top="60%" $left="80%" $delay={1} />
        <HeroGrid />

        <Container>
          <Breadcrumb>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbLink href="/portfolio">Portfolio</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbCurrent>{caseStudy.client}</BreadcrumbCurrent>
          </Breadcrumb>

          <HeroContent>
            <IndustryBadge>
              <BadgeText>{caseStudy.industry}</BadgeText>
            </IndustryBadge>

            <HeroTitle>{caseStudy.title}</HeroTitle>

            <HeroDescription>{caseStudy.description}</HeroDescription>

            <ClientInfo>
              <ClientLogo>{caseStudy.client.charAt(0)}</ClientLogo>
              <ClientDetails>
                <ClientName>{caseStudy.client}</ClientName>
                <ClientIndustry>{caseStudy.industry}</ClientIndustry>
              </ClientDetails>
            </ClientInfo>

            <ServiceTags>
              {caseStudy.services.map((service, index) => (
                <ServiceTag key={index}>{service}</ServiceTag>
              ))}
            </ServiceTags>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Results Section */}
      <ResultsSection>
        <Container>
          <ResultsGrid>
            {caseStudy.results.map((result, index) => (
              <ResultCard key={index} $delay={index}>
                <ResultValue>{result.value}</ResultValue>
                <ResultMetric>{result.metric}</ResultMetric>
                <ResultDescription>{result.description}</ResultDescription>
              </ResultCard>
            ))}
          </ResultsGrid>
        </Container>
      </ResultsSection>

      {/* Challenge & Solution Section */}
      <StorySection>
        <Container>
          <StoryGrid>
            <StoryCard>
              <StoryIcon $color="rgba(255, 140, 66, 0.15)">
                <span role="img" aria-label="challenge">🎯</span>
              </StoryIcon>
              <StoryTitle>The Challenge</StoryTitle>
              <StoryText>{caseStudy.challenge}</StoryText>
            </StoryCard>

            <StoryCard>
              <StoryIcon $color="rgba(34, 197, 94, 0.15)">
                <span role="img" aria-label="solution">💡</span>
              </StoryIcon>
              <StoryTitle>Our Solution</StoryTitle>
              <StoryText>{caseStudy.solution}</StoryText>
            </StoryCard>
          </StoryGrid>
        </Container>
      </StorySection>

      {/* Project Image */}
      <ImageSection>
        <Container>
          <ImageWrapper>
            {caseStudy.image ? (
              <Image
                src={caseStudy.image}
                alt={`${caseStudy.client} case study`}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <PlaceholderImage>
                <PlaceholderIcon>📊</PlaceholderIcon>
                <PlaceholderText>Project showcase image</PlaceholderText>
              </PlaceholderImage>
            )}
          </ImageWrapper>
        </Container>
      </ImageSection>

      {/* Testimonial Section */}
      {caseStudy.testimonial && (
        <TestimonialSection>
          <HeroOrb $size={500} $top="50%" $left="-10%" $delay={0} />
          <Container>
            <TestimonialContent>
              <QuoteIcon>&ldquo;</QuoteIcon>
              <QuoteText>{caseStudy.testimonial.quote}</QuoteText>
              <QuoteAuthor>
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
          <SectionLabel>
            <LabelDot />
            <LabelText>More Success Stories</LabelText>
          </SectionLabel>

          <SectionTitle>Explore other case studies</SectionTitle>

          <OtherCasesGrid>
            {otherCaseStudies.map((otherCase) => (
              <CaseCard key={otherCase.id} href={`/portfolio/${otherCase.slug}`}>
                <CaseImage>
                  {otherCase.image ? (
                    <Image
                      src={otherCase.image}
                      alt={otherCase.client}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <CaseImagePlaceholder>📈</CaseImagePlaceholder>
                  )}
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

      {/* CTA Section */}
      <CTASection>
        <Container>
          <CTACard>
            <CTAOrb />
            <CTATitle>Ready to achieve similar results?</CTATitle>
            <CTAText>
              Book a free strategy call and discover how we can help you grow your business.
            </CTAText>
            <AnimatedButton href="/contact" variant="orange">
              Book a Free Strategy Call
            </AnimatedButton>
          </CTACard>
        </Container>
      </CTASection>
    </>
  );
}
