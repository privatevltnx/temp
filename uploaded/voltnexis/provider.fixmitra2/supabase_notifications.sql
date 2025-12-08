-- Add notification preferences columns to providers table
ALTER TABLE providers 
ADD COLUMN whatsapp_notifications BOOLEAN DEFAULT false,
ADD COLUMN email_notifications BOOLEAN DEFAULT false;

-- Update existing providers to have notifications disabled by default
UPDATE providers 
SET whatsapp_notifications = false, email_notifications = false 
WHERE whatsapp_notifications IS NULL OR email_notifications IS NULL;