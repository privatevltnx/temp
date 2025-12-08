import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrgeffahqtoffiayiwgg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZ2VmZmFocXRvZmZpYXlpd2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDYzMTAsImV4cCI6MjA3MTg4MjMxMH0.w7XBsMKo9W0pkgz74S9la6NgaY-PN_JAY348FCgV0Rc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)