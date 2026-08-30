# Data Structures — Client-Side Types

Toda la información del CV debe estar fuertemente tipada. Se sugiere alojar la data en `src/data/cv-data.ts` y sus tipos en `src/types/index.ts` o directamente junto a la data.

## Enums
```typescript
export enum SkillCategory {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DATABASE = 'DATABASE',
  TOOLS = 'TOOLS',
  SOFT_SKILLS = 'SOFT_SKILLS'
}
```

## Entities Principales
```typescript
export interface IExperience {
  role: string;
  company: string;
  startDate: string; // "Marzo 2023" o "2023-03"
  endDate: string | null; // null significa "Actualidad"
  description: string[]; // Viñetas con responsabilidades/logros
}

export interface IProject {
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ISkill {
  name: string;
  category: SkillCategory;
  iconClass?: string; // ej: "fa-brands fa-react"
}

export interface ICvData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone?: string;
    summary: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  experience: IExperience[];
  projects: IProject[];
  skills: ISkill[];
}
```

## Consumo de Datos
En un archivo `.astro`, los datos se inyectan en el momento de compilación:

```astro
---
import { cvData } from '../data/cv-data';
import ProjectCard from '../components/ProjectCard.astro';
---

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {cvData.projects.map(project => (
    <ProjectCard project={project} />
  ))}
</div>
```
