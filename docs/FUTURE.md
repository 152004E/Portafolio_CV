# Futuras Implementaciones (FUTURE.md)

Características extra y refactorizaciones que aportarán gran valor al perfil y mejorarán la experiencia del usuario, programadas para iteraciones futuras:

## Tareas Pendientes (UI / UX)
- **Mejorar Cortina de Transición CV**: Realizar los ajustes finales a la transición tipo "Curve Swipe" para que el timing y la cobertura de la pantalla sean impecables.
- **Nuevo Menú de Navegación en `/cv`**: Eliminar el header estático actual de la página del visor de CV e implementar un menú animado inspirado en el componente de CodePen **"Interruptible Single Timeline Enter/Exit"** de GSAP.
- **Centrado y Pacing en Modo Cinemático**: Refactorizar el motor de GSAP para que, durante la navegación en modo cine, cada sección quede perfectamente centrada en la pantalla y se añada una resistencia o "delay" al scroll (aumentar el *pin duration*). Esto obligará al flujo a detenerse sutilmente en cada sección para mejorar la lectura antes de saltar a la siguiente.

## Tareas Pendientes (Arquitectura)
- **CMS Headless**: Migrar el archivo local de datos a un gestor de contenido en la nube (como Sanity, Strapi o Decap CMS) para editar el portafolio sin tocar el código fuente.
- **Generación de PDF automatizada**: En lugar de mantener un archivo HTML estático para descargar (`cv_emerson_reyes.html`), crear un script o flujo con Puppeteer que genere el PDF del CV automáticamente a partir de los datos en cada build.

*(Nota: Tareas como Dark Mode Dinámico, Modo Plano/Cinemático, Timeline Horizontal, Animaciones de Scroll y Rutas de Idioma ya fueron completadas exitosamente).*
