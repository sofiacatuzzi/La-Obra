-- La Obra — esquema inicial de Supabase
-- Corré este archivo completo en el SQL Editor de tu proyecto de Supabase
-- (Dashboard → SQL Editor → New query → pegar y ejecutar).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------

create type user_role as enum ('cliente', 'profesional');
create type booking_status as enum ('pendiente', 'cotizada', 'confirmada', 'rechazada', 'cancelada');
create type message_kind as enum ('texto', 'cotizacion', 'sistema');

-- ---------------------------------------------------------------------
-- profiles: una fila por usuario autenticado (auth.users)
-- ---------------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'cliente',
  full_name text not null,
  phone text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles_select_own_or_public"
  on profiles for select
  using (true);

create policy "profiles_insert_own"
  on profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = id);

-- ---------------------------------------------------------------------
-- provider_profiles: datos adicionales para usuarios con role='profesional'
-- ---------------------------------------------------------------------

create table provider_profiles (
  id uuid primary key references profiles (id) on delete cascade,
  category_slug text not null,
  city text,
  bio text,
  license_number text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table provider_profiles enable row level security;

create policy "provider_profiles_public_read"
  on provider_profiles for select
  using (true);

create policy "provider_profiles_owner_write"
  on provider_profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- availability_blocks: agenda semanal recurrente de cada profesional
-- ---------------------------------------------------------------------

create table availability_blocks (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references provider_profiles (id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  label text not null,
  slot_minutes int not null check (slot_minutes > 0),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

alter table availability_blocks enable row level security;

create policy "availability_public_read_visible"
  on availability_blocks for select
  using (visible = true);

create policy "availability_owner_full_access"
  on availability_blocks for all
  using (auth.uid() = provider_id)
  with check (auth.uid() = provider_id);

-- ---------------------------------------------------------------------
-- date_overrides: fechas puntuales bloqueadas (vacaciones, feriados)
-- ---------------------------------------------------------------------

create table date_overrides (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references provider_profiles (id) on delete cascade,
  date date not null,
  note text,
  created_at timestamptz not null default now()
);

alter table date_overrides enable row level security;

create policy "date_overrides_owner_full_access"
  on date_overrides for all
  using (auth.uid() = provider_id)
  with check (auth.uid() = provider_id);

-- ---------------------------------------------------------------------
-- bookings: solicitudes/reservas entre cliente y profesional
-- ---------------------------------------------------------------------

create table bookings (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references provider_profiles (id) on delete cascade,
  client_id uuid not null references profiles (id) on delete cascade,
  block_label text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  job_description text,
  status booking_status not null default 'pendiente',
  quote_amount numeric(12, 2),
  deposit_paid boolean not null default false,
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

create policy "bookings_participants_read"
  on bookings for select
  using (auth.uid() = client_id or auth.uid() = provider_id);

create policy "bookings_client_insert"
  on bookings for insert
  with check (auth.uid() = client_id);

create policy "bookings_participants_update"
  on bookings for update
  using (auth.uid() = client_id or auth.uid() = provider_id);

-- ---------------------------------------------------------------------
-- chat_messages: mensajes y cotizaciones dentro de una reserva
-- ---------------------------------------------------------------------

create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings (id) on delete cascade,
  sender_id uuid references profiles (id),
  sender_role user_role not null,
  kind message_kind not null default 'texto',
  text_content text,
  amount numeric(12, 2),
  created_at timestamptz not null default now()
);

alter table chat_messages enable row level security;

create policy "chat_messages_participants_read"
  on chat_messages for select
  using (
    exists (
      select 1 from bookings b
      where b.id = chat_messages.booking_id
        and (auth.uid() = b.client_id or auth.uid() = b.provider_id)
    )
  );

create policy "chat_messages_participants_insert"
  on chat_messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from bookings b
      where b.id = chat_messages.booking_id
        and (auth.uid() = b.client_id or auth.uid() = b.provider_id)
    )
  );

-- ---------------------------------------------------------------------
-- Índices para las consultas más frecuentes
-- ---------------------------------------------------------------------

create index idx_availability_provider on availability_blocks (provider_id);
create index idx_overrides_provider on date_overrides (provider_id);
create index idx_bookings_provider on bookings (provider_id);
create index idx_bookings_client on bookings (client_id);
create index idx_messages_booking on chat_messages (booking_id);

-- ---------------------------------------------------------------------
-- Realtime: habilitar para que el chat se actualice en vivo
-- ---------------------------------------------------------------------

alter publication supabase_realtime add table chat_messages;
alter publication supabase_realtime add table bookings;
