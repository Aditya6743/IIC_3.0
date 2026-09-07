create table if not exists public.food_orders (
	order_id text primary key,
	team_name text not null check (char_length(team_name) between 1 and 120),
	room_no text not null check (char_length(room_no) between 1 and 40),
	total_amount numeric(10, 2) not null check (total_amount >= 0),
	items jsonb not null,
	payment_image text,
	status text not null default 'Received' check (status in ('Received', 'Preparing', 'Ready', 'Completed', 'Cancelled')),
	created_at timestamptz not null default now()
);

alter table public.food_orders enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.food_orders to anon, authenticated;

create policy "Allow order submissions"
	on public.food_orders
	for insert
	to anon, authenticated
	with check (true);
