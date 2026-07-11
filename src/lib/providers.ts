export type Provider = {
  id: string;
  name: string;
  categorySlug: string;
  city: string;
  rating: number;
  reviews: number;
  jobsDone: number;
  verified: boolean;
  responseTime: string;
  bio: string;
  initials: string;
};

export const providers: Provider[] = [
  { id: "p1", name: "Marcelo Gómez", categorySlug: "plomeria", city: "Palermo, CABA", rating: 4.9, reviews: 132, jobsDone: 214, verified: true, responseTime: "Responde en ~20 min", bio: "15 años de experiencia en instalaciones sanitarias y urgencias.", initials: "MG" },
  { id: "p2", name: "Laura Fernández", categorySlug: "plomeria", city: "Belgrano, CABA", rating: 4.8, reviews: 87, jobsDone: 140, verified: true, responseTime: "Responde en ~35 min", bio: "Especialista en destapaciones y termotanques.", initials: "LF" },
  { id: "p3", name: "Diego Torres", categorySlug: "electricidad", city: "Villa Urquiza, CABA", rating: 5.0, reviews: 64, jobsDone: 98, verified: true, responseTime: "Responde en ~15 min", bio: "Electricista matriculado, especializado en tableros y certificaciones.", initials: "DT" },
  { id: "p4", name: "Sofía Ramírez", categorySlug: "electricidad", city: "Caballito, CABA", rating: 4.7, reviews: 51, jobsDone: 76, verified: true, responseTime: "Responde en ~40 min", bio: "Instalaciones eléctricas residenciales y comerciales.", initials: "SR" },
  { id: "p5", name: "Roberto Álvarez", categorySlug: "gas", city: "San Isidro, GBA", rating: 4.9, reviews: 110, jobsDone: 190, verified: true, responseTime: "Responde en ~25 min", bio: "Gasista matriculado, habilitaciones y detección de pérdidas.", initials: "RA" },
  { id: "p6", name: "Valentina Castro", categorySlug: "gas", city: "Vicente López, GBA", rating: 4.6, reviews: 39, jobsDone: 58, verified: true, responseTime: "Responde en ~50 min", bio: "Instalación y service de calefones y calderas.", initials: "VC" },
  { id: "p7", name: "Julián Pérez", categorySlug: "pintura", city: "Almagro, CABA", rating: 4.8, reviews: 73, jobsDone: 121, verified: true, responseTime: "Responde en ~30 min", bio: "Pintura de interiores y frentes, presupuesto por m².", initials: "JP" },
  { id: "p8", name: "Camila Sosa", categorySlug: "albanileria", city: "Quilmes, GBA", rating: 4.7, reviews: 45, jobsDone: 70, verified: true, responseTime: "Responde en ~1 hora", bio: "Refacciones, revoques y reparación de humedad.", initials: "CS" },
  { id: "p9", name: "Nicolás Medina", categorySlug: "carpinteria", city: "Boedo, CABA", rating: 4.9, reviews: 58, jobsDone: 92, verified: true, responseTime: "Responde en ~20 min", bio: "Muebles a medida y restauración de madera.", initials: "NM" },
  { id: "p10", name: "Federico Luna", categorySlug: "cerrajeria", city: "Recoleta, CABA", rating: 4.8, reviews: 96, jobsDone: 160, verified: true, responseTime: "Responde en ~10 min", bio: "Aperturas de urgencia disponible las 24 horas.", initials: "FL" },
  { id: "p11", name: "Agustina Rojas", categorySlug: "climatizacion", city: "Tigre, GBA", rating: 4.7, reviews: 34, jobsDone: 55, verified: true, responseTime: "Responde en ~45 min", bio: "Instalación y service de equipos split.", initials: "AR" },
  { id: "p12", name: "Martín Ibáñez", categorySlug: "jardineria", city: "San Fernando, GBA", rating: 4.6, reviews: 28, jobsDone: 47, verified: true, responseTime: "Responde en ~1 hora", bio: "Mantenimiento de jardines y poda especializada.", initials: "MI" },
  { id: "p13", name: "Paula Giménez", categorySlug: "limpieza", city: "Núñez, CABA", rating: 4.9, reviews: 102, jobsDone: 175, verified: true, responseTime: "Responde en ~15 min", bio: "Limpieza de hogares y fin de obra.", initials: "PG" },
];

export function getProvidersByCategory(categorySlug: string): Provider[] {
  return providers.filter((p) => p.categorySlug === categorySlug);
}
