"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { SiteContent } from "@/lib/types";

// ─── Navigation tree ──────────────────────────────────────────────────────────

type NavSection = { id: string; label: string };
type NavGroup = {
  id: string;
  label: string;
  locked?: boolean;
  sections: NavSection[];
};

const NAV: NavGroup[] = [
  {
    id: "global",
    label: "Configuración Global",
    sections: [{ id: "empresa", label: "Empresa & Contacto" }],
  },
  {
    id: "home",
    label: "Home",
    sections: [
      { id: "hero",      label: "Hero"              },
      { id: "servicios", label: "Servicios"         },
      { id: "stats",     label: "Estadísticas"      },
      { id: "whyUs",     label: "Por qué Nosotros"  },
      { id: "clientes",  label: "Clientes"          },
      { id: "sectores",  label: "Sectores"          },
      { id: "cta",       label: "CTA Banner"        },
      { id: "footer",    label: "Footer"            },
    ],
  },
  {
    id: "nosotros",
    label: "Nosotros",
    locked: true,
    sections: [
      { id: "nosotros.hero",    label: "Hero de página"         },
      { id: "nosotros.historia",label: "Historia & Misión"      },
      { id: "nosotros.equipo",  label: "Equipo"                 },
      { id: "nosotros.certs",   label: "Certificaciones"        },
    ],
  },
  {
    id: "servicios-pg",
    label: "Servicios",
    locked: true,
    sections: [
      { id: "servicios-pg.hero",   label: "Hero de página"             },
      { id: "servicios-pg.detail", label: "Detalle de cada servicio"   },
      { id: "servicios-pg.media",  label: "Imágenes y especificaciones"},
      { id: "servicios-pg.video",  label: "Video institucional"        },
    ],
  },
  {
    id: "proyectos",
    label: "Proyectos",
    locked: true,
    sections: [
      { id: "proyectos.hero",      label: "Hero de página"      },
      { id: "proyectos.portfolio", label: "Casos de proyecto"   },
      { id: "proyectos.imagenes",  label: "Galería de imágenes" },
      { id: "proyectos.filtros",   label: "Filtros por sector"  },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    locked: true,
    sections: [
      { id: "blog.hero",       label: "Hero de página"     },
      { id: "blog.articulos",  label: "Artículos"          },
      { id: "blog.imagenes",   label: "Imágenes destacadas"},
      { id: "blog.categorias", label: "Categorías"         },
    ],
  },
  {
    id: "contacto",
    label: "Contacto",
    locked: true,
    sections: [
      { id: "contacto.hero",      label: "Hero de página"        },
      { id: "contacto.formulario",label: "Formulario de contacto"},
      { id: "contacto.datos",     label: "Datos y mapa"          },
      { id: "contacto.horarios",  label: "Horarios de atención"  },
    ],
  },
];

const REAL_SECTIONS = new Set([
  "empresa","hero","servicios","stats","whyUs","clientes","sectores","cta","footer",
]);

// ─── Placeholder for locked sections ─────────────────────────────────────────

const LOCKED_CONTENT: Record<string, { desc: string; fields: string[] }> = {
  "nosotros.hero": {
    desc: "Banner principal de la página Nosotros.",
    fields: ["Título", "Descripción", "Imagen de fondo"],
  },
  "nosotros.historia": {
    desc: "Texto de historia, misión y visión de la empresa.",
    fields: ["Texto de historia", "Año de fundación", "Hitos de la empresa", "Imagen ilustrativa"],
  },
  "nosotros.equipo": {
    desc: "Presentación del equipo directivo y técnico.",
    fields: ["Nombre y cargo", "Fotografía de perfil", "Descripción breve"],
  },
  "nosotros.certs": {
    desc: "Listado de certificaciones y reconocimientos.",
    fields: ["Logo de certificación", "Nombre y descripción", "Año de vigencia"],
  },
  "servicios-pg.hero": {
    desc: "Banner principal de la página Servicios.",
    fields: ["Título", "Descripción", "Imagen de fondo"],
  },
  "servicios-pg.detail": {
    desc: "Página de detalle para cada servicio individual.",
    fields: ["Descripción larga", "Equipos utilizados", "Casos de uso", "PDF descargable"],
  },
  "servicios-pg.media": {
    desc: "Galería de imágenes por servicio.",
    fields: ["Imágenes del servicio en campo", "Capturas de resultados", "Infografías técnicas"],
  },
  "servicios-pg.video": {
    desc: "Video institucional o por servicio.",
    fields: ["URL del video (YouTube / Vimeo)", "Título del video", "Miniatura personalizada"],
  },
  "proyectos.hero": {
    desc: "Banner principal del portfolio de proyectos.",
    fields: ["Título", "Descripción", "Imagen de fondo"],
  },
  "proyectos.portfolio": {
    desc: "Casos de proyectos ejecutados.",
    fields: ["Nombre del proyecto", "Cliente", "Sector", "Descripción", "Imagen principal", "Fecha"],
  },
  "proyectos.imagenes": {
    desc: "Galería fotográfica de proyectos.",
    fields: ["Imágenes de campo", "Mapas y resultados", "Capturas de vuelo"],
  },
  "proyectos.filtros": {
    desc: "Filtros de búsqueda del portfolio.",
    fields: ["Sectores disponibles", "Tipos de servicio", "Países"],
  },
  "blog.hero": {
    desc: "Banner principal del blog.",
    fields: ["Título", "Descripción"],
  },
  "blog.articulos": {
    desc: "Gestión de artículos y publicaciones.",
    fields: ["Título del artículo", "Contenido (texto enriquecido)", "Imagen destacada", "Autor", "Fecha", "Categoría"],
  },
  "blog.imagenes": {
    desc: "Imágenes destacadas para los artículos.",
    fields: ["Imagen principal", "Galería del artículo", "Alt text (SEO)"],
  },
  "blog.categorias": {
    desc: "Categorías para clasificar los artículos.",
    fields: ["Nombre de categoría", "Descripción", "Color de etiqueta"],
  },
  "contacto.hero": {
    desc: "Banner principal de la página de contacto.",
    fields: ["Título", "Descripción"],
  },
  "contacto.formulario": {
    desc: "Configuración del formulario de contacto.",
    fields: ["Campos del formulario", "Email de destino", "Mensaje de confirmación"],
  },
  "contacto.datos": {
    desc: "Información de contacto y mapa embebido.",
    fields: ["Dirección completa", "Teléfonos", "Emails", "Link de Google Maps"],
  },
  "contacto.horarios": {
    desc: "Horarios de atención al cliente.",
    fields: ["Días y horarios de oficina", "Horario de emergencias"],
  },
};

// ─── Shared field components ─────────────────────────────────────────────────

function Field({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-condensed text-[12px] font-semibold tracking-[0.12em] uppercase text-[#6B7280] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-[13px] border border-[#E5E7EB] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00a9c2] focus:ring-2 focus:ring-[#00a9c2]/15 rounded-[4px] transition-all bg-white"
      />
    </div>
  );
}

function Textarea({
  label, value, onChange, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div>
      <label className="block font-condensed text-[12px] font-semibold tracking-[0.12em] uppercase text-[#6B7280] mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2.5 text-[13px] border border-[#E5E7EB] text-[#374151] focus:outline-none focus:border-[#00a9c2] focus:ring-2 focus:ring-[#00a9c2]/15 rounded-[4px] transition-all resize-none bg-white"
      />
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[6px] border border-[#E5E7EB] p-6">
      {title && (
        <h3 className="font-condensed text-[12px] font-bold tracking-[0.14em] uppercase text-[#00a9c2] mb-5 pb-3 border-b border-[#F4F6F8]">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Row3({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{children}</div>;
}

// ─── Section form renderers ───────────────────────────────────────────────────

function EmpresaForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const set = (patch: Partial<SiteContent["company"]>) =>
    onChange({ ...data, company: { ...data.company, ...patch } });
  const setC = (patch: Partial<SiteContent["contact"]>) =>
    onChange({ ...data, contact: { ...data.contact, ...patch } });
  return (
    <div className="flex flex-col gap-5">
      <Card title="Datos de la empresa">
        <Field label="Nombre de empresa" value={data.company.name} onChange={(v) => set({ name: v })} />
        <Field label="Tagline" value={data.company.tagline} onChange={(v) => set({ tagline: v })} />
        <Field label="Certificación ISO" value={data.company.iso} onChange={(v) => set({ iso: v })} />
      </Card>
      <Card title="Información de contacto">
        <Textarea label="Dirección" value={data.contact.address} onChange={(v) => setC({ address: v })} rows={2} />
        <Field label="Email" value={data.contact.email} onChange={(v) => setC({ email: v })} type="email" />
        <Row>
          <Field label="Teléfono (visible)" value={data.contact.phone} onChange={(v) => setC({ phone: v })} />
          <Field label="Teléfono (enlace tel:)" value={data.contact.phoneRaw} onChange={(v) => setC({ phoneRaw: v })} />
        </Row>
      </Card>
    </div>
  );
}

function HeroForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setH = (patch: Partial<SiteContent["hero"]>) =>
    onChange({ ...data, hero: { ...data.hero, ...patch } });
  function setHeadline(i: number, v: string) {
    const headline = data.hero.headline.map((l, idx) => (idx === i ? v : l));
    setH({ headline });
  }
  function setStat(i: number, key: keyof SiteContent["hero"]["stats"][number], v: string) {
    const stats = data.hero.stats.map((s, idx) => (idx === i ? { ...s, [key]: v } : s));
    setH({ stats });
  }
  return (
    <div className="flex flex-col gap-5">
      <Card title="Textos principales">
        <Field label="Eyebrow (subtítulo pequeño)" value={data.hero.eyebrow} onChange={(v) => setH({ eyebrow: v })} />
        {data.hero.headline.map((line, i) => (
          <Field key={i} label={`Línea de título ${i + 1}`} value={line} onChange={(v) => setHeadline(i, v)} />
        ))}
        <Field label="Palabra destacada (teal)" value={data.hero.highlight} onChange={(v) => setH({ highlight: v })} />
        <Textarea label="Descripción" value={data.hero.description} onChange={(v) => setH({ description: v })} rows={2} />
      </Card>
      <Card title="Estadísticas del hero">
        {data.hero.stats.map((stat, i) => (
          <div key={i} className="p-3 bg-[#F4F6F8] rounded-[4px]">
            <p className="font-condensed text-[10px] font-bold tracking-[0.1em] uppercase text-[#9CA3AF] mb-3">
              Estadística {i + 1}
            </p>
            <Row3>
              <Field label="Prefijo" value={stat.prefix} onChange={(v) => setStat(i, "prefix", v)} placeholder="+" />
              <Field label="Valor" value={stat.val} onChange={(v) => setStat(i, "val", v)} placeholder="1,100" />
              <Field label="Etiqueta" value={stat.label} onChange={(v) => setStat(i, "label", v)} />
            </Row3>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ServiciosForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setS = (patch: Partial<SiteContent["services"]>) =>
    onChange({ ...data, services: { ...data.services, ...patch } });
  function setItem(i: number, key: keyof SiteContent["services"]["items"][number], v: string) {
    const items = data.services.items.map((s, idx) => (idx === i ? { ...s, [key]: v } : s));
    setS({ items });
  }
  return (
    <div className="flex flex-col gap-5">
      <Card title="Encabezado de sección">
        <Row>
          <Field label="Label (etiqueta)" value={data.services.label} onChange={(v) => setS({ label: v })} />
          <Field label="Heading (título)" value={data.services.heading} onChange={(v) => setS({ heading: v })} />
        </Row>
      </Card>
      {data.services.items.map((item, i) => (
        <Card key={i} title={`Servicio ${i + 1}`}>
          <Row>
            <Field label="Ícono (símbolo)" value={item.icon} onChange={(v) => setItem(i, "icon", v)} />
            <Field label="Especificación" value={item.spec} onChange={(v) => setItem(i, "spec", v)} />
          </Row>
          <Field label="Título del servicio" value={item.title} onChange={(v) => setItem(i, "title", v)} />
          <Textarea label="Descripción" value={item.description} onChange={(v) => setItem(i, "description", v)} rows={2} />
        </Card>
      ))}
    </div>
  );
}

function StatsForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  function setStat(i: number, key: keyof SiteContent["statBand"][number], v: string) {
    const statBand = data.statBand.map((s, idx) => (idx === i ? { ...s, [key]: v } : s));
    onChange({ ...data, statBand });
  }
  return (
    <div className="flex flex-col gap-4">
      {data.statBand.map((stat, i) => (
        <Card key={i} title={`Estadística ${i + 1}`}>
          <Row3>
            <Field label="Número grande" value={stat.big} onChange={(v) => setStat(i, "big", v)} />
            <Field label="Unidad" value={stat.unit} onChange={(v) => setStat(i, "unit", v)} placeholder="MM, +…" />
            <Field label="Descripción" value={stat.desc} onChange={(v) => setStat(i, "desc", v)} />
          </Row3>
        </Card>
      ))}
    </div>
  );
}

function WhyUsForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setW = (patch: Partial<SiteContent["whyUs"]>) =>
    onChange({ ...data, whyUs: { ...data.whyUs, ...patch } });
  function setHeading(i: number, v: string) {
    const heading = data.whyUs.heading.map((l, idx) => (idx === i ? v : l));
    setW({ heading });
  }
  function setItem(i: number, key: keyof SiteContent["whyUs"]["items"][number], v: string) {
    const items = data.whyUs.items.map((s, idx) => (idx === i ? { ...s, [key]: v } : s));
    setW({ items });
  }
  return (
    <div className="flex flex-col gap-5">
      <Card title="Encabezado de sección">
        <Field label="Label (etiqueta)" value={data.whyUs.label} onChange={(v) => setW({ label: v })} />
        {data.whyUs.heading.map((line, i) => (
          <Field key={i} label={`Línea de título ${i + 1}`} value={line} onChange={(v) => setHeading(i, v)} />
        ))}
        <Textarea label="Descripción" value={data.whyUs.description} onChange={(v) => setW({ description: v })} />
      </Card>
      {data.whyUs.items.map((item, i) => (
        <Card key={i} title={`Pilar ${item.num}`}>
          <Field label="Título" value={item.title} onChange={(v) => setItem(i, "title", v)} />
          <Textarea label="Descripción" value={item.desc} onChange={(v) => setItem(i, "desc", v)} rows={2} />
        </Card>
      ))}
    </div>
  );
}

function ClientesForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setC = (patch: Partial<SiteContent["clients"]>) =>
    onChange({ ...data, clients: { ...data.clients, ...patch } });
  function setName(i: number, v: string) {
    const names = data.clients.names.map((n, idx) => (idx === i ? v : n));
    setC({ names });
  }
  return (
    <div className="flex flex-col gap-5">
      <Card title="Encabezado de sección">
        <Row>
          <Field label="Label (etiqueta)" value={data.clients.label} onChange={(v) => setC({ label: v })} />
          <Field label="Contador visible" value={data.clients.count} onChange={(v) => setC({ count: v })} />
        </Row>
        <Field label="Heading (título)" value={data.clients.heading} onChange={(v) => setC({ heading: v })} />
      </Card>
      <Card title="Nombres de clientes">
        <div className="grid grid-cols-2 gap-3">
          {data.clients.names.map((name, i) => (
            <Field key={i} label={`Cliente ${i + 1}`} value={name} onChange={(v) => setName(i, v)} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function SectoresForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setS = (patch: Partial<SiteContent["sectors"]>) =>
    onChange({ ...data, sectors: { ...data.sectors, ...patch } });
  function setItem(i: number, v: string) {
    const items = data.sectors.items.map((s, idx) => (idx === i ? v : s));
    setS({ items });
  }
  return (
    <div className="flex flex-col gap-5">
      <Card title="Encabezado de sección">
        <Row>
          <Field label="Label (etiqueta)" value={data.sectors.label} onChange={(v) => setS({ label: v })} />
          <Field label="Heading (título)" value={data.sectors.heading} onChange={(v) => setS({ heading: v })} />
        </Row>
      </Card>
      <Card title="Sectores">
        <div className="grid grid-cols-2 gap-3">
          {data.sectors.items.map((item, i) => (
            <Field key={i} label={`Sector ${i + 1}`} value={item} onChange={(v) => setItem(i, v)} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function CTAForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setC = (patch: Partial<SiteContent["cta"]>) =>
    onChange({ ...data, cta: { ...data.cta, ...patch } });
  function setHeading(i: number, v: string) {
    const heading = data.cta.heading.map((l, idx) => (idx === i ? v : l));
    setC({ heading });
  }
  return (
    <Card title="Contenido del banner CTA">
      {data.cta.heading.map((line, i) => (
        <Field key={i} label={`Línea de título ${i + 1}`} value={line} onChange={(v) => setHeading(i, v)} />
      ))}
      <Field label="Palabra destacada (teal)" value={data.cta.highlight} onChange={(v) => setC({ highlight: v })} />
      <Textarea label="Descripción" value={data.cta.description} onChange={(v) => setC({ description: v })} />
      <Field label="Teléfono de contacto" value={data.cta.phone} onChange={(v) => setC({ phone: v })} />
    </Card>
  );
}

function FooterForm({ data, onChange }: { data: SiteContent; onChange: (d: SiteContent) => void }) {
  const setF = (patch: Partial<SiteContent["footer"]>) =>
    onChange({ ...data, footer: { ...data.footer, ...patch } });
  function setLink(i: number, v: string) {
    const serviceLinks = data.footer.serviceLinks.map((l, idx) => (idx === i ? v : l));
    setF({ serviceLinks });
  }
  return (
    <div className="flex flex-col gap-5">
      <Card title="Descripción del footer">
        <Textarea label="Texto descriptivo" value={data.footer.description} onChange={(v) => setF({ description: v })} rows={3} />
      </Card>
      <Card title="Links de servicios">
        {data.footer.serviceLinks.map((link, i) => (
          <Field key={i} label={`Servicio ${i + 1}`} value={link} onChange={(v) => setLink(i, v)} />
        ))}
      </Card>
    </div>
  );
}

// ─── Locked section placeholder ───────────────────────────────────────────────

function LockedSection({ sectionId, label }: { sectionId: string; label: string }) {
  const info = LOCKED_CONTENT[sectionId];
  return (
    <div className="bg-white rounded-[6px] border border-[#E5E7EB] p-10 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-[#F4F6F8] flex items-center justify-center mb-5">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="text-[#9CA3AF]">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <span className="inline-block font-condensed text-[10px] font-bold tracking-[0.14em] uppercase bg-[#FFF8E1] text-[#92400E] border border-[#F59E0B]/30 px-3 py-1 rounded-full mb-3">
        Próximamente
      </span>
      <h2 className="font-condensed text-[18px] font-bold tracking-[0.03em] uppercase text-[#0D2137] mb-2">
        {label}
      </h2>
      {info && (
        <>
          <p className="text-[13px] text-[#6B7280] max-w-sm mb-6 leading-relaxed">{info.desc}</p>
          <div className="w-full max-w-sm text-left border border-[#E5E7EB] rounded-[6px] overflow-hidden">
            <div className="bg-[#F4F6F8] px-4 py-2.5 border-b border-[#E5E7EB]">
              <p className="font-condensed text-[10px] font-bold tracking-[0.12em] uppercase text-[#9CA3AF]">
                Campos que podrás editar
              </p>
            </div>
            <ul className="divide-y divide-[#F4F6F8]">
              {info.fields.map((field) => (
                <li key={field} className="flex items-center gap-3 px-4 py-2.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="text-[#00a9c2] flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="text-[13px] text-[#374151]">{field}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  active,
  expanded,
  onSelect,
  onToggle,
}: {
  active: string;
  expanded: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((group) => {
        const isOpen = expanded.has(group.id);
        return (
          <div key={group.id}>
            {/* Group header */}
            <button
              onClick={() => onToggle(group.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[4px] hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-condensed text-[13px] font-bold tracking-[0.08em] uppercase text-[#374151] group-hover:text-[#0D2137] truncate">
                  {group.label}
                </span>
                {group.locked && (
                  <span className="font-condensed text-[10px] font-bold tracking-[0.1em] uppercase bg-[#FFF8E1] text-[#92400E] border border-[#F59E0B]/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                    Pronto
                  </span>
                )}
              </div>
              <svg
                width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                className={`text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Sub-items */}
            {isOpen && (
              <div className="ml-3 pl-3 border-l border-[#E5E7EB] mt-0.5 mb-1 flex flex-col gap-0.5">
                {group.sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelect(s.id)}
                    className={`
                      w-full text-left px-3 py-2 rounded-[4px] transition-all
                      font-condensed text-[13px] font-semibold tracking-[0.06em] uppercase
                      flex items-center gap-2
                      ${active === s.id
                        ? "bg-[#00a9c2] text-white"
                        : "text-[#6B7280] hover:bg-white hover:text-[#0D2137]"
                      }
                    `}
                  >
                    {group.locked && (
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="flex-shrink-0 opacity-50">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [active, setActive] = useState("empresa");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["global", "home"]));
  const [formData, setFormData] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("gm_admin_token");
    if (!token) { router.replace("/admin"); return; }
    setUser(localStorage.getItem("gm_admin_user") || "admin");
    fetch("/api/content")
      .then((r) => r.json())
      .then((d) => { if (d.ok) setFormData(d.data); });
  }, [router]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("gm_admin_token");
    localStorage.removeItem("gm_admin_user");
    router.push("/admin");
  }, [router]);

  function toggleGroup(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function handleSelect(id: string) {
    setActive(id);
    setMobileNav(false);
    // Auto-expand the group this section belongs to
    const group = NAV.find((g) => g.sections.some((s) => s.id === id));
    if (group) setExpanded((prev) => new Set([...prev, group.id]));
  }

  async function handleSave() {
    if (!formData) return;
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const d = await res.json();
      if (d.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setSaveError("No se pudieron guardar los cambios.");
      }
    } catch {
      setSaveError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  }

  function renderSection() {
    if (!formData) return null;
    if (!REAL_SECTIONS.has(active)) {
      const allSections = NAV.flatMap((g) => g.sections);
      const label = allSections.find((s) => s.id === active)?.label ?? active;
      return <LockedSection sectionId={active} label={label} />;
    }
    switch (active) {
      case "empresa":   return <EmpresaForm   data={formData} onChange={setFormData} />;
      case "hero":      return <HeroForm      data={formData} onChange={setFormData} />;
      case "servicios": return <ServiciosForm data={formData} onChange={setFormData} />;
      case "stats":     return <StatsForm     data={formData} onChange={setFormData} />;
      case "whyUs":     return <WhyUsForm     data={formData} onChange={setFormData} />;
      case "clientes":  return <ClientesForm  data={formData} onChange={setFormData} />;
      case "sectores":  return <SectoresForm  data={formData} onChange={setFormData} />;
      case "cta":       return <CTAForm       data={formData} onChange={setFormData} />;
      case "footer":    return <FooterForm    data={formData} onChange={setFormData} />;
    }
  }

  const activeLabel = NAV.flatMap((g) => g.sections).find((s) => s.id === active)?.label ?? "";
  const isLockedSection = !REAL_SECTIONS.has(active);

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#6B7280]">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          </svg>
          <span className="text-[14px]">Cargando contenido...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col">

      {/* Top header */}
      <header className="bg-[#0D2137] border-b border-white/[0.06] flex-shrink-0 sticky top-0 z-40">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px, 3vw, 32px)" }}>
          <div className="flex items-center justify-between h-[60px] gap-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-1.5 text-white/60 hover:text-white transition-colors"
                onClick={() => setMobileNav(!mobileNav)}
                aria-label="Menú"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Image src="/logo.svg" alt="Global Mapping" width={160} height={40} className="h-9 w-auto brightness-0 invert" />
              <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a9c2]" />
                <span className="font-condensed text-[10px] font-semibold tracking-[0.14em] uppercase text-white">
                  Panel Admin
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00a9c2]/20 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="text-[#00a9c2]">
                    <path strokeLinecap="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[12px] text-white">{user}</span>
              </div>
              <button
                onClick={handleLogout}
                className="font-condensed text-[11px] font-semibold tracking-[0.1em] uppercase text-white border border-white/30 hover:border-white px-3 py-1.5 rounded-[4px] transition-all flex items-center gap-1.5"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1" style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>

        {/* Sidebar */}
        <aside
          className={`
            ${mobileNav ? "flex" : "hidden"} lg:flex flex-col
            w-[240px] flex-shrink-0 bg-[#F4F6F8] border-r border-[#E5E7EB]
            lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)] lg:overflow-y-auto
          `}
          style={{ padding: "20px 12px" }}
        >
          <Sidebar
            active={active}
            expanded={expanded}
            onSelect={handleSelect}
            onToggle={toggleGroup}
          />

          <div className="mt-auto pt-5 border-t border-[#E5E7EB]">
            <div className="bg-[#FFF8E1] border border-[#F59E0B]/30 rounded-[4px] p-3">
              <p className="font-condensed text-[11px] font-bold tracking-[0.12em] uppercase text-[#92400E] mb-1">
                Modo Demo
              </p>
              <p className="text-[13px] text-[#92400E]/80 leading-[1.5]">
                Los cambios no se guardan en base de datos. Supabase se conecta en la versión final.
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6">

          {/* Section header */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="font-condensed text-[20px] font-bold tracking-[0.03em] uppercase text-[#0D2137]">
                {activeLabel}
              </h1>
              <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                {isLockedSection
                  ? "Esta sección estará disponible cuando se construya la página"
                  : "Edita los campos y guarda los cambios"}
              </p>
            </div>

            {!isLockedSection && (
              <div className="flex items-center gap-3 flex-shrink-0">
                {saved && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-[4px] px-3 py-2">
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" className="text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-condensed text-[13px] font-semibold tracking-[0.06em] uppercase text-green-700">
                      Guardado
                    </span>
                  </div>
                )}
                {saveError && <span className="text-[12px] text-red-600">{saveError}</span>}
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-condensed text-[13px] font-semibold tracking-[0.08em] uppercase text-[#6B7280] hover:text-[#0D2137] border border-[#E5E7EB] hover:border-[#0D2137]/20 px-4 py-2 rounded-[4px] transition-all hidden sm:flex items-center gap-1.5"
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Ver sitio
                </a>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="font-condensed bg-[#00a9c2] hover:bg-[#007F94] text-white font-bold text-[13px] tracking-[0.1em] uppercase px-5 py-2 rounded-[4px] transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-8H7v8M7 3v5h8" />
                      </svg>
                      Guardar cambios
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {renderSection()}
        </main>
      </div>
    </div>
  );
}
