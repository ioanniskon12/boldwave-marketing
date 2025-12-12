'use client';

import styled from 'styled-components';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required?: boolean;
  name: string;
  id?: string;
}

const SelectWrapper = styled.div`
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

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select<{ $hasError: boolean; $hasValue: boolean }>`
  width: 100%;
  height: 56px;
  padding: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing['2xl']};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors.text.primary : theme.colors.text.muted};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  appearance: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.accent};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 75, 75, 0.1)'};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
`;

export default function Select({
  label,
  error,
  options,
  placeholder = 'Select an option',
  value,
  onChange,
  onBlur,
  required,
  name,
  id,
}: SelectProps) {
  const selectId = id || name;

  return (
    <SelectWrapper>
      {label && (
        <Label htmlFor={selectId}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <SelectContainer>
        <StyledSelect
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          $hasError={!!error}
          $hasValue={!!value}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <SelectIcon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SelectIcon>
      </SelectContainer>
      {error && <ErrorMessage id={`${selectId}-error`}>{error}</ErrorMessage>}
    </SelectWrapper>
  );
}
