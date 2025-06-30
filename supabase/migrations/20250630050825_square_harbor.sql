/*
  # Fix Authentication and RLS Policies

  1. Clean up existing policies
  2. Create proper RLS policies for authentication
  3. Ensure profile creation works correctly
  4. Fix any permission issues

  This migration ensures users can properly sign up and sign in.
*/

-- First, let's make sure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DO $$ 
DECLARE
    pol record;
BEGIN
    -- Drop all existing policies on profiles table
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'profiles' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON profiles';
    END LOOP;
END $$;

-- Create new, clean policies
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_policy" ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Ensure the trigger function exists and works correctly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    now()
  );
  RETURN new;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, just return
    RETURN new;
  WHEN OTHERS THEN
    -- Log error but don't fail the auth process
    RAISE LOG 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.beta_applications TO authenticated;
GRANT ALL ON public.tutorial_progress TO authenticated;
GRANT ALL ON public.notifications TO authenticated;

-- Ensure the function can be executed
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;