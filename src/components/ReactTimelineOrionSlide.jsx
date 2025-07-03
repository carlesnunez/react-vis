import { styled } from '@linaria/react';
import React from 'react';

function ReactTimelineOrionSlide() {
  const timelineItems = [
    { text: 'Functional Components', year: '2015', status: 'completed' },
    { text: 'Fiber Architecture', year: '2017', status: 'completed' },
    { text: 'Error Boundaries', year: '2017', status: 'completed' },
    { text: 'Context API', year: '2018', status: 'completed' },
    { text: 'Hooks (useState, useEffect, etc.)', year: '2018', status: 'active' },
    { text: 'Memoization hooks', year: '2018', status: 'active' },
    { text: 'Lazy Loading (React Lazy Suspense)', year: '2018', status: 'completed' },
    { text: 'Concurrent Rendering', year: '2022', status: 'success' },
    { text: 'Suspense for data', year: '2022', status: 'success' },
    { text: 'React Server Components (RSC)', year: '2023+', status: 'active' },
  ];

  return (
    <SlideContainer>
      {/* Header similar to ORION */}
      <Header>
        <Logo>
          <LogoIcon>⚛️</LogoIcon>
          <LogoText>REACT EVOLUTION</LogoText>
        </Logo>
        <NavTabs>
          <NavTab active>Timeline</NavTab>
          <NavTab>Features</NavTab>
          <NavTab>Architecture</NavTab>
          <NavTab>Future</NavTab>
        </NavTabs>
        <YearIndicator>2015 - 2024</YearIndicator>
      </Header>

      <MainContent>
        {/* Left section with stats */}
        <StatsSection>
          <StatsCard>
            <StatsTitle>React Evolution</StatsTitle>
            <StatsValue>10</StatsValue>
            <StatsLabel>Major Features</StatsLabel>
            <StatsSubtext>Since 2015</StatsSubtext>
          </StatsCard>

          <StatsCard>
            <StatsTitle>Timeline Span</StatsTitle>
            <StatsValue>9</StatsValue>
            <StatsLabel>Years</StatsLabel>
            <StatsSubtext>2015 - 2024</StatsSubtext>
          </StatsCard>

          <YearBreakdown>
            <BreakdownTitle>By Year</BreakdownTitle>
            <BreakdownItem>
              <span>2015</span>
              <BreakdownBar width="10%" />
              <span>1</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>2017</span>
              <BreakdownBar width="20%" />
              <span>2</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>2018</span>
              <BreakdownBar width="40%" color="#f59e0b" />
              <span>4</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>2022</span>
              <BreakdownBar width="20%" color="#8b5cf6" />
              <span>2</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>2023+</span>
              <BreakdownBar width="10%" color="#667eea" />
              <span>1</span>
            </BreakdownItem>
          </YearBreakdown>
        </StatsSection>

        {/* Main timeline area */}
        <TimelineArea>
          <MainHeader>
            <MainTitle>React Feature Timeline</MainTitle>
            <AddButton>+</AddButton>
          </MainHeader>
          
          <TimelineSubheader>
            <TimelineLabel>Development History <span>DETAILS &gt;</span></TimelineLabel>
          </TimelineSubheader>

          <TimelineContainer>
            {timelineItems.map((item, index) => (
              <TimelineCard
                key={index}
                status={item.status}
              >
                <CardHeader>
                  <StatusDot status={item.status} />
                  <CardTitle>{item.text}</CardTitle>
                  <CardMenu>⋯</CardMenu>
                </CardHeader>
                <CardYear>({item.year})</CardYear>
              </TimelineCard>
            ))}
          </TimelineContainer>
        </TimelineArea>
      </MainContent>
    </SlideContainer>
  );
}

const SlideContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0f1419;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  background: #1a202c;
  border-bottom: 1px solid #2d3748;
  gap: 24px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const LogoText = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavTabs = styled.div`
  display: flex;
  gap: 32px;
  flex: 1;
  justify-content: center;
`;

const NavTab = styled.div`
  padding: 8px 0;
  border-bottom: 2px solid ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? '#667eea' : '#a0aec0'};
  cursor: pointer;
  font-weight: 500;
`;

const YearIndicator = styled.div`
  color: #a0aec0;
  font-size: 0.875rem;
  font-weight: 500;
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const StatsSection = styled.aside`
  width: 300px;
  background: #1a202c;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsCard = styled.div`
  background: #2d3748;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #4a5568;
`;

const StatsTitle = styled.h3`
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const StatsLabel = styled.div`
  color: #667eea;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

const StatsSubtext = styled.div`
  color: #718096;
  font-size: 0.75rem;
`;

const YearBreakdown = styled.div`
  background: #2d3748;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #4a5568;
`;

const BreakdownTitle = styled.h3`
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BreakdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  
  span:first-child {
    width: 50px;
    color: #a0aec0;
  }
  
  span:last-child {
    width: 20px;
    text-align: right;
    color: white;
    font-weight: 600;
  }
`;

const BreakdownBar = styled.div`
  flex: 1;
  height: 6px;
  background: ${props => props.color || '#00d4aa'};
  border-radius: 3px;
  width: ${props => props.width};
`;

const TimelineArea = styled.main`
  flex: 1;
  background: #0f1419;
  padding: 24px;
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4a5568;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineSubheader = styled.div`
  margin-bottom: 32px;
`;

const TimelineLabel = styled.div`
  color: #a0aec0;
  font-size: 1rem;
  margin-bottom: 8px;
  
  span {
    color: #667eea;
    cursor: pointer;
    font-size: 0.875rem;
  }
`;

const TimelineContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-height: 500px;
  overflow-y: auto;
`;

const TimelineCard = styled.div`
  background: #2d3748;
  border: 1px solid ${props => {
    switch(props.status) {
      case 'success': return '#48bb78';
      case 'active': return '#667eea';
      case 'completed': return '#00d4aa';
      default: return '#4a5568';
    }
  }};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch(props.status) {
      case 'success': return '#48bb78';
      case 'active': return '#667eea';
      case 'completed': return '#00d4aa';
      default: return '#a0aec0';
    }
  }};
`;

const CardTitle = styled.div`
  font-weight: 600;
  color: white;
  font-size: 0.875rem;
  flex: 1;
  margin-left: 8px;
  line-height: 1.3;
`;

const CardMenu = styled.div`
  color: #a0aec0;
  cursor: pointer;
  font-size: 1rem;
`;

const CardYear = styled.div`
  color: #a0aec0;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 16px;
`;

export default ReactTimelineOrionSlide; 