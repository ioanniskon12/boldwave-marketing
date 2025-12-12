'use client';

import styled from 'styled-components';
import Link from 'next/link';

interface LogoProps {
  $variant?: 'dark' | 'light';
}

const LogoLink = styled(Link)<{ $variant: 'dark' | 'light' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;
  color: ${({ theme, $variant }) =>
    $variant === 'light' ? theme.colors.text.inverse : theme.colors.text.primary};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
    color: ${({ theme, $variant }) =>
      $variant === 'light' ? theme.colors.text.inverse : theme.colors.text.primary};
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

export default function Logo({ $variant = 'dark' }: LogoProps) {
  return (
    <LogoLink href="/" $variant={$variant}>
      <LogoIcon $variant={$variant}>O</LogoIcon>
      OwlMarketingHub
    </LogoLink>
  );
}
