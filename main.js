/* ============================================
   SIPSER CLOUD - SISTEMA ULTRA RÁPIDO
   ============================================ */

   console.log('🎯 SIPSER Cloud - Iniciando sistema rápido...');

   // ============================================
   // 1. LOADER INMEDIATO - LO PRIMERO
   // ============================================
   
   // Ocultar loader inmediatamente
   setTimeout(() => {
       const loader = document.getElementById('pageLoader');
       if (loader) {
           loader.classList.add('hidden');
           console.log('✅ Loader ocultado');
       }
   }, 100);
   
   // ============================================
   // 2. TEMA MÍNIMO Y RÁPIDO
   // ============================================
   
   const body = document.body;
   const toggle = document.querySelector('.theme-toggle');
   
   function setTheme(mode) {
       body.dataset.theme = mode;
       
       // Actualizar icono
       if (toggle) {
           const icon = toggle.querySelector('span');
           if (icon) icon.textContent = mode === 'dark' ? '☀' : '☾';
       }
       
       // Actualizar logos
       const logos = document.querySelectorAll('.brand img, .hero-logo');
       const newLogo = mode === 'dark' ? 'icons/SIPSER-logo.png' : 'icons/SIPSER.png';
       
       logos.forEach(logo => {
           if (!logo.src.includes(newLogo)) {
               logo.src = newLogo;
           }
       });
       
       localStorage.setItem('sipser-theme', mode);
   }
   
   // Inicializar tema inmediatamente
   if (toggle) {
       const savedTheme = localStorage.getItem('sipser-theme') || 'light';
       setTheme(savedTheme);
       
       toggle.addEventListener('click', () => {
           const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
           setTheme(next);
       });
   }
   
   // ============================================
   // 3. NAVEGACIÓN RÁPIDA
   // ============================================
   
   // Navegación activa
   document.addEventListener('DOMContentLoaded', () => {
       const currentPage = body.dataset.page;
       if (currentPage) {
           document.querySelectorAll('nav a[data-page]').forEach(link => {
               if (link.dataset.page === currentPage) link.classList.add('active');
           });
       }
       
       // Burger menu
       const burger = document.querySelector('.burger');
       const nav = document.querySelector('nav');
       if (burger && nav) {
           burger.addEventListener('click', () => nav.classList.toggle('open'));
       }
   });
   
   // ============================================
   // 4. UNIVERSO SUPER LIGERO (OPCIONAL)
   // ============================================
   
   function crearUniversoUltraLigero(contenedor) {
       // Solo crear si es visible y no en móviles
       if (window.innerWidth < 768) return null;
       
       const canvas = document.createElement('canvas');
       canvas.className = 'universo-canvas';
       canvas.style.cssText = `
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 1;
           pointer-events: none;
           opacity: 0.3;
       `;
       
       contenedor.appendChild(canvas);
       const ctx = canvas.getContext('2d');
       
       let ancho = canvas.width = contenedor.clientWidth;
       let alto = canvas.height = contenedor.clientHeight;
       
       // MÍNIMO de partículas
       const particulas = [];
       for (let i = 0; i < 50; i++) {
           const isDark = body.dataset.theme === 'dark';
           particulas.push({
               x: Math.random() * ancho,
               y: Math.random() * alto,
               size: Math.random() * 1.5 + 0.5,
               speedX: (Math.random() - 0.1) * 0.7,
               speedY: (Math.random() - 0.1) * 0.7,
               color: isDark ? 'rgba(100, 200, 255, 0.6)' : 'rgba(70, 130, 200, 0.4)'
           });
       }
       
       let animando = true;
       
       function animar() {
           if (!animando) return;
           
           ctx.fillStyle = body.dataset.theme === 'dark' ? 'rgba(10, 15, 35, 0.02)' : 'rgba(240, 245, 255, 0.02)';
           ctx.fillRect(0, 0, ancho, alto);
           
           particulas.forEach(p => {
               p.x += p.speedX;
               p.y += p.speedY;
               
               if (p.x <= 0 || p.x >= ancho) p.speedX *= -1;
               if (p.y <= 0 || p.y >= alto) p.speedY *= -1;
               
               ctx.fillStyle = p.color;
               ctx.beginPath();
               ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
               ctx.fill();
           });
           
           requestAnimationFrame(animar);
       }
       
       // Iniciar con delay para no bloquear carga
       setTimeout(animar, 500);
       
       function resize() {
           ancho = canvas.width = contenedor.clientWidth;
           alto = canvas.height = contenedor.clientHeight;
       }
       
       window.addEventListener('resize', resize);
       
       return {
           destroy: () => {
               animando = false;
               if (canvas.parentNode) {
                   canvas.parentNode.removeChild(canvas);
               }
           }
       };
   }
   
   // ============================================
   // 5. CONTADORES DIFERIDOS
   // ============================================
   
   function iniciarContadores() {
       const counters = document.querySelectorAll('[data-count]');
       if (!counters.length) return;
       
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting && !entry.target.dataset.played) {
                   const el = entry.target;
                   const target = parseFloat(el.dataset.count);
                   const suffix = el.dataset.suffix || '';
                   let start = null;
                   
                   function animar(timestamp) {
                       if (!start) start = timestamp;
                       const progress = Math.min((timestamp - start) / 1500, 1);
                       const current = Math.floor(target * progress);
                       el.textContent = current + suffix;
                       
                       if (progress < 1) {
                           requestAnimationFrame(animar);
                       }
                   }
                   
                   requestAnimationFrame(animar);
                   el.dataset.played = 'true';
               }
           });
       }, { threshold: 0.1 });
       
       counters.forEach(counter => observer.observe(counter));
   }
   
   // ============================================
   // 6. INICIALIZACIÓN ESTRATIFICADA
   // ============================================
   
   // FASE 1: Inmediata (0-100ms)
   document.addEventListener('DOMContentLoaded', () => {
       console.log('🚀 FASE 1 - Núcleo cargado');
       iniciarContadores();
   });
   
   // FASE 2: Rápida (500ms)
   setTimeout(() => {
       console.log('🚀 FASE 2 - Componentes rápidos');
       
       // Smooth scroll mínimo
       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
           anchor.addEventListener('click', function(e) {
               const href = this.getAttribute('href');
               if (href !== '#') {
                   e.preventDefault();
                   const target = document.querySelector(href);
                   if (target) {
                       target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                   }
               }
           });
       });
   }, 500);
   
   // FASE 3: Pesada (1000ms - OPCIONAL)
   setTimeout(() => {
       console.log('🚀 FASE 3 - Elementos pesados (opcional)');
       
       // Universo solo si el usuario no está en móvil
       if (window.innerWidth >= 768) {
           const secciones = document.querySelectorAll('.hero, .page-hero, .home-hero');
           secciones.forEach(seccion => {
               crearUniversoUltraLigero(seccion);
           });
       }
   }, 1000);
   
   // ============================================
   // 7. HERRAMIENTAS DEBUG (mantener)
   // ============================================
   
   window.verTema = () => ({
       temaActual: body.dataset.theme,
       temaGuardado: localStorage.getItem('sipser-theme')
   });
   
   window.cambiarTema = (tema) => {
       if (tema === 'dark' || tema === 'light') setTheme(tema);
   };
   
   console.log('✅ SIPSER Cloud - Sistema rápido listo!');
   
   // ============================================
   // 8. MODALES PARA SOLUCIONES SIPSER CLOUD (CON VALIDACIÓN)
   // ============================================
   
   document.addEventListener('DOMContentLoaded', function() {
     const modalOverlay = document.getElementById('solutionModal');
     const modalContent = document.getElementById('modalContent');
     const closeBtn = document.querySelector('.modal-close');
     const knowMoreBtns = document.querySelectorAll('.know-more-btn');
   
     // Solo inicializar modales si los elementos existen
     if (!modalOverlay || !modalContent || !closeBtn) {
       console.log('Elementos de modal no encontrados en esta página');
       return;
     }
   
     // Datos para cada solución
     const solutionsData = {
       'migration': {
         title: 'Migración a la Nube',
         description: 'Transformamos tu infraestructura tradicional en entornos cloud modernos, seguros y escalables. Nuestro proceso de migración garantiza la continuidad del negocio mientras optimizamos costos y mejoramos el rendimiento.',
         features: [
           {
             title: 'Estrategia de Migración',
             description: 'Evaluación completa y planificación estratégica para migrar cargas de trabajo de forma segura.'
           },
           {
             title: 'Modernización de Aplicaciones',
             description: 'Refactorización y containerización para aprovechar al máximo las ventajas del cloud.'
           },
           {
             title: 'Optimización de Costos',
             description: 'Análisis continuo de uso y gasto con implementación de estrategias FinOps.'
           },
           {
             title: 'Gobernanza Multicloud',
             description: 'Gestionamos múltiples proveedores cloud con políticas de seguridad y cumplimiento unificadas.'
           }
         ],
         ctaText: 'Iniciar Migración'
       },
       'continuity': {
         title: 'Continuidad de Negocio',
         description: 'Protegemos tu operación 24/7 con estrategias de recuperación ante desastres, alta disponibilidad y planes de contingencia probados. Minimizamos el tiempo de inactividad y garantizamos la resiliencia de tu negocio.',
         features: [
           {
             title: 'Disaster Recovery',
             description: 'Sistemas de recuperación automatizados con RTO y RDO optimizados para tu industria.'
           },
           {
             title: 'Alta Disponibilidad',
             description: 'Arquitecturas redundantes y balanceo de carga para máxima disponibilidad.'
           },
           {
             title: 'Backup Inteligente',
             description: 'Copias de seguridad automatizadas con retención configurable y recuperación granular.'
           },
           {
             title: 'Simulaciones de Crisis',
             description: 'Pruebas periódicas de recuperación y planes de contingencia actualizados.'
           }
         ],
         ctaText: 'Proteger Mi Negocio'
       },
       'data-engineering': {
         title: 'Ingeniería de Datos',
         description: 'Construimos pipelines de datos robustos que transforman información cruda en insights valiosos. Desde la captura hasta el análisis, garantizamos calidad, consistencia y disponibilidad de datos.',
         features: [
           {
             title: 'Data Pipelines',
             description: 'Flujos de datos automatizados con ETL/ELT optimizados para tu volumen de datos.'
           },
           {
             title: 'Data Quality',
             description: 'Gobernanza de datos con validación, limpieza y enriquecimiento automatizado.'
           },
           {
             title: 'Integración Multi-fuente',
             description: 'Conectamos bases de datos, APIs, IoT y sistemas legacy en un solo lugar.'
           },
           {
             title: 'Data Warehouse/Lake',
             description: 'Diseño e implementación de almacenes de datos escalables y performantes.'
           }
         ],
         ctaText: 'Transformar Mis Datos'
       },
       'machine-learning': {
         title: 'Machine Learning',
         description: 'Desarrollamos modelos de IA que aprenden de tus datos para automatizar procesos, predecir tendencias y optimizar decisiones. Desde proof of concept hasta producción, acompañamos todo el ciclo.',
         features: [
           {
             title: 'Modelos Predictivos',
             description: 'Algoritmos personalizados para forecast, clasificación y recomendación.'
           },
           {
             title: 'MLOps Continuo',
             description: 'Infraestructura para entrenar, desplejar y monitorear modelos en producción.'
           },
           {
             title: 'Computer Vision',
             description: 'Sistemas de reconocimiento de imágenes y video para automatización visual.'
           },
           {
             title: 'NLP & Chatbots',
             description: 'Procesamiento de lenguaje natural y asistentes conversacionales inteligentes.'
           }
         ],
         ctaText: 'Implementar IA'
       },
       'infrastructure': {
         title: 'Infraestructura Cloud',
         description: 'Diseñamos y operamos arquitecturas cloud nativas, seguras y escalables. Desde landing zones hasta observabilidad completa, construimos la base tecnológica para tu crecimiento.',
         features: [
           {
             title: 'Cloud Native Design',
             description: 'Arquitecturas basadas en microservicios, contenedores y serverless.'
           },
           {
             title: 'Seguridad Integral',
             description: 'Hardening, Zero Trust, WAF, SIEM y cumplimiento normativo automatizado.'
           },
           {
             title: 'Observabilidad',
             description: 'Monitoreo 24/7 con logging, tracing y métricas en tiempo real.'
           },
           {
             title: 'Automatización DevOps',
             description: 'CI/CD pipelines, IaC y orquestación para despliegues rápidos y seguros.'
           }
         ],
         ctaText: 'Diseñar Mi Infraestructura'
       },
       'business-intelligence': {
         title: 'Business Intelligence',
         description: 'Convertimos datos complejos en dashboards interactivos y reportes ejecutivos que impulsan decisiones estratégicas. Democratizamos el acceso a la información en toda la organización.',
         features: [
           {
             title: 'Dashboards Interactivos',
             description: 'Visualizaciones personalizadas con drill-down y filtros en tiempo real.'
           },
           {
             title: 'Reportes Automatizados',
             description: 'Generación y distribución programada de reportes a stakeholders.'
           },
           {
             title: 'Self-Service Analytics',
             description: 'Herramientas para que usuarios no técnicos exploren datos por sí mismos.'
           },
           {
             title: 'KPIs y Métricas',
             description: 'Definición y seguimiento de indicadores clave de negocio personalizados.'
           }
         ],
         ctaText: 'Ver Mis Dashboards'
       }
     };
   
     // Función para abrir modal
     function openModal(solutionId) {
       const solution = solutionsData[solutionId];
       if (!solution) return;
   
       // Construir contenido del modal
       modalContent.innerHTML = `
         <h2>${solution.title}</h2>
         <p class="solution-description">${solution.description}</p>
         
         <div class="solution-features">
           ${solution.features.map(feature => `
             <div class="modal-feature-card">
               <h4>${feature.title}</h4>
               <p>${feature.description}</p>
             </div>
           `).join('')}
         </div>
         
         <div class="solution-cta">
           <a class="btn primary" href="contacto.html?solution=${solutionId}">${solution.ctaText}</a>
           <p style="margin-top: 15px; font-size: 0.9rem; color: var(--muted);">
             ¿Necesitas una propuesta personalizada? Agenda una consulta gratuita.
           </p>
         </div>
       `;
   
       // Mostrar modal
       modalOverlay.classList.add('active');
       document.body.style.overflow = 'hidden';
     }
   
     // Función para cerrar modal
     function closeModal() {
       modalOverlay.classList.remove('active');
       document.body.style.overflow = 'auto';
     }
   
     // Event listeners para botones "Conocer más"
     if (knowMoreBtns.length > 0) {
       knowMoreBtns.forEach(btn => {
         btn.addEventListener('click', function() {
           const solutionId = this.getAttribute('data-modal');
           openModal(solutionId);
         });
       });
     }
   
     // Event listener para cerrar modal
     if (closeBtn) {
       closeBtn.addEventListener('click', closeModal);
     }
   
     // Cerrar al hacer clic fuera del modal
     if (modalOverlay) {
       modalOverlay.addEventListener('click', function(e) {
         if (e.target === modalOverlay) {
           closeModal();
         }
       });
     }
   
     // Cerrar con Escape
     document.addEventListener('keydown', function(e) {
       if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
         closeModal();
       }
     });
   });
   
   // ============================================
   // 9. ACTUALIZAR AÑO EN FOOTER
   // ============================================
   
   document.addEventListener('DOMContentLoaded', function() {
     const yearSpan = document.getElementById('year');
     if (yearSpan) {
       yearSpan.textContent = new Date().getFullYear();
     }
   });
   
   // ============================================
   // 10. MEJORAR EXPERIENCIA MOBILE
   // ============================================
   
   // Cerrar menú al hacer clic en un enlace (solo mobile)
   document.addEventListener('DOMContentLoaded', function() {
     const nav = document.querySelector('nav');
     const navLinks = document.querySelectorAll('nav ul a');
     
     if (nav && navLinks.length > 0 && window.innerWidth <= 1024) {
       navLinks.forEach(link => {
         link.addEventListener('click', () => {
           nav.classList.remove('open');
         });
       });
     }
   });
   
   // ============================================
   // 11. CASOS DE ÉXITO - SOLO SI NO EXISTEN
   // ============================================
   
   // Verificar si ya existen para evitar redeclaración
   if (typeof casosExito === 'undefined') {
     // Datos de casos de éxito
     window.casosExito = {
         'link2loyalty': {
             categoria: 'Retail',
             titulo: 'Link2Loyalty',
             descripcion: 'Implementación de arquitectura cloud con 89.89% de uptime y sistema de business intelligence en tiempo real.',
             stats: [
                 { valor: '89.89%', label: 'UPTIME' },
                 { valor: '40%', label: 'SEGURIDAD COSTOS' },
                 { valor: '5x', label: 'MÁS SALVO' }
             ],
             resultados: [
                 '+63% en NPS',
                 '18 ms en respuestas de IA',
                 'Copilotos para marketing personalizado',
                 'Arquitectura omnicanal escalable',
                 'Integración con sistemas legacy'
             ],
             solucion: 'Implementamos una arquitectura cloud híbrida con microservicios, AI copilots para anticipar campañas personalizadas y un sistema de BI en tiempo real que procesa millones de transacciones diarias.',
             videoUrl: null
         },
         'fibrashop': {
             categoria: 'Real Estate',
             titulo: 'Fibra Shop',
             descripcion: 'Plataforma de e-commerce escalable con sistema de analytics en tiempo real y automatización de procesos.',
             stats: [
                 { valor: '3x', label: 'VOLKS' },
                 { valor: 'Real-time', label: 'ANALYTICS' },
                 { valor: '86.8%', label: 'OPTIMIZACIÓN' }
             ],
             resultados: [
                 '42% de ahorro energético',
                 '5x velocidad analítica',
                 'Dashboard ESG 360°',
                 'Gemelo digital del portafolio',
                 'Visión predictiva del mercado'
             ],
             solucion: 'Desarrollo de gemelo digital para portafolio inmobiliario con visión predictiva, integración de IoT para monitoreo energético y plataforma de comercio electrónico escalable.',
             videoUrl: null
         },
         'banking': {
             categoria: 'Financiero',
             titulo: 'Banking Studio',
             descripcion: 'Plataforma de datos regulada con detección de fraude y canales digitales seguros.',
             stats: [
                 { valor: '99.98%', label: 'DISPONIBILIDAD' },
                 { valor: 'Zero Trust', label: 'SEGURIDAD' },
                 { valor: 'Feature Store', label: 'COMPARTIDO' }
             ],
             resultados: [
                 '99.98% disponibilidad SLA',
                 'Zero trust dinámico implementado',
                 'Feature store compartido entre equipos',
                 'Detección de fraude en tiempo real',
                 'Canales digitales 100% seguros'
             ],
             solucion: 'Arquitectura de microservicios para banca digital con sistemas de detección de fraude basados en ML, feature store compartido y cumplimiento regulatorio automatizado.',
             videoUrl: null
         },
         'concretos': {
             categoria: 'Infraestructura',
             titulo: 'Concretos Técnicos',
             descripcion: 'Modernización completa de infraestructura para garantizar resiliencia, seguridad y crecimiento sostenible.',
             stats: [
                 { valor: '100%', label: 'SEGURO' },
                 { valor: '60%', label: 'MÁS EFICIENTE' },
                 { valor: 'Escalable', label: 'INFRAESTRUCTURA' }
             ],
             resultados: [
                 'Edge AI para operaciones críticas',
                 'Computer vision en plantas y rutas',
                 'Reducción del 60% en costos operativos',
                 'Infraestructura 100% resiliente',
                 'Crecimiento sostenible garantizado'
             ],
             solucion: 'Edge AI para operaciones críticas con computer vision en plantas y rutas de entrega, migración completa a cloud híbrido y automatización de procesos industriales.',
             videoUrl: null
         },
         'gruposistemas': {
             categoria: 'Manufactura',
             titulo: 'Grupo Sistemas',
             descripcion: 'Implementación de modelos predictivos y sistema de inteligencia artificial para optimización de operaciones.',
             stats: [
                 { valor: 'ML', label: 'IMPLEMENTADO' },
                 { valor: '95%', label: 'PRECISIÓN' },
                 { valor: 'ROI', label: '8 MESES' }
             ],
             resultados: [
                 'Modelos predictivos en producción',
                 '95% de precisión en pronósticos',
                 'ROI en 8 meses',
                 'Automatización de línea de producción',
                 'Reducción de desperdicios'
             ],
             solucion: 'Zero Trust continuo con automatización de respuesta ante incidentes y SOC compartido, implementación de modelos de ML para optimización de producción.',
             videoUrl: null
         },
         'fibratel': {
             categoria: 'Telecomunicaciones',
             titulo: 'Fibratel',
             descripcion: 'Fortalecimiento de infraestructura tecnológica para expansión sostenible y segura.',
             stats: [
                 { valor: '45%', label: 'MÁS EFICIENTE' },
                 { valor: '35%', label: 'AHORRO' },
                 { valor: 'Expansión', label: 'SEGURA' }
             ],
             resultados: [
                 '45% mejora en eficiencia operativa',
                 '35% de ahorro en costos',
                 'Expansión segura a nuevas regiones',
                 'Infraestructura tecnológica fortalecida',
                 'Soluciones cloud avanzadas'
             ],
             solucion: 'Fortalecimiento de infraestructura tecnológica y mejora de eficiencia operativa con soluciones cloud avanzadas, implementación de redes definidas por software (SDN).',
             videoUrl: null
         }
     };
   }
   
   // Funciones globales para casos de éxito
   if (typeof abrirCasoDetalle === 'undefined') {
     window.abrirCasoDetalle = function(casoId) {
         const caso = window.casosExito[casoId];
         if (!caso) return;
         
         const modal = document.getElementById('casoModal');
         const modalCategoria = document.getElementById('modalCategoria');
         const modalTitulo = document.getElementById('modalTitulo');
         const modalDescripcion = document.getElementById('modalDescripcion');
         const modalStats = document.getElementById('modalStats');
         const modalResultados = document.getElementById('modalResultados');
         const modalSolucion = document.getElementById('modalSolucion');
         const modalVideoContainer = document.getElementById('modalVideoContainer');
         
         if (!modal || !modalCategoria || !modalTitulo) {
             console.error('Elementos del modal no encontrados');
             return;
         }
         
         // Actualizar contenido
         modalCategoria.textContent = caso.categoria;
         modalTitulo.textContent = caso.titulo;
         modalDescripcion.textContent = caso.descripcion;
         modalSolucion.textContent = caso.solucion;
         
         // Actualizar estadísticas
         if (modalStats) {
             modalStats.innerHTML = caso.stats.map(stat => `
                 <div class="modal-stat">
                     <div class="modal-stat-value">${stat.valor}</div>
                     <div class="modal-stat-label">${stat.label}</div>
                 </div>
             `).join('');
         }
         
         // Actualizar resultados
         if (modalResultados) {
             modalResultados.innerHTML = caso.resultados.map(resultado => `
                 <li>${resultado}</li>
             `).join('');
         }
         
         // Actualizar video si existe
         if (modalVideoContainer) {
             if (caso.videoUrl) {
                 modalVideoContainer.innerHTML = `
                     <iframe 
                         class="modal-video" 
                         src="${caso.videoUrl}" 
                         title="Video caso ${caso.titulo}"
                         frameborder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowfullscreen>
                     </iframe>
                 `;
             } else {
                 modalVideoContainer.innerHTML = `
                     <div class="video-placeholder">
                         <div class="video-placeholder-icon">🎥</div>
                         <p>Video disponible próximamente</p>
                         <small style="margin-top: 8px; opacity: 0.7;">El cliente autorizó compartir este caso, video en producción.</small>
                     </div>
                 `;
             }
         }
         
         // Mostrar modal
         modal.classList.add('active');
         document.body.style.overflow = 'hidden';
     };
   
     window.cerrarModal = function() {
         const modal = document.getElementById('casoModal');
         if (modal) {
             modal.classList.remove('active');
             document.body.style.overflow = 'auto';
             
             // Pausar video si está reproduciendo
             const videoIframe = modal.querySelector('iframe');
             if (videoIframe) {
                 videoIframe.src = videoIframe.src;
             }
         }
     };
   
     window.navigateToContacto = function(proyecto) {
         if (typeof localStorage !== 'undefined') {
             localStorage.setItem('sipser-proyecto-interes', proyecto);
         }
         window.location.href = 'contacto.html?proyecto=' + encodeURIComponent(proyecto);
     };
   
     window.navigateTo = function(page) {
         window.location.href = page + '.html';
     };
   
     // Event listeners para cerrar modal
     document.addEventListener('DOMContentLoaded', function() {
         // Cerrar modal con Escape
         document.addEventListener('keydown', function(e) {
             if (e.key === 'Escape') {
                 cerrarModal();
             }
         });
   
         // Cerrar modal al hacer clic fuera
         document.addEventListener('click', function(e) {
             const modal = document.getElementById('casoModal');
             if (modal && modal.classList.contains('active') && e.target === modal) {
                 cerrarModal();
             }
         });
     });
   }
   
   // ============================================
   // 12. SISTEMA AVANZADO DE NOTICIAS Y PODCASTS
   // ============================================
   
   // Datos globales de noticias y podcasts
   const globalNewsData = [
       {
           id: 1,
           category: "Inteligencia Artificial",
           tag: "ia",
           title: "Cómo la IA Generativa está transformando las operaciones empresariales",
           description: "Exploramos casos reales de empresas que han implementado IA generativa para optimizar procesos y aumentar la productividad.",
           fullContent: `
               <p>La inteligencia artificial generativa está revolucionando la forma en que las empresas operan, desde la automatización de procesos hasta la creación de contenido personalizado.</p>
               
               <h3>Transformación en el sector retail</h3>
               <p>Grandes retailers como Amazon y Walmart están utilizando IA generativa para:</p>
               <ul>
                   <li>Optimizar inventarios en tiempo real</li>
                   <li>Crear descripciones de productos automatizadas</li>
                   <li>Generar campañas de marketing personalizadas</li>
                   <li>Predecir tendencias de consumo</li>
               </ul>
               
               <h3>Casos de éxito en México</h3>
               <p>Empresas mexicanas como Elektra y Liverpool han reportado aumentos del 40% en eficiencia operativa tras implementar soluciones de IA generativa para:</p>
               <ul>
                   <li>Atención al cliente automatizada</li>
                   <li>Generación de reportes financieros</li>
                   <li>Optimización de rutas de distribución</li>
                   <li>Detección de fraudes</li>
               </ul>
               
               <p>El futuro de la IA generativa en empresas promete una mayor personalización, eficiencia y capacidad de innovación, permitiendo a las organizaciones mantenerse competitivas en un mercado cada vez más digital.</p>
           `,
           highlights: [
               "Aumento del 40% en eficiencia operativa",
               "Reducción de costos operativos hasta en 30%",
               "Mejora en la experiencia del cliente en un 60%",
               "Generación de contenido 10x más rápida"
           ],
           tags: ["IA Generativa", "Automatización", "Transformación Digital", "Productividad"],
           image: "images/news/ia-generativa.jpg",
           date: "15 Mar 2024",
           readTime: "5 min lectura",
           author: "Ana Martínez",
           position: "Especialista en IA"
       },
       {
           id: 2,
           category: "Cloud Computing",
           tag: "cloud",
           title: "Lo más destacado de AWS reinvent 2024",
           description: "Resumen de los anuncios más importantes y cómo impactarán en las estrategias de migración y transformación digital.",
           fullContent: `
               <p>Amazon Web Services presentó más de 20 nuevas características y servicios en su conferencia anual reinvent 2024, enfocándose en IA, sostenibilidad y optimización de costos.</p>
               
               <h3>Novedades principales</h3>
               <ul>
                   <li><strong>AWS AI Canvas:</strong> Herramienta de diseño visual para modelos de IA</li>
                   <li><strong>Amazon Q:</strong> Asistente de IA empresarial mejorado</li>
                   <li><strong>Graviton4:</strong> Procesadores con 40% mejor rendimiento</li>
                   <li><strong>Zero-ETL Analytics:</strong> Integración sin ETL entre servicios</li>
               </ul>
               
               <h3>Impacto en estrategias cloud</h3>
               <p>Estas innovaciones permitirán a las empresas:</p>
               <ul>
                   <li>Reducir costos de infraestructura hasta en un 35%</li>
                   <li>Acelerar migraciones a la nube en un 50%</li>
                   <li>Implementar soluciones de IA en semanas en lugar de meses</li>
                   <li>Cumplir con regulaciones de sostenibilidad más fácilmente</li>
               </ul>
           `,
           highlights: [
               "20+ nuevas características anunciadas",
               "Ahorro potencial del 35% en costos",
               "50% más rápido en migraciones",
               "Graviton4: 40% mejor rendimiento"
           ],
           tags: ["AWS", "Cloud Computing", "Innovación", "Migración"],
           image: "images/news/aws-reinvent.jpg",
           date: "10 Mar 2024",
           readTime: "7 min lectura",
           author: "Carlos Rodríguez",
           position: "AWS Solutions Architect"
       },
       {
           id: 3,
           category: "Seguridad",
           tag: "seguridad",
           title: "Estrategias de ciberseguridad para entornos multi-nube",
           description: "Guía práctica para implementar políticas de seguridad robustas en infraestructuras que utilizan múltiples proveedores cloud.",
           fullContent: `
               <p>Con el 85% de las empresas utilizando múltiples proveedores cloud, la seguridad multi-nube se ha convertido en una prioridad crítica.</p>
               
               <h3>Desafíos principales</h3>
               <ul>
                   <li>Gobernanza inconsistente entre proveedores</li>
                   <li>Visibilidad limitada de amenazas</li>
                   <li>Complejidad en la gestión de identidades</li>
                   <li>Cumplimiento normativo fragmentado</li>
               </ul>
               
               <h3>Estrategias efectivas</h3>
               <p>Implementa estas 5 estrategias para fortalecer tu postura de seguridad:</p>
               
               <h4>1. Zero Trust Architecture</h4>
               <p>Implementa verificación continua de identidad y dispositivos, independientemente de la ubicación.</p>
               
               <h4>2. CSPM (Cloud Security Posture Management)</h4>
               <p>Usa herramientas automatizadas para monitorear y corregir configuraciones inseguras.</p>
               
               <h4>3. SIEM Unificado</h4>
               <p>Centraliza logs y eventos de seguridad de todos los proveedores cloud.</p>
               
               <h4>4. Gestión Centralizada de Identidades</h4>
               <p>Implementa SSO y MFA consistentes en todas las plataformas.</p>
               
               <h4>5. Auditorías Automatizadas</h4>
               <p>Automatiza pruebas de cumplimiento y auditorías de seguridad.</p>
           `,
           highlights: [
               "85% de empresas usan multi-cloud",
               "Zero Trust es esencial",
               "CSPM reduce riesgos en 70%",
               "SIEM unificado mejora detección"
           ],
           tags: ["Ciberseguridad", "Multi-Cloud", "Zero Trust", "Compliance"],
           image: "images/news/seguridad-multicloud.jpg",
           date: "5 Mar 2024",
           readTime: "6 min lectura",
           author: "María González",
           position: "CISO"
       },
       {
           id: 4,
           category: "Optimización",
           tag: "optimizacion",
           title: "FinOps: Cómo optimizar costos en la nube sin sacrificar rendimiento",
           description: "Implementa prácticas de FinOps para lograr un equilibrio perfecto entre costo, rendimiento y funcionalidad en tus servicios cloud.",
           fullContent: `
               <p>FinOps no es solo ahorrar dinero, es optimizar el valor de cada dólar invertido en cloud.</p>
               
               <h3>Los 3 pilares de FinOps</h3>
               
               <h4>1. Informe</h4>
               <p>Visibilidad total del gasto cloud con desglose por:</p>
               <ul>
                   <li>Proyecto/Departamento</li>
                   <li>Tipo de recurso</li>
                   <li>Etiquetas personalizadas</li>
                   <li>Patrones de uso</li>
               </ul>
               
               <h4>2. Optimización</h4>
               <p>Estrategias prácticas para reducir costos:</p>
               <ul>
                   <li><strong>Reserved Instances:</strong> Hasta 75% de descuento</li>
                   <li><strong>Spot Instances:</strong> Hasta 90% de ahorro para cargas flexibles</li>
                   <li><strong>Auto-scaling:</strong> Ajusta recursos según demanda real</li>
                   <li><strong>Right-sizing:</strong> Elimina recursos sobre-provisionados</li>
               </ul>
               
               <h4>3. Operación</h4>
               <p>Cultura organizacional centrada en el valor:</p>
               <ul>
                   <li>Responsabilidad compartida por costos</li>
                   <li>Reuniones regulares de FinOps</li>
                   <li>Incentivos por optimización</li>
                   <li>Capacitación continua</li>
               </ul>
               
               <h3>Resultados reales</h3>
               <p>Empresas que implementan FinOps reportan:</p>
               <ul>
                   <li>30-40% reducción en costos cloud</li>
                   <li>Mejora en visibilidad del gasto</li>
                   <li>Mejores decisiones de arquitectura</li>
                   <li>Retorno de inversión en 3-6 meses</li>
               </ul>
           `,
           highlights: [
               "30-40% reducción de costos",
               "75% descuento con Reserved Instances",
               "ROI en 3-6 meses",
               "Cultura de optimización"
           ],
           tags: ["FinOps", "Optimización", "Costos Cloud", "AWS", "Azure"],
           image: "images/news/finops-cloud.jpg",
           date: "28 Feb 2024",
           readTime: "8 min lectura",
           author: "Roberto Sánchez",
           position: "Director FinOps"
       }
   ];
   
   const globalPodcastData = [
       {
           id: 1,
           category: "MACHINE LEARNING",
           tag: "ml",
           title: "¿SOBRE DEMANDA O ESCASEZ DE INVENTARIOS? PREVEE TUS INVENTARIOS CON MACHINE LEARNING",
           description: "Aprende cómo optimizar la gestión de inventarios y tener respuesta clara de tu negocio con Machine Learning de AWS.",
           duration: "25 min",
           date: "15 Mar 2024",
           episode: "Episode 1",
           image: "icons/podcast-ml.jpg",
           audioUrl: "podcasts/episode1.mp3",
           spotifyUrl: "https://open.spotify.com/episode/..."
       },
       {
           id: 2,
           category: "INFRAESTRUCTURA",
           tag: "infra",
           title: "EL COSTO DE MANTENIMIENTO DE INFRAESTRUCTURA",
           description: "Hablamos con el ingeniero Guillermo Reyes, Solution Architect de AWS, sobre las ventajas del abastecimiento en nube.",
           duration: "32 min",
           date: "8 Mar 2024",
           episode: "Episode 2",
           image: "icons/podcast-infra.jpg",
           audioUrl: "podcasts/episode2.mp3",
           spotifyUrl: "https://open.spotify.com/episode/..."
       },
       {
           id: 3,
           category: "IA GENERATIVA",
           tag: "genai",
           title: "IA GENERATIVA PARA PYMES: INNOVACIÓN AL ALCANCE DE TODOS",
           description: "Descubre cómo la IA generativa puede ser la clave para llevar tu negocio al siguiente nivel de productividad.",
           duration: "28 min",
           date: "1 Mar 2024",
           episode: "Episode 3",
           image: "icons/podcast-genai.jpg",
           audioUrl: "podcasts/episode3.mp3",
           spotifyUrl: "https://open.spotify.com/episode/..."
       },
       {
           id: 4,
           category: "DATA ANALYTICS",
           tag: "data",
           title: "DATOS EN TIEMPO REAL: CONSTRUYENDO PIPELINES EFICIENTES CON AWS",
           description: "Exploramos las mejores prácticas para implementar pipelines de datos en tiempo real que alimenten tus dashboards de BI.",
           duration: "35 min",
           date: "22 Feb 2024",
           episode: "Episode 4",
           image: "icons/podcast-data.jpg",
           audioUrl: "podcasts/episode4.mp3",
           spotifyUrl: "https://open.spotify.com/episode/..."
       },
       {
           id: 5,
           category: "MIGRACIÓN CLOUD",
           tag: "migracion",
           title: "MIGRACIÓN A LA NUBE: ESTRATEGIAS PARA PYMES",
           description: "Guía completa para migrar tus sistemas a la nube de forma segura y eficiente.",
           duration: "30 min",
           date: "15 Feb 2024",
           episode: "Episode 5",
           image: "icons/podcast-migration.jpg",
           audioUrl: "podcasts/episode5.mp3",
           spotifyUrl: "https://open.spotify.com/episode/..."
       }
   ];
   
   // ============================================
   // 13. SISTEMA DE PESTAÑAS Y MODAL DE NOTICIAS
   // ============================================
   
   document.addEventListener('DOMContentLoaded', function() {
       // Solo ejecutar en página de contenido
       if (document.body.dataset.page !== 'contenido') return;
   
       // Estado de la aplicación
       const state = {
           currentTab: 'news',
           news: {
               data: [...globalNewsData],
               filtered: [...globalNewsData],
               currentPage: 1,
               itemsPerPage: 6,
               filter: 'all',
               search: ''
           },
           podcasts: {
               data: [...globalPodcastData],
               filtered: [...globalPodcastData],
               currentPage: 1,
               itemsPerPage: 8,
               filter: 'all',
               search: ''
           }
       };
   
       // Inicialización
       function init() {
           updateCounters();
           renderNews();
           renderPodcasts();
           setupEventListeners();
           setupNewsModal();
           setupPodcastModal();
           
           // Verificar si hay una noticia específica en la URL
           const urlParams = new URLSearchParams(window.location.search);
           const newsId = urlParams.get('news');
           if (newsId) {
               setTimeout(() => openNewsModal(newsId), 500);
           }
           
           console.log('✅ Sistema de pestañas y modal de noticias cargado');
       }
   
       // Actualizar contadores en las pestañas
       function updateCounters() {
           const newsCount = document.getElementById('newsCount');
           const podcastsCount = document.getElementById('podcastsCount');
           const newsResults = document.getElementById('newsResults');
           const podcastResults = document.getElementById('podcastResults');
           
           if (newsCount) newsCount.textContent = state.news.filtered.length;
           if (podcastsCount) podcastsCount.textContent = state.podcasts.filtered.length;
           if (newsResults) newsResults.textContent = state.news.filtered.length;
           if (podcastResults) podcastResults.textContent = state.podcasts.filtered.length;
       }
   
       // Sistema de pestañas
       function setupTabs() {
           const tabs = document.querySelectorAll('.content-tab');
           
           tabs.forEach(tab => {
               tab.addEventListener('click', function() {
                   const tabId = this.dataset.tab;
                   
                   // Actualizar pestaña activa
                   tabs.forEach(t => t.classList.remove('active'));
                   this.classList.add('active');
                   
                   // Ocultar todas las secciones, mostrar la activa
                   document.querySelectorAll('.content-section').forEach(section => {
                       section.classList.remove('active');
                   });
                   
                   const activeSection = document.getElementById(`${tabId}Section`);
                   if (activeSection) {
                       activeSection.classList.add('active');
                       state.currentTab = tabId;
                       
                       // Actualizar URL (opcional, para compartir)
                       history.pushState(null, '', `#${tabId}`);
                   }
               });
           });
           
           // Manejar URL hash al cargar
           const hash = window.location.hash.replace('#', '');
           if (hash && ['news', 'podcasts'].includes(hash)) {
               const tabToActivate = document.querySelector(`[data-tab="${hash}"]`);
               if (tabToActivate) {
                   tabToActivate.click();
               }
           }
       }
   
       // Renderizar noticias
       function renderNews() {
           const container = document.getElementById('newsContainer');
           const pageEl = document.getElementById('newsPage');
           const totalPagesEl = document.getElementById('newsTotalPages');
           const prevBtn = document.getElementById('prevNews');
           const nextBtn = document.getElementById('nextNews');
           
           if (!container) return;
           
           // Calcular paginación
           const start = (state.news.currentPage - 1) * state.news.itemsPerPage;
           const end = start + state.news.itemsPerPage;
           const currentItems = state.news.filtered.slice(start, end);
           const totalPages = Math.ceil(state.news.filtered.length / state.news.itemsPerPage);
           
           // Limpiar contenedor
           container.innerHTML = '';
           
           if (currentItems.length === 0) {
               // Mostrar estado vacío
               container.innerHTML = `
                   <div class="empty-state">
                       <div class="empty-state-icon">📰</div>
                       <h3>No se encontraron noticias</h3>
                       <p>Prueba con otros filtros o términos de búsqueda.</p>
                       <button class="btn ghost" id="clearNewsFilters">Limpiar filtros</button>
                   </div>
               `;
               
               const clearBtn = document.getElementById('clearNewsFilters');
               if (clearBtn) {
                   clearBtn.addEventListener('click', clearNewsFilters);
               }
           } else {
               // Renderizar noticias
               currentItems.forEach(news => {
                   const article = document.createElement('article');
                   article.className = 'news-article';
                   article.innerHTML = `
                       <span class="news-category">${news.category}</span>
                       <h3>${news.title}</h3>
                       <p>${news.description}</p>
                       <div class="news-meta">
                           <div>
                               <span class="news-date">${news.date}</span>
                               <span class="news-read-time">⏱️ ${news.readTime}</span>
                           </div>
                           <button class="btn ghost read-more-btn" data-id="${news.id}">
                               Leer más →
                           </button>
                       </div>
                   `;
                   container.appendChild(article);
               });
               
               // Agregar event listeners a los botones "Leer más"
               container.querySelectorAll('.read-more-btn').forEach(btn => {
                   btn.addEventListener('click', function() {
                       const newsId = this.dataset.id;
                       openNewsModal(newsId);
                   });
               });
           }
           
           // Actualizar controles de paginación
           if (pageEl) pageEl.textContent = state.news.currentPage;
           if (totalPagesEl) totalPagesEl.textContent = totalPages;
           if (prevBtn) prevBtn.disabled = state.news.currentPage === 1;
           if (nextBtn) nextBtn.disabled = state.news.currentPage === totalPages || totalPages === 0;
           
           updateCounters();
       }
   
       // Renderizar podcasts
       function renderPodcasts() {
           const container = document.getElementById('podcastContainer');
           const pageEl = document.getElementById('podcastPage');
           const totalPagesEl = document.getElementById('podcastTotalPages');
           const prevBtn = document.getElementById('prevPodcast');
           const nextBtn = document.getElementById('nextPodcast');
           
           if (!container) return;
           
           // Calcular paginación
           const start = (state.podcasts.currentPage - 1) * state.podcasts.itemsPerPage;
           const end = start + state.podcasts.itemsPerPage;
           const currentItems = state.podcasts.filtered.slice(start, end);
           const totalPages = Math.ceil(state.podcasts.filtered.length / state.podcasts.itemsPerPage);
           
           // Limpiar contenedor
           container.innerHTML = '';
           
           if (currentItems.length === 0) {
               // Mostrar estado vacío
               container.innerHTML = `
                   <div class="empty-state">
                       <div class="empty-state-icon">🎙️</div>
                       <h3>No se encontraron episodios</h3>
                       <p>Prueba con otros filtros o términos de búsqueda.</p>
                       <button class="btn ghost" id="clearPodcastFilters">Limpiar filtros</button>
                   </div>
               `;
               
               const clearBtn = document.getElementById('clearPodcastFilters');
               if (clearBtn) {
                   clearBtn.addEventListener('click', clearPodcastFilters);
               }
           } else {
               // Renderizar podcasts
               currentItems.forEach(podcast => {
                   const episode = document.createElement('article');
                   episode.className = 'podcast-episode';
                   episode.dataset.id = podcast.id;
                   episode.innerHTML = `
                       <span class="podcast-category">${podcast.category}</span>
                       <h3>${podcast.title}</h3>
                       <p>${podcast.description}</p>
                       <div class="podcast-meta">
                           <div>
                               <span class="podcast-duration">⏱️ ${podcast.duration}</span>
                               <span class="podcast-date">${podcast.date}</span>
                           </div>
                           <button class="btn primary play-podcast-btn" data-id="${podcast.id}">
                               ▶️ Reproducir
                           </button>
                       </div>
                   `;
                   container.appendChild(episode);
               });
               
               // Agregar event listeners para reproducción
               container.querySelectorAll('.play-podcast-btn').forEach(btn => {
                   btn.addEventListener('click', function() {
                       const podcastId = this.dataset.id;
                       playPodcast(podcastId);
                   });
               });
           }
           
           // Actualizar controles de paginación
           if (pageEl) pageEl.textContent = state.podcasts.currentPage;
           if (totalPagesEl) totalPagesEl.textContent = totalPages;
           if (prevBtn) prevBtn.disabled = state.podcasts.currentPage === 1;
           if (nextBtn) nextBtn.disabled = state.podcasts.currentPage === totalPages || totalPages === 0;
           
           updateCounters();
       }
   
       // Filtros y búsqueda
       function filterNews() {
           let filtered = [...state.news.data];
           
           // Aplicar filtro de categoría
           if (state.news.filter !== 'all') {
               filtered = filtered.filter(item => item.tag === state.news.filter);
           }
           
           // Aplicar búsqueda
           if (state.news.search.trim() !== '') {
               const searchTerm = state.news.search.toLowerCase();
               filtered = filtered.filter(item => 
                   item.title.toLowerCase().includes(searchTerm) ||
                   item.description.toLowerCase().includes(searchTerm) ||
                   item.category.toLowerCase().includes(searchTerm) ||
                   item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
               );
           }
           
           state.news.filtered = filtered;
           state.news.currentPage = 1;
           renderNews();
       }
   
       function filterPodcasts() {
           let filtered = [...state.podcasts.data];
           
           // Aplicar filtro de categoría
           if (state.podcasts.filter !== 'all') {
               filtered = filtered.filter(item => item.tag === state.podcasts.filter);
           }
           
           // Aplicar búsqueda
           if (state.podcasts.search.trim() !== '') {
               const searchTerm = state.podcasts.search.toLowerCase();
               filtered = filtered.filter(item => 
                   item.title.toLowerCase().includes(searchTerm) ||
                   item.description.toLowerCase().includes(searchTerm) ||
                   item.category.toLowerCase().includes(searchTerm)
               );
           }
           
           state.podcasts.filtered = filtered;
           state.podcasts.currentPage = 1;
           renderPodcasts();
       }
   
       function clearNewsFilters() {
           state.news.filter = 'all';
           state.news.search = '';
           document.querySelectorAll('#newsFilters .filter-tag').forEach(tag => {
               tag.classList.toggle('active', tag.dataset.filter === 'all');
           });
           const newsSearch = document.getElementById('newsSearch');
           if (newsSearch) newsSearch.value = '';
           filterNews();
       }
   
       function clearPodcastFilters() {
           state.podcasts.filter = 'all';
           state.podcasts.search = '';
           document.querySelectorAll('#podcastFilters .filter-tag').forEach(tag => {
               tag.classList.toggle('active', tag.dataset.filter === 'all');
           });
           const podcastSearch = document.getElementById('podcastSearch');
           if (podcastSearch) podcastSearch.value = '';
           filterPodcasts();
       }
   
       // Sistema de modal de noticias
       function setupNewsModal() {
           const modal = document.getElementById('newsModal');
           const closeBtn = document.getElementById('closeNewsModal');
           const shareBtn = document.getElementById('shareNewsBtn');
           const downloadBtn = document.getElementById('downloadNewsBtn');
           
           if (!modal || !closeBtn) return;
           
           // Cerrar modal
           closeBtn.addEventListener('click', closeNewsModal);
           
           modal.addEventListener('click', function(e) {
               if (e.target === modal) {
                   closeNewsModal();
               }
           });
           
           // Cerrar con Escape
           document.addEventListener('keydown', function(e) {
               if (e.key === 'Escape' && modal.classList.contains('active')) {
                   closeNewsModal();
               }
           });
           
           // Compartir noticia
           if (shareBtn) {
               shareBtn.addEventListener('click', shareNews);
           }
           
       }
   
       function openNewsModal(newsId) {
           const news = state.news.data.find(n => n.id == newsId);
           if (!news) return;
           
           const modal = document.getElementById('newsModal');
           
           // Actualizar contenido del modal
           document.getElementById('modalNewsCategory').textContent = news.category;
           document.getElementById('modalNewsTitle').textContent = news.title;
           document.getElementById('modalNewsDate').textContent = news.date;
           document.getElementById('modalNewsReadTime').textContent = `⏱️ ${news.readTime}`;
           document.getElementById('modalNewsContent').innerHTML = news.fullContent;
           
           // Actualizar imagen
           const imageEl = document.getElementById('modalNewsImage');
           const imageContainer = document.querySelector('.news-modal-image');
           if (news.image && news.image !== '') {
               imageEl.src = news.image;
               imageEl.alt = news.title;
               imageEl.style.display = 'block';
               if (imageContainer.querySelector('.image-placeholder')) {
                   imageContainer.innerHTML = `<img id="modalNewsImage" src="${news.image}" alt="${news.title}">`;
               }
           } else if (imageContainer) {
               imageContainer.innerHTML = '<div class="image-placeholder">Imagen ilustrativa</div>';
           }
           
           // Actualizar highlights
           const highlightsContainer = document.getElementById('modalNewsHighlights');
           if (highlightsContainer) {
               highlightsContainer.innerHTML = news.highlights.map(highlight => 
                   `<li>${highlight}</li>`
               ).join('');
           }
           
           // Actualizar tags
           const tagsContainer = document.getElementById('modalNewsTags');
           if (tagsContainer) {
               tagsContainer.innerHTML = news.tags.map(tag => 
                   `<span class="news-tag">${tag}</span>`
               ).join('');
           }
           
           // Mostrar noticias relacionadas
           showRelatedNews(news);
           
           // Mostrar modal
           modal.classList.add('active');
           document.body.style.overflow = 'hidden';
           
           // Guardar ID actual para compartir
           modal.dataset.currentNewsId = newsId;
       }
   
       function closeNewsModal() {
           const modal = document.getElementById('newsModal');
           if (modal) {
               modal.classList.remove('active');
               document.body.style.overflow = 'auto';
               modal.dataset.currentNewsId = '';
           }
       }
   
       function showRelatedNews(currentNews) {
           const container = document.getElementById('relatedNewsContainer');
           const relatedSection = document.getElementById('modalRelatedNews');
           
           if (!container || !relatedSection) return;
           
           // Encontrar noticias relacionadas (misma categoría o tags similares)
           const relatedNews = state.news.data
               .filter(news => news.id !== currentNews.id && 
                             (news.category === currentNews.category || 
                              news.tags.some(tag => currentNews.tags.includes(tag))))
               .slice(0, 3); // Máximo 3 noticias relacionadas
           
           if (relatedNews.length > 0) {
               container.innerHTML = relatedNews.map(news => `
                   <div class="related-news-item" data-id="${news.id}">
                       <h5>${news.title}</h5>
                       <span>${news.date} • ${news.readTime}</span>
                   </div>
               `).join('');
               
               // Agregar event listeners a noticias relacionadas
               container.querySelectorAll('.related-news-item').forEach(item => {
                   item.addEventListener('click', function() {
                       const newsId = this.dataset.id;
                       openNewsModal(newsId);
                   });
               });
               
               relatedSection.style.display = 'block';
           } else {
               relatedSection.style.display = 'none';
           }
       }
   
       function shareNews() {
           const newsId = document.getElementById('newsModal').dataset.currentNewsId;
           const news = state.news.data.find(n => n.id == newsId);
           
           if (!news) return;
           
           if (navigator.share) {
               // Compartir nativo (dispositivos móviles)
               navigator.share({
                   title: news.title,
                   text: news.description,
                   url: `${window.location.origin}${window.location.pathname}?news=${newsId}`
               }).catch(() => {
                   // Fallback si el usuario cancela
                   copyToClipboard(`${news.title}\n\n${window.location.origin}${window.location.pathname}?news=${newsId}`);
               });
           } else {
               // Fallback: copiar al portapapeles
               copyToClipboard(`${news.title}\n\n${window.location.origin}${window.location.pathname}?news=${newsId}`);
           }
       }
   
       function copyToClipboard(text) {
           navigator.clipboard.writeText(text).then(() => {
               alert('Enlace copiado al portapapeles');
           }).catch(err => {
               console.error('Error al copiar: ', err);
               alert('Enlace: ' + text);
           });
       }
      
       // Sistema de modal de podcast (reutilizar función existente)
       function setupPodcastModal() {
           const modal = document.getElementById('podcastModal');
           const closeBtn = document.getElementById('closePodcastModal');
           const audioPlayer = document.getElementById('podcastAudio');
           const playPauseBtn = document.getElementById('playPauseBtn');
           const muteBtn = document.getElementById('muteBtn');
           const volumeSlider = document.getElementById('volumeSlider');
           
           if (!modal || !closeBtn) return;
           
           // Cerrar modal
           closeBtn.addEventListener('click', closePodcastModal);
           
           modal.addEventListener('click', function(e) {
               if (e.target === modal) {
                   closePodcastModal();
               }
           });
           
           // Cerrar con Escape
           document.addEventListener('keydown', function(e) {
               if (e.key === 'Escape' && modal.classList.contains('active')) {
                   closePodcastModal();
               }
           });
           
           // Control de reproducción
           if (playPauseBtn && audioPlayer) {
               playPauseBtn.addEventListener('click', function() {
                   if (audioPlayer.paused) {
                       audioPlayer.play();
                       playPauseBtn.textContent = '⏸️ Pausar';
                   } else {
                       audioPlayer.pause();
                       playPauseBtn.textContent = '▶️ Reproducir';
                   }
               });
               
               audioPlayer.addEventListener('play', function() {
                   playPauseBtn.textContent = '⏸️ Pausar';
               });
               
               audioPlayer.addEventListener('pause', function() {
                   playPauseBtn.textContent = '▶️ Reproducir';
               });
           }
           
           // Control de volumen
           if (muteBtn && audioPlayer) {
               muteBtn.addEventListener('click', function() {
                   audioPlayer.muted = !audioPlayer.muted;
                   muteBtn.textContent = audioPlayer.muted ? '🔇 Silenciado' : '🔊 Silenciar';
               });
           }
           
           if (volumeSlider && audioPlayer) {
               volumeSlider.addEventListener('input', function() {
                   audioPlayer.volume = this.value;
               });
           }
       }
   
       function playPodcast(podcastId) {
           const podcast = state.podcasts.data.find(p => p.id == podcastId);
           if (!podcast) return;
           
           // Actualizar contenido del modal
           document.getElementById('currentPodcastTitle').textContent = podcast.title;
           document.getElementById('currentPodcastDesc').textContent = podcast.description;
           document.getElementById('currentPodcastDuration').textContent = podcast.duration;
           document.getElementById('currentPodcastDate').textContent = podcast.date;
           const spotifyLink = document.getElementById('spotifyLink');
           if (spotifyLink) spotifyLink.href = podcast.spotifyUrl;
           
           // Actualizar imagen (si existe)
           const podcastImage = document.getElementById('currentPodcastImage');
           if (podcast.image) {
               podcastImage.src = podcast.image;
               podcastImage.style.display = 'block';
           } else {
               podcastImage.style.display = 'none';
           }
           
           // Configurar audio
           const audioPlayer = document.getElementById('podcastAudio');
           const audioSource = audioPlayer.querySelector('source');
           audioSource.src = podcast.audioUrl;
           audioPlayer.load();
           
           // Mostrar modal
           const modal = document.getElementById('podcastModal');
           modal.classList.add('active');
           document.body.style.overflow = 'hidden';
           
           // Reproducir automáticamente
           setTimeout(() => {
               audioPlayer.play().catch(e => console.log('Auto-play prevented:', e));
           }, 500);
       }
   
       function closePodcastModal() {
           const modal = document.getElementById('podcastModal');
           const audioPlayer = document.getElementById('podcastAudio');
           
           if (modal) {
               modal.classList.remove('active');
               document.body.style.overflow = 'auto';
           }
           
           if (audioPlayer) {
               audioPlayer.pause();
           }
       }
   
       // Event Listeners
       function setupEventListeners() {
           // Sistema de pestañas
           setupTabs();
           
           // Paginación de noticias
           const prevNewsBtn = document.getElementById('prevNews');
           const nextNewsBtn = document.getElementById('nextNews');
           
           if (prevNewsBtn) {
               prevNewsBtn.addEventListener('click', () => {
                   if (state.news.currentPage > 1) {
                       state.news.currentPage--;
                       renderNews();
                       scrollToSection('newsSection');
                   }
               });
           }
           
           if (nextNewsBtn) {
               nextNewsBtn.addEventListener('click', () => {
                   const totalPages = Math.ceil(state.news.filtered.length / state.news.itemsPerPage);
                   if (state.news.currentPage < totalPages) {
                       state.news.currentPage++;
                       renderNews();
                       scrollToSection('newsSection');
                   }
               });
           }
           
           // Paginación de podcasts
           const prevPodcastBtn = document.getElementById('prevPodcast');
           const nextPodcastBtn = document.getElementById('nextPodcast');
           
           if (prevPodcastBtn) {
               prevPodcastBtn.addEventListener('click', () => {
                   if (state.podcasts.currentPage > 1) {
                       state.podcasts.currentPage--;
                       renderPodcasts();
                       scrollToSection('podcastsSection');
                   }
               });
           }
           
           if (nextPodcastBtn) {
               nextPodcastBtn.addEventListener('click', () => {
                   const totalPages = Math.ceil(state.podcasts.filtered.length / state.podcasts.itemsPerPage);
                   if (state.podcasts.currentPage < totalPages) {
                       state.podcasts.currentPage++;
                       renderPodcasts();
                       scrollToSection('podcastsSection');
                   }
               });
           }
           
           // Filtros de noticias
           const newsFilters = document.querySelectorAll('#newsFilters .filter-tag');
           if (newsFilters.length > 0) {
               newsFilters.forEach(tag => {
                   tag.addEventListener('click', function() {
                       newsFilters.forEach(t => t.classList.remove('active'));
                       this.classList.add('active');
                       state.news.filter = this.dataset.filter;
                       filterNews();
                   });
               });
           }
           
           // Filtros de podcasts
           const podcastFilters = document.querySelectorAll('#podcastFilters .filter-tag');
           if (podcastFilters.length > 0) {
               podcastFilters.forEach(tag => {
                   tag.addEventListener('click', function() {
                       podcastFilters.forEach(t => t.classList.remove('active'));
                       this.classList.add('active');
                       state.podcasts.filter = this.dataset.filter;
                       filterPodcasts();
                   });
               });
           }
           
           // Búsqueda de noticias
           const newsSearch = document.getElementById('newsSearch');
           let newsSearchTimeout;
           if (newsSearch) {
               newsSearch.addEventListener('input', function() {
                   clearTimeout(newsSearchTimeout);
                   newsSearchTimeout = setTimeout(() => {
                       state.news.search = this.value;
                       filterNews();
                   }, 300);
               });
           }
           
           // Búsqueda de podcasts
           const podcastSearch = document.getElementById('podcastSearch');
           let podcastSearchTimeout;
           if (podcastSearch) {
               podcastSearch.addEventListener('input', function() {
                   clearTimeout(podcastSearchTimeout);
                   podcastSearchTimeout = setTimeout(() => {
                       state.podcasts.search = this.value;
                       filterPodcasts();
                   }, 300);
               });
           }
       }
      async function loadCMSPage() {
  const page = document.body.dataset.cmsPage;
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
  // Cambiar textos
  document.querySelectorAll("[data-cms-text]").forEach(el => {
    const path = el.getAttribute("data-cms-text");
    const val = getByPath(data, path);
    if (val !== undefined && val !== null) el.textContent = val;
  });

  // Cambiar links
  document.querySelectorAll("[data-cms-href]").forEach(el => {
    const path = el.getAttribute("data-cms-href");
    const val = getByPath(data, path);
    if (val) el.setAttribute("href", val);
  });

  // Cambiar imágenes (por si luego lo usas)
  document.querySelectorAll("[data-cms-src]").forEach(el => {
    const path = el.getAttribute("data-cms-src");
    const val = getByPath(data, path);
    if (val) el.setAttribute("src", val);
  });
}

document.addEventListener("DOMContentLoaded", loadCMSPage);

  // aquí sigues con los campos que necesites…
}

document.addEventListener("DOMContentLoaded", loadPageJSON);

   
       // Función auxiliar para scroll
       function scrollToSection(sectionId) {
           const section = document.getElementById(sectionId);
           if (section) {
               section.scrollIntoView({ behavior: 'smooth', block: 'start' });
           }
       }
   
       // Inicializar
       init();
   });

   
   // ============================================
   // FIN DEL SISTEMA SIPSER CLOUD
   // ============================================
