create or replace function public.getmenu(m text)
    RETURNS jsonb language SQL SECURITY DEFINER IMMUTABLE AS
$$

select jsonb_agg(t) from 
(    select 
    g2.name as title, g2.icon, g2.path as url, g2.xtra, g2.id, g2.parentid, 
    case when g2.parentid is null then null else g1.name end
     as parentname, 
    g2.menu
    from groups as g1 right outer join groups as g2 on g2.parentid = g1.id 
    where g2.menu = m
    and g2.allowed_roles && getmyroles()
    order by 
    case when g2.parentid is null then g2.sortkey else g1.sortkey end, g2.sortkey
) t;
$$

