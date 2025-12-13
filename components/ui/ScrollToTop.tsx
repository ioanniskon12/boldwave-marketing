'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
`;

const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ff8c42;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 140, 66, 0.4);
  z-index: 1000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease forwards;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(255, 140, 66, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #ffffff;
  }
`;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button $visible={visible} onClick={scrollToTop} aria-label="Scroll to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </Button>
  );
}
