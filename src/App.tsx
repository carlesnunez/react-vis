import React, { useState } from 'react';
import { 
  Sandpack, 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview,
  SandpackConsole,
  SandpackFileExplorer
} from '@codesandbox/sandpack-react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Maximize2, 
  Minimize2, 
  Moon, 
  Sun,
  Code,
  Eye,
  Terminal,
  FolderOpen
} from 'lucide-react';

// Predefined templates for different coding scenarios
const templates = {
  react: {
    name: 'React Component',
    files: {
      '/App.js': `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Live Demo</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button onClick={() => setCount(count - 1)}>
          Decrement
        </button>
      </header>
    </div>
  );
}

export default App;`,
      '/App.css': `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

button {
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #282c34;
  font-weight: bold;
}

button:hover {
  background-color: #21a9c7;
}`
    },
    template: 'react'
  },
  vanilla: {
    name: 'Vanilla JavaScript',
    files: {
      '/index.js': `// Interactive JavaScript Demo
const app = document.getElementById('app');

// Create a simple counter
let count = 0;

function createCounter() {
  const container = document.createElement('div');
  container.className = 'counter-container';
  
  const title = document.createElement('h1');
  title.textContent = 'JavaScript Live Demo';
  
  const countDisplay = document.createElement('p');
  countDisplay.textContent = \`Count: \${count}\`;
  countDisplay.className = 'count-display';
  
  const incrementBtn = document.createElement('button');
  incrementBtn.textContent = 'Increment';
  incrementBtn.onclick = () => {
    count++;
    countDisplay.textContent = \`Count: \${count}\`;
  };
  
  const decrementBtn = document.createElement('button');
  decrementBtn.textContent = 'Decrement';
  decrementBtn.onclick = () => {
    count--;
    countDisplay.textContent = \`Count: \${count}\`;
  };
  
  container.appendChild(title);
  container.appendChild(countDisplay);
  container.appendChild(incrementBtn);
  container.appendChild(decrementBtn);
  
  return container;
}

app.appendChild(createCounter());`,
      '/style.css': `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.counter-container {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  min-width: 300px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.count-display {
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
  margin: 20px 0;
}

button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

button:active {
  transform: translateY(0);
}`,
      '/index.html': `<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Demo</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="app"></div>
  <script src="index.js"></script>
</body>
</html>`
    },
    template: 'vanilla'
  },
  typescript: {
    name: 'TypeScript',
    files: {
      '/index.ts': `// TypeScript Live Demo
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {
  private users: User[] = [];
  private nextId: number = 1;

  addUser(name: string, email: string): User {
    const user: User = {
      id: this.nextId++,
      name,
      email,
      isActive: true
    };
    this.users.push(user);
    return user;
  }

  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }

  toggleUserStatus(id: number): boolean {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.isActive = !user.isActive;
      return true;
    }
    return false;
  }

  getUserCount(): number {
    return this.users.length;
  }
}

// Demo usage
const userManager = new UserManager();

// Add some users
userManager.addUser("Alice Johnson", "alice@example.com");
userManager.addUser("Bob Smith", "bob@example.com");
userManager.addUser("Carol Davis", "carol@example.com");

console.log("Total users:", userManager.getUserCount());
console.log("Active users:", userManager.getActiveUsers());

// Toggle a user's status
userManager.toggleUserStatus(2);
console.log("Active users after toggle:", userManager.getActiveUsers());`,
      '/tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}`
    },
    template: 'node'
  }
};

function App() {
  const [currentTemplate, setCurrentTemplate] = useState('react');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeView, setActiveView] = useState<'code' | 'preview' | 'console' | 'files'>('code');

  const handleReset = () => {
    // Force re-render by changing key
    setCurrentTemplate(prev => prev);
  };

  const handleCopy = async () => {
    const mainFile = templates[currentTemplate as keyof typeof templates].files[
      Object.keys(templates[currentTemplate as keyof typeof templates].files)[0]
    ];
    await navigator.clipboard.writeText(mainFile);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-4">
          <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            🚀 Live Code Editor
          </h1>
          <select
            value={currentTemplate}
            onChange={(e) => setCurrentTemplate(e.target.value)}
            className={`px-3 py-1 rounded-md border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {Object.entries(templates).map(([key, template]) => (
              <option key={key} value={key}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Toggle Buttons */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveView('code')}
              className={`p-2 rounded-md transition-colors ${
                activeView === 'code'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Code Editor"
            >
              <Code size={16} />
            </button>
            <button
              onClick={() => setActiveView('preview')}
              className={`p-2 rounded-md transition-colors ${
                activeView === 'preview'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Preview"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => setActiveView('console')}
              className={`p-2 rounded-md transition-colors ${
                activeView === 'console'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Console"
            >
              <Terminal size={16} />
            </button>
            <button
              onClick={() => setActiveView('files')}
              className={`p-2 rounded-md transition-colors ${
                activeView === 'files'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="File Explorer"
            >
              <FolderOpen size={16} />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          {/* Action Buttons */}
          <button
            onClick={handleReset}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Reset Code"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={handleCopy}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Copy Code"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isFullscreen ? 'h-screen' : 'h-[calc(100vh-64px)]'}`}>
        <SandpackProvider
          key={currentTemplate}
          template={templates[currentTemplate as keyof typeof templates].template as any}
          files={templates[currentTemplate as keyof typeof templates].files}
          theme={theme}
          options={{
            showNavigator: false,
            showTabs: true,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
            editorHeight: '100%',
            autorun: true,
            recompileMode: 'delayed',
            recompileDelay: 500,
          }}
        >
          <SandpackLayout className="h-full">
            {activeView === 'code' && (
              <SandpackCodeEditor 
                className="h-full"
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent
                closableTabs
              />
            )}
            {activeView === 'preview' && (
              <SandpackPreview 
                className="h-full"
                showOpenInCodeSandbox={false}
                showRefreshButton
                showNavigator
              />
            )}
            {activeView === 'console' && (
              <SandpackConsole 
                className="h-full"
                showHeader
                showSetupProgress
              />
            )}
            {activeView === 'files' && (
              <SandpackFileExplorer 
                className="h-full"
                autoHiddenFiles
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>

      {/* Footer */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'} border-t px-4 py-2 text-sm flex items-center justify-between`}>
        <div>
          Ready for live coding • Template: {templates[currentTemplate as keyof typeof templates].name}
        </div>
        <div className="flex items-center space-x-4">
          <span>Powered by Sandpack</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;