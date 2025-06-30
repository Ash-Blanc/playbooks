/*
  # Authentication and User Management Setup

  1. New Tables
    - `profiles` table for user profile information
    - `beta_applications` for beta program management
    - `tutorial_progress` for tracking user onboarding
    - `notifications` for user notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for beta application management

  3. Functions
    - Auto-create profile on user signup
    - Update updated_at timestamps automatically
*/

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  updated_at timestamptz DEFAULT now(),
  username text UNIQUE,
  full_name text,
  avatar_url text,
  website text,
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create beta applications table
CREATE TABLE IF NOT EXISTS beta_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  background text,
  motivation text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  applied_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewer_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Create tutorial progress table
CREATE TABLE IF NOT EXISTS tutorial_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tutorial_id text NOT NULL,
  step_id text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, tutorial_id, step_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE beta_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorial_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Beta applications policies
CREATE POLICY "Anyone can submit beta applications" ON beta_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own beta applications" ON beta_applications
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Tutorial progress policies
CREATE POLICY "Users can manage their own tutorial progress" ON tutorial_progress
  FOR ALL USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_beta_applications_email ON beta_applications(email);
CREATE INDEX IF NOT EXISTS idx_beta_applications_status ON beta_applications(status);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user_id ON tutorial_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);