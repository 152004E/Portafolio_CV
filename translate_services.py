import re

with open('src/components/Services.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace(
    "import TechCard from './TechCard.astro';",
    "import TechCard from './TechCard.astro';\nimport { getLangFromUrl, useTranslations } from '../i18n/utils';\n\nconst lang = getLangFromUrl(Astro.url);\nconst t = useTranslations(lang);"
)

categories_replacement = """const categories = [
  {
    title: lang === 'es' ? "Frontend" : lang === 'en' ? "Frontend" : "前端",
    icon: "fa-solid fa-display",
    technologies: [
      { name: "React", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-react", description: lang === 'es' ? "Componentes funcionales, hooks, estado global, React Router." : lang === 'en' ? "Functional components, hooks, global state, React Router." : "函数组件、hooks、全局状态、React Router。" },
      { name: "TypeScript", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-js", description: lang === 'es' ? "Tipado estático, interfaces, genéricos, tipos avanzados." : lang === 'en' ? "Static typing, interfaces, generics, advanced types." : "静态类型、接口、泛型、高级类型。" },
      { name: "JavaScript", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-js", description: lang === 'es' ? "ES6+, asincronía, manipulación del DOM, fetch API." : lang === 'en' ? "ES6+, async, DOM manipulation, fetch API." : "ES6+、异步、DOM 操作、fetch API。" },
      { name: "TailwindCSS", level: lang === 'es' ? "Avanzado" : lang === 'en' ? "Advanced" : "高级", icon: "fa-brands fa-css3-alt", description: lang === 'es' ? "Diseño utility-first, responsive, custom config, animaciones." : lang === 'en' ? "Utility-first design, responsive, custom config, animations." : "实用优先设计、响应式、自定义配置、动画。" },
      { name: "Bootstrap", level: lang === 'es' ? "Avanzado" : lang === 'en' ? "Advanced" : "高级", icon: "fa-brands fa-bootstrap", description: lang === 'es' ? "Grid system, componentes, personalización de temas." : lang === 'en' ? "Grid system, components, theme customization." : "网格系统、组件、主题定制。" },
      { name: "HTML & CSS", level: lang === 'es' ? "Avanzado" : lang === 'en' ? "Advanced" : "高级", icon: "fa-brands fa-html5", description: lang === 'es' ? "Semántica web, flexbox, grid, animaciones CSS, SASS." : lang === 'en' ? "Web semantics, flexbox, grid, CSS animations, SASS." : "Web 语义化、flexbox、grid、CSS 动画、SASS。" },
    ],
  },
  {
    title: lang === 'es' ? "Backend" : lang === 'en' ? "Backend" : "后端",
    icon: "fa-solid fa-server",
    technologies: [
      { name: "Java", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-java", description: lang === 'es' ? "POO, colecciones, streams, manejo de excepciones, JDBC." : lang === 'en' ? "OOP, collections, streams, exception handling, JDBC." : "面向对象、集合、流、异常处理、JDBC。" },
      { name: "Spring Boot", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-solid fa-leaf", description: lang === 'es' ? "REST APIs, JPA, seguridad, inyección de dependencias." : lang === 'en' ? "REST APIs, JPA, security, dependency injection." : "REST APIs、JPA、安全、依赖注入。" },
      { name: "Node.js", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-node-js", description: lang === 'es' ? "Express, APIs REST, manejo de paquetes, npm." : lang === 'en' ? "Express, REST APIs, package management, npm." : "Express、REST APIs、包管理、npm。" },
      { name: "PHP", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-brands fa-php", description: lang === 'es' ? "Lógica del lado del servidor, conexión a bases de datos." : lang === 'en' ? "Server-side logic, database connection." : "服务器端逻辑、数据库连接。" },
    ],
  },
  {
    title: lang === 'es' ? "Bases de Datos" : lang === 'en' ? "Databases" : "数据库",
    icon: "fa-solid fa-database",
    technologies: [
      { name: "PostgreSQL", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-solid fa-database", description: lang === 'es' ? "Consultas SQL, joins, índices, normalización de datos." : lang === 'en' ? "SQL queries, joins, indexes, data normalization." : "SQL 查询、连接、索引、数据规范化。" },
      { name: "MySQL", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-solid fa-database", description: lang === 'es' ? "Diseño relacional, procedimientos almacenados, optimización." : lang === 'en' ? "Relational design, stored procedures, optimization." : "关系设计、存储过程、优化。" },
    ],
  },
  {
    title: lang === 'es' ? "Herramientas" : lang === 'en' ? "Tools" : "工具",
    icon: "fa-solid fa-tools",
    technologies: [
      { name: "Git & GitHub", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-git-alt", description: lang === 'es' ? "Control de versiones, ramas, pull requests, flujo colaborativo." : lang === 'en' ? "Version control, branches, pull requests, collaborative workflow." : "版本控制、分支、pull requests、协作工作流。" },
      { name: "Docker", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-brands fa-docker", description: lang === 'es' ? "Contenedores, imágenes, docker-compose, entornos aislados." : lang === 'en' ? "Containers, images, docker-compose, isolated environments." : "容器、镜像、docker-compose、隔离环境。" },
      { name: "Linux", level: lang === 'es' ? "Intermedio" : lang === 'en' ? "Intermediate" : "中级", icon: "fa-brands fa-linux", description: lang === 'es' ? "Terminal, comandos, permisos, scripts bash, servidores." : lang === 'en' ? "Terminal, commands, permissions, bash scripts, servers." : "终端、命令、权限、bash 脚本、服务器。" },
      { name: "Claude Code", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-solid fa-robot", description: lang === 'es' ? "Asistente de codificación con IA para desarrollo asistido." : lang === 'en' ? "AI coding assistant for assisted development." : "用于辅助开发的 AI 编码助手。" },
      { name: "OpenCode", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-solid fa-terminal", description: lang === 'es' ? "CLI interactivo para ingeniería de software con IA." : lang === 'en' ? "Interactive CLI for software engineering with AI." : "用于 AI 软件工程的交互式 CLI。" },
      { name: "Ollama", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-solid fa-brain", description: lang === 'es' ? "Ejecución local de modelos de lenguaje para desarrollo." : lang === 'en' ? "Local execution of language models for development." : "用于开发的本地语言模型执行。" },
      { name: "Stitch", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-solid fa-code-branch", description: lang === 'es' ? "Plataforma de diseño integrando IA." : lang === 'en' ? "Design platform integrating AI." : "集成 AI 的设计平台。" },
      { name: "Power Automate", level: lang === 'es' ? "Básico" : lang === 'en' ? "Basic" : "初级", icon: "fa-solid fa-bolt", description: lang === 'es' ? "Automatización de procesos empresariales con Microsoft." : lang === 'en' ? "Business process automation with Microsoft." : "使用 Microsoft 实现业务流程自动化。" },
    ],
  },
];"""

