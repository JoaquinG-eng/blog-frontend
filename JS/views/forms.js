async function renderPostForm(postId = null) {
  const app = document.getElementById("app");
  app.innerHTML = `<p class="loading">Cargando...</p>`;

  try {
    const authors = await api.getAuthors();
    let post = { title: "", content: "", author_id: "" };
    if (postId) post = await api.getPost(postId);

    const authorOptions = authors.map(a =>
      `<option value="${a.id}" ${post.author_id == a.id ? "selected" : ""}>${a.name}</option>`
    ).join("");

    app.innerHTML = `
      <a href="/posts" data-link class="back-link">← Volver a posts</a>
      <h2 class="form-title">${postId ? "Editar post" : "Nuevo post"}</h2>
      <div class="form-card">
        <div class="form-group">
          <label>Título</label>
          <input type="text" id="input-title" value="${post.title}" placeholder="Título del post" />
        </div>
        <div class="form-group">
          <label>Contenido</label>
          <textarea id="input-content" placeholder="Escribí el contenido...">${post.content}</textarea>
        </div>
        <div class="form-group">
          <label>Autor</label>
          <select id="input-author">
            <option value="">Seleccioná un autor</option>
            ${authorOptions}
          </select>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" id="btn-submit-post">
            ${postId ? "Guardar cambios" : "Crear post"}
          </button>
          <a href="/posts" data-link class="btn">Cancelar</a>
        </div>
        <p class="form-error" id="form-error"></p>
      </div>
    `;

    document.getElementById("btn-submit-post").addEventListener("click", async () => {
      const title    = document.getElementById("input-title").value.trim();
      const content  = document.getElementById("input-content").value.trim();
      const authorId = Number(document.getElementById("input-author").value);
      const errorEl  = document.getElementById("form-error");

      if (!title || !content || !authorId) {
        errorEl.textContent = "Todos los campos son obligatorios.";
        return;
      }

      try {
        if (postId) {
          await api.updatePost(Number(postId), { title, content, authorId });
          showToast("Post actualizado correctamente", "success");
        } else {
          await api.createPost({ title, content, authorId });
          showToast("Post creado correctamente", "success");
        }
        navigateTo("/posts");
      } catch (err) {
        errorEl.textContent = "Error al guardar el post.";
        showToast("Error al guardar el post", "error");
      }
    });

  } catch (err) {
    app.innerHTML = `<p class="error-msg">Error al cargar el formulario.</p>`;
  }
}

async function renderAuthorForm(authorId = null) {
  const app = document.getElementById("app");
  let author = { name: "", email: "", bio: "" };

  if (authorId) {
    app.innerHTML = `<p class="loading">Cargando...</p>`;
    try {
      author = await api.getAuthor(authorId);
    } catch (err) {
      app.innerHTML = `<p class="error-msg">Autor no encontrado.</p>`;
      return;
    }
  }

  app.innerHTML = `
    <a href="/authors" data-link class="back-link">← Volver a autores</a>
    <h2 class="form-title">${authorId ? "Editar autor" : "Nuevo autor"}</h2>
    <div class="form-card">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" id="input-name" value="${author.name}" placeholder="Nombre completo" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="input-email" value="${author.email || ""}" placeholder="email@ejemplo.com" />
      </div>
      <div class="form-group">
        <label>Bio <span style="font-weight:400;color:var(--text-muted)">(opcional)</span></label>
        <textarea id="input-bio" placeholder="Una breve descripción...">${author.bio || ""}</textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="btn-submit-author">
          ${authorId ? "Guardar cambios" : "Crear autor"}
        </button>
        <a href="/authors" data-link class="btn">Cancelar</a>
      </div>
      <p class="form-error" id="form-error"></p>
    </div>
  `;

  document.getElementById("btn-submit-author").addEventListener("click", async () => {
    const name    = document.getElementById("input-name").value.trim();
    const email   = document.getElementById("input-email").value.trim();
    const bio     = document.getElementById("input-bio").value.trim();
    const errorEl = document.getElementById("form-error");

    if (!name || !email) {
      errorEl.textContent = "Nombre y email son obligatorios.";
      return;
    }

    try {
      if (authorId) {
        await api.updateAuthor(Number(authorId), { name, email, bio });
        showToast("Autor actualizado correctamente", "success");
      } else {
        await api.createAuthor({ name, email, bio });
        showToast("Autor creado correctamente", "success");
      }
      navigateTo("/authors");
    } catch (err) {
      errorEl.textContent = "Error al guardar el autor.";
      showToast("Error al guardar el autor", "error");
    }
  });
}