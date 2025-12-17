'use client';

import { useState } from 'react';
import styled from 'styled-components';

// ============================================
// COLOR PALETTES
// ============================================
const palettes = {
  'social-media-saas': {
    name: 'Social Media SaaS',
    light: {
      backgrounds: [
        { name: 'Background', value: '#f8fafc', desc: 'Main page background' },
        { name: 'Surface', value: '#ffffff', desc: 'Cards, modals, sidebar' },
        { name: 'Elevated', value: '#f1f5f9', desc: 'Hover states, inputs' },
      ],
      borders: [
        { name: 'Border', value: '#e2e8f0', desc: 'Default borders' },
        { name: 'Border Light', value: '#f1f5f9', desc: 'Subtle dividers' },
      ],
      text: [
        { name: 'Primary', value: '#0f172a', desc: 'Headings, important text' },
        { name: 'Secondary', value: '#64748b', desc: 'Body text, labels' },
        { name: 'Muted', value: '#94a3b8', desc: 'Placeholders, hints' },
      ],
      brand: [
        { name: 'Primary', value: '#6366f1', desc: 'Buttons, links, accents' },
        { name: 'Primary Light', value: '#eef2ff', desc: 'Hover backgrounds' },
        { name: 'Primary Dark', value: '#4f46e5', desc: 'Active states' },
        { name: 'Secondary', value: '#8b5cf6', desc: 'Gradients, highlights' },
        { name: 'Accent', value: '#ec4899', desc: 'Special highlights' },
      ],
      semantic: [
        { name: 'Success', value: '#10b981', desc: 'Success states' },
        { name: 'Success Light', value: '#d1fae5', desc: 'Success backgrounds' },
        { name: 'Warning', value: '#f59e0b', desc: 'Warning states' },
        { name: 'Warning Light', value: '#fef3c7', desc: 'Warning backgrounds' },
        { name: 'Danger', value: '#ef4444', desc: 'Error states' },
        { name: 'Danger Light', value: '#fee2e2', desc: 'Error backgrounds' },
        { name: 'Info', value: '#0ea5e9', desc: 'Info states' },
        { name: 'Info Light', value: '#e0f2fe', desc: 'Info backgrounds' },
      ],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    dark: {
      backgrounds: [
        { name: 'Background', value: '#0f172a', desc: 'Main page background' },
        { name: 'Surface', value: '#1e293b', desc: 'Cards, modals, sidebar' },
        { name: 'Elevated', value: '#334155', desc: 'Hover states, inputs' },
      ],
      borders: [
        { name: 'Border', value: '#334155', desc: 'Default borders' },
        { name: 'Border Light', value: '#475569', desc: 'Subtle dividers' },
      ],
      text: [
        { name: 'Primary', value: '#f8fafc', desc: 'Headings, important text' },
        { name: 'Secondary', value: '#94a3b8', desc: 'Body text, labels' },
        { name: 'Muted', value: '#64748b', desc: 'Placeholders, hints' },
      ],
      brand: [
        { name: 'Primary', value: '#818cf8', desc: 'Buttons, links, accents' },
        { name: 'Primary Light', value: '#312e81', desc: 'Hover backgrounds' },
        { name: 'Primary Dark', value: '#a5b4fc', desc: 'Active states' },
        { name: 'Secondary', value: '#a78bfa', desc: 'Gradients, highlights' },
        { name: 'Accent', value: '#f472b6', desc: 'Special highlights' },
      ],
      semantic: [
        { name: 'Success', value: '#34d399', desc: 'Success states' },
        { name: 'Success Light', value: '#064e3b', desc: 'Success backgrounds' },
        { name: 'Warning', value: '#fbbf24', desc: 'Warning states' },
        { name: 'Warning Light', value: '#78350f', desc: 'Warning backgrounds' },
        { name: 'Danger', value: '#f87171', desc: 'Error states' },
        { name: 'Danger Light', value: '#7f1d1d', desc: 'Error backgrounds' },
        { name: 'Info', value: '#38bdf8', desc: 'Info states' },
        { name: 'Info Light', value: '#0c4a6e', desc: 'Info backgrounds' },
      ],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
  },
  'owl-marketing': {
    name: 'Owl Marketing',
    light: {
      backgrounds: [
        { name: 'Background', value: '#faf8f5', desc: 'Main page background' },
        { name: 'Surface', value: '#ffffff', desc: 'Cards, modals, sidebar' },
        { name: 'Elevated', value: '#f5f1eb', desc: 'Hover states, inputs' },
      ],
      borders: [
        { name: 'Border', value: '#e8e4de', desc: 'Default borders' },
        { name: 'Border Light', value: '#f5f1eb', desc: 'Subtle dividers' },
      ],
      text: [
        { name: 'Primary', value: '#1a1a1a', desc: 'Headings, important text' },
        { name: 'Secondary', value: '#666666', desc: 'Body text, labels' },
        { name: 'Muted', value: '#999999', desc: 'Placeholders, hints' },
      ],
      brand: [
        { name: 'Primary', value: '#ff8c42', desc: 'Buttons, links, accents' },
        { name: 'Primary Light', value: '#fff5ee', desc: 'Hover backgrounds' },
        { name: 'Primary Dark', value: '#e67a35', desc: 'Active states' },
        { name: 'Secondary', value: '#1a1a1a', desc: 'Dark accents' },
        { name: 'Accent', value: '#ff6b35', desc: 'Special highlights' },
      ],
      semantic: [
        { name: 'Success', value: '#22c55e', desc: 'Success states' },
        { name: 'Success Light', value: '#dcfce7', desc: 'Success backgrounds' },
        { name: 'Warning', value: '#eab308', desc: 'Warning states' },
        { name: 'Warning Light', value: '#fef9c3', desc: 'Warning backgrounds' },
        { name: 'Danger', value: '#dc2626', desc: 'Error states' },
        { name: 'Danger Light', value: '#fee2e2', desc: 'Error backgrounds' },
        { name: 'Info', value: '#3b82f6', desc: 'Info states' },
        { name: 'Info Light', value: '#dbeafe', desc: 'Info backgrounds' },
      ],
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
    },
    dark: {
      backgrounds: [
        { name: 'Background', value: '#0a0a0f', desc: 'Main page background' },
        { name: 'Surface', value: '#141419', desc: 'Cards, modals, sidebar' },
        { name: 'Elevated', value: '#1e1e26', desc: 'Hover states, inputs' },
      ],
      borders: [
        { name: 'Border', value: '#2e2e38', desc: 'Default borders' },
        { name: 'Border Light', value: '#3a3a44', desc: 'Subtle dividers' },
      ],
      text: [
        { name: 'Primary', value: '#ffffff', desc: 'Headings, important text' },
        { name: 'Secondary', value: '#9ca3af', desc: 'Body text, labels' },
        { name: 'Muted', value: '#6b7280', desc: 'Placeholders, hints' },
      ],
      brand: [
        { name: 'Primary', value: '#ff9f5a', desc: 'Buttons, links, accents' },
        { name: 'Primary Light', value: '#2a1f17', desc: 'Hover backgrounds' },
        { name: 'Primary Dark', value: '#ffb380', desc: 'Active states' },
        { name: 'Secondary', value: '#ffffff', desc: 'Light accents' },
        { name: 'Accent', value: '#ff7a45', desc: 'Special highlights' },
      ],
      semantic: [
        { name: 'Success', value: '#4ade80', desc: 'Success states' },
        { name: 'Success Light', value: '#14532d', desc: 'Success backgrounds' },
        { name: 'Warning', value: '#facc15', desc: 'Warning states' },
        { name: 'Warning Light', value: '#713f12', desc: 'Warning backgrounds' },
        { name: 'Danger', value: '#f87171', desc: 'Error states' },
        { name: 'Danger Light', value: '#7f1d1d', desc: 'Error backgrounds' },
        { name: 'Info', value: '#60a5fa', desc: 'Info states' },
        { name: 'Info Light', value: '#1e3a5f', desc: 'Info backgrounds' },
      ],
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
    },
  },
};

// ============================================
// STYLED COMPONENTS
// ============================================
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f1f5f9;
  padding: 40px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0;
`;

const ThemeSwitcher = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
`;

const ThemeButton = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  border: 2px solid ${({ $isActive, $color }) => $isActive ? $color : '#e2e8f0'};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive, $color }) => $isActive ? $color : '#ffffff'};
  color: ${({ $isActive }) => $isActive ? '#ffffff' : '#64748b'};

  &:hover {
    border-color: ${({ $color }) => $color};
  }
`;

const ModesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const ModeCard = styled.div`
  background: ${({ $bg }) => $bg};
  border-radius: 24px;
  padding: 32px;
  border: 1px solid ${({ $border }) => $border};
`;

const ModeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const ModeIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ModeTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $color }) => $color};
  margin: 0 0 16px 0;
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

const ColorCard = styled.div`
  background: ${({ $cardBg }) => $cardBg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 12px;
  overflow: hidden;
`;

const ColorSwatch = styled.div`
  height: 60px;
  background: ${({ $color }) => $color};
  position: relative;

  &::after {
    content: '${({ $value }) => $value}';
    position: absolute;
    bottom: 6px;
    right: 6px;
    font-size: 10px;
    font-weight: 600;
    color: ${({ $textColor }) => $textColor};
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
`;

const ColorInfo = styled.div`
  padding: 12px;
`;

const ColorName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  margin-bottom: 2px;
`;

const ColorDesc = styled.div`
  font-size: 11px;
  color: ${({ $color }) => $color};
`;

const GradientSection = styled.div`
  margin-top: 28px;
`;

const GradientBar = styled.div`
  height: 80px;
  border-radius: 16px;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const GradientLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const GradientCode = styled.div`
  margin-top: 12px;
  padding: 12px 16px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  color: ${({ $color }) => $color};
  word-break: break-all;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// ============================================
// ICONS
// ============================================
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// ============================================
// HELPER FUNCTIONS
// ============================================
const getContrastColor = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function ColorPalette() {
  const [activeTheme, setActiveTheme] = useState('social-media-saas');
  const palette = palettes[activeTheme];

  const renderColorSection = (title, colors, mode) => {
    const isDark = mode === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const textMuted = isDark ? '#64748b' : '#94a3b8';
    const cardBg = isDark ? palette.dark.backgrounds[1].value : '#ffffff';
    const border = isDark ? palette.dark.borders[0].value : '#e2e8f0';

    return (
      <Section>
        <SectionTitle $color={textMuted}>{title}</SectionTitle>
        <ColorsGrid>
          {colors.map((color, index) => (
            <ColorCard key={index} $cardBg={cardBg} $border={border}>
              <ColorSwatch
                $color={color.value}
                $value={color.value}
                $textColor={getContrastColor(color.value)}
              />
              <ColorInfo>
                <ColorName $color={textColor}>{color.name}</ColorName>
                <ColorDesc $color={textMuted}>{color.desc}</ColorDesc>
              </ColorInfo>
            </ColorCard>
          ))}
        </ColorsGrid>
      </Section>
    );
  };

  const renderMode = (mode) => {
    const data = palette[mode];
    const isDark = mode === 'dark';
    const bg = data.backgrounds[0].value;
    const border = data.borders[0].value;
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const textMuted = isDark ? '#64748b' : '#94a3b8';
    const cardBg = data.backgrounds[1].value;

    return (
      <ModeCard $bg={bg} $border={border}>
        <ModeHeader>
          <ModeIcon $gradient={data.gradient}>
            {isDark ? <MoonIcon /> : <SunIcon />}
          </ModeIcon>
          <ModeTitle $color={textColor}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </ModeTitle>
        </ModeHeader>

        {renderColorSection('Backgrounds', data.backgrounds, mode)}
        {renderColorSection('Borders', data.borders, mode)}
        {renderColorSection('Text', data.text, mode)}
        {renderColorSection('Brand Colors', data.brand, mode)}
        {renderColorSection('Semantic Colors', data.semantic, mode)}

        <GradientSection>
          <SectionTitle $color={textMuted}>Primary Gradient</SectionTitle>
          <GradientBar $gradient={data.gradient}>
            <GradientLabel>Brand Gradient</GradientLabel>
          </GradientBar>
          <GradientCode $bg={cardBg} $border={border} $color={textColor}>
            {data.gradient}
          </GradientCode>
        </GradientSection>
      </ModeCard>
    );
  };

  return (
    <PageWrapper>
      <Header>
        <Title>Color Palette</Title>
        <Subtitle>Complete color system for light and dark modes</Subtitle>
      </Header>

      <ThemeSwitcher>
        {Object.keys(palettes).map((key) => (
          <ThemeButton
            key={key}
            $isActive={activeTheme === key}
            $color={palettes[key].light.brand[0].value}
            onClick={() => setActiveTheme(key)}
          >
            {palettes[key].name}
          </ThemeButton>
        ))}
      </ThemeSwitcher>

      <ModesContainer>
        {renderMode('light')}
        {renderMode('dark')}
      </ModesContainer>
    </PageWrapper>
  );
}
