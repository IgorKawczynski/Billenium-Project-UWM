update public.cards c
set color = 'default'
where c.color = '' or c.color is null;
