'use client';

import styled, { css } from 'styled-components';
import { media } from '@/styles/theme';

type TextSize = 'sm' | 'base' | 'lg';

interface TextProps {
  $size?: TextSize;
  $color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent';
  $align?: 'left' | 'center' | 'right';
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
}

const sizeStyles = {
  sm: css`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.5;
  `,
  base: css`
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  `,
  lg: css`
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.7;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  `,
};

const StyledText = styled.p<{
  $size: TextSize;
  $color: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent';
  $align: 'left' | 'center' | 'right';
  $weight: 'normal' | 'medium' | 'semibold' | 'bold';
}>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  ${({ $size }) => sizeStyles[$size]};
  font-weight: ${({ theme, $weight }) => theme.fontWeights[$weight]};
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
  text-align: ${({ $align }) => $align};
`;

export default function Text({
  $size = 'base',
  $color = 'secondary',
  $align = 'left',
  $weight = 'normal',
  as = 'p',
  children,
}: TextProps) {
  return (
    <StyledText as={as} $size={$size} $color={$color} $align={$align} $weight={$weight}>
      {children}
    </StyledText>
  );
}
