/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `property_id` (number)
      - `user_id` (uuid, references auth.users)
      - `start_date` (date)
      - `end_date` (date)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `bookings` table
    - Add policies for:
      - Users can read all bookings for properties
      - Users can create their own bookings
      - Users can update their own bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id integer NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'confirmed',
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow all users to read bookings for any property
CREATE POLICY "Bookings are viewable by everyone" ON bookings
  FOR SELECT USING (true);

-- Allow authenticated users to create their own bookings
CREATE POLICY "Users can create their own bookings" ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own bookings
CREATE POLICY "Users can update their own bookings" ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);