/*
  # User Tokens System

  1. New Tables
    - `user_tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `tokens_used` (integer)
      - `last_reset` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_tokens` table
    - Add policies for authenticated users to read/update their own tokens
*/

CREATE TABLE IF NOT EXISTS user_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  tokens_used integer DEFAULT 0,
  last_reset timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own token data
CREATE POLICY "Users can read own token data"
  ON user_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to update their own token count
CREATE POLICY "Users can update own token count"
  ON user_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to get available tokens for a user
CREATE OR REPLACE FUNCTION get_available_tokens(user_uuid uuid)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  max_tokens integer;
  used_tokens integer;
  last_reset_date timestamptz;
BEGIN
  -- Set max tokens based on authentication status
  max_tokens := CASE 
    WHEN user_uuid IS NOT NULL THEN 10
    ELSE 5
  END;
  
  -- Get used tokens and last reset date
  SELECT tokens_used, last_reset 
  INTO used_tokens, last_reset_date
  FROM user_tokens 
  WHERE user_id = user_uuid;
  
  -- Reset tokens if it's a new day
  IF last_reset_date < date_trunc('day', now()) THEN
    UPDATE user_tokens 
    SET tokens_used = 0, 
        last_reset = now() 
    WHERE user_id = user_uuid;
    RETURN max_tokens;
  END IF;
  
  RETURN max_tokens - COALESCE(used_tokens, 0);
END;
$$;