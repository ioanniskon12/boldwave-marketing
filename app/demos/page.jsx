'use client';

import { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { media } from '@/styles/theme';

// Dynamically import demo components to reduce initial bundle
const StyleShowcase = dynamic(() => import('./components/StyleShowcase'), { ssr: false });
const DashboardDemo = dynamic(() => import('./components/DashboardDemo'), { ssr: false });
const ServicesDemo = dynamic(() => import('./components/ServicesDemo'), { ssr: false });
const WorkProcessDemo = dynamic(() => import('./components/WorkProcessDemo'), { ssr: false });

// ============================================
// STYLED COMPONENTS
// ============================================
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0f;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px;

  ${media.lg} {
    padding: 20px 40px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: ${({ $isActive }) => $isActive ? 'linear-gradient(135deg, #ff8c42, #ff6b35)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $isActive }) => $isActive ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $isActive }) => $isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $isActive }) => $isActive ? 'linear-gradient(135deg, #ff8c42, #ff6b35)' : 'rgba(255, 255, 255, 0.1)'};
    color: #ffffff;
  }
`;

const TabIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${({ $isActive }) => $isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 140, 66, 0.2)'};
  border-radius: 6px;
  font-size: 12px;
`;

const TabInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TabName = styled.span`
  font-weight: 600;
`;

const TabDesc = styled.span`
  font-size: 11px;
  opacity: 0.7;
  display: none;

  ${media.md} {
    display: block;
  }
`;

const ContentArea = styled.div`
  min-height: calc(100vh - 120px);
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
`;

// ============================================
// TABS DATA
// ============================================
const tabs = [
  {
    id: 'style-showcase',
    name: 'Style Showcase',
    description: 'Hero backgrounds, buttons, colors',
    icon: '🎨',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'UI themes for SaaS apps',
    icon: '📊',
  },
  {
    id: 'services',
    name: 'Services Page',
    description: 'Full page layout design',
    icon: '📄',
  },
  {
    id: 'work-process',
    name: 'Work Process',
    description: '3 timeline design options',
    icon: '⚡',
  },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function DemosPage() {
  const [activeTab, setActiveTab] = useState('style-showcase');

  const renderContent = () => {
    switch (activeTab) {
      case 'style-showcase':
        return <StyleShowcase />;
      case 'dashboard':
        return <DashboardDemo />;
      case 'services':
        return <ServicesDemo />;
      case 'work-process':
        return <WorkProcessDemo />;
      default:
        return <LoadingState>Select a demo to view</LoadingState>;
    }
  };

  return (
    <PageWrapper>
      <Header>
        <HeaderContent>
          <HeaderTop>
            <Logo>
              <LogoIcon>
                <img src="/owl.svg" alt="Owl" width="24" height="24" />
              </LogoIcon>
              <LogoText>Demo Gallery</LogoText>
            </Logo>
            <BackLink href="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Site
            </BackLink>
          </HeaderTop>

          <TabsContainer>
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                $isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <TabIcon $isActive={activeTab === tab.id}>{tab.icon}</TabIcon>
                <TabInfo>
                  <TabName>{tab.name}</TabName>
                  <TabDesc>{tab.description}</TabDesc>
                </TabInfo>
              </Tab>
            ))}
          </TabsContainer>
        </HeaderContent>
      </Header>

      <ContentArea>
        {renderContent()}
      </ContentArea>
    </PageWrapper>
  );
}
