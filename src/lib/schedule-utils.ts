import type { AvailabilityBlock, Booking, DateOverride, DayOfWeek } from "@/lib/schedule-types";

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(total: number): string {
  const h = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const weekdayFormatter = new Intl.DateTimeFormat("es-AR", { weekday: "long" });
const dayMonthFormatter = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long" });

export function formatDateEs(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const weekday = weekdayFormatter.format(date);
  const dayMonth = dayMonthFormatter.format(date);
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${dayMonth}`;
}

export type DaySlots = {
  date: string;
  dayOfWeek: DayOfWeek;
  slots: {
    blockId: string;
    label: string;
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
};

export function generateUpcomingSlots(
  providerId: string,
  blocks: AvailabilityBlock[],
  overrides: DateOverride[],
  bookings: Booking[],
  daysAhead = 21
): DaySlots[] {
  const providerBlocks = blocks.filter((b) => b.providerId === providerId && b.visible);
  const blockedDates = new Set(overrides.filter((o) => o.providerId === providerId).map((o) => o.date));
  const takenSlots = new Set(
    bookings
      .filter((b) => b.providerId === providerId && b.status !== "rechazada" && b.status !== "cancelada")
      .map((b) => `${b.date}__${b.startTime}`)
  );

  const days: DaySlots[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay() as DayOfWeek;
    const isoDate = toISODate(date);

    if (blockedDates.has(isoDate)) continue;

    const dayBlocks = providerBlocks.filter((b) => b.dayOfWeek === dayOfWeek);
    if (dayBlocks.length === 0) continue;

    const slots: DaySlots["slots"] = [];
    for (const block of dayBlocks) {
      const start = timeToMinutes(block.startTime);
      const end = timeToMinutes(block.endTime);
      for (let t = start; t + block.slotMinutes <= end; t += block.slotMinutes) {
        const startTime = minutesToTime(t);
        const endTime = minutesToTime(t + block.slotMinutes);
        slots.push({
          blockId: block.id,
          label: block.label,
          startTime,
          endTime,
          available: !takenSlots.has(`${isoDate}__${startTime}`),
        });
      }
    }

    if (slots.length > 0) {
      days.push({ date: isoDate, dayOfWeek, slots });
    }
  }

  return days;
}
