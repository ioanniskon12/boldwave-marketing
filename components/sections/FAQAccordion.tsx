'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/theme';

// ============================================
// STYLED COMPONENTS
// ============================================
const FAQList = styled.div`
  display: grid;
  gap: 16px;

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const FAQItem = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  height: fit-content;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }
`;

const FAQNumber = styled.span`
  font-size: 36px;
  font-weight: 800;
  color: rgba(255, 140, 66, 0.15);
  line-height: 1;
  flex-shrink: 0;

  ${media.md} {
    font-size: 48px;
  }
`;

const FAQQuestionButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 20px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  ${media.md} {
    gap: 20px;
    padding: 28px 32px;
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    flex: 1;
    transition: color 0.3s ease;

    ${media.md} {
      font-size: 18px;
    }
  }

  &:hover h4 {
    color: #ff8c42;
  }
`;

const FAQToggle = styled.div<{ $isOpen: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isOpen }) => ($isOpen ? '#ff8c42' : '#faf8f5')};
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${media.md} {
    width: 40px;
    height: 40px;
  }

  svg {
    color: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '#1a1a1a')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    transition: transform 0.3s ease;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const FAQAnswerInner = styled.div`
  padding: 0 20px 24px;
  font-size: 15px;
  color: #666666;
  line-height: 1.7;

  ${media.md} {
    padding: 0 24px 24px;
    font-size: 15px;
  }
`;

// ============================================
// TYPES
// ============================================
interface FAQItemData {
  id?: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItemData[];
  startNumber?: number;
}

// ============================================
// COMPONENT
// ============================================
export default function FAQAccordion({ faqs, startNumber = 1 }: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <FAQList>
      {faqs.map((faq, index) => {
        const questionNumber = startNumber + index;
        return (
          <FAQItem key={faq.id || index}>
            <FAQQuestionButton
              $isOpen={openFAQ === index}
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              aria-expanded={openFAQ === index}
            >
              <FAQNumber>{String(questionNumber).padStart(2, '0')}</FAQNumber>
              <h4>{faq.question}</h4>
              <FAQToggle $isOpen={openFAQ === index}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </FAQToggle>
            </FAQQuestionButton>
            <FAQAnswer $isOpen={openFAQ === index}>
              <FAQAnswerInner>{faq.answer}</FAQAnswerInner>
            </FAQAnswer>
          </FAQItem>
        );
      })}
    </FAQList>
  );
}
