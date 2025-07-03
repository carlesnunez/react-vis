import NodeGraph from '../components/NodeGraph/NodeGraph';

function MovingStateDownNodeGraph() {
  return (
    <NodeGraph
      initialState={{
        open: false,
      }}
      rows={[
        [
          {
            label: 'Component',
            ownsState: 'open',
          },
        ],
        [
          {
            label: 'Button',
            parentId: 'component',
            props: ['open'],
          },
          {
            label: 'VerySlowComponent',
            parentId: 'component',
          },
        ],
        [
          {
            label: 'ModalDialog',
            parentId: 'button',
            props: ['open'],
            dependsOnState: ['open'],
          },
        ],
      ]}
    />
  );
}

export default MovingStateDownNodeGraph;
