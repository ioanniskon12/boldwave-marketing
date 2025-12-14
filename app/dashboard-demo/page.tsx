'use client';

import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Theme definitions for each project
const themes = {
  'dm-automation': {
    name: 'DM Automation',
    light: {
      bg: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#f1f3f5',
      sidebar: '#ffffff',
      card: '#ffffff',
      cardHover: '#f8f9fa',
      border: '#e9ecef',
      text: '#212529',
      textSecondary: '#6c757d',
      textMuted: '#adb5bd',
      primary: '#7c3aed',
      primaryLight: '#ede9fe',
      primaryDark: '#5b21b6',
      secondary: '#06b6d4',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    },
    dark: {
      bg: '#0f0f23',
      bgSecondary: '#1a1a2e',
      bgTertiary: '#16213e',
      sidebar: '#1a1a2e',
      card: '#1a1a2e',
      cardHover: '#16213e',
      border: '#2d2d44',
      text: '#ffffff',
      textSecondary: '#a0aec0',
      textMuted: '#4a5568',
      primary: '#a78bfa',
      primaryLight: '#1e1b4b',
      primaryDark: '#c4b5fd',
      secondary: '#22d3ee',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    },
  },
  'marketing-saas': {
    name: 'Marketing SaaS',
    light: {
      bg: '#ffffff',
      bgSecondary: '#faf8f5',
      bgTertiary: '#f5f1eb',
      sidebar: '#ffffff',
      card: '#ffffff',
      cardHover: '#faf8f5',
      border: '#e8e4de',
      text: '#1a1a1a',
      textSecondary: '#666666',
      textMuted: '#999999',
      primary: '#ff8c42',
      primaryLight: '#fff5ee',
      primaryDark: '#e67a35',
      secondary: '#1a1a1a',
      success: '#22c55e',
      warning: '#eab308',
      danger: '#dc2626',
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%)',
    },
    dark: {
      bg: '#0a0a0f',
      bgSecondary: '#141419',
      bgTertiary: '#1e1e26',
      sidebar: '#141419',
      card: '#1e1e26',
      cardHover: '#28282f',
      border: '#2e2e38',
      text: '#ffffff',
      textSecondary: '#9ca3af',
      textMuted: '#6b7280',
      primary: '#ff9f5a',
      primaryLight: '#2a1f17',
      primaryDark: '#ffb380',
      secondary: '#ffffff',
      success: '#4ade80',
      warning: '#facc15',
      danger: '#f87171',
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%)',
    },
  },
  'ai-video': {
    name: 'AI Video',
    light: {
      bg: '#ffffff',
      bgSecondary: '#f5f7ff',
      bgTertiary: '#eef1ff',
      sidebar: '#ffffff',
      card: '#ffffff',
      cardHover: '#f5f7ff',
      border: '#e2e5f1',
      text: '#1e1e2e',
      textSecondary: '#64748b',
      textMuted: '#94a3b8',
      primary: '#4f46e5',
      primaryLight: '#eef2ff',
      primaryDark: '#3730a3',
      secondary: '#ec4899',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
    },
    dark: {
      bg: '#09090b',
      bgSecondary: '#18181b',
      bgTertiary: '#27272a',
      sidebar: '#18181b',
      card: '#27272a',
      cardHover: '#3f3f46',
      border: '#3f3f46',
      text: '#fafafa',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      primary: '#818cf8',
      primaryLight: '#1e1b4b',
      primaryDark: '#a5b4fc',
      secondary: '#f472b6',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
    },
  },
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Page Layout
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

// Top Controls
const ControlsBar = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const ControlLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const ProjectSwitcher = styled.div`
  display: flex;
  gap: 8px;
`;

const ProjectButton = styled.button<{ $isActive: boolean; $primary: string }>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive, $primary }) => $isActive ? $primary : '#f0f0f0'};
  color: ${({ $isActive }) => $isActive ? '#ffffff' : '#666'};

  &:hover {
    background: ${({ $isActive, $primary }) => $isActive ? $primary : '#e5e5e5'};
  }
`;

// Dashboards Container
const DashboardsContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

// Mode Label
const ModeLabel = styled.div<{ $isDark?: boolean }>`
  text-align: center;
  margin-bottom: 16px;
`;

const ModeLabelText = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 14px;
  font-weight: 700;
  border-radius: 20px;
`;

// Dashboard Frame - Max Width 1200px
const DashboardFrame = styled.div<{ $bg: string; $border: string }>`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
`;

