import { styled } from '@linaria/react';
import React from 'react';

import { pick } from '../../utils';
import Paper from '../Paper';

import { Provider } from './Context';
import Node from './Node';
import { useStateByRow } from './NodeGraph.helpers';

function NodeGraph({ initialState, groupId, rows }) {
  const wrapperRef = React.useRef();
  const viewportRef = React.useRef();
  
  const [state, setState] = React.useState(initialState);
  const [transform, setTransform] = React.useState({
    x: 0,
    y: 0,
    scale: 1
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [showZoomControls, setShowZoomControls] = React.useState(false);
  const zoomTimeoutRef = React.useRef();

  const stateByRow = useStateByRow(rows);

  // Function to show zoom controls and reset timeout
  const showControls = React.useCallback(() => {
    setShowZoomControls(true);
    
    // Clear existing timeout
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    
    // Hide controls after 1 second of inactivity
    zoomTimeoutRef.current = setTimeout(() => {
      setShowZoomControls(false);
    }, 1000);
  }, []);

  // Apply global background styling
  React.useEffect(() => {
    const originalBodyStyle = document.body.style.background;
    document.body.style.background = 'linear-gradient(135deg, #1e1e2e 0%, #232338 100%)';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    return () => {
      document.body.style.background = originalBodyStyle;
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }
    };
  }, []);

  // Handle wheel events for zooming
  React.useEffect(() => {
    const handleWheel = (e) => {
      if (!viewportRef.current) return;
      
      e.preventDefault();
      
      // Show controls when zooming
      showControls();
      
      const rect = viewportRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const delta = e.deltaY * -0.01;
      const scaleChange = Math.max(0.1, Math.min(3, transform.scale + delta));
      
      setTransform(prev => ({
        ...prev,
        scale: scaleChange
      }));
    };

    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener('wheel', handleWheel, { passive: false });
      return () => viewport.removeEventListener('wheel', handleWheel);
    }
  }, [transform.scale, showControls]);

  // Handle mouse events for panning
  React.useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target === viewportRef.current || e.target.closest('[data-node-graph-bg]')) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - transform.x,
          y: e.clientY - transform.y
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, transform.x, transform.y]);

  React.useEffect(() => {
    const dateEntries = Object.entries(initialState).filter(
      ([key, val]) => {
        return typeof val === 'object';
      }
    );

    if (dateEntries.length > 0) {
      const intervalId = window.setInterval(() => {
        setState((currentState) => {
          const newDates = dateEntries.reduce((acc, [key]) => {
            return {
              ...acc,
              [key]: new Date(),
            };
          }, {});

          return {
            ...currentState,
            ...newDates,
          };
        });
      }, 1000);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [initialState]);

  return (
    <Viewport 
      ref={viewportRef} 
      data-node-graph-bg="true"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <TransformContainer 
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
        }}
      >
        <Provider groupId={groupId} wrapperRef={wrapperRef}>
          <Wrapper ref={wrapperRef}>
            {rows.map((nodes, rowIndex) => (
              <Row key={rowIndex}>
                {nodes.map((node, nodeIndex) => {
                  const key = node.id || node.label;

                  // Which state should this Node receive? it depends
                  // on the row index! We automatically pass all state
                  // to nodes that are "low enough" so that they'll
                  // re-render when that state changes.
                  let relevantState = pick(state, stateByRow[rowIndex]);

                  // TODO: I should have a `type` that can be
                  // `normal` | `pure` | `secret-pure`
                  if (node.isPure || node.isPureSecretly) {
                    relevantState = pick(
                      relevantState,
                      node.dependsOnState || []
                    );
                  }

                  let alignment;
                  if (nodes.length === 1) {
                    alignment = 'center';
                  } else if (nodes.length === 2) {
                    alignment = nodeIndex === 0 ? 'left' : 'right';
                  } else if (nodes.length === 3) {
                    if (nodeIndex === 0) {
                      alignment = 'left';
                    } else if (nodeIndex === 1) {
                      alignment = 'center';
                    } else {
                      alignment = 'right';
                    }
                  }

                  console.log(node);

                  return (
                    <Node
                      key={key}
                      {...node}
                      state={relevantState}
                      alignment={alignment}
                      onChange={(event) => {
                        setState((currentState) => ({
                          ...currentState,
                          [node.ownsState]: event.target.value,
                        }));
                      }}
                      onClick={() => {
                        setState((currentState) => ({
                          ...currentState,
                          [node.ownsState]:
                            currentState[node.ownsState] + 1,
                        }));
                      }}
                    />
                  );
                })}
              </Row>
            ))}
          </Wrapper>
        </Provider>
      </TransformContainer>
      
      {/* Zoom controls */}
      <ZoomControls showControls={showZoomControls}>
        <ZoomButton 
          onClick={() => {
            setTransform(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.2) }));
            showControls();
          }}
        >
          +
        </ZoomButton>
        <ZoomLevel>{Math.round(transform.scale * 100)}%</ZoomLevel>
        <ZoomButton 
          onClick={() => {
            setTransform(prev => ({ ...prev, scale: Math.max(0.1, prev.scale - 0.2) }));
            showControls();
          }}
        >
          −
        </ZoomButton>
        <ResetButton 
          onClick={() => {
            setTransform({ x: 0, y: 0, scale: 1 });
            showControls();
          }}
        >
          Reset
        </ResetButton>
      </ZoomControls>
    </Viewport>
  );
}

const Viewport = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1e2e 0%, #232338 100%);
  
  /* Subtle grid pattern */
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
  background-size: 20px 20px;
`;

const TransformContainer = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transition: transform 0.1s ease-out;
  will-change: transform;
`;

const Wrapper = styled(Paper)`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 48px 32px;
  
  /* Remove all frame styling */
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;

  p {
    margin: 0;
    color: #ffffff;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(42, 45, 62, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid #3a3d4e;
  border-radius: 8px;
  padding: 8px 12px;
  
  /* Fade transition */
  opacity: ${props => props.showControls ? 1 : 0};
  visibility: ${props => props.showControls ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(${props => props.showControls ? '0' : '10px'});
`;

const ZoomButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #5352ed;
  color: white;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4742d4;
  }
`;

const ZoomLevel = styled.span`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const ResetButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #3a3d4e;
  background: transparent;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default NodeGraph;