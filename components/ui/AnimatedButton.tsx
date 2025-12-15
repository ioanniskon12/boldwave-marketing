'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';

export interface AnimatedButtonProps {
  href: string;
  children: string;
  variant?: 'light' | 'orange' | 'white';
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ButtonWrapper = styled(Link)<{ $variant: 'light' | 'orange' | 'white' }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 24px 6px 24px;
  background: ${({ $variant }) => {
    if ($variant === 'orange') return '#ff8c42';
    if ($variant === 'white') return '#ffffff';
    return '#ffffff';
  }};
  border: none;
  color: ${({ $variant }) => ($variant === 'orange' ? '#ffffff' : '#1a1a1a')};
  font-size: 14px;
  font-weight: 500;
  border-radius: 100px;
  text-decoration: none;
  flex-direction: row;
  width: fit-content;
  align-self: flex-start;

  &:visited {
    color: ${({ $variant }) => ($variant === 'orange' ? '#ffffff' : '#1a1a1a')};
  }

  &:active {
    color: ${({ $variant }) => ($variant === 'orange' ? '#ffffff' : '#1a1a1a')};
  }

  ${media.lg} {
    padding: 6px 6px 6px 24px;
    transition: padding 0.3s ease;

    &:hover {
      padding: 6px 24px 6px 6px;
      flex-direction: row-reverse;
      color: ${({ $variant }) => ($variant === 'orange' ? '#ffffff' : '#1a1a1a')};
      text-decoration: none;
    }
  }
`;

const ArrowCircle = styled.span<{ $variant: 'light' | 'orange' | 'white' }>`
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  background: ${({ $variant }) => ($variant === 'orange' ? 'rgba(255, 255, 255, 0.9)' : '#ff8c42')};
  border-radius: 50%;
  color: ${({ $variant }) => ($variant === 'orange' ? '#1a1a1a' : '#ffffff')};
  flex-shrink: 0;

  ${media.lg} {
    display: flex;
  }
`;

const ButtonText = styled.span``;

export default function AnimatedButton({ href, children, variant = 'light', onClick, style }: AnimatedButtonProps) {
  return (
    <ButtonWrapper href={href} $variant={variant} onClick={onClick} style={style}>
      <ButtonText>{children}</ButtonText>
      <ArrowCircle $variant={variant}>
        <img
          src="/owl.svg"
          alt="owl"
          width="20"
          height="20"
          style={{ filter: variant === 'orange' ? 'none' : 'invert(1)' }}
        />
      </ArrowCircle>
    </ButtonWrapper>
  );
}
