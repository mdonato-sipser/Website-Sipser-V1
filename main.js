/* ============================================
   SIPSER CLOUD - MAIN.JS (ESTABLE)
   ============================================ */

console.log("🎯 SIPSER Cloud - Iniciando sistema...");

(() => {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;

  // Compat: usa data-page o data-cms-page
  const getCurrentPage = () => body.dataset.page || body.dataset.cmsPage || "";

  // ============================================
  // 1) LOADER (robusto)
  // ============================================
  function hideLoader() {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("hidden");
  }

  // Ocultar rápido + fallback
  setTimeout(hideLoader, 120);
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 3000);

  // ============================================
  // 2) TEMA (rápido)
  // ============================================
  const toggle = $(".theme-toggle");

  function setTheme(mode) {
    body.dataset.theme = mode;

    // Icono
    if (toggle) {
      const icon = toggle.querySelector("span");
      if (icon) icon.textContent = mode === "dark" ? "☀" : "☾";
    }

    // Logos
    const logos = $$(".brand img, .hero-logo");
    const newLogo = mode === "dark" ? "icons/SIPSER-logo.png" : "icons/SIPSER.png";
    logos.forEach((img) => {
      // evita asignaciones repetitivas
      const current = img.getAttribute("src") || "";
      if (current !== newLogo) img.setAttribute("src", newLogo);
    });

    localStorage.setItem("sipser-theme", mode);
  }

  // Tema inicial
  const savedTheme = localStorage.getItem("sipser-theme") || "light";
  setTheme(savedTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = body.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  // ============================================
  // 3) NAV + BURGER + LINK CLOSE (mobile)
  // ============================================
  function initNav() {
    const currentPage = getCurrentPage();
    if (currentPage) {
      $$("nav a[data-page]").forEach((link) => {
        if (link.dataset.page === currentPage) link.classList.add("active");
      });
    }

    const burger = $(".burger");
    const nav = $("nav");
    if (burger && nav) {
      burger.addEventListener("click", () => nav.classList.toggle("open"));
    }

    // Cerrar en mobile al click en link
    if (nav && window.innerWidth <= 1024) {
      $$("nav ul a").forEach((link) => {
        link.addEventListener("click", () => nav.classList.remove("open"));
      });
    }
  }

  // ============================================
  // 4) CONTADORES (si existen)
  // ============================================
  function iniciarContadores() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.played) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || "";
            let start = null;

            function animar(ts) {
              if (!start) start = ts;
              const progress = Math.min((ts - start) / 1500, 1);
              const current = Math.floor(target * progress);
              el.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(animar);
            }

            requestAnimationFrame(animar);
            el.dataset.played = "true";
          }
        });
      },
      { threshold: 0.1 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  // ============================================
  // 5) UNIVERSO ULTRA LIGERO (opcional)
  // ============================================
  function crearUniversoUltraLigero(contenedor) {
    if (window.innerWidth < 768) return null;

    const canvas = document.createElement("canvas");
    canvas.className = "universo-canvas";
    canvas.style.cssText = `
      position:absolute; top:0; left:0; width:100%; height:100%;
      z-index:1; pointer-events:none; opacity:0.3;
    `;

    // Asegurar contenedor relativo si no lo es
    const style = getComputedStyle(contenedor);
    if (style.position === "static") contenedor.style.position = "relative";

    contenedor.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = contenedor.clientWidth);
    let h = (canvas.height = contenedor.clientHeight);

    const particulas = [];
    for (let i = 0; i < 50; i++) {
      const isDark = body.dataset.theme === "dark";
      particulas.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.1) * 0.7,
        vy: (Math.random() - 0.1) * 0.7,
        color: isDark ? "rgba(100,200,255,0.6)" : "rgba(70,130,200,0.4)",
      });
    }

    let animando = true;

    function animar() {
      if (!animando) return;

      ctx.fillStyle = body.dataset.theme === "dark"
        ? "rgba(10,15,35,0.02)"
        : "rgba(240,245,255,0.02)";
      ctx.fillRect(0, 0, w, h);

      for (const p of particulas) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= w) p.vx *= -1;
        if (p.y <= 0 || p.y >= h) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animar);
    }

    setTimeout(animar, 500);

    function resize() {
      w = canvas.width = contenedor.clientWidth;
      h = canvas.height = contenedor.clientHeight;
    }
    window.addEventListener("resize", resize);

    return {
      destroy: () => {
        animando = false;
        window.removeEventListener("resize", resize);
        canvas.remove();
      },
    };
  }

  function initUniverso() {
    if (window.innerWidth < 768) return;
    const secciones = $$(".hero, .page-hero, .home-hero");
    secciones.forEach((sec) => crearUniversoUltraLigero(sec));
  }

  // ============================================
  // 6) MODAL SOLUCIONES (solo si existe en la página)
  // ============================================
  function initSolutionModal() {
    const modalOverlay = document.getElementById("solutionModal");
    const modalContent = document.getElementById("modalContent");
    const closeBtn = $(".modal-close");
    const knowMoreBtns = $$(".know-more-btn");

    if (!modalOverlay || !modalContent || !closeBtn || !knowMoreBtns.length) {
      return; // no hay modal en esta página
    }

    const solutionsData = {
      "migration": {
        title: "Migración a la Nube",
        description:
          "Transformamos tu infraestructura tradicional en entornos cloud modernos, seguros y escalables.",
        features: [
          { title: "Estrategia de Migración", description: "Evaluación completa y planificación segura." },
          { title: "Modernización", description: "Refactorización y containerización cloud-native." },
          { title: "FinOps", description: "Optimización de costos continua." },
          { title: "Gobernanza", description: "Políticas de seguridad y cumplimiento unificadas." },
        ],
        ctaText: "Iniciar Migración",
      },
      "continuity": {
        title: "Continuidad de Negocio",
        description:
          "Protegemos tu operación 24/7 con DRP, alta disponibilidad y planes probados.",
        features: [
          { title: "Disaster Recovery", description: "RTO/RPO acordes al negocio." },
          { title: "Alta Disponibilidad", description: "Redundancia y balanceo de carga." },
          { title: "Backup Inteligente", description: "Respaldo automatizado con retención." },
          { title: "Simulaciones", description: "Pruebas periódicas de recuperación." },
        ],
        ctaText: "Proteger Mi Negocio",
      },
      "data-engineering": {
        title: "Ingeniería de Datos",
        description:
          "Construimos pipelines robustos para transformar datos en insights accionables.",
        features: [
          { title: "Data Pipelines", description: "ETL/ELT automatizado." },
          { title: "Data Quality", description: "Validación, limpieza, gobernanza." },
          { title: "Integración", description: "APIs, DBs, IoT, legacy." },
          { title: "DWH/Lake", description: "Arquitecturas escalables y performantes." },
        ],
        ctaText: "Transformar Mis Datos",
      },
      "machine-learning": {
        title: "Machine Learning",
        description:
          "Modelos de IA para automatizar, predecir y optimizar decisiones.",
        features: [
          { title: "Predictivo", description: "Forecast, clasificación, recomendación." },
          { title: "MLOps", description: "Deploy + monitoreo continuo." },
          { title: "Computer Vision", description: "Automatización visual." },
          { title: "NLP", description: "Chatbots y lenguaje natural." },
        ],
        ctaText: "Implementar IA",
      },
      "infrastructure": {
        title: "Infraestructura Cloud",
        description:
          "Diseñamos y operamos arquitecturas cloud nativas, seguras y escalables.",
        features: [
          { title: "Cloud Native", description: "Microservicios, contenedores, serverless." },
          { title: "Seguridad", description: "WAF, SIEM, Zero Trust." },
          { title: "Observabilidad", description: "Logs, tracing y métricas." },
          { title: "DevOps", description: "CI/CD e Infra as Code." },
        ],
        ctaText: "Diseñar Mi Infraestructura",
      },
      "business-intelligence": {
        title: "Business Intelligence",
        description:
          "Dashboards y reportes ejecutivos para decisiones estratégicas.",
        features: [
          { title: "Dashboards", description: "Drill-down y filtros real-time." },
          { title: "Reportes", description: "Distribución automatizada." },
          { title: "Self-Service", description: "Exploración para usuarios no técnicos." },
          { title: "KPIs", description: "Indicadores clave personalizados." },
        ],
        ctaText: "Ver Mis Dashboards",
      },
    };

    function openModal(solutionId) {
      const solution = solutionsData[solutionId];
      if (!solution) return;

      modalContent.innerHTML = `
        <h2>${solution.title}</h2>
        <p class="solution-description">${solution.description}</p>
        <div class="solution-features">
          ${solution.features
            .map(
              (f) => `
              <div class="modal-feature-card">
                <h4>${f.title}</h4>
                <p>${f.description}</p>
              </div>
            `
            )
            .join("")}
        </div>
        <div class="solution-cta">
          <a class="btn primary" href="contacto.html?solution=${encodeURIComponent(solutionId)}">${solution.ctaText}</a>
          <p style="margin-top:15px;font-size:.9rem;color:var(--muted);">
            ¿Necesitas una propuesta personalizada? Agenda una consulta gratuita.
          </p>
        </div>
      `;

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    knowMoreBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const solutionId = btn.getAttribute("data-modal");
        openModal(solutionId);
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // ============================================
  // 7) FOOTER YEAR
  // ============================================
  function updateYear() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }

  // ============================================
  // 8) CMS Loader (simple)
  // ============================================
  async function loadCMSPage() {
    const page = body.dataset.cmsPage;
    if (!page) return;

    try {
      const res = await fetch(`/content/paginas/${page}.json`, { cache: "no-store" });
      if (!res.ok) return;

      const data = await res.json();
      applyCMSBindings(data);
    } catch (e) {
      console.warn("Error cargando CMS:", e);
    }
  }

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
  }

  function applyCMSBindings(data) {
    $$("[data-cms-text]").forEach((el) => {
      const path = el.getAttribute("data-cms-text");
      const val = getByPath(data, path);
      if (val !== undefined && val !== null) el.textContent = val;
    });

    $$("[data-cms-href]").forEach((el) => {
      const path = el.getAttribute("data-cms-href");
      const val = getByPath(data, path);
      if (val) el.setAttribute("href", val);
    });

    $$("[data-cms-src]").forEach((el) => {
      const path = el.getAttribute("data-cms-src");
      const val = getByPath(data, path);
      if (val) el.setAttribute("src", val);
    });
  }

  // ============================================
  // 9) INIT (una sola vez)
  // ============================================
  document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOMContentLoaded - init core");

    initNav();
    iniciarContadores();
    updateYear();
    loadCMSPage();       // si hay data-cms-page
    initSolutionModal(); // si existe modal en esa página

    // Fase 2 (suave)
    setTimeout(() => {
      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = a.getAttribute("href");
          if (href && href !== "#") {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        });
      });
    }, 500);

    // Fase 3 (pesado opcional)
    setTimeout(() => {
      initUniverso();
    }, 1000);
  });

  // Debug tools
  window.verTema = () => ({
    temaActual: body.dataset.theme,
    temaGuardado: localStorage.getItem("sipser-theme"),
  });
  window.cambiarTema = (tema) => {
    if (tema === "dark" || tema === "light") setTheme(tema);
  };

  console.log("✅ SIPSER Cloud - Sistema listo!");
})();
