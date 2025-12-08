// Supabase Configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2';

// Your Supabase configuration (replace with your actual values)
const supabaseUrl = 'https://mazvgebqfabfbxmhzapr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1henZnZWJxZmFiZmJ4bWh6YXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1Mjg2MzEsImV4cCI6MjA3MjEwNDYzMX0.ck2GBe7Pj_29pc4H8FTBRCCir4RVeWZyxcmrUOQDAo4';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;