'use client';

/**
 * WORK PROCESS DEMO PAGE
 *
 * Three professional design options for the Work Process section.
 * Choose the one that best fits your brand.
 *
 * IMPORTANT: Icon Usage Guidelines
 * ================================
 * Always use professional SVG icon components directly from '@/components/icons'.
 */

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import {
  SearchIcon,
  ChartIcon,
  RocketIcon,
  TargetIcon,
  LightbulbIcon,
  CheckIcon,
  SparkleIcon,
  GrowthIcon
} from '@/components/icons';

// ============================================
// ANIMATIONS
// ============================================
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
`;

// ============================================
// PAGE LAYOUT
// ============================================
const PageWrapper = styled.div`
  background: #faf8f5;
`;

const PageHeader = styled.div`
  padding: 120px 0 60px;
  text-align: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1f1f 100%);
`;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 64px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const DesignLabel = styled.div`
  text-align: center;
  padding: 40px 0 20px;
`;

const LabelTag = styled.span`
  display: inline-block;
  padding: 8px 20px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 100px;
`;

const LabelTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 16px;
`;

// ============================================
// DESIGN 1: HORIZONTAL TIMELINE
// ============================================
const Section1 = styled.section`
  padding: 80px 0 100px;
  background: #ffffff;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
`;

const TimelineWrapper1 = styled.div`
  position: relative;
  padding: 40px 0;
`;

const TimelineLine1 = styled.div`
  display: none;

  ${media.lg} {
    display: block;
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, #ff8c42, #ff6b35);
    transform: translateY(-50%);
    z-index: 0;
  }
`;

const TimelineGrid1 = styled.div`
  display: grid;
  gap: 32px;
  position: relative;
  z-index: 1;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
`;

const TimelineCard1 = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }
`;

const StepNumber1 = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(255, 140, 66, 0.3);
`;

const StepIcon1 = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
`;

const StepTitle1 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const StepDesc1 = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
`;

// ============================================
// DESIGN 2: VERTICAL ALTERNATING
// ============================================
const Section2 = styled.section`
  padding: 80px 0 100px;
  background: #faf8f5;
`;

const TimelineWrapper2 = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const TimelineLine2 = styled.div`
  display: none;

  ${media.lg} {
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #ff8c42, #ff6b35, #ff8c42);
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const TimelineItem2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;

  ${media.lg} {
    flex-direction: ${({ $align }) => $align === 'left' ? 'row' : 'row-reverse'};
    align-items: center;
    margin-bottom: 80px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineContent2 = styled.div`
  flex: 1;

  ${media.lg} {
    padding: ${({ $align }) => $align === 'left' ? '0 60px 0 0' : '0 0 0 60px'};
    text-align: ${({ $align }) => $align === 'left' ? 'right' : 'left'};
  }
`;

const TimelineNode2 = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 10px 30px rgba(255, 140, 66, 0.3);
  margin: 0 0 20px 0;

  ${media.lg} {
    margin: 0;
  }
`;

const TimelineEmpty2 = styled.div`
  flex: 1;
  display: none;

  ${media.lg} {
    display: block;
  }
`;

const StepLabel2 = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff8c42;
  margin-bottom: 8px;
`;

const StepTitle2 = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;

  ${media.lg} {
    font-size: 28px;
  }
`;

const StepDesc2 = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.7;
`;

// ============================================
// DESIGN 3: MODERN CARDS WITH CONNECTING ARROWS
// ============================================
const Section3 = styled.section`
  padding: 80px 0 100px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a12 100%);
`;

const SectionTitle3 = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 48px;
  }
`;

const SectionSubtitle3 = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const ProcessGrid3 = styled.div`
  display: grid;
  gap: 24px;
  margin-top: 64px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
`;

const ProcessCard3 = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 28px;
  text-align: center;
  transition: all 0.4s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff8c42, #ff6b35);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 140, 66, 0.3);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProcessNumber3 = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 64px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.08);
  line-height: 1;
`;

const ProcessIcon3 = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(255, 107, 53, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8c42;
  position: relative;
  z-index: 1;
`;

const ProcessTitle3 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const ProcessDesc3 = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ArrowConnector = styled.div`
  display: none;

  ${media.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    color: #ff8c42;
  }
`;

