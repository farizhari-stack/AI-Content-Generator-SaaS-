-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for user credits
create table user_credits (
  user_id uuid references auth.users not null primary key,
  credits_remaining integer default 3,
  last_updated timestamp with time zone default timezone('utc'::text, now())
);

alter table user_credits enable row level security;

create policy "Users can view their own credits." on user_credits
  for select using (auth.uid() = user_id);

-- Only service role should update credits mostly, but for now allow user to read.

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_credits (user_id, credits_remaining)
  values (new.id, 3); -- Give 3 free credits
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Subscriptions table (Simplified for now)
create table subscriptions (
  user_id uuid references auth.users not null primary key,
  plan_id text,
  status text check (status in ('active', 'inactive', 'past_due')),
  current_period_end timestamp with time zone
);

alter table subscriptions enable row level security;

create policy "Users can view own subscription." on subscriptions
  for select using (auth.uid() = user_id);
