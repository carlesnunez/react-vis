export const reactCounter = {
  name: "React Counter",
  template: "react",
  files: {
    "/App.js": `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontFamily: 'system-ui'
    }}>
      <h1>Contador React</h1>
      <p style={{ fontSize: '2rem', margin: '1rem 0' }}>
        {count}
      </p>
      <div>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ 
            margin: '0 0.5rem', 
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ 
            margin: '0 0.5rem', 
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}`
  }
};