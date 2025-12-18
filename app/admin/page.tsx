'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666666;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ $color }) => $color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  svg {
    width: 22px;
    height: 22px;
    color: ${({ $color }) => $color};
  }
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #666666;
`;

const StatChange = styled.span<{ $positive?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $positive }) => ($positive ? '#16a34a' : '#dc2626')};
  margin-left: 8px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ViewAllLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #ff8c42;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const QuickActions = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
`;

const ActionCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #ffffff;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ActionIcon = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $color }) => $color || '#ff8c42'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: #ffffff;
  }
`;

const ActionContent = styled.div``;

const ActionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ActionDescription = styled.div`
  font-size: 12px;
  color: #666666;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
    margin: 0 -24px;
    padding: 12px 24px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemMeta = styled.div`
  font-size: 12px;
  color: #666666;
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 20px;
  flex-shrink: 0;
  margin-left: 12px;
  background: ${({ $status }) => {
    switch ($status) {
      case 'published': return '#dcfce7';
      case 'draft': return '#fef3c7';
      case 'new': return '#dbeafe';
      case 'read': return '#f3f4f6';
      case 'replied': return '#dcfce7';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'published': return '#16a34a';
      case 'draft': return '#d97706';
      case 'new': return '#2563eb';
      case 'read': return '#666666';
      case 'replied': return '#16a34a';
      default: return '#666666';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px;
  color: #666666;
  font-size: 14px;
`;

const AnalyticsCard = styled.div`
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  margin-bottom: 32px;
`;

const AnalyticsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AnalyticsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.95;
`;

const AnalyticsLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

const AnalyticsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AnalyticsStat = styled.div``;

const AnalyticsValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const AnalyticsLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  published: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: string;
  created_at: string;
}

interface AnalyticsData {
  clicks: number;
  impressions: number;
  ctr: string;
}

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  subscribers: number;
  newContacts: number;
  totalLeads: number;
  newLeads: number;
  testimonials: number;
  faqs: number;
  teamMembers: number;
  portfolioItems: number;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    subscribers: 0,
    newContacts: 0,
    totalLeads: 0,
    newLeads: 0,
    testimonials: 0,
    faqs: 0,
    teamMembers: 0,
    portfolioItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent posts
        const { data: postsData } = await supabase
          .from('blog_posts')
          .select('id, title, slug, date, published')
          .order('created_at', { ascending: false })
          .limit(5);

        if (postsData) {
          setPosts(postsData);
        }

        // Fetch all posts count
        const { count: totalPostsCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });

        const { count: publishedCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);

        // Fetch recent contacts
        const { data: contactsData } = await supabase
          .from('contact_submissions')
          .select('id, name, email, subject, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (contactsData) {
          setContacts(contactsData);
        }

        // Fetch new contacts count
        const { count: newContactsCount } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Fetch subscribers count
        const { count: subscribersCount } = await supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        // Fetch leads count
        const { count: leadsCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true });

        const { count: newLeadsCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Fetch other counts
        const { count: testimonialsCount } = await supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true });

        const { count: faqsCount } = await supabase
          .from('faqs')
          .select('*', { count: 'exact', head: true });

        const { count: teamCount } = await supabase
          .from('team_members')
          .select('*', { count: 'exact', head: true });

        const { count: portfolioCount } = await supabase
          .from('portfolio_items')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalPosts: totalPostsCount || 0,
          publishedPosts: publishedCount || 0,
          draftPosts: (totalPostsCount || 0) - (publishedCount || 0),
          subscribers: subscribersCount || 0,
          newContacts: newContactsCount || 0,
          totalLeads: leadsCount || 0,
          newLeads: newLeadsCount || 0,
          testimonials: testimonialsCount || 0,
          faqs: faqsCount || 0,
          teamMembers: teamCount || 0,
          portfolioItems: portfolioCount || 0,
        });

        // Fetch Search Console analytics
        try {
          const analyticsResponse = await fetch('/api/search-console?dimension=page');
          const analyticsData = await analyticsResponse.json();
          if (!analyticsData.error && analyticsData.totals) {
            setAnalytics(analyticsData.totals);
          }
        } catch {
          // Analytics not available
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <PageHeader>
        <Title>Dashboard</Title>
        <Subtitle>Welcome back! Here&apos;s an overview of your website.</Subtitle>
      </PageHeader>

      {analytics && (
        <AnalyticsCard>
          <AnalyticsHeader>
            <AnalyticsTitle>Search Performance (Last 28 Days)</AnalyticsTitle>
            <AnalyticsLink href="/admin/analytics">View Details &rarr;</AnalyticsLink>
          </AnalyticsHeader>
          <AnalyticsStats>
            <AnalyticsStat>
              <AnalyticsValue>{analytics.clicks.toLocaleString()}</AnalyticsValue>
              <AnalyticsLabel>Total Clicks</AnalyticsLabel>
            </AnalyticsStat>
            <AnalyticsStat>
              <AnalyticsValue>{analytics.impressions.toLocaleString()}</AnalyticsValue>
              <AnalyticsLabel>Impressions</AnalyticsLabel>
            </AnalyticsStat>
            <AnalyticsStat>
              <AnalyticsValue>{analytics.ctr}%</AnalyticsValue>
              <AnalyticsLabel>Click Rate</AnalyticsLabel>
            </AnalyticsStat>
            <AnalyticsStat>
              <AnalyticsValue>{stats.publishedPosts}</AnalyticsValue>
              <AnalyticsLabel>Published Posts</AnalyticsLabel>
            </AnalyticsStat>
          </AnalyticsStats>
        </AnalyticsCard>
      )}

      <StatsGrid>
        <StatCard>
          <StatIcon $color="#ff8c42">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : stats.totalPosts}</StatValue>
          <StatLabel>Blog Posts</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#8b5cf6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : stats.subscribers}</StatValue>
          <StatLabel>Subscribers</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#3b82f6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </StatIcon>
          <StatValue>
            {loading ? '...' : stats.newContacts}
            {stats.newContacts > 0 && <StatChange $positive>new</StatChange>}
          </StatValue>
          <StatLabel>Contacts</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#10b981">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </StatIcon>
          <StatValue>
            {loading ? '...' : stats.totalLeads}
            {stats.newLeads > 0 && <StatChange $positive>+{stats.newLeads}</StatChange>}
          </StatValue>
          <StatLabel>Leads</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#f59e0b">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : stats.testimonials}</StatValue>
          <StatLabel>Testimonials</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#ec4899">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : stats.portfolioItems}</StatValue>
          <StatLabel>Portfolio</StatLabel>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsGrid>
          <ActionCard href="/admin/blog/new">
            <ActionIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>New Post</ActionTitle>
              <ActionDescription>Create article</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/leads/new">
            <ActionIcon $color="#10b981">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="17" y1="11" x2="23" y2="11" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Add Lead</ActionTitle>
              <ActionDescription>New prospect</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/portfolio/new">
            <ActionIcon $color="#ec4899">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Add Project</ActionTitle>
              <ActionDescription>Portfolio item</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/team/new">
            <ActionIcon $color="#6366f1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="17" y1="11" x2="23" y2="11" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Add Member</ActionTitle>
              <ActionDescription>Team member</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/media">
            <ActionIcon $color="#14b8a6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Media</ActionTitle>
              <ActionDescription>Upload files</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/settings">
            <ActionIcon $color="#64748b">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Settings</ActionTitle>
              <ActionDescription>SEO & config</ActionDescription>
            </ActionContent>
          </ActionCard>
        </ActionsGrid>
      </QuickActions>

      <GridRow>
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <ViewAllLink href="/admin/blog">View All</ViewAllLink>
          </CardHeader>
          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : posts.length === 0 ? (
            <EmptyState>No blog posts yet</EmptyState>
          ) : (
            <ItemList>
              {posts.map((post) => (
                <ListItem key={post.id} href={`/admin/blog/${post.id}`}>
                  <ItemInfo>
                    <ItemTitle>{post.title}</ItemTitle>
                    <ItemMeta>{post.date}</ItemMeta>
                  </ItemInfo>
                  <StatusBadge $status={post.published ? 'published' : 'draft'}>
                    {post.published ? 'Published' : 'Draft'}
                  </StatusBadge>
                </ListItem>
              ))}
            </ItemList>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
            <ViewAllLink href="/admin/contacts">View All</ViewAllLink>
          </CardHeader>
          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : contacts.length === 0 ? (
            <EmptyState>No contact submissions yet</EmptyState>
          ) : (
            <ItemList>
              {contacts.map((contact) => (
                <ListItem key={contact.id} href={`/admin/contacts/${contact.id}`}>
                  <ItemInfo>
                    <ItemTitle>{contact.name}</ItemTitle>
                    <ItemMeta>{contact.subject || contact.email}</ItemMeta>
                  </ItemInfo>
                  <StatusBadge $status={contact.status}>
                    {contact.status}
                  </StatusBadge>
                </ListItem>
              ))}
            </ItemList>
          )}
        </Card>
      </GridRow>
    </>
  );
}
