-- ========================================================================
-- ideoMap: Community Submissions Table Schema
-- For Supabase (PostgreSQL)
--
-- Instructions:
-- 1. Create a free Supabase project at https://supabase.com
-- 2. Open "SQL Editor" in your Supabase dashboard
-- 3. Paste and run this entire file
-- 4. Copy your Project URL & Anon Public Key from Project Settings -> API
-- 5. Paste them into assets/js/config.js (SUPABASE_URL & SUPABASE_ANON_KEY)
-- ========================================================================

-- 1. Create table to store anonymous quiz results
create table if not exists public.quiz_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now() not null,
  ideology text not null,
  overall_band smallint not null,
  overall_score smallint not null,
  econ_score smallint not null,
  social_score smallint not null,
  civil_score smallint not null,
  world_score smallint not null,
  lang text not null default 'en'
);

-- 2. Indexes for fast aggregation and recent feeds
create index if not exists idx_quiz_submissions_created_at 
  on public.quiz_submissions (created_at desc);

create index if not exists idx_quiz_submissions_ideology 
  on public.quiz_submissions (ideology);

-- 3. Enable Row Level Security (RLS)
alter table public.quiz_submissions enable row level security;

-- 4. Allow anonymous visitors to submit their quiz result
drop policy if exists "Allow anonymous insert" on public.quiz_submissions;
create policy "Allow anonymous insert"
  on public.quiz_submissions
  for insert
  to anon
  with check (true);

-- 5. Allow anonymous visitors to read results for community statistics
drop policy if exists "Allow anonymous select for stats" on public.quiz_submissions;
create policy "Allow anonymous select for stats"
  on public.quiz_submissions
  for select
  to anon
  using (true);

-- ========================================================================
-- Optional: Seed 100 sample quiz results across diverse ideologies
-- This gives you an immediate realistic dataset of 100 users!
-- You can keep or delete these sample records anytime.
-- ========================================================================

