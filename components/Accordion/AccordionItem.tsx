'use client';

import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ItemWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Question = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.normal};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ContentWrapper = styled.div<{ $height: number }>`
  overflow: hidden;
  transition: height 300ms ease;
  height: ${({ $height }) => $height}px;
`;

const Content = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Answer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin: 0;
`;

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <ItemWrapper>
      <ItemHeader
        $isOpen={isOpen}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Question>{question}</Question>
        <IconWrapper $isOpen={isOpen}>
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
        </IconWrapper>
      </ItemHeader>
      <ContentWrapper $height={height}>
        <Content ref={contentRef}>
          <Answer>{answer}</Answer>
        </Content>
      </ContentWrapper>
    </ItemWrapper>
  );
}
