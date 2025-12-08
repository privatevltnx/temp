-- Supabase SQL Schema for VoltNexis Studio

-- Contact Form Table
CREATE TABLE contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp_phone TEXT,
    enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('web', 'app', 'db', 'seo')),
    preferred_method TEXT DEFAULT 'email' CHECK (preferred_method IN ('email', 'whatsapp', 'telegram', 'voice_call')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed'))
);

-- Testimonials Table
CREATE TABLE testimonials (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    project_type TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Contact submissions policies
CREATE POLICY "Allow anonymous contact inserts" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated contact reads" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Testimonials policies
CREATE POLICY "Allow anonymous testimonial inserts" ON testimonials
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public approved testimonial reads" ON testimonials
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Allow authenticated all testimonial reads" ON testimonials
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated testimonial updates" ON testimonials
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_contact_email ON contact_submissions(email);
CREATE INDEX idx_contact_enquiry_type ON contact_submissions(enquiry_type);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at);

CREATE INDEX idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);