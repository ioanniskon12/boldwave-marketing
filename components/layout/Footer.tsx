'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { media } from '@/styles/theme';
import Container from './Container';
import Logo from '@/components/ui/Logo';
import { footerNavigation } from '@/data/navigation';

const StyledFooter = styled.footer`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #ffffff;
  padding: 80px 0 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 140, 66, 0.5), transparent);
  }
`;

const FooterGlow = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  pointer-events: none;

  &.glow-1 {
    background: #ff8c42;
    top: -200px;
    right: -100px;
  }

  &.glow-2 {
    background: #667eea;
    bottom: -200px;
    left: -100px;
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 1;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;

  ${media.md} {
    grid-template-columns: 1.5fr 2fr;
  }

  ${media.lg} {
    grid-template-columns: 1.2fr 2fr 1.2fr;
  }
`;

const FooterBrand = styled.div`
  max-width: 350px;
`;

const FooterDescription = styled.p`
  margin-top: 20px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
`;

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
`;

const FooterColumn = styled.div``;

const FooterHeading = styled.h4`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 24px;
  color: #ff8c42;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #ffffff;
    transform: translateX(4px);
  }

  &::before {
    content: '';
    width: 0;
    height: 1px;
    background: #ff8c42;
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 12px;
  }
`;

const NewsletterSection = styled.div`
  ${media.lg} {
    padding-left: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NewsletterTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
  color: #ff8c42;
`;

const NewsletterText = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 20px;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;

  ${media.md} {
    flex-direction: row;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    border-color: rgba(255, 140, 66, 0.5);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const NewsletterButton = styled.button`
  padding: 14px 24px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 140, 66, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.p`
  font-size: 13px;
  color: #10b981;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FooterCTA = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CTAText = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #ffffff;
  }

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 140, 66, 0.3);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 140, 66, 0.2);
    border-color: rgba(255, 140, 66, 0.3);
    color: #ff8c42;
    transform: translateY(-2px);
  }
`;

const FooterLegal = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const LegalLink = styled(Link)`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <StyledFooter>
      <FooterGlow className="glow-1" />
      <FooterGlow className="glow-2" />

      <Container>
        <FooterContent>
          <FooterTop>
            <FooterBrand>
              <Logo $variant="light" />
              <FooterDescription>
                We help brands turn attention into revenue with data-driven performance
                marketing. Based in London, working globally.
              </FooterDescription>
            </FooterBrand>

            <FooterNav>
              <FooterColumn>
                <FooterHeading>Company</FooterHeading>
                <FooterLinks>
                  {footerNavigation.company.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </FooterLinks>
              </FooterColumn>

              <FooterColumn>
                <FooterHeading>Services</FooterHeading>
                <FooterLinks>
                  {footerNavigation.services.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </FooterLinks>
              </FooterColumn>

              <FooterColumn>
                <FooterHeading>Resources</FooterHeading>
                <FooterLinks>
                  {footerNavigation.resources.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </FooterLinks>
              </FooterColumn>
            </FooterNav>

            <NewsletterSection>
              <NewsletterTitle>Newsletter</NewsletterTitle>
              <NewsletterText>
                Subscribe to get marketing tips, insights and updates delivered to your inbox.
              </NewsletterText>
              <NewsletterForm onSubmit={handleSubmit}>
                <InputWrapper>
                  <NewsletterInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <NewsletterButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </NewsletterButton>
                </InputWrapper>
                {isSuccess && (
                  <SuccessMessage>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Thanks for subscribing!
                  </SuccessMessage>
                )}
              </NewsletterForm>
            </NewsletterSection>
          </FooterTop>

          <FooterCTA>
            <CTAText>
              <h3>Ready to grow your business?</h3>
              <p>Let&apos;s discuss how we can help you achieve your marketing goals.</p>
            </CTAText>
            <CTAButton href="/contact">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </CTAButton>
          </FooterCTA>

          <FooterBottom>
            <Copyright>
              &copy; {currentYear} OwlMarketingHub. All rights reserved.
            </Copyright>

            <FooterLegal>
              <LegalLink href="/privacy">Privacy Policy</LegalLink>
              <LegalLink href="/terms">Terms of Service</LegalLink>
            </FooterLegal>

            <SocialLinks>
              <SocialLink
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialLink>
              <SocialLink
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialLink>
              <SocialLink
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </SocialLink>
            </SocialLinks>
          </FooterBottom>
        </FooterContent>
      </Container>
    </StyledFooter>
  );
}
