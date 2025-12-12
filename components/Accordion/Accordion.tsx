'use client';

import { useState } from 'react';
import styled from 'styled-components';
import AccordionItem from './AccordionItem';
import { AccordionItemType } from '@/types';

interface AccordionProps {
  items: AccordionItemType[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
}

const AccordionWrapper = styled.div`
  width: 100%;
`;

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpen);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <AccordionWrapper>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </AccordionWrapper>
  );
}
