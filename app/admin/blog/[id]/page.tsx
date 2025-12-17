'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BlogPost, BlogPostUpdate } from '@/lib/supabase/types';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
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
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant }) => {
    if ($variant === 'primary') {
      return `
        background: #ff8c42;
        color: #ffffff;
        border: none;
        &:hover { background: #e67d35; }
      `;
    }
    if ($variant === 'danger') {
      return `
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
        &:hover { background: #fee2e2; }
      `;
    }
    return `
      background: #ffffff;
      color: #666666;
      border: 1px solid #e5e5e5;
      &:hover { background: #f5f5f5; }
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
`;

const MainEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 24px;
  font-weight: 600;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #cccccc;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 16px;
  font-size: 15px;
  font-family: inherit;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

const ContentEditor = styled.textarea`
  width: 100%;
  padding: 20px;
  font-size: 16px;
  font-family: 'Monaco', 'Menlo', monospace;
  line-height: 1.7;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  outline: none;
  resize: vertical;
  min-height: 500px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff8c42;
    background: #fff8f4;
  }

  input {
    display: none;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const RemoveImage = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #666666;
  }
`;

const UploadText = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
`;

const UploadHint = styled.div`
  font-size: 12px;
  color: #999999;
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  min-height: 48px;

  &:focus-within {
    border-color: #ff8c42;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  border-radius: 20px;

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
  }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 100px;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 4px;

  &::placeholder {
    color: #999999;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 24px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 100px 20px;
  color: #666666;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-top: 16px;
`;

const ToggleLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ToggleLabelText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`;

const ToggleLabelHint = styled.span`
  font-size: 12px;
  color: #666666;
`;

const ToggleSwitch = styled.button<{ $active: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? '#ff8c42' : '#d1d5db')};
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: left 0.2s ease;
  }
`;

const StatusBadge = styled.span<{ $published: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 20px;
  background: ${({ $published }) => ($published ? '#dcfce7' : '#fef3c7')};
  color: ${({ $published }) => ($published ? '#16a34a' : '#d97706')};
  margin-left: 12px;
`;

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    date: '',
    tags: [] as string[],
    thumbnail: '',
    author_name: '',
    meta_title: '',
    meta_description: '',
    noindex: false,
    published: false,
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error || !data) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      const post = data as BlogPost;
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        tags: post.tags,
        thumbnail: post.thumbnail || '',
        author_name: post.author_name,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        noindex: post.noindex || false,
        published: post.published,
      });
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, thumbnail: publicUrl }));
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (publish?: boolean) => {
    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const updateData: BlogPostUpdate = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        date: formData.date,
        tags: formData.tags,
        thumbnail: formData.thumbnail || null,
        author_name: formData.author_name,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        noindex: formData.noindex,
        read_time: calculateReadTime(formData.content),
        updated_at: new Date().toISOString(),
        published: publish !== undefined ? publish : formData.published,
      };

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData as never)
        .eq('id', postId);

      if (error) throw error;

      if (publish !== undefined) {
        setFormData((prev) => ({ ...prev, published: publish }));
      }

      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', postId as never);

      if (error) throw error;

      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState>Loading post...</LoadingState>;
  }

  return (
    <>
      <BackLink href="/admin/blog">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Posts
      </BackLink>

      <PageHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title>Edit Post</Title>
          <StatusBadge $published={formData.published}>
            {formData.published ? 'Published' : 'Draft'}
          </StatusBadge>
        </div>
        <HeaderActions>
          <Button $variant="danger" onClick={handleDelete} disabled={saving}>
            Delete
          </Button>
          {formData.published ? (
            <Button $variant="secondary" onClick={() => handleSubmit(false)} disabled={saving}>
              Unpublish
            </Button>
          ) : (
            <Button $variant="secondary" onClick={() => handleSubmit()} disabled={saving}>
              Save Draft
            </Button>
          )}
          <Button $variant="primary" onClick={() => handleSubmit(true)} disabled={saving}>
            {saving ? 'Saving...' : formData.published ? 'Update' : 'Publish'}
          </Button>
        </HeaderActions>
      </PageHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <EditorContainer>
        <MainEditor>
          <Card>
            <TitleInput
              name="title"
              placeholder="Post title..."
              value={formData.title}
              onChange={handleChange}
            />
          </Card>

          <Card>
            <CardTitle>Content</CardTitle>
            <ContentEditor
              name="content"
              placeholder="Write your post content here... (Markdown supported)"
              value={formData.content}
              onChange={handleChange}
            />
          </Card>

          <Card>
            <CardTitle>Excerpt</CardTitle>
            <Textarea
              name="excerpt"
              placeholder="Brief description shown in blog listing..."
              value={formData.excerpt}
              onChange={handleChange}
            />
          </Card>
        </MainEditor>

        <Sidebar>
          <Card>
            <CardTitle>Featured Image</CardTitle>
            {formData.thumbnail ? (
              <ImagePreview>
                <img src={formData.thumbnail} alt="Featured" />
                <RemoveImage onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </RemoveImage>
              </ImagePreview>
            ) : (
              <ImageUpload onClick={() => document.getElementById('image-upload')?.click()}>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <UploadIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </UploadIcon>
                <UploadText>{imageUploading ? 'Uploading...' : 'Click to upload'}</UploadText>
                <UploadHint>PNG, JPG up to 5MB</UploadHint>
              </ImageUpload>
            )}
          </Card>

          <Card>
            <CardTitle>Post Details</CardTitle>
            <FormGroup>
              <Label>URL Slug</Label>
              <Input
                name="slug"
                placeholder="post-url-slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Date</Label>
              <Input
                name="date"
                placeholder="December 16, 2024"
                value={formData.date}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>
              <Input
                name="author_name"
                placeholder="Author name"
                value={formData.author_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tags</Label>
              <TagsInput>
                {formData.tags.map((tag) => (
                  <Tag key={tag}>
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </Tag>
                ))}
                <TagInput
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </TagsInput>
            </FormGroup>
          </Card>

          <Card>
            <CardTitle>SEO Settings</CardTitle>
            <FormGroup>
              <Label>Meta Title</Label>
              <Input
                name="meta_title"
                placeholder="SEO title (optional)"
                value={formData.meta_title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Meta Description</Label>
              <Textarea
                name="meta_description"
                placeholder="SEO description (optional)"
                value={formData.meta_description}
                onChange={handleChange}
                style={{ minHeight: '80px' }}
              />
            </FormGroup>
            <ToggleContainer style={{ background: formData.noindex ? '#fef2f2' : '#f9f9f9' }}>
              <ToggleLabel>
                <ToggleLabelText>Hide from Search Engines</ToggleLabelText>
                <ToggleLabelHint>Add noindex, nofollow to this post</ToggleLabelHint>
              </ToggleLabel>
              <ToggleSwitch
                $active={formData.noindex}
                onClick={() => setFormData((prev) => ({ ...prev, noindex: !prev.noindex }))}
              />
            </ToggleContainer>
          </Card>
        </Sidebar>
      </EditorContainer>
    </>
  );
}
