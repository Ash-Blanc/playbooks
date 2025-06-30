/*
  # Fix profiles table RLS policies

  1. Problem
    - Current RLS policies have inconsistent syntax between `uid()` and `( SELECT uid() AS uid)`
    - INSERT policies may not be working correctly for new user registration
    - Need to ensure authenticated users can create their own profiles

  2. Solution
    - Drop existing duplicate/conflicting policies
    - Create clean, consistent RLS policies using `auth.uid()`
    - Ensure INSERT policy allows users to create their own profile during signup

  3. Security
    - Users can only insert/update/delete their own profile data
    - All profiles remain publicly viewable for the application's social features
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create clean, consistent RLS policies
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