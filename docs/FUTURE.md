# Futuras Implementaciones (FUTURE.md)

Características extra y refactorizaciones que aportarán gran valor al perfil y mejorarán la experiencia del usuario, programadas para iteraciones futuras:

## Tareas Pendientes (UI / UX)
- **Mejorar Cortina de Transición CV**: Realizar los ajustes finales a la transición tipo "Curve Swipe" para que el timing y la cobertura de la pantalla sean impecables.
- **Nuevo Menú de Navegación en `/cv`**: Implementar transiciones adicionales y menú animado inspirado en el componente de CodePen **"Interruptible Single Timeline Enter/Exit"** de GSAP.
- **Centrado y Pacing en Modo Cinemático**: Refactorizar el motor de GSAP para que, durante la navegación en modo cine, cada sección quede perfectamente centrada en la pantalla y se añada una resistencia o "delay" al scroll (aumentar el *pin duration*). Esto obligará al flujo a detenerse sutilmente en cada sección para mejorar la lectura antes de saltar a la siguiente.

## Tareas Pendientes (Arquitectura)
- **CMS Headless**: Migrar el archivo local de datos a un gestor de contenido en la nube (como Sanity, Strapi o Decap CMS) para editar el portafolio sin tocar el código fuente.

## Tareas Completadas Recientemente
- **Generación Automatizada de CV (PDF y DOCS)**: Script Node.js (`scripts/generate-cv-assets.js` ejecutado con `pnpm run generate:cv`) que compila la versión completa de PC en PDF mediante Chromium headless y genera documentos editables `.docx` compatibles con Word y Google Docs para español e inglés.
- **Menú de Descarga de CV Responsivo**: Selector desplegable con soporte para descargar en formato PDF y DOCS, accesible y adaptado para móviles.
- **Modo Plano por Defecto**: Configurado como modo predeterminado para optimizar la velocidad y lectura de reclutadores, manteniendo el Modo Cinemático disponible a través del Navbar toggle.
- **Dark Mode Dinámico, Animaciones GSAP / Lenis y Rutas de Idioma (`/` y `/en`)**.
