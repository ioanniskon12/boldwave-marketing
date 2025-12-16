'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getAllTags } from '@/data/blog';

// Get all available tags from existing blog posts
const availableTags = getAllTags();

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

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
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

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
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
`;

const EditorWrapper = styled.div`
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;

  &:focus-within {
    border-color: #ff8c42;
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e5e5;
`;

const ToolbarGroup = styled.div`
  display: flex;
  gap: 2px;
  padding-right: 12px;
  border-right: 1px solid #e5e5e5;
  margin-right: 8px;

  &:last-child {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
  }
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) => ($active ? '#ff8c42' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#ff8c42' : '#e5e5e5')};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ContentEditor = styled.textarea`
  width: 100%;
  padding: 20px;
  font-size: 16px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  line-height: 1.7;
  border: none;
  outline: none;
  resize: vertical;
  min-height: 500px;

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
`;

const PredefinedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

const PredefinedTag = styled.button<{ $selected: boolean }>`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ $selected }) => ($selected ? '#ff8c42' : '#f5f5f5')};
  color: ${({ $selected }) => ($selected ? '#ffffff' : '#666666')};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $selected }) => ($selected ? '#e67d35' : '#e5e5e5')};
  }
`;

const TagsLabel = styled.div`
  font-size: 12px;
  color: #999999;
  margin-top: 8px;
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

const Modal = styled.div`
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
  padding: 24px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const DesignTemplates = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const TemplateCard = styled.button<{ $selected: boolean }>`
  padding: 16px;
  background: ${({ $selected }) => ($selected ? '#fff8f4' : '#ffffff')};
  border: 2px solid ${({ $selected }) => ($selected ? '#ff8c42' : '#e5e5e5')};
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff8c42;
  }
`;

const TemplateTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const TemplateDesc = styled.div`
  font-size: 12px;
  color: #666666;
