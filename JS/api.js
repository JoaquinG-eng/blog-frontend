const BASE = "https://rest-api-node-pbza.onrender.com/api";

const api = {

  getPosts: () =>
    fetch(`${BASE}/posts`).then(r => r.json()),

  getPost: (id) =>
    fetch(`${BASE}/posts/${id}`).then(r => r.json()),

  getPostsByAuthor: (authorId) =>
    fetch(`${BASE}/posts/author/${authorId}`).then(r => r.json()),

  createPost: (data) =>
    fetch(`${BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  updatePost: (id, data) =>
    fetch(`${BASE}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  deletePost: (id) =>
    fetch(`${BASE}/posts/${id}`, { method: "DELETE" }).then(r => r.json()),

  getAuthors: () =>
    fetch(`${BASE}/authors`).then(r => r.json()),

  getAuthor: (id) =>
    fetch(`${BASE}/authors/${id}`).then(r => r.json()),

  createAuthor: (data) =>
    fetch(`${BASE}/authors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  updateAuthor: (id, data) =>
    fetch(`${BASE}/authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  deleteAuthor: (id) =>
    fetch(`${BASE}/authors/${id}`, { method: "DELETE" }).then(r => r.json()),
};