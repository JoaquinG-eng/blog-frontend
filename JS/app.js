const router = {
  routes: {
    "/":        renderLanding,
    "/posts":   renderHome,
    "/authors": renderAuthors,
    "/about":   renderAbout,
  },

  resolve() {
    const path = window.location.pathname;

    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "/" && path === "/") {
        link.classList.add("active");
      } else if (href !== "/" && path.startsWith(href)) {
        link.classList.add("active");
      }
    });

    if (this.routes[path]) { this.routes[path](); return; }

    if (path === "/posts/new")   { renderPostForm();   return; }
    if (path === "/authors/new") { renderAuthorForm(); return; }

    const postEdit = path.match(/^\/posts\/(\d+)\/edit$/);
    if (postEdit) { renderPostForm(postEdit[1]); return; }

    const authorEdit = path.match(/^\/authors\/(\d+)\/edit$/);
    if (authorEdit) { renderAuthorForm(authorEdit[1]); return; }

    const authorPosts = path.match(/^\/authors\/(\d+)\/posts$/);
    if (authorPosts) { renderAuthorPosts(authorPosts[1]); return; }

    const postDetail = path.match(/^\/posts\/(\d+)$/);
    if (postDetail) { renderPost(postDetail[1]); return; }

    document.getElementById("app").innerHTML = `
      <p class="error-msg">Página no encontrada.</p>
      <a href="/" data-link class="btn" style="margin-top:1rem;">Volver al inicio</a>
    `;
  }
};

function navigateTo(path) {
  window.history.pushState({}, "", path);
  router.resolve();
}

document.addEventListener("click", e => {
  const link = e.target.closest("[data-link]");
  if (!link) return;
  e.preventDefault();
  navigateTo(link.getAttribute("href"));
});

window.addEventListener("popstate", () => router.resolve());
window.addEventListener("load", () => router.resolve());