// ============================================
// PROCESS DATA
// ============================================
const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your business, goals, audience, and competitive landscape.',
    icon: SearchIcon,
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Data-driven marketing plan tailored to your specific objectives.',
    icon: LightbulbIcon,
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Launch campaigns with continuous optimization and monitoring.',
    icon: RocketIcon,
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Amplify results and expand successful initiatives for growth.',
    icon: GrowthIcon,
  },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function WorkProcessDemoPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <Container>
          <PageTitle>Work Process Designs</PageTitle>
          <PageSubtitle>
            Three professional design options for showcasing your work process.
          </PageSubtitle>
        </Container>
      </PageHeader>

      {/* Design 1: Horizontal Timeline */}
      <DesignLabel>
        <Container>
          <LabelTag>Design 1</LabelTag>
          <LabelTitle>Horizontal Timeline with Cards</LabelTitle>
        </Container>
      </DesignLabel>

      <Section1>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Our Process</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>How We Work</SectionTitle>
            <SectionSubtitle>
              A proven methodology refined over 100+ successful campaigns.
            </SectionSubtitle>
          </SectionHeader>

          <TimelineWrapper1>
            <TimelineLine1 />
            <TimelineGrid1>
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <TimelineCard1 key={index}>
                    <StepNumber1>{index + 1}</StepNumber1>
                    <StepIcon1>
                      <IconComponent size={24} />
                    </StepIcon1>
                    <StepTitle1>{step.title}</StepTitle1>
                    <StepDesc1>{step.description}</StepDesc1>
                  </TimelineCard1>
                );
              })}
            </TimelineGrid1>
          </TimelineWrapper1>
        </Container>
      </Section1>

      {/* Design 2: Vertical Alternating */}
      <DesignLabel>
        <Container>
          <LabelTag>Design 2</LabelTag>
          <LabelTitle>Vertical Alternating Timeline</LabelTitle>
        </Container>
      </DesignLabel>

      <Section2>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText>Our Process</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle>How We Work</SectionTitle>
            <SectionSubtitle>
              A proven methodology refined over 100+ successful campaigns.
            </SectionSubtitle>
          </SectionHeader>

          <TimelineWrapper2>
            <TimelineLine2 />
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const align = index % 2 === 0 ? 'left' : 'right';
              return (
                <TimelineItem2 key={index} $align={align}>
                  {align === 'left' ? (
                    <>
                      <TimelineContent2 $align={align}>
                        <StepLabel2>Step {step.number}</StepLabel2>
                        <StepTitle2>{step.title}</StepTitle2>
                        <StepDesc2>{step.description}</StepDesc2>
                      </TimelineContent2>
                      <TimelineNode2>
                        <IconComponent size={32} />
                      </TimelineNode2>
                      <TimelineEmpty2 />
                    </>
                  ) : (
                    <>
                      <TimelineEmpty2 />
                      <TimelineNode2>
                        <IconComponent size={32} />
                      </TimelineNode2>
                      <TimelineContent2 $align={align}>
                        <StepLabel2>Step {step.number}</StepLabel2>
                        <StepTitle2>{step.title}</StepTitle2>
                        <StepDesc2>{step.description}</StepDesc2>
                      </TimelineContent2>
                    </>
                  )}
                </TimelineItem2>
              );
            })}
          </TimelineWrapper2>
        </Container>
      </Section2>

      {/* Design 3: Dark Modern Cards */}
      <DesignLabel>
        <Container>
          <LabelTag>Design 3</LabelTag>
          <LabelTitle>Dark Modern Cards</LabelTitle>
        </Container>
      </DesignLabel>

      <Section3>
        <Container>
          <SectionHeader>
            <SectionTag>
              <TagLine />
              <TagText style={{ color: '#ff8c42' }}>Our Process</TagText>
              <TagLine />
            </SectionTag>
            <SectionTitle3>How We Work</SectionTitle3>
            <SectionSubtitle3>
              A proven methodology refined over 100+ successful campaigns.
            </SectionSubtitle3>
          </SectionHeader>

          <ProcessGrid3>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <ProcessCard3 key={index}>
                  <ProcessNumber3>{step.number}</ProcessNumber3>
                  <ProcessIcon3>
                    <IconComponent size={28} />
                  </ProcessIcon3>
                  <ProcessTitle3>{step.title}</ProcessTitle3>
                  <ProcessDesc3>{step.description}</ProcessDesc3>
                  {index < processSteps.length - 1 && (
                    <ArrowConnector>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </ArrowConnector>
                  )}
                </ProcessCard3>
              );
            })}
          </ProcessGrid3>
        </Container>
      </Section3>
    </PageWrapper>
  );
}
