'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import { ContactForm } from '@/components/forms';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PageHero } from '@/components/sections';
import BookingModal from '@/components/ui/BookingModal';

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Main Content Section
const ContentSection = styled.section`
  padding: 80px 0 120px;
  background: #faf8f5;
  overflow-x: hidden;

  ${media.lg} {
    padding: 100px 0 160px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 48px;

  ${media.lg} {
    grid-template-columns: 1.3fr 1fr;
    gap: 80px;
    align-items: start;
  }
`;

// Section Header
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
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 42px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 32px;
`;

// Form Card
const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  ${media.md} {
    padding: 48px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 4px;
    background: linear-gradient(90deg, #ff8c42, #ffb380);
    border-radius: 0 0 4px 4px;

    ${media.md} {
      left: 48px;
      right: 48px;
    }
  }
`;

const FormHeader = styled.div`
  margin-bottom: 32px;
`;

// Contact Info Side
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

// Info Cards
const InfoCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }
`;

const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const InfoIcon = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ee 0%, #ffe8d6 100%);
  border-radius: 14px;
  color: #ff8c42;
`;

const InfoCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const InfoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const InfoItemIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 10px;
  color: #666666;
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
`;

const InfoLink = styled.a`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c42;
  }
`;

// Calendar Card
const CalendarCard = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CalendarPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 40px 40px;
`;

const CalendarContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CalendarIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff8c42 0%, #ffb380 100%);
  border-radius: 16px;
  color: #ffffff;
`;

const CalendarTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
`;

const CalendarText = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
  line-height: 1.6;
`;

// Trust Badges
const TrustSection = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
`;

const TrustTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  margin-bottom: 20px;
`;

const TrustBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f8f8f8;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
`;

const BadgeIcon = styled.span`
  color: #ff8c42;
`;

// Online Status
const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
`;

const OnlineDot = styled.span`
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: ${pulse} 2s ease infinite;
`;

const OnlineText = styled.span`
  font-size: 13px;
  color: #666666;
`;

// FAQ Section
const FAQSection = styled.section`
  padding: 80px 0;
  background: #ffffff;

  ${media.lg} {
    padding: 100px 0;
  }
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const FAQGrid = styled.div`
  display: grid;
  gap: 20px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FAQItem = styled.div`
  background: #faf8f5;
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s ease;

  &:hover {
    background: #fff5ee;
  }
`;

const FAQQuestion = styled.h4`
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

const FAQAnswer = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
`;

// CTA Section
const CTASection = styled.section`
  padding: 100px 0;
  background: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    padding: 140px 0;
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
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;

  ${media.lg} {
    font-size: 48px;
  }
`;

const CTAHighlight = styled.span`
  color: #ff8c42;
`;

const CTAText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.7;
`;

const faqs = [
  {
    question: 'How quickly can we get started?',
    answer: 'We typically onboard new clients within 1-2 weeks. After our initial call, we\'ll send a proposal and can begin work as soon as it\'s approved.',
  },
  {
    question: 'What\'s your minimum budget?',
    answer: 'Our minimum monthly retainer is $3,000 for ongoing services. For project-based work, minimums vary depending on scope and complexity.',
  },
  {
    question: 'Do you work with businesses outside the UK?',
    answer: 'Absolutely! We work with clients globally. Our team is experienced in managing campaigns across different time zones and markets.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We excel in e-commerce, SaaS, health & wellness, and professional services. However, we\'ve delivered results across many industries.',
  },
];

// Schedule Button
const ScheduleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%);
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff7a2e 0%, #e66a1e 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 140, 66, 0.35);
  }
`;

export function ContactPageContent() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      <PageHero
        badge="Contact"
        title="Let's Create Something Great"
        description="Ready to scale your brand? Tell us about your goals and we'll show you how we can help."
        bigText="CONTACT"
      />

      {/* Main Content */}
      <ContentSection>
        <Container>
          <ContentGrid>
            {/* Form Side */}
            <FormWrapper>
              <FormHeader>
                <SectionTag>
                  <TagLine />
                  <TagText>Get in Touch</TagText>
                </SectionTag>
                <SectionTitle>Start Your Growth Journey</SectionTitle>
                <SectionSubtitle>
                  Fill out the form below and we&apos;ll get back to you within 24 hours with a custom strategy tailored to your business.
                </SectionSubtitle>
              </FormHeader>
              <ContactForm />
            </FormWrapper>

            {/* Info Side */}
            <ContactInfo>
              {/* Contact Details Card */}
              <InfoCard>
                <InfoCardHeader>
                  <InfoIcon>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </InfoIcon>
                  <InfoCardTitle>Contact Details</InfoCardTitle>
                </InfoCardHeader>
                <InfoItems>
                  <InfoItem>
                    <InfoItemIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </InfoItemIcon>
                    <InfoContent>
                      <InfoLabel>Email</InfoLabel>
                      <InfoLink href="mailto:hello@owlmarketinghub.com">hello@owlmarketinghub.com</InfoLink>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </InfoItemIcon>
                    <InfoContent>
                      <InfoLabel>Location</InfoLabel>
                      <InfoValue>London, UK (Remote Worldwide)</InfoValue>
                    </InfoContent>
                  </InfoItem>
                </InfoItems>
              </InfoCard>

              {/* Calendar Card */}
              <CalendarCard>
                <CalendarPattern />
                <CalendarContent>
                  <CalendarIconWrapper>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </CalendarIconWrapper>
                  <CalendarTitle>Prefer to talk directly?</CalendarTitle>
                  <CalendarText>
                    Skip the form and book a 30-minute strategy call. We&apos;ll discuss your goals and explore how we can help.
                  </CalendarText>
                  <ScheduleButton onClick={() => setIsBookingModalOpen(true)}>
                    Schedule a Call
                  </ScheduleButton>
                </CalendarContent>
              </CalendarCard>

              {/* Trust Badges */}
              <TrustSection>
                <TrustTitle>Why brands trust us</TrustTitle>
                <TrustBadges>
                  <TrustBadge>
                    <BadgeIcon>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </BadgeIcon>
                    Meta Partner
                  </TrustBadge>
                  <TrustBadge>
                    <BadgeIcon>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </BadgeIcon>
                    Google Partner
                  </TrustBadge>
                  <TrustBadge>
                    <BadgeIcon>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </BadgeIcon>
                    Verified Agency
                  </TrustBadge>
                </TrustBadges>
                <OnlineStatus>
                  <OnlineDot />
                  <OnlineText>We&apos;re online and ready to chat</OnlineText>
                </OnlineStatus>
              </TrustSection>
            </ContactInfo>
          </ContentGrid>
        </Container>
      </ContentSection>

      {/* FAQ Section */}
      <FAQSection>
        <Container>
          <FAQHeader>
            <SectionTag>
              <TagLine />
              <TagText>FAQs</TagText>
            </SectionTag>
            <SectionTitle>Common Questions</SectionTitle>
            <SectionSubtitle>
              Quick answers to help you get started
            </SectionSubtitle>
          </FAQHeader>
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion>{faq.question}</FAQQuestion>
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQGrid>
        </Container>
      </FAQSection>

      {/* CTA Section */}
      <CTASection>
        <CTAPattern />
        <Container>
          <CTAContent>
            <CTATitle>
              Not ready to <CTAHighlight>commit yet?</CTAHighlight>
            </CTATitle>
            <CTAText>
              Check out our case studies to see the results we&apos;ve delivered for brands like yours.
            </CTAText>
            <AnimatedButton href="/portfolio" variant="orange">View Our Work</AnimatedButton>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
}
