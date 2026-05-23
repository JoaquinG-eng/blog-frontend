async function renderAuthors() {
  const app = document.getElementById("app");
  app.innerHTML = `<p class="loading">Cargando autores...</p>`;

  try {
    const authors = await api.getAuthors();

    if (authors.length === 0) {
      app.innerHTML = `
        <div class="page-header">
          <h1>Autores</h1>
          <a href="/authors/new" data-link class="btn btn-primary">+ Nuevo autor</a>
        </div>
        <p style="color:var(--text-soft)">No hay autores todavía.</p>
      `;
      return;
    }

    const cards = authors.map(author => `
      <div class="author-card reveal">
        <div class="author-avatar">${author.name.charAt(0).toUpperCase()}</div>
        <div class="author-info">
          <h3>${author.name}</h3>
          <p class="author-email">${author.email}</p>
          ${author.bio ? `<p class="author-bio">${author.bio}</p>` : ""}
        </div>
        <div class="author-actions">
          <a href="/authors/${author.id}/posts" data-link class="btn btn-sm">Ver posts</a>
          <a href="/authors/${author.id}/edit" data-link class="btn btn-sm">Editar</a>
          <button class="btn btn-danger btn-sm" data-delete-author="${author.id}" data-name="${author.name}">Eliminar</button>
        </div>
      </div>
    `).join("");

    app.innerHTML = `
      <div class="page-header reveal">
        <h1>Autores</h1>
        <a href="/authors/new" data-link class="btn btn-primary">+ Nuevo autor</a>
      </div>
      <div class="authors-grid">${cards}</div>
    `;

    document.querySelectorAll(".reveal").forEach(el => {
      new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }).observe(el);
    });

    app.querySelectorAll("[data-delete-author]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.deleteAuthor;
        const name = btn.dataset.name;
        modal.show(`¿Eliminar al autor "${name}"?`, async () => {
          await api.deleteAuthor(Number(id));
          renderAuthors();
        });
      });
    });

  } catch (err) {
    app.innerHTML = `<p class="error-msg">Error al cargar los autores.</p>`;
  }
}

async function renderAuthorPosts(authorId) {
  const app = document.getElementById("app");
  app.innerHTML = `<p class="loading">Cargando...</p>`;

  try {
    const [author, posts] = await Promise.all([
      api.getAuthor(authorId),
      api.getPostsByAuthor(authorId)
    ]);

    const cards = posts.length === 0
      ? `<p style="color:var(--text-soft)">Este autor no tiene posts todavía.</p>`
      : posts.map((post, i) => `
          <div class="post-card reveal reveal-delay-${Math.min(i + 1, 4)}">
            <div class="post-number">0${i + 1}</div>
            <div class="post-meta">Post #${post.id}</div>
            <h2><a href="/posts/${post.id}" data-link>${post.title}</a></h2>
            <p>${post.content.substring(0, 100)}${post.content.length > 100 ? "..." : ""}</p>
            <div class="post-actions">
              <a href="/posts/${post.id}" data-link class="btn btn-primary btn-sm">Leer</a>
              <a href="/posts/${post.id}/edit" data-link class="btn btn-sm">Editar</a>
            </div>
          </div>
        `).join("");

    app.innerHTML = `
      <a href="/authors" data-link class="back-link">← Volver a autores</a>
      <div class="page-header reveal">
        <div>
          <h1>${author.name}</h1>
          <p style="color:var(--text-muted);font-family:var(--sans);font-size:0.85rem;margin:0">${author.email}</p>
          ${author.bio ? `<p style="color:var(--text-soft);font-size:0.9rem;margin:0.25rem 0 0">${author.bio}</p>` : ""}
        </div>
        <a href="/posts/new" data-link class="btn btn-primary">+ Nuevo post</a>
      </div>
      <div class="posts-grid">${cards}</div>
    `;

    document.querySelectorAll(".reveal").forEach(el => {
      new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }).observe(el);
    });

  } catch (err) {
    app.innerHTML = `
      <a href="/authors" data-link class="back-link">← Volver a autores</a>
      <p class="error-msg">Error al cargar los posts del autor.</p>
    `;
  }
}