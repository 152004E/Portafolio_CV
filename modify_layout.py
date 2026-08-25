with open('src/layouts/Layout.astro', 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace(
    "import WhatsAppButton from '../components/WhatsAppButton.astro';",
    "import WhatsAppButton from '../components/WhatsAppButton.astro';\nimport { getLangFromUrl } from '../i18n/utils';\n\nconst lang = getLangFromUrl(Astro.url);"
)

layout = layout.replace(
    'const { title = "Emerson Reyes || Portafolio profesional" } = Astro.props;',
    'const { title = lang === \'es\' ? "Emerson Reyes - Portafolio profesional" : lang === \'en\' ? "Emerson Reyes - Professional Portfolio" : "Emerson Reyes - 个人作品集" } = Astro.props;'
)

layout = layout.replace(
    '<html lang="es" class="scroll-smooth">',
    '<html lang={lang} class="scroll-smooth">'
)

with open('src/layouts/Layout.astro', 'w', encoding='utf-8') as f:
    f.write(layout)


def remove_title_from_page(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<Layout title="Emerson Reyes - Portafolio profesional">', '<Layout>')
    content = content.replace('<Layout title="Emerson Reyes || Portafolio profesional">', '<Layout>')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

remove_title_from_page('src/pages/index.astro')
remove_title_from_page('src/pages/en/index.astro')
remove_title_from_page('src/pages/zh/index.astro')

print("Layout and Pages updated successfully!")
