'use client';

import styled from 'styled-components';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
