
-- Role enum & user_roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read roles"
  ON public.user_roles FOR SELECT TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Profiles
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  title TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read profiles"
  ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Signup trigger: validate domain & seed profile/role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_role public.app_role;
  v_full_name TEXT;
  v_title TEXT;
  v_location TEXT;
BEGIN
  IF lower(split_part(NEW.email, '@', 2)) <> 'capslgas.com' THEN
    RAISE EXCEPTION 'Only @capslgas.com email addresses are allowed';
  END IF;

  v_full_name := COALESCE(NULLIF(NEW.raw_user_meta_data->>'full_name',''), split_part(NEW.email,'@',1));
  v_title := NULLIF(NEW.raw_user_meta_data->>'title','');
  v_location := NULLIF(NEW.raw_user_meta_data->>'location','');
  v_role := COALESCE(NULLIF(NEW.raw_user_meta_data->>'role','')::public.app_role, 'staff');

  INSERT INTO public.profiles (user_id, email, full_name, title, location)
  VALUES (NEW.id, NEW.email, v_full_name, v_title, v_location);

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, v_role)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Lock down HSE tables to authenticated users
DROP POLICY IF EXISTS "Reports readable by anyone" ON public.hse_reports;
DROP POLICY IF EXISTS "Reports insertable by anyone" ON public.hse_reports;
DROP POLICY IF EXISTS "Reports updatable by anyone" ON public.hse_reports;
CREATE POLICY "Authenticated read reports" ON public.hse_reports
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated create reports" ON public.hse_reports
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update reports" ON public.hse_reports
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
REVOKE ALL ON public.hse_reports FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.hse_reports TO authenticated;

DROP POLICY IF EXISTS "Activities readable by anyone" ON public.hse_activities;
DROP POLICY IF EXISTS "Activities insertable by anyone" ON public.hse_activities;
CREATE POLICY "Authenticated read activities" ON public.hse_activities
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated create activities" ON public.hse_activities
  FOR INSERT TO authenticated WITH CHECK (true);
REVOKE ALL ON public.hse_activities FROM anon;
GRANT SELECT, INSERT ON public.hse_activities TO authenticated;
