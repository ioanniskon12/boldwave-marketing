'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

interface ButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonLinkProps extends ButtonBaseProps {
  children: React.ReactNode;
  href: string;
}

const sizeStyles = {
  sm: css`
    padding: 10px 20px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: 14px 28px;
    font-size: ${({ theme }) => theme.fontSizes.base};
  `,
  lg: css`
    padding: 18px 36px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text.inverse};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accentHover};
      box-shadow: ${({ theme }) => theme.shadows.accent};
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 2px solid ${({ theme }) => theme.colors.text.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.text.primary};
      color: ${({ theme }) => theme.colors.text.inverse};
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 2px solid transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
};

const baseStyles = css<ButtonBaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $size }) => sizeStyles[$size || 'md']};
  ${({ $variant }) => variantStyles[$variant || 'primary']};
`;

const StyledButton = styled.button<ButtonBaseProps>`
  ${baseStyles}
`;

const StyledLink = styled(Link)<ButtonBaseProps>`
  ${baseStyles}
`;

export function Button({
  children,
  $variant = 'primary',
  $size = 'md',
  $fullWidth = false,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <StyledButton
      $variant={$variant}
      $size={$size}
      $fullWidth={$fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
}

export function ButtonLink({
  children,
  href,
  $variant = 'primary',
  $size = 'md',
  $fullWidth = false,
}: ButtonLinkProps) {
  return (
    <StyledLink href={href} $variant={$variant} $size={$size} $fullWidth={$fullWidth}>
      {children}
    </StyledLink>
  );
}

export default Button;
