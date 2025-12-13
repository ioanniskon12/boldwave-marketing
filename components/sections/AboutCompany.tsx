'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Section = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 48px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

const LeftColumn = styled.div`
  position: relative;
`;

const YearBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  ${media.lg} {
    left: -20px;
  }
`;

const YearLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #666666;
  margin-bottom: 4px;
`;

const YearValue = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: #111111;
  line-height: 1;

  ${media.lg} {
    font-size: 64px;
  }
`;

const ImageContainer = styled.div`
  padding-left: 80px;
  padding-top: 60px;

  ${media.lg} {
    padding-left: 100px;
    padding-top: 40px;
  }
`;

const MainImage = styled.div`
  width: 280px;
  height: 350px;
  background: linear-gradient(180deg, #d4ccc4 0%, #a89888 100%);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.lg} {
    width: 340px;
    height: 420px;
  }
`;

const PlaceholderIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
`;

const MainImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DecorativeFrame = styled.div`
  position: absolute;
  bottom: -12px;
  left: -12px;
  width: 100%;
  height: 70%;
  border: 3px solid #ff8c42;
  border-radius: 16px;
  border-top: none;
  border-right: none;
  z-index: -1;
`;

const RightColumn = styled.div``;

const Label = styled.div`
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
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c42;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #111111;
  line-height: 1.2;
  margin-bottom: 20px;

  ${media.lg} {
    font-size: 42px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 32px;

  ${media.lg} {
    font-size: 16px;
  }
`;

const ContentRow = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;

  ${media.lg} {
    gap: 48px;
  }
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;

  ${media.lg} {
    width: 110px;
    height: 110px;
  }
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #111111;
  line-height: 1;

  ${media.lg} {
    font-size: 32px;
  }
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #888888;
  text-align: center;
  margin-top: 6px;
  line-height: 1.3;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8c42;
  border-radius: 4px;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333333;

  ${media.lg} {
    font-size: 15px;
  }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;


const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TrustLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #111111;
`;

const TrustStars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.div`
  width: 20px;
  height: 20px;
  background: #00b67a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const features = [
  'Business Continuity Planning',
  'Award Winning Company',
  'Quality Always Matters',
  'Our Employee Growth',
];

export default function AboutCompany() {
  return (
    <Section>
      <Container>
        <ContentGrid>
          <LeftColumn>
            <YearBadge>
              <YearLabel>Started In</YearLabel>
              <YearValue>2020</YearValue>
            </YearBadge>

            <ImageContainer>
              <MainImageWrapper>
                <MainImage>
                  <PlaceholderIcon>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                  </PlaceholderIcon>
                </MainImage>
                <DecorativeFrame />
              </MainImageWrapper>
            </ImageContainer>
          </LeftColumn>

          <RightColumn>
            <Label>
              <LabelLine />
              <LabelText>About Our Company</LabelText>
            </Label>

            <Title>We are the Best Marketing Agency in Business.</Title>

            <Description>
              We deliver innovative strategies and proven results to help
              businesses thrive and lead in competitive markets.
            </Description>

            <ContentRow>
              <StatBox>
                <StatValue>5+</StatValue>
                <StatLabel>Years Of Working<br />Experience</StatLabel>
              </StatBox>

              <FeatureList>
                {features.map((feature) => (
                  <FeatureItem key={feature}>
                    <FeatureIcon>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6.5L4.5 9L10 3"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </FeatureIcon>
                    <FeatureText>{feature}</FeatureText>
                  </FeatureItem>
                ))}
              </FeatureList>
            </ContentRow>

            <BottomRow>
              <AnimatedButton href="/contact" variant="orange">Free Consultation</AnimatedButton>

              <TrustBadge>
                <TrustLogo>
                  <span>★</span> Trustpilot
                </TrustLogo>
                <TrustStars>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i}>★</Star>
                  ))}
                </TrustStars>
              </TrustBadge>
            </BottomRow>
          </RightColumn>
        </ContentGrid>
      </Container>
    </Section>
  );
}
