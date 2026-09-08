create table if not exists public.food_menu_items (
	item_id integer primary key,
	name text not null,
	price numeric(10, 2) not null check (price >= 0),
	active boolean not null default true
);

insert into public.food_menu_items (item_id, name, price)
values
	(101, 'Aloo Tikki Burger', 75),
	(102, 'Crispy Masala Burger', 80),
	(103, 'Tandoori Paneer Burger', 130),
	(201, 'Aloo Tikki Wrap', 110),
	(202, 'Spicy Paneer Wrap', 140),
	(301, 'Salted Fries', 80),
	(302, 'Peri Peri Fries', 100),
	(401, 'Regular Cold Coffee', 80),
	(402, 'Medium Cold Coffee', 90),
	(403, 'Brownie Shake', 120)
on conflict (item_id) do update
set name = excluded.name, price = excluded.price, active = true;

alter table public.food_orders
	add constraint food_orders_payment_image_size_check
	check (payment_image is null or char_length(payment_image) <= 6000000);

revoke insert on table public.food_orders from anon, authenticated;

create or replace function public.place_food_order(
	p_order_id text,
	p_team_name text,
	p_team_leader_name text,
	p_team_leader_phone text,
	p_room_no text,
	p_items jsonb,
	p_payment_image text default null
)
returns setof public.food_orders
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
	calculated_total numeric(10, 2);
	requested_count integer;
	valid_count integer;
	matched_count integer;
	distinct_count integer;
	inserted_order public.food_orders;
begin
	if p_order_id is null or char_length(trim(p_order_id)) not between 8 and 64 then
		raise exception 'Invalid order ID' using errcode = '22023';
	end if;

	if p_team_name is null or char_length(trim(p_team_name)) not between 1 and 120
		or p_team_leader_name is null or char_length(trim(p_team_leader_name)) not between 1 and 120
		or p_team_leader_phone is null or char_length(trim(p_team_leader_phone)) not between 7 and 20
		or p_room_no is null or char_length(trim(p_room_no)) not between 1 and 40 then
		raise exception 'Invalid order details' using errcode = '22023';
	end if;

	if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0
		or jsonb_array_length(p_items) > 20 then
		raise exception 'Invalid order items' using errcode = '22023';
	end if;

	with requested as (
		select
			case when value->>'id' ~ '^[0-9]+$' then (value->>'id')::integer end as item_id,
			case when value->>'quantity' ~ '^[1-9][0-9]*$' then (value->>'quantity')::integer end as quantity
		from jsonb_array_elements(p_items) as item(value)
	)
	select count(*), count(*) filter (where item_id is not null and quantity is not null), count(*) filter (where quantity between 1 and 20)
	into requested_count, valid_count, distinct_count
	from requested;

	if valid_count <> requested_count or distinct_count <> requested_count then
		raise exception 'Invalid item IDs or quantities' using errcode = '22023';
	end if;

	with requested as (
		select
			(value->>'id')::integer as item_id,
			(value->>'quantity')::integer as quantity
		from jsonb_array_elements(p_items) as item(value)
	)
	select count(food_menu_items.item_id), count(distinct requested.item_id), coalesce(sum(food_menu_items.price * requested.quantity), 0)
	into matched_count, distinct_count, calculated_total
	from requested
	left join food_menu_items on food_menu_items.item_id = requested.item_id and food_menu_items.active;

	if matched_count <> requested_count or distinct_count <> requested_count then
		raise exception 'Unknown or duplicate menu items' using errcode = '22023';
	end if;

	insert into food_orders (order_id, team_name, team_leader_name, team_leader_phone, room_no, total_amount, items, payment_image, status)
	values (p_order_id, trim(p_team_name), trim(p_team_leader_name), trim(p_team_leader_phone), trim(p_room_no), calculated_total, p_items, p_payment_image, 'Received')
	on conflict (order_id) do nothing
	returning * into inserted_order;

	if not found then
		select * into inserted_order from food_orders where order_id = p_order_id;
	end if;

	return next inserted_order;
end;
$$;

alter table public.food_menu_items enable row level security;
revoke all on table public.food_menu_items from anon, authenticated;
grant execute on function public.place_food_order(text, text, text, text, text, jsonb, text) to anon, authenticated;
