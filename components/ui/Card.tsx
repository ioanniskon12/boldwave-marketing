'use client';

import styled from 'styled-components';

interface CardProps {
  $variant?: 'default' | 'outlined' | 'accent';
  $padding?: 'sm' | 'md' | 'lg';
  $hoverable?: boolean;
  children: React.ReactNode;
}

const StyledCard = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme, $padding }) => {
    switch ($padding) {
      case 'sm':
        return theme.spacing.lg;
      case 'lg':
        return theme.spacing['2xl'];
      default:
        return theme.spacing.xl;
    }
  }};
  border: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'outlined':
        return `1px solid ${theme.colors.border}`;
      case 'accent':
        return 'none';
      default:
        return 'none';
    }
  }};
  border-left: ${({ theme, $variant }) =>
    $variant === 'accent' ? `4px solid ${theme.colors.accent}` : undefined};
  box-shadow: ${({ theme, $variant }) =>
    $variant === 'outlined' ? 'none' : theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  ${({ $hoverable, theme }) =>
    $hoverable &&
    `
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;

export default function Card({
  $variant = 'default',
  $padding = 'md',
  $hoverable = false,
  children,
}: CardProps) {
  return (
    <StyledCard $variant={$variant} $padding={$padding} $hoverable={$hoverable}>
      {children}
    </StyledCard>
  );
}
