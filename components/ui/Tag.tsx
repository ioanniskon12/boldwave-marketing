'use client';

import styled from 'styled-components';

interface TagProps {
  $variant?: 'default' | 'accent' | 'outline';
  children: React.ReactNode;
}

const StyledTag = styled.span<TagProps>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'accent':
        return `
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text.inverse};
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.text.secondary};
        `;
      default:
        return `
          background-color: ${theme.colors.accentLight};
          color: ${theme.colors.accent};
        `;
    }
  }}
`;

export default function Tag({ $variant = 'default', children }: TagProps) {
  return <StyledTag $variant={$variant}>{children}</StyledTag>;
}
