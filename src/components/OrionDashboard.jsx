import { styled } from '@linaria/react';
import React from 'react';

function OrionDashboard() {
  const [selectedNode, setSelectedNode] = React.useState(null);

  const nodeGraphData = [
    { id: 'product-release', label: 'Product release', type: 'Development', status: 'active', x: 20, y: 30, connections: ['design-layout', 'front-end'] },
    { id: 'sending-email', label: 'Sending Email', type: 'Marketing', status: 'success', x: 35, y: 15, connections: ['social-network'] },
    { id: 'design-layout', label: 'Design layout', type: 'Design', status: 'active', x: 35, y: 45, connections: ['front-end', 'server-issues'] },
    { id: 'front-end', label: 'Front end', type: 'Development', status: 'active', x: 35, y: 65, connections: ['server-issues'] },
    { id: 'server-issues', label: 'Server issues', type: 'Development', status: 'active', x: 35, y: 85, connections: ['social-network'] },
    { id: 'social-network', label: 'Social network', type: 'Marketing', status: 'error', x: 50, y: 75, connections: ['template-design', 'influencers'] },
    { id: 'release-letter', label: 'Release letter', type: 'Marketing', status: 'normal', x: 60, y: 10 },
    { id: 'news-letter', label: 'News letter', type: 'Marketing', status: 'normal', x: 60, y: 25 },
    { id: 'digest', label: 'Digest', type: 'Marketing', status: 'normal', x: 60, y: 40 },
    { id: 'mvp-release', label: 'MVP release', type: 'Development', status: 'normal', x: 60, y: 55, connections: ['optimization'] },
    { id: 'advertising', label: 'Advertising', type: 'Design', status: 'error', x: 60, y: 70 },
    { id: 'template-design', label: 'Template design', type: 'Design', status: 'success', x: 60, y: 85 },
    { id: 'influencers', label: 'Influencers', type: 'Marketing', status: 'normal', x: 60, y: 95 },
    { id: 'bug-test', label: 'Bug test', type: 'Development', status: 'normal', x: 80, y: 30 },
    { id: 'product-release-2', label: 'Product release', type: 'Development', status: 'normal', x: 80, y: 50 },
    { id: 'optimization', label: 'Optimization', type: 'Development', status: 'normal', x: 80, y: 70 },
  ];

  const connections = [];
  nodeGraphData.forEach(node => {
    if (node.connections) {
      node.connections.forEach(targetId => {
        const target = nodeGraphData.find(n => n.id === targetId);
        if (target) {
          connections.push({
            from: { x: node.x, y: node.y },
            to: { x: target.x, y: target.y }
          });
        }
      });
    }
  });

  return (
    <DashboardContainer>
      {/* Header */}
      <Header>
        <Logo>
          <LogoIcon>⚪</LogoIcon>
          <LogoText>ORION</LogoText>
        </Logo>
        <SearchBar placeholder="Search..." />
        <NavTabs>
          <NavTab>Statistics</NavTab>
          <NavTab active>Overview</NavTab>
          <NavTab>Dashboard</NavTab>
          <NavTab>Analytics</NavTab>
        </NavTabs>
        <UserArea>
          <UserIcon>👤</UserIcon>
          <MenuIcon>☰</MenuIcon>
        </UserArea>
      </Header>

      <MainContent>
        {/* Sidebar */}
        <Sidebar>
          <MetricCard>
            <MetricChart>
              <ChartLine />
            </MetricChart>
            <MetricTitle>Total earning</MetricTitle>
            <MetricValue>$12,875</MetricValue>
            <MetricChange positive>+10%</MetricChange>
            <MetricSubtext>Compared to $21,490 last year</MetricSubtext>
            
            <ProgressList>
              <ProgressItem>
                <ProgressDot color="#00d4aa" />
                <span>Sales</span>
                <ProgressBar value="70" color="#00d4aa" />
              </ProgressItem>
              <ProgressItem>
                <ProgressDot color="#8b5cf6" />
                <span>Product</span>
                <ProgressBar value="45" color="#8b5cf6" />
              </ProgressItem>
              <ProgressItem>
                <ProgressDot color="#f59e0b" />
                <span>Sales</span>
                <ProgressBar value="85" color="#f59e0b" />
              </ProgressItem>
            </ProgressList>
          </MetricCard>

          <MetricCard>
            <MetricTitle>Total earning</MetricTitle>
            <MetricValue>$12,875</MetricValue>
            <MetricChange positive>+10%</MetricChange>
            <MetricSubtext>Compared to $21,490 last year</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricTitle>Total earning</MetricTitle>
            <MetricValue>$12,875</MetricValue>
            <MetricChange positive>+10%</MetricChange>
            <MetricSubtext>Compared to $21,490 last year</MetricSubtext>
          </MetricCard>

          <TrendsCard>
            <MetricTitle>Trends</MetricTitle>
            <MetricValue>$135,422</MetricValue>
            <MetricChange positive>+10%</MetricChange>
            <MetricSubtext>Compared to $112,490 last year</MetricSubtext>
            
            <TrendsList>
              <TrendItem>
                <span>January</span>
                <TrendBar width="90%" />
                <span>3234</span>
              </TrendItem>
              <TrendItem>
                <span>February</span>
                <TrendBar width="45%" />
                <span>332</span>
              </TrendItem>
              <TrendItem>
                <span>March</span>
                <TrendBar width="70%" color="#8b5cf6" />
                <span>1231</span>
              </TrendItem>
            </TrendsList>
          </TrendsCard>
        </Sidebar>

        {/* Main Area */}
        <MainArea>
          <MainHeader>
            <MainTitle>General statistics</MainTitle>
            <AddButton>+</AddButton>
          </MainHeader>
          
          <StatsSection>
            <StatsLabel>All users <span>DETAIL &gt;</span></StatsLabel>
            <StatsValue>7,541,390</StatsValue>
          </StatsSection>

          {/* Node Graph */}
          <NodeGraphArea>
            <svg width="100%" height="100%">
              {/* Connections */}
              {connections.map((conn, index) => (
                <path
                  key={index}
                  d={`M ${conn.from.x}% ${conn.from.y}% Q ${(conn.from.x + conn.to.x) / 2}% ${Math.min(conn.from.y, conn.to.y) - 5}% ${conn.to.x}% ${conn.to.y}%`}
                  stroke="#4a5568"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="none"
                />
              ))}
            </svg>
            
            {/* Nodes */}
            {nodeGraphData.map(node => (
              <NodeItem
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                status={node.status}
                onClick={() => setSelectedNode(node)}
              >
                <NodeHeader>
                  <NodeStatus status={node.status} />
                  <NodeLabel>{node.label}</NodeLabel>
                  <NodeMenu>⋯</NodeMenu>
                </NodeHeader>
                <NodeType>{node.type}</NodeType>
              </NodeItem>
            ))}
          </NodeGraphArea>
        </MainArea>
      </MainContent>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const SearchBar = styled.input`
  background: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 6px;
  padding: 8px 16px;
  color: white;
  width: 300px;
  
  &::placeholder {
    color: #a0aec0;
  }
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

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #4a5568;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  color: #a0aec0;
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const Sidebar = styled.aside`
  width: 300px;
  background: #1a202c;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MetricCard = styled.div`
  background: #2d3748;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #4a5568;
`;

const MetricChart = styled.div`
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
`;

const ChartLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30'%3E%3Cpath d='M0,25 Q25,5 50,15 T100,10' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat center;
  background-size: 100% 100%;
`;

const MetricTitle = styled.h3`
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const MetricChange = styled.div`
  color: ${props => props.positive ? '#48bb78' : '#f56565'};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const MetricSubtext = styled.div`
  color: #718096;
  font-size: 0.75rem;
`;

const ProgressList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: #4a5568;
  border-radius: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${props => props.value}%;
    background: ${props => props.color};
    border-radius: 2px;
  }
`;

const TrendsCard = styled(MetricCard)``;

const TrendsList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TrendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  
  span:first-child {
    width: 70px;
    color: #a0aec0;
  }
  
  span:last-child {
    width: 40px;
    text-align: right;
    color: white;
  }
`;

const TrendBar = styled.div`
  flex: 1;
  height: 6px;
  background: ${props => props.color || '#00d4aa'};
  border-radius: 3px;
  width: ${props => props.width};
`;

const MainArea = styled.main`
  flex: 1;
  background: #0f1419;
  padding: 24px;
  position: relative;
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

const StatsSection = styled.div`
  margin-bottom: 32px;
`;

const StatsLabel = styled.div`
  color: #a0aec0;
  font-size: 1rem;
  margin-bottom: 8px;
  
  span {
    color: #667eea;
    cursor: pointer;
    font-size: 0.875rem;
  }
`;

const StatsValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;
`;

const NodeGraphArea = styled.div`
  position: relative;
  height: 500px;
  width: 100%;
  
  svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const NodeItem = styled.div`
  position: absolute;
  background: #2d3748;
  border: 1px solid ${props => {
    switch(props.status) {
      case 'success': return '#48bb78';
      case 'error': return '#f56565';
      case 'active': return '#667eea';
      default: return '#4a5568';
    }
  }};
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 140px;
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const NodeStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch(props.status) {
      case 'success': return '#48bb78';
      case 'error': return '#f56565';
      case 'active': return '#667eea';
      default: return '#a0aec0';
    }
  }};
`;

const NodeLabel = styled.div`
  font-weight: 600;
  color: white;
  font-size: 0.875rem;
  flex: 1;
  margin-left: 8px;
`;

const NodeMenu = styled.div`
  color: #a0aec0;
  cursor: pointer;
  font-size: 1rem;
`;

const NodeType = styled.div`
  color: #a0aec0;
  font-size: 0.75rem;
  text-transform: capitalize;
`;

export default OrionDashboard; 