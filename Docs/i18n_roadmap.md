# Hoja de Ruta de Internacionalización (i18n)

Este documento detalla los pasos necesarios para traducir el Portafolio completamente usando el sistema nativo de diccionarios de Astro.

## Fase 1: Arquitectura Base y Navegación (✔️ En progreso)
- [ ] Crear el diccionario central `src/i18n/ui.ts` con los idiomas español, inglés y mandarín.
- [ ] Crear funciones de utilidad en `src/i18n/utils.ts`.
- [ ] Refactorizar `src/components/Navbar.astro` para leer la URL y traducir los enlaces.
- [ ] Crear `src/pages/en/index.astro` y `src/pages/zh/index.astro`.

## Fase 2: Hero y Perfil 
- [ ] Añadir textos de `src/components/Hero.astro` al diccionario y refactorizar.
- [ ] Añadir textos de `src/components/ProfileCard.astro`.
- [ ] Añadir textos de `src/components/SocialLinks.astro` y botones asociados.

## Fase 3: Acerca de y Experiencia
- [ ] Añadir textos de `src/components/About.astro`.
- [ ] Añadir textos de `src/components/Experience.astro`.

## Fase 4: Proyectos, Servicios y Componentes Secundarios
- [ ] Añadir textos de `src/components/Projects.astro`.
- [ ] Añadir textos de `src/components/Services.astro`.
- [ ] Refactorizar componentes extra como `TechCard.astro`, `StatsGrid.astro`, `Testimonials.astro`, y `SectionTitle.astro`.

## Fase 5: Contacto y Pie de Página
- [ ] Añadir textos de `src/components/ContactForm.astro`.
- [ ] Añadir textos de `src/components/WhatsAppButton.astro`.
- [ ] Añadir textos de `src/components/Footer.astro`.

> **Nota:** La ventaja de este diseño es que todo el texto de todas estas fases terminará en el archivo `src/i18n/ui.ts`, permitiendo a traductores o herramientas editar fácilmente sin tocar el código de diseño.
