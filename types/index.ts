// Service types
export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  included: string[];
  whoItsFor: string[];
  outcomes: {
    title: string;
    description: string;
  }[];
}

// Team types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Performance' | 'Creative';
  bio: string;
  image: string;
  linkedin?: string;
}

// Blog types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  author: {
    name: string;
    image: string;
  };
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  logo?: string;
  image?: string;
}

// Process step types
export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Form types
export interface FormState {
  name: string;
  email: string;
  company: string;
  website: string;
  adSpend: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  adSpend?: string;
  message?: string;
}

// Stat types
export interface Stat {
  value: string;
  label: string;
}

// Accordion types
export interface AccordionItemType {
  id: string;
  question: string;
  answer: string;
}
