insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payment-screenshots', 'payment-screenshots', false, 5242880, array['image/webp']::text[])
on conflict (id) do update
set public = false, file_size_limit = 5242880, allowed_mime_types = array['image/webp']::text[];

create policy "Allow payment screenshot uploads"
on storage.objects
for insert
to anon, authenticated
with check (
	bucket_id = 'payment-screenshots'
	and name ~ '^payments/[0-9a-fA-F-]{36}\.webp$'
);

alter table public.food_orders
	add column if not exists payment_screenshot_path text;

alter table public.food_orders
	add constraint food_orders_payment_screenshot_path_check
	check (
		payment_screenshot_path is null
		or payment_screenshot_path ~ '^payments/[0-9a-fA-F-]{36}\.webp$'
	);

create or replace function public.place_food_order(
	p_order_id text,
	p_team_name text,
	p_team_leader_name text,
	p_team_leader_phone text,
	p_room_no text,
	p_items jsonb,
	p_payment_screenshot_path text default null
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

	if p_payment_screenshot_path is null
		or p_payment_screenshot_path !~ '^payments/[0-9a-fA-F-]{36}\.webp$' then
		raise exception 'Payment screenshot is required' using errcode = '22023';
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

	insert into food_orders (order_id, team_name, team_leader_name, team_leader_phone, room_no, total_amount, items, payment_image, payment_screenshot_path, status)
	values (p_order_id, trim(p_team_name), trim(p_team_leader_name), trim(p_team_leader_phone), trim(p_room_no), calculated_total, p_items, null, p_payment_screenshot_path, 'Received')
	on conflict (order_id) do nothing
	returning * into inserted_order;

	if not found then
		select * into inserted_order from food_orders where order_id = p_order_id;
	end if;

	return next inserted_order;
end;
$$;

grant execute on function public.place_food_order(text, text, text, text, text, jsonb, text) to anon, authenticated;
