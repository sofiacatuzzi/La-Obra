import { createClient } from "@/lib/supabase/client";
import type {
  AvailabilityBlock,
  Booking,
  BookingStatus,
  ChatMessage,
  ChatMessageKind,
  DateOverride,
  DayOfWeek,
} from "@/lib/schedule-types";

function hhmm(time: string): string {
  return time.slice(0, 5);
}

export type ProviderProfile = {
  id: string;
  fullName: string;
  categorySlug: string;
  city: string;
  bio: string;
  licenseNumber: string | null;
  verified: boolean;
};

export async function fetchProviderProfile(providerId: string): Promise<ProviderProfile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("provider_profiles")
    .select("id, category_slug, city, bio, license_number, verified, profiles(full_name)")
    .eq("id", providerId)
    .single();

  if (error || !data) return null;

  const profile = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;

  return {
    id: data.id,
    fullName: profile?.full_name ?? "Profesional",
    categorySlug: data.category_slug,
    city: data.city ?? "",
    bio: data.bio ?? "",
    licenseNumber: data.license_number,
    verified: data.verified,
  };
}

export async function fetchProvidersByCategory(categorySlug: string): Promise<ProviderProfile[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("provider_profiles")
    .select("id, category_slug, city, bio, license_number, verified, profiles(full_name)")
    .eq("category_slug", categorySlug);

  if (error || !data) return [];

  return data.map((row) => {
    const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
    return {
      id: row.id,
      fullName: profile?.full_name ?? "Profesional",
      categorySlug: row.category_slug,
      city: row.city ?? "",
      bio: row.bio ?? "",
      licenseNumber: row.license_number,
      verified: row.verified,
    };
  });
}

// ---------------------------------------------------------------------
// availability_blocks
// ---------------------------------------------------------------------

export async function fetchAvailabilityBlocks(providerId: string): Promise<AvailabilityBlock[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("availability_blocks")
    .select("*")
    .eq("provider_id", providerId)
    .order("day_of_week")
    .order("start_time");

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    providerId: row.provider_id,
    dayOfWeek: row.day_of_week as DayOfWeek,
    startTime: hhmm(row.start_time),
    endTime: hhmm(row.end_time),
    label: row.label,
    slotMinutes: row.slot_minutes,
    visible: row.visible,
  }));
}

export async function createAvailabilityBlock(block: Omit<AvailabilityBlock, "id">): Promise<void> {
  const supabase = createClient();
  await supabase.from("availability_blocks").insert({
    provider_id: block.providerId,
    day_of_week: block.dayOfWeek,
    start_time: block.startTime,
    end_time: block.endTime,
    label: block.label,
    slot_minutes: block.slotMinutes,
    visible: block.visible,
  });
}

export async function updateAvailabilityBlock(id: string, patch: Partial<AvailabilityBlock>): Promise<void> {
  const supabase = createClient();
  const payload: Record<string, unknown> = {};
  if (patch.dayOfWeek !== undefined) payload.day_of_week = patch.dayOfWeek;
  if (patch.startTime !== undefined) payload.start_time = patch.startTime;
  if (patch.endTime !== undefined) payload.end_time = patch.endTime;
  if (patch.label !== undefined) payload.label = patch.label;
  if (patch.slotMinutes !== undefined) payload.slot_minutes = patch.slotMinutes;
  if (patch.visible !== undefined) payload.visible = patch.visible;
  await supabase.from("availability_blocks").update(payload).eq("id", id);
}

export async function deleteAvailabilityBlock(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("availability_blocks").delete().eq("id", id);
}

// ---------------------------------------------------------------------
// date_overrides
// ---------------------------------------------------------------------

export async function fetchDateOverrides(providerId: string): Promise<DateOverride[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("date_overrides")
    .select("*")
    .eq("provider_id", providerId)
    .order("date");

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    providerId: row.provider_id,
    date: row.date,
    note: row.note ?? "",
  }));
}

export async function createDateOverride(override: Omit<DateOverride, "id">): Promise<void> {
  const supabase = createClient();
  await supabase.from("date_overrides").insert({
    provider_id: override.providerId,
    date: override.date,
    note: override.note,
  });
}

