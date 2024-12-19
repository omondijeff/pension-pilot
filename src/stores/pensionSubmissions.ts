import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase'; // Adjust this path based on your project structure
import { ref } from 'vue';

export type PensionSubmission = {
  id: string;
  user_id: string;
  provider: string;
  policy_number: string | null;
  current_employer: boolean;
  signature_provided: boolean;
  created_at: string | null;
};

export const usePensionSubmissionsStore = defineStore('pensionSubmissions', () => {
  // State
  const submissions = ref<PensionSubmission[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Logging utility
  const logger = {
    info: (message: string, data?: any) => console.log(`[INFO] ${message}`, data || ''),
    warn: (message: string, data?: any) => console.warn(`[WARN] ${message}`, data || ''),
    error: (message: string, data?: any) => console.error(`[ERROR] ${message}`, data || ''),
  };

  /**
   * Fetch all pension submissions for all users.
   */
  const fetchAllSubmissions = async () => {
    loading.value = true;
    error.value = null;

    try {
      logger.info(`Fetching all pension submissions`);

      const { data, error: fetchError } = await supabase
        .from('pension_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        logger.error(`Error fetching all submissions`, fetchError);
        throw fetchError;
      }

      submissions.value = data || [];
      logger.info(`Fetched ${data?.length || 0} submissions.`);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch all submissions.';
      logger.error(`Failed to fetch submissions`, { error: error.value });
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch all pension submissions for a specific user.
   * @param userId The ID of the user to fetch submissions for.
   */
  const fetchSubmissions = async (userId: string) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info(`Fetching pension submissions for user`, { userId });

      const { data, error: fetchError } = await supabase
        .from('pension_submissions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        logger.error(`Error fetching submissions for user: ${userId}`, fetchError);
        throw fetchError;
      }

      submissions.value = data || [];
      logger.info(`Fetched ${data?.length || 0} submissions for user: ${userId}`);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch submissions.';
      logger.error(`Failed to fetch submissions`, { error: error.value });
    } finally {
      loading.value = false;
    }
  };

  /**
   * Add a new pension submission.
   * @param submission The pension submission data to be added.
   */
  const addSubmission = async (submission: Omit<PensionSubmission, 'id' | 'created_at'>) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info(`Adding a new pension submission`, submission);

      const { data, error: insertError } = await supabase
        .from('pension_submissions')
        .insert([submission]);

      if (insertError) {
        logger.error(`Error adding pension submission`, insertError);
        throw insertError;
      }

      if (data) {
        submissions.value.unshift(data[0]);
        logger.info(`Pension submission added successfully`, data[0]);
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add submission.';
      logger.error(`Failed to add submission`, { error: error.value });
    } finally {
      loading.value = false;
    }
  };

  /**
   * Update an existing pension submission.
   * @param id The ID of the submission to be updated.
   * @param updatedData The updated submission data.
   */
  const updateSubmission = async (id: string, updatedData: Partial<PensionSubmission>) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info(`Updating pension submission with ID: ${id}`, updatedData);

      const { data, error: updateError } = await supabase
        .from('pension_submissions')
        .update(updatedData)
        .eq('id', id);

      if (updateError) {
        logger.error(`Error updating submission with ID: ${id}`, updateError);
        throw updateError;
      }

      if (data) {
        const index = submissions.value.findIndex((sub) => sub.id === id);
        if (index !== -1) {
          submissions.value[index] = { ...submissions.value[index], ...updatedData };
          logger.info(`Pension submission updated successfully`, submissions.value[index]);
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update submission.';
      logger.error(`Failed to update submission`, { error: error.value });
    } finally {
      loading.value = false;
    }
  };

  /**
   * Delete a pension submission.
   * @param id The ID of the submission to be deleted.
   */
  const deleteSubmission = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info(`Deleting pension submission with ID: ${id}`);

      const { error: deleteError } = await supabase
        .from('pension_submissions')
        .delete()
        .eq('id', id);

      if (deleteError) {
        logger.error(`Error deleting submission with ID: ${id}`, deleteError);
        throw deleteError;
      }

      submissions.value = submissions.value.filter((sub) => sub.id !== id);
      logger.info(`Pension submission deleted successfully`, { id });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete submission.';
      logger.error(`Failed to delete submission`, { error: error.value });
    } finally {
      loading.value = false;
    }
  };

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    addSubmission,
    updateSubmission,
    deleteSubmission,
    fetchAllSubmissions,
  };
});
