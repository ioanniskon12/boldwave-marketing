'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';

interface LogoProps {
  $variant?: 'dark' | 'light';
  $scrolled?: boolean;
  $noLink?: boolean;
}

const logoStyles = css<{ $variant: 'dark' | 'light'; $scrolled: boolean }>`
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

  ${media.lg} {
    color: ${({ theme, $variant, $scrolled }) =>
      ($variant === 'light' && !$scrolled)
        ? theme.colors.text.inverse
        : ($scrolled || $variant === 'dark')
          ? theme.colors.text.primary
          : theme.colors.text.inverse};
  }
`;

const LogoLink = styled(Link)<{ $variant: 'dark' | 'light'; $scrolled: boolean }>`
  ${logoStyles}

  &:hover {
    opacity: 0.8;
    color: ${({ theme, $variant }) =>
      $variant === 'light' ? theme.colors.text.inverse : theme.colors.text.primary};
  }

  ${media.lg} {
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

const LogoStatic = styled.div<{ $variant: 'dark' | 'light'; $scrolled: boolean }>`
  ${logoStyles}
  cursor: default;
`;

const LogoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #ff8c42;
  border-radius: 10px;
  flex-shrink: 0;
`;

export default function Logo({ $variant = 'dark', $scrolled = false, $noLink = false }: LogoProps) {
  const content = (
    <>
      <LogoIcon>
        <img
          src="/owl.svg"
          alt="Owl"
          width={20}
          height={20}
          style={{ filter: 'invert(1)' }}
        />
      </LogoIcon>
      OwlMarketingHub
    </>
  );

  if ($noLink) {
    return (
      <LogoStatic $variant={$variant} $scrolled={$scrolled}>
        {content}
      </LogoStatic>
    );
  }

  return (
    <LogoLink href="/" $variant={$variant} $scrolled={$scrolled}>
      {content}
    </LogoLink>
  );
}
