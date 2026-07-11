-- Guarda una "foto" del nombre del profesional/cliente y la categoría en
-- el momento de la reserva. Evita depender de joins PostgREST anidados
-- (provider_id -> provider_profiles -> profiles y client_id -> profiles a
-- la vez) para listar reservas y chats, que son más frágiles de mantener.
-- Corré esto en el SQL Editor después de 001_schema.sql y 002_auth_trigger.sql.

alter table bookings
  add column if not exists provider_name text not null default '',
  add column if not exists category_slug text not null default '',
  add column if not exists client_name text not null default '',
  add column if not exists client_email text not null default '';
