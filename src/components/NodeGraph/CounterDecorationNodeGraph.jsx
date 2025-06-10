import React from 'react';

import NodeGraph from './NodeGraph';

function CounterDecorationNodeGraph() {
  return (
    <NodeGraph
      initialState={{
        count: 0,
      }}
      rows={[
        [
          {
            label: 'App',
          },
        ],
        [
          {
            label: 'Counter',
            parentId: 'app',
            ownsState: 'count',
          },
        ],
        [
          {
            label: 'BigCountNumber',
            parentId: 'counter',
            props: ['count'],
            dependsOnState: ['count'],
          },
          {
            label: 'Decoration',
            parentId: 'counter',
            dependsOnState: [],
          },
        ],
      ]}
    />
  );
}

export default CounterDecorationNodeGraph;