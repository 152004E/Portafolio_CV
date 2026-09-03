# Architecture & Project Structure

## Tech Stack
- **Framework**: Astro 7.x (Static Site Generator - SSG)
- **Language**: TypeScript / JavaScript
- **Styling**: Tailwind CSS v4 (vía `@tailwindcss/vite`)
- **Smooth Scrolling**: Lenis (`lenis`)
- **Animations**: GSAP (`gsap` + ScrollTrigger)
- **Document Generation**: `docx` (Generación de archivos Microsoft Word `.docx`)
- **PDF Compilation**: Chromium / Brave headless print engine
- **Icons**: FontAwesome Free (`@fortawesome/fontawesome-free`)
- **Package Manager**: `pnpm` (Uso exclusivo, Node >=22.12.0)

## Current State
Portafolio web profesional ultrarrápido y optimizado para SEO, desarrollado con arquitectura estática pura en Astro (SSG). Incluye internacionalización (`es` / `en`), dos modos de navegación intercambiables y un pipeline automatizado para compilar el CV en múltiples formatos descargables.

```
Portafolio_CV/
├── docs/                        Documentación del proyecto y guías técnicas
├── Pdf_Cv/                      Directorio de respaldo de archivos del CV (HTML, PDF, DOCX)
├── public/                      Static assets servidos en raíz:
│   ├── images/                  Imágenes optimizadas, portadas y logotipos
│   ├── cv_emerson_reyes.html    Plantilla web del CV (Español)
│   ├── cv_emerson_reyes.pdf     CV compilado versión completa PC (Español)
│   ├── cv_emerson_reyes.docx    CV en formato editable Word/Docs (Español)
│   ├── cv_emerson_reyes_en.html Plantilla web del CV (Inglés)
│   ├── cv_emerson_reyes_en.pdf  CV compilado versión completa PC (Inglés)
│   └── cv_emerson_reyes_en.docx CV en formato editable Word/Docs (Inglés)
├── scripts/
│   └── generate-cv-assets.js    Script de compilación de PDFs y DOCX
├── src/
│   ├── components/              Componentes UI (Navbar, Hero, Projects, Services, etc.)
│   ├── i18n/                    Diccionarios y utilidades de traducción (`ui.ts`)
│   ├── layouts/                 Layout global con inicialización de temas y modos (`Layout.astro`)
│   ├── pages/
│   │   ├── index.astro          Página de inicio (Español)
│   │   ├── cv.astro             Visor y descargador de CV (Español)
│   │   └── en/
│   │       ├── index.astro      Página de inicio (Inglés)
│   │       └── cv.astro         Visor y descargador de CV (Inglés)
│   └── styles/                  CSS global y estilos base
├── astro.config.mjs             Configuración de Astro y plugin de Vite
├── package.json                 Scripts y dependencias gestionadas con pnpm
└── tsconfig.json                Configuración estricta de TypeScript
```

## Modos de Navegación del Portafolio
1. **Modo Plano (Por Defecto)**:
   - Navegación vertical estándar con scroll suave impulsado por Lenis.
   - Ideal para lectura rápida, reclutadores y acceso directo a secciones.
2. **Modo Cinemático (Opcional)**:
   - Activado voluntariamente mediante el botón toggle en la barra de navegación.
   - Utiliza GSAP + ScrollTrigger para crear transiciones dinámicas (desplazamientos horizontales tipo "serpiente").
   - La preferencia se guarda de manera persistente en `localStorage["cinematic-mode"]`.

## Sistema de Visualización y Descarga del CV (`/cv` y `/en/cv`)
- **Visor embebido**: Iframe de alto rendimiento con el diseño web del currículum.
- **Menú de Descarga Dual**:
  - **PDF (.pdf)**: Versión completa de escritorio/PC a 2 columnas con márgenes optimizados (5mm/6mm) y protección contra cortes huérfanos de página.
  - **DOCS (.docx)**: Documento nativo de Microsoft Word editable, compatible con Google Docs y LibreOffice.
- **Pipeline de Compilación**:
  - Ejecutable mediante: `pnpm run generate:cv`.
  - Regenera y sincroniza automáticamente los 4 entregables en `public/` y `Pdf_Cv/`.

## Scripts del Proyecto
- `pnpm dev`: Inicia el servidor de desarrollo de Astro.
- `pnpm build`: Compila el sitio estático para producción en el directorio `dist/`.
- `pnpm preview`: Previsualiza localmente el build de producción.
- `pnpm run generate:cv`: Compila los assets del CV (PDFs mediante Chromium headless y DOCX mediante la librería `docx`).
