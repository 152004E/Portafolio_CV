# Plan — What's Left to Implement (Astro)

## Legend
- ✅ Done
- 🔄 In Progress / Partial
- ❌ Not Started

---

# Sprint 1: Setup & Estructura Base
**Objetivo**: Bases sólidas de diseño y estructura de archivos.
- [✅] Proyecto Astro inicializado.
- [✅] Integración de Tailwind CSS v4 (@tailwindcss/vite).
- [✅] Instalación de `@fortawesome/fontawesome-free`.
- [✅] Configurar variables CSS de colores y paleta de diseño.
- [✅] Esquema de datos y textos centralizados con soporte i18n (`src/i18n/ui.ts`).
- [✅] Crear layout principal (`src/layouts/Layout.astro`) con meta tags, favicon y script de tema oscuro/claro.

# Sprint 2: Componentes Core & UI
**Objetivo**: Construir los bloques visuales del portafolio.
- [✅] **Navbar / Header**: Menú superior sticky con selector de idioma, toggle de modo oscuro con View Transitions y toggle de modo plano/cinemático.
- [✅] **Section: Hero**: Presentación principal con ProfileCard animado, CTA para ver proyectos, contactar y ver CV.
- [✅] **Section: Experiencia**: Trayectoria profesional y métricas destacadas.
- [✅] **Section: Proyectos**: Tarjetas de proyectos interactivas con tags tecnológicos y enlaces.
- [✅] **Section: Habilidades**: Insignias categorizadas de Frontend, Backend, Bases de datos, DevOps, APIs y Soft Skills.
- [✅] **Footer**: Redes sociales, créditos y copyright.

# Sprint 3: Pulido UX, i18n y Rendimiento
**Objetivo**: Experiencia fluida, internacionalización y salida a producción.
- [✅] Implementar 'Smooth Scrolling' mediante **Lenis** (`lenis`).
- [✅] Responsividad completa en dispositivos móviles, tablets y monitores ultra-wide.
- [✅] Internacionalización completa en español (`/`) e inglés (`/en`).
- [✅] Transición de página estilo "Curve Swipe" con GSAP.

# Sprint 4: Sistema de CV y Pipeline de Exportación
**Objetivo**: Páginas de CV y descargas profesionales multiformato.
- [✅] **Visor de CV embebido**: Rutas dedicadas `/cv` y `/en/cv` con iframe de alta fidelidad.
- [✅] **Modo Plano por Defecto**: Navegación estándar ágil sin secuestro de scroll al ingresar por primera vez.
- [✅] **Pipeline de Compilación**: Script `scripts/generate-cv-assets.js` (`pnpm run generate:cv`) con Chromium headless para PDF y librería `docx` para Word DOCS.
- [✅] **Menú de Descarga Dual**: Selector desplegable con descarga directa de PDF (versión completa PC a 2 columnas) y DOCS (Word editable).
- [✅] **Ajuste de Márgenes del CV**: Márgenes optimizadas al 50% con protección contra saltos de página huérfanos.
