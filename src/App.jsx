import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider
} from '@codesandbox/sandpack-react';
import {
  Home,
  Moon,
  RotateCcw,
  Sun
} from 'lucide-react';
import { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { categories, examples } from './examples';
import Example1 from './examples/example-1.jsx';
import Example2 from './examples/example-2.jsx';

// Componente para mostrar un ejemplo específico
function ExampleViewer({ exampleKey }) {
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();
  
  const currentExampleData = examples[exampleKey];

  if (!currentExampleData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ejemplo no encontrado
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header minimalista */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Inicio"
          >
            <Home size={16} />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentExampleData.name}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.location.reload()}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <SandpackProvider
          key={exampleKey}
          template={currentExampleData.template}
          files={currentExampleData.files}
          theme={theme}
          options={{
            showNavigator: false,
            showTabs: false,
            showLineNumbers: true,
            showInlineErrors: false,
            wrapContent: true,
            editorHeight: '100%',
            autorun: true,
            recompileMode: 'delayed',
            recompileDelay: 300,
          }}
        >
          <SandpackLayout className="h-full">
            <SandpackCodeEditor 
              className="h-full"
              showLineNumbers
              wrapContent
            />
            <SandpackPreview 
              className="h-full"
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              showNavigator={false}
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

// Componente para la página de inicio con selector
function HomePage() {
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  const handleNavigateToExample = (key) => {
    navigate('/' + key);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Live Code Editor
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Lista de ejemplos */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Ejemplos Disponibles
          </h2>
          
          {Object.entries(categories).map(([category, exampleKeys]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exampleKeys.map((key) => {
                  const example = examples[key];
                  return (
                    <div
                      key={key}
                      onClick={() => handleNavigateToExample(key)}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {example.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        /{key}
                      </p>
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Abrir ejemplo →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente wrapper para manejar parámetros de URL
function ExampleRoute() {
  const { exampleKey } = useParams();
  
  if (!exampleKey || !(exampleKey in examples)) {
    return <ExampleViewer exampleKey="react-counter" />;
  }
  
  return <ExampleViewer exampleKey={exampleKey} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/example-2" element={<Example2 />} />
      <Route path="/example-1" element={<Example1 />} />
      {/* <Route path="/:exampleKey" element={<ExampleRoute />} /> */}
    </Routes>
  );
}

export default App;