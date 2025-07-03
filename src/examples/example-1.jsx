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
            ownsState: 'count',
          },
        ]
      ]}
    />
  );
}

export default CounterNodeGraph;