# Futuras Implementaciones (FUTURE.md)

Características extra que aportarían gran valor al perfil, pero no son bloqueantes para lanzar el CV:

- **CMS Headless**: Migrar el archivo local de datos a un gestor de contenido en la nube (como Sanity, Strapi o Decap CMS) para editar el portafolio sin tocar el código fuente.
- **Dark Mode Dinámico**: Un botón (Toggle) que permita cambiar entre modo claro y oscuro. (Astro permite manejar esto fácilmente con un script in-line y clases `dark:` en Tailwind).
- **Generación de PDF automatizada**: En lugar de subir un PDF estático, crear un script o flujo con Puppeteer que genere el PDF del CV automáticamente a partir del HTML en cada build.
- **Micro-Animaciones**: Utilizar CSS Animations u otra librería liviana (como `framer-motion` integrado vía React si es requerido) para revelar elementos con el scroll.
