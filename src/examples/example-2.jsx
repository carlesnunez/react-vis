import NodeGraph from '../components/NodeGraph/NodeGraph';

function CounterNodeGraph() {
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
            label: 'Counter Children',
            parentId: 'counter',
            dependsOnState: ['count'],
          },
        ]
      ]}
    />
  );
}

export default CounterNodeGraph;