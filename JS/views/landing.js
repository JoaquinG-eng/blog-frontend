function renderLanding() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="hero">
      <div class="hero-eyebrow">MiniBlog — Plataforma de contenido</div>
      <h1 class="hero-title">Publicá ideas.<br/>Construí audiencia.<br/>Escribí en serio.</h1>
      <p class="hero-sub">
        Una plataforma minimalista para gestionar contenido técnico.
        Autores, publicaciones y una API REST detrás de todo.
      </p>
      <div class="hero-actions">
        <a href="/posts" data-link class="btn btn-primary">Explorar posts</a>
        <a href="/about" data-link class="btn">Sobre el proyecto</a>
      </div>
    </section>

    <section class="hero-grid">
      <div class="hero-grid-item reveal">
        <div class="hero-grid-label">Publicaciones</div>
        <h3>Contenido técnico estructurado</h3>
        <p>Cada post está vinculado a un autor con historial propio. Creá, editá y eliminá sin fricción.</p>
      </div>
      <div class="hero-grid-item reveal reveal-delay-1">
        <div class="hero-grid-label">Autores</div>
        <h3>Perfiles con contexto</h3>
        <p>Cada autor tiene su perfil, bio y un listado de sus publicaciones accesible desde cualquier post.</p>
      </div>
      <div class="hero-grid-item reveal reveal-delay-2">
        <div class="hero-grid-label">API REST</div>
        <h3>Backend propio con Swagger</h3>
        <p>Todos los datos vienen de una API construida con Node.js, Express y PostgreSQL. Documentada con Swagger.</p>
      </div>
    </section>
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
}