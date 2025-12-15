'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/theme';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface FormState {
  name: string;
  email: string;
  company: string;
  website: string;
  services: string[];
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  services?: string;
  message?: string;
}

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
  background-color: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
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
  color: #ff8c42;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #e67a35;
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
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Services Checkboxes
const ServicesFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const ServicesLabel = styled.legend`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  display: block;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCheckbox = styled.label<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: ${({ $isChecked }) => ($isChecked ? '#fff5ee' : '#f8f8f8')};
  border: 2px solid ${({ $isChecked }) => ($isChecked ? '#ff8c42' : 'transparent')};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  color: #1a1a1a;

  ${media.md} {
    padding: 12px 16px;
    gap: 10px;
    font-size: 14px;
  }

  &:hover {
    background: ${({ $isChecked }) => ($isChecked ? '#fff5ee' : '#f0f0f0')};
  }

  input {
    display: none;
  }
`;

const CheckboxIcon = styled.span<{ $isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid ${({ $isChecked }) => ($isChecked ? '#ff8c42' : '#d0d0d0')};
  background: ${({ $isChecked }) => ($isChecked ? '#ff8c42' : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    opacity: ${({ $isChecked }) => ($isChecked ? 1 : 0)};
    transform: scale(${({ $isChecked }) => ($isChecked ? 1 : 0.5)});
    transition: all 0.2s ease;
  }
`;

const ServicesError = styled.span`
  display: block;
  font-size: 13px;
  color: #ef4444;
  margin-top: 8px;
`;

// Orange Submit Button
const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ff7a2e 0%, #e66a1e 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 140, 66, 0.35);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const serviceOptions = [
  { value: 'paid-social', label: 'Paid Social' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'creative-strategy', label: 'Creative Strategy' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'seo', label: 'SEO' },
  { value: 'web-design', label: 'Web Design' },
];

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  website: '',
  services: [],
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

  const validateField = (name: keyof FormState, value: string | string[]) => {
    switch (name) {
      case 'name':
        return (value as string).trim() ? '' : 'Name is required';
      case 'email':
        if (!(value as string).trim()) return 'Email is required';
        if (!validateEmail(value as string)) return 'Please enter a valid email';
        return '';
      case 'company':
        return (value as string).trim() ? '' : 'Company is required';
      case 'services':
        return (value as string[]).length > 0 ? '' : 'Please select at least one service';
      case 'message':
        return (value as string).trim() ? '' : 'Message is required';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceToggle = (serviceValue: string) => {
    setFormData((prev) => {
      const newServices = prev.services.includes(serviceValue)
        ? prev.services.filter((s) => s !== serviceValue)
        : [...prev.services, serviceValue];
      return { ...prev, services: newServices };
    });

    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }));
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

    const newErrors: FormErrors = {};

    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;

    const companyError = validateField('company', formData.company);
    if (companyError) newErrors.company = companyError;

    const servicesError = validateField('services', formData.services);
    if (servicesError) newErrors.services = servicesError;

    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;

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

      <ServicesFieldset>
        <ServicesLabel>Services You&apos;re Interested In *</ServicesLabel>
        <ServicesGrid>
          {serviceOptions.map((service) => {
            const isChecked = formData.services.includes(service.value);
            return (
              <ServiceCheckbox key={service.value} $isChecked={isChecked}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleServiceToggle(service.value)}
                />
                <CheckboxIcon $isChecked={isChecked}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </CheckboxIcon>
                {service.label}
              </ServiceCheckbox>
            );
          })}
        </ServicesGrid>
        {errors.services && <ServicesError>{errors.services}</ServicesError>}
      </ServicesFieldset>

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
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </SubmitButton>
    </FormWrapper>
  );
}
