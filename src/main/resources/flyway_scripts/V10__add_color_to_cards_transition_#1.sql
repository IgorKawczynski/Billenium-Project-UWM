update public.cards c
set color = 'DEFAULT'
where c.color = '' or c.color is null;
