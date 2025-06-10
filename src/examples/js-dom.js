export const jsDom = {
  name: "JS DOM",
  template: "vanilla",
  files: {
    "/index.js": `// Manipulación del DOM
const app = document.getElementById('app');

// Crear elementos
const title = document.createElement('h1');
title.textContent = 'DOM Manipulation';
title.style.textAlign = 'center';
title.style.color = '#333';

const button = document.createElement('button');
button.textContent = 'Click me!';
button.style.padding = '1rem 2rem';
button.style.fontSize = '1rem';
button.style.cursor = 'pointer';
button.style.margin = '1rem';

const counter = document.createElement('p');
counter.textContent = 'Clicks: 0';
counter.style.fontSize = '1.5rem';
counter.style.textAlign = 'center';

let clicks = 0;

// Event listener
button.addEventListener('click', () => {
  clicks++;
  counter.textContent = \`Clicks: \${clicks}\`;
  
  // Cambiar color del botón
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  button.style.backgroundColor = colors[clicks % colors.length];
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
});

// Añadir al DOM
const container = document.createElement('div');
container.style.padding = '2rem';
container.style.textAlign = 'center';
container.style.fontFamily = 'system-ui';

container.appendChild(title);
container.appendChild(counter);
container.appendChild(button);
app.appendChild(container);`,
    "/index.html": `<!DOCTYPE html>
<html>
<head>
  <title>DOM Demo</title>
  <meta charset="UTF-8" />
</head>
<body>
  <div id="app"></div>
  <script src="index.js"></script>
</body>
</html>`
  }
};