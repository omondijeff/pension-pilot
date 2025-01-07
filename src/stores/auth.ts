// src/stores/auth.ts
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { ref, computed } from 'vue';
import type { User } from '@/lib/database.types';
// import { EmailService } from '@/lib/services/emailService';

type CustomUser = User & { email?: string; id?: string };

export const useAuthStore = defineStore('auth', () => {
  const user = ref<CustomUser | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const isLoggedIn = computed(() => user.value !== null);

  // Check if a user exists without attempting login
  const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error: queryError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          // PGRST116 is the error code for no rows returned
          return false;
        }
        throw new Error(queryError.message);
      }

      return !!data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error checking user existence';
      return false;
    }
  };

  // Initialize user from localStorage and validate session
  const initializeAuth = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (!session || sessionError) {
        user.value = null;
        localStorage.removeItem('user');
      }
    }
  };

  // Fetch the current user's profile
  const fetchProfile = async () => {
    loading.value = true;
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.value?.id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      user.value = data;
      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user profile';
    } finally {
      loading.value = false;
    }
  };

  // Register a new user
  const register = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
      // First check if user already exists
      const userExists = await checkUserExists(email);
      if (userExists) {
        error.value = 'user_already_exists';
        return false;
      }

      const { data: { user: newUser }, error: registerError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (registerError) throw new Error(registerError.message);
      if (!newUser?.id || !newUser.email) throw new Error('Registration failed: Missing user ID or email');

      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: newUser.id,
            email: newUser.email,
            name,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw new Error(insertError.message);

      const userProfile = {
        id: newUser.id,
        name,
        email: newUser.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

       // Send welcome email
    try {
      console.log("sending...")
      // await EmailService.sendWelcomeEmail(email, name);
    } catch (emailError) {
      // Log the error but don't fail the registration
      console.error('Failed to send welcome email:', emailError);
    }

      user.value = userProfile;
      localStorage.setItem('user', JSON.stringify(user.value));
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to register user';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Login an existing user
  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      // First check if user exists
      const userExists = await checkUserExists(email);
      if (!userExists) {
        error.value = 'user_not_found';
        return false;
      }

      const { data: { user: loggedInUser }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        // Handle incorrect password specifically
        if (loginError.message.includes('Invalid login credentials')) {
          error.value = 'invalid_password';
          return false;
        }
        throw new Error(loginError.message);
      }

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', loggedInUser?.id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      user.value = data;
      localStorage.setItem('user', JSON.stringify(user.value));
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to log in';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Logout the current user
  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) throw new Error(logoutError.message);

      user.value = null;
      localStorage.removeItem('user');
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to log out';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    error,
    loading,
    isLoggedIn,
    checkUserExists,
    initializeAuth,
    fetchProfile,
    register,
    login,
    logout,
  };
});