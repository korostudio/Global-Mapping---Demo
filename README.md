# Global Mapping SAC — Rediseño Web

Este repositorio contiene el código fuente para el rediseño del sitio web corporativo de **Global Mapping SAC** (empresa de geomática, topografía y LiDAR en Perú con más de 25 años de experiencia). El diseño está inspirado en estéticas profesionales e industriales limpias.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.0 |
| UI Library | React | 19.2.4 |
| Estilos | Tailwind CSS v4 + Clases CSS en globals.css | ^4 |
| Fuentes | Google Fonts (Barlow & Barlow Condensed) | — |
| Gestor de paquetes | pnpm | 10.30.0 |
| DB / Autenticación | Supabase (Pendiente de integración) | — |

---

## 🚀 Características y Cambios Recientes

### 📱 Diseño Móvil Responsivo (Mobile First)
Todos los componentes principales han sido optimizados para verse impecables en dispositivos móviles y tablets:
- **Hero & Banner**: Escala tipográfica fluida en encabezados usando `clamp()`, apilado vertical de botones de llamada a la acción y rejilla adaptativa en el strip de estadísticas.
- **ISOBand & TopBar**: Comportamiento flexible en pantallas reducidas para evitar superposiciones de textos y asegurar legibilidad.
- **Secciones (Services, WhyUs, Clients, Sectors, Stats, CTABanner)**: Reducción de paddings de sección (`py-14 sm:py-20`), ajustes de márgenes e integración de rejillas dinámicas (e.g., Grid de 1 col en mobile, 2 cols en tablets y 5 cols en desktops para servicios).
- **Footer**: Apilado responsivo de columnas informativas y centrado del área legal en móviles.

### 🔍 Buscador Interno Integrado
Se implementó un sistema de búsqueda en el encabezado principal:
- **Versión Desktop**: Un ícono de lupa animado a la izquierda de "Solicitar cotización" que se expande horizontalmente al hacer clic y se colapsa automáticamente si pierde el foco sin texto.
- **Versión Mobile**: Un campo de entrada de búsqueda estático con un ícono de lupa integrado y bordes resaltados en teal al hacer foco, posicionado al inicio del menú móvil.

---

## 📂 Estructura del Proyecto

```
global-mapping/
├── app/
│   ├── layout.tsx          # RootLayout (fuentes Barlow, metadata SEO y TopBar)
│   ├── page.tsx            # Home page (ensambla los componentes de la sección)
│   ├── globals.css         # Importaciones de Tailwind v4 y clases CSS para efectos
│   └── nosotros, servicios, proyectos, blog, contacto/ # Páginas secundarias (En construcción)
│
├── components/
│   ├── Container.tsx       # Wrapper con max-width y padding adaptativo
│   ├── Navbar.tsx          # Cabecera interactiva con menú móvil y buscador
│   ├── Hero.tsx            # Sección de presentación con estadísticas de impacto
│   ├── ISOBand.tsx         # Franja de certificación ISO 9001
│   ├── Services.tsx        # Grid responsivo con hover interactivo de servicios
│   ├── WhyUs.tsx           # Pilares de valor del cliente
│   ├── Clients.tsx         # Logos/nombres de clientes destacados
│   ├── Sectors.tsx         # Sectores de negocio atendidos con overlay de color
│   ├── CTABanner.tsx       # Banner final de llamado a la acción
│   └── Footer.tsx          # Columnas de navegación e información legal
│
├── lib/
│   ├── content.ts          # ÚNICA FUENTE DE VERDAD de los textos y datos estáticos
│   └── types.ts            # Tipados TypeScript para el contenido
```

---

## ⚠️ Reglas Críticas de Desarrollo

1. **Bug del spacing de Tailwind v4**: En Tailwind v4, si modificas el bloque `@theme {}` en `app/globals.css`, se borran las variables de espaciado por defecto. Por ello, la línea `--spacing: 0.25rem;` **nunca debe ser removida**.
2. **Estilos en `Container.tsx`**: Este wrapper utiliza estilos en línea para definir el ancho máximo (`max-width: 1280px`) y padding. No debe convertirse a clases de Tailwind.
3. **Fuente única de verdad**: Todos los textos generales y configuraciones de enlaces están centralizados en `lib/content.ts`. Cualquier edición rápida en los contenidos debe hacerse únicamente allí.

---

## 💻 Comandos Útiles

Ejecutar el entorno de desarrollo:
```bash
pnpm dev
```

Ejecutar verificación de tipos de TypeScript sin compilar:
```bash
pnpm exec tsc --noEmit
```

Compilar el bundle de producción:
```bash
pnpm build
```
