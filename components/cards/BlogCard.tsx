'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { media } from '@/styles/theme';

interface BlogCardProps {
  post: BlogPost;
}

// Map slugs to images
const blogImages: Record<string, string> = {
  'strategies-drive-growth': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'business-consultants-role': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
  'strategic-business-consulting': 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop',
  'ios-14-playbook-paid-social-2024': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
  'roas-obsession-hurting-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  '5-ad-creative-frameworks': 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop',
  'attribution-problem-solution': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  'dtc-brand-scale-case-study': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  'google-ads-vs-meta-ads': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
};

// Parse date to get day and month
function parseDate(dateStr: string): { day: string; month: string } {
  // Handle formats like "March 15, 2024" or "April 22, 2025"
  const months: Record<string, string> = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
    'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
  };

  const parts = dateStr.split(' ');
  if (parts.length >= 3) {
    const monthFull = parts[0];
    const day = parts[1].replace(',', '');
    const year = parts[2];
    return {
      day: day,
      month: `${months[monthFull] || monthFull} ${year}`
    };
  }
  return { day: '01', month: 'Jan 2024' };
}

const BlogImageStyled = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const CardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover ${BlogImageStyled} {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
`;

const DateBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: #ffffff;
  border-radius: 8px;
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DateDay = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #0a0a12;
  line-height: 1;
`;

const DateMonth = styled.div`
  font-size: 11px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 2px;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const Category = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ff8c42;
`;

const MetaDivider = styled.span`
  color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
`;

const Author = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0a0a12;
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${CardWrapper}:hover & {
    color: #ff8c42;
  }

  ${media.lg} {
    font-size: 18px;
  }
`;

export default function BlogCard({ post }: BlogCardProps) {
  const image = blogImages[post.slug] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
  const { day, month } = parseDate(post.date);
  const category = post.tags[0] || 'Business';

  return (
    <CardWrapper href={`/blog/${post.slug}`}>
      <ImageWrapper>
        <BlogImageStyled
          src={image}
          alt={post.title}
          width={600}
          height={400}
          unoptimized
        />
        <DateBadge>
          <DateDay>{day}</DateDay>
          <DateMonth>{month}</DateMonth>
        </DateBadge>
      </ImageWrapper>
      <CardMeta>
        <Category>{category}</Category>
        <MetaDivider>+</MetaDivider>
        <Author>{post.author.name}</Author>
      </CardMeta>
      <Title>{post.title}</Title>
    </CardWrapper>
  );
}
