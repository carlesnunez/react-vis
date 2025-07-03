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
          },
        ],
          [
            {
              label: 'VerySlowComponent',
              parentId: 'component',
              dependsOnState: ['foo'],
            },
            {
              label: 'ModalManager',
              parentId: 'component',
              ownsState: 'open',
            },
          ],
          [
            {
              label: 'Button',
              parentId: 'modalmanager',
              dependsOnState: ['open'],
            },
            {
              label: 'ModalDialog',
              parentId: 'modalmanager',
              dependsOnState: ['open'],
            },
          ],
      ]}
    />
  );
}

export default MovingStateDownNodeGraph;
