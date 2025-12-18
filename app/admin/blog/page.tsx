'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BlogPost } from '@/lib/supabase/types';
import { blogPosts as staticBlogPosts, getAllTags } from '@/data/blog';

// Get static tags from existing blog posts
const staticTags = getAllTags();

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const HeaderLeft = styled.div``;

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

const AddButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #e67d35;
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  background: ${({ $active }) => ($active ? '#1a1a1a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};
  border: 1px solid ${({ $active }) => ($active ? '#1a1a1a' : '#e5e5e5')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#1a1a1a' : '#f5f5f5')};
  }
`;

const PostsTable = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 120px 100px 100px;
  gap: 16px;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 120px 100px 100px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const PostInfo = styled.div``;

const PostTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const PostSlug = styled.div`
  font-size: 13px;
  color: #999999;
`;

const PostDate = styled.div`
  font-size: 14px;
  color: #666666;
`;

const PostStatus = styled.span<{ $status: 'published' | 'scheduled' | 'draft' }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ $status }) =>
    $status === 'published' ? '#dcfce7' :
    $status === 'scheduled' ? '#dbeafe' : '#fef3c7'};
  color: ${({ $status }) =>
    $status === 'published' ? '#16a34a' :
    $status === 'scheduled' ? '#2563eb' : '#d97706'};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant?: 'danger' }>`
  padding: 8px;
  background: ${({ $variant }) => ($variant === 'danger' ? '#fef2f2' : '#f5f5f5')};
  color: ${({ $variant }) => ($variant === 'danger' ? '#dc2626' : '#666666')};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $variant }) => ($variant === 'danger' ? '#fee2e2' : '#e5e5e5')};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const EditLink = styled(Link)`
  padding: 8px;
  background: #f5f5f5;
  color: #666666;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e5e5;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666666;
    margin-bottom: 24px;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666666;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  background: #f0f0f0;
  color: #666666;
  border-radius: 4px;
`;

const SourceBadge = styled.span<{ $source: 'supabase' | 'static' }>`
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  background: ${({ $source }) => ($source === 'supabase' ? '#dbeafe' : '#fef3c7')};
  color: ${({ $source }) => ($source === 'supabase' ? '#1d4ed8' : '#b45309')};
`;

const ClicksCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;

  svg {
    width: 14px;
    height: 14px;
    color: #ff8c42;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ManageTagsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffffff;
  color: #666666;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #cccccc;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const ModalDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
`;

const TagInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;

  &:focus {
    border-color: #ff8c42;
  }
`;

const AddTagButton = styled.button`
  padding: 12px 24px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #e67d35;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const DeleteTagButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    color: #dc2626;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #999;
  border-radius: 8px;

  &:hover {
    background: #f5f5f5;
    color: #1a1a1a;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #16a34a;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
`;

const FiltersSection = styled.div`
  margin-bottom: 24px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

const FilterLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #666666;
  min-width: 60px;
`;

const TagsFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagFilterButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $active }) => ($active ? '#ff8c42' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};
  border: 1px solid ${({ $active }) => ($active ? '#ff8c42' : '#e5e5e5')};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#e67d35' : '#f5f5f5')};
    border-color: ${({ $active }) => ($active ? '#e67d35' : '#cccccc')};
  }
`;

const SourceFilter = styled.div`
  display: flex;
  gap: 8px;
`;

const SourceButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $active }) => ($active ? '#1a1a1a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};
  border: 1px solid ${({ $active }) => ($active ? '#1a1a1a' : '#e5e5e5')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#1a1a1a' : '#f5f5f5')};
  }
`;

type Filter = 'all' | 'published' | 'scheduled' | 'draft';
type SourceType = 'all' | 'supabase' | 'static';

interface CombinedPost {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  published: boolean;
  scheduled_for?: string | null;
  source: 'supabase' | 'static';
  clicks?: number;
}

interface AnalyticsData {
  key: string;
  clicks: number;
}

