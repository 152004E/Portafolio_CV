# Paleta de Colores y Estilos (NativeWind)

## Sistema de Colores Base
*(Estos colores deben sincronizarse con la configuración de Tailwind en `tailwind.config.js` y usarse mediante clases utilitarias de NativeWind)*

- **Primary**: Color principal para botones y acciones principales (ej. `#3b82f6` - azul).
- **Secondary**: Color secundario para detalles o acentos.
- **Background**: Color de fondo principal (modo claro y oscuro).
- **Text**: Color principal de texto (ej. gris oscuro o casi negro en modo claro).
- **Error**: Rojo para validaciones e indicaciones de fallos.
- **Success**: Verde para indicaciones de éxito.

## Tokens de Diseño (Tokens)
- Espaciado estándar: múltiplos de 4 (tailwind default: `p-4`, `m-2`, etc).
- Border Radius:
  - `sm`: 4px
  - `md`: 8px
  - `lg`: 12px
  - `full`: 9999px (para avatares y botones pill)

## Implementación
Referirse al archivo de constantes de color (`constants/Colors.ts` o equivalente) para ver los valores hexadecimales exactos y cómo se maneja el soporte de modo Oscuro (Dark Mode).