`;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function NewBlogPost() {
  const router = useRouter();
  const supabase = createClient();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [contentImageUrl, setContentImageUrl] = useState('');
  const [contentImageAlt, setContentImageAlt] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    tags: [] as string[],
    thumbnail: '',
    author_name: 'Admin',
    meta_title: '',
    meta_description: '',
    meta_image: '',
    published: false,
  });

  const togglePredefinedTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !prev.slug ? { slug: generateSlug(value) } : {}),
    }));
  };

  const insertAtCursor = (before: string, after: string = '') => {
    const editor = editorRef.current;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newContent =
      formData.content.substring(0, start) +
      before + selectedText + after +
      formData.content.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      editor.focus();
      const newPosition = start + before.length + selectedText.length + after.length;
      editor.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const insertText = (text: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const start = editor.selectionStart;
    const newContent =
      formData.content.substring(0, start) +
      text +
      formData.content.substring(start);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      editor.focus();
      const newPosition = start + text.length;
      editor.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleBold = () => insertAtCursor('**', '**');
  const handleItalic = () => insertAtCursor('*', '*');
  const handleHeading2 = () => insertAtCursor('\n## ');
  const handleHeading3 = () => insertAtCursor('\n### ');
  const handleBulletList = () => insertAtCursor('\n- ');
  const handleNumberedList = () => insertAtCursor('\n1. ');
  const handleQuote = () => insertAtCursor('\n> ');
  const handleCode = () => insertAtCursor('`', '`');
  const handleCodeBlock = () => insertAtCursor('\n```\n', '\n```\n');

  const handleInsertLink = () => {
    if (linkUrl) {
      const linkMarkdown = linkText ? `[${linkText}](${linkUrl})` : `[${linkUrl}](${linkUrl})`;
      insertText(linkMarkdown);
    }
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleInsertImage = () => {
    if (contentImageUrl) {
      const imageMarkdown = `\n![${contentImageAlt || 'Image'}](${contentImageUrl})\n`;
      insertText(imageMarkdown);
    }
    setShowImageModal(false);
    setContentImageUrl('');
    setContentImageAlt('');
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog/content/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setContentImageUrl(publicUrl);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
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

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, thumbnail: publicUrl }));
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (publish: boolean) => {
    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.from('blog_posts').insert({
        ...formData,
        read_time: calculateReadTime(formData.content),
        published: publish,
      });

      if (error) throw error;

      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackLink href="/admin/blog">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Posts
      </BackLink>

      <PageHeader>
        <Title>New Blog Post</Title>
        <HeaderActions>
          <Button $variant="secondary" onClick={() => handleSubmit(false)} disabled={loading}>
            Save Draft
          </Button>
          <Button $variant="primary" onClick={() => handleSubmit(true)} disabled={loading}>
            {loading ? 'Publishing...' : 'Publish'}
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
            <EditorWrapper>
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarButton onClick={handleBold} title="Bold (Ctrl+B)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                    </svg>
                  </ToolbarButton>
                  <ToolbarButton onClick={handleItalic} title="Italic (Ctrl+I)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="4" x2="10" y2="4" />
                      <line x1="14" y1="20" x2="5" y2="20" />
                      <line x1="15" y1="4" x2="9" y2="20" />
                    </svg>
                  </ToolbarButton>
                </ToolbarGroup>

                <ToolbarGroup>
                  <ToolbarButton onClick={handleHeading2} title="Heading 2">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <text x="2" y="18" fontSize="14" fontWeight="bold">H2</text>
                    </svg>
                  </ToolbarButton>
                  <ToolbarButton onClick={handleHeading3} title="Heading 3">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <text x="2" y="18" fontSize="14" fontWeight="bold">H3</text>
                    </svg>
                  </ToolbarButton>
                </ToolbarGroup>

                <ToolbarGroup>
                  <ToolbarButton onClick={handleBulletList} title="Bullet List">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="9" y1="6" x2="20" y2="6" />
                      <line x1="9" y1="12" x2="20" y2="12" />
                      <line x1="9" y1="18" x2="20" y2="18" />
                      <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                      <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                    </svg>
                  </ToolbarButton>
                  <ToolbarButton onClick={handleNumberedList} title="Numbered List">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="10" y1="6" x2="21" y2="6" />
                      <line x1="10" y1="12" x2="21" y2="12" />
                      <line x1="10" y1="18" x2="21" y2="18" />
                      <text x="2" y="8" fontSize="8" fill="currentColor">1</text>
                      <text x="2" y="14" fontSize="8" fill="currentColor">2</text>
                      <text x="2" y="20" fontSize="8" fill="currentColor">3</text>
                    </svg>
                  </ToolbarButton>
                  <ToolbarButton onClick={handleQuote} title="Quote">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                  </ToolbarButton>
                </ToolbarGroup>

                <ToolbarGroup>
                  <ToolbarButton onClick={() => setShowLinkModal(true)} title="Insert Link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </ToolbarButton>
                  <ToolbarButton onClick={() => setShowImageModal(true)} title="Insert Image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </ToolbarButton>
                </ToolbarGroup>

                <ToolbarGroup>
                  <ToolbarButton onClick={handleCode} title="Inline Code">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </ToolbarButton>
                  <ToolbarButton onClick={handleCodeBlock} title="Code Block">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <polyline points="8 8 5 12 8 16" />
                      <polyline points="16 8 19 12 16 16" />
                    </svg>
                  </ToolbarButton>
                </ToolbarGroup>
              </Toolbar>
              <ContentEditor
                ref={editorRef}
                name="content"
                placeholder="Write your post content here... (Markdown supported)"
                value={formData.content}
                onChange={handleChange}
              />
            </EditorWrapper>
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
              <ImageUpload onClick={() => document.getElementById('thumbnail-upload')?.click()}>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
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
                  placeholder="Add custom tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </TagsInput>
              <TagsLabel>Select from existing tags:</TagsLabel>
              <PredefinedTags>
                {availableTags.map((tag) => (
                  <PredefinedTag
                    key={tag}
                    $selected={formData.tags.includes(tag)}
                    onClick={() => togglePredefinedTag(tag)}
                    type="button"
                  >
                    {tag}
                  </PredefinedTag>
                ))}
              </PredefinedTags>
            </FormGroup>
          </Card>

          <Card>
            <CardTitle>SEO Settings</CardTitle>
            <FormGroup>
              <Label>Meta Title <span style={{ color: '#999', fontWeight: 400 }}>(60 chars max)</span></Label>
              <Input
                name="meta_title"
                placeholder="SEO title (defaults to post title)"
                value={formData.meta_title}
                onChange={handleChange}
                maxLength={60}
              />
              <div style={{ fontSize: '12px', color: formData.meta_title.length > 50 ? '#f59e0b' : '#999', marginTop: '4px' }}>
                {formData.meta_title.length}/60
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Meta Description <span style={{ color: '#999', fontWeight: 400 }}>(160 chars max)</span></Label>
              <Textarea
                name="meta_description"
                placeholder="SEO description (defaults to excerpt)"
                value={formData.meta_description}
                onChange={handleChange}
                style={{ minHeight: '80px' }}
                maxLength={160}
              />
              <div style={{ fontSize: '12px', color: formData.meta_description.length > 140 ? '#f59e0b' : '#999', marginTop: '4px' }}>
                {formData.meta_description.length}/160
              </div>
            </FormGroup>
            <FormGroup>
              <Label>OG Image <span style={{ color: '#999', fontWeight: 400 }}>(1200x630 recommended)</span></Label>
              {formData.meta_image ? (
                <ImagePreview>
                  <img src={formData.meta_image} alt="OG" style={{ height: '150px' }} />
                  <RemoveImage onClick={() => setFormData((prev) => ({ ...prev, meta_image: '' }))}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </RemoveImage>
                </ImagePreview>
              ) : (
                <ImageUpload onClick={() => document.getElementById('meta-image-upload')?.click()}>
                  <input
                    id="meta-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setImageUploading(true);
                      try {
                        const fileExt = file.name.split('.').pop();
                        const fileName = `blog/og/${Date.now()}.${fileExt}`;
                        const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
                        if (uploadError) throw uploadError;
                        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
                        setFormData((prev) => ({ ...prev, meta_image: publicUrl }));
                      } catch (err) {
                        setError('Failed to upload image');
                      } finally {
                        setImageUploading(false);
                      }
                    }}
                  />
                  <UploadIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </UploadIcon>
                  <UploadText>{imageUploading ? 'Uploading...' : 'Upload OG image'}</UploadText>
                  <UploadHint>Used when sharing on social media</UploadHint>
                </ImageUpload>
              )}
            </FormGroup>
          </Card>
        </Sidebar>
      </EditorContainer>

      {/* Link Modal */}
      {showLinkModal && (
        <Modal onClick={() => setShowLinkModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Insert Link</ModalTitle>
            <FormGroup>
              <Label>Link Text</Label>
              <Input
                placeholder="Click here"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>URL</Label>
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </FormGroup>
            <ModalButtons>
              <Button $variant="secondary" onClick={() => setShowLinkModal(false)}>Cancel</Button>
              <Button $variant="primary" onClick={handleInsertLink}>Insert Link</Button>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <Modal onClick={() => setShowImageModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Insert Image</ModalTitle>
            <FormGroup>
              <Label>Upload Image</Label>
              <ImageUpload onClick={() => document.getElementById('content-image-upload')?.click()}>
                <input
                  id="content-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleContentImageUpload}
                />
                <UploadIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </UploadIcon>
                <UploadText>{imageUploading ? 'Uploading...' : 'Click to upload'}</UploadText>
              </ImageUpload>
            </FormGroup>
            <FormGroup>
              <Label>Or paste image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={contentImageUrl}
                onChange={(e) => setContentImageUrl(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Alt Text</Label>
              <Input
                placeholder="Image description"
                value={contentImageAlt}
                onChange={(e) => setContentImageAlt(e.target.value)}
              />
            </FormGroup>
            {contentImageUrl && (
              <ImagePreview style={{ marginTop: '16px' }}>
                <img src={contentImageUrl} alt={contentImageAlt} style={{ height: '150px' }} />
              </ImagePreview>
            )}
            <ModalButtons>
              <Button $variant="secondary" onClick={() => setShowImageModal(false)}>Cancel</Button>
              <Button $variant="primary" onClick={handleInsertImage} disabled={!contentImageUrl}>Insert Image</Button>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