export default function BlogListPage() {
  const [supabasePosts, setSupabasePosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceType>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(staticTags);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [tagSaving, setTagSaving] = useState(false);
  const [tagSuccess, setTagSuccess] = useState('');
  const [tagError, setTagError] = useState('');
  const supabase = createClient();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSupabasePosts(data);
    }
    setLoading(false);
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/search-console?dimension=page');
      const result = await response.json();
      if (!result.error && result.data) {
        setAnalyticsData(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
  };

  const fetchTags = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'blog_tags')
      .single();

    if (data) {
      const record = data as { value: string[] };
      const dbTags = record.value || [];
      const allTags = [...new Set([...dbTags, ...staticTags])].sort();
      setAvailableTags(allTags);
    }
  };

  const saveTags = async (tags: string[]) => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        key: 'blog_tags',
        value: tags,
        updated_at: new Date().toISOString(),
      } as never, {
        onConflict: 'key'
      });
    return !error;
  };

  const handleAddTag = async () => {
    const trimmedTag = newTagInput.trim();
    if (!trimmedTag) return;

    if (availableTags.includes(trimmedTag)) {
      setTagError('This tag already exists');
      return;
    }

    setTagSuccess('');
    setTagError('');
    setTagSaving(true);

    const newTags = [...availableTags, trimmedTag].sort();
    const saved = await saveTags(newTags);

    if (saved) {
      setAvailableTags(newTags);
      setNewTagInput('');
      setTagSuccess('Tag added!');
    } else {
      setTagError('Failed to save tag');
    }

    setTagSaving(false);
  };

  const handleDeleteTag = async (tagToDelete: string) => {
    if (!confirm(`Delete tag "${tagToDelete}"?`)) return;

    setTagSuccess('');
    setTagError('');
    setTagSaving(true);

    const newTags = availableTags.filter((t) => t !== tagToDelete);
    const saved = await saveTags(newTags);

    if (saved) {
      setAvailableTags(newTags);
      setTagSuccess('Tag deleted!');
    } else {
      setTagError('Failed to delete tag');
    }

    setTagSaving(false);
  };

  useEffect(() => {
    fetchPosts();
    fetchAnalytics();
    fetchTags();
  }, []);

  // Get clicks for a specific blog post slug
  const getClicksForPost = (slug: string): number => {
    const blogUrl = `/blog/${slug}`;
    const match = analyticsData.find((item) =>
      item.key.includes(blogUrl) || item.key.endsWith(blogUrl)
    );
    return match?.clicks || 0;
  };

  // Convert static posts to combined format
  const staticPostsCombined: CombinedPost[] = staticBlogPosts.map((post) => ({
    id: `static-${post.id}`,
    title: post.title,
    slug: post.slug,
    tags: post.tags,
    date: post.date,
    published: true,
    source: 'static' as const,
  }));

  // Convert supabase posts to combined format
  const supabasePostsCombined: CombinedPost[] = supabasePosts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    tags: post.tags,
    date: post.date,
    published: post.published,
    scheduled_for: post.scheduled_for,
    source: 'supabase' as const,
  }));

  // Combine and filter posts
  let allPosts: CombinedPost[] = [...supabasePostsCombined, ...staticPostsCombined];

  // Filter by source
  if (sourceFilter === 'supabase') {
    allPosts = allPosts.filter((p) => p.source === 'supabase');
  } else if (sourceFilter === 'static') {
    allPosts = allPosts.filter((p) => p.source === 'static');
  }

  // Filter by status
  if (filter === 'published') {
    allPosts = allPosts.filter((p) => p.published);
  } else if (filter === 'scheduled') {
    allPosts = allPosts.filter((p) => !p.published && p.scheduled_for);
  } else if (filter === 'draft') {
    allPosts = allPosts.filter((p) => !p.published && !p.scheduled_for);
  }

  // Helper to get post status
  const getPostStatus = (post: CombinedPost): 'published' | 'scheduled' | 'draft' => {
    if (post.published) return 'published';
    if (post.scheduled_for) return 'scheduled';
    return 'draft';
  };

  // Helper to format scheduled date
  const formatScheduledDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Filter by tags
  if (selectedTags.length > 0) {
    allPosts = allPosts.filter((p) =>
      selectedTags.some((tag) => p.tags.includes(tag))
    );
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDelete = async (id: string) => {
    if (id.startsWith('static-')) {
      alert('Static posts cannot be deleted from here. They are stored in the code.');
      return;
    }
    if (!confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (!error) {
      setSupabasePosts(supabasePosts.filter((p) => p.id !== id));
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    if (id.startsWith('static-')) {
      alert('Static posts are always published. Import them to Supabase to manage their status.');
      return;
    }
    // When publishing, clear the scheduled_for date
    const updateData = !currentStatus
      ? { published: true, scheduled_for: null }
      : { published: false };

    const { error } = await supabase
      .from('blog_posts')
      .update(updateData as never)
      .eq('id', id);

    if (!error) {
      setSupabasePosts(
        supabasePosts.map((p) =>
          p.id === id ? { ...p, published: !currentStatus, scheduled_for: !currentStatus ? null : p.scheduled_for } : p
        )
      );
    }
  };

  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Title>Blog Posts</Title>
          <Subtitle>Manage your blog content</Subtitle>
        </HeaderLeft>
        <HeaderButtons>
          <ManageTagsButton onClick={() => setShowTagsModal(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            Manage Tags
          </ManageTagsButton>
          <AddButton href="/admin/blog/new">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Post
          </AddButton>
        </HeaderButtons>
      </PageHeader>

      <FiltersSection>
        <FilterRow>
          <FilterLabel>Status:</FilterLabel>
          <FilterBar style={{ marginBottom: 0 }}>
            <FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterButton>
            <FilterButton
              $active={filter === 'published'}
              onClick={() => setFilter('published')}
            >
              Published
            </FilterButton>
            <FilterButton $active={filter === 'scheduled'} onClick={() => setFilter('scheduled')}>
              Scheduled
            </FilterButton>
            <FilterButton $active={filter === 'draft'} onClick={() => setFilter('draft')}>
              Drafts
            </FilterButton>
          </FilterBar>
        </FilterRow>

        <FilterRow>
          <FilterLabel>Source:</FilterLabel>
          <SourceFilter>
            <SourceButton $active={sourceFilter === 'all'} onClick={() => setSourceFilter('all')}>
              All ({supabasePosts.length + staticBlogPosts.length})
            </SourceButton>
            <SourceButton $active={sourceFilter === 'supabase'} onClick={() => setSourceFilter('supabase')}>
              Database ({supabasePosts.length})
            </SourceButton>
            <SourceButton $active={sourceFilter === 'static'} onClick={() => setSourceFilter('static')}>
              Static ({staticBlogPosts.length})
            </SourceButton>
          </SourceFilter>
        </FilterRow>

        <FilterRow>
          <FilterLabel>Tags:</FilterLabel>
          <TagsFilter>
            {availableTags.map((tag) => (
              <TagFilterButton
                key={tag}
                $active={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </TagFilterButton>
            ))}
            {selectedTags.length > 0 && (
              <TagFilterButton $active={false} onClick={() => setSelectedTags([])}>
                Clear
              </TagFilterButton>
            )}
          </TagsFilter>
        </FilterRow>
      </FiltersSection>

      <PostsTable>
        <TableHeader style={{ gridTemplateColumns: '1fr 100px 80px 150px 120px 100px 100px' }}>
          <span>Title</span>
          <span>Source</span>
          <span>Clicks</span>
          <span>Tags</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </TableHeader>

        {loading ? (
          <LoadingState>Loading posts...</LoadingState>
        ) : allPosts.length === 0 ? (
          <EmptyState>
            <h3>No posts found</h3>
            <p>Create your first blog post to get started.</p>
            <AddButton href="/admin/blog/new">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Post
            </AddButton>
          </EmptyState>
        ) : (
          allPosts.map((post) => (
            <TableRow key={post.id} style={{ gridTemplateColumns: '1fr 100px 80px 150px 120px 100px 100px' }}>
              <PostInfo>
                <PostTitle>{post.title}</PostTitle>
                <PostSlug>/blog/{post.slug}</PostSlug>
              </PostInfo>
              <div>
                <SourceBadge $source={post.source}>
                  {post.source === 'supabase' ? 'DB' : 'Static'}
                </SourceBadge>
              </div>
              <ClicksCount>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                {getClicksForPost(post.slug)}
              </ClicksCount>
              <Tags>
                {post.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {post.tags.length > 2 && <Tag>+{post.tags.length - 2}</Tag>}
              </Tags>
              <PostDate>
                {post.scheduled_for && !post.published ? (
                  <span style={{ color: '#2563eb', fontSize: '12px' }}>
                    {formatScheduledDate(post.scheduled_for)}
                  </span>
                ) : (
                  post.date
                )}
              </PostDate>
              <PostStatus $status={getPostStatus(post)}>
                {getPostStatus(post) === 'published'
                  ? 'Published'
                  : getPostStatus(post) === 'scheduled'
                  ? 'Scheduled'
                  : 'Draft'}
              </PostStatus>
              <Actions>
                {post.source === 'supabase' ? (
                  <EditLink href={`/admin/blog/${post.id}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </EditLink>
                ) : (
                  <ActionButton title="Static posts cannot be edited here" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </ActionButton>
                )}
                <ActionButton
                  onClick={() => handleTogglePublish(post.id, post.published)}
                  title={post.published ? 'Unpublish' : 'Publish'}
                  style={post.source === 'static' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  {post.published ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </ActionButton>
                <ActionButton
                  $variant="danger"
                  onClick={() => handleDelete(post.id)}
                  style={post.source === 'static' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </ActionButton>
              </Actions>
            </TableRow>
          ))
        )}
      </PostsTable>

      {showTagsModal && (
        <ModalOverlay onClick={() => setShowTagsModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
            <CloseButton onClick={() => setShowTagsModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </CloseButton>
            <ModalTitle>Manage Tags</ModalTitle>
            <ModalDescription>
              Add new tags or delete existing ones. These tags will be available when creating blog posts.
            </ModalDescription>

            {tagSuccess && <SuccessMessage>{tagSuccess}</SuccessMessage>}
            {tagError && <ErrorMessage>{tagError}</ErrorMessage>}

            <div style={{ display: 'flex', gap: '12px' }}>
              <TagInput
                type="text"
                placeholder="Enter new tag name..."
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <AddTagButton onClick={handleAddTag} disabled={tagSaving || !newTagInput.trim()}>
                {tagSaving ? 'Adding...' : 'Add Tag'}
              </AddTagButton>
            </div>

            <TagsList>
              {availableTags.map((tag) => (
                <TagItem key={tag}>
                  {tag}
                  <DeleteTagButton onClick={() => handleDeleteTag(tag)} title="Delete tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </DeleteTagButton>
                </TagItem>
              ))}
            </TagsList>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