// Dashboard Layout
const DashboardLayout = styled.div`
  display: flex;
  min-height: 600px;
`;

// Sidebar
const Sidebar = styled.aside<{ $bg: string; $border: string }>`
  width: 220px;
  background: ${({ $bg }) => $bg};
  border-right: 1px solid ${({ $border }) => $border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div<{ $border: string }>`
  padding: 16px;
  border-bottom: 1px solid ${({ $border }) => $border};
`;

const SidebarLogo = styled.div<{ $color: string }>`
  font-size: 16px;
  font-weight: 800;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div<{ $gradient: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 16px 10px;
`;

const SidebarLabel = styled.div<{ $color: string }>`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $color }) => $color};
  margin-bottom: 10px;
  padding: 0 10px;
`;

const SidebarItem = styled.button<{ $isActive?: boolean; $text: string; $primary: string; $primaryLight: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: ${({ $isActive, $primaryLight }) => $isActive ? $primaryLight : 'transparent'};
  color: ${({ $isActive, $primary, $text }) => $isActive ? $primary : $text};
  font-size: 13px;
  font-weight: ${({ $isActive }) => $isActive ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${({ $primaryLight }) => $primaryLight};
  }

  svg {
    width: 18px;
    height: 18px;
    opacity: ${({ $isActive }) => $isActive ? 1 : 0.7};
  }
`;

const SidebarBadge = styled.span<{ $primary: string }>`
  margin-left: auto;
  background: ${({ $primary }) => $primary};
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 8px;
`;

// Main Area
const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Top Bar
const TopBar = styled.header<{ $bg: string; $border: string }>`
  background: ${({ $bg }) => $bg};
  border-bottom: 1px solid ${({ $border }) => $border};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopBarTitle = styled.h1<{ $color: string }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TopBarButton = styled.button<{ $bg: string; $color: string }>`
  padding: 6px 12px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Content Area
const ContentArea = styled.main<{ $bg: string }>`
  flex: 1;
  padding: 20px;
  background: ${({ $bg }) => $bg};
  overflow-y: auto;
`;

// Stats Grid
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
`;

const StatCard = styled.div<{ $bg: string; $border: string }>`
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 12px;
  padding: 16px;
  animation: ${fadeIn} 0.5s ease;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StatIcon = styled.div<{ $bg: string; $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const StatChange = styled.span<{ $isPositive: boolean; $success: string; $danger: string }>`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ $isPositive, $success, $danger }) => $isPositive ? $success : $danger};
`;

const StatValue = styled.div<{ $color: string }>`
  font-size: 24px;
  font-weight: 800;
  color: ${({ $color }) => $color};
  margin-bottom: 2px;
`;

const StatLabel = styled.div<{ $color: string }>`
  font-size: 12px;
  color: ${({ $color }) => $color};
`;

// Chart Card
const ChartCard = styled.div<{ $bg: string; $border: string }>`
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 12px;
  padding: 16px;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ChartTitle = styled.h3<{ $color: string }>`
  font-size: 14px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0;
`;

const ChartArea = styled.div<{ $gradient: string }>`
  height: 160px;
  border-radius: 8px;
  background: ${({ $gradient }) => $gradient};
  opacity: 0.15;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: inherit;
    opacity: 0.6;
    clip-path: polygon(0 100%, 5% 80%, 15% 60%, 25% 70%, 35% 40%, 45% 50%, 55% 30%, 65% 45%, 75% 25%, 85% 35%, 95% 15%, 100% 20%, 100% 100%);
  }
