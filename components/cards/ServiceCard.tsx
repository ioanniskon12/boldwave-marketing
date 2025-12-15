'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Service } from '@/types';
import { ServiceIcon } from '@/components/icons';

interface ServiceCardProps {
  service: Service;
}

const CardWrapper = styled(Link)`
  display: block;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};

    .learn-more {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.accentLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LearnMore = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: color ${({ theme }) => theme.transitions.fast};
`;

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <CardWrapper href={`/services/${service.slug}`}>
      <IconWrapper><ServiceIcon slug={service.slug} size={28} /></IconWrapper>
      <Title>{service.title}</Title>
      <Description>{service.shortDescription}</Description>
      <LearnMore className="learn-more">Learn more &rarr;</LearnMore>
    </CardWrapper>
  );
}
