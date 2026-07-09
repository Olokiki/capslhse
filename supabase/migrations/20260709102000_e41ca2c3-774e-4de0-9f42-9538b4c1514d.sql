
CREATE TABLE public.hse_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  severity text NOT NULL,
  location text NOT NULL,
  asset text,
  reported_by text NOT NULL,
  reported_at timestamptz NOT NULL DEFAULT now(),
  assigned_to text,
  assigned_email text,
  due_at timestamptz,
  status text NOT NULL DEFAULT 'open',
  root_cause text,
  corrective_action text,
  closed_at timestamptz,
  closed_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.hse_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES public.hse_reports(id) ON DELETE CASCADE,
  at timestamptz NOT NULL DEFAULT now(),
  actor text NOT NULL,
  kind text NOT NULL,
  message text NOT NULL
);

CREATE INDEX idx_hse_activities_report_id ON public.hse_activities(report_id);
CREATE INDEX idx_hse_reports_location ON public.hse_reports(location);
CREATE INDEX idx_hse_reports_reported_at ON public.hse_reports(reported_at DESC);

-- Grants: the app uses a fake client-side login (no Supabase Auth), so
-- data is read/written via the anon (publishable) key. Policies below
-- allow open access; this is a shared internal reporting board.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hse_reports TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hse_activities TO anon, authenticated;
GRANT ALL ON public.hse_reports TO service_role;
GRANT ALL ON public.hse_activities TO service_role;

ALTER TABLE public.hse_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hse_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reports readable by anyone" ON public.hse_reports FOR SELECT USING (true);
CREATE POLICY "Reports insertable by anyone" ON public.hse_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Reports updatable by anyone" ON public.hse_reports FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Activities readable by anyone" ON public.hse_activities FOR SELECT USING (true);
CREATE POLICY "Activities insertable by anyone" ON public.hse_activities FOR INSERT WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_hse_reports_updated_at
  BEFORE UPDATE ON public.hse_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.hse_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hse_activities;
