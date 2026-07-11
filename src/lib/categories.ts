export type Category = {
  slug: string;
  name: string;
  nameSingular: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  commonJobs: string[];
  avgPriceRange: string;
  keywords: string[];
};

export const categories: Category[] = [
  {
    slug: "plomeria",
    name: "Plomería",
    nameSingular: "plomero",
    icon: "droplet",
    shortDescription: "Pérdidas, destapaciones, instalación de grifería y más.",
    longDescription:
      "Encontrá plomeros verificados cerca tuyo para reparar pérdidas de agua, destapar cañerías, instalar termotanques, grifería, inodoros y hacer instalaciones sanitarias completas. Pedí presupuesto sin compromiso y compará antes de decidir.",
    commonJobs: [
      "Reparación de pérdidas",
      "Destapación de cañerías",
      "Instalación de termotanque",
      "Cambio de grifería",
      "Instalación sanitaria completa",
    ],
    avgPriceRange: "$8.000 - $45.000",
    keywords: ["plomero", "plomería", "destapaciones", "pérdidas de agua", "gasista plomero"],
  },
  {
    slug: "electricidad",
    name: "Electricidad",
    nameSingular: "electricista",
    icon: "bolt",
    shortDescription: "Instalaciones, cortocircuitos, tableros y certificaciones.",
    longDescription:
      "Electricistas matriculados para instalaciones nuevas, reparación de cortocircuitos, cambio de tableros, colocación de disyuntores y certificaciones eléctricas. Trabajos con garantía y presupuesto claro antes de empezar.",
    commonJobs: [
      "Reparación de cortocircuitos",
      "Instalación de tablero eléctrico",
      "Colocación de disyuntor",
      "Instalación de luminarias",
      "Certificación eléctrica",
    ],
    avgPriceRange: "$7.000 - $50.000",
    keywords: ["electricista", "electricidad", "cortocircuito", "tablero eléctrico", "instalación eléctrica"],
  },
  {
    slug: "gas",
    name: "Gasista",
    nameSingular: "gasista",
    icon: "flame",
    shortDescription: "Gasistas matriculados para instalaciones y habilitaciones.",
    longDescription:
      "Gasistas matriculados para instalación y reparación de estufas, cocinas, calefones y calderas, detección de pérdidas de gas y habilitaciones. Todos los profesionales muestran su matrícula en el perfil.",
    commonJobs: [
      "Detección de pérdidas de gas",
      "Instalación de calefón",
      "Instalación de caldera",
      "Habilitación de gas",
      "Conexión de cocina",
    ],
    avgPriceRange: "$10.000 - $60.000",
    keywords: ["gasista", "gasista matriculado", "pérdida de gas", "instalación de gas", "calefón"],
  },
  {
    slug: "pintura",
    name: "Pintura",
    nameSingular: "pintor",
    icon: "paintbrush",
    shortDescription: "Pintura de interiores, exteriores y trabajos de terminación.",
    longDescription:
      "Pintores para interiores, exteriores, frentes de edificios y terminaciones. Pedí presupuesto por metro cuadrado y compará precios de distintos profesionales antes de contratar.",
    commonJobs: [
      "Pintura de interiores",
      "Pintura de exteriores y frentes",
      "Empapelado",
      "Impermeabilización",
      "Terminaciones y detalles",
    ],
    avgPriceRange: "$6.000 - $40.000",
    keywords: ["pintor", "pintura", "pintura de interiores", "pintura de frentes"],
  },
  {
    slug: "albanileria",
    name: "Albañilería",
    nameSingular: "albañil",
    icon: "brick",
    shortDescription: "Refacciones, construcción, revoques y ampliaciones.",
    longDescription:
      "Albañiles para refacciones, ampliaciones, revoques, colocación de cerámicos y obra en general. Compará presupuestos de profesionales verificados y elegí según reseñas de otros clientes.",
    commonJobs: [
      "Refacciones generales",
      "Ampliaciones",
      "Revoques y contrapisos",
      "Colocación de cerámicos",
      "Reparación de humedad",
    ],
    avgPriceRange: "$10.000 - $80.000",
    keywords: ["albañil", "albañilería", "refacciones", "construcción", "obra"],
  },
  {
    slug: "carpinteria",
    name: "Carpintería",
    nameSingular: "carpintero",
    icon: "hammer",
    shortDescription: "Muebles a medida, aberturas, reparación de madera.",
    longDescription:
      "Carpinteros para muebles a medida, reparación y colocación de aberturas, placares y trabajos en madera y melamina. Recibí presupuestos y elegí al profesional con mejor reputación.",
    commonJobs: [
      "Muebles a medida",
      "Colocación de aberturas",
      "Reparación de placares",
      "Trabajos en melamina",
      "Restauración de muebles",
    ],
    avgPriceRange: "$8.000 - $70.000",
    keywords: ["carpintero", "carpintería", "muebles a medida", "aberturas"],
  },
  {
    slug: "cerrajeria",
    name: "Cerrajería",
    nameSingular: "cerrajero",
    icon: "key",
    shortDescription: "Aperturas de urgencia, cambio de cerraduras y copias.",
    longDescription:
      "Cerrajeros disponibles para aperturas de puertas de urgencia, cambio de cerraduras, instalación de cerraduras de seguridad y copias de llaves. Filtrá por disponibilidad inmediata en tu zona.",
    commonJobs: [
      "Apertura de puertas",
      "Cambio de cerradura",
      "Cerraduras de seguridad",
      "Copias de llaves",
      "Cerrajería de emergencia 24hs",
    ],
    avgPriceRange: "$5.000 - $30.000",
    keywords: ["cerrajero", "cerrajería", "apertura de puertas", "cerrajero urgencias"],
  },
  {
    slug: "climatizacion",
    name: "Aire acondicionado",
    nameSingular: "técnico en climatización",
    icon: "wind",
    shortDescription: "Instalación, service y reparación de equipos de A/C.",
    longDescription:
      "Técnicos para instalación, mantenimiento y reparación de aires acondicionados split, calefacción y ventilación. Presupuestos claros por equipo y visita.",
    commonJobs: [
      "Instalación de split",
      "Service y carga de gas",
      "Reparación de A/C",
      "Mantenimiento preventivo",
      "Instalación de calefacción",
    ],
    avgPriceRange: "$9.000 - $55.000",
    keywords: ["aire acondicionado", "climatización", "instalación de split", "service aire acondicionado"],
  },
  {
    slug: "jardineria",
    name: "Jardinería",
    nameSingular: "jardinero",
    icon: "leaf",
    shortDescription: "Mantenimiento de jardines, poda y paisajismo.",
    longDescription:
      "Jardineros para mantenimiento de espacios verdes, poda de árboles, diseño de jardines y riego automático. Contratá servicios únicos o mantenimiento periódico.",
    commonJobs: [
      "Corte de césped",
      "Poda de árboles y arbustos",
      "Diseño de jardines",
      "Riego automático",
      "Mantenimiento periódico",
    ],
    avgPriceRange: "$5.000 - $25.000",
    keywords: ["jardinero", "jardinería", "poda", "mantenimiento de jardines"],
  },
  {
    slug: "limpieza",
    name: "Limpieza",
    nameSingular: "profesional de limpieza",
    icon: "sparkles",
    shortDescription: "Limpieza de hogares, oficinas y fin de obra.",
    longDescription:
      "Profesionales de limpieza para hogares, oficinas y limpieza de fin de obra. Elegí entre servicios únicos o contratos recurrentes con el mismo profesional.",
    commonJobs: [
      "Limpieza de hogar",
      "Limpieza de fin de obra",
      "Limpieza de oficinas",
      "Limpieza de vidrios en altura",
      "Limpieza profunda",
    ],
    avgPriceRange: "$4.000 - $20.000",
    keywords: ["limpieza", "limpieza de hogar", "limpieza fin de obra"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
