function renderAbout() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="about-wrap">

      <div class="page-header reveal">
        <h1>Sobre el proyecto</h1>
      </div>

      <div class="reveal">
        <p class="about-lead">
          MiniBlog es una plataforma de gestión de contenido construida como proyecto fullstack.
          Combina un frontend vanilla con una API REST propia para demostrar el ciclo completo
          de una aplicación web en producción.
        </p>
      </div>

      <div class="about-grid">
        <div class="about-card reveal">
          <div class="about-card-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h3>Arquitectura</h3>
            <p>Frontend en HTML, CSS y JavaScript vanilla con router propio basado en History API. Sin frameworks, sin dependencias.</p>
          </div>
        </div>
        <div class="about-card reveal reveal-delay-1">
          <div class="about-card-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>
          </div>
          <div>
            <h3>Backend</h3>
            <p>API REST con Node.js y Express. Base de datos PostgreSQL hosteada en Neon. Documentación interactiva con Swagger UI.</p>
          </div>
        </div>
        <div class="about-card reveal reveal-delay-2">
          <div class="about-card-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div>
            <h3>Deploy</h3>
            <p>Frontend en Vercel con rewrites para rutas limpias. Backend en Render con auto-deploy desde GitHub en cada commit.</p>
          </div>
        </div>
      </div>

      <div class="about-cta reveal">
        <div>
          <h2>Explorá el contenido</h2>
          <p>Leé los posts existentes o creá uno nuevo desde el panel.</p>
        </div>
        <div class="about-cta-actions">
          <a href="/posts" data-link class="btn btn-primary">Ver posts</a>
          <a href="/authors" data-link class="btn">Ver autores</a>
        </div>
      </div>

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
}