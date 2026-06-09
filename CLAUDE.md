# Global Mapping SAC — Guía de proyecto

## Qué es este proyecto

Rediseño del sitio web de **Global Mapping SAC** (globalmapping.biz), empresa peruana de geomática con 25+ años. El cliente necesita poder editar textos sin pagar al desarrollador → se implementará un panel admin con Supabase.

Referencia visual: metso.com/es (corporativo industrial, limpio, profesional).

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.0 |
| UI | React | 19.2.4 |
| Estilos | Tailwind CSS v4 + CSS classes | ^4 |
| Fuentes | next/font/google (Barlow + Barlow Condensed) | — |
| Package manager | pnpm | 10.30.0 |
| DB/Auth (pendiente) | Supabase | — |
| Deploy (pendiente) | Vercel | — |

---

## Estructura de archivos

```
global-mapping/
├── app/
│   ├── layout.tsx          # RootLayout con fuentes y metadata SEO completa
│   ├── page.tsx            # Home page — ensambla todos los componentes
│   ├── globals.css         # Tailwind @theme + CSS classes para animaciones
│   ├── nosotros/page.tsx   # Placeholder "en construcción"
│   ├── servicios/page.tsx  # Placeholder "en construcción"
│   ├── proyectos/page.tsx  # Placeholder "en construcción"
│   ├── blog/page.tsx       # Placeholder "en construcción"
│   └── contacto/page.tsx   # Placeholder "en construcción"
│
├── components/
│   ├── Container.tsx       # Wrapper con max-width: 1280px + padding clamp()
│   ├── Navbar.tsx          # Sticky, scroll shadow, mobile menu, 'use client'
│   ├── Hero.tsx            # min-h-screen, full dark, stats strip absoluto al fondo
│   ├── ISOBand.tsx         # Franja teal ISO 9001:2015
│   ├── Services.tsx        # Grid 5 cols con hover bar
│   ├── Stats.tsx           # Grid 4 cols sobre fondo navy
│   ├── WhyUs.tsx           # 2 cols: texto + lista numerada 01-04
│   ├── Clients.tsx         # Grid 4 cols logos de clientes
│   ├── Sectors.tsx         # Grid 4 cols con overlay teal al hover
│   ├── CTABanner.tsx       # Navy + borde teal, 2 botones
│   ├── Footer.tsx          # 3 cols + bottom bar ISO badge
│   └── UnderConstruction.tsx # Componente reutilizable para páginas pendientes
│
├── lib/
│   ├── types.ts            # Interfaces TypeScript: Service, StatBand, WhyItem, etc.
│   └── content.ts          # ÚNICA FUENTE DE VERDAD del contenido del sitio
│
├── public/
│   └── logo.svg            # Logo oficial (celeste #00a9c2 + gris #a09e9c)
│
├── next.config.ts          # Headers de seguridad, image optimization, reactStrictMode
├── .gitignore              # Incluye audit-shots/, screenshot.mjs, .env.local
└── CLAUDE.md               # Este archivo
```

---

## Paleta de colores

| Rol | Hex |
|---|---|
| Navy (hero, sections oscuras, footer) | `#0D2137` |
| Navy dark (footer bottom) | `#071828` |
| **Teal primario** (logo, CTAs, acentos) | `#00a9c2` |
| Teal hover | `#007F94` |
| Teal light (hover clientes) | `#E0F6FA` |
| Gris logo (logos clientes) | `#a09e9c` |
| Blanco secciones | `#FFFFFF` |
| Gris claro secciones | `#F4F6F8` |
| Borde claro | `#E5E7EB` |
| Texto headings | `#0D2137` |
| Texto cuerpo | `#374151` |
| Texto muted | `#6B7280` |

---

## Tipografía

- **Headings**: `Barlow Condensed` — weights 400/600/700/800, UPPERCASE, `font-condensed`
- **Body**: `Barlow` — weights 300/400/500/600
- Cargadas via `next/font/google` en `layout.tsx`
- Variables CSS: `--font-barlow-condensed`, `--font-barlow`

---

## Decisiones técnicas importantes

### Container
`Container.tsx` usa **inline styles** (no Tailwind) para `max-width: 1280px` + `mx-auto` + `padding: clamp(24px, 4vw, 48px)`. Esto es intencional — en Tailwind v4 el `max-w-7xl` no estaba funcionando de forma confiable. No cambiar a clases Tailwind.

