import { Service } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    slug: 'social-media-management',
    title: 'Social Media Management',
    shortDescription:
      'Full social media account management with content calendars, community management, and performance tracking.',
    fullDescription:
      'Take your social media presence to the next level with our comprehensive management service. We handle everything from strategy to execution, ensuring your brand stays active, engaging, and growing across all platforms.',
    icon: '📱',
    included: [
      'Full social media account management',
      'Monthly content calendars',
      'Captions, hashtags & scheduling',
      'Community management & engagement',
      'Monthly insights & performance reports',
      'Platform-specific strategy',
      'Trend monitoring & implementation',
    ],
    whoItsFor: [
      'Brands lacking time to manage social media',
      'Businesses wanting consistent posting schedules',
      'Companies looking to grow their online community',
      'Brands needing professional social presence',
    ],
    outcomes: [
      {
        title: 'Consistent Presence',
        description: 'Never miss a posting day again',
      },
      {
        title: 'Community Growth',
        description: 'Build an engaged, loyal following',
      },
      {
        title: 'Time Saved',
        description: 'Focus on your business, not content',
      },
    ],
  },
  {
    id: '2',
    slug: 'content-creation',
    title: 'Content Creation',
    shortDescription:
      'Scroll-stopping content including static posts, carousels, reels, UGC videos, and professional photography.',
    fullDescription:
      'Great content is the foundation of every successful brand. Our creative team produces thumb-stopping visuals and videos that capture attention and drive engagement across all platforms.',
    icon: '🎬',
    included: [
      'Static posts & carousels',
      'Reels & stories production',
      'UGC-style videos',
      'Photography direction & editing',
      'Scriptwriting & storytelling',
      'Product & lifestyle visuals',
      'Branded content packages',
    ],
    whoItsFor: [
      'Brands struggling with creative fatigue',
      'Companies lacking in-house creative resources',
      'Businesses wanting professional-quality content',
      'E-commerce brands needing product content',
    ],
    outcomes: [
      {
        title: 'Stop the Scroll',
        description: 'Content that grabs attention instantly',
      },
      {
        title: 'Brand Consistency',
        description: 'Cohesive visual identity across platforms',
      },
      {
        title: 'Higher Engagement',
        description: 'Content that sparks interaction',
      },
    ],
  },
  {
    id: '3',
    slug: 'branding-creative-direction',
    title: 'Branding & Creative Direction',
    shortDescription:
      'Complete brand identity development including logo design, brand guidelines, and marketing collateral.',
    fullDescription:
      'Your brand is more than a logo—it\'s the entire experience. We craft distinctive brand identities that resonate with your audience and set you apart from the competition.',
    icon: '🎨',
    included: [
      'Logo design & variations',
      'Full brand identity development',
      'Colour palette & typography',
      'Comprehensive brand guidelines',
      'Packaging & marketing collateral',
      'Social media brand kits',
      'Brand voice & messaging',
    ],
    whoItsFor: [
      'New businesses launching their brand',
      'Companies ready for a rebrand',
      'Brands lacking visual consistency',
      'Businesses expanding into new markets',
    ],
    outcomes: [
      {
        title: 'Memorable Identity',
        description: 'A brand people remember',
      },
      {
        title: 'Visual Consistency',
        description: 'Cohesive look across all touchpoints',
      },
      {
        title: 'Professional Presence',
        description: 'Stand out from competitors',
      },
    ],
  },
  {
    id: '4',
    slug: 'paid-advertising',
    title: 'Paid Advertising',
    shortDescription:
      'High-performance ad campaigns across Meta, TikTok, and Google with full creative and optimization.',
    fullDescription:
      'Turn ad spend into revenue with data-driven campaigns that reach your ideal customers. We handle everything from creative production to audience targeting and ongoing optimization.',
    icon: '📈',
    included: [
      'Campaign setup & optimization',
      'Ad creatives & copywriting',
      'Audience targeting & retargeting',
      'A/B testing frameworks',
      'Weekly performance reporting',
      'Budget allocation & scaling',
      'Cross-platform strategy',
    ],
    whoItsFor: [
      'E-commerce brands looking to scale',
      'D2C companies launching new products',
      'Businesses wanting profitable customer acquisition',
      'Brands diversifying beyond organic reach',
    ],
    outcomes: [
      {
        title: 'Increase ROAS',
        description: 'Better return on every dollar spent',
      },
      {
        title: 'Lower CPA',
        description: 'Acquire customers more efficiently',
      },
      {
        title: 'Scale Profitably',
        description: 'Grow spend while maintaining margins',
      },
    ],
  },
  {
    id: '5',
    slug: 'website-development',
    title: 'Custom Website Development',
    shortDescription:
      'Fully custom, high-performance websites built with Next.js, Shopify, or WordPress—designed to convert.',
    fullDescription:
      'Your website is your digital storefront. We build fast, beautiful, and conversion-optimized websites using modern technologies that give you a competitive edge.',
    icon: '💻',
    included: [
      'Fully custom website development',
      'Landing page design & build',
      'E-commerce store setups',
      'High-performance, SEO-friendly builds',
      'Mobile-first responsive development',
      'API & third-party integrations',
      'Stripe, CRM & tool connections',
    ],
    whoItsFor: [
      'Businesses launching online presence',
      'Brands needing a website refresh',
      'E-commerce stores wanting better UX',
      'Companies requiring custom functionality',
    ],
    outcomes: [
      {
        title: 'Lightning Fast',
        description: 'Sites that load in milliseconds',
      },
      {
        title: 'Convert Better',
        description: 'Design optimized for conversions',
      },
      {
        title: 'Future-Proof',
        description: 'Built with modern technology',
      },
    ],
  },
  {
    id: '6',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription:
      'User-centered design with complete UX architecture, wireframes, and conversion-focused interfaces.',
    fullDescription:
      'Great design is invisible—it just works. Our UX team creates intuitive, beautiful interfaces that guide users naturally toward conversion while delivering delightful experiences.',
    icon: '✨',
    included: [
      'Complete website/app UX architecture',
      'Wireframes & user journey mapping',
      'Interactive UI mockups',
      'Design systems & style guides',
      'Conversion-focused layout design',
      'Usability optimization',
      'Mobile & desktop experiences',
    ],
    whoItsFor: [
      'Companies with poor website conversion',
      'Apps needing better user experience',
      'Brands wanting premium design',
      'Businesses planning digital products',
    ],
    outcomes: [
      {
        title: 'Better UX',
        description: 'Intuitive, frictionless experiences',
      },
      {
        title: 'Higher Conversions',
        description: 'Design that drives action',
      },
      {
        title: 'User Delight',
        description: 'Experiences people love',
      },
    ],
  },
  {
    id: '7',
    slug: 'seo-content-writing',
    title: 'SEO & Content Writing',
    shortDescription:
      'Comprehensive SEO services with keyword research, technical optimization, and content strategy.',
    fullDescription:
      'Get found by the people searching for what you offer. Our SEO team combines technical expertise with compelling content to improve your rankings and drive organic traffic.',
    icon: '🔍',
    included: [
      'On-page SEO optimization',
      'Technical SEO improvements',
      'Blog content strategy',
      'SEO-optimized articles',
      'Keyword research & analysis',
      'Competitor analysis',
      'Monthly SEO reporting',
    ],
    whoItsFor: [
      'Businesses wanting organic traffic',
      'Companies with poor search rankings',
      'Brands building content authority',
      'E-commerce stores needing product SEO',
    ],
    outcomes: [
      {
        title: 'Higher Rankings',
        description: 'Climb the search results',
      },
      {
        title: 'Organic Traffic',
        description: 'Free, sustainable visitors',
      },
      {
        title: 'Authority Building',
        description: 'Become an industry leader',
      },
    ],
  },
  {
    id: '8',
    slug: 'email-marketing',
    title: 'Email Marketing',
    shortDescription:
      'Strategic email campaigns with automation flows, beautiful design, and performance-driven copywriting.',
    fullDescription:
      'Email is still king for ROI. We build email programs that nurture leads, convert customers, and drive repeat purchases through strategic automation and compelling content.',
    icon: '💌',
    included: [
      'Newsletter design & execution',
      'Automation flows setup',
      'Welcome & nurture sequences',
      'Abandoned cart recovery',
      'List segmentation strategy',
      'Copywriting & layout design',
      'Performance tracking & optimization',
    ],
    whoItsFor: [
      'E-commerce brands with repeat potential',
      'Companies with underutilized email lists',
      'Businesses wanting to reduce ad dependence',
      'Brands focused on customer retention',
    ],
    outcomes: [
      {
        title: 'Increase LTV',
        description: 'Get more value from each customer',
      },
      {
        title: 'Recover Sales',
        description: 'Win back abandoned carts',
      },
      {
        title: 'Own Your Audience',
        description: 'Build an asset you control',
      },
    ],
  },
  {
    id: '9',
    slug: 'influencer-partnerships',
    title: 'Influencer & Creator Partnerships',
    shortDescription:
      'End-to-end influencer marketing from sourcing and outreach to campaign execution and reporting.',
    fullDescription:
      'Leverage the power of trusted voices to reach new audiences. We handle every aspect of influencer partnerships, from identifying the right creators to measuring campaign impact.',
    icon: '🤝',
    included: [
      'Influencer sourcing & vetting',
      'Outreach & negotiation',
      'Contract coordination',
      'Campaign planning & briefing',
      'Content approval workflows',
      'Tracking & performance reporting',
      'Relationship management',
    ],
    whoItsFor: [
      'Brands wanting authentic promotion',
      'Companies launching new products',
      'Businesses targeting specific demographics',
      'Brands building social proof',
    ],
    outcomes: [
      {
        title: 'Authentic Reach',
        description: 'Access engaged, trusting audiences',
      },
      {
        title: 'Quality Content',
        description: 'Creator-made assets for your brand',
      },
      {
        title: 'Social Proof',
        description: 'Build credibility through endorsement',
      },
    ],
  },
  {
    id: '10',
    slug: 'marketing-strategy',
    title: 'Marketing Strategy & Consulting',
    shortDescription:
      'Strategic guidance with brand positioning, content strategy, competitor research, and funnel planning.',
    fullDescription:
      'Strategy before tactics. We help you define your market position, understand your audience, and build a marketing roadmap that aligns every effort with your business goals.',
    icon: '🧭',
    included: [
      'Brand positioning workshops',
      'Content strategy development',
      'Competitor & market analysis',
      'Audience research & personas',
      'Monthly strategy sessions',
      'Funnel & conversion planning',
      'Growth roadmap creation',
    ],
    whoItsFor: [
      'Businesses lacking clear direction',
      'Companies planning major launches',
      'Brands entering new markets',
      'Teams needing expert guidance',
    ],
    outcomes: [
      {
        title: 'Clear Direction',
        description: 'Know exactly where to focus',
      },
      {
        title: 'Competitive Edge',
        description: 'Understand your market position',
      },
      {
        title: 'Aligned Efforts',
        description: 'Every action serves the strategy',
      },
    ],
  },
  {
    id: '11',
    slug: 'full-funnel-setup',
    title: 'Full Funnel Setup',
    shortDescription:
      'Complete funnel systems for coaches, agencies, and e-commerce with CRM, automation, and tracking.',
    fullDescription:
      'Build the infrastructure that turns strangers into customers on autopilot. We set up complete funnel systems including CRM, lead capture, automation workflows, and analytics.',
    icon: '⚡',
    included: [
      'CRM setup (GHL, HubSpot)',
      'Lead capture systems',
      'Automated workflows',
      'Opt-in & sales pages',
      'Checkout page optimization',
      'Tracking & analytics setup',
      'Integration configuration',
    ],
    whoItsFor: [
      'Coaches building course funnels',
      'Agencies needing lead systems',
      'E-commerce stores automating sales',
      'Service businesses scaling operations',
    ],
    outcomes: [
      {
        title: 'Automate Sales',
        description: 'Systems that work while you sleep',
      },
      {
        title: 'Capture Leads',
        description: 'Never miss a potential customer',
      },
      {
        title: 'Track Everything',
        description: 'Know exactly what\'s working',
      },
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};

export const getPreviewServices = (): Service[] => {
  return services.slice(0, 6);
};
