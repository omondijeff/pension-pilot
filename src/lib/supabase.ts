// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: window?.localStorage,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Set up the auth state listener separately
supabase.auth.onAuthStateChange((event) => {
  if (event === 'INITIAL_SESSION' && window.location.href.includes('#access_token')) {
    window.location.href = '/about-you'
  }
})

export type SupabaseClient = typeof supabase