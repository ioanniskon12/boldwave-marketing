'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/styles/theme';
import Container from '@/components/layout/Container';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface BlogArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  day: string;
  month: string;
  slug: string;
  image: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Top Strategies to Drive Growth in Today\'s Competitive Market.',
    category: 'Business',
    author: 'Admin',
    day: '22',
    month: 'Apr 2025',
    slug: 'strategies-drive-growth',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'The Role of Business Consultants in Transforming Your Company.',
    category: 'Business',
    author: 'Admin',
    day: '22',
    month: 'Apr 2025',
    slug: 'business-consultants-role',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Unlocking Success: The Power of Strategic Business Consulting.',
    category: 'Business',
    author: 'Admin',
    day: '22',
    month: 'Apr 2025',
    slug: 'strategic-business-consulting',
    image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop',
  },
];

const Section = styled.section`
  padding: 80px 0;
  background: #faf8f5;

  ${media.lg} {
    padding: 120px 0;
  }
`;

const Header = styled.div`
  margin-bottom: 48px;
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const LabelDot = styled.span`
  width: 6px;
  height: 6px;
  background: #ff8c42;
  border-radius: 50%;
`;

const LabelText = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff8c42;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0a0a12;
  line-height: 1.3;
  max-width: 500px;

  ${media.lg} {
    font-size: 36px;
  }
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlogImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const ArticleCard = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover ${BlogImage} {
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

const ArticleTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0a0a12;
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;

  ${ArticleCard}:hover & {
    color: #ff8c42;
  }

  ${media.lg} {
    font-size: 18px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function BlogPreview() {
  return (
    <Section>
      <Container>
        <Header>
          <Label>
            <LabelDot />
            <LabelText>Blog & News</LabelText>
          </Label>
          <Title>Stay Updated with the Latest Articles and Blog News.</Title>
        </Header>

        <ArticlesGrid>
          {blogArticles.map((article) => (
            <ArticleCard key={article.id} href={`/blog/${article.slug}`}>
              <ImageWrapper>
                <BlogImage
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  unoptimized
                />
                <DateBadge>
                  <DateDay>{article.day}</DateDay>
                  <DateMonth>{article.month}</DateMonth>
                </DateBadge>
              </ImageWrapper>
              <CardMeta>
                <Category>{article.category}</Category>
                <MetaDivider>+</MetaDivider>
                <Author>{article.author}</Author>
              </CardMeta>
              <ArticleTitle>{article.title}</ArticleTitle>
            </ArticleCard>
          ))}
        </ArticlesGrid>

        <ButtonWrapper>
          <AnimatedButton href="/blog" variant="orange">View All Articles</AnimatedButton>
        </ButtonWrapper>
      </Container>
    </Section>
  );
}
