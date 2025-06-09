# 🚀 Sandpack Live Editor

A lightweight, modern code editor built with Sandpack for live coding demonstrations in presentations and slides.

## ✨ Features

- **Multiple Language Support**: React, Vanilla JavaScript, TypeScript
- **Live Preview**: Real-time code execution and preview
- **Modern UI**: Clean, responsive design with dark/light themes
- **Presentation Ready**: Fullscreen mode and optimized for slides
- **Interactive Console**: Built-in console for debugging
- **File Explorer**: Navigate through project files
- **Copy & Reset**: Easy code management tools
- **Syntax Highlighting**: Full syntax highlighting and auto-completion

## 🎯 Perfect For

- Live coding demonstrations
- Technical presentations
- Code workshops and tutorials
- Interactive coding sessions
- Educational content

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Templates

The editor comes with pre-configured templates:

### React Component
Interactive React component with state management and modern CSS.

### Vanilla JavaScript
Pure JavaScript with DOM manipulation and event handling.

### TypeScript
Type-safe TypeScript with interfaces and classes.

## 🎮 Controls

- **Template Selector**: Switch between different coding scenarios
- **View Modes**: Toggle between Code, Preview, Console, and Files
- **Theme Toggle**: Switch between light and dark themes
- **Fullscreen**: Expand for presentation mode
- **Reset**: Restore original template code
- **Copy**: Copy current code to clipboard

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Sandpack** - CodeSandbox's component toolkit
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons

## 📱 Responsive Design

The editor is fully responsive and works great on:
- Desktop computers
- Tablets
- Large mobile devices

## 🎯 Usage in Presentations

1. Open the editor in fullscreen mode
2. Select the appropriate template for your demo
3. Code live while explaining concepts
4. Use the preview to show results instantly
5. Switch to console for debugging demonstrations

## 🔧 Customization

You can easily add new templates by modifying the `templates` object in `src/App.tsx`:

```typescript
const templates = {
  myTemplate: {
    name: 'My Custom Template',
    files: {
      '/App.js': '// Your code here',
      '/style.css': '/* Your styles here */'
    },
    template: 'react' // or 'vanilla', 'node'
  }
};
```

## 📄 License

MIT License - feel free to use this in your presentations and workshops!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new templates
- Improve the UI/UX
- Add new features
- Fix bugs

---

**Happy coding! 🎉**