'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { blogPosts as staticBlogPosts } from '@/data/blog';

const Container = styled.div`
  max-width: 800px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666666;
  text-decoration: none;
  margin-bottom: 16px;

  &:hover {
    color: #1a1a1a;
  }

  svg {
    width: 16px;
    height: 16px;
  }
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
  margin-bottom: 32px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const PostItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid ${({ $selected }) => ($selected ? '#ff8c42' : '#e5e5e5')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? '#ff8c42' : '#cccccc')};
  }
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid ${({ $checked }) => ($checked ? '#ff8c42' : '#e5e5e5')};
  background: ${({ $checked }) => ($checked ? '#ff8c42' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    width: 14px;
    height: 14px;
    color: #ffffff;
  }
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const PostMeta = styled.div`
  font-size: 13px;
  color: #999999;
`;

const SelectAll = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #ff8c42;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: #ff8c42;
    color: #ffffff;
    border: none;
    &:hover { background: #e67d35; }
  `
      : `
    background: #ffffff;
    color: #666666;
    border: 1px solid #e5e5e5;
    &:hover { background: #f5f5f5; }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  color: #16a34a;
  font-size: 15px;
  margin-bottom: 24px;
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 15px;
  margin-bottom: 24px;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: #ff8c42;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: #666666;
  text-align: center;
  margin-bottom: 24px;
`;

export default function ImportBlogPosts() {
  const router = useRouter();
  const supabase = createClient();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const togglePost = (id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedPosts.length === staticBlogPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(staticBlogPosts.map((p) => p.id));
    }
  };

  const handleImport = async () => {
    if (selectedPosts.length === 0) return;

    setImporting(true);
    setProgress(0);
    setError('');
    setSuccess('');

    const postsToImport = staticBlogPosts.filter((p) => selectedPosts.includes(p.id));
    let imported = 0;
    let failed = 0;

    for (const post of postsToImport) {
      try {
        const { error } = await supabase.from('blog_posts').upsert({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          date: post.date,
          read_time: post.readTime,
          tags: post.tags,
          thumbnail: post.thumbnail || null,
          author_name: post.author.name,
          author_image: post.author.image || null,
          published: true,
        }, {
          onConflict: 'slug'
        });

        if (error) {
          failed++;
        } else {
          imported++;
        }
      } catch (err) {
        failed++;
      }

      setProgress(Math.round(((imported + failed) / postsToImport.length) * 100));
    }

    setImporting(false);

    if (failed === 0) {
      setSuccess(`Successfully imported ${imported} blog posts!`);
    } else {
      setError(`Imported ${imported} posts, but ${failed} failed.`);
    }
  };

  return (
    <Container>
      <BackLink href="/admin/blog">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Posts
      </BackLink>

      <Title>Import Existing Posts</Title>
      <Subtitle>Import your existing blog posts from the static data file to Supabase.</Subtitle>

      {success && <SuccessMessage>{success}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {importing && (
        <>
          <ProgressBar>
            <ProgressFill $progress={progress} />
          </ProgressBar>
          <ProgressText>Importing... {progress}%</ProgressText>
        </>
      )}

      <Card>
        <SelectAll onClick={toggleAll}>
          {selectedPosts.length === staticBlogPosts.length ? 'Deselect All' : 'Select All'} ({staticBlogPosts.length} posts)
        </SelectAll>

        <PostList>
          {staticBlogPosts.map((post) => (
            <PostItem
              key={post.id}
              $selected={selectedPosts.includes(post.id)}
              onClick={() => togglePost(post.id)}
            >
              <Checkbox $checked={selectedPosts.includes(post.id)}>
                {selectedPosts.includes(post.id) && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </Checkbox>
              <PostInfo>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>{post.date} • {post.tags.join(', ')}</PostMeta>
              </PostInfo>
            </PostItem>
          ))}
        </PostList>

        <ButtonGroup>
          <Button $variant="secondary" onClick={() => router.push('/admin/blog')}>
            Cancel
          </Button>
          <Button
            $variant="primary"
            onClick={handleImport}
            disabled={importing || selectedPosts.length === 0}
          >
            {importing ? 'Importing...' : `Import ${selectedPosts.length} Posts`}
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
}
