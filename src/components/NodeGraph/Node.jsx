import { styled } from '@linaria/react';
import format from 'date-fns/format';
import React from 'react';



import Context from './Context';
import { useParentPath } from './Node.helpers';

const TRANSITION_LENGTH = 1000;

function Node({
  id,
  label,
  parentId,
  ownsState,
  props,
  isPure,
  state,
  alignment,
  onClick,
  onChange,
}) {
  const [isActive, setIsActive] = React.useState(false);

  const nodeRef = React.useRef();

  const actualId = id || label.toLowerCase();

  const parentPath = useParentPath({
    actualId,
    parentId,
    nodeRef,
    alignment,
  });

  React.useEffect(() => {
    setIsActive(true);

    window.setTimeout(() => {
      setIsActive(false);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(state));

  // HACK: This won't work if there are multiple pieces of state
  const isPathActive = isActive && !ownsState;

  return (
    <>
      <Wrapper id={actualId} ref={nodeRef} hasError={false} isActive={isActive} ownsState={ownsState}>
        <CategoryLabel>
          {ownsState ? 'State Management' : 
           props?.length > 0 ? 'UI Component' : 
           'Component'}
        </CategoryLabel>
        <Label>{label}</Label>
        {props && (
          <Props>
            Props:
            {` { `}
            {props.join(', ')}
            {` }`}
          </Props>
        )}
        {ownsState && (
          <StateDisplay
            ownsState={ownsState}
            state={state}
            onClick={onClick}
            onChange={onChange}
          />
        )}
        <ActiveCover
          style={{
            opacity: isActive ? 1 : 0,
            transition: isActive
              ? 'opacity 0ms'
              : `opacity ${TRANSITION_LENGTH}ms`,
          }}
        />
        {isPure && (
          <PureWrapper>
            <PureText
              style={{
                left: alignment === 'left' ? 16 : undefined,
                right: alignment === 'right' ? 16 : undefined,
              }}
            >
              Pure Component
            </PureText>
          </PureWrapper>
        )}
      </Wrapper>

      {parentPath && (
        <Svg>
          <path
            d={parentPath}
            fill="none"
            style={{
              stroke: isPathActive
                ? 'hsl(150deg 70% 65%)'
                : 'hsl(220deg 20% 70%)',
              transition: isPathActive
                ? 'stroke 0ms'
                : `stroke ${TRANSITION_LENGTH}ms`,
            }}
          />
        </Svg>
      )}
    </>
  );
}

function StateDisplay({ ownsState, state, onClick, onChange }) {
  const stateType = typeof state[ownsState];
  const { groupId } = React.useContext(Context);
  const id = `${groupId}-${ownsState}`;

  return (
    <>
      {stateType === 'object' && (
        <>
          <StateParagraph>
            {ownsState}: {format(state[ownsState], 'HH:mm:ss')}
          </StateParagraph>
        </>
      )}
      {stateType === 'number' && (
        <>
          <StateParagraph>
            {ownsState}: {state[ownsState]}
          </StateParagraph>
          <Button onClick={onClick}>Increment</Button>
        </>
      )}
      {stateType === 'string' && (
        <MiniForm onSubmit={(event) => event.preventDefault()}>
          <label htmlFor={id}>{ownsState}:</label>
          <input
            type="text"
            value={state[ownsState]}
            onChange={onChange}
          />
        </MiniForm>
      )}
    </>
  );
}

const BACKGROUNDS = {
  idle: 'hsl(220deg 20% 92%)',
  active: 'hsl(150deg 70% 65%)',
};

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 180px;
  max-width: min(100%, 220px);
  min-height: 100px;
  padding: 16px 20px;
  
  /* Dark professional styling */
  background: #2a2d3e;
  border: 1px solid #3a3d4e;
  border-radius: 12px;
  
  /* Subtle shadow */
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1);
    
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.875rem;
  
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #4a4d5e;
  }
  
  /* Status indicator dot */
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    right: 16px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => {
      if (props.hasError) return '#ff4757';
      if (props.isActive) return '#2ed573';
      if (props.ownsState) return '#5352ed';
      return '#8a8a8a';
    }};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const Props = styled.p`
  margin: 16px 12px 12px 12px !important;
  color: #8a8a8a;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  
  /* Subtle container styling */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 6px 10px;
  
  /* Slightly lighter text for contrast */
  color: #a8a8a8;
`;

const ActiveCover = styled.div`
  position: absolute;
  inset: -1px;
  background: transparent;
  border: 2px solid #2ed573;
  border-radius: 13px;
  pointer-events: none;
  opacity: ${props => props.isActive ? 1 : 0};
  
  /* Gentle glow animation */
  animation: ${props => props.isActive ? 'status-glow 0.8s ease-in-out' : 'none'};
  
  @keyframes status-glow {
    0%, 100% { 
      box-shadow: 0 0 0 rgba(46, 213, 115, 0.4);
    }
    50% { 
      box-shadow: 0 0 20px rgba(46, 213, 115, 0.4);
    }
  }
`;

const Label = styled.p`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 24px); /* Account for status dot */
  text-align: center;
`;

const CategoryLabel = styled.p`
  font-size: 0.7rem;
  color: #8a8a8a;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
`;

const StateParagraph = styled.p`
  font-size: 0.875rem;
  color: #b8b8b8;
  margin: 8px 0 0 0;
  font-weight: 500;
  text-align: center;
`;

const MiniForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 8px;

  label {
    color: #b8b8b8;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input {
    width: 100%;
    background: #1e1e2e;
    border: 1px solid #3a3d4e;
    border-radius: 6px;
    padding: 8px 12px;
    color: #ffffff;
    font-family: inherit;
    font-size: 0.875rem;
    outline: none;
    
    &:focus {
      border-color: #5352ed;
      box-shadow: 0 0 0 2px rgba(83, 82, 237, 0.2);
    }
    
    &::placeholder {
      color: #6a6a6a;
    }
  }
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-top: 8px;
  background: #5352ed;
  border: none;
  border-radius: 6px;
  color: white;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: center;
  
  &:hover {
    background: #4742d4;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PureWrapper = styled.div`
  position: absolute;
  inset: -2px;
  border: 2px solid #FF8700;
  border-radius: 14px;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border: 1px solid #FF8700;
    border-radius: 16px;
    opacity: 0.3;
    animation: pure-pulse 3s ease-in-out infinite;
  }
  
  @keyframes pure-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

const PureText = styled.p`
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 0.6rem;
  color: #FF8700;
  text-align: center;
  background: #2a2d3e;
  padding: 2px 8px;
  border-radius: 6px;
  white-space: nowrap;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid #FF8700;
`;

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default Node;