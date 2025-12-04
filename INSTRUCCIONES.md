# 🚀 SIPSER Cloud - Guía de Implementación del CMS

## 📋 Resumen

Este paquete contiene todo lo necesario para que el equipo de Marketing pueda editar el contenido del sitio web de SIPSER Cloud sin tocar código.

---

## 🎯 Paso a Paso (Para Tontos)

### PASO 1: Preparar tu carpeta del sitio

```
📁 Tu carpeta actual:
├── index.html
├── soluciones.html
├── adn.html
├── exitos.html
├── contenido.html
├── contacto.html
├── styles.css
├── main.js
├── assets/
├── icons/
├── img/
└── badges/
```

**Copia estos archivos/carpetas de este paquete a tu carpeta:**

```
📁 Copiar esto:
├── admin/              ← COPIAR TODO
│   ├── index.html
│   └── config.yml
├── content/            ← COPIAR TODO
│   ├── inicio.json
│   ├── config.json
│   ├── noticias/
│   ├── podcasts/
│   ├── casos/
│   ├── eventos/
│   ├── playbooks/
│   └── soluciones/
├── js/
│   └── cms-loader.js   ← COPIAR
└── netlify.toml        ← COPIAR
```

---

### PASO 2: Agregar el script del CMS a tus HTMLs

Abre **cada archivo HTML** (index.html, soluciones.html, etc.) y agrega esta línea **ANTES** del cierre `</body>`:

```html
<!-- Justo antes de </body> -->
<script src="js/cms-loader.js" defer></script>
<script>
  // Netlify Identity Widget
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
</body>
```

También agrega esto en el `<head>`:

```html
<head>
  <!-- ... tus otros tags ... -->
  
  <!-- Netlify Identity (para el CMS) -->
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
```

---

### PASO 3: Subir a GitHub

1. **Crear cuenta en GitHub** (si no tienes): https://github.com/signup

2. **Crear un nuevo repositorio:**
   - Ve a https://github.com/new
   - Nombre: `sipser-website` (o el que quieras)
   - Privado o Público (tu elección)
   - Click "Create repository"

3. **Subir tus archivos:**
   
   **Opción A - Desde la web (más fácil):**
   - En tu nuevo repo, click "uploading an existing file"
   - Arrastra TODA tu carpeta del sitio
   - Click "Commit changes"

   **Opción B - Con Git (si sabes usarlo):**
   ```bash
   cd tu-carpeta-sipser
   git init
   git add .
   git commit -m "Sitio SIPSER con CMS"
   git remote add origin https://github.com/TU-USUARIO/sipser-website.git
   git push -u origin main
   ```

---

### PASO 4: Conectar con Netlify

1. **Crear cuenta en Netlify:** https://app.netlify.com/signup
   - Usa "Sign up with GitHub" (más fácil)

2. **Crear nuevo sitio:**
   - Click "Add new site" → "Import an existing project"
   - Selecciona "GitHub"
   - Autoriza Netlify para acceder a tu GitHub
   - Selecciona tu repositorio `sipser-website`
   - Click "Deploy site"

3. **Esperar el deploy:**
   - Netlify construirá tu sitio (toma ~1 minuto)
   - Te dará una URL como: `random-name-123.netlify.app`

---

### PASO 5: Activar el CMS (Identity + Git Gateway)

**Esto es lo más importante:**

1. En Netlify, ve a tu sitio → **"Site configuration"**

2. En el menú izquierdo, click **"Identity"**

3. Click **"Enable Identity"** ✅

4. Scroll abajo hasta **"Services"** → **"Git Gateway"**

5. Click **"Enable Git Gateway"** ✅

---

### PASO 6: Invitar usuarios de Marketing

1. En Netlify → Identity → **"Invite users"**

2. Escribe los emails del equipo de MKT:
   ```
   maria@sipser.com.mx
   juan@sipser.com.mx
   ```

3. Ellos recibirán un email para crear su contraseña

---

### PASO 7: ¡Listo! Acceder al CMS

El equipo de Marketing ahora puede entrar a:

```
https://TU-SITIO.netlify.app/admin/
```

Verán algo así:

```
┌─────────────────────────────────────────────────────┐
│  🏠 SIPSER Cloud CMS                    [María 👤]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📁 Colecciones                                     │
│  ├── 🏠 Páginas Principales                         │
│  ├── 📰 Noticias                                    │
│  ├── 🎙️ Podcasts                                    │
│  ├── 🏆 Casos de Éxito                              │
│  ├── 📅 Eventos y Webinars                          │
│  ├── 📚 Playbooks y Recursos                        │
│  ├── 💼 Soluciones                                  │
│  ├── ⚙️ Configuración                               │
│  ├── 🖼️ Logos de Clientes                           │
│  └── 🏅 Certificaciones                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Archivos

```
sipser-website/
├── admin/
│   ├── index.html      # Panel del CMS
│   └── config.yml      # Configuración de qué se puede editar
├── content/
│   ├── inicio.json     # Contenido de la página principal
│   ├── config.json     # Configuración general (WhatsApp, etc.)
│   ├── noticias/       # Carpeta con noticias (1 archivo por noticia)
│   ├── podcasts/       # Carpeta con podcasts
│   ├── casos/          # Carpeta con casos de éxito
│   ├── eventos/        # Carpeta con eventos
│   ├── playbooks/      # Carpeta con recursos
│   └── soluciones/     # Carpeta con soluciones
├── js/
│   └── cms-loader.js   # Script que carga el contenido
├── netlify.toml        # Configuración de Netlify
├── index.html          # Tu página principal
├── styles.css          # Tus estilos
├── main.js             # Tu JavaScript
└── ...                 # Resto de archivos
```

---

## ❓ Preguntas Frecuentes

### ¿Qué puede editar Marketing?

| Sección | Qué pueden cambiar |
|---------|-------------------|
| 🏠 Inicio | Textos del hero, estadísticas, títulos |
| 📰 Noticias | Crear, editar, eliminar noticias |
| 🎙️ Podcasts | Crear, editar, eliminar episodios |
| 🏆 Casos | Crear, editar casos de éxito |
| 📅 Eventos | Crear, editar webinars y eventos |
| 📚 Playbooks | Agregar recursos descargables |
| ⚙️ Config | Número de WhatsApp, textos del footer |
| 🖼️ Logos | Agregar/quitar logos de clientes |

### ¿Cómo suben imágenes?

1. En el CMS, click en el campo de imagen
2. Click "Choose an image" → "Upload"
3. Arrastrar la imagen
4. Se guarda automáticamente en `/img/uploads/`

### ¿Cuándo se publican los cambios?

- Al hacer click en "Publish", Netlify detecta el cambio
- Automáticamente reconstruye el sitio (~30 segundos)
- ¡Los cambios están en vivo!

### ¿Qué pasa si algo sale mal?

- Netlify guarda cada versión
- Ve a "Deploys" en Netlify
- Click en un deploy anterior → "Publish deploy"
- ¡Sitio restaurado!

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa que Identity esté habilitado
2. Revisa que Git Gateway esté habilitado
3. Revisa la consola del navegador (F12) por errores
4. Verifica que los archivos JSON tengan formato válido

---

## 🎉 ¡Eso es todo!

Tu equipo de Marketing ahora puede:
- ✅ Editar textos sin tocar código
- ✅ Subir imágenes arrastrando
- ✅ Crear noticias, eventos, podcasts
- ✅ Ver preview antes de publicar
- ✅ Publicar con un click

**URL del CMS:** `https://tu-sitio.netlify.app/admin/`
