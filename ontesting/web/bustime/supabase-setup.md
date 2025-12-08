# Supabase Setup for Kerala Bus Time

## Database Schema

### 1. buses table
```sql
CREATE TABLE buses (
  id SERIAL PRIMARY KEY,
  bus_number VARCHAR(20) UNIQUE NOT NULL,
  route VARCHAR(200) NOT NULL,
  operator VARCHAR(100) NOT NULL,
  frequency VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. bus_timings table
```sql
CREATE TABLE bus_timings (
  id SERIAL PRIMARY KEY,
  bus_id INTEGER REFERENCES buses(id),
  departure_time TIME NOT NULL,
  stop_name VARCHAR(100) NOT NULL,
  stop_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. user_updates table
```sql
CREATE TABLE user_updates (
  id SERIAL PRIMARY KEY,
  bus_id INTEGER REFERENCES buses(id),
  actual_time TIME NOT NULL,
  stop_name VARCHAR(100) NOT NULL,
  reported_at TIMESTAMP DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE,
  votes INTEGER DEFAULT 0
);
```

### 4. routes table
```sql
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  distance_km INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Setup Steps

1. Create Supabase project at https://supabase.com
2. Run the SQL commands above in SQL Editor
3. Update app.js with your Supabase URL and anon key
4. Enable Row Level Security (RLS) for production

## Sample Data Insert

```sql
-- Insert sample buses
INSERT INTO buses (bus_number, route, operator, frequency) VALUES
('KL-07-1234', 'Ernakulam - Kottayam', 'KSRTC', '2.5 hours'),
('KL-01-5678', 'Thiruvananthapuram - Kochi', 'KSRTC', '2 hours');

-- Insert sample timings
INSERT INTO bus_timings (bus_id, departure_time, stop_name, stop_order) VALUES
(1, '06:00', 'Ernakulam', 1),
(1, '07:30', 'Vaikom', 2),
(1, '08:45', 'Changanassery', 3),
(1, '09:30', 'Kottayam', 4);
```