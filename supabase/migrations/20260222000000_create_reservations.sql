-- supabase/migrations/20260222000000_create_reservations.sql

-- Create the reservations table for managing successful Stripe purchases
CREATE TABLE IF NOT EXISTS public.reservations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vehicle_id text NOT NULL,
  vehicle_name text NOT NULL,
  price numeric NOT NULL,
  stripe_session_id text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- High-priority security rule: Users can only view their own reservations.
CREATE POLICY "Users can view their own reservations." ON public.reservations
  FOR SELECT USING (auth.uid() = user_id);

-- System-level: Service role (used by Edge Functions) can insert reservations.
-- The Edge Function bypasses RLS naturally with the service_role key,
-- or we can explicitly allow the webhook to insert.
-- We are relying on the service_role key in the Edge Function, so no explicit
-- public insert policy is needed, preventing client-side spoofing.
