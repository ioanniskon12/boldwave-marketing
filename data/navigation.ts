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
    { label: 'Social Media Management', href: '/services/social-media-management' },
    { label: 'Paid Advertising', href: '/services/paid-advertising' },
    { label: 'Content Creation', href: '/services/content-creation' },
    { label: 'Branding & Creative', href: '/services/branding-creative-direction' },
    { label: 'Website Development', href: '/services/website-development' },
    { label: 'Email Marketing', href: '/services/email-marketing' },
  ],
  resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ],
};
