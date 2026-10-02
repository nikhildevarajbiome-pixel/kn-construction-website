-- KN Construction and Builders: run this in the Supabase SQL editor.

create extension if not exists pgcrypto;

-- Admin roles: a user can manage enquiries only if their auth.users id is listed here.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  phone text not null check (phone ~ '^\+91[6-9][0-9]{9}$'),
  email text check (email is null or char_length(email) <= 254),
  service text not null,
  message text not null check (char_length(message) between 10 and 2000),
  status text not null default 'New'
    check (status in ('New','Contacted','In Progress','Completed','Cancelled')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_updated_at();

-- Helper used by policies. SECURITY DEFINER so it can read admins without recursion.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.enquiries enable row level security;
alter table public.admins enable row level security;

-- Start from zero privileges, then grant only what is needed.
revoke all on public.enquiries from anon, authenticated;
revoke all on public.admins from anon, authenticated;
grant insert on public.enquiries to anon, authenticated;
grant select, update, delete on public.enquiries to authenticated;
grant select on public.admins to authenticated;

-- Public visitors: INSERT only, and only as a brand-new enquiry.
drop policy if exists "public can submit enquiries" on public.enquiries;
create policy "public can submit enquiries" on public.enquiries
  for insert to anon, authenticated
  with check (status = 'New' and admin_notes is null);

-- Admins only: read, update, delete.
drop policy if exists "admins read enquiries" on public.enquiries;
create policy "admins read enquiries" on public.enquiries
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update enquiries" on public.enquiries;
create policy "admins update enquiries" on public.enquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete enquiries" on public.enquiries;
create policy "admins delete enquiries" on public.enquiries
  for delete to authenticated using (public.is_admin());

-- A signed-in user may see only their own admin row (used for the login check).
drop policy if exists "users read own admin row" on public.admins;
create policy "users read own admin row" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- No insert/update/delete policies on admins: add admins from the SQL editor only (see README):
--   insert into public.admins (user_id) select id from auth.users where email = 'owner@example.com';