`;

// Icons
const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
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

const AnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const CampaignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const AutomationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
    <line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

// Demo Data
const stats = [
  { label: 'Total Users', value: '12,847', change: '+12.5%', isPositive: true, icon: <UsersIcon /> },
  { label: 'Sessions', value: '3,428', change: '+8.2%', isPositive: true, icon: <AnalyticsIcon /> },
  { label: 'Messages', value: '48.2K', change: '+23.1%', isPositive: true, icon: <MessageIcon /> },
  { label: 'Conversion', value: '3.24%', change: '-2.4%', isPositive: false, icon: <CampaignIcon /> },
];

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, badge: null },
  { id: 'inbox', label: 'Inbox', icon: <MessageIcon />, badge: '24' },
  { id: 'automations', label: 'Automations', icon: <AutomationIcon />, badge: null },
  { id: 'contacts', label: 'Contacts', icon: <UsersIcon />, badge: null },
  { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, badge: null },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, badge: null },
];

// Dashboard Component
function Dashboard({ theme, mode, projectName }: { theme: any; mode: string; projectName: string }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getLogoInitial = () => {
    if (projectName.includes('DM')) return 'DM';
    if (projectName.includes('Marketing')) return 'MS';
    if (projectName.includes('AI')) return 'AI';
    return 'D';
  };

  return (
    <DashboardFrame $bg={theme.bg} $border={theme.border}>
      <DashboardLayout>
        {/* Sidebar */}
        <Sidebar $bg={theme.sidebar} $border={theme.border}>
          <SidebarHeader $border={theme.border}>
            <SidebarLogo $color={theme.text}>
              <LogoIcon $gradient={theme.gradient}>{getLogoInitial()}</LogoIcon>
              {projectName}
            </SidebarLogo>
          </SidebarHeader>

          <SidebarNav>
            <SidebarLabel $color={theme.textMuted}>Menu</SidebarLabel>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.id}
                $isActive={activeTab === item.id}
                $text={theme.textSecondary}
                $primary={theme.primary}
                $primaryLight={theme.primaryLight}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                {item.label}
                {item.badge && <SidebarBadge $primary={theme.primary}>{item.badge}</SidebarBadge>}
              </SidebarItem>
            ))}
          </SidebarNav>
        </Sidebar>

        {/* Main Area */}
        <MainArea>
          <TopBar $bg={theme.sidebar} $border={theme.border}>
            <TopBarTitle $color={theme.text}>Dashboard</TopBarTitle>
            <TopBarRight>
              <TopBarButton $bg={theme.bgTertiary} $color={theme.textSecondary}>
                Export
              </TopBarButton>
              <TopBarButton $bg={theme.primary} $color="#ffffff">
                + Create
              </TopBarButton>
            </TopBarRight>
          </TopBar>

          <ContentArea $bg={theme.bg}>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard key={index} $bg={theme.card} $border={theme.border}>
                  <StatHeader>
                    <StatIcon $bg={theme.primaryLight} $color={theme.primary}>
                      {stat.icon}
                    </StatIcon>
                    <StatChange $isPositive={stat.isPositive} $success={theme.success} $danger={theme.danger}>
                      {stat.isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      {stat.change}
                    </StatChange>
                  </StatHeader>
                  <StatValue $color={theme.text}>{stat.value}</StatValue>
                  <StatLabel $color={theme.textSecondary}>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>

            <ChartCard $bg={theme.card} $border={theme.border}>
              <ChartHeader>
                <ChartTitle $color={theme.text}>Performance Overview</ChartTitle>
              </ChartHeader>
              <ChartArea $gradient={theme.gradient} />
            </ChartCard>
          </ContentArea>
        </MainArea>
      </DashboardLayout>
    </DashboardFrame>
  );
}

export default function DashboardDemoPage() {
  const [activeProject, setActiveProject] = useState<'dm-automation' | 'marketing-saas' | 'ai-video'>('dm-automation');

  const lightTheme = themes[activeProject].light;
  const darkTheme = themes[activeProject].dark;
  const projectName = themes[activeProject].name;

  return (
    <PageWrapper>
      {/* Top Controls */}
      <ControlsBar>
        <ControlLabel>Select Project:</ControlLabel>
        <ProjectSwitcher>
          {(Object.keys(themes) as Array<'dm-automation' | 'marketing-saas' | 'ai-video'>).map((key) => (
            <ProjectButton
              key={key}
              $isActive={activeProject === key}
              $primary={themes[key].light.primary}
              onClick={() => setActiveProject(key)}
            >
              {themes[key].name}
            </ProjectButton>
          ))}
        </ProjectSwitcher>
      </ControlsBar>

      <DashboardsContainer>
        {/* Light Mode Dashboard */}
        <div>
          <ModeLabel>
            <ModeLabelText $bg={lightTheme.primary} $color="#ffffff">
              <SunIcon /> Light Mode
            </ModeLabelText>
          </ModeLabel>
          <Dashboard theme={lightTheme} mode="light" projectName={projectName} />
        </div>

        {/* Dark Mode Dashboard */}
        <div>
          <ModeLabel>
            <ModeLabelText $bg={darkTheme.primary} $color="#ffffff">
              <MoonIcon /> Dark Mode
            </ModeLabelText>
          </ModeLabel>
          <Dashboard theme={darkTheme} mode="dark" projectName={projectName} />
        </div>
      </DashboardsContainer>
    </PageWrapper>
  );
}
