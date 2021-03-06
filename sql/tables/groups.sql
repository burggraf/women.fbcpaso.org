drop table if exists groups;
create table if not exists public.groups (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parentid      UUID REFERENCES groups NULL,
  name          TEXT,
  icon          TEXT,
  path          TEXT,
  sortkey       TEXT,
  menu          TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by    UUID REFERENCES auth.users,
  xtra          JSONB
);
CREATE INDEX ON public.groups USING btree (menu);
/*
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select group" ON public.groups FOR SELECT USING (true);
CREATE POLICY "insert group" ON public.groups FOR INSERT WITH CHECK ((auth.uid() = created_by));
CREATE POLICY "delete group" ON public.groups FOR DELETE USING ((auth.uid() = created_by));
CREATE POLICY "update group" ON public.groups FOR UPDATE USING ((auth.uid() = created_by)) WITH CHECK ((auth.uid() = created_by));
*/
