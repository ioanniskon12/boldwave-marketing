'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { media } from '@/styles/theme';
import Container from './Container';
import Logo from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { mainNavigation } from '@/data/navigation';

const StyledHeader = styled.header<{ $scrolled: boolean; $isLightPage: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background-color: ${({ $isLightPage }) =>
    $isLightPage ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  backdrop-filter: ${({ $isLightPage }) => $isLightPage ? 'blur(20px)' : 'none'};
  -webkit-backdrop-filter: ${({ $isLightPage }) => $isLightPage ? 'blur(20px)' : 'none'};
  box-shadow: ${({ $isLightPage }) =>
    $isLightPage ? '0 1px 20px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: all 0.3s ease;

  ${media.lg} {
    background-color: ${({ $scrolled, $isLightPage }) =>
      ($scrolled || $isLightPage) ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
    backdrop-filter: ${({ $scrolled, $isLightPage }) => (($scrolled || $isLightPage) ? 'blur(20px)' : 'none')};
    -webkit-backdrop-filter: ${({ $scrolled, $isLightPage }) => (($scrolled || $isLightPage) ? 'blur(20px)' : 'none')};
    box-shadow: ${({ $scrolled, $isLightPage }) =>
      ($scrolled || $isLightPage) ? '0 1px 20px rgba(0, 0, 0, 0.08)' : 'none'};
  }
`;

const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 80px;

  ${media.lg} {
    height: 100px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 9999;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

const Nav = styled.nav<{ $isOpen: boolean; $isLightPage: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $isLightPage }) =>
    $isLightPage ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 10, 15, 0.98)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: all 0.3s ease;
  z-index: 9998;

  ${media.lg} {
    position: static;
    width: auto;
    height: auto;
    flex-direction: row;
    background-color: transparent;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean; $scrolled?: boolean; $isLightPage?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isActive, $isLightPage }) =>
    $isActive ? '#ff8c42' : ($isLightPage ? '#1a1a1a' : '#ffffff')};
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background-color: #ff8c42;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ff8c42;

    &::after {
      width: 100%;
    }
  }

  ${media.lg} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ $isActive, $scrolled, $isLightPage }) =>
      $isActive
        ? '#ff8c42'
        : ($isLightPage || $scrolled)
          ? '#1a1a1a'
          : '#ffffff'};
  }
`;

const MobileMenuButton = styled.button<{ $isOpen: boolean; $scrolled: boolean; $isLightPage: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 9999;
  position: relative;

  ${media.lg} {
    display: none;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: ${({ $isLightPage }) =>
      $isLightPage ? '#1a1a1a' : '#ffffff'};
    transition: all 0.3s ease;
    position: absolute;

    &:nth-child(1) {
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(45deg)' : 'translateY(-8px)'};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(-45deg)' : 'translateY(8px)'};
    }
  }
`;

const CTAWrapper = styled.div`
  display: none;

  ${media.lg} {
    display: block;
  }
`;


const MobileCTA = styled.div`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xl};

  ${media.lg} {
    display: none;
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Determine if this is a light-background page (service detail pages and blog posts)
  const isLightPage =
    (pathname?.startsWith('/services/') && pathname !== '/services') ||
    (pathname?.startsWith('/blog/') && pathname !== '/blog');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const filteredNavigation = mainNavigation.filter(
    (item) => item.href !== '/contact'
  );

  return (
    <StyledHeader $scrolled={scrolled} $isLightPage={isLightPage}>
      <Container>
        <HeaderInner>
          <LeftSection>
            <Logo $variant={isLightPage ? 'dark' : 'light'} $scrolled={scrolled} />
          </LeftSection>

          <CenterSection>
            <Nav $isOpen={isOpen} $isLightPage={isLightPage}>
              {filteredNavigation.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  $isActive={pathname === item.href}
                  $scrolled={scrolled}
                  $isLightPage={isLightPage}
                >
                  {item.label}
                </NavLink>
              ))}
              <MobileCTA>
                <AnimatedButton href="/contact" variant="orange">Get in Touch</AnimatedButton>
              </MobileCTA>
            </Nav>
          </CenterSection>

          <RightSection>
            <CTAWrapper>
              <AnimatedButton href="/contact" variant="orange">Contact Us</AnimatedButton>
            </CTAWrapper>
            <MobileMenuButton
              $isOpen={isOpen}
              $scrolled={scrolled}
              $isLightPage={isLightPage}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
              <span />
            </MobileMenuButton>
          </RightSection>
        </HeaderInner>
      </Container>
    </StyledHeader>
  );
}
