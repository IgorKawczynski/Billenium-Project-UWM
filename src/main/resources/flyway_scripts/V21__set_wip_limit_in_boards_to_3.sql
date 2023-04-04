update public.boards b
set wip_limit = 3
where b.wip_limit is null;