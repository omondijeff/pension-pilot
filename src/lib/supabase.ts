// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Initializing Supabase client with:', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey
})

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

// Handle authentication state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', {
    event,
    sessionExists: !!session,
    userId: session?.user?.id,
    userEmail: session?.user?.email
  })

  if (event === 'SIGNED_IN') {
    // Log the full URL and search parameters
    console.log('Current URL:', window.location.href)
    console.log('URL Parameters:', new URLSearchParams(window.location.search).toString())
    console.log('Hash Parameters:', new URLSearchParams(window.location.hash.slice(1)).toString())
    
    // Check for confirmation flow
    const currentUrl = window.location.href
    if (currentUrl.includes('code=')) {
      console.log('Detected email confirmation flow, redirecting to /about-you')
      window.location.href = '/about-you'
    } else {
      console.log('Regular sign in detected (not from email confirmation)')
    }
  }
})

// Add session monitoring
const monitorSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  console.log('Current session status:', {
    hasSession: !!session,
    error: error?.message,
    userId: session?.user?.id,
    lastSignInTime: session?.user?.last_sign_in_at
  })
}

// Monitor session on init
monitorSession()

export type SupabaseClient = typeof supabase