export async function deleteDateOverride(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("date_overrides").delete().eq("id", id);
}

// ---------------------------------------------------------------------
// bookings
// ---------------------------------------------------------------------

function mapBookingRow(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    providerId: row.provider_id as string,
    providerName: row.provider_name as string,
    categorySlug: row.category_slug as string,
    blockLabel: row.block_label as string,
    date: row.date as string,
    startTime: hhmm(row.start_time as string),
    endTime: hhmm(row.end_time as string),
    clientName: row.client_name as string,
    clientEmail: row.client_email as string,
    jobDescription: (row.job_description as string) ?? "",
    status: row.status as BookingStatus,
    quoteAmount: row.quote_amount === null ? undefined : Number(row.quote_amount),
    depositPaid: Boolean(row.deposit_paid),
    createdAt: row.created_at as string,
  };
}

export async function fetchBookingsForProvider(providerId: string): Promise<Booking[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapBookingRow);
}

export async function fetchBookingsForClient(clientId: string): Promise<Booking[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapBookingRow);
}

export async function createBooking(input: {
  providerId: string;
  providerName: string;
  categorySlug: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  blockLabel: string;
  date: string;
  startTime: string;
  endTime: string;
  jobDescription: string;
}): Promise<Booking | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      provider_id: input.providerId,
      provider_name: input.providerName,
      category_slug: input.categorySlug,
      client_id: input.clientId,
      client_name: input.clientName,
      client_email: input.clientEmail,
      block_label: input.blockLabel,
      date: input.date,
      start_time: input.startTime,
      end_time: input.endTime,
      job_description: input.jobDescription,
      status: "pendiente",
    })
    .select()
    .single();

  if (error || !data) return null;
  return mapBookingRow(data);
}

export async function updateBookingRecord(id: string, patch: Partial<Booking>): Promise<void> {
  const supabase = createClient();
  const payload: Record<string, unknown> = {};
  if (patch.status !== undefined) payload.status = patch.status;
  if (patch.quoteAmount !== undefined) payload.quote_amount = patch.quoteAmount;
  if (patch.depositPaid !== undefined) payload.deposit_paid = patch.depositPaid;
  await supabase.from("bookings").update(payload).eq("id", id);
}

// ---------------------------------------------------------------------
// chat_messages
// ---------------------------------------------------------------------

function mapMessageRow(row: Record<string, unknown>): ChatMessage {
  return {
    id: row.id as string,
    bookingId: row.booking_id as string,
    sender: row.sender_role as "cliente" | "profesional",
    kind: row.kind as ChatMessageKind,
    text: (row.text_content as string) ?? undefined,
    amount: row.amount === null ? undefined : Number(row.amount),
    createdAt: row.created_at as string,
  };
}

export async function fetchMessages(bookingId: string): Promise<ChatMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at");

  if (error || !data) return [];
  return data.map(mapMessageRow);
}

export async function sendMessage(input: {
  bookingId: string;
  senderId: string;
  senderRole: "cliente" | "profesional";
  kind: ChatMessageKind;
  text?: string;
  amount?: number;
}): Promise<void> {
  const supabase = createClient();
  await supabase.from("chat_messages").insert({
    booking_id: input.bookingId,
    sender_id: input.senderId,
    sender_role: input.senderRole,
    kind: input.kind,
    text_content: input.text ?? null,
    amount: input.amount ?? null,
  });
}

export function subscribeToMessages(bookingId: string, onInsert: (message: ChatMessage) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel(`booking-messages-${bookingId}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_messages", filter: `booking_id=eq.${bookingId}` },
      (payload) => onInsert(mapMessageRow(payload.new as Record<string, unknown>))
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToBooking(bookingId: string, onUpdate: (booking: Booking) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel(`booking-${bookingId}`)
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "bookings", filter: `id=eq.${bookingId}` },
      (payload) => onUpdate(mapBookingRow(payload.new as Record<string, unknown>))
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