insert into public.quiz_submissions (
  created_at, ideology, overall_band, overall_score, econ_score, social_score, civil_score, world_score, lang
) values
  -- Social Democrats & Democratic Socialists
  (now() - interval '2 minutes', 'socdem', 2, -28, -45, -35, -20, -30, 'en'),
  (now() - interval '8 minutes', 'demsoc', 1, -52, -70, -50, -40, -45, 'hi'),
  (now() - interval '14 minutes', 'socdem', 2, -22, -40, -25, -15, -20, 'en'),
  (now() - interval '23 minutes', 'socdem', 2, -18, -35, -20, -10, -15, 'en'),
  (now() - interval '31 minutes', 'demsoc', 1, -48, -65, -45, -35, -40, 'hi'),
  (now() - interval '45 minutes', 'socdem', 2, -30, -50, -30, -25, -25, 'en'),
  (now() - interval '58 minutes', 'socdem', 2, -24, -42, -28, -18, -22, 'hi'),
  (now() - interval '1 hour', 'demsoc', 1, -55, -75, -55, -42, -48, 'en'),
  (now() - interval '1 hour 15 minutes', 'socdem', 2, -20, -38, -22, -12, -18, 'en'),
  (now() - interval '1 hour 30 minutes', 'socdem', 2, -26, -44, -30, -20, -24, 'hi'),
  (now() - interval '1 hour 45 minutes', 'socdem', 2, -16, -32, -18, -8, -14, 'en'),
  (now() - interval '2 hours', 'demsoc', 1, -46, -62, -42, -32, -38, 'en'),
  (now() - interval '2 hours 10 minutes', 'socdem', 2, -25, -45, -30, -20, -25, 'en'),
  (now() - interval '2 hours 25 minutes', 'socdem', 2, -21, -39, -24, -14, -20, 'hi'),
  
  -- Centrists & Progressives
  (now() - interval '2 hours 40 minutes', 'centrist', 3, 2, 0, 5, -5, 5, 'en'),
  (now() - interval '3 hours', 'progressive', 2, -25, -20, -60, -50, -45, 'en'),
  (now() - interval '3 hours 15 minutes', 'centrist', 3, -4, -5, -5, 0, -5, 'hi'),
  (now() - interval '3 hours 30 minutes', 'progressive', 2, -30, -25, -65, -55, -50, 'en'),
  (now() - interval '3 hours 50 minutes', 'centrist', 3, 5, 8, 2, -2, 5, 'en'),
  (now() - interval '4 hours 10 minutes', 'progressive', 2, -22, -18, -55, -45, -40, 'hi'),
  (now() - interval '4 hours 25 minutes', 'centrist', 3, 0, 2, -2, 0, 0, 'en'),
  (now() - interval '4 hours 45 minutes', 'progressive', 2, -28, -22, -62, -52, -48, 'en'),
  (now() - interval '5 hours', 'centrist', 3, -2, -4, 0, 2, -5, 'hi'),
  (now() - interval '5 hours 20 minutes', 'centrist', 3, 8, 12, 5, 0, 5, 'en'),
  (now() - interval '5 hours 40 minutes', 'progressive', 2, -20, -15, -50, -40, -35, 'en'),
  
  -- Classical Liberals & Libertarians
  (now() - interval '6 hours', 'classical', 4, 18, 50, -20, -55, -30, 'en'),
  (now() - interval '6 hours 25 minutes', 'libertarian', 4, 30, 75, -35, -80, -20, 'en'),
  (now() - interval '6 hours 50 minutes', 'classical', 4, 15, 45, -15, -50, -25, 'hi'),
  (now() - interval '7 hours 15 minutes', 'classical', 4, 22, 55, -25, -60, -35, 'en'),
  (now() - interval '7 hours 40 minutes', 'libertarian', 5, 38, 82, -40, -85, -25, 'en'),
  (now() - interval '8 hours', 'classical', 4, 12, 40, -10, -45, -20, 'en'),
  (now() - interval '8 hours 30 minutes', 'classical', 4, 25, 58, -28, -62, -38, 'hi'),
  (now() - interval '9 hours', 'libertarian', 4, 28, 70, -30, -75, -15, 'en'),
  (now() - interval '9 hours 30 minutes', 'classical', 4, 16, 48, -18, -52, -28, 'en'),
  
  -- Conservatives & Liberal Conservatives
  (now() - interval '10 hours', 'libcon', 4, 24, 40, 25, 10, 12, 'hi'),
  (now() - interval '10 hours 30 minutes', 'conservative', 5, 42, 28, 65, 40, 35, 'en'),
  (now() - interval '11 hours', 'libcon', 4, 20, 35, 20, 8, 10, 'en'),
  (now() - interval '11 hours 30 minutes', 'conservative', 5, 48, 32, 72, 48, 42, 'hi'),
  (now() - interval '12 hours', 'libcon', 4, 26, 42, 28, 12, 15, 'en'),
  (now() - interval '12 hours 30 minutes', 'conservative', 5, 38, 25, 60, 38, 32, 'en'),
  (now() - interval '13 hours', 'libcon', 4, 18, 30, 18, 5, 8, 'hi'),
  (now() - interval '13 hours 30 minutes', 'conservative', 5, 45, 30, 68, 45, 38, 'en'),
  (now() - interval '14 hours', 'libcon', 4, 22, 38, 22, 10, 12, 'en'),
  (now() - interval '14 hours 30 minutes', 'conservative', 5, 50, 35, 75, 50, 45, 'hi'),
  
  -- National Conservatives & Left Nationalists
  (now() - interval '15 hours', 'natcon', 5, 45, 22, 58, 42, 68, 'hi'),
  (now() - interval '15 hours 30 minutes', 'leftnat', 2, -15, -50, 30, 35, 55, 'en'),
  (now() - interval '16 hours', 'natcon', 5, 52, 28, 62, 48, 72, 'hi'),
  (now() - interval '16 hours 30 minutes', 'natcon', 5, 40, 20, 52, 38, 65, 'en'),
  (now() - interval '17 hours', 'leftnat', 2, -20, -55, 35, 40, 60, 'hi'),
  (now() - interval '17 hours 30 minutes', 'natcon', 5, 48, 25, 60, 45, 70, 'en'),
  (now() - interval '18 hours', 'natcon', 5, 38, 18, 50, 35, 62, 'hi'),
  
  -- Gandhian Socialism & Communitarians
  (now() - interval '18 hours 30 minutes', 'gandhian', 2, -22, -32, 12, -55, -5, 'hi'),
  (now() - interval '19 hours', 'communitarian', 3, 8, -22, 45, 20, 2, 'en'),
  (now() - interval '19 hours 30 minutes', 'gandhian', 2, -25, -35, 15, -60, -8, 'hi'),
  (now() - interval '20 hours', 'communitarian', 3, 5, -25, 48, 22, 0, 'en'),
  (now() - interval '20 hours 30 minutes', 'gandhian', 2, -20, -30, 10, -50, -2, 'hi'),
  (now() - interval '21 hours', 'gandhian', 2, -28, -38, 18, -62, -10, 'en'),
  
  -- Libertarian Socialists & Communists
  (now() - interval '21 hours 30 minutes', 'libsoc', 1, -78, -82, -72, -88, -68, 'en'),
  (now() - interval '22 hours', 'communism', 0, -85, -92, -28, 75, -28, 'en'),
  (now() - interval '22 hours 30 minutes', 'libsoc', 1, -72, -78, -68, -82, -62, 'hi'),
  (now() - interval '23 hours', 'communism', 0, -90, -95, -32, 82, -32, 'en'),
  (now() - interval '23 hours 30 minutes', 'libsoc', 1, -75, -80, -70, -85, -65, 'en'),
  
  -- Authoritarian Capitalism & Authoritarian Nationalism
  (now() - interval '1 day', 'authcap', 5, 48, 52, 28, 72, 42, 'en'),
  (now() - interval '1 day 1 hour', 'authnat', 6, 68, 12, 82, 92, 92, 'hi'),
  (now() - interval '1 day 2 hours', 'authcap', 5, 42, 48, 25, 68, 38, 'en'),
  (now() - interval '1 day 3 hours', 'authnat', 6, 72, 18, 88, 96, 95, 'en'),
  
  -- Additional varied submissions to reach 100 entries
  (now() - interval '1 day 4 hours', 'socdem', 2, -26, -42, -28, -18, -24, 'en'),
  (now() - interval '1 day 5 hours', 'classical', 4, 18, 52, -22, -58, -32, 'hi'),
  (now() - interval '1 day 6 hours', 'centrist', 3, 2, 0, 4, -2, 2, 'en'),
  (now() - interval '1 day 7 hours', 'conservative', 5, 42, 28, 65, 42, 36, 'en'),
  (now() - interval '1 day 8 hours', 'progressive', 2, -24, -20, -58, -48, -42, 'hi'),
  (now() - interval '1 day 9 hours', 'demsoc', 1, -50, -68, -48, -38, -42, 'en'),
  (now() - interval '1 day 10 hours', 'natcon', 5, 46, 24, 58, 44, 68, 'hi'),
  (now() - interval '1 day 11 hours', 'libcon', 4, 24, 38, 26, 12, 14, 'en'),
  (now() - interval '1 day 12 hours', 'socdem', 2, -22, -38, -24, -14, -20, 'hi'),
  (now() - interval '1 day 13 hours', 'libertarian', 4, 32, 78, -38, -82, -22, 'en'),
  (now() - interval '1 day 14 hours', 'centrist', 3, -1, 2, -3, 0, -2, 'en'),
  (now() - interval '1 day 15 hours', 'gandhian', 2, -24, -34, 14, -58, -6, 'hi'),
  (now() - interval '1 day 16 hours', 'leftnat', 2, -18, -52, 32, 38, 58, 'en'),
  (now() - interval '1 day 17 hours', 'classical', 4, 20, 54, -24, -60, -34, 'hi'),
  (now() - interval '1 day 18 hours', 'socdem', 2, -28, -46, -32, -22, -26, 'en'),
  (now() - interval '1 day 19 hours', 'progressive', 2, -26, -22, -62, -52, -46, 'en'),
  (now() - interval '1 day 20 hours', 'conservative', 5, 44, 30, 68, 44, 38, 'hi'),
  (now() - interval '1 day 21 hours', 'libcon', 4, 20, 34, 22, 8, 10, 'en'),
  (now() - interval '1 day 22 hours', 'demsoc', 1, -48, -66, -46, -36, -40, 'hi'),
  (now() - interval '1 day 23 hours', 'centrist', 3, 4, 6, 2, -1, 3, 'en'),
  (now() - interval '2 days', 'socdem', 2, -24, -40, -26, -16, -22, 'en'),
  (now() - interval '2 days 1 hour', 'natcon', 5, 42, 22, 54, 40, 66, 'hi'),
  (now() - interval '2 days 2 hours', 'classical', 4, 16, 48, -18, -52, -28, 'en'),
  (now() - interval '2 days 3 hours', 'progressive', 2, -22, -18, -56, -46, -40, 'en'),
  (now() - interval '2 days 4 hours', 'libertarian', 4, 28, 72, -32, -78, -18, 'hi'),
  (now() - interval '2 days 5 hours', 'communitarian', 3, 6, -24, 46, 20, 2, 'en'),
  (now() - interval '2 days 6 hours', 'gandhian', 2, -26, -36, 16, -60, -8, 'hi'),
  (now() - interval '2 days 7 hours', 'conservative', 5, 46, 32, 70, 46, 40, 'en'),
  (now() - interval '2 days 8 hours', 'socdem', 2, -20, -36, -22, -12, -18, 'en'),
  (now() - interval '2 days 9 hours', 'libcon', 4, 22, 36, 24, 10, 12, 'hi'),
  (now() - interval '2 days 10 hours', 'demsoc', 1, -52, -70, -50, -40, -44, 'en'),
  (now() - interval '2 days 11 hours', 'centrist', 3, 0, 0, 0, 0, 0, 'hi'),
  (now() - interval '2 days 12 hours', 'progressive', 2, -28, -24, -64, -54, -48, 'en'),
  (now() - interval '2 days 13 hours', 'classical', 4, 22, 56, -26, -62, -36, 'en'),
  (now() - interval '2 days 14 hours', 'natcon', 5, 44, 24, 56, 42, 68, 'hi');
