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
            label: 'App',
            usesContext: ['ThemeContext'],
          },
        ],
        [
          {
            label: 'Counter',
            parentId: 'app',
            ownsState: 'count',
            usesContext: ['ThemeContext'],
          },
          {
            label: 'UserProfile',
            parentId: 'app',
            usesContext: ['ThemeContext'],
          },
        ],
        [
          {
            label: 'BigCountNumber',
            parentId: 'counter',
            isPure: true,
            dependsOnState: ['count'],
            props: ['count'],
          },
        ]
      ]}
    />
  );
}

export default CounterNodeGraph;