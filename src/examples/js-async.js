export const jsAsync = {
  name: "JS Async",
  template: "vanilla",
  files: {
    "/index.js": `// Programación Asíncrona
const app = document.getElementById('app');

// Crear UI
const container = document.createElement('div');
container.style.padding = '2rem';
container.style.fontFamily = 'system-ui';
container.style.textAlign = 'center';

const title = document.createElement('h1');
title.textContent = 'Async JavaScript';

const status = document.createElement('p');
status.textContent = 'Listo para hacer peticiones...';
status.style.fontSize = '1.2rem';
status.style.margin = '1rem 0';

const button = document.createElement('button');
button.textContent = 'Fetch Random User';
button.style.padding = '1rem 2rem';
button.style.fontSize = '1rem';
button.style.cursor = 'pointer';
button.style.backgroundColor = '#007bff';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '5px';

const userInfo = document.createElement('div');
userInfo.style.marginTop = '2rem';
userInfo.style.padding = '1rem';
userInfo.style.backgroundColor = '#f8f9fa';
userInfo.style.borderRadius = '5px';

// Función async/await
async function fetchRandomUser() {
  try {
    status.textContent = 'Cargando usuario...';
    button.disabled = true;
    
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    
    userInfo.innerHTML = \`
      <img src="\${user.picture.large}" 
           style="border-radius: 50%; width: 100px; height: 100px;">
      <h3>\${user.name.first} \${user.name.last}</h3>
      <p>📧 \${user.email}</p>
      <p>📍 \${user.location.city}, \${user.location.country}</p>
    \`;
    
    status.textContent = '✅ Usuario cargado!';
  } catch (error) {
    status.textContent = '❌ Error al cargar usuario';
    console.error('Error:', error);
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', fetchRandomUser);

container.appendChild(title);
container.appendChild(status);
container.appendChild(button);
container.appendChild(userInfo);
app.appendChild(container);`,
    "/index.html": `<!DOCTYPE html>
<html>
<head>
  <title>Async Demo</title>
  <meta charset="UTF-8" />
</head>
<body>
  <div id="app"></div>
  <script src="index.js"></script>
</body>
</html>`
  }
};