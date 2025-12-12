'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';

interface SubheadingProps {
  $color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent';
  $align?: 'left' | 'center' | 'right';
  $uppercase?: boolean;
  children: React.ReactNode;
}

const StyledSubheading = styled.p<SubheadingProps>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ $uppercase }) => ($uppercase ? '0.1em' : 'normal')};
  text-transform: ${({ $uppercase }) => ($uppercase ? 'uppercase' : 'none')};
  margin: 0;
  color: ${({ theme, $color }) => {
    switch ($color) {
      case 'inverse':
        return theme.colors.text.inverse;
      case 'accent':
        return theme.colors.accent;
      case 'muted':
        return theme.colors.text.muted;
      case 'secondary':
        return theme.colors.text.secondary;
      default:
        return theme.colors.text.primary;
    }
  }};
  text-align: ${({ $align }) => $align || 'left'};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

export default function Subheading({
  $color = 'secondary',
  $align = 'left',
  $uppercase = false,
  children,
}: SubheadingProps) {
  return (
    <StyledSubheading $color={$color} $align={$align} $uppercase={$uppercase}>
      {children}
    </StyledSubheading>
  );
}
