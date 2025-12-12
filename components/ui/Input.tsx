'use client';

import styled from 'styled-components';

interface InputProps {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string;
  id?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  margin-left: 2px;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  height: 56px;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.accent};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 75, 75, 0.1)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
`;

export default function Input({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  name,
  id,
}: InputProps) {
  const inputId = id || name;

  return (
    <InputWrapper>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <StyledInput
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        $hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && <ErrorMessage id={`${inputId}-error`}>{error}</ErrorMessage>}
    </InputWrapper>
  );
}
