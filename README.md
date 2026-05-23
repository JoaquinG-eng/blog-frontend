# MiniBlog — Frontend

Frontend de una plataforma de gestión de contenido técnico. Construido en HTML, CSS y JavaScript vanilla, conectado a una API REST propia desplegada en Render.

Sin frameworks. Sin dependencias externas. Router propio con History API.

---

## Demo

**Deploy activo:** [blog-frontend-rfa1.vercel.app](https://blog-frontend-rfa1.vercel.app)

**API (backend):** [rest-api-node-pbza.onrender.com](https://rest-api-node-pbza.onrender.com)

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Estilos, animaciones y responsive |
| JavaScript ES6 | Lógica, DOM y router |
| Vercel | Deploy y hosting |

---

## Estructura del proyecto
/
├── index.html
├── vercel.json
├── css/
│   ├── main.css
│   ├── base.css
│   ├── navbar.css
│   ├── layout.css
│   ├── components.css
│   ├── posts.css
│   ├── authors.css
│   ├── forms.css
│   └── pages.css
├── JS/
│   ├── api.js
│   ├── app.js
│   ├── components/
│   │   ├── modal.js
│   │   └── toast.js
│   └── views/
│       ├── landing.js
│       ├── home.js
│       ├── post.js
│       ├── authors.js
│       ├── forms.js
│       └── about.js
└── assets/
└── bg.jpg

---

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Landing — hero y presentación del proyecto |
| `/posts` | Lista de posts con buscador |
| `/posts/:id` | Detalle de un post |
| `/posts/new` | Formulario para crear post |
| `/posts/:id/edit` | Formulario para editar post |
| `/authors` | Lista de autores |
| `/authors/new` | Formulario para crear autor |
| `/authors/:id/edit` | Formulario para editar autor |
| `/authors/:id/posts` | Posts de un autor específico |
| `/about` | Información del proyecto |

---

## Funcionalidades

- Router propio con History API — rutas limpias sin `#`
- Link activo en la navbar según la ruta actual
- Listar, crear, editar y eliminar posts y autores
- Nombre del autor visible en cada post
- Buscador de posts por título, contenido y autor
- Modal de confirmación para eliminar
- Toasts de feedback para cada acción
- Animaciones de reveal al hacer scroll
- Diseño responsive — mobile y desktop
- Fondo con imagen fija y overlay para legibilidad

---

## Cómo correr el proyecto localmente

```bash
git clone https://github.com/JoaquinG-eng/blog-frontend.git
cd blog-frontend
```

Abrí `index.html` con Live Server en VS Code o cualquier servidor local. No requiere instalación ni bundler.

---

## Deploy en Vercel

El archivo `vercel.json` redirige todas las rutas al `index.html` para que el router de JS funcione correctamente:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Para deployar:

1. Subir el código a GitHub
2. Importar el repositorio en [Vercel](https://vercel.com)
3. Framework: **Other**
4. Deploy

Cada `git push` a `main` redesploya automáticamente.

---

## Aspectos técnicos

### Router

El router usa `window.history.pushState` para navegación sin recarga. Las rutas dinámicas se resuelven con expresiones regulares:

```javascript
const postDetail = path.match(/^\/posts\/(\d+)$/);
if (postDetail) { renderPost(postDetail[1]); return; }
```

### API

Todas las llamadas al backend están centralizadas en `JS/api.js`. La base URL apunta al deploy en Render:

```javascript
const BASE = "https://rest-api-node-pbza.onrender.com";
```

### CSS

Los estilos están separados por módulo e importados desde `css/main.css` con `@import`. Variables CSS globales en `base.css`.

---

## Autor

**Joaquín Gonzalez** — [GitHub](https://github.com/JoaquinG-eng)
