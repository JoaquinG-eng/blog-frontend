async function renderPost(postId) {
  const app = document.getElementById("app");
  app.innerHTML = `<p class="loading">Cargando post...</p>`;

  try {
    const post = await api.getPost(postId);

    if (!post || post.error) {
      app.innerHTML = `
        <a href="/posts" data-link class="back-link">← Volver a posts</a>
        <p class="error-msg">Post no encontrado.</p>
      `;
      return;
    }

    const author = await api.getAuthor(post.author_id);

    app.innerHTML = `
      <a href="/posts" data-link class="back-link">← Volver a posts</a>
      <div class="post-detail-header reveal">
        <div class="post-meta">
          Por <a href="/authors/${author.id}/posts" data-link>${author.name}</a>
        </div>
        <h1>${post.title}</h1>
        <div class="post-detail-divider"></div>
      </div>
      <div class="post-body reveal reveal-delay-1">
        ${post.content}
      </div>
      <div style="display:flex;gap:0.75rem;margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);">
        <a href="/posts/${post.id}/edit" data-link class="btn">Editar post</a>
        <button class="btn btn-danger" id="btn-delete-post">Eliminar post</button>
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

    document.getElementById("btn-delete-post").addEventListener("click", () => {
      modal.show(`¿Eliminar "${post.title}"?`, async () => {
        await api.deletePost(Number(postId));
        navigateTo("/posts");
      });
    });

  } catch (err) {
    app.innerHTML = `
      <a href="/posts" data-link class="back-link">← Volver a posts</a>
      <p class="error-msg">Error al cargar el post.</p>
    `;
  }
}