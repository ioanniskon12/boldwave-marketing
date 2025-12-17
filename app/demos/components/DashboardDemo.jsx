'use client';

import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ============================================
// THEME DEFINITIONS
// ============================================
const themes = {
  'social-media-saas': {
    name: 'Social Media SaaS',
    light: {
      // Backgrounds
      bg: '#f8fafc',
      bgSecondary: '#ffffff',
      bgTertiary: '#f1f5f9',
      sidebar: '#ffffff',
      sidebarHover: '#f8fafc',
      card: '#ffffff',
      cardHover: '#f8fafc',
      // Borders
      border: '#e2e8f0',
      borderLight: '#f1f5f9',
      // Text
      text: '#0f172a',
      textSecondary: '#64748b',
      textMuted: '#94a3b8',
      // Colors
      primary: '#6366f1',
      primaryLight: '#eef2ff',
      primaryDark: '#4f46e5',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      success: '#10b981',
      successLight: '#d1fae5',
      warning: '#f59e0b',
      warningLight: '#fef3c7',
      danger: '#ef4444',
      dangerLight: '#fee2e2',
      info: '#0ea5e9',
      infoLight: '#e0f2fe',
      // Gradients
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      // Shadows
      shadow: '0 1px 3px rgba(0,0,0,0.1)',
      shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1)',
      shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1)',
    },
    dark: {
      // Backgrounds
      bg: '#0f172a',
      bgSecondary: '#1e293b',
      bgTertiary: '#334155',
      sidebar: '#1e293b',
      sidebarHover: '#334155',
      card: '#1e293b',
      cardHover: '#334155',
      // Borders
      border: '#334155',
      borderLight: '#475569',
      // Text
      text: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      // Colors
      primary: '#818cf8',
      primaryLight: '#312e81',
      primaryDark: '#a5b4fc',
      secondary: '#a78bfa',
      accent: '#f472b6',
      success: '#34d399',
      successLight: '#064e3b',
      warning: '#fbbf24',
      warningLight: '#78350f',
      danger: '#f87171',
      dangerLight: '#7f1d1d',
      info: '#38bdf8',
      infoLight: '#0c4a6e',
      // Gradients
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      // Shadows
      shadow: '0 1px 3px rgba(0,0,0,0.3)',
      shadowMd: '0 4px 6px -1px rgba(0,0,0,0.3)',
      shadowLg: '0 10px 15px -3px rgba(0,0,0,0.3)',
    },
  },
  'owl-marketing': {
    name: 'Owl Marketing',
    light: {
      bg: '#faf8f5',
      bgSecondary: '#ffffff',
      bgTertiary: '#f5f1eb',
      sidebar: '#ffffff',
      sidebarHover: '#faf8f5',
      card: '#ffffff',
      cardHover: '#faf8f5',
      border: '#e8e4de',
      borderLight: '#f5f1eb',
      text: '#1a1a1a',
      textSecondary: '#666666',
      textMuted: '#999999',
      primary: '#ff8c42',
      primaryLight: '#fff5ee',
      primaryDark: '#e67a35',
      secondary: '#1a1a1a',
      accent: '#ff6b35',
      success: '#22c55e',
      successLight: '#dcfce7',
      warning: '#eab308',
      warningLight: '#fef9c3',
      danger: '#dc2626',
      dangerLight: '#fee2e2',
      info: '#3b82f6',
      infoLight: '#dbeafe',
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
      shadow: '0 1px 3px rgba(0,0,0,0.08)',
      shadowMd: '0 4px 6px -1px rgba(0,0,0,0.08)',
      shadowLg: '0 10px 15px -3px rgba(0,0,0,0.08)',
    },
    dark: {
      bg: '#0a0a0f',
      bgSecondary: '#141419',
      bgTertiary: '#1e1e26',
      sidebar: '#141419',
      sidebarHover: '#1e1e26',
      card: '#1e1e26',
      cardHover: '#28282f',
      border: '#2e2e38',
      borderLight: '#3a3a44',
      text: '#ffffff',
      textSecondary: '#9ca3af',
      textMuted: '#6b7280',
      primary: '#ff9f5a',
      primaryLight: '#2a1f17',
      primaryDark: '#ffb380',
      secondary: '#ffffff',
      accent: '#ff7a45',
      success: '#4ade80',
      successLight: '#14532d',
      warning: '#facc15',
      warningLight: '#713f12',
      danger: '#f87171',
      dangerLight: '#7f1d1d',
      info: '#60a5fa',
      infoLight: '#1e3a5f',
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
      shadow: '0 1px 3px rgba(0,0,0,0.4)',
      shadowMd: '0 4px 6px -1px rgba(0,0,0,0.4)',
      shadowLg: '0 10px 15px -3px rgba(0,0,0,0.4)',
    },
  },
};

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// ============================================
// LAYOUT COMPONENTS
// ============================================
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f1f5f9;
`;

const ControlsBar = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ThemeSwitcher = styled.div`
  display: flex;
  gap: 8px;
