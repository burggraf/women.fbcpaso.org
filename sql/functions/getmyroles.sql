create or replace function public.getmyroles()
    RETURNS TEXT[] language SQL SECURITY DEFINER IMMUTABLE AS
$$

    select roles from userroles where userid = auth.uid()
$$