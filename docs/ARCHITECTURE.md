# Architecture & Project Structure

## Tech Stack
- **Framework**: Astro (Static Site Generator)
- **Language**: TypeScript / JavaScript
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Icons**: FontAwesome Free
- **Package Manager**: pnpm (Node >=22.12.0)

## Current State
Portafolio web ultrarrápido y optimizado para SEO, utilizando la arquitectura en islas de Astro, aunque por naturaleza operará principalmente como contenido estático puro HTML/CSS (SSG).

```
Portafolio_CV/
├── docs/                        Documentación del proyecto
├── public/                      Static assets (favicon, fotos, pdf del CV)
├── src/
│   ├── components/              Componentes UI de Astro (Card.astro, Button.astro)
│   ├── layouts/                 Estructura global de páginas (Layout.astro)
│   ├── pages/                   Rutas de la app (index.astro)
│   ├── styles/                  Global CSS (e.g. archivo CSS principal para Tailwind v4)
│   └── data/                    Datos estáticos del portafolio (cv-data.ts)
├── astro.config.mjs             Configuración de Astro e integración de Tailwind v4
├── package.json                 Dependencias y scripts
└── tsconfig.json                Configuración estricta de TypeScript
```

## Screen Flow
Al ser un CV o Portafolio, suele tener una estructura "One-Pager" (Single Page Layout) con anclas, o páginas dedicadas muy concisas:
- `/` (Home): Contiene la vista principal.
  - Section Hero (Presentación)
  - Section Experiencia
  - Section Proyectos
  - Section Habilidades / Tecnologías

## Design Patterns
- **Astro Components**: El script/lógica va en el bloque de código frontal (`---`), y el marcado UI va debajo de forma similar a HTML puro.
- **Tailwind v4**: Utilización directa de las clases utilitarias integradas mediante el nuevo plugin de Vite.
- **Separación Datos/UI**: Los datos puros de la experiencia y los proyectos deben residir en archivos estructurados (`src/data/`) separados de los componentes UI para facilitar su futura actualización sin tocar código.
