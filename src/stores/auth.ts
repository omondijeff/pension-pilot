import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import { ref, computed } from 'vue'
import type { User } from '@supabase/supabase-js'

// Adjust the CustomUser type to allow `id` to be undefined
type CustomUser = User & { name?: string; id?: string }

export const useAuthStore = defineStore('auth', () => {
  // Reactive state
  const user = ref<CustomUser | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  // Computed property for checking if the user is logged in
  const isLoggedIn = computed(() => user.value !== null)

  // Initialize user from localStorage and validate session
  const initializeAuth = async () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)

      // Validate session with Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (!session || sessionError) {
        user.value = null
        localStorage.removeItem('user')
      }
    }
  }

  // Function to fetch the current user profile
  const fetchProfile = async () => {
    loading.value = true
    if (!user.value?.id) {
      error.value = 'User ID is missing'
      loading.value = false
      return
    }

    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (fetchError) {
      error.value = fetchError.message
      loading.value = false
      return
    }

    user.value = data
    localStorage.setItem('user', JSON.stringify(user.value))
    loading.value = false
  }

  // Function to register a new user
  const register = async (email: string, password: string, name: string) => {
    loading.value = true
    error.value = null
    const { data: { user: newUser }, error: registerError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (registerError) {
      error.value = registerError.message
      loading.value = false
      return
    }

    if (!newUser?.id) {
      error.value = 'Registration failed: No user ID'
      loading.value = false
      return
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: newUser.id,
          email: newUser.email,
          name,
          created_at: new Date().toISOString(),
        },
      ])

    if (insertError) {
      error.value = insertError.message
      loading.value = false
      return
    }

    user.value = { ...newUser, name }
    localStorage.setItem('user', JSON.stringify(user.value))
    loading.value = false
  }

  // Function to login an existing user
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    const { data: { user: loggedInUser }, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      error.value = loginError.message
      loading.value = false
      return
    }

    user.value = loggedInUser
    localStorage.setItem('user', JSON.stringify(user.value))
    loading.value = false
  }

  // Function to logout the current user
  const logout = async () => {
    loading.value = true
    error.value = null
    const { error: logoutError } = await supabase.auth.signOut()

    if (logoutError) {
      error.value = logoutError.message
      loading.value = false
      return
    }

    user.value = null
    localStorage.removeItem('user')
    loading.value = false
  }

  return {
    user,
    error,
    loading,
    isLoggedIn,
    initializeAuth,
    fetchProfile,
    register,
    login,
    logout,
  }
})
