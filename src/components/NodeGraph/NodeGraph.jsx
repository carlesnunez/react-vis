import { styled } from '@linaria/react';
import React from 'react';

import { pick } from '../../utils';
import Paper from '../Paper';

import { Provider } from './Context';
import Node from './Node';
import { useStateByRow } from './NodeGraph.helpers';

function NodeGraph({ initialState, groupId, rows }) {
  const wrapperRef = React.useRef();

  const [state, setState] = React.useState(initialState);

  const stateByRow = useStateByRow(rows);

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
  );
}

const Wrapper = styled(Paper)`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin: 0 -32px 32px;
  padding: 32px;
  background: var(--color-original-white);

  p {
    margin: 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
`;

export default NodeGraph;