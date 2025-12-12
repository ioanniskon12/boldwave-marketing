'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';

interface SectionProps {
  $background?: 'default' | 'alt' | 'dark';
  $padding?: 'sm' | 'md' | 'lg';
  id?: string;
  children: React.ReactNode;
}

const StyledSection = styled.section<{
  $background: 'default' | 'alt' | 'dark';
  $padding: 'sm' | 'md' | 'lg';
}>`
  background-color: ${({ theme, $background }) => {
    switch ($background) {
      case 'alt':
        return theme.colors.backgroundAlt;
      case 'dark':
        return theme.colors.primary;
      default:
        return theme.colors.background;
    }
  }};
  padding: ${({ $padding }) => {
    switch ($padding) {
      case 'sm':
        return '40px 0';
      case 'md':
        return '60px 0';
      default:
        return '60px 0';
    }
  }};

  ${media.md} {
    padding: ${({ $padding }) => {
      switch ($padding) {
        case 'sm':
          return '60px 0';
        case 'md':
          return '80px 0';
        default:
          return '80px 0';
      }
    }};
  }

  ${media.lg} {
    padding: ${({ $padding }) => {
      switch ($padding) {
        case 'sm':
          return '80px 0';
        case 'md':
          return '100px 0';
        default:
          return '120px 0';
      }
    }};
  }
`;

export default function Section({
  $background = 'default',
  $padding = 'lg',
  id,
  children,
}: SectionProps) {
  return (
    <StyledSection $background={$background} $padding={$padding} id={id}>
      {children}
    </StyledSection>
  );
}
