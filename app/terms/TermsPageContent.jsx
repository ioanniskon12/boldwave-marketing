'use client';

import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';

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

const HeroSection = styled.section`
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  padding: 160px 0 80px;
  background: #ffffff;
  overflow: hidden;

  ${media.lg} {
    padding: 180px 0 100px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #fef6f0 0%, #fff8f3 100%);
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);

  ${media.lg} {
    width: 45%;
  }
`;

const HeroAccentLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 120px;
  height: 2px;
  background: #ff8c42;
  transform: translateY(-50%);

  ${media.md} {
    display: block;
  }

  display: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
`;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.1;
  animation: ${fadeInUp} 0.6s ease forwards;

  ${media.lg} {
    font-size: 64px;
  }
`;

const LastUpdated = styled.p`
  font-size: 14px;
  color: #999999;
  animation: ${fadeInUp} 0.6s ease 0.1s forwards;
  opacity: 0;
`;

const ContentSection = styled.section`
  padding: 80px 0 100px;
  background: #faf8f5;

  ${media.lg} {
    padding: 100px 0 120px;
  }
`;

const Content = styled.div`
  max-width: 800px;
`;

const Section = styled.section`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 28px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 16px;

  ${media.lg} {
    font-size: 17px;
  }
`;

const List = styled.ul`
  margin: 16px 0;
  padding-left: 24px;

  li {
    font-size: 16px;
    color: #666666;
    line-height: 1.8;
    margin-bottom: 8px;

    ${media.lg} {
      font-size: 17px;
    }
  }
`;

const ContactInfo = styled.div`
  margin-top: 32px;
  padding: 24px;
  background: #faf8f5;
  border-radius: 16px;

  p {
    font-size: 16px;
    color: #666666;
    line-height: 1.8;
    margin: 0;

    a {
      color: #ff8c42;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export function TermsPageContent() {
  return (
    <>
      <HeroSection>
        <HeroBackground />
        <HeroAccentLine />
        <Container>
          <HeroContent>
            <PageTitle>Terms of Service</PageTitle>
            <LastUpdated>Last updated: December 15, 2025</LastUpdated>
          </HeroContent>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <Content>
          <Section>
            <Paragraph>
              Welcome to OwlMarketingHub. These Terms of Service (&quot;Terms&quot;) govern your use of our website
              and services. By accessing or using our services, you agree to be bound by these Terms.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>1. Services</SectionTitle>
            <Paragraph>
              OwlMarketingHub provides digital marketing services including but not limited to social media
              management, paid advertising, content creation, branding, website development, and email marketing.
              The specific services provided will be outlined in individual agreements or proposals.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>2. Client Responsibilities</SectionTitle>
            <Paragraph>
              As a client, you agree to:
            </Paragraph>
            <List>
              <li>Provide accurate and complete information necessary for us to perform our services</li>
              <li>Grant necessary access to accounts, platforms, and materials required for service delivery</li>
              <li>Respond to requests for information or approval in a timely manner</li>
              <li>Make payments according to agreed-upon terms</li>
              <li>Comply with all applicable laws and platform policies</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. Payment Terms</SectionTitle>
            <Paragraph>
              Payment terms will be specified in your service agreement. Unless otherwise stated:
            </Paragraph>
            <List>
              <li>Invoices are due within 14 days of receipt</li>
              <li>Late payments may incur additional fees</li>
              <li>Services may be suspended for overdue accounts</li>
              <li>All fees are non-refundable unless otherwise specified</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Intellectual Property</SectionTitle>
            <Paragraph>
              Unless otherwise agreed in writing:
            </Paragraph>
            <List>
              <li>
                Content created by OwlMarketingHub becomes the property of the client upon full payment
              </li>
              <li>
                OwlMarketingHub retains the right to use work samples in our portfolio and marketing materials
              </li>
              <li>
                Pre-existing intellectual property remains with its original owner
              </li>
              <li>
                Third-party assets (stock photos, fonts, etc.) are subject to their respective licenses
              </li>
            </List>
          </Section>

          <Section>
            <SectionTitle>5. Confidentiality</SectionTitle>
            <Paragraph>
              Both parties agree to keep confidential any proprietary information shared during the course of
              our business relationship. This includes but is not limited to business strategies, customer data,
              financial information, and trade secrets.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>6. Limitation of Liability</SectionTitle>
            <Paragraph>
              OwlMarketingHub shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising from our services. Our total liability shall not exceed the amount paid
              by you for the services giving rise to the claim.
            </Paragraph>
            <Paragraph>
              We do not guarantee specific results from our marketing services, as outcomes depend on various
              factors beyond our control including market conditions, competition, and platform algorithms.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>7. Third-Party Platforms</SectionTitle>
            <Paragraph>
              Our services often involve third-party platforms (e.g., Meta, Google, TikTok). We are not
              responsible for:
            </Paragraph>
            <List>
              <li>Changes to third-party platform policies or features</li>
              <li>Account suspensions or restrictions imposed by platforms</li>
              <li>Platform outages or technical issues</li>
              <li>Changes to advertising costs or reach</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>8. Termination</SectionTitle>
            <Paragraph>
              Either party may terminate services with 30 days written notice. Upon termination:
            </Paragraph>
            <List>
              <li>Outstanding invoices become immediately due</li>
              <li>Access to accounts will be transferred back to the client</li>
              <li>Work completed up to termination date will be delivered</li>
              <li>Any prepaid fees for unused services may be refunded at our discretion</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>9. Indemnification</SectionTitle>
            <Paragraph>
              You agree to indemnify and hold harmless OwlMarketingHub from any claims, damages, or expenses
              arising from your breach of these Terms, your use of our services, or your violation of any
              third-party rights.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>10. Governing Law</SectionTitle>
            <Paragraph>
              These Terms shall be governed by and construed in accordance with the laws of the United Kingdom,
              without regard to its conflict of law provisions.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>11. Changes to Terms</SectionTitle>
            <Paragraph>
              We reserve the right to modify these Terms at any time. We will notify clients of significant
              changes via email or through our website. Continued use of our services after changes constitutes
              acceptance of the new Terms.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>12. Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions about these Terms, please contact us:
            </Paragraph>
            <ContactInfo>
              <p>
                Email: <a href="mailto:legal@owlmarketinghub.com">legal@owlmarketinghub.com</a>
              </p>
            </ContactInfo>
          </Section>
          </Content>
        </Container>
      </ContentSection>
    </>
  );
}
