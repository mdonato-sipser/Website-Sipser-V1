(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "numeric" });
  }

  // Tabs
  function initTabs() {
    const tabs = $$(".content-tab");
    const news = $("#newsSection");
    const podcasts = $("#podcastsSection");
    if (!tabs.length || !news || !podcasts) return;

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");

        const tab = btn.dataset.tab;
        if (tab === "news") {
          news.classList.add("active");
          podcasts.classList.remove("active");
        } else {
          podcasts.classList.add("active");
          news.classList.remove("active");
        }
      });
    });
  }

  async function fetchJson(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`No se pudo cargar: ${url}`);
    return res.json();
  }

  // Carga episodios desde index.json (lista de filenames)
  async function loadPodcasts() {
    const container = $("#podcastContainer");
    const countEl = $("#podcastsCount");
    const resultsEl = $("#podcastResults");

    if (!container) return;

    let index;
    try {
      index = await fetchJson("/content/podcasts/index.json");
    } catch (e) {
      console.warn(e);
      container.innerHTML = `
        <div class="card">
          <h3>🎙️ Podcasts</h3>
          <p>No encontré <code>content/podcasts/index.json</code>. Crea ese archivo para listar episodios.</p>
        </div>`;
      if (countEl) countEl.textContent = "0";
      if (resultsEl) resultsEl.textContent = "0";
      return;
    }

    const files = Array.isArray(index.items) ? index.items : [];
    if (!files.length) {
      container.innerHTML = `<div class="card"><h3>🎙️ Podcasts</h3><p>No hay episodios en el índice.</p></div>`;
      if (countEl) countEl.textContent = "0";
      if (resultsEl) resultsEl.textContent = "0";
      return;
    }

    // Traer cada episodio
    let episodes = [];
    for (const f of files) {
      try {
        const ep = await fetchJson(`/content/podcasts/${f}`);
        episodes.push(ep);
      } catch (e) {
        console.warn("No se pudo cargar episodio:", f, e);
      }
    }

    // Solo publicados
    episodes = episodes.filter((p) => p && p.publicado !== false);

    // Orden por fecha desc
    episodes.sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0));

    if (countEl) countEl.textContent = String(episodes.length);
    if (resultsEl) resultsEl.textContent = String(episodes.length);

    if (!episodes.length) {
      container.innerHTML = `<div class="card"><h3>🎙️ Podcasts</h3><p>No hay episodios publicados.</p></div>`;
      return;
    }

    container.innerHTML = episodes
      .map(
        (p, idx) => `
      <article class="card podcast-card">
        ${p.imagen ? `<img src="${p.imagen}" alt="${escapeHtml(p.titulo)}" style="width:100%;border-radius:14px;margin-bottom:12px;">` : ""}
        <span class="caso-categoria">${escapeHtml(p.categoria || "podcast")}</span>
        <h3>${escapeHtml(p.titulo || "Episodio")}</h3>
        <p style="color:var(--muted)">${escapeHtml(p.descripcion || "")}</p>
        <small style="color:var(--muted)">${escapeHtml(p.duracion || "")} · ${formatDate(p.fecha)}</small>

        <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn primary open-podcast" data-idx="${idx}">
            ${p.audio_url ? "Reproducir" : (p.spotify_url ? "Abrir" : "Ver")}
          </button>
          ${p.spotify_url ? `<a class="btn ghost" href="${p.spotify_url}" target="_blank" rel="noopener">Spotify</a>` : ""}
        </div>
      </article>
    `
      )
      .join("");

    initPodcastModal(episodes);
  }

  // Modal
  function initPodcastModal(items) {
    const modal = $("#podcastModal");
    const closeBtn = $("#closePodcastModal");
    const audio = $("#podcastAudio");
    const source = audio ? audio.querySelector("source") : null;

    const img = $("#currentPodcastImage");
    const title = $("#currentPodcastTitle");
    const desc = $("#currentPodcastDesc");
    const dur = $("#currentPodcastDuration");
    const date = $("#currentPodcastDate");
    const spotifyLink = $("#spotifyLink");

    if (!modal || !closeBtn || !audio || !source) return;

    function open(idx) {
      const p = items[idx];
      if (!p) return;

      if (img) img.src = p.imagen || "";
      if (title) title.textContent = p.titulo || "";
      if (desc) desc.textContent = p.descripcion || "";
      if (dur) dur.textContent = p.duracion || "";
      if (date) date.textContent = formatDate(p.fecha);

      if (spotifyLink) {
        if (p.spotify_url) {
          spotifyLink.href = p.spotify_url;
          spotifyLink.style.display = "inline";
        } else {
          spotifyLink.href = "#";
          spotifyLink.style.display = "none";
        }
      }

      if (p.audio_url) {
        source.src = p.audio_url;
        audio.load();
      } else {
        // No hay mp3: solo abre modal y sugiere Spotify
        source.src = "";
        audio.load();
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function close() {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
      try { audio.pause(); } catch {}
    }

    $$(".open-podcast").forEach((btn) => {
      btn.addEventListener("click", () => open(Number(btn.dataset.idx)));
    });

    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) close();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    loadPodcasts();
  });
})();
