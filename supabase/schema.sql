-- Studio Wytes — THE CREW
-- Run this in the Supabase SQL editor to provision the applications table.

create extension if not exists "pgcrypto";

create type application_status as enum (
  'pending',
  'shortlisted',
  'selected',
  'rejected'
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  role text not null,
  portfolio_url text,
  social_url text,
  why_join text not null,
  skills text,
  availability text,
  status application_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- Prevent duplicate applications from the same email address.
create unique index if not exists applications_email_key
  on applications (lower(email));

-- Row Level Security: lock the table down. All writes/reads happen
-- through the server-side Supabase client using the service role key,
-- never directly from the browser.
alter table applications enable row level security;

-- No policies are defined on purpose — with RLS enabled and no policies,
-- the anon/public key has zero access. Only the service role key
-- (server-only, never exposed to the client) can read or write.
