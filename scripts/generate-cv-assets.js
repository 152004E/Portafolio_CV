import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const pdfCvDir = path.join(rootDir, 'Pdf_Cv');

// 1. GENERACIÓN DE PDFS MEDIANTE CHROMIUM / BRAVE HEADLESS
function generatePdf(htmlFilename, pdfFilename) {
  const htmlPath = path.join(publicDir, htmlFilename);
  const outPathPublic = path.join(publicDir, pdfFilename);
  const outPathPdfCv = path.join(pdfCvDir, pdfFilename);

  console.log(`[PDF] Generando ${pdfFilename}...`);
  try {
    const cmd = `brave-browser --headless --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --print-to-pdf="${outPathPublic}" "file://${htmlPath}"`;
    execSync(cmd, { stdio: 'pipe' });
    fs.copyFileSync(outPathPublic, outPathPdfCv);
    console.log(`[PDF] ✓ ${pdfFilename} generado con éxito en public/ y Pdf_Cv/`);
  } catch (err) {
    console.error(`[PDF] Error generando ${pdfFilename}:`, err.message);
    throw err;
  }
}

// 2. GENERACIÓN DE DOCUMENTOS WORD (.DOCX)
function createCvDoc(lang = 'es') {
  const isEs = lang === 'es';

  const cAccent = '0F172A';
  const cGreen = '166534';
  const cMuted = '4B5563';
  const cLightBg = 'F8FAFC';
  const cRule = 'E2E8F0';

  const leftWidth = 3200; // ~34%
  const rightWidth = 6300; // ~66%

  const noBorder = {
    top: { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
  };

  const createSidebarHeader = (title) => new Paragraph({
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { color: cRule, space: 4, style: BorderStyle.SINGLE, size: 6 }
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 16, // 8pt
        color: '94A3B8',
        font: 'Arial'
      })
    ]
  });

  const createMainHeader = (title) => new Paragraph({
    spacing: { before: 260, after: 120 },
    border: {
      bottom: { color: cRule, space: 4, style: BorderStyle.SINGLE, size: 6 }
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 18, // 9pt
        color: '64748B',
        font: 'Arial'
      })
    ]
  });

  const leftColChildren = [
    // Header Avatar / Initials
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'ER',
          bold: true,
          size: 36,
          color: cAccent,
          font: 'Arial'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: 'Emerson Reyes',
          bold: true,
          size: 32, // 16pt
          color: cAccent,
          font: 'Arial'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: isEs ? 'FULL STACK DEVELOPER' : 'FULL STACK DEVELOPER',
          bold: true,
          size: 16, // 8pt
          color: cGreen,
          font: 'Arial'
        })
      ]
    }),

    // Contacto
    createSidebarHeader(isEs ? 'Contacto' : 'Contact'),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '✉ ', size: 16, color: '64748B' }),
        new TextRun({ text: 'reyesemerson@gmail.com', size: 16, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '☏ ', size: 16, color: '64748B' }),
        new TextRun({ text: '+57 322 246 3385', size: 16, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({ text: '📍 ', size: 16, color: '64748B' }),
        new TextRun({ text: 'Bogotá, Colombia', size: 16, color: cMuted, font: 'Arial' })
      ]
    }),

    // Idiomas
    createSidebarHeader(isEs ? 'Idiomas' : 'Languages'),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: isEs ? 'Español: ' : 'Spanish: ', bold: true, size: 16, color: cAccent, font: 'Arial' }),
        new TextRun({ text: isEs ? 'Nativo' : 'Native', size: 16, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: isEs ? 'Inglés: ' : 'English: ', bold: true, size: 16, color: cAccent, font: 'Arial' }),
        new TextRun({ text: isEs ? 'A2 Certificado' : 'A2 Certified', size: 16, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({ text: isEs ? 'LSC: ' : 'LSC: ', bold: true, size: 16, color: cAccent, font: 'Arial' }),
        new TextRun({ text: isEs ? 'Nivel 2 de 10' : 'Level 2 of 10', size: 16, color: cMuted, font: 'Arial' })
      ]
    }),

    // Frontend
    createSidebarHeader('Frontend'),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'React, TypeScript, JavaScript, HTML5, CSS3, TailwindCSS, Bootstrap',
          size: 16,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),

    // Backend
    createSidebarHeader('Backend'),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'Java, Spring Boot, Node.js, PHP',
          size: 16,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),

    // Bases de datos
    createSidebarHeader(isEs ? 'Bases de datos' : 'Databases'),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'PostgreSQL, MySQL, SQL',
          size: 16,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),

    // DevOps
    createSidebarHeader(isEs ? 'DevOps y herramientas' : 'DevOps & Tools'),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'Docker, Git/GitHub, Linux, Stitch, Google Apps Script, VS Code, IntelliJ IDEA',
          size: 16,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),

    // APIs
    createSidebarHeader(isEs ? 'APIs y automatización' : 'APIs & Automation'),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'REST APIs, JWT Auth, Integración IA, Ollama, Claude Code, Power Automate',
          size: 16,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),

    // Habilidades
    createSidebarHeader(isEs ? 'Habilidades' : 'Soft Skills'),
    ...(isEs
      ? [
          '• Aprendizaje continuo',
          '• Resolución de problemas',
          '• Trabajo en equipo',
          '• Liderazgo',
          '• Gestión del tiempo',
          '• Adaptabilidad',
          '• Pensamiento analítico'
        ]
      : [
          '• Continuous learning',
          '• Problem solving',
          '• Teamwork',
          '• Leadership',
          '• Time management',
          '• Adaptability',
          '• Analytical thinking'
        ]
    ).map(skill => new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: skill, size: 16, color: cMuted, font: 'Arial' })]
    })),

    // Referencias
    createSidebarHeader(isEs ? 'Referencias' : 'References'),
    new Paragraph({
      spacing: { after: 30 },
      children: [
        new TextRun({ text: 'Jesús Sánchez', bold: true, size: 16, color: cAccent, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '310 341 8641', size: 15, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 30 },
      children: [
        new TextRun({ text: 'Johan A. Leguizamo', bold: true, size: 16, color: cAccent, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '320 452 4778', size: 15, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 30 },
      children: [
        new TextRun({ text: 'Efrain Manotas', bold: true, size: 16, color: cAccent, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '300 782 7571', size: 15, color: cMuted, font: 'Arial' })
      ]
    })
  ];

  const rightColChildren = [
    // PERFIL
    createMainHeader(isEs ? 'Perfil profesional' : 'Professional Profile'),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: isEs
            ? 'Tecnólogo en Análisis y Desarrollo de Software del SENA (2023–2026), con 6 meses de práctica laboral profesional en la Fábrica de Software del SENA (Abril – Octubre 2026) y desarrollo continuo de proyectos full stack autónomos desde 2023. Inglés A2 certificado, con capacidad para leer y asimilar documentación técnica.'
            : 'Software Analysis and Development Technologist from SENA (2023–2026), with a 6-month professional internship at the SENA Software Factory (April – October 2026) and continuous independent full stack project engineering since 2023. A2 Certified English, skilled at technical documentation and continuous learning.',
          size: 18,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: isEs
            ? 'Apasionado por el desarrollo Full Stack, interfaces modernas, sistemas escalables y automatización. Experiencia construyendo aplicaciones completas con React, React Native, NestJS, Spring Boot, PostgreSQL, Docker y APIs REST con JWT. Orientado al aprendizaje continuo, buenas prácticas de ingeniería y construcción de software de alto impacto.'
            : 'Passionate about Full Stack development, modern UI interfaces, scalable systems, and workflow automation. Experienced in engineering end-to-end applications with React, React Native, NestJS, Spring Boot, PostgreSQL, Docker, and secure REST APIs with JWT.',
          size: 18,
          color: cMuted,
          font: 'Arial'
        })
      ]
    }),

    // EXPERIENCIA
    createMainHeader(isEs ? 'Experiencia' : 'Experience'),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: isEs ? 'Desarrollador Full Stack — Fábrica de Software SENA' : 'Full Stack Developer — SENA Software Factory',
          bold: true,
          size: 19,
          color: cAccent,
          font: 'Arial'
        }),
        new TextRun({
          text: isEs ? '   (Abril 2026 – Octubre 2026)' : '   (April 2026 – October 2026)',
          bold: false,
          size: 16,
          color: '64748B',
          font: 'Arial'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: isEs ? 'Servicio Nacional de Aprendizaje · Práctica laboral (6 meses)' : 'National Learning Service · Professional Internship (6 months)',
          bold: true,
          size: 16,
          color: cGreen,
          font: 'Arial'
        })
      ]
    }),
    ...(isEs
      ? [
          '• Desarrollo de aplicaciones full stack con React, Spring Boot y PostgreSQL en proyectos reales del ecosistema SENA.',
          '• Implementación de APIs REST seguras con autenticación JWT y control de acceso por roles.',
          '• Trabajo colaborativo en equipo bajo metodología ágil Scrum y control de versiones con Git/GitHub.',
          '• Análisis de requerimientos y modelado de arquitecturas de software.'
        ]
      : [
          '• Full stack development with React, Spring Boot, and PostgreSQL in real SENA ecosystem projects.',
          '• Implementation of robust REST APIs with JWT authentication and role-based access control.',
          '• Collaborative teamwork using agile Scrum methodologies and Git/GitHub version control.',
          '• Requirement engineering and software architecture modeling.'
        ]
    ).map(point => new Paragraph({
      spacing: { after: 40 },
      indent: { left: 240 },
      children: [new TextRun({ text: point, size: 17, color: cMuted, font: 'Arial' })]
    })),

    new Paragraph({ spacing: { before: 120, after: 40 } }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: isEs ? 'Desarrollador Independiente — Proyectos Autónomos & Open Source' : 'Independent Developer — Autonomous Projects & Open Source',
          bold: true,
          size: 19,
          color: cAccent,
          font: 'Arial'
        }),
        new TextRun({
          text: isEs ? '   (2023 – Actualidad)' : '   (2023 – Present)',
          bold: false,
          size: 16,
          color: '64748B',
          font: 'Arial'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: isEs ? 'Proyectos personales y de estudio autónomo' : 'Personal side projects and self-driven engineering',
          bold: true,
          size: 16,
          color: cGreen,
          font: 'Arial'
        })
      ]
    }),
    ...(isEs
      ? [
          '• Desarrollo de aplicaciones completas con React, React Native, TypeScript y TailwindCSS en frontend.',
          '• Construcción de APIs REST y microservicios con NestJS, Spring Boot, Node.js y autenticación JWT.',
          '• Integración con bases de datos PostgreSQL y MySQL; diseño de esquemas con Prisma ORM.',
          '• Automatización de flujos y consumo de APIs externas e integración de modelos de IA.',
          '• Control de versiones con Git/GitHub y despliegue containerizado con Docker en Linux.'
        ]
      : [
          '• Full web and mobile application engineering with React, React Native, TypeScript, and TailwindCSS.',
          '• REST API engineering with NestJS, Spring Boot, Node.js, and secure JWT authentication.',
          '• Database modeling and schema design with PostgreSQL, MySQL, and Prisma ORM.',
          '• Workflow automation, external API consumption, and LLM/AI model integration.',
          '• Version control with Git/GitHub and containerized deployments using Docker on Linux.'
        ]
    ).map(point => new Paragraph({
      spacing: { after: 40 },
      indent: { left: 240 },
      children: [new TextRun({ text: point, size: 17, color: cMuted, font: 'Arial' })]
    })),

    // FORMACION
    createMainHeader(isEs ? 'Formación académica' : 'Education'),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: isEs ? 'Tecnólogo en Análisis y Desarrollo de Software' : 'Technologist in Software Analysis and Development',
          bold: true,
          size: 19,
          color: cAccent,
          font: 'Arial'
        }),
        new TextRun({
          text: '   (2023 – 2026)',
          bold: false,
          size: 16,
          color: '64748B',
          font: 'Arial'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: 'Servicio Nacional de Aprendizaje — SENA',
          bold: true,
          size: 16,
          color: cGreen,
          font: 'Arial'
        })
      ]
    }),
    ...(isEs
      ? [
          '• Desarrollo de aplicaciones web modernas y responsivas.',
          '• Programación orientada a objetos (Java) y arquitectura de software.',
          '• Diseño y administración de bases de datos relacionales.',
          '• Construcción e integración de APIs REST con seguridad JWT.',
          '• Análisis de requerimientos y documentación técnica.'
        ]
      : [
          '• Modern and responsive web application engineering.',
          '• Object-oriented programming (Java) and scalable software architecture.',
          '• Relational database modeling and administration.',
          '• Design, construction, and integration of REST APIs with JWT security.',
          '• Requirements analysis and technical project documentation.'
        ]
    ).map(point => new Paragraph({
      spacing: { after: 40 },
      indent: { left: 240 },
      children: [new TextRun({ text: point, size: 17, color: cMuted, font: 'Arial' })]
    })),

    // PROYECTOS
    createMainHeader(isEs ? 'Proyectos destacados' : 'Featured Projects'),
    ...(isEs
      ? [
          {
            name: 'ROOM 911 Management System',
            desc: 'Sistema de control de acceso con autenticación biométrica y JWT. Stack: Spring Boot, React, PostgreSQL y Docker.'
          },
          {
            name: 'DuoBalance',
            desc: 'Plataforma móvil y web de división inteligente de gastos con algoritmos de saldo. Stack: NestJS, React Native y Prisma.'
          },
          {
            name: 'HuertaDirecta',
            desc: 'Plataforma agrotech para venta directa sin intermediarios con inventario en tiempo real. Stack: React, Node.js y PostgreSQL.'
          },
          {
            name: 'AlgoTrainer',
            desc: 'Entrenamiento interactivo para speedcubers con reconocimiento de algoritmos 3D. Stack: React, TypeScript y TailwindCSS.'
          },
          {
            name: 'Ainglo',
            desc: 'Asistente de IA para aprendizaje de inglés por Telegram con TTS y análisis de voz. Stack: Python, Gemini API y SQLite.'
          }
        ]
      : [
          {
            name: 'ROOM 911 Management System',
            desc: 'Biometric access control system with JWT. Stack: Spring Boot, React, PostgreSQL, and Docker.'
          },
          {
            name: 'DuoBalance',
            desc: 'Shared expense management platform with net settlement algorithms. Stack: NestJS, React Native, and Prisma.'
          },
          {
            name: 'HuertaDirecta',
            desc: 'Direct farm-to-consumer agrotech marketplace with real-time inventory. Stack: React, Node.js, and PostgreSQL.'
          },
          {
            name: 'AlgoTrainer',
            desc: 'Speedcuber algorithm training platform with 3D visualization. Stack: React, TypeScript, and TailwindCSS.'
          },
          {
            name: 'Ainglo',
            desc: 'AI English learning assistant on Telegram with TTS and pronunciation analysis. Stack: Python, Gemini API, and SQLite.'
          }
        ]
    ).map(proj => new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: proj.name, bold: true, size: 17, color: cAccent, font: 'Arial' }),
        new TextRun({ text: ' — ', size: 16, color: '64748B' }),
        new TextRun({ text: proj.desc, size: 16, color: cMuted, font: 'Arial' })
      ]
    }))
  ];

  const table = new Table({
    width: { size: 9500, type: WidthType.DXA },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: leftWidth, type: WidthType.DXA },
            shading: { fill: cLightBg, type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { color: cRule, style: BorderStyle.SINGLE, size: 6 }
            },
            children: leftColChildren
          }),
          new TableCell({
            width: { size: rightWidth, type: WidthType.DXA },
            margins: { top: 200, bottom: 200, left: 250, right: 200 },
            borders: noBorder,
            children: rightColChildren
          })
        ]
      })
    ]
  });

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 360, bottom: 360, left: 360, right: 360 }
          }
        },
        children: [table]
      }
    ]
  });
}

async function generateDocx(lang, docxFilename) {
  const outPathPublic = path.join(publicDir, docxFilename);
  const outPathPdfCv = path.join(pdfCvDir, docxFilename);

  console.log(`[DOCS] Generando ${docxFilename}...`);
  try {
    const doc = createCvDoc(lang);
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outPathPublic, buffer);
    fs.copyFileSync(outPathPublic, outPathPdfCv);
    console.log(`[DOCS] ✓ ${docxFilename} generado con éxito en public/ y Pdf_Cv/`);
  } catch (err) {
    console.error(`[DOCS] Error generando ${docxFilename}:`, err.message);
    throw err;
  }
}

async function main() {
  console.log('=== Compilando Assets de CV (PDF y DOCS) ===');
  
  // 1. Generar PDFs para español e inglés
  generatePdf('cv_emerson_reyes.html', 'cv_emerson_reyes.pdf');
  generatePdf('cv_emerson_reyes_en.html', 'cv_emerson_reyes_en.pdf');

  // 2. Generar DOCS para español e inglés
  await generateDocx('es', 'cv_emerson_reyes.docx');
  await generateDocx('en', 'cv_emerson_reyes_en.docx');

  console.log('=== Proceso finalizado con éxito ===');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
