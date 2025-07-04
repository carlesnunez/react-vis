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
            ownsState: 'count',
            label: 'App',
          },
        ],
        [
          {
            label: `Counter`,
            parentId: 'app',
            props: ['count'],
          },
        ],
        [
          {
            label: `Children`,
            parentId: 'counter',
          },
        ]
      ]}
    />
  );
}

export default CounterNodeGraph;