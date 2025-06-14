/*
  # Fix token system implementation

  1. Changes
    - Add function to reset tokens daily
    - Add function to check and update token usage
    - Add trigger for token updates
*/

-- Function to reset tokens daily
CREATE OR REPLACE FUNCTION reset_daily_tokens()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE user_tokens
  SET tokens_used = 0,
      last_reset = CURRENT_TIMESTAMP
  WHERE DATE(last_reset) < CURRENT_DATE;
END;
$$;

-- Function to check and update token usage
CREATE OR REPLACE FUNCTION check_token_availability(user_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  max_tokens integer;
  current_tokens integer;
BEGIN
  -- Set max tokens (10 for authenticated users, 5 for guests)
  max_tokens := CASE 
    WHEN user_uuid IS NOT NULL THEN 10
    ELSE 5
  END;

  -- Get current token usage
  SELECT COALESCE(tokens_used, 0)
  INTO current_tokens
  FROM user_tokens
  WHERE user_id = user_uuid;

  -- Check if user has available tokens
  RETURN COALESCE(current_tokens, 0) < max_tokens;
END;
$$;

-- Function to increment token usage
CREATE OR REPLACE FUNCTION increment_token_usage(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO user_tokens (user_id, tokens_used)
  VALUES (user_uuid, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET tokens_used = user_tokens.tokens_used + 1;
END;
$$;