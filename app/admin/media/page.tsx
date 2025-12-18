'use client';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px;
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.1));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  svg {
    width: 56px;
    height: 56px;
    color: #ff8c42;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666666;
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff7ed;
  color: #ff8c42;
  font-size: 14px;
  font-weight: 600;
  border-radius: 100px;
  border: 2px solid #ffedd5;
`;

export default function MediaLibraryPage() {
  return (
    <Container>
      <IconWrapper>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </IconWrapper>
      <Title>Media Library</Title>
      <Subtitle>
        Upload, organize, and manage all your images and files in one place. This feature is currently being developed.
      </Subtitle>
      <Badge>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Coming Soon
      </Badge>
    </Container>
  );
}
