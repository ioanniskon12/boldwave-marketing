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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ $color }) => $color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ $color }) => $color};
  }
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666666;
`;

const QuickActions = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const ActionCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
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

const ActionIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #ff8c42;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
    color: #ffffff;
  }
`;

const ActionContent = styled.div``;

const ActionTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
`;

const ActionDescription = styled.div`
  font-size: 13px;
  color: #666666;
`;

const RecentPosts = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
    margin: 0 -24px;
    padding: 16px 24px;
  }
`;

const PostInfo = styled.div``;

const PostTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const PostMeta = styled.div`
  font-size: 13px;
  color: #666666;
`;

const PostStatus = styled.span<{ $published: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $published }) => ($published ? '#dcfce7' : '#fef3c7')};
  color: ${({ $published }) => ($published ? '#16a34a' : '#d97706')};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666666;
`;

const SetupMessage = styled.div`
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #92400e;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #a16207;
    margin-bottom: 16px;
  }

  code {
    display: block;
    background: #fffbeb;
    padding: 12px;
    border-radius: 6px;
    font-size: 12px;
    color: #78350f;
    margin-bottom: 8px;
    overflow-x: auto;
  }
`;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  published: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, date, published')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          if (error.code === '42P01') {
            setNeedsSetup(true);
          } else {
            setError(error.message);
          }
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        setNeedsSetup(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.filter((p) => !p.published).length;

  return (
    <>
      <PageHeader>
        <Title>Dashboard</Title>
        <Subtitle>Welcome back! Here&apos;s an overview of your content.</Subtitle>
      </PageHeader>

      {needsSetup && (
        <SetupMessage>
          <h3>Database Setup Required</h3>
          <p>
            To complete the admin setup, you need to create the database tables in Supabase.
            Go to your Supabase project &rarr; SQL Editor &rarr; Run the following SQL:
          </p>
          <code>
{`-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  author_name TEXT NOT NULL,
  author_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users full access
CREATE POLICY "Allow authenticated users full access" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow public read access for published posts
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (published = true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow public access to images
CREATE POLICY "Allow public image access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');`}
          </code>
        </SetupMessage>
      )}

      <StatsGrid>
        <StatCard>
          <StatIcon $color="#ff8c42">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : totalPosts}</StatValue>
          <StatLabel>Total Posts</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#16a34a">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : publishedPosts}</StatValue>
          <StatLabel>Published</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#eab308">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </StatIcon>
          <StatValue>{loading ? '...' : draftPosts}</StatValue>
          <StatLabel>Drafts</StatLabel>
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
              <ActionTitle>New Blog Post</ActionTitle>
              <ActionDescription>Create a new article</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/blog">
            <ActionIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Manage Posts</ActionTitle>
              <ActionDescription>View all blog posts</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard href="/admin/settings">
            <ActionIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4" />
              </svg>
            </ActionIcon>
            <ActionContent>
              <ActionTitle>SEO Settings</ActionTitle>
              <ActionDescription>Update meta data</ActionDescription>
            </ActionContent>
          </ActionCard>
        </ActionsGrid>
      </QuickActions>

      <RecentPosts>
        <SectionTitle>Recent Posts</SectionTitle>
        {loading ? (
          <EmptyState>Loading...</EmptyState>
        ) : posts.length === 0 ? (
          <EmptyState>
            No blog posts yet. Create your first post to get started!
          </EmptyState>
        ) : (
          <PostList>
            {posts.map((post) => (
              <PostItem key={post.id} href={`/admin/blog/${post.id}`}>
                <PostInfo>
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>{post.date}</PostMeta>
                </PostInfo>
                <PostStatus $published={post.published}>
                  {post.published ? 'Published' : 'Draft'}
                </PostStatus>
              </PostItem>
            ))}
          </PostList>
        )}
      </RecentPosts>
    </>
  );
}
