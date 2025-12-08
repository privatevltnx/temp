-- Enhanced Provider Columns for Combined District and Pincode Selection
-- Run this SQL script in your Supabase SQL editor to add new columns

-- Add columns for enhanced provider selection
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS selection_type TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS selected_districts TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS additional_pincodes TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS excluded_pincodes TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS profile_picture TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS ads TEXT DEFAULT '';

-- Add comments for documentation
COMMENT ON COLUMN providers.selection_type IS 'Type of service area selection: manual, district, or combined';
COMMENT ON COLUMN providers.selected_districts IS 'Comma-separated list of selected districts';
COMMENT ON COLUMN providers.additional_pincodes IS 'Additional pincodes added to district selection (for combined type)';
COMMENT ON COLUMN providers.excluded_pincodes IS 'Pincodes excluded from district selection (for combined type)';
COMMENT ON COLUMN providers.profile_picture IS 'URL to company profile picture/logo';
COMMENT ON COLUMN providers.ads IS 'Comma-separated URLs to work photos/gallery images';

-- Create index for better performance on filtering
CREATE INDEX IF NOT EXISTS idx_providers_selection_type ON providers(selection_type);
CREATE INDEX IF NOT EXISTS idx_providers_districts ON providers USING gin(string_to_array(selected_districts, ','));

-- Update existing providers to have default selection_type
UPDATE providers 
SET selection_type = 'manual' 
WHERE selection_type IS NULL OR selection_type = '';

-- Example of how the data will look:
-- For manual selection:
-- selection_type: 'manual'
-- pincodes: '682001, 682002, 682003'
-- selected_districts: ''
-- additional_pincodes: ''
-- excluded_pincodes: ''

-- For district selection:
-- selection_type: 'district'
-- pincodes: '682001, 682002, 682003, ...' (all pincodes from selected districts)
-- selected_districts: 'Ernakulam, Thrissur'
-- additional_pincodes: ''
-- excluded_pincodes: ''

-- For combined selection:
-- selection_type: 'combined'
-- pincodes: '682001, 682002, 680001, ...' (district pincodes + additional - excluded)
-- selected_districts: 'Ernakulam'
-- additional_pincodes: '680001, 680002'
-- excluded_pincodes: '682050, 682051'