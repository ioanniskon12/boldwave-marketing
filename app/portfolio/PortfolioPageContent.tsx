'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import { caseStudies, getAllIndustries } from '@/data/caseStudies';
import { media } from '@/styles/theme';

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

// Stats Bar under Hero
const StatsBar = styled.section`
  background: #1a1a1a;
  padding: 40px 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #ff8c42;
  line-height: 1;
  margin-bottom: 8px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// Filter Section
const FilterSection = styled.section`
  padding: 60px 0 40px;
  background: #faf8f5;
  position: sticky;
  top: 80px;
  z-index: 50;

  ${media.lg} {
    top: 100px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 50px;
  border: 2px solid ${({ $isActive }) => ($isActive ? '#ff8c42' : '#e0e0e0')};
  background-color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#ffffff')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#1a1a1a')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff8c42;
    background: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#fff5ee')};
  }
`;

const FilterCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

// Portfolio Grid Section
const PortfolioSection = styled.section`
  padding: 60px 0 120px;
  background: #faf8f5;
`;

// Bento Grid Layout
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(300px, auto);
  }
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CaseStudyCard = styled(Link)<{ $isFeatured?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $isFeatured }) =>
    $isFeatured &&
    `
    ${media.lg} {
      grid-column: span 2;
      grid-row: span 2;
    }
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 4px;
    background: linear-gradient(90deg, #ff8c42, #ffb380);
    border-radius: 0 0 4px 4px;
    transform: scaleX(0);
    transition: transform 0.4s ease;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12);

    &::before {
      transform: scaleX(1);
    }
  }

  &:hover ${CardImage} {
    transform: scale(1.08);
  }
`;

const ImageWrapper = styled.div<{ $isFeatured?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $isFeatured }) => ($isFeatured ? '400px' : '220px')};
  overflow: hidden;

  ${media.lg} {
    height: ${({ $isFeatured }) => ($isFeatured ? '100%' : '240px')};
    min-height: ${({ $isFeatured }) => ($isFeatured ? '400px' : 'auto')};
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 1;
`;

const IndustryBadge = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #1a1a1a;
  font-size: 12px;
  font-weight: 600;
  border-radius: 30px;
  z-index: 2;
`;

const CardContent = styled.div<{ $isFeatured?: boolean }>`
  padding: 28px;

  ${({ $isFeatured }) =>
    $isFeatured &&
    `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 40px;
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.9));
  `}
`;

const ClientName = styled.div<{ $isFeatured?: boolean }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ $isFeatured }) => ($isFeatured ? '#ff8c42' : '#ff8c42')};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3<{ $isFeatured?: boolean }>`
  font-size: ${({ $isFeatured }) => ($isFeatured ? '28px' : '20px')};
  font-weight: 700;
  color: ${({ $isFeatured }) => ($isFeatured ? '#ffffff' : '#1a1a1a')};
  line-height: 1.3;
  margin: 0 0 16px 0;
  transition: color 0.3s ease;

  ${media.lg} {
    font-size: ${({ $isFeatured }) => ($isFeatured ? '32px' : '22px')};
  }

  ${CaseStudyCard}:hover & {
    color: ${({ $isFeatured }) => ($isFeatured ? '#ffffff' : '#ff8c42')};
  }
`;

const CardDescription = styled.p<{ $isFeatured?: boolean }>`
  font-size: 15px;
  color: ${({ $isFeatured }) => ($isFeatured ? 'rgba(255,255,255,0.8)' : '#666666')};
  line-height: 1.6;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ResultsPreview = styled.div<{ $isFeatured?: boolean }>`
  display: flex;
  gap: 24px;
  padding-top: 20px;
  border-top: 1px solid ${({ $isFeatured }) => ($isFeatured ? 'rgba(255,255,255,0.2)' : '#f0f0f0')};
`;

const ResultItem = styled.div`
  text-align: left;
`;

const ResultValue = styled.div<{ $isFeatured?: boolean }>`
  font-size: 24px;
  font-weight: 800;
  color: ${({ $isFeatured }) => ($isFeatured ? '#ff8c42' : '#1a1a1a')};
  line-height: 1;

  ${media.lg} {
    font-size: 28px;
  }
`;

const ResultLabel = styled.div<{ $isFeatured?: boolean }>`
  font-size: 12px;
  color: ${({ $isFeatured }) => ($isFeatured ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)')};
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// Section Header
const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;

  ${media.lg} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 400px;
  line-height: 1.6;
`;

// View All Button
const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #ff8c42;
  text-decoration: none;
  transition: gap 0.3s ease;

  &:hover {
    gap: 12px;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

// CTA Section
const CTASection = styled.section`
  padding: 120px 0;
  background: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 160px 0;
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
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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

// Empty State
const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #ffffff;
  border-radius: 24px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #666666;
`;

export function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const industries = getAllIndustries();

  const filteredStudies = activeFilter
    ? caseStudies.filter((study) => study.industry === activeFilter)
    : caseStudies;

  // Get count for each industry
  const getIndustryCount = (industry: string) => {
    return caseStudies.filter((study) => study.industry === industry).length;
  };

  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Our Work Speaks for Itself"
        description="Real results for real brands. Explore our case studies and see how we've helped businesses achieve remarkable growth."
        bigText="PORTFOLIO"
      />

      {/* Stats Bar */}
      <StatsBar>
        <Container>
          <StatsGrid>
            <StatItem>
              <StatValue>50+</StatValue>
              <StatLabel>Projects Delivered</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>$12M+</StatValue>
              <StatLabel>Revenue Generated</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>4.2x</StatValue>
              <StatLabel>Average ROAS</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>95%</StatValue>
              <StatLabel>Client Retention</StatLabel>
            </StatItem>
          </StatsGrid>
        </Container>
      </StatsBar>

      {/* Filter Section */}
      <FilterSection>
        <Container>
          <FilterWrapper>
            <FilterButton
              $isActive={activeFilter === null}
              onClick={() => setActiveFilter(null)}
            >
              All Projects
              <FilterCount style={{ background: activeFilter === null ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}>
                {caseStudies.length}
              </FilterCount>
            </FilterButton>
            {industries.map((industry) => (
              <FilterButton
                key={industry}
                $isActive={activeFilter === industry}
                onClick={() => setActiveFilter(industry)}
              >
                {industry}
                <FilterCount style={{ background: activeFilter === industry ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}>
                  {getIndustryCount(industry)}
                </FilterCount>
              </FilterButton>
            ))}
          </FilterWrapper>
        </Container>
      </FilterSection>

      {/* Portfolio Grid */}
      <PortfolioSection>
        <Container>
          <SectionHeader>
            <div>
              <SectionTag>
                <TagLine />
                <TagText>Case Studies</TagText>
              </SectionTag>
              <SectionTitle>Our Success Stories</SectionTitle>
            </div>
            <SectionSubtitle>
              Every project tells a story of growth, innovation, and measurable results.
            </SectionSubtitle>
          </SectionHeader>

          {filteredStudies.length > 0 ? (
            <BentoGrid>
              {filteredStudies.map((study, index) => {
                const isFeatured = study.featured && index === 0;
                return (
                  <CaseStudyCard
                    key={study.id}
                    href={`/portfolio/${study.slug}`}
                    $isFeatured={isFeatured}
                  >
                    <ImageWrapper $isFeatured={isFeatured}>
                      <CardImage
                        src={study.image}
                        alt={study.title}
                        width={800}
                        height={600}
                        unoptimized
                      />
                      {isFeatured && <ImageOverlay />}
                      <IndustryBadge>{study.industry}</IndustryBadge>
                    </ImageWrapper>
                    <CardContent $isFeatured={isFeatured}>
                      <ClientName $isFeatured={isFeatured}>{study.client}</ClientName>
                      <CardTitle $isFeatured={isFeatured}>{study.title}</CardTitle>
                      {isFeatured && (
                        <CardDescription $isFeatured={isFeatured}>
                          {study.description}
                        </CardDescription>
                      )}
                      <ResultsPreview $isFeatured={isFeatured}>
                        {study.results.slice(0, isFeatured ? 3 : 2).map((result, idx) => (
                          <ResultItem key={idx}>
                            <ResultValue $isFeatured={isFeatured}>{result.value}</ResultValue>
                            <ResultLabel $isFeatured={isFeatured}>{result.metric}</ResultLabel>
                          </ResultItem>
                        ))}
                      </ResultsPreview>
                    </CardContent>
                  </CaseStudyCard>
                );
              })}
            </BentoGrid>
          ) : (
            <EmptyState>
              <EmptyIcon>🔍</EmptyIcon>
              <EmptyTitle>No projects found</EmptyTitle>
              <EmptyText>Try selecting a different industry filter</EmptyText>
            </EmptyState>
          )}
        </Container>
      </PortfolioSection>

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Ready to be our next <CTAHighlight>success story?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Let&apos;s discuss how we can help your brand achieve extraordinary results.
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
