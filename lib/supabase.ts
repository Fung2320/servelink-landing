import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oagtgputzprpkcprmydm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistEntry {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  type: 'email' | 'phone';
  city?: string;
  language: string;
  created_at?: string;
}
