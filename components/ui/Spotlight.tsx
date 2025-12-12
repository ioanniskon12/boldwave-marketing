'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

const SpotlightOverlay = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  inset: 0;
  background: radial-gradient(
    150px circle at ${({ $x }) => $x}px ${({ $y }) => $y}px,
    rgba(139, 69, 180, 0.15),
    transparent 60%
  );
  pointer-events: none;
  z-index: 9998;
`;

const SpotlightGlow = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.3) 0%, transparent 70%);
  filter: blur(15px);
  left: ${({ $x }) => $x - 25}px;
  top: ${({ $y }) => $y - 25}px;
  pointer-events: none;
  z-index: 9998;
`;

export default function Spotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SpotlightOverlay $x={mousePos.x} $y={mousePos.y} />
      <SpotlightGlow $x={mousePos.x} $y={mousePos.y} />
    </>
  );
}