### Tailwind v4 — Bug crítico conocido
En Tailwind v4, el bloque `@theme { }` en `globals.css` **override el tema por defecto** y elimina `--spacing: 0.25rem`. Sin esa variable, TODAS las clases de spacing (`px-*`, `py-*`, `mb-*`, `gap-*`, etc.) generan `0`. La solución está en `globals.css`:
```css
@theme {
  --spacing: 0.25rem;  /* ← NUNCA eliminar esta línea */
  ...
}
```

### CSS reset
El reset `*{margin:0;padding:0}` fue eliminado porque en Tailwind v4 los utilities van en `@layer utilities`. Cualquier CSS fuera de un layer tiene mayor prioridad en la cascade, lo que hacía que el reset pisara todas las clases de Tailwind.

### CSS classes vs Tailwind
- **Tailwind**: todo layout, spacing, colores, tipografía
- **CSS classes en globals.css**: SOLO para pseudo-elementos y animaciones (hover bar de service cards, overlay de sector cards)
- **Inline styles**: SOLO en Container.tsx y `clamp()` de font-size en headings

### Section label
La clase `.section-label` (línea decorativa + texto uppercase teal) es la misma para secciones claras y oscuras. La variante `section-label-dark` fue eliminada por ser idéntica.

---

## Contenido del sitio

Todo el contenido (textos, datos, listas) está en **`lib/content.ts`** y tipado en **`lib/types.ts`**.

Para editar textos: modificar `lib/content.ts` únicamente.

Estructura de `content`:
```ts
content.company    // nombre, tagline, ISO
content.contact    // dirección, email, teléfono
content.nav        // links del navbar
content.hero       // eyebrow, headline, stats del fold
content.services   // label, heading, array de servicios
content.statBand   // 4 números grandes
content.whyUs      // label, heading, 4 pilares numerados
content.clients    // label, heading, array de nombres
content.sectors    // label, heading, array de sectores
content.cta        // heading, descripción, teléfono
content.footer     // descripción, links de servicios
```

---

## SEO — layout.tsx

Configurado con:
- `metadataBase: new URL("https://globalmapping.biz")`
- `title.template: "%s | Global Mapping SAC"`
- OpenGraph (locale: es_PE, image: /og-image.jpg — **pendiente crear**)
- Twitter card: summary_large_image
- robots: index + follow
- keywords: 12 términos

> **Pendiente**: crear `/public/og-image.jpg` (1200×630px) para previews en redes sociales.

---

## Seguridad — next.config.ts

Headers configurados para todas las rutas:
- `X-DNS-Prefetch-Control`
- `Strict-Transport-Security` (HSTS 2 años)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/mic/geo bloqueados)
- `Content-Security-Policy`

> Cuando se configure Supabase, agregar la URL del proyecto a `connect-src` en el CSP.

---

## Pendiente (en orden de prioridad)

### Paso 7 — Supabase + Panel Admin
- Crear proyecto en Supabase
- Agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` a `.env.local`
- Schema SQL: tablas para contenido editable del sitio
- Ruta `/admin` protegida con Supabase Auth
- Formularios para editar cada sección
- Conectar componentes para leer de Supabase (fallback a `lib/content.ts`)

### Paso 8 — Archivos SEO técnicos
- `app/not-found.tsx` — Página 404 custom con navbar/footer
- `app/sitemap.ts` — Sitemap XML automático
- `app/robots.ts` — robots.txt

### Pendientes de diseño (menores del audit)
- Crear `/public/og-image.jpg` (1200×630px)
- Scroll indicator en el hero (chevron animado)
- Separación visual entre secciones adyacentes del mismo color

### Páginas por construir (actualmente "en construcción")
- `/nosotros` — Equipo, historia, certificaciones
- `/servicios` — Detalle de cada servicio
- `/proyectos` — Portfolio de proyectos
- `/blog` — Artículos
- `/contacto` — Formulario de contacto

---

## Comandos útiles

```bash
pnpm dev          # Servidor de desarrollo en localhost:3000
pnpm build        # Build de producción
pnpm start        # Servidor de producción
npx tsc --noEmit  # Verificar TypeScript sin compilar
```

---

## Cliente

- **Empresa**: Global Mapping SAC
- **Ubicación**: San Isidro, Lima, Perú
- **Web actual**: globalmapping.biz
- **Necesidad clave**: el cliente edita sus propios textos sin pagar al developer → panel admin con Supabase
- **Preferencia del cliente**: respuestas rápidas, ver el resultado antes de aprobar cambios
