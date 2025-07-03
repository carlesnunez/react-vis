import { styled } from '@linaria/react';
import React from 'react';

function ReactTimelineSlide() {
  const timelineItems = [
    { text: 'Functional Components', year: '2015' },
    { text: 'Fiber Architecture', year: '2017' },
    { text: 'Error Boundaries', year: '2017' },
    { text: 'Context API', year: '2018' },
    { text: 'Hooks (useState, useEffect, etc.)', year: '2018' },
    { text: 'Memoization hooks', year: '2018' },
    { text: 'Lazy Loading (React Lazy Suspense)', year: '2018' },
    { text: 'Concurrent Rendering', year: '2022' },
    { text: 'Suspense for data', year: '2022' },
    { text: 'React Server Components (RSC)', year: '2023+' },
  ];

  return (
    <SlideContainer>
      <GeometricBackground>
        <DiagonalSection />
      </GeometricBackground>
      
      <ContentArea>
        <Timeline>
          {timelineItems.map((item, index) => (
            <TimelineItem key={index}>
              <ItemText>{item.text}</ItemText>
              <ItemYear>({item.year})</ItemYear>
            </TimelineItem>
          ))}
        </Timeline>
      </ContentArea>
      
      {/* Grid overlay for presentation effect */}
      <GridOverlay />
    </SlideContainer>
  );
}

const SlideContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #2a2a2a;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const GeometricBackground = styled.div`
  position: absolute;
  inset: 0;
  background: #2a2a2a;
`;

const DiagonalSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  clip-path: polygon(0 0, 70% 0, 50% 100%, 0 100%);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -2px;
    width: 4px;
    height: 100%;
    background: #000;
    transform: skewX(-20deg);
  }
`;

const ContentArea = styled.div`
  position: absolute;
  top: 15%;
  right: 8%;
  width: 45%;
  height: 70%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #000;
  border-radius: 0;
  padding: 40px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Timeline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(0, 212, 255, 0.05);
    transform: translateX(4px);
    transition: all 0.2s ease;
  }
`;

const ItemText = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.4;
  flex: 1;
`;

const ItemYear = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #666;
  min-width: 80px;
  text-align: right;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
`;

export default ReactTimelineSlide; 