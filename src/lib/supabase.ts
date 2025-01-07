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

supabase.auth.onAuthStateChange((event) => {
  // Check if this is the initial session being established after email confirmation
  if (event === 'SIGNED_IN') {
    const currentUrl = window.location.href
    // Check if this is coming from an email confirmation flow
    if (currentUrl.includes('access_token') || currentUrl.includes('confirmation')) {
      window.location.href = '/about-you'
    }
  }
})

export type SupabaseClient = typeof supabase