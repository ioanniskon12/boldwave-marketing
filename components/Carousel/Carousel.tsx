'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/theme';

interface CarouselProps {
  items: React.ReactNode[];
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  gap?: number;
}

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselTrack = styled.div`
  overflow: hidden;
`;

const CarouselSlider = styled.div<{
  $translateX: number;
  $gap: number;
}>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  transition: transform 400ms ease;
  transform: translateX(${({ $translateX }) => $translateX}%);
`;

const CarouselItem = styled.div<{
  $itemsPerView: number;
  $gap: number;
}>`
  flex: 0 0
    calc(
      (100% - ${({ $itemsPerView, $gap }) => ($itemsPerView - 1) * $gap}px) /
        ${({ $itemsPerView }) => $itemsPerView}
    );
  min-width: 0;
`;

const ArrowButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'left' ? 'left: -20px;' : 'right: -20px;')}
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 10;

  ${media.lg} {
    display: flex;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.border};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default function Carousel({
  items,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  gap = 24,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItemsPerView, setCurrentItemsPerView] = useState(
    itemsPerView.mobile || 1
  );
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = Math.ceil(items.length / currentItemsPerView);

  const updateItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    if (width >= 1024) {
      setCurrentItemsPerView(itemsPerView.desktop || 4);
    } else if (width >= 768) {
      setCurrentItemsPerView(itemsPerView.tablet || 2);
    } else {
      setCurrentItemsPerView(itemsPerView.mobile || 1);
    }
  }, [itemsPerView]);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [updateItemsPerView]);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const translateX = -currentIndex * (100 + (gap / currentItemsPerView));

  return (
    <CarouselWrapper
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
    >
      {showArrows && (
        <ArrowButton $direction="left" onClick={handlePrev} aria-label="Previous slide">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArrowButton>
      )}

      <CarouselTrack
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselSlider $translateX={translateX} $gap={gap}>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              $itemsPerView={currentItemsPerView}
              $gap={gap}
            >
              {item}
            </CarouselItem>
          ))}
        </CarouselSlider>
      </CarouselTrack>

      {showArrows && (
        <ArrowButton $direction="right" onClick={handleNext} aria-label="Next slide">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArrowButton>
      )}

      {showDots && totalSlides > 1 && (
        <DotsWrapper>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Dot
              key={index}
              $isActive={currentIndex === index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </DotsWrapper>
      )}
    </CarouselWrapper>
  );
}
