'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { ContactForm } from '@/components/forms';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';

const ContentGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};

  ${media.lg} {
    grid-template-columns: 1.2fr 1fr;
    gap: ${({ theme }) => theme.spacing['4xl']};
    align-items: start;
  }
`;

const FormWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  ${media.md} {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const ContactInfo = styled.div``;

const InfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.accentLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.accent};
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const InfoLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CalendarCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const CalendarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CalendarText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export function ContactPageContent() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's Talk"
        description="Ready to scale? Tell us about your brand and goals."
        bigText="CONTACT"
      />

      <Section $background="alt">
        <Container>
          <ContentGrid>
            <FormWrapper>
              <ContactForm />
            </FormWrapper>

            <ContactInfo>
              <InfoSection>
                <InfoTitle>Other ways to reach us</InfoTitle>
                <InfoItem>
                  <InfoIcon>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Email</InfoLabel>
                    <InfoLink href="mailto:hello@boldwave.com">
                      hello@boldwave.com
                    </InfoLink>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Location</InfoLabel>
                    <InfoValue>London, UK</InfoValue>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Response time</InfoLabel>
                    <InfoValue>We typically respond within 24 hours</InfoValue>
                  </InfoContent>
                </InfoItem>
              </InfoSection>

              <CalendarCard>
                <CalendarTitle>Prefer to book directly?</CalendarTitle>
                <CalendarText>
                  Skip the form and schedule a 30-minute strategy call at a time
                  that works for you.
                </CalendarText>
                <AnimatedButton href="#" variant="orange">Schedule a Call</AnimatedButton>
              </CalendarCard>
            </ContactInfo>
          </ContentGrid>
        </Container>
      </Section>
    </>
  );
}
