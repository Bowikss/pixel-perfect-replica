-- Roles
create type public.app_role as enum ('super_admin','company_admin','employee','partner');
create type public.celebration_style as enum ('loud','small','quiet');
create type public.holiday_shift as enum ('friday_before','monday_after');

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  city text,
  delivery_window text not null default '10:00-14:00',
  budget_cents integer not null default 3000,
  celebrate_birthday boolean not null default true,
  celebrate_anniversary boolean not null default true,
  celebrate_name_day boolean not null default true,
  celebrate_new_hire boolean not null default true,
  holiday_shift public.holiday_shift not null default 'friday_before',
  invite_token text not null unique default encode(gen_random_bytes(12),'hex'),
  locale text not null default 'en',
  trial_ends_at timestamptz not null default now() + interval '14 days',
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);

create table public.offices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  address text not null,
  city text,
  created_at timestamptz not null default now()
);

create table public.employee_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  first_name text not null,
  last_name text,
  email text,
  birth_date date,
  hide_birth_year boolean not null default true,
  start_date date,
  office_id uuid references public.offices(id) on delete set null,
  is_remote boolean not null default false,
  home_address text,
  team text,
  cake_flavour text,
  dietary text[] not null default '{}',
  alt_treat text,
  celebration_style public.celebration_style not null default 'loud',
  name_day_month smallint,
  name_day_day smallint,
  dietary_notes text,
  profile_complete boolean not null default false,
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table public.name_days (
  id uuid primary key default gen_random_uuid(),
  month smallint not null,
  day smallint not null,
  name text not null,
  unique (month, day, name)
);

-- helper functions
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.current_company_id()
returns uuid language sql stable security definer set search_path = public as $$
  select company_id from public.profiles where id = auth.uid()
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- grants
grant select, insert, update, delete on public.companies to authenticated;
grant all on public.companies to service_role;
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant select, insert on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
grant select, insert, update, delete on public.offices to authenticated;
grant all on public.offices to service_role;
grant select, insert, update, delete on public.employee_profiles to authenticated;
grant all on public.employee_profiles to service_role;
grant select on public.name_days to authenticated;
grant select on public.name_days to anon;
grant all on public.name_days to service_role;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.offices enable row level security;
alter table public.employee_profiles enable row level security;
alter table public.name_days enable row level security;

-- profiles
create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "company members read" on public.profiles for select to authenticated using (company_id is not null and company_id = public.current_company_id());
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid());

-- user_roles
create policy "own roles read" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "own roles insert" on public.user_roles for insert to authenticated with check (user_id = auth.uid());

-- companies
create policy "members read company" on public.companies for select to authenticated using (id = public.current_company_id());
create policy "create company" on public.companies for insert to authenticated with check (true);
create policy "admin update company" on public.companies for update to authenticated
  using (id = public.current_company_id() and public.has_role(auth.uid(),'company_admin'));

-- offices
create policy "members read offices" on public.offices for select to authenticated using (company_id = public.current_company_id());
create policy "admin write offices" on public.offices for all to authenticated
  using (company_id = public.current_company_id() and public.has_role(auth.uid(),'company_admin'))
  with check (company_id = public.current_company_id() and public.has_role(auth.uid(),'company_admin'));

-- employee_profiles
create policy "read own employee profile" on public.employee_profiles for select to authenticated using (user_id = auth.uid());
create policy "admin read company employees" on public.employee_profiles for select to authenticated
  using (company_id = public.current_company_id() and public.has_role(auth.uid(),'company_admin'));
create policy "update own employee profile" on public.employee_profiles for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "insert own employee profile" on public.employee_profiles for insert to authenticated
  with check (company_id = public.current_company_id());
create policy "admin write employees" on public.employee_profiles for all to authenticated
  using (company_id = public.current_company_id() and public.has_role(auth.uid(),'company_admin'))
  with check (company_id = public.current_company_id() and public.has_role(auth.uid(),'company_admin'));

create policy "name days readable" on public.name_days for select using (true);