content = re.sub(r'const categories = \[\s*\{[\s\S]*?\];\n', categories_replacement + '\n', content)

content = content.replace(
    'if (level === "Avanzado") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";',
    'if (level === "Avanzado" || level === "Advanced" || level === "高级") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";'
)
content = content.replace(
    'if (level === "Intermedio") return "bg-blue-500/15 text-blue-400 border-blue-500/25";',
    'if (level === "Intermedio" || level === "Intermediate" || level === "中级") return "bg-blue-500/15 text-blue-400 border-blue-500/25";'
)

# Header
content = content.replace(
    """<span class="inline-block bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
        Skills
      </span>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
        Stack <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">Principal</span>
      </h2>
      <p class="text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
        Tecnologías con las que trabajo día a día para construir soluciones completas y escalables.
      </p>""",
    """<span class="inline-block bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
        {lang === 'es' ? "Skills" : lang === 'en' ? "Skills" : "技能"}
      </span>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
        {lang === 'es' ? "Stack" : lang === 'en' ? "Main" : "核心"} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">{lang === 'es' ? "Principal" : lang === 'en' ? "Stack" : "技术栈"}</span>
      </h2>
      <p class="text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
        {lang === 'es' ? "Tecnologías con las que trabajo día a día para construir soluciones completas y escalables." : lang === 'en' ? "Technologies I work with daily to build complete and scalable solutions." : "我日常使用的技术，用于构建完整且可扩展的解决方案。"}
      </p>"""
)

# Replace titles using categories[idx].title
content = content.replace(
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">Backend</h3>',
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">{categories[1].title}</h3>'
)
content = content.replace(
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">Herramientas</h3>',
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">{categories[3].title}</h3>'
)
content = content.replace(
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">Frontend</h3>',
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">{categories[0].title}</h3>'
)
content = content.replace(
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">Bases de Datos</h3>',
    '<h3 class="text-gray-800 dark:text-white font-semibold text-lg">{categories[2].title}</h3>'
)

with open('src/components/Services.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Services.astro translated successfully!")
