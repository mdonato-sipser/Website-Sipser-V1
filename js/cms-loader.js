/* =====================================================
   SIPSER CLOUD - CMS CONTENT LOADER
   =====================================================
   Este script carga el contenido desde los archivos JSON
   generados por el CMS y actualiza el DOM automáticamente.
   ===================================================== */

console.log('📦 CMS Loader iniciado...');

// =====================================================
// FUNCIONES DE UTILIDAD
// =====================================================

async function fetchJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`⚠️ No se pudo cargar ${path}:`, error.message);
        return null;
    }
}

async function fetchAllFromFolder(folderPath, fileList) {
    const items = [];
    for (const file of fileList) {
        const data = await fetchJSON(`${folderPath}/${file}`);
        if (data) items.push(data);
    }
    return items;
}

// =====================================================
// CARGADORES POR SECCIÓN
// =====================================================

// --- Cargar configuración general ---
async function loadConfig() {
    const config = await fetchJSON('/content/config.json');
    if (!config) return;
    
    // Actualizar WhatsApp
    if (config.whatsapp && config.whatsapp.mostrar) {
        const waBtn = document.querySelector('.whatsapp-float');
        if (waBtn) {
            waBtn.href = `https://wa.me/${config.whatsapp.numero}`;
        }
    }
    
    // Actualizar Portal
    if (config.portal) {
        const portalBtn = document.querySelector('.nav-cta a');
        if (portalBtn) {
            portalBtn.href = config.portal.url;
            portalBtn.textContent = config.portal.texto;
        }
    }
    
    // Actualizar Footer
    if (config.footer) {
        const footerTagline = document.querySelector('footer > div > p');
        const footerCities = document.querySelector('footer > div > small');
        if (footerTagline) footerTagline.textContent = config.footer.tagline;
        if (footerCities) footerCities.textContent = config.footer.ciudades;
    }
    
    console.log('✅ Configuración cargada');
}

// --- Cargar página de inicio ---
async function loadHomepage() {
    const data = await fetchJSON('/content/inicio.json');
    if (!data) return;
    
    // Hero
    if (data.hero) {
        const eyebrow = document.querySelector('.home-hero-content .eyebrow');
        const title = document.querySelector('.home-hero-content h1');
        const subtitle = document.querySelector('.home-hero-content .page-lede');
        
        if (eyebrow) eyebrow.textContent = data.hero.eyebrow;
        if (title) title.textContent = data.hero.titulo;
        if (subtitle) subtitle.textContent = data.hero.subtitulo;
    }
    
    // Orbe stats
    if (data.orbe_stats) {
        const orbStats = document.querySelectorAll('.orb-stats > div');
        if (orbStats[0]) {
            orbStats[0].querySelector('strong').textContent = data.orbe_stats.stat1_numero;
            orbStats[0].querySelector('small').textContent = data.orbe_stats.stat1_texto;
        }
        if (orbStats[1]) {
            orbStats[1].querySelector('strong').textContent = data.orbe_stats.stat2_numero;
            orbStats[1].querySelector('small').textContent = data.orbe_stats.stat2_texto;
        }
    }
    
    console.log('✅ Homepage cargada');
}

// --- Cargar noticias ---
async function loadNews() {
    // Intentar cargar noticias desde la carpeta
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;
    
    try {
        // Por ahora usamos los datos hardcodeados en main.js
        // En producción, esto cargaría desde /content/noticias/
        console.log('📰 Sistema de noticias listo');
    } catch (error) {
        console.warn('⚠️ Error cargando noticias:', error);
    }
}

// --- Cargar casos de éxito ---
async function loadCases() {
    const casesContainer = document.querySelector('.casos-container');
    if (!casesContainer) return;
    
    try {
        // Por ahora los casos están hardcodeados en el HTML
        // En producción, esto cargaría desde /content/casos/
        console.log('🏆 Sistema de casos listo');
    } catch (error) {
        console.warn('⚠️ Error cargando casos:', error);
    }
}

// =====================================================
// INICIALIZACIÓN
// =====================================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando carga de contenido CMS...');
    
    // Cargar configuración siempre
    await loadConfig();
    
    // Detectar página actual y cargar contenido correspondiente
    const page = document.body.dataset.page || 'index';
    
    switch (page) {
        case 'index':
            await loadHomepage();
            await loadNews();
            break;
        case 'exitos':
            await loadCases();
            break;
        case 'contenido':
            await loadNews();
            break;
        // Agregar más páginas según sea necesario
    }
    
    console.log('✅ Contenido CMS cargado completamente');
});

// =====================================================
// EXPORTAR FUNCIONES (para uso externo si es necesario)
// =====================================================

window.CMSLoader = {
    fetchJSON,
    loadConfig,
    loadHomepage,
    loadNews,
    loadCases
};
