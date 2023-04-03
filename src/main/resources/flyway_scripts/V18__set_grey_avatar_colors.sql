update public.users u
set avatar_color = 'GREY'
where u.avatar_color = '' or u.avatar_color is null;