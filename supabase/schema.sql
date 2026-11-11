-- HADO VERSE: private registration data with public count-only API
-- Run in Supabase SQL Editor as project owner.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- Migrate an earlier public registration table without deleting existing records.
do $$
begin
  if to_regclass('public.hado_registrations') is not null
     and to_regclass('private.hado_registrations') is null then
    alter table public.hado_registrations set schema private;
  end if;
end $$;

create table if not exists private.hado_registrations (
  id bigint generated always as identity primary key,
  device_id uuid not null unique,
  nickname text not null check (char_length(nickname) between 2 and 20),
  created_at timestamptz not null default now()
);

alter table private.hado_registrations enable row level security;
revoke all on private.hado_registrations from public, anon, authenticated;
revoke all on all sequences in schema private from public, anon, authenticated;

-- Remove old public function definitions, if any.
drop function if exists public.hado_register(uuid, text);
drop function if exists public.hado_registration_count();

-- SECURITY DEFINER functions run as their owner, bypassing RLS.
-- Only return the registering client's own acknowledgement, never stored rows.
create function public.hado_register(p_device_id uuid, p_nickname text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_created_at timestamptz;
begin
  if p_device_id is null or p_nickname is null
      or char_length(btrim(p_nickname)) not between 2 and 20 then
    raise exception 'Invalid registration';
  end if;

  insert into private.hado_registrations (device_id, nickname)
  values (p_device_id, btrim(p_nickname))
  on conflict (device_id) do nothing
  returning created_at into v_created_at;

  if v_created_at is null then
    return jsonb_build_object('already_registered', true);
  end if;

  return jsonb_build_object(
    'already_registered', false,
    'nickname', btrim(p_nickname),
    'created_at', v_created_at
  );
end;
$$;

-- Only disclose aggregate counts; never usernames, IDs, or submission dates.
create function public.hado_registration_count()
returns bigint
language sql
security definer
set search_path = ''
as $$
  select count(*) from private.hado_registrations;
$$;

revoke all on function public.hado_register(uuid, text) from public;
revoke all on function public.hado_registration_count() from public;
grant execute on function public.hado_register(uuid, text) to anon;
grant execute on function public.hado_registration_count() to anon;

-- Optional: when authenticated users also need public counts, enable this line:
-- grant execute on function public.hado_registration_count() to authenticated;

-- Verification in Supabase SQL Editor:
-- select count(*) from private.hado_registrations;
