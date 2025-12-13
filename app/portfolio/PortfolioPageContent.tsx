'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { PageHero } from '@/components/sections';
import { caseStudies, getAllIndustries } from '@/data/caseStudies';
import { media } from '@/styles/theme';

const FilterSection = styled.section`
  padding: 40px 0;
  background: #ffffff;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  border: 1px solid ${({ $isActive }) => ($isActive ? '#ff8c42' : '#e0e0e0')};
  background-color: ${({ $isActive }) => ($isActive ? '#ff8c42' : '#ffffff')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#666')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff8c42;
    color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#ff8c42')};
  }
`;

const PortfolioSection = styled.section`
  padding: 60px 0 100px;
  background: #ffffff;

  ${media.lg} {
    padding: 80px 0 120px;
  }
`;

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CaseStudyImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CaseStudyCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  &:hover ${CaseStudyImage} {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const IndustryBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.95);
  color: #0a0a12;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 24px;
`;

const ClientName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0a0a12;
  line-height: 1.4;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${CaseStudyCard}:hover & {
    color: #ff8c42;
  }
`;

const ResultsPreview = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const ResultItem = styled.div`
  text-align: left;
`;

const ResultValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #0a0a12;
  line-height: 1;
`;

const ResultLabel = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
`;

const FeaturedSection = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const SectionLabel = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0a0a12;
  margin: 0;

  ${media.lg} {
    font-size: 40px;
  }
`;

const FeaturedCard = styled(Link)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const FeaturedImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  ${media.lg} {
    height: 400px;
  }
`;

const FeaturedImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeaturedContent = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.lg} {
    padding: 48px;
  }
`;

const FeaturedIndustry = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 140, 66, 0.1);
  color: #ff8c42;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 16px;
  width: fit-content;
`;

const FeaturedTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0a0a12;
  line-height: 1.3;
  margin: 0 0 16px 0;

  ${media.lg} {
    font-size: 28px;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.7;
  margin: 0 0 24px 0;
`;

const FeaturedResults = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeaturedResultItem = styled.div`
  text-align: left;
`;

const FeaturedResultValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff8c42;
  line-height: 1;

  ${media.lg} {
    font-size: 28px;
  }
`;

const FeaturedResultLabel = styled.div`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 6px;
`;

const ViewCaseStudy = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #ff8c42;
  margin-top: 24px;

  svg {
    transition: transform 0.3s ease;
  }

  ${FeaturedCard}:hover & svg {
    transform: translateX(4px);
  }
`;

export function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const industries = getAllIndustries();

  const filteredStudies = activeFilter
    ? caseStudies.filter((study) => study.industry === activeFilter)
    : caseStudies;

  const featuredStudies = caseStudies.filter((study) => study.featured);

  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Our Work Speaks for Itself"
        description="Explore our case studies and see how we've helped brands achieve remarkable growth through strategic marketing."
        bigText="PORTFOLIO"
      />

      {/* Featured Case Studies */}
      <FeaturedSection>
        <Container>
          <SectionHeader>
            <SectionLabel>
              <LabelLine />
              <LabelText>Featured Work</LabelText>
            </SectionLabel>
            <SectionTitle>Success Stories</SectionTitle>
          </SectionHeader>

          {featuredStudies.slice(0, 2).map((study) => (
            <FeaturedCard key={study.id} href={`/portfolio/${study.slug}`}>
              <FeaturedImageWrapper>
                <FeaturedImage
                  src={study.image}
                  alt={study.title}
                  width={800}
                  height={600}
                  unoptimized
                />
              </FeaturedImageWrapper>
              <FeaturedContent>
                <FeaturedIndustry>{study.industry}</FeaturedIndustry>
                <FeaturedTitle>{study.title}</FeaturedTitle>
                <FeaturedDescription>{study.description}</FeaturedDescription>
                <FeaturedResults>
                  {study.results.slice(0, 4).map((result, index) => (
                    <FeaturedResultItem key={index}>
                      <FeaturedResultValue>{result.value}</FeaturedResultValue>
                      <FeaturedResultLabel>{result.metric}</FeaturedResultLabel>
                    </FeaturedResultItem>
                  ))}
                </FeaturedResults>
                <ViewCaseStudy>
                  View Case Study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </ViewCaseStudy>
              </FeaturedContent>
            </FeaturedCard>
          ))}
        </Container>
      </FeaturedSection>

      {/* All Case Studies */}
      <FilterSection>
        <Container>
          <FilterWrapper>
            <FilterButton
              $isActive={activeFilter === null}
              onClick={() => setActiveFilter(null)}
            >
              All Projects
            </FilterButton>
            {industries.map((industry) => (
              <FilterButton
                key={industry}
                $isActive={activeFilter === industry}
                onClick={() => setActiveFilter(industry)}
              >
                {industry}
              </FilterButton>
            ))}
          </FilterWrapper>
        </Container>
      </FilterSection>

      <PortfolioSection>
        <Container>
          <CaseStudiesGrid>
            {filteredStudies.map((study) => (
              <CaseStudyCard key={study.id} href={`/portfolio/${study.slug}`}>
                <ImageWrapper>
                  <CaseStudyImage
                    src={study.image}
                    alt={study.title}
                    width={600}
                    height={400}
                    unoptimized
                  />
                  <IndustryBadge>{study.industry}</IndustryBadge>
                </ImageWrapper>
                <CardContent>
                  <ClientName>{study.client}</ClientName>
                  <CardTitle>{study.title}</CardTitle>
                  <ResultsPreview>
                    {study.results.slice(0, 2).map((result, index) => (
                      <ResultItem key={index}>
                        <ResultValue>{result.value}</ResultValue>
                        <ResultLabel>{result.metric}</ResultLabel>
                      </ResultItem>
                    ))}
                  </ResultsPreview>
                </CardContent>
              </CaseStudyCard>
            ))}
          </CaseStudiesGrid>
        </Container>
      </PortfolioSection>
    </>
  );
}
