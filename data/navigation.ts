import { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
];

export const footerNavigation = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Paid Social', href: '/services/paid-social-advertising' },
    { label: 'Search Ads', href: '/services/search-shopping-ads' },
    { label: 'Creative Strategy', href: '/services/creative-strategy' },
    { label: 'CRO', href: '/services/conversion-rate-optimisation' },
  ],
  resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ],
};
