# AI Rules — Code Style & Patterns

## General Principles
- **TypeScript / Astro strict mode** always. Prefer interfaces over types for objects.
- **No `any`** unless absolutely unavoidable. Use `unknown` + type guards.
- **Component-driven**: Un archivo = un componente. Mantener componentes pequeños y reutilizables.

## Frontend (Astro + Tailwind v4)
- **File-based routing**: Las páginas van en `src/pages/`.
- **Components**: Los componentes van en `src/components/`. Usar componentes de Astro (`.astro`) por defecto para máxima velocidad, ya que es un sitio estático. Solo usar frameworks UI si hay interactividad pesada (islas).
- **Styling**: Usar **Tailwind CSS v4** a través de Vite (`@tailwindcss/vite`). Todas las clases se aplican directamente con `class=""`.
- **Icons**: Integración con `@fortawesome/fontawesome-free` para iconografía.

## Naming
- **Files**: `kebab-case.astro` o `kebab-case.ts`.
- **Components**: `PascalCase` (e.g., `ProjectCard.astro`, `ExperienceTimeline.astro`).
- **Functions/methods**: `camelCase`.
- **Constants**: `UPPER_SNAKE_CASE`.

## Git & Version Control (CRITICAL)
- **NO GIT COMMANDS PERMITTED**: Está **TOTALMENTE PROHIBIDO** ejecutar comandos como `git push`, `git commit`, `git add` o cualquier comando que modifique el historial de git o suba código al repositorio. ¡NUNCA, bajo ninguna circunstancia, el agente debe hacer push o commit!
- **Conventional commits**: El usuario será el único encargado de hacer commits manuales usando `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. 

## Error Handling
- Durante build (SSG), asegurar que no falten datos obligatorios en el frontmatter para evitar quiebres de página.
