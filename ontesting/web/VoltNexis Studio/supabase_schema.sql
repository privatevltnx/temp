-- VoltNexis Studio Project Bookings Table
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE project_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_types TEXT NOT NULL,
    project_tier TEXT NOT NULL,
    design_style TEXT,
    features TEXT,
    delivery_speed DECIMAL(3,1) DEFAULT 1.0,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_company TEXT,
    client_phone TEXT,
    phone_apps TEXT,
    project_notes TEXT,
    base_price INTEGER NOT NULL,
    addons_price INTEGER DEFAULT 0,
    total_price INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_project_bookings_email ON project_bookings(client_email);

-- Create an index on status for filtering
CREATE INDEX idx_project_bookings_status ON project_bookings(status);

-- Create an index on created_at for sorting
CREATE INDEX idx_project_bookings_created_at ON project_bookings(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE project_bookings ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from anyone (for the booking form)
CREATE POLICY "Allow public inserts" ON project_bookings
    FOR INSERT WITH CHECK (true);

-- Create a policy to allow admins to view all bookings
-- (You'll need to set up authentication and admin roles)
CREATE POLICY "Allow admin access" ON project_bookings
    FOR ALL USING (auth.role() = 'admin');

-- Optional: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_project_bookings_updated_at
    BEFORE UPDATE ON project_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample query to view all bookings (for admin use)
-- SELECT * FROM project_bookings ORDER BY created_at DESC;