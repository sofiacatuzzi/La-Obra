export const SCHEDULE_STORAGE_KEYS = {
  availability: "la-obra:availability",
  overrides: "la-obra:overrides",
  bookings: "la-obra:bookings",
  messages: "la-obra:messages",
} as const;

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const dayLabels: Record<DayOfWeek, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export type AvailabilityBlock = {
  id: string;
  providerId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  label: string;
  slotMinutes: number;
  visible: boolean;
};

export type DateOverride = {
  id: string;
  providerId: string;
  date: string;
  note: string;
};

export type BookingStatus = "pendiente" | "cotizada" | "confirmada" | "rechazada" | "cancelada";

export type Booking = {
  id: string;
  providerId: string;
  providerName: string;
  categorySlug: string;
  blockLabel: string;
  date: string;
  startTime: string;
  endTime: string;
  clientName: string;
  clientEmail: string;
  jobDescription: string;
  status: BookingStatus;
  quoteAmount?: number;
  depositPaid?: boolean;
  createdAt: string;
};

export type ChatMessageKind = "texto" | "cotizacion" | "sistema";

export type ChatMessage = {
  id: string;
  bookingId: string;
  sender: "cliente" | "profesional";
  kind: ChatMessageKind;
  text?: string;
  amount?: number;
  createdAt: string;
};
