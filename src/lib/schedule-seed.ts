import { providers } from "@/lib/providers";
import type { AvailabilityBlock } from "@/lib/schedule-types";

let counter = 0;
function nextId(prefix: string) {
  counter += 1;
  return `${prefix}-seed-${counter}`;
}

export function seedAvailabilityBlocks(): AvailabilityBlock[] {
  const blocks: AvailabilityBlock[] = [];

  for (const provider of providers) {
    if (provider.id === "p1") {
      blocks.push(
        {
          id: nextId("av"),
          providerId: provider.id,
          dayOfWeek: 1,
          startTime: "16:30",
          endTime: "20:00",
          label: "Visita de chequeo",
          slotMinutes: 45,
          visible: true,
        },
        {
          id: nextId("av"),
          providerId: provider.id,
          dayOfWeek: 3,
          startTime: "16:30",
          endTime: "20:00",
          label: "Visita de chequeo",
          slotMinutes: 45,
          visible: true,
        },
        {
          id: nextId("av"),
          providerId: provider.id,
          dayOfWeek: 4,
          startTime: "09:00",
          endTime: "17:45",
          label: "Arreglo grande",
          slotMinutes: 120,
          visible: true,
        },
        {
          id: nextId("av"),
          providerId: provider.id,
          dayOfWeek: 5,
          startTime: "09:00",
          endTime: "17:45",
          label: "Arreglo grande",
          slotMinutes: 120,
          visible: true,
        }
      );
      continue;
    }

    blocks.push(
      {
        id: nextId("av"),
        providerId: provider.id,
        dayOfWeek: 2,
        startTime: "09:00",
        endTime: "13:00",
        label: "Visita de chequeo",
        slotMinutes: 60,
        visible: true,
      },
      {
        id: nextId("av"),
        providerId: provider.id,
        dayOfWeek: 4,
        startTime: "14:00",
        endTime: "18:00",
        label: "Trabajo programado",
        slotMinutes: 90,
        visible: true,
      },
      {
        id: nextId("av"),
        providerId: provider.id,
        dayOfWeek: 6,
        startTime: "09:00",
        endTime: "12:00",
        label: "Solo urgencias",
        slotMinutes: 60,
        visible: false,
      }
    );
  }

  return blocks;
}
