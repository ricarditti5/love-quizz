import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gloddvnhxboueulvwczv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsb2Rkdm5oeGJvdWV1bHZ3Y3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDkxNTEsImV4cCI6MjA3Nzk4NTE1MX0.8KWN3wn_Ef88TSh5riZWkNmrg--3SDL979iP0Jr2_EU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
