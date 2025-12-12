'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/theme';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { FormState, FormErrors } from '@/types';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const SuccessTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SuccessText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ResetButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.accentHover};
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const adSpendOptions = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: '$100,000+' },
];

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  website: '',
  adSpend: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateField = (name: keyof FormState, value: string) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email';
        return '';
      case 'company':
        return value.trim() ? '' : 'Company is required';
      case 'adSpend':
        return value ? '' : 'Please select your monthly ad spend';
      case 'message':
        return value.trim() ? '' : 'Message is required';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormState>).forEach((key) => {
      if (key !== 'website') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <SuccessMessage>
        <SuccessIcon>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </SuccessIcon>
        <SuccessTitle>Thanks for reaching out!</SuccessTitle>
        <SuccessText>
          We&apos;ll get back to you within 24 hours.
        </SuccessText>
        <ResetButton onClick={handleReset}>Submit another message</ResetButton>
      </SuccessMessage>
    );
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormGrid>
        <Input
          label="Name"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
        />
      </FormGrid>
      <FormGrid>
        <Input
          label="Company"
          name="company"
          placeholder="Your company"
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.company}
          required
        />
        <Input
          label="Website"
          name="website"
          type="url"
          placeholder="https://yourwebsite.com"
          value={formData.website}
          onChange={handleChange}
        />
      </FormGrid>
      <Select
        label="Monthly Ad Spend"
        name="adSpend"
        options={adSpendOptions}
        placeholder="Select your monthly ad spend"
        value={formData.adSpend}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.adSpend}
        required
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="Tell us about your goals and how we can help..."
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        rows={4}
        required
      />
      <Button type="submit" $size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </FormWrapper>
  );
}
