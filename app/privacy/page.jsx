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

export default function PrivacyPage() {
  return (
    <>
      <HeroSection>
        <HeroBackground />
        <HeroAccentLine />
        <Container>
          <HeroContent>
            <PageTitle>Privacy Policy</PageTitle>
            <LastUpdated>Last updated: December 15, 2025</LastUpdated>
          </HeroContent>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <Content>
          <Section>
            <Paragraph>
              At OwlMarketingHub, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Information We Collect</SectionTitle>
            <Paragraph>
              We may collect information about you in a variety of ways. The information we may collect includes:
            </Paragraph>
            <List>
              <li>
                <strong>Personal Data:</strong> Name, email address, phone number, and other contact information
                you voluntarily provide when contacting us or signing up for our services.
              </li>
              <li>
                <strong>Business Information:</strong> Company name, website URL, and business details relevant
                to the marketing services you request.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our website, including IP
                address, browser type, pages visited, and time spent on pages.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your
                experience on our website.
              </li>
            </List>
          </Section>

          <Section>
            <SectionTitle>How We Use Your Information</SectionTitle>
            <Paragraph>
              We use the information we collect to:
            </Paragraph>
            <List>
              <li>Provide, operate, and maintain our services</li>
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>Information Sharing</SectionTitle>
            <Paragraph>
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information with:
            </Paragraph>
            <List>
              <li>Service providers who assist us in operating our business</li>
              <li>Professional advisors such as lawyers and accountants</li>
              <li>Law enforcement when required by law</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>Data Security</SectionTitle>
            <Paragraph>
              We implement appropriate technical and organizational security measures to protect your personal
              information. However, no method of transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Your Rights</SectionTitle>
            <Paragraph>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </Paragraph>
            <List>
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to withdraw consent</li>
              <li>The right to data portability</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>Cookies</SectionTitle>
            <Paragraph>
              Our website uses cookies to improve your browsing experience. You can control cookies through
              your browser settings. Note that disabling cookies may affect some features of our website.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Third-Party Links</SectionTitle>
            <Paragraph>
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices of these external sites. We encourage you to review their privacy policies.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Changes to This Policy</SectionTitle>
            <Paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions about this Privacy Policy, please contact us:
            </Paragraph>
            <ContactInfo>
              <p>
                Email: <a href="mailto:privacy@owlmarketinghub.com">privacy@owlmarketinghub.com</a>
              </p>
            </ContactInfo>
          </Section>
          </Content>
        </Container>
      </ContentSection>
    </>
  );
}
