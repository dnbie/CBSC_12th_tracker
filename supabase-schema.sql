create extension if not exists "pgcrypto";

create table if not exists public.study_progress (
  user_id uuid not null references auth.users on delete cascade,
  concept_key text not null,
  status text not null default 'not_started',
  updated_at timestamptz not null default now(),
  primary key (user_id, concept_key)
);

alter table public.study_progress enable row level security;

create policy "Users can manage their own progress"
on public.study_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create table if not exists public.study_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  concept_key text not null,
  from_status text not null,
  to_status text not null,
  created_at timestamptz not null default now()
);

alter table public.study_activity enable row level security;

create policy "Users can manage their own activity"
on public.study_activity
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);