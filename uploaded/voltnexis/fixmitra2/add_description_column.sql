-- Add description column to providers table
-- This allows providers to add a description about their business

ALTER TABLE providers 
ADD COLUMN description TEXT;

-- Add comment to the column
COMMENT ON COLUMN providers.description IS 'Business description provided by the service provider';

-- Update existing providers with a default description (optional)
-- UPDATE providers 
-- SET description = 'Professional service provider offering quality home services'
-- WHERE description IS NULL;