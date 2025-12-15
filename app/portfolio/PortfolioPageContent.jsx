'use client';

import { useState, useRef, useEffect } from 'react';
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

// Filter Section
const FilterSection = styled.section`
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
`;

const FilterScrollWrapper = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 60px;
    background: linear-gradient(to left, transparent, #ffffff);
    pointer-events: none;
    z-index: 10;
    opacity: ${({ $showLeftShadow }) => ($showLeftShadow ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60px;
    background: linear-gradient(to right, transparent, #ffffff);
    pointer-events: none;
    z-index: 10;
    opacity: ${({ $showRightShadow }) => ($showRightShadow ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  border-bottom: 2px solid #e0e0e0;
  padding: 0 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lg} {
    justify-content: center;
    gap: 24px;
  }
`;

const FilterButton = styled.button`
  padding: 16px 8px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#666666')};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #ff8c42;
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transition: transform 0.3s ease;
    border-radius: 3px 3px 0 0;
  }

  &:hover {
    color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#1a1a1a')};
  }
`;

const FilterCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#e0e0e0')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#666666')};
  border-radius: 12px;
  transition: all 0.3s ease;
`;

// Portfolio Grid Section
const PortfolioSection = styled.section`
  padding: 80px 0 120px;
  background: linear-gradient(180deg, #faf8f5 0%, #ffffff 100%);
`;

// Bento Grid Layout
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(280px, auto);
    gap: 24px;
  }
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease;
`;

const ViewButton = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 100px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;

  svg {
    transition: transform 0.3s ease;
  }
`;

const CaseStudyCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

  ${media.lg} {
    grid-column: span 4;

    ${({ $isFeatured }) =>
      $isFeatured &&
      `
      grid-column: span 8;
      grid-row: span 2;
    `}
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);

    ${CardImage} {
      transform: scale(1.1);
      filter: brightness(0.9);
    }

    ${ViewButton} {
      opacity: 1;
      transform: translateY(0);

      svg {
        transform: translateX(4px);
      }
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $isFeatured }) => ($isFeatured ? '300px' : '200px')};
  overflow: hidden;

  ${media.lg} {
    height: ${({ $isFeatured }) => ($isFeatured ? '100%' : '220px')};
    min-height: ${({ $isFeatured }) => ($isFeatured ? '100%' : 'auto')};
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0, 0, 0, 0.6) 100%);
  z-index: 1;
`;

const IndustryBadge = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 100px;
  z-index: 2;
`;

const ServiceTags = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;

  ${CaseStudyCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceTag = styled.span`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const CardContent = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${({ $isFeatured }) =>
    $isFeatured &&
    `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 40px;
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.95));
  `}
`;

const ClientName = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: ${({ $isFeatured }) => ($isFeatured ? '26px' : '18px')};
  font-weight: 700;
  color: ${({ $isFeatured }) => ($isFeatured ? '#ffffff' : '#1a1a1a')};
  line-height: 1.35;
  margin: 0 0 16px 0;
  transition: color 0.3s ease;

  ${media.lg} {
    font-size: ${({ $isFeatured }) => ($isFeatured ? '32px' : '20px')};
  }

  ${CaseStudyCard}:hover & {
    color: ${({ $isFeatured }) => ($isFeatured ? '#ffffff' : '#ff8c42')};
  }
`;

const CardDescription = styled.p`
  font-size: 15px;
  color: ${({ $isFeatured }) => ($isFeatured ? 'rgba(255,255,255,0.8)' : '#666666')};
  line-height: 1.7;
  margin: 0 0 24px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ResultsPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count || 2}, 1fr);
  gap: 16px;
  padding-top: 20px;
  margin-top: auto;
  border-top: 1px solid ${({ $isFeatured }) => ($isFeatured ? 'rgba(255,255,255,0.15)' : '#eee')};
`;

const ResultItem = styled.div`
  text-align: left;
`;

const ResultValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${({ $isFeatured }) => ($isFeatured ? '#ff8c42' : '#ff8c42')};
  line-height: 1;
  margin-bottom: 6px;

  ${media.lg} {
    font-size: ${({ $isFeatured }) => ($isFeatured ? '28px' : '24px')};
  }
`;

const ResultLabel = styled.div`
  font-size: 11px;
  color: ${({ $isFeatured }) => ($isFeatured ? 'rgba(255,255,255,0.6)' : '#888')};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
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
  const [activeFilter, setActiveFilter] = useState(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const industries = getAllIndustries();
  const filterWrapperRef = useRef(null);

  const filteredStudies = activeFilter
    ? caseStudies.filter((study) => study.industry === activeFilter)
    : caseStudies;

  // Get count for each industry
  const getIndustryCount = (industry) => {
    return caseStudies.filter((study) => study.industry === industry).length;
  };

  // Handle scroll to update shadow indicators
  const handleScroll = () => {
    if (filterWrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterWrapperRef.current;
      setShowLeftShadow(scrollLeft > 5);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Check scroll position on mount and resize
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  // Handle filter click with scroll to show the clicked tab
  const handleFilterClick = (filter, element) => {
    setActiveFilter(filter);
    element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Our Work Speaks for Itself"
        description="Real results for real brands. Explore our case studies and see how we've helped businesses achieve remarkable growth."
        bigText="PORTFOLIO"
      />

      {/* Filter Section */}
      <FilterSection>
        <Container>
          <FilterScrollWrapper $showLeftShadow={showLeftShadow} $showRightShadow={showRightShadow}>
            <FilterWrapper ref={filterWrapperRef} onScroll={handleScroll}>
              <FilterButton
                $isActive={activeFilter === null}
                onClick={(e) => handleFilterClick(null, e.currentTarget)}
              >
                All Projects
                <FilterCount $isActive={activeFilter === null}>
                  {caseStudies.length}
                </FilterCount>
              </FilterButton>
              {industries.map((industry) => (
                <FilterButton
                  key={industry}
                  $isActive={activeFilter === industry}
                  onClick={(e) => handleFilterClick(industry, e.currentTarget)}
                >
                  {industry}
                  <FilterCount $isActive={activeFilter === industry}>
                    {getIndustryCount(industry)}
                  </FilterCount>
                </FilterButton>
              ))}
            </FilterWrapper>
          </FilterScrollWrapper>
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
                const resultsCount = isFeatured ? 3 : 2;
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
                      <ImageOverlay />
                      <IndustryBadge>{study.industry}</IndustryBadge>
                      {study.services && (
                        <ServiceTags>
                          {study.services.slice(0, 3).map((service, idx) => (
                            <ServiceTag key={idx}>{service}</ServiceTag>
                          ))}
                        </ServiceTags>
                      )}
                      {isFeatured && (
                        <ViewButton>
                          View Case Study
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </ViewButton>
                      )}
                    </ImageWrapper>
                    <CardContent $isFeatured={isFeatured}>
                      <ClientName $isFeatured={isFeatured}>{study.client}</ClientName>
                      <CardTitle $isFeatured={isFeatured}>{study.title}</CardTitle>
                      {isFeatured && (
                        <CardDescription $isFeatured={isFeatured}>
                          {study.description}
                        </CardDescription>
                      )}
                      <ResultsPreview $isFeatured={isFeatured} $count={resultsCount}>
                        {study.results.slice(0, resultsCount).map((result, idx) => (
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
