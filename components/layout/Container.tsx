'use client';

import styled from 'styled-components';

interface ContainerProps {
  $maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

const StyledContainer = styled.div<{ $maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full' }>`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme, $maxWidth }) => {
    switch ($maxWidth) {
      case 'sm':
        return theme.container.sm;
      case 'md':
        return theme.container.md;
      case 'lg':
        return theme.container.lg;
      case 'full':
        return '100%';
      default:
        return theme.container.xl;
    }
  }};
`;

export default function Container({ $maxWidth = 'xl', children }: ContainerProps) {
  return <StyledContainer $maxWidth={$maxWidth}>{children}</StyledContainer>;
}
