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
        new TextRun({ text: isEs ? 'B1 Certificado' : 'B1 Certified', size: 16, color: cMuted, font: 'Arial' })
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
    }))
  ];

  const rightColChildren = [
    // PERFIL
    createMainHeader(isEs ? 'Perfil profesional' : 'Professional Profile'),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: isEs
            ? 'Tecnólogo en Análisis y Desarrollo de Software graduado del SENA, con más de 3 años de experiencia desarrollando proyectos de forma autónoma y práctica real en la Fábrica de Software del SENA. Inglés B1 certificado, con capacidad para leer documentación técnica y colaborar en entornos internacionales.'
            : 'Software Analysis and Development Technologist graduated from SENA, with over 3 years of experience building projects autonomously and practical experience in the SENA Software Factory. B1 Certified English, skilled at technical documentation and international collaboration.',
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
            ? 'Apasionado por el desarrollo Full Stack, interfaces modernas, sistemas escalables y automatización. Experiencia construyendo aplicaciones web completas con tecnologías frontend y backend, integrando bases de datos, APIs REST, autenticación JWT y arquitecturas modernas.'
            : 'Passionate about Full Stack development, modern UI interfaces, scalable systems, and workflow automation. Experienced in engineering end-to-end web applications with frontend and backend frameworks, integrating relational databases, REST APIs, JWT authentication, and modern architectures.',
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
          text: isEs ? 'Desarrollador Full Stack — Proyectos Autónomos' : 'Full Stack Developer — Independent Projects',
          bold: true,
          size: 19,
          color: cAccent,
          font: 'Arial'
        }),
        new TextRun({
          text: isEs ? '   (2022 – Actualidad)' : '   (2022 – Present)',
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
          text: isEs ? 'Experiencia independiente · +3 años' : 'Independent Experience · +3 years',
          bold: true,
          size: 16,
          color: cGreen,
          font: 'Arial'
        })
      ]
    }),
    ...(isEs
      ? [
          '• Desarrollo de aplicaciones web completas con React, TypeScript, TailwindCSS en frontend.',
          '• Construcción de APIs REST con Spring Boot, Node.js y autenticación JWT.',
          '• Integración con bases de datos PostgreSQL y MySQL; diseño de esquemas relacionales.',
          '• Automatización de flujos y consumo de APIs externas e integración de modelos de IA.',
          '• Control de versiones con Git/GitHub y despliegue con Docker y entornos Linux.'
        ]
      : [
          '• Full web application development with React, TypeScript, and TailwindCSS on frontend.',
          '• REST API engineering with Spring Boot, Node.js, and secure JWT authentication.',
          '• Integration with PostgreSQL and MySQL databases; relational schema modeling.',
          '• Workflow automation, external API consumption, and LLM/AI model integration.',
          '• Version control with Git/GitHub and deployment using Docker and Linux environments.'
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
          text: isEs ? 'Desarrollador — Fábrica de Software SENA' : 'Developer — SENA Software Factory',
          bold: true,
          size: 19,
          color: cAccent,
          font: 'Arial'
        }),
        new TextRun({
          text: '   (SENA)',
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
          text: isEs ? 'Servicio Nacional de Aprendizaje · Práctica institucional' : 'National Learning Service · Institutional Practice',
          bold: true,
          size: 16,
          color: cGreen,
          font: 'Arial'
        })
      ]
    }),
    ...(isEs
      ? [
          '• Participación en proyectos reales dentro del ecosistema de desarrollo de la Fábrica de Software.',
          '• Aplicación de metodologías de análisis de requerimientos y documentación técnica.',
          '• Trabajo colaborativo en equipo con estándares de desarrollo de software.'
        ]
      : [
          '• Participation in enterprise software projects within the SENA Software Factory ecosystem.',
          '• Application of requirement engineering methodologies and professional technical documentation.',
          '• Collaborative teamwork upholding rigorous software engineering standards.'
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
          text: isEs ? '   (Graduado)' : '   (Graduated)',
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
          '• Programación orientada a objetos y arquitectura de software.',
          '• Diseño y administración de bases de datos relacionales.',
          '• Construcción e integración de APIs REST.',
          '• Análisis de requerimientos y documentación técnica.'
        ]
      : [
          '• Modern and responsive web application engineering.',
          '• Object-oriented programming and scalable software architecture.',
          '• Relational database modeling and administration.',
          '• Design, construction, and integration of REST APIs.',
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
            desc: 'Sistema administrativo de control de acceso con autenticación biométrica, JWT, dashboards, reportes y gestión de empleados.'
          },
          {
            name: 'AlgoTrainer',
            desc: 'Plataforma interactiva de entrenamiento para speedcubers enfocada en reconocimiento y ejecución de algoritmos.'
          },
          {
            name: 'HuertaDirecta',
            desc: 'Plataforma web que conecta agricultores colombianos directamente con compradores de forma simple y accesible.'
          },
          {
            name: 'Ainglo',
            desc: 'Asistente inteligente para aprender inglés mediante IA con Telegram, reconocimiento de voz, TTS y diccionario inteligente.'
          }
        ]
      : [
          {
            name: 'ROOM 911 Management System',
            desc: 'Administrative access control system featuring biometric authentication, JWT, analytical dashboards, reporting, and staff administration.'
          },
          {
            name: 'AlgoTrainer',
            desc: 'Interactive algorithm training platform for speedcubers focusing on pattern recognition and execution timers.'
          },
          {
            name: 'HuertaDirecta',
            desc: 'Agrotech web platform connecting Colombian farmers directly to wholesale buyers transparently and accessibly.'
          },
          {
            name: 'Ainglo',
            desc: 'AI English learning assistant via Telegram with voice recognition, text-to-speech, and context dictionary.'
          }
        ]
    ).map(proj => new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: proj.name, bold: true, size: 17, color: cAccent, font: 'Arial' }),
        new TextRun({ text: ' — ', size: 17, color: '64748B' }),
        new TextRun({ text: proj.desc, size: 17, color: cMuted, font: 'Arial' })
      ]
    })),

    // REFERENCIAS
    createMainHeader(isEs ? 'Referencias' : 'References'),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: 'Jesús Sánchez', bold: true, size: 18, color: cAccent, font: 'Arial' }),
        new TextRun({ text: '  ·  310 341 8641', size: 17, color: cMuted, font: 'Arial' })
      ]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: 'Johan A. Leguizamo', bold: true, size: 18, color: cAccent, font: 'Arial' }),
        new TextRun({ text: '  ·  320 452 4778', size: 17, color: cMuted, font: 'Arial' })
      ]
    })
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
            margins: { top: 300, bottom: 300, left: 300, right: 300 },
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
            margins: { top: 300, bottom: 300, left: 400, right: 300 },
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
            margin: { top: 720, bottom: 720, left: 720, right: 720 }
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
