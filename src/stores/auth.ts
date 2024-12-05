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
      .eq('id', user.value.id) // Ensure `id` is not undefined
      .single()

    if (fetchError) {
      error.value = fetchError.message
      loading.value = false
      return
    }

    user.value = data
    loading.value = false
  }

  // Function to register a new user
  const register = async (email: string, password: string, name: string) => {
    loading.value = true
    error.value = null // Clear previous errors
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

    // Insert the new user into your database (assuming there's a 'users' table)
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: newUser?.id,
          email: newUser?.email,
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
    loading.value = false
  }

  // Function to login an existing user
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null // Clear previous errors
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
    loading.value = false
    localStorage.setItem('user', JSON.stringify(user.value))
    
  }

  // Function to logout the current user
  const logout = async () => {
    loading.value = true
    error.value = null // Clear previous errors
    const { error: logoutError } = await supabase.auth.signOut()

    if (logoutError) {
      error.value = logoutError.message
      loading.value = false
      return
    }

    user.value = null
    loading.value = false
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // Function to update the user profile
  const updateProfile = async (name: string, email: string) => {
    loading.value = true
    error.value = null // Clear previous errors
    if (!user.value?.id) {
      error.value = 'User ID is missing'
      loading.value = false
      return
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ name, email })
      .eq('id', user.value.id) // Ensure `id` is not undefined

    if (updateError) {
      error.value = updateError.message
      loading.value = false
      return
    }

    // Update the user object in state without overwriting other fields
    user.value = { ...user.value, name, email }
    loading.value = false
  }

  return {
    user,
    error,
    loading,
    isLoggedIn,
    fetchProfile,
    register,
    login,
    logout,
    updateProfile,
  }
})
