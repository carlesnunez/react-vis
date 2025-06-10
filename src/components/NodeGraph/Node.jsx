import { styled } from '@linaria/react';
import format from 'date-fns/format';
import React from 'react';

import { BREAKPOINTS } from '../../constants';

import DefaultButton from '../DefaultButton';

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
console.log({parentPath})
  return (
    <>
      <Wrapper id={actualId} ref={nodeRef}>
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
  --pseudo-shadow-height: 4px;
  --radius: 16px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 150px;
  max-width: min(100%, 250px);
  min-height: 7.8125rem;
  border-radius: var(--radius);
  padding: 16px;
  border-bottom: var(--pseudo-shadow-height) solid hsl(220deg 10% 80%);
  background-color: hsl(220deg 20% 92%);
  font-family: var(--font-family-mono);
  font-size: 1rem;
`;

const Props = styled.p`
  margin: 0;
  color: var(--color-gray-700);
  font-size: 0.75rem;
`;

const ActiveCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: calc(var(--pseudo-shadow-height) * -1);
  width: 100%;
  height: calc(100% + var(--pseudo-shadow-height));
  background: hsl(150deg 100% 35% / 1);
  mix-blend-mode: hard-light;
  pointer-events: none;
  border-radius: inherit;
`;

const Label = styled.p`
  display: block;
  font-size: 1.3125rem;
  font-weight: var(--font-weight-bold);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const ChildRow = styled.div`
  display: flex;
`;

const StateParagraph = styled.p`
  font-size: 1.125rem;
`;

const MiniForm = styled.form`
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  margin-top: auto;

  input {
    flex: 1;
    min-width: 0;
  }
`;

const Button = styled(DefaultButton)`
  padding: 4px 16px;
  margin-top: 24px;

  @media ${BREAKPOINTS.smAndSmaller} {
    border: 1px solid var(--color-gray-300);
    border-bottom-color: var(--color-gray-400);
    background: var(--color-background);
    border-radius: 3px;
    color: var(--color-text);
  }
`;

const Svg = styled.svg`
  display: block;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  path {
    stroke: hsl(220deg 20% 70%);
    stroke-width: 3px;
    stroke-linecap: round;
  }
`;

const PureWrapper = styled.div`
  position: absolute;
  inset: -8px;
  bottom: -12px;
  border: 4px solid hsl(50deg 100% 50%);
  border-radius: calc(var(--radius) + 4px);
  pointer-events: none;
`;
const PureText = styled.p`
  position: absolute;
  top: 0;
  font-size: 0.75rem;
  transform: translateY(-120%);
  color: hsl(40deg 100% 30%);
  text-align: center;
`;

export default Node;