`;

const ThemeButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  border: 2px solid ${({ $isActive, $primary }) => $isActive ? $primary : '#e2e8f0'};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive, $primary }) => $isActive ? $primary : '#ffffff'};
  color: ${({ $isActive }) => $isActive ? '#ffffff' : '#64748b'};

  &:hover {
    border-color: ${({ $primary }) => $primary};
    color: ${({ $isActive, $primary }) => $isActive ? '#ffffff' : $primary};
  }
`;

const DashboardsContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ModeSection = styled.div`
  animation: ${fadeIn} 0.5s ease;
`;

const ModeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ModeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: ${({ $gradient }) => $gradient};
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
`;

// ============================================
// DASHBOARD FRAME
// ============================================
const DashboardFrame = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ $shadow }) => $shadow};
`;

const DashboardLayout = styled.div`
  display: flex;
  min-height: 700px;
`;

// ============================================
// SIDEBAR
// ============================================
const Sidebar = styled.aside`
  width: 260px;
  background: ${({ $bg }) => $bg};
  border-right: 1px solid ${({ $border }) => $border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ $border }) => $border};
`;

const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
`;

const LogoText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: 24px;
`;

const NavLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $color }) => $color};
  margin-bottom: 8px;
  padding: 0 12px;
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: ${({ $isActive, $primaryLight, $hover }) => $isActive ? $primaryLight : 'transparent'};
  color: ${({ $isActive, $primary, $text }) => $isActive ? $primary : $text};
  font-size: 14px;
  font-weight: ${({ $isActive }) => $isActive ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  margin-bottom: 4px;

  &:hover {
    background: ${({ $isActive, $primaryLight, $hover }) => $isActive ? $primaryLight : $hover};
  }

  svg {
    width: 20px;
    height: 20px;
    opacity: ${({ $isActive }) => $isActive ? 1 : 0.7};
  }
`;

const NavBadge = styled.span`
  margin-left: auto;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
`;

const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ $border }) => $border};
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: ${({ $bg }) => $bg};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $color }) => $color};
`;

const UserRole = styled.div`
  font-size: 12px;
  color: ${({ $color }) => $color};
`;

// ============================================
// MAIN CONTENT
// ============================================
const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TopBar = styled.header`
  background: ${({ $bg }) => $bg};
  border-bottom: 1px solid ${({ $border }) => $border};
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ $color }) => $color};
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${({ $border }) => $border};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${({ $hover }) => $hover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const PrimaryButton = styled.button`
  padding: 10px 20px;
  background: ${({ $gradient }) => $gradient};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// ============================================
// CONTENT AREA
// ============================================
const ContentArea = styled.main`
  flex: 1;
  padding: 24px;
  background: ${({ $bg }) => $bg};
  overflow-y: auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// ============================================
// STATS CARDS
// ============================================
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const StatCard = styled.div`
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 16px;
  padding: 20px;
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.5s ease;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $shadow }) => $shadow};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StatIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${({ $color }) => $color};
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: ${({ $color }) => $color};
  font-weight: 500;
`;

// ============================================
// CHART CARD
// ============================================
const Card = styled.div`
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 16px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ $border }) => $border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TabButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive, $primary }) => $isActive ? $primary : 'transparent'};
  color: ${({ $isActive, $text }) => $isActive ? '#ffffff' : $text};

  &:hover {
    background: ${({ $isActive, $primary, $hover }) => $isActive ? $primary : $hover};
  }
`;

const CardBody = styled.div`
  padding: 20px;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  border-radius: 12px;
  background: ${({ $gradient }) => $gradient};
  opacity: 0.1;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: inherit;
    opacity: 0.8;
    clip-path: polygon(0 100%, 5% 70%, 15% 50%, 25% 65%, 35% 30%, 45% 45%, 55% 25%, 65% 40%, 75% 20%, 85% 35%, 95% 15%, 100% 25%, 100% 100%);
  }
`;

// ============================================
// ACTIVITY LIST
// ============================================
const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ $border }) => $border};
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $hover }) => $hover};
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActivityTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  margin-bottom: 4px;
`;

const ActivityDesc = styled.div`
  font-size: 13px;
  color: ${({ $color }) => $color};
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;

// ============================================
// QUICK ACTIONS
// ============================================
const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 20px;
`;

const QuickActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $hover }) => $hover};
    border-color: ${({ $primary }) => $primary};
    transform: translateY(-2px);
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${({ $primary }) => $primary};
  }
`;

const QuickActionLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};
`;

// ============================================
// UPCOMING POSTS
// ============================================
const PostsList = styled.div`
  padding: 0 20px 20px;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ $bg }) => $bg};
  border-radius: 12px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PostPlatform = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const PostInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const PostTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: ${({ $color }) => $color};
`;

const PostStatus = styled.span`
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

// ============================================
// ICONS
// ============================================
const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ContentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const MediaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const TeamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

const TrendingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ============================================
// DEMO DATA
// ============================================
const stats = [
  {
    label: 'Total Followers',
    value: '24.8K',
    change: '+12.5%',
    isPositive: true,
    icon: <UsersIcon />,
  },
  {
    label: 'Engagement Rate',
    value: '4.2%',
    change: '+8.3%',
    isPositive: true,
    icon: <HeartIcon />,
  },
  {
    label: 'Impressions',
    value: '156K',
    change: '+23.1%',
    isPositive: true,
    icon: <EyeIcon />,
  },
  {
    label: 'Post Reach',
    value: '89.2K',
    change: '-2.4%',
    isPositive: false,
    icon: <TrendingIcon />,
  },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, badge: null },
  { id: 'calendar', label: 'Calendar', icon: <CalendarIcon />, badge: null },
  { id: 'content', label: 'Content', icon: <ContentIcon />, badge: '12' },
  { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, badge: null },
  { id: 'media', label: 'Media Library', icon: <MediaIcon />, badge: null },
  { id: 'team', label: 'Team', icon: <TeamIcon />, badge: null },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, badge: null },
];

const activities = [
  {
    title: 'Post published successfully',
    desc: 'Your Instagram post is now live',
    time: '2 min ago',
    type: 'success',
  },
  {
    title: 'New comment received',
    desc: 'John Doe commented on your post',
    time: '15 min ago',
    type: 'info',
  },
  {
    title: 'Scheduled post ready',
    desc: 'Facebook post scheduled for 3:00 PM',
    time: '1 hour ago',
    type: 'warning',
  },
];

const upcomingPosts = [
  { title: 'Product Launch Announcement', platform: 'instagram', time: 'Today, 3:00 PM', status: 'scheduled' },
  { title: 'Weekly Tips Thread', platform: 'twitter', time: 'Tomorrow, 10:00 AM', status: 'draft' },
  { title: 'Behind the Scenes', platform: 'facebook', time: 'Dec 20, 2:00 PM', status: 'scheduled' },
];

// ============================================
// DASHBOARD COMPONENT
// ============================================
function Dashboard({ theme, mode, projectName }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeChart, setActiveChart] = useState('week');

  const getLogoInitial = () => {
    if (projectName.includes('Social')) return 'SM';
    if (projectName.includes('Owl')) return 'OM';
    return 'D';
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <InstagramIcon />;
      case 'facebook': return <FacebookIcon />;
      case 'twitter': return <TwitterIcon />;
      case 'linkedin': return <LinkedInIcon />;
      default: return <ContentIcon />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return '#e4405f';
      case 'facebook': return '#1877f2';
      case 'twitter': return '#1da1f2';
      case 'linkedin': return '#0a66c2';
      default: return theme.primary;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <CheckIcon />;
      case 'warning': return <ClockIcon />;
      case 'info': return <BellIcon />;
      default: return <BellIcon />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'success': return { bg: theme.successLight, color: theme.success };
      case 'warning': return { bg: theme.warningLight, color: theme.warning };
      case 'info': return { bg: theme.infoLight, color: theme.info };
      default: return { bg: theme.primaryLight, color: theme.primary };
    }
  };

  return (
    <DashboardFrame $bg={theme.bgSecondary} $border={theme.border} $shadow={theme.shadowLg}>
      <DashboardLayout>
        {/* Sidebar */}
        <Sidebar $bg={theme.sidebar} $border={theme.border}>
          <SidebarHeader $border={theme.border}>
            <SidebarLogo>
              <LogoIcon $gradient={theme.gradient}>{getLogoInitial()}</LogoIcon>
              <LogoText $color={theme.text}>{projectName}</LogoText>
            </SidebarLogo>
          </SidebarHeader>

          <SidebarNav>
            <NavSection>
              <NavLabel $color={theme.textMuted}>Main Menu</NavLabel>
              {navItems.slice(0, 5).map((item) => (
                <NavItem
                  key={item.id}
                  $isActive={activeNav === item.id}
                  $text={theme.textSecondary}
                  $primary={theme.primary}
                  $primaryLight={theme.primaryLight}
                  $hover={theme.sidebarHover}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <NavBadge $bg={theme.primary} $color="#ffffff">
                      {item.badge}
                    </NavBadge>
                  )}
                </NavItem>
              ))}
            </NavSection>

            <NavSection>
              <NavLabel $color={theme.textMuted}>Settings</NavLabel>
              {navItems.slice(5).map((item) => (
                <NavItem
                  key={item.id}
                  $isActive={activeNav === item.id}
                  $text={theme.textSecondary}
                  $primary={theme.primary}
                  $primaryLight={theme.primaryLight}
                  $hover={theme.sidebarHover}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.icon}
                  {item.label}
                </NavItem>
              ))}
            </NavSection>
          </SidebarNav>

          <SidebarFooter $border={theme.border}>
            <UserCard $bg={theme.bgTertiary}>
              <UserAvatar $gradient={theme.gradient}>JD</UserAvatar>
              <UserInfo>
                <UserName $color={theme.text}>John Doe</UserName>
                <UserRole $color={theme.textMuted}>Admin</UserRole>
              </UserInfo>
            </UserCard>
          </SidebarFooter>
        </Sidebar>

        {/* Main Area */}
        <MainArea>
          <TopBar $bg={theme.bgSecondary} $border={theme.border}>
            <TopBarLeft>
              <PageTitle $color={theme.text}>Dashboard</PageTitle>
              <Breadcrumb $color={theme.textMuted}>
                Home / Dashboard
              </Breadcrumb>
            </TopBarLeft>
            <TopBarRight>
              <IconButton
                $bg={theme.bgSecondary}
                $border={theme.border}
                $color={theme.textSecondary}
                $hover={theme.bgTertiary}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                $bg={theme.bgSecondary}
                $border={theme.border}
                $color={theme.textSecondary}
                $hover={theme.bgTertiary}
              >
                <BellIcon />
                <NotificationDot $color={theme.danger} />
              </IconButton>
              <PrimaryButton $gradient={theme.gradient}>
                <PlusIcon />
                Create Post
              </PrimaryButton>
            </TopBarRight>
          </TopBar>

          <ContentArea $bg={theme.bg}>
            <ContentGrid>
              <MainContent>
                {/* Stats Grid */}
                <StatsGrid>
                  {stats.map((stat, index) => (
                    <StatCard
                      key={index}
                      $bg={theme.card}
                      $border={theme.border}
                      $shadow={theme.shadowMd}
                      $delay={`${index * 0.1}s`}
                    >
                      <StatHeader>
                        <StatIconWrapper
                          $bg={theme.primaryLight}
                          $color={theme.primary}
                        >
                          {stat.icon}
                        </StatIconWrapper>
                        <StatChange
                          $bg={stat.isPositive ? theme.successLight : theme.dangerLight}
                          $color={stat.isPositive ? theme.success : theme.danger}
                        >
                          {stat.isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                          {stat.change}
                        </StatChange>
                      </StatHeader>
                      <StatValue $color={theme.text}>{stat.value}</StatValue>
                      <StatLabel $color={theme.textSecondary}>{stat.label}</StatLabel>
                    </StatCard>
                  ))}
                </StatsGrid>

                {/* Chart Card */}
                <Card $bg={theme.card} $border={theme.border}>
                  <CardHeader $border={theme.border}>
                    <CardTitle $color={theme.text}>Performance Overview</CardTitle>
                    <CardActions>
                      {['week', 'month', 'year'].map((period) => (
                        <TabButton
                          key={period}
                          $isActive={activeChart === period}
                          $primary={theme.primary}
                          $text={theme.textSecondary}
                          $hover={theme.bgTertiary}
                          onClick={() => setActiveChart(period)}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </TabButton>
                      ))}
                    </CardActions>
                  </CardHeader>
                  <CardBody>
                    <ChartPlaceholder $gradient={theme.gradient} />
                  </CardBody>
                </Card>
              </MainContent>

              <SideContent>
                {/* Quick Actions */}
                <Card $bg={theme.card} $border={theme.border}>
                  <CardHeader $border={theme.border}>
                    <CardTitle $color={theme.text}>Quick Actions</CardTitle>
                  </CardHeader>
                  <QuickActionsGrid>
                    <QuickActionButton
                      $bg={theme.bgSecondary}
                      $border={theme.border}
                      $hover={theme.bgTertiary}
                      $primary={theme.primary}
                    >
                      <EditIcon />
                      <QuickActionLabel $color={theme.text}>New Post</QuickActionLabel>
                    </QuickActionButton>
                    <QuickActionButton
                      $bg={theme.bgSecondary}
                      $border={theme.border}
                      $hover={theme.bgTertiary}
                      $primary={theme.primary}
                    >
                      <CalendarIcon />
                      <QuickActionLabel $color={theme.text}>Schedule</QuickActionLabel>
                    </QuickActionButton>
                    <QuickActionButton
                      $bg={theme.bgSecondary}
                      $border={theme.border}
                      $hover={theme.bgTertiary}
                      $primary={theme.primary}
                    >
                      <AnalyticsIcon />
                      <QuickActionLabel $color={theme.text}>Analytics</QuickActionLabel>
                    </QuickActionButton>
                    <QuickActionButton
                      $bg={theme.bgSecondary}
                      $border={theme.border}
                      $hover={theme.bgTertiary}
                      $primary={theme.primary}
                    >
                      <MediaIcon />
                      <QuickActionLabel $color={theme.text}>Media</QuickActionLabel>
                    </QuickActionButton>
                  </QuickActionsGrid>
                </Card>

                {/* Recent Activity */}
                <Card $bg={theme.card} $border={theme.border}>
                  <CardHeader $border={theme.border}>
                    <CardTitle $color={theme.text}>Recent Activity</CardTitle>
                  </CardHeader>
                  <ActivityList>
                    {activities.map((activity, index) => {
                      const colors = getActivityColor(activity.type);
                      return (
                        <ActivityItem
                          key={index}
                          $border={theme.border}
                          $hover={theme.bgTertiary}
                        >
                          <ActivityIcon $bg={colors.bg} $color={colors.color}>
                            {getActivityIcon(activity.type)}
                          </ActivityIcon>
                          <ActivityContent>
                            <ActivityTitle $color={theme.text}>{activity.title}</ActivityTitle>
                            <ActivityDesc $color={theme.textSecondary}>{activity.desc}</ActivityDesc>
                          </ActivityContent>
                          <ActivityTime $color={theme.textMuted}>{activity.time}</ActivityTime>
                        </ActivityItem>
                      );
                    })}
                  </ActivityList>
                </Card>

                {/* Upcoming Posts */}
                <Card $bg={theme.card} $border={theme.border}>
                  <CardHeader $border={theme.border}>
                    <CardTitle $color={theme.text}>Upcoming Posts</CardTitle>
                  </CardHeader>
                  <PostsList>
                    {upcomingPosts.map((post, index) => (
                      <PostItem key={index} $bg={theme.bgTertiary}>
                        <PostPlatform
                          $bg={`${getPlatformColor(post.platform)}20`}
                          $color={getPlatformColor(post.platform)}
                        >
                          {getPlatformIcon(post.platform)}
                        </PostPlatform>
                        <PostInfo>
                          <PostTitle $color={theme.text}>{post.title}</PostTitle>
                          <PostMeta $color={theme.textMuted}>{post.time}</PostMeta>
                        </PostInfo>
                        <PostStatus
                          $bg={post.status === 'scheduled' ? theme.successLight : theme.warningLight}
                          $color={post.status === 'scheduled' ? theme.success : theme.warning}
                        >
                          {post.status}
                        </PostStatus>
                      </PostItem>
                    ))}
                  </PostsList>
                </Card>
              </SideContent>
            </ContentGrid>
          </ContentArea>
        </MainArea>
      </DashboardLayout>
    </DashboardFrame>
  );
}

// ============================================
// MAIN EXPORT
// ============================================
export default function DashboardDemoPage() {
  const [activeTheme, setActiveTheme] = useState('social-media-saas');

  const lightTheme = themes[activeTheme].light;
  const darkTheme = themes[activeTheme].dark;
  const projectName = themes[activeTheme].name;

  return (
    <PageWrapper>
      <ControlsBar>
        <ControlGroup>
          <ControlLabel>Theme:</ControlLabel>
          <ThemeSwitcher>
            {Object.keys(themes).map((key) => (
              <ThemeButton
                key={key}
                $isActive={activeTheme === key}
                $primary={themes[key].light.primary}
                onClick={() => setActiveTheme(key)}
              >
                {themes[key].name}
              </ThemeButton>
            ))}
          </ThemeSwitcher>
        </ControlGroup>
      </ControlsBar>

      <DashboardsContainer>
        {/* Light Mode */}
        <ModeSection>
          <ModeHeader>
            <ModeBadge $gradient={lightTheme.gradient}>
              <SunIcon /> Light Mode
            </ModeBadge>
          </ModeHeader>
          <Dashboard theme={lightTheme} mode="light" projectName={projectName} />
        </ModeSection>

        {/* Dark Mode */}
        <ModeSection>
          <ModeHeader>
            <ModeBadge $gradient={darkTheme.gradient}>
              <MoonIcon /> Dark Mode
            </ModeBadge>
          </ModeHeader>
          <Dashboard theme={darkTheme} mode="dark" projectName={projectName} />
        </ModeSection>
      </DashboardsContainer>
    </PageWrapper>
  );
}
