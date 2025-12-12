'use client';

import styled, { css } from 'styled-components';
import { media } from '@/styles/theme';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  as?: HeadingLevel;
  $color?: 'primary' | 'inverse' | 'accent';
  $align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const headingStyles = {
  h1: css`
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    font-weight: ${({ theme }) => theme.fontWeights.extrabold};
    line-height: 1.1;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes['6xl']};
    }

    ${media.lg} {
      font-size: ${({ theme }) => theme.fontSizes['7xl']};
    }
  `,
  h2: css`
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }

    ${media.lg} {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }
  `,
  h3: css`
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.3;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  `,
  h4: css`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.4;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  `,
  h5: css`
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.4;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  `,
  h6: css`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.5;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  `,
};

const StyledHeading = styled.h1<{
  $level: HeadingLevel;
  $color?: 'primary' | 'inverse' | 'accent';
  $align?: 'left' | 'center' | 'right';
}>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  ${({ $level }) => headingStyles[$level]};
  color: ${({ theme, $color }) => {
    switch ($color) {
      case 'inverse':
        return theme.colors.text.inverse;
      case 'accent':
        return theme.colors.accent;
      default:
        return theme.colors.text.primary;
    }
  }};
  text-align: ${({ $align }) => $align || 'left'};
`;

export default function Heading({
  as = 'h1',
  $color = 'primary',
  $align = 'left',
  children,
}: HeadingProps) {
  return (
    <StyledHeading as={as} $level={as} $color={$color} $align={$align}>
      {children}
    </StyledHeading>
  );
}
