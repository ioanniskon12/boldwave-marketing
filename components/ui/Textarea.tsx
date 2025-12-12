'use client';

import styled from 'styled-components';

interface TextareaProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  name: string;
  id?: string;
  rows?: number;
}

const TextareaWrapper = styled.div`
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

const StyledTextarea = styled.textarea<{ $hasError: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  resize: vertical;
  min-height: 120px;
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

export default function Textarea({
  label,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  name,
  id,
  rows = 4,
}: TextareaProps) {
  const textareaId = id || name;

  return (
    <TextareaWrapper>
      {label && (
        <Label htmlFor={textareaId}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <StyledTextarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        rows={rows}
        $hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      {error && <ErrorMessage id={`${textareaId}-error`}>{error}</ErrorMessage>}
    </TextareaWrapper>
  );
}
