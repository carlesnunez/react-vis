import NodeGraph from '../components/NodeGraph/NodeGraph';

function CounterNodeGraph() {
  return (
    <NodeGraph
      initialState={{
        count: 0,
        theme: 'dark',
      }}
      rows={[
        [
          {
            label: 'ThemeContext',
            isContext: true,
            providesValue: 'theme',
          }
        ],
        [
          {
            label: 'Counter',
            parentId: 'themecontext',
            ownsState: 'count',
            usesContext: ['ThemeContext'],
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