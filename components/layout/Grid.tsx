'use client';

import styled from 'styled-components';
import { media } from '@/styles/theme';

interface GridProps {
  $columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  $gap?: string;
  children: React.ReactNode;
}

const StyledGrid = styled.div<{
  $columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  $gap: string;
}>`
  display: grid;
  gap: ${({ $gap }) => $gap};
  grid-template-columns: repeat(${({ $columns }) => $columns.mobile}, 1fr);

  ${media.md} {
    grid-template-columns: repeat(${({ $columns }) => $columns.tablet}, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(${({ $columns }) => $columns.desktop}, 1fr);
  }
`;

export default function Grid({
  $columns = { mobile: 1, tablet: 2, desktop: 3 },
  $gap = '24px',
  children,
}: GridProps) {
  const columns = {
    mobile: $columns.mobile ?? 1,
    tablet: $columns.tablet ?? 2,
    desktop: $columns.desktop ?? 3,
  };

  return (
    <StyledGrid $columns={columns} $gap={$gap}>
      {children}
    </StyledGrid>
  );
}
