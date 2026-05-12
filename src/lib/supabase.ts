import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

export function getSupabase() {
  if (!supabaseClient) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://phancnbwdrovtjxlpdsx.supabase.co';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoYW5jbmJ3ZHJvdnRqeGxwZHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDc3NjMsImV4cCI6MjA5MjE4Mzc2M30.JpcWhYG9OFtk3AB6zQsIGefOH3Nas5hONgHrC_nTJ2A';

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase URL or Anon Key is missing. Check your environment variables.');
      return null;
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}
