import type { SiteContent } from "./types";

const content: SiteContent = {
  company: {
    name: "Global Mapping",
    tagline: "Geomática & LiDAR",
    iso: "ISO 9001:2015",
  },

  contact: {
    address: "Jr. Carlos Neuhaus 135, Of. 201–202, San Isidro — Lima, Perú",
    email: "info@globalmapping.biz",
    phone: "+51 945 651 330",
    phoneRaw: "+51945651330",
  },

  nav: [
    { href: "/",          label: "Home"      },
    { href: "/nosotros",  label: "Nosotros"  },
    { href: "/servicios", label: "Servicios" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/blog",      label: "Blog"      },
    { href: "/contacto",  label: "Contacto"  },
  ],

  hero: {
    eyebrow: "Geomática de precisión — Perú & Latinoamérica",
    headline: [
      "Precisión, velocidad",
      "y expertise en",
      "LiDAR, Topografía,",
      "Fotogrametría y",
    ],
    highlight: "Geomática",
    description:
      "Más de 25 años apoyando proyectos en Perú y Latinoamérica.",
    stats: [
      { prefix: "+", val: "1,100", label: "Proyectos ejecutados" },
      { prefix: "±", val: "5 cm",  label: "Precisión vertical"  },
      { prefix: "",  val: "25+",   label: "Años de experiencia" },
      { prefix: "+", val: "200",   label: "Clientes satisfechos" },
    ],
  },

  services: {
    label: "Servicios",
    heading: "Soluciones integrales de geomática",
    items: [
      {
        icon: "◈",
        title: "LiDAR Aerotransportado",
        description: "Nubes de puntos de alta densidad con escáner LEICA Terrain Mapper 2 y cámaras de 150MP.",
        spec: "1–100 pts/m²",
      },
      {
        icon: "⊕",
        title: "Topografía y Geodesia",
        description: "Levantamientos de gran escala. Carreteras, túneles, presas, batimetría y redes geodésicas.",
        spec: 'Estaciones totales 1"',
      },
      {
        icon: "⊞",
        title: "Fotogrametría",
        description: "True orthophoto sin errores de verticalidad. RGB y NIR desde 3 cm/píxel con 4 bandas.",
        spec: "3 cm/píxel",
      },
      {
        icon: "⊗",
        title: "Supervisión Topográfica",
        description: "Control QA/QC en obra. Túneles, movimiento de tierras y As-Built 3D con escáner láser.",
        spec: "BIM compatible",
      },
      {
        icon: "⊘",
        title: "Diseños de Ingeniería",
        description: "Diseño geométrico de carreteras, accesos, pozas, botaderos, canales y túneles.",
        spec: "Diseño integral",
      },
    ],
  },

  statBand: [
    { big: "+1,100", unit: "",   desc: "Proyectos ejecutados" },
    { big: "+5",     unit: "MM", desc: "Hectáreas levantadas" },
    { big: "+200",   unit: "",   desc: "Clientes satisfechos" },
    { big: "25",     unit: "+",  desc: "Años de experiencia"  },
  ],

  whyUs: {
    label: "¿Por qué Global Mapping?",
    heading: ["Tecnología que respalda", "decisiones críticas"],
    description:
      "Desde megaproyectos mineros hasta infraestructura vial, brindamos datos precisos y confiables cuando las decisiones no admiten margen de error.",
    items: [
      {
        num: "01",
        title: "Experiencia Multisector",
        desc: "Minería, energía, infraestructura, catastro y GIS. Más de 25 años en megaproyectos del Perú y Latinoamérica.",
      },
      {
        num: "02",
        title: "Precisión Demostrada",
        desc: "Densidad 1–100 pts/m² y precisión ~5 cm. QA/QC riguroso con reportes completos, metadatos y trazabilidad total.",
      },
      {
        num: "03",
        title: "Gestión Certificada ISO 9001",
        desc: "Certificados para Geomática, Topografía y LiDAR. Cultura de prevención y cumplimiento ambiental.",
      },
      {
        num: "04",
        title: "Tecnología de Última Generación",
        desc: "Escáner LEICA aerotransportado, frecuencia >2,000 kHz. Drones RPAS, estaciones totales y escáneres terrestres.",
      },
    ],
  },

  clients: {
    label: "Clientes",
    heading: "Confían en nosotros",
    count: "+200 empresas líderes",
    names: [
      "Anglo American", "Barrick Gold",  "Southern Copper", "Newmont",
      "Hochschild",     "Buenaventura",  "Nexa",            "Poderosa",
    ],
  },

  sectors: {
    label: "Sectores",
    heading: "Presentes en cada industria",
    items: [
      "Infraestructura",       "Construcción",
      "Minería",               "Energía",
      "Infraestructura Vial",  "Líneas de Transmisión",
      "Vía Férrea",            "Agricultura",
    ],
  },

  cta: {
    heading: ["¿Tu proyecto necesita datos"],
    highlight: "precisos?",
    description:
      "Convierte tu territorio en datos confiables. Cuéntanos tu necesidad y te proponemos el mejor enfoque técnico.",
    phone: "+51 945 651 330",
  },

  footer: {
    description:
      "Más de 25 años apoyando proyectos de geomática en Perú y Latinoamérica. ISO 9001:2015 certificado.",
    serviceLinks: [
      "LiDAR Aerotransportado",
      "Topografía y Geodesia",
      "Fotogrametría",
      "Supervisión Topográfica",
      "Diseños de Ingeniería",
    ],
  },
};

export default content;
