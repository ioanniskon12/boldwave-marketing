import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ios-14-playbook-paid-social-2024',
    title: 'The iOS 14 Playbook: How to Win at Paid Social in 2024',
    excerpt:
      'Privacy changes shook the industry, but smart brands adapted. Here\'s our complete guide to thriving in the post-ATT world.',
    content: `
When Apple rolled out iOS 14.5 and App Tracking Transparency, the digital marketing world panicked. Brands saw their ROAS plummet overnight as Meta's ability to track and attribute conversions took a serious hit.

But here's the thing: the best brands didn't just survive—they thrived. And the strategies that helped them win are the same ones we use with our clients today.

## What Actually Changed

iOS 14.5 introduced App Tracking Transparency (ATT), which requires apps to get explicit permission before tracking users across other companies' apps and websites. The result? Most users opted out, and Meta's pixel lost much of its power.

This meant:
- Smaller audiences for retargeting
- Less accurate conversion data
- Delayed reporting
- Higher CPAs (at least initially)

## The New Playbook

### Embrace Broad Targeting
Counterintuitive as it sounds, broad targeting often outperforms detailed targeting now. Meta's algorithm is surprisingly good at finding buyers when you give it room to work.

### Invest in Creative Volume
With less data to rely on, creative has become the primary lever for performance. We recommend testing 3-5 new creatives per week for most accounts.

### Implement Server-Side Tracking
The Conversions API (CAPI) isn't optional anymore. Server-side tracking helps fill in the gaps left by browser-based pixels.

### Diversify Your Channel Mix
Don't put all your eggs in one basket. TikTok, Google, and email should all play a role in a healthy media mix.

## Key Takeaways

- iOS 14 changed the game, but didn't end it
- Creative is now your biggest performance lever
- Server-side tracking is essential
- Broad targeting often beats detailed targeting
- Diversification reduces platform risk

The brands that adapted quickly are now scaling faster than ever. The question is: will you be one of them?
    `,
    date: 'March 15, 2024',
    readTime: '8 min read',
    tags: ['Paid Social', 'Strategy'],
    thumbnail: '',
    author: {
      name: 'Sarah Chen',
      image: '',
    },
  },
  {
    id: '2',
    slug: 'roas-obsession-hurting-growth',
    title: 'Why Your ROAS Obsession Might Be Hurting Your Growth',
    excerpt:
      'ROAS is important, but optimising for it alone can cap your potential. Here\'s how to think about efficiency vs. scale.',
    content: `
Let's talk about the metric everyone loves to brag about: ROAS. Return on Ad Spend is the darling of performance marketing, and for good reason. It's simple, intuitive, and directly tied to profitability.

But here's the uncomfortable truth: obsessing over ROAS might be the very thing holding your brand back.

## The ROAS Trap

When you optimise purely for ROAS, you're essentially telling the algorithm to find the easiest converts—the low-hanging fruit. These are often:
- People who were already going to buy
- Existing customers (cheaper to convert, skews ROAS up)
- Small segments of your total addressable market

The result? Your ROAS looks great, but your business stops growing.

## Efficiency vs. Scale

There's an inherent tension between efficiency (ROAS) and scale (total revenue). At some point, to reach new customers, you need to accept a lower return per dollar spent.

Think of it like fishing. You can catch the fish in the barrel easily (high ROAS). But if you want to catch more fish, you need to cast your net wider—and that's inherently less efficient.

## A Better Framework

Instead of optimising for ROAS alone, we recommend looking at:

1. **Marginal ROAS**: What's the return on the next dollar spent?
2. **Customer Acquisition Cost (CAC)**: How much does a new customer cost?
3. **Lifetime Value (LTV)**: What's a customer worth over time?
4. **Contribution Margin**: What's the profit after all costs?

## Key Takeaways

- High ROAS doesn't always mean high profit
- Scale requires accepting some efficiency loss
- Focus on contribution margin, not just ROAS
- Understand the difference between existing and new customers
- Set different targets for different campaign objectives

The best brands we work with have moved beyond ROAS tunnel vision. They understand that sustainable growth requires a more nuanced view of performance.
    `,
    date: 'March 8, 2024',
    readTime: '6 min read',
    tags: ['Strategy', 'Analytics'],
    thumbnail: '',
    author: {
      name: 'Alex Morgan',
      image: '',
    },
  },
  {
    id: '3',
    slug: '5-ad-creative-frameworks',
    title: '5 Ad Creative Frameworks That Actually Convert',
    excerpt:
      'Stop guessing what creative will work. These proven frameworks have generated millions in revenue for our clients.',
    content: `
Creative is the new targeting. With iOS 14 limiting data-driven targeting, the ad itself has become the primary lever for performance. But creating scroll-stopping ads that convert isn't about luck—it's about systems.

Here are five frameworks we use with clients that consistently deliver results.

## 1. The Problem-Solution Hook

Start with a problem your audience deeply relates to, then present your product as the solution.

Structure:
- Hook: "Struggling with [problem]?"
- Agitate: "Most people try [common solution] but it doesn't work"
- Solution: "We created [product] specifically for [audience]"
- Proof: Show results or testimonials
- CTA: Clear call to action

## 2. The UGC Testimonial

User-generated content performs because it feels authentic. But not all UGC is created equal.

Best practices:
- Real customers, genuine enthusiasm
- Specific results ("I lost 12 pounds" > "I lost weight")
- Address objections naturally
- Good lighting and audio (yes, it matters)

## 3. The Side-by-Side Comparison

Show your product against the alternative—whether that's a competitor or doing nothing.

Structure:
- Left side: The "before" or alternative
- Right side: Your product/solution
- Highlight the contrast visually
- End with clear differentiator

## 4. The Founder Story

People buy from people. A founder explaining why they created the product builds trust and differentiation.

Elements:
- Personal struggle or observation
- The "aha" moment
- Why existing solutions failed
- What makes your approach different

## 5. The Value Dump

Sometimes, you just need to communicate a lot of value quickly.

Structure:
- Open with biggest benefit
- Rapid-fire feature callouts
- Social proof sprinkled throughout
- Strong closing CTA

## Key Takeaways

- Creative is your biggest performance lever
- Framework > random guessing
- Test multiple angles per product
- UGC doesn't mean low quality
- Specificity wins over vague claims

Stop hoping your next ad will work. Start using proven frameworks and iterate from there.
    `,
    date: 'February 28, 2024',
    readTime: '7 min read',
    tags: ['Creative', 'Paid Social'],
    thumbnail: '',
    author: {
      name: 'Emma Thompson',
      image: '',
    },
  },
  {
    id: '4',
    slug: 'attribution-problem-solution',
    title: 'The Attribution Problem (And How We Solve It)',
    excerpt:
      'Platform reporting is broken. Here\'s how we build a source of truth for clients spending $50K+/month.',
    content: `
If you've ever tried to reconcile your Meta Ads Manager with Google Analytics, you know the pain. The numbers never match. And with iOS 14, the gap has only gotten wider.

The attribution problem isn't just annoying—it's costing you money. When you can't trust your data, you can't make good decisions.

## Why Platform Reporting Is Broken

Each platform wants credit for the sale. So they all use self-serving attribution models:
- Meta uses 7-day click, 1-day view by default
- Google uses last-click (or data-driven)
- Your backend sees something else entirely

The result? If you add up all the platform-reported conversions, you'll have 3x more sales than actually happened.

## The Multi-Touch Reality

Customer journeys are messy. Someone might:
1. See a Facebook ad (impression)
2. Google your brand (click)
3. Leave without buying
4. Get retargeted on Instagram (click)
5. Convert via email

Who gets credit? Depends on who you ask.

## Our Approach

For clients spending $50K+/month, we build a proper attribution stack:

### Server-Side Tracking
We implement the Meta Conversions API and Google Enhanced Conversions to capture more data accurately.

### Post-Purchase Surveys
"How did you hear about us?" is surprisingly reliable for understanding channel influence.

### Media Mix Modeling
For larger budgets, we use statistical models to understand true channel contribution.

### Holdout Testing
The gold standard: turn off a channel for a geographic region and measure the impact.

## Key Takeaways

- Platform reporting is inherently biased
- The truth usually lies somewhere in between
- Server-side tracking is now essential
- Post-purchase surveys add qualitative insight
- Holdout testing is the gold standard

Don't let broken attribution lead to broken decisions. Build a measurement framework you can trust.
    `,
    date: 'February 20, 2024',
    readTime: '6 min read',
    tags: ['Analytics', 'Strategy'],
    thumbnail: '',
    author: {
      name: 'David Kim',
      image: '',
    },
  },
  {
    id: '5',
    slug: 'dtc-brand-scale-case-study',
    title: 'How We Scaled a D2C Brand from $50K to $500K/month',
    excerpt:
      'A deep dive into the strategy, creative, and optimisation that 10x\'d this brand\'s monthly revenue.',
    content: `
When Glow Skincare came to us, they were spending $50K/month on ads with a 1.8x ROAS. Six months later, they were at $500K/month with a 3.2x ROAS. Here's exactly how we did it.

## The Starting Point

Glow had a great product but was stuck in a rut:
- All ad spend on Meta (100%)
- 3 static image ads running
- Broad targeting with no testing structure
- No server-side tracking
- Breaking even on new customer acquisition

## Phase 1: Foundation (Month 1-2)

Before scaling, we fixed the fundamentals:

### Tracking Overhaul
Implemented Meta CAPI, fixed Google Analytics, and set up proper UTM parameters. This alone improved reported ROAS by 15%.

### Account Structure
Rebuilt the account with:
- Prospecting campaigns (broad)
- Retargeting campaigns (website visitors, engagers)
- Testing campaigns (new creative, audiences)

### Creative Sprint
Produced 15 new creatives in the first 2 weeks:
- UGC testimonials
- Founder story
- Problem-solution hooks
- Side-by-side comparisons

## Phase 2: Testing & Learning (Month 2-4)

With the foundation in place, we ran aggressive tests:

### Creative Testing
Tested 5-10 new creatives per week. Winners got scaled, losers got killed fast.

### Audience Testing
Tested lookalikes, interest stacks, and broad targeting. Surprisingly, broad won most of the time.

### Platform Diversification
Added TikTok (15% of budget) and Google (20% of budget).

## Phase 3: Scaling (Month 4-6)

With winning formulas identified, we scaled hard:

### Budget Increases
Increased budgets 20-30% weekly on winning campaigns.

### Creative Iteration
Iterated on winning concepts with new hooks, formats, and angles.

### LTV Optimisation
Implemented email flows to increase repeat purchase rate and customer lifetime value.

## The Results

- Monthly ad spend: $50K → $500K
- ROAS: 1.8x → 3.2x
- New customers per month: 2,000 → 25,000
- Monthly revenue: $90K → $1.6M

## Key Takeaways

- Fix tracking before scaling
- Creative volume is crucial
- Test aggressively, scale winners quickly
- Diversify platforms to reduce risk
- Focus on LTV, not just first purchase

This isn't magic—it's process. The same framework can work for any brand ready to scale.
    `,
    date: 'February 10, 2024',
    readTime: '9 min read',
    tags: ['Case Study', 'Strategy'],
    thumbnail: '',
    author: {
      name: 'James Wilson',
      image: '',
    },
  },
  {
    id: '6',
    slug: 'google-ads-vs-meta-ads',
    title: 'Google Ads vs Meta Ads: Where Should You Start?',
    excerpt:
      'The eternal question. Here\'s our framework for deciding based on your product, audience, and goals.',
    content: `
"Should I start with Google or Facebook ads?" It's one of the most common questions we get from new clients. And the answer—like most things in marketing—is "it depends."

But let's make that dependency clear.

## Understanding the Difference

### Google Ads: Demand Capture
Google ads capture existing demand. Someone searches "best running shoes" and you show them your ad. They're already in buying mode.

Best for:
- Products people actively search for
- Clear purchase intent keywords
- Service businesses
- Higher price points

### Meta Ads: Demand Generation
Meta ads create demand. Someone's scrolling Instagram and sees your ad. They weren't looking for running shoes, but now they want some.

Best for:
- Visually appealing products
- Impulse-friendly price points
- Lifestyle-driven purchases
- Building brand awareness

## The Decision Framework

### Question 1: Do People Search for Your Product?
If yes → Google Ads makes sense
If no → Meta Ads is your play

### Question 2: Is Your Product Visual?
If yes → Meta Ads will perform well
If no → Google Ads may be better

### Question 3: What's Your Price Point?
Under $50 → Meta Ads (impulse-friendly)
Over $200 → Google Ads (considered purchase)
In between → Test both

### Question 4: What's Your Goal?
Immediate sales → Google Ads
Brand building + sales → Meta Ads
Both → Start with one, add the other

## Our Recommendation

For most e-commerce brands, we recommend:

**Start with Meta Ads** because:
- Lower barrier to entry
- Better for building brand
- More creative testing opportunities
- Usually lower CPCs

**Add Google Ads** when:
- Meta is profitable and scaling
- You have brand search volume
- Shopping campaigns make sense
- You want to capture bottom-funnel demand

## Key Takeaways

- Google captures demand, Meta creates it
- Start where your product naturally fits
- Most brands should do both eventually
- Don't spread too thin too early
- Test and let data guide you

There's no universally right answer. But with this framework, you can make a smart starting choice for your specific situation.
    `,
    date: 'February 1, 2024',
    readTime: '6 min read',
    tags: ['Strategy', 'Paid Social'],
    thumbnail: '',
    author: {
      name: 'Maria Garcia',
      image: '',
    },
  },
  {
    id: '7',
    slug: 'strategies-drive-growth',
    title: 'Top Strategies to Drive Growth in Today\'s Competitive Market',
    excerpt:
      'Discover proven growth strategies that help businesses thrive in competitive markets and achieve sustainable success.',
    content: `
In today's fast-paced business environment, growth isn't just desirable—it's essential for survival. Companies that fail to adapt and grow find themselves quickly overtaken by more agile competitors.

## The Growth Imperative

The business landscape has changed dramatically. Digital transformation, shifting consumer behaviors, and global competition have created both challenges and opportunities.

### Why Traditional Approaches Fall Short

Many businesses still rely on outdated growth strategies:
- Mass advertising without targeting
- Product-centric rather than customer-centric approaches
- Siloed marketing and sales teams
- Reactive rather than proactive planning

## Modern Growth Strategies That Work

### 1. Customer-Centric Innovation

The most successful companies start with the customer:
- Deep customer research and personas
- Continuous feedback loops
- Iterative product development
- Personalized experiences at scale

### 2. Data-Driven Decision Making

Gut feelings are no longer enough:
- Implement robust analytics
- A/B test everything
- Build attribution models
- Create dashboards for real-time insights

### 3. Omnichannel Presence

Meet customers where they are:
- Consistent brand experience across channels
- Seamless online-to-offline integration
- Mobile-first approach
- Social commerce capabilities

### 4. Strategic Partnerships

Grow faster through collaboration:
- Co-marketing initiatives
- Technology integrations
- Distribution partnerships
- Influencer relationships

### 5. Operational Excellence

Efficiency enables growth:
- Automate repetitive tasks
- Streamline workflows
- Invest in technology stack
- Build scalable processes

## Implementation Framework

### Phase 1: Assessment
Audit your current state across all dimensions.

### Phase 2: Strategy
Define clear goals and prioritize initiatives.

### Phase 3: Execution
Implement changes in focused sprints.

### Phase 4: Optimization
Measure, learn, and iterate continuously.

## Key Takeaways

- Growth requires a holistic approach
- Customer centricity is non-negotiable
- Data should drive decisions
- Partnerships accelerate growth
- Operational excellence enables scale

The companies that will win tomorrow are the ones investing in these capabilities today.
    `,
    date: 'April 22, 2025',
    readTime: '7 min read',
    tags: ['Strategy', 'Business'],
    thumbnail: '',
    author: {
      name: 'Admin',
      image: '',
    },
  },
  {
    id: '8',
    slug: 'business-consultants-role',
    title: 'The Role of Business Consultants in Transforming Your Company',
    excerpt:
      'Learn how business consultants can provide the expertise and outside perspective needed to transform your organization.',
    content: `
Business consultants have become indispensable partners for companies seeking to navigate complex challenges and unlock new growth opportunities. But what exactly do they do, and when should you engage one?

## What Business Consultants Do

At their core, consultants bring three things:
1. **Expertise** - Deep knowledge in specific domains
2. **Objectivity** - Fresh perspective without internal biases
3. **Experience** - Lessons learned from similar situations

## When to Engage a Consultant

### Strategic Inflection Points
- Entering new markets
- Major digital transformation
- Merger or acquisition
- Turnaround situations

### Capability Gaps
- Lacking internal expertise
- Need for specialized skills
- Temporary resource needs
- Knowledge transfer requirements

### Fresh Perspectives
- Stuck in analysis paralysis
- Internal disagreements
- Need validation for decisions
- Seeking best practices

## Types of Consulting Engagements

### Strategy Consulting
High-level direction and long-term planning:
- Market entry strategies
- Competitive positioning
- Growth roadmaps
- Portfolio optimization

### Operations Consulting
Improving how the business runs:
- Process optimization
- Supply chain efficiency
- Cost reduction
- Performance improvement

### Technology Consulting
Digital transformation and IT strategy:
- System implementation
- Digital strategy
- Data analytics
- Cybersecurity

### Marketing Consulting
Customer acquisition and brand building:
- Go-to-market strategy
- Brand positioning
- Digital marketing
- Customer experience

## Maximizing ROI from Consultants

### Clear Objectives
Define what success looks like before engaging.

### Right Fit
Choose consultants with relevant experience.

### Active Partnership
Engage actively rather than delegating entirely.

### Knowledge Transfer
Ensure learnings stay within your organization.

### Implementation Focus
Great recommendations mean nothing without execution.

## Key Takeaways

- Consultants bring expertise, objectivity, and experience
- Engage them at strategic inflection points
- Choose the right type for your needs
- Be an active partner in the process
- Focus on implementation, not just strategy

The best consulting engagements create lasting capability within your organization, not dependency on outside help.
    `,
    date: 'April 22, 2025',
    readTime: '6 min read',
    tags: ['Business', 'Consulting'],
    thumbnail: '',
    author: {
      name: 'Admin',
      image: '',
    },
  },
  {
    id: '9',
    slug: 'strategic-business-consulting',
    title: 'Unlocking Success: The Power of Strategic Business Consulting',
    excerpt:
      'Discover how strategic consulting can help your business overcome challenges and achieve breakthrough results.',
    content: `
Strategic business consulting is more than just advice—it's a partnership that can fundamentally transform how your company operates, competes, and grows.

## What Makes Strategic Consulting Different

Unlike operational or technical consulting, strategic consulting focuses on the big picture:
- Where should the company compete?
- How should it position itself?
- What capabilities does it need?
- How should resources be allocated?

## The Strategic Consulting Process

### Discovery Phase
Deep dive into your business:
- Stakeholder interviews
- Data analysis
- Market research
- Competitive assessment

### Analysis Phase
Making sense of the findings:
- SWOT analysis
- Porter's Five Forces
- Value chain analysis
- Scenario planning

### Strategy Development
Crafting the path forward:
- Vision and mission alignment
- Strategic options generation
- Financial modeling
- Risk assessment

### Implementation Planning
Turning strategy into action:
- Initiative prioritization
- Resource allocation
- Timeline development
- KPI definition

## Common Strategic Challenges We Address

### Market Disruption
Established players facing new competitors or business models.

### Growth Stagnation
Companies that have plateaued and need new engines for growth.

### Digital Transformation
Traditional businesses needing to adapt to digital realities.

### Organizational Complexity
Fast-growing companies struggling with scale.

### Competitive Pressure
Businesses facing margin compression or market share loss.

## Success Stories

### Retail Transformation
Helped a traditional retailer develop an omnichannel strategy, resulting in 40% e-commerce growth.

### Market Entry
Guided a tech company's expansion into European markets, achieving profitability in 18 months.

### Cost Optimization
Identified $15M in operational savings for a manufacturing client without compromising quality.

## Choosing the Right Strategic Partner

### Industry Expertise
Look for consultants who know your industry.

### Proven Track Record
Ask for case studies and references.

### Cultural Fit
Ensure they'll work well with your team.

### Implementation Capability
Strategy without execution is worthless.

### Long-term Perspective
The best partners think beyond the engagement.

## Key Takeaways

- Strategic consulting addresses the biggest business questions
- The process is rigorous and data-driven
- Success requires partnership, not just advice
- Choose partners with relevant experience
- Focus on implementation from day one

The right strategic partner can accelerate your success and help you avoid costly mistakes. But the key word is "partner"—the best results come from true collaboration.
    `,
    date: 'April 22, 2025',
    readTime: '8 min read',
    tags: ['Strategy', 'Consulting'],
    thumbnail: '',
    author: {
      name: 'Admin',
      image: '',
    },
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, limit = 3): BlogPost[] => {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) =>
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tags = blogPosts.flatMap((post) => post.tags);
  return [...new Set(tags)];
};
