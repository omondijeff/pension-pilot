import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { ref, computed } from 'vue';
import type { User } from '@/lib/database.types'; // Import User type from database.types.ts

// Adjust CustomUser to make 'email' optional
type CustomUser = User & { email?: string; id?: string };

export const useAuthStore = defineStore('auth', () => {
  // Reactive state
  const user = ref<CustomUser | null>(null); // Use the CustomUser type here
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  // Computed property for checking if the user is logged in
  const isLoggedIn = computed(() => user.value !== null);

  // Initialize user from localStorage and validate session
  const initializeAuth = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);

      // Validate session with Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (!session || sessionError) {
        user.value = null;
        localStorage.removeItem('user');
      }
    }
  };

  // Fetch the current user's profile from the `users` table
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

  // Register a new user and insert their profile into the `users` table
  const register = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
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
            email: newUser.email ?? '', // Handle the possibility of undefined email
            name,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw new Error(insertError.message);

      const userProfile = {
        id: newUser.id,
        name,
        email: newUser.email ?? '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      user.value = userProfile;
      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to register user';
    } finally {
      loading.value = false;
    }
  };

  // Login an existing user
  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { data: { user: loggedInUser }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw new Error(loginError.message);

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', loggedInUser?.id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      user.value = data;
      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to log in';
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
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to log out';
    } finally {
      loading.value = false;
    }
  };

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
  };
});
