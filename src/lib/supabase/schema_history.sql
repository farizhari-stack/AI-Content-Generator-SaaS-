create table generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  image_url text, -- We might need to store image in storage bucket, but for now maybe just metadata or skip
  title text,
  description text,
  features text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table generations enable row level security;

create policy "Users can view own generations." on generations
  for select using (auth.uid() = user_id);

create policy "Users can insert own generations." on generations
  for insert with check (auth.uid() = user_id);
