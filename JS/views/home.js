async function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `<p class="loading">Cargando posts...</p>`;

  try {
    const [posts, authors] = await Promise.all([
      api.getPosts(),
      api.getAuthors()
    ]);

    const authorMap = {};
    authors.forEach(a => authorMap[a.id] = a.name);

    const renderCards = (filtered) => {
      if (filtered.length === 0) {
        return `<p style="color:var(--text-soft);padding:2rem">No se encontraron posts.</p>`;
      }

      const [featured, ...rest] = filtered;

      const featuredCard = `
        <div class="post-card featured">
          <div class="post-text">
            <div class="post-meta">
              Por <a href="/authors/${featured.author_id}/posts" data-link>
                ${authorMap[featured.author_id] || "Autor desconocido"}
              </a>
            </div>
            <h2><a href="/posts/${featured.id}" data-link>${featured.title}</a></h2>
            <p>${featured.content.substring(0, 180)}${featured.content.length > 180 ? "..." : ""}</p>
            <div class="post-actions">
              <a href="/posts/${featured.id}" data-link class="btn btn-primary">Leer</a>
              <a href="/posts/${featured.id}/edit" data-link class="btn">Editar</a>
              <button class="btn btn-danger" data-delete-post="${featured.id}">Eliminar</button>
            </div>
          </div>
          <div>
            <span style="font-family:var(--display);font-size:8rem;font-weight:800;color:rgba(124,106,247,0.08);line-height:1;letter-spacing:-4px;display:block;">01</span>
          </div>
        </div>
      `;

      const restCards = rest.map((post, i) => `
        <div class="post-card reveal reveal-delay-${Math.min(i + 1, 4)}">
          <div class="post-number">0${i + 2}</div>
          <div class="post-meta">
            Por <a href="/authors/${post.author_id}/posts" data-link>
              ${authorMap[post.author_id] || "Autor desconocido"}
            </a>
          </div>
          <h2><a href="/posts/${post.id}" data-link>${post.title}</a></h2>
          <p>${post.content.substring(0, 100)}${post.content.length > 100 ? "..." : ""}</p>
          <div class="post-actions">
            <a href="/posts/${post.id}" data-link class="btn btn-primary btn-sm">Leer</a>
            <a href="/posts/${post.id}/edit" data-link class="btn btn-sm">Editar</a>
            <button class="btn btn-danger btn-sm" data-delete-post="${post.id}">Eliminar</button>
          </div>
        </div>
      `).join("");

      return `<div class="posts-grid">${featuredCard}${restCards}</div>`;
    };

    app.innerHTML = `
      <div class="page-header reveal">
        <h1>Posts</h1>
        <a href="/posts/new" data-link class="btn btn-primary">+ Nuevo post</a>
      </div>
      <div class="search-bar reveal">
        <input type="text" id="search-input" placeholder="Buscar posts..." />
      </div>
      <div id="posts-container">
        ${posts.length === 0
          ? `<p style="color:var(--text-soft)">No hay posts todavía.</p>`
          : renderCards(posts)
        }
      </div>
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

    document.getElementById("search-input").addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (authorMap[p.author_id] || "").toLowerCase().includes(q)
      );
      document.getElementById("posts-container").innerHTML = renderCards(filtered);
      attachDeleteEvents(filtered);
    });

    attachDeleteEvents(posts);

    function attachDeleteEvents(list) {
      document.querySelectorAll("[data-delete-post]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.deletePost;
          const post = list.find(p => p.id == id);
          modal.show(`¿Eliminar "${post.title}"?`, async () => {
            await api.deletePost(Number(id));
            showToast("Post eliminado", "info");
            renderHome();
          });
        });
      });
    }

  } catch (err) {
    app.innerHTML = `<p class="error-msg">Error al cargar los posts.</p>`;
  }
}