export const reactNodeGraph = {
  name: "React Node Graph",
  template: "react",
  files: {
    "/App.js": `import React from 'react';
import NodeGraph from './NodeGraph';

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
            label: 'BigCountNumber',
            parentId: 'counter',
            props: ['count'],
            dependsOnState: ['count'],
          },
        ],
      ]}
    />
  );
}

export default CounterNodeGraph;`,

    "/NodeGraph.jsx": `import React, { useState, useCallback } from 'react';
import Node from './Node';
import Context from './Context';
import { DARK_COLORS_RAW } from './constants/colors';

function NodeGraph({ initialState, rows }) {
  const [state, setState] = useState(initialState);
  
  const updateState = useCallback((key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <Context.Provider value={{ state, updateState }}>
      <div style={{ 
        padding: '20px', 
        backgroundColor: \`hsl(\${DARK_COLORS_RAW.colorBackground[0]}deg \${DARK_COLORS_RAW.colorBackground[1]}% \${DARK_COLORS_RAW.colorBackground[2]}%)\`,
        color: \`hsl(\${DARK_COLORS_RAW.colorText[0]}deg \${DARK_COLORS_RAW.colorText[1]}% \${DARK_COLORS_RAW.colorText[2]}%)\`,
        minHeight: '100vh',
        fontFamily: 'monospace'
      }}>
        <h2>React Component Node Graph</h2>
        <p>Interactive visualization of React component hierarchy and state flow</p>
        
        <div style={{ marginTop: '20px' }}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              margin: '20px 0',
              gap: '20px'
            }}>
              {row.map((nodeConfig, nodeIndex) => (
                <Node
                  key={\`\${rowIndex}-\${nodeIndex}\`}
                  config={nodeConfig}
                  rowIndex={rowIndex}
                  nodeIndex={nodeIndex}
                />
              ))}
            </div>
          ))}
        </div>
        
        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: \`hsl(\${DARK_COLORS_RAW.colorGray100[0]}deg \${DARK_COLORS_RAW.colorGray100[1]}% \${DARK_COLORS_RAW.colorGray100[2]}%)\`,
          borderRadius: '8px'
        }}>
          <h3>Current State:</h3>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </Context.Provider>
  );
}

export default NodeGraph;`,

    "/Node.jsx": `import React, { useContext } from 'react';
import Context from './Context';
import { DARK_COLORS_RAW } from './constants/colors';

function Node({ config, rowIndex, nodeIndex }) {
  const { state, updateState } = useContext(Context);
  const { label, ownsState, props = [], dependsOnState = [] } = config;

  const handleStateChange = (key) => {
    if (key === 'count') {
      updateState(key, state[key] + 1);
    }
  };

  const getNodeColor = () => {
    if (ownsState) {
      return DARK_COLORS_RAW.colorPrimary;
    }
    if (dependsOnState.length > 0) {
      return DARK_COLORS_RAW.colorSecondary;
    }
    return DARK_COLORS_RAW.colorGray400;
  };

  const nodeColor = getNodeColor();

  return (
    <div style={{
      backgroundColor: \`hsl(\${nodeColor[0]}deg \${nodeColor[1]}% \${nodeColor[2]}%)\`,
      color: \`hsl(\${DARK_COLORS_RAW.colorAdaptiveWhite[0]}deg \${DARK_COLORS_RAW.colorAdaptiveWhite[1]}% \${DARK_COLORS_RAW.colorAdaptiveWhite[2]}%)\`,
      padding: '15px 20px',
      borderRadius: '8px',
      border: \`2px solid hsl(\${nodeColor[0]}deg \${nodeColor[1]}% \${Math.min(nodeColor[2] + 20, 100)}%)\`,
      minWidth: '120px',
      textAlign: 'center',
      cursor: ownsState ? 'pointer' : 'default',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    }}
    onClick={() => ownsState && handleStateChange(ownsState)}
    onMouseEnter={(e) => {
      if (ownsState) {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
      }
    }}
    onMouseLeave={(e) => {
      if (ownsState) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
      }
    }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {label}
      </div>
      
      {ownsState && (
        <div style={{ 
          fontSize: '12px', 
          opacity: 0.8,
          marginBottom: '4px'
        }}>
          State: {ownsState} = {state[ownsState]}
        </div>
      )}
      
      {props.length > 0 && (
        <div style={{ 
          fontSize: '12px', 
          opacity: 0.8,
          marginBottom: '4px'
        }}>
          Props: {props.map(prop => \`\${prop}=\${state[prop] || 'undefined'}\`).join(', ')}
        </div>
      )}
      
      {dependsOnState.length > 0 && (
        <div style={{ 
          fontSize: '12px', 
          opacity: 0.8 
        }}>
          Depends on: {dependsOnState.join(', ')}
        </div>
      )}
      
      {ownsState && (
        <div style={{ 
          fontSize: '11px', 
          marginTop: '8px',
          opacity: 0.6
        }}>
          Click to increment
        </div>
      )}
    </div>
  );
}

export default Node;`,

    "/Context.jsx": `import { createContext } from 'react';

const Context = createContext({
  state: {},
  updateState: () => {}
});

export default Context;`,

    "/constants/colors.js": `export const DARK_COLORS_RAW = {
  colorText: [210, 10, 90],
  colorBackground: [210, 15, 6],
  colorPrimary: [225, 100, 75],
  colorSecondary: [333, 100, 55],
  colorGray100: [210, 15, 12],
  colorGray400: [210, 9, 40],
  colorAdaptiveWhite: [210, 25, 92],
};`,
  },
};