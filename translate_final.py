import re

# 1. WhatsAppButton.astro
with open('src/components/WhatsAppButton.astro', 'r', encoding='utf-8') as f:
    wa = f.read()

wa = wa.replace(
    '---\nconst phoneNumber',
    "---\nimport { getLangFromUrl, useTranslations } from '../i18n/utils';\n\nconst lang = getLangFromUrl(Astro.url);\nconst t = useTranslations(lang);\n\nconst phoneNumber"
)
wa = wa.replace(
    'const message = "¡Hola! Me gustaría saber más sobre tus servicios.";',
    'const message = lang === \'es\' ? "¡Hola! Me gustaría saber más sobre tus servicios." : lang === \'en\' ? "Hello! I would like to know more about your services." : "你好！我想了解更多关于您的服务。";'
)
wa = wa.replace(
    'aria-label="Contactar por WhatsApp"',
    'aria-label={lang === \'es\' ? "Contactar por WhatsApp" : lang === \'en\' ? "Contact via WhatsApp" : "通过 WhatsApp 联系"}'
)
wa = wa.replace(
    'title="Escríbeme por WhatsApp"',
    'title={lang === \'es\' ? "Escríbeme por WhatsApp" : lang === \'en\' ? "Message me on WhatsApp" : "在 WhatsApp 上给我发信息"}'
)
with open('src/components/WhatsAppButton.astro', 'w', encoding='utf-8') as f:
    f.write(wa)


# 2. Footer.astro
with open('src/components/Footer.astro', 'r', encoding='utf-8') as f:
    ft = f.read()

ft = ft.replace(
    '---\n---',
    "---\nimport { getLangFromUrl, useTranslations } from '../i18n/utils';\n\nconst lang = getLangFromUrl(Astro.url);\nconst t = useTranslations(lang);\n---"
)
ft = ft.replace(
    '<p class="text-gray-500 dark:text-gray-400 text-sm mb-1">Desarrollador de Software</p>',
    '<p class="text-gray-500 dark:text-gray-400 text-sm mb-1">{lang === \'es\' ? "Desarrollador de Software" : lang === \'en\' ? "Software Developer" : "软件开发工程师"}</p>'
)
with open('src/components/Footer.astro', 'w', encoding='utf-8') as f:
    f.write(ft)


# 3. ContactForm.astro
with open('src/components/ContactForm.astro', 'r', encoding='utf-8') as f:
    cf = f.read()

cf = cf.replace(
    '---\nconst email',
    "---\nimport { getLangFromUrl, useTranslations } from '../i18n/utils';\n\nconst lang = getLangFromUrl(Astro.url);\nconst t = useTranslations(lang);\n\nconst email"
)
cf = cf.replace(
    'const whatsappMessage = "¡Hola! Me gustaría saber más sobre tus servicios.";',
    'const whatsappMessage = lang === \'es\' ? "¡Hola! Me gustaría saber más sobre tus servicios." : lang === \'en\' ? "Hello! I would like to know more about your services." : "你好！我想了解更多关于您的服务。";'
)
cf = cf.replace(
    """Contacto
        </span>""",
    """{lang === 'es' ? "Contacto" : lang === 'en' ? "Contact" : "联系"}
        </span>"""
)
cf = cf.replace(
    """Hablemos de tu<br class="sm:hidden" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
            próximo proyecto
          </span>""",
    """{lang === 'es' ? "Hablemos de tu" : lang === 'en' ? "Let's talk about your" : "我们来谈谈你的"}<br class="sm:hidden" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
            {lang === 'es' ? "próximo proyecto" : lang === 'en' ? "next project" : "下一个项目"}
          </span>"""
)
cf = cf.replace(
    """Ya sea desarrollo frontend, backend, automatización, IA, o construir sistemas escalables —
          estoy abierto a nuevas oportunidades y desafíos tecnológicos.
          Conversemos y hagamos algo increíble juntos.""",
    """{lang === 'es' 
            ? "Ya sea desarrollo frontend, backend, automatización, IA, o construir sistemas escalables — estoy abierto a nuevas oportunidades y desafíos tecnológicos. Conversemos y hagamos algo increíble juntos." 
            : lang === 'en' 
            ? "Whether it's frontend, backend, automation, AI, or building scalable systems — I'm open to new opportunities and tech challenges. Let's talk and build something amazing together." 
            : "无论是前端、后端、自动化、AI，还是构建可扩展的系统——我都对新的机会和技术挑战持开放态度。让我们一起交谈，共创辉煌。"}"""
)
cf = cf.replace(
    'aria-label="Enviar correo"',
    'aria-label={lang === \'es\' ? "Enviar correo" : lang === \'en\' ? "Send email" : "发送电子邮件"}'
)
cf = cf.replace(
    'aria-label="Contactar por WhatsApp"',
    'aria-label={lang === \'es\' ? "Contactar por WhatsApp" : lang === \'en\' ? "Contact via WhatsApp" : "通过 WhatsApp 联系"}'
)
cf = cf.replace(
    'aria-label="Abrir perfil de GitHub"',
    'aria-label={lang === \'es\' ? "Abrir perfil de GitHub" : lang === \'en\' ? "Open GitHub profile" : "打开 GitHub 个人资料"}'
)
cf = cf.replace(
    'aria-label="Abrir perfil de LinkedIn"',
    'aria-label={lang === \'es\' ? "Abrir perfil de LinkedIn" : lang === \'en\' ? "Open LinkedIn profile" : "打开 LinkedIn 个人资料"}'
)
cf = cf.replace(
    'Respuesta en menos de 24 horas ⚡',
    '{lang === \'es\' ? "Respuesta en menos de 24 horas ⚡" : lang === \'en\' ? "Response in less than 24 hours ⚡" : "24 小时内回复 ⚡"}'
)
with open('src/components/ContactForm.astro', 'w', encoding='utf-8') as f:
    f.write(cf)

print("Phase 5 components translated successfully!")
