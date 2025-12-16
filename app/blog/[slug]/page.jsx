import { notFound } from 'next/navigation';
import { getBlogPostBySlug, blogPosts } from '@/data';
import { BlogPostContent } from './BlogPostContent';
import { createClient } from '@/lib/supabase/server';

// Helper to get post from Supabase
async function getSupabasePost(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) return null;

  // Transform to match static post format
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    date: data.date,
    readTime: data.read_time,
    tags: data.tags || [],
    thumbnail: data.thumbnail || data.meta_image || '',
    author: {
      name: data.author_name,
      image: data.author_image || '',
    },
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    meta_image: data.meta_image,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Try Supabase first
  const supabasePost = await getSupabasePost(slug);
  if (supabasePost) {
    return {
      title: supabasePost.meta_title || supabasePost.title,
      description: supabasePost.meta_description || supabasePost.excerpt,
      openGraph: {
        title: supabasePost.meta_title || supabasePost.title,
        description: supabasePost.meta_description || supabasePost.excerpt,
        ...(supabasePost.meta_image && { images: [{ url: supabasePost.meta_image }] }),
      },
    };
  }

  // Fall back to static
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // Try Supabase first
  const supabasePost = await getSupabasePost(slug);
  if (supabasePost) {
    return <BlogPostContent post={supabasePost} />;
  }

  // Fall back to static
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
