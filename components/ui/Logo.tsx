'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';

interface LogoProps {
  $variant?: 'dark' | 'light';
  $scrolled?: boolean;
}

const LogoLink = styled(Link)<{ $variant: 'dark' | 'light'; $scrolled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;
  color: ${({ theme, $variant }) =>
    $variant === 'light' ? theme.colors.text.inverse : theme.colors.text.primary};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    color: ${({ theme, $variant }) =>
      $variant === 'light' ? theme.colors.text.inverse : theme.colors.text.primary};
  }

  ${media.lg} {
    color: ${({ theme, $variant, $scrolled }) =>
      ($variant === 'light' && !$scrolled)
        ? theme.colors.text.inverse
        : ($scrolled || $variant === 'dark')
          ? theme.colors.text.primary
          : theme.colors.text.inverse};

    &:hover {
      color: ${({ theme, $variant, $scrolled }) =>
        ($variant === 'light' && !$scrolled)
          ? theme.colors.text.inverse
          : ($scrolled || $variant === 'dark')
            ? theme.colors.text.primary
            : theme.colors.text.inverse};
    }
  }
`;

const LogoIcon = styled.span<{ $variant: 'dark' | 'light' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export default function Logo({ $variant = 'dark', $scrolled = false }: LogoProps) {
  return (
    <LogoLink href="/" $variant={$variant} $scrolled={$scrolled}>
      <LogoIcon $variant={$variant}>O</LogoIcon>
      OwlMarketingHub
    </LogoLink>
  );
}
