'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';
import AnimatedButton from './AnimatedButton';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  z-index: 10000;
  animation: ${slideUp} 0.4s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const PopupHeader = styled.div`
  position: relative;
  padding: 32px 32px 24px;
  background: linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
    color: #ffffff;
  }
`;

const PopupTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.3;

  ${media.md} {
    font-size: 28px;
  }
`;

const PopupSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const PopupBody = styled.div`
  padding: 24px 32px 32px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.7;
  margin: 0 0 24px 0;
`;

const Highlight = styled.span`
  color: #ff8c42;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SecondaryButton = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #0a0a12;
  }
`;

interface PopupMessage {
  icon: 'rocket' | 'chart' | 'gift' | 'star';
  title: string;
  subtitle: string;
  message: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

const popupMessages: PopupMessage[] = [
  {
    icon: 'rocket',
    title: 'Ready to Scale?',
    subtitle: 'Limited spots available',
    message: (
      <>
        We help brands achieve <Highlight>10x growth</Highlight> through strategic marketing. Book a free strategy call and discover your growth potential.
      </>
    ),
    buttonText: 'Book Free Strategy Call',
    buttonLink: '/contact',
  },
  {
    icon: 'chart',
    title: 'Free Marketing Audit',
    subtitle: 'Worth $500 - Yours Free',
    message: (
      <>
        Get a comprehensive <Highlight>marketing audit</Highlight> for your business. We&apos;ll analyze your current strategy and identify growth opportunities.
      </>
    ),
    buttonText: 'Get Your Free Audit',
    buttonLink: '/contact',
  },
  {
    icon: 'gift',
    title: 'Special Offer',
    subtitle: 'For new clients only',
    message: (
      <>
        Start your growth journey with <Highlight>20% off</Highlight> your first month. Limited time offer for businesses ready to scale.
      </>
    ),
    buttonText: 'Claim Your Discount',
    buttonLink: '/contact',
  },
  {
    icon: 'star',
    title: 'Join 100+ Brands',
    subtitle: 'Growing with us',
    message: (
      <>
        Over 100 brands trust us to drive their growth. Average client sees <Highlight>3.5x ROAS</Highlight> within 90 days.
      </>
    ),
    buttonText: 'Start Growing Today',
    buttonLink: '/contact',
  },
];

const icons = {
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1"/>
      <path d="M12 8v13"/>
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<PopupMessage | null>(null);

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');

    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * popupMessages.length);
        setCurrentMessage(popupMessages[randomIndex]);
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  if (!isOpen || !currentMessage) return null;

  return (
    <>
      <Overlay onClick={handleClose} />
      <PopupContainer>
        <PopupHeader>
          <CloseButton onClick={handleClose} aria-label="Close popup">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </CloseButton>
          <IconWrapper>
            {icons[currentMessage.icon]}
          </IconWrapper>
          <PopupTitle>{currentMessage.title}</PopupTitle>
          <PopupSubtitle>{currentMessage.subtitle}</PopupSubtitle>
        </PopupHeader>
        <PopupBody>
          <Message>{currentMessage.message}</Message>
          <ButtonWrapper>
            <AnimatedButton href={currentMessage.buttonLink} variant="orange" onClick={handleClose}>
              {currentMessage.buttonText}
            </AnimatedButton>
            <SecondaryButton onClick={handleClose}>
              Maybe later
            </SecondaryButton>
          </ButtonWrapper>
        </PopupBody>
      </PopupContainer>
    </>
  );
}
