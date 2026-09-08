alter table public.food_orders
	add column if not exists team_leader_name text,
	add column if not exists team_leader_phone text;

alter table public.food_orders
	add constraint food_orders_team_leader_name_check
	check (char_length(team_leader_name) between 1 and 120),
	add constraint food_orders_team_leader_phone_check
	check (char_length(team_leader_phone) between 7 and 20);
