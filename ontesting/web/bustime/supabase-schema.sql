-- Kerala Bus Time - Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Routes table
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  operator TEXT NOT NULL CHECK (operator IN ('KSRTC', 'Private')),
  frequency TEXT,
  stops JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Buses table
CREATE TABLE buses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bus_number TEXT NOT NULL UNIQUE,
  route_id UUID REFERENCES routes(id),
  type TEXT NOT NULL CHECK (type IN ('Ordinary', 'Fast Passenger', 'Super Fast', 'Deluxe AC')),
  timings JSONB NOT NULL DEFAULT '[]',
  photo_url TEXT,
  fare INTEGER,
  duration TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  amenities JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Updates table
CREATE TABLE user_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bus_id UUID REFERENCES buses(id),
  stop_name TEXT NOT NULL,
  reported_time TIME NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('On Time', 'Delayed', 'Cancelled')),
  user_id UUID REFERENCES users(id),
  votes_up INTEGER DEFAULT 0,
  votes_down INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  route_id UUID REFERENCES routes(id),
  bus_id UUID REFERENCES buses(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, route_id, bus_id)
);

-- Update votes table
CREATE TABLE update_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  update_id UUID REFERENCES user_updates(id),
  user_id UUID REFERENCES users(id),
  vote_type TEXT CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(update_id, user_id)
);

-- Issue reports table
CREATE TABLE issue_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bus_id UUID REFERENCES buses(id),
  user_id UUID REFERENCES users(id),
  issue_type TEXT NOT NULL CHECK (issue_type IN ('delayed', 'cancelled', 'breakdown', 'overcrowded')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications table (Phase 2)
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  bus_id UUID REFERENCES buses(id),
  route_id UUID REFERENCES routes(id),
  notification_time TIME NOT NULL,
  notification_type TEXT DEFAULT 'reminder' CHECK (notification_type IN ('reminder', 'delay', 'cancel')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_buses_route_id ON buses(route_id);
CREATE INDEX idx_buses_bus_number ON buses(bus_number);
CREATE INDEX idx_user_updates_bus_id ON user_updates(bus_id);
CREATE INDEX idx_user_updates_created_at ON user_updates(created_at DESC);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_routes_origin_destination ON routes(origin, destination);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Routes are public for reading
CREATE POLICY "Routes are public" ON routes FOR SELECT TO public USING (true);

-- Buses are public for reading
CREATE POLICY "Buses are public" ON buses FOR SELECT TO public USING (true);

-- User updates
CREATE POLICY "Anyone can read updates" ON user_updates FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can create updates" ON user_updates FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Favorites
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);

-- Update votes
CREATE POLICY "Anyone can read votes" ON update_votes FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can vote" ON update_votes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Issue reports
CREATE POLICY "Anyone can read reports" ON issue_reports FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can create reports" ON issue_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can manage own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);

-- Functions
-- Update vote counts trigger
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE user_updates SET votes_up = votes_up + 1 WHERE id = NEW.update_id;
    ELSE
      UPDATE user_updates SET votes_down = votes_down + 1 WHERE id = NEW.update_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE user_updates SET votes_up = votes_up - 1 WHERE id = OLD.update_id;
    ELSE
      UPDATE user_updates SET votes_down = votes_down - 1 WHERE id = OLD.update_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_vote_counts_trigger
  AFTER INSERT OR DELETE ON update_votes
  FOR EACH ROW EXECUTE FUNCTION update_vote_counts();

-- Sample data
INSERT INTO routes (origin, destination, operator, frequency, stops) VALUES
('Ernakulam', 'Kottayam', 'KSRTC', '2.5 hours', '["Ernakulam", "Vytilla", "Vaikom", "Ettumanoor", "Changanassery", "Thiruvalla", "Kottayam"]'),
('Thiruvananthapuram', 'Kochi', 'KSRTC', '2 hours', '["Thiruvananthapuram", "Attingal", "Kollam", "Kayamkulam", "Alappuzha", "Cherthala", "Kochi"]'),
('Kochi', 'Munnar', 'Private', '3.5 hours', '["Kochi", "Aluva", "Perumbavoor", "Kothamangalam", "Adimali", "Munnar"]');

INSERT INTO buses (bus_number, route_id, type, timings, fare, duration, rating, reviews, amenities) VALUES
('KL-07-1234', (SELECT id FROM routes WHERE origin = 'Ernakulam' AND destination = 'Kottayam'), 'Fast Passenger', '["06:00", "08:30", "11:00", "14:30", "17:00", "19:30"]', 45, '2h 50m', 4.2, 156, '["Non-AC", "Reserved Seats", "Luggage Space"]'),
('KL-01-5678', (SELECT id FROM routes WHERE origin = 'Thiruvananthapuram' AND destination = 'Kochi'), 'Super Fast', '["05:30", "07:00", "09:30", "12:00", "15:30", "18:00"]', 75, '3h 00m', 4.5, 203, '["AC", "Pushback Seats", "Charging Points", "WiFi"]'),
('KL-14-9876', (SELECT id FROM routes WHERE origin = 'Kochi' AND destination = 'Munnar'), 'Deluxe AC', '["06:30", "09:00", "13:30", "16:00"]', 120, '3h 45m', 4.7, 89, '["AC", "Reclining Seats", "Entertainment", "Snacks", "Blankets"]');