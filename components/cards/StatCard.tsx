'use client';

import styled from 'styled-components';

interface StatCardProps {
  value: string;
  label: string;
}

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <CardWrapper>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </CardWrapper>
  );
}
