-- FixMitra Database Schema
-- This SQL file contains the database structure for the FixMitra application

-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    pincodes TEXT NOT NULL, -- Comma-separated list of pincodes
    categories TEXT NOT NULL, -- Comma-separated list of service categories
    description TEXT,
    experience_years INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    verified BOOLEAN DEFAULT FALSE,
    isfast BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
    profile_picture TEXT,
    whatsapp_notifications BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    profile_picture TEXT,
    auth_method VARCHAR(20) DEFAULT 'email', -- email, phone, google
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create requests table (if not exists)
CREATE TABLE IF NOT EXISTS requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    category VARCHAR(100) NOT NULL,
    notes TEXT,
    provider TEXT, -- Can be 'default' or comma-separated provider emails
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Accepted, In Progress, Completed, Cancelled
    assigned_provider_id UUID REFERENCES providers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create provider_reviews table
CREATE TABLE IF NOT EXISTS provider_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    request_id UUID REFERENCES requests(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_pincodes ON providers USING gin(to_tsvector('english', pincodes));
CREATE INDEX IF NOT EXISTS idx_providers_categories ON providers USING gin(to_tsvector('english', categories));
CREATE INDEX IF NOT EXISTS idx_providers_status ON providers(status);
CREATE INDEX IF NOT EXISTS idx_requests_pincode ON requests(pincode);
CREATE INDEX IF NOT EXISTS idx_requests_category ON requests(category);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON requests(created_at);

-- Insert sample providers data
INSERT INTO providers (email, name, company_name, phone, address, pincodes, categories, description, experience_years, rating, verified, isfast) VALUES
('john.cleaning@example.com', 'John Smith', 'SparkleClean Services', '+91-9876543210', 'MG Road, Kochi', '682001, 682002, 682003', 'Home Cleaning', 'Professional home cleaning service with 5+ years experience. We use eco-friendly products and provide thorough cleaning.', 5, 4.8, TRUE, TRUE),
('mary.repairs@example.com', 'Mary Johnson', 'QuickFix Solutions', '+91-9876543211', 'Kakkanad, Kochi', '682030, 682031, 682032', 'AC Repair, Appliance Repair', 'Expert in AC and appliance repairs. Quick response time and quality service guaranteed.', 7, 4.6, TRUE, FALSE),
('david.plumber@example.com', 'David Wilson', 'FlowMaster Plumbing', '+91-9876543212', 'Edapally, Kochi', '682024, 682025, 682026', 'Plumbing', 'Licensed plumber with expertise in all types of plumbing work. Available 24/7 for emergencies.', 10, 4.9, TRUE, TRUE),
('sarah.electric@example.com', 'Sarah Davis', 'PowerLine Electricals', '+91-9876543213', 'Palarivattom, Kochi', '682025, 682028, 682041', 'Electrical Work', 'Certified electrician providing safe and reliable electrical services for homes and offices.', 6, 4.7, TRUE, FALSE),
('mike.painter@example.com', 'Mike Brown', 'ColorCraft Painters', '+91-9876543214', 'Kaloor, Kochi', '682017, 682018, 682019', 'Painting', 'Professional painting contractor specializing in interior and exterior painting with premium quality paints.', 8, 4.5, FALSE, FALSE);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access to active providers" ON providers FOR SELECT USING (status = 'active');
CREATE POLICY "Allow authenticated users to read their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow authenticated users to create requests" ON requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to read their own requests" ON requests FOR SELECT USING (auth.uid() = user_id);