update public.cards c
set is_locked = false
where c.is_locked is null;