export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  services: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  image: string;
  galleryImages?: string[];
  logo?: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-fashion-brand',
    client: 'StyleVerse',
    industry: 'E-commerce / Fashion',
    title: 'Scaling a Fashion Brand from $50K to $500K Monthly Revenue',
    description: 'How we helped StyleVerse achieve 10x revenue growth through strategic paid social and creative optimization.',
    challenge: 'StyleVerse was struggling with high customer acquisition costs and plateauing growth. Their ROAS had dropped to 1.5x and they were unable to scale profitably beyond $50K/month in ad spend.',
    solution: 'We implemented a full-funnel strategy with creative testing at scale, audience segmentation, and conversion rate optimization. Our team produced over 50 new creatives in the first month and rebuilt their Meta and Google campaigns from scratch.',
    results: [
      { metric: 'Revenue Growth', value: '10x', description: 'Monthly revenue increased from $50K to $500K' },
      { metric: 'ROAS', value: '3.8x', description: 'Return on ad spend improved by 153%' },
      { metric: 'CAC Reduction', value: '-42%', description: 'Customer acquisition cost decreased significantly' },
      { metric: 'Conversion Rate', value: '+67%', description: 'Website conversion rate improvement' },
    ],
    services: ['Paid Social', 'Creative Strategy', 'CRO', 'Google Ads'],
    testimonial: {
      quote: 'OwlMarketingHub transformed our business. Their strategic approach and creative excellence helped us achieve growth we never thought possible.',
      author: 'Sarah Mitchell',
      role: 'CEO, StyleVerse',
    },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'saas-platform-growth',
    client: 'CloudMetrics',
    industry: 'SaaS / Technology',
    title: 'Driving 300% Growth in Qualified Leads for B2B SaaS',
    description: 'A comprehensive digital strategy that tripled qualified leads while reducing cost per acquisition by 45%.',
    challenge: 'CloudMetrics had a complex B2B sales cycle and was struggling to generate quality leads at scale. Their previous agency focused on vanity metrics without delivering actual pipeline growth.',
    solution: 'We developed a multi-channel approach combining LinkedIn Ads, Google Search, and content marketing. Our team created targeted campaigns for each stage of the buyer journey with specific conversion goals.',
    results: [
      { metric: 'Qualified Leads', value: '+300%', description: 'Triple the number of sales-qualified leads' },
      { metric: 'Cost Per Lead', value: '-45%', description: 'Significant reduction in acquisition costs' },
      { metric: 'Pipeline Value', value: '$2.4M', description: 'New pipeline generated in 6 months' },
      { metric: 'Demo Bookings', value: '+180%', description: 'Increase in product demo requests' },
    ],
    services: ['LinkedIn Ads', 'Google Ads', 'Content Marketing', 'Lead Generation'],
    testimonial: {
      quote: 'The team at OwlMarketingHub truly understands B2B marketing. They delivered results that directly impacted our bottom line.',
      author: 'Michael Chen',
      role: 'VP Marketing, CloudMetrics',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    ],
    featured: true,
  },
  {
    id: '3',
    slug: 'health-wellness-brand',
    client: 'VitalGlow',
    industry: 'Health & Wellness',
    title: 'Launching a Wellness Brand to $1M in First Year Sales',
    description: 'From zero to $1M: how we built and scaled a health supplement brand through performance marketing.',
    challenge: 'VitalGlow was a new brand entering a highly competitive supplement market. They needed to establish credibility, build an audience, and drive sales with limited initial budget.',
    solution: 'We created a phased launch strategy starting with influencer partnerships and UGC content, then scaled through paid social. Our creative team developed a distinctive brand voice that resonated with health-conscious consumers.',
    results: [
      { metric: 'First Year Revenue', value: '$1.2M', description: 'Exceeded target by 20%' },
      { metric: 'ROAS', value: '4.2x', description: 'Strong return on advertising spend' },
      { metric: 'Email List', value: '45K', description: 'Subscribers built from scratch' },
      { metric: 'Repeat Purchase', value: '38%', description: 'Strong customer retention rate' },
    ],
    services: ['Brand Strategy', 'Paid Social', 'Influencer Marketing', 'Email Marketing'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=600&fit=crop',
    ],
    featured: true,
  },
  {
    id: '4',
    slug: 'real-estate-agency',
    client: 'PrimeProperties',
    industry: 'Real Estate',
    title: 'Generating High-Value Property Leads at Scale',
    description: 'How we helped a luxury real estate agency generate 150+ qualified buyer leads per month.',
    challenge: 'PrimeProperties needed to reach high-net-worth individuals interested in luxury properties. Traditional marketing methods were expensive and yielded inconsistent results.',
    solution: 'We implemented a targeted digital strategy using Meta Ads, Google Search, and YouTube to reach affluent buyers. Custom landing pages and lead qualification systems ensured quality over quantity.',
    results: [
      { metric: 'Monthly Leads', value: '150+', description: 'Qualified buyer leads per month' },
      { metric: 'Cost Per Lead', value: '$45', description: 'Down from $120 industry average' },
      { metric: 'Closed Deals', value: '$8.5M', description: 'Property sales attributed to campaigns' },
      { metric: 'Lead Quality', value: '+85%', description: 'Improvement in lead qualification rate' },
    ],
    services: ['Paid Social', 'Google Ads', 'YouTube Ads', 'Landing Pages'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    featured: false,
  },
  {
    id: '5',
    slug: 'fitness-app-launch',
    client: 'FitTrack Pro',
    industry: 'Mobile App / Fitness',
    title: 'Acquiring 100K App Users in 90 Days',
    description: 'A mobile-first acquisition strategy that drove massive app downloads while maintaining strong unit economics.',
    challenge: 'FitTrack Pro was launching in a crowded fitness app market dominated by established players. They needed rapid user acquisition to hit investor milestones.',
    solution: 'We developed a creative-first approach with video ads optimized for TikTok and Instagram Reels. App Store optimization and Apple Search Ads complemented our social campaigns.',
    results: [
      { metric: 'App Downloads', value: '100K+', description: 'Achieved in first 90 days' },
      { metric: 'Cost Per Install', value: '$1.80', description: 'Well below industry average' },
      { metric: 'Day 7 Retention', value: '42%', description: 'Strong user engagement' },
      { metric: 'Trial to Paid', value: '18%', description: 'Conversion to premium subscription' },
    ],
    services: ['App Marketing', 'TikTok Ads', 'Apple Search Ads', 'Creative Production'],
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1461896836934- voices-from-the-land?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    ],
    featured: false,
  },
  {
    id: '6',
    slug: 'restaurant-chain',
    client: 'Urban Bites',
    industry: 'Food & Restaurant',
    title: 'Driving 40% Increase in Restaurant Foot Traffic',
    description: 'Local marketing strategy that brought more customers through the doors across 12 locations.',
    challenge: 'Urban Bites, a fast-casual restaurant chain, was facing increased competition and declining foot traffic. They needed a digital strategy to drive local awareness and visits.',
    solution: 'We implemented hyperlocal campaigns using geo-targeting, Google Local campaigns, and social media. Limited-time offers and user-generated content drove engagement and store visits.',
    results: [
      { metric: 'Foot Traffic', value: '+40%', description: 'Increase in store visits' },
      { metric: 'Online Orders', value: '+65%', description: 'Growth in digital ordering' },
      { metric: 'Brand Mentions', value: '+200%', description: 'Social media engagement' },
      { metric: 'Revenue Per Store', value: '+28%', description: 'Average revenue increase' },
    ],
    services: ['Local Marketing', 'Social Media', 'Google Ads', 'Content Creation'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop',
    ],
    featured: false,
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((study) => study.slug === slug);
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter((study) => study.featured);
};

export const getCaseStudiesByIndustry = (industry: string): CaseStudy[] => {
  return caseStudies.filter((study) => study.industry.includes(industry));
};

export const getAllIndustries = (): string[] => {
  const industries = caseStudies.map((study) => study.industry);
  return [...new Set(industries)];
};
