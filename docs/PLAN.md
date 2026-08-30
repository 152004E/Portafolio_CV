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
- [❌] Configurar variables css de colores en el sistema global o Tailwind v4 theme.
- [❌] Definir esquema de datos (TypeScript) y poblar `src/data/cv-data.ts` con la información del currículum.
- [❌] Crear/Ajustar el layout principal (`src/layouts/Layout.astro`) agregando meta tags de SEO, favicon y `<head>` correcto.

# Sprint 2: Componentes Core & UI
**Objetivo**: Construir los bloques visuales del portafolio.
- [❌] **Navbar / Header**: Menú superior de navegación, idealmente sticky y con scroll spy.
- [❌] **Section: Hero**: Presentación principal (Nombre, foto, rol, CTA para descargar el CV).
- [❌] **Section: Experiencia**: Línea de tiempo (Timeline) renderizando el listado de experiencia laboral.
- [❌] **Section: Proyectos**: Tarjetas de proyectos (Grid) con hover states limpios gracias a Tailwind.
- [❌] **Section: Habilidades**: Sección con insignias/badges de las tecnologías dominadas (usando los íconos de FontAwesome).
- [❌] **Footer**: Enlaces a redes sociales y copyright.

# Sprint 3: Pulido UX y Deploy
**Objetivo**: Experiencia fluida y salida a producción.
- [❌] Implementar 'Smooth Scrolling' en CSS para los enlaces internos (`scroll-behavior: smooth`).
- [❌] Revisar responsividad en dispositivos móviles para todo el diseño (utilizar breakpoints `sm:`, `md:`, `lg:`).
- [❌] Configurar el script de `build` y preparar el despliegue automático en Vercel, Netlify, o GitHub Pages.
