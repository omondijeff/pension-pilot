import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { EmailService } from '@/lib/services/emailService';
import { ref } from 'vue';

type KycProfile = {
  id: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  gender: string;
  mobile_country: string;
  mobile_number: string;
  national_insurance: string;
  postcode: string;
};

const logger = {
  info: (message: string, data?: any) => {
    console.log(`[KYC Profile Store] INFO: ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[KYC Profile Store] ERROR: ${message}`, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[KYC Profile Store] WARN: ${message}`, data || '');
  }
};

export const useKycProfileStore = defineStore('kycProfile', () => {
  const kycProfile = ref<KycProfile | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchKycProfile = async (userId: string) => {
    logger.info(`Fetching KYC profile for user`, { userId });
    
    loading.value = true;
    try {
      const { data, error: fetchError } = await supabase
        .from('kyc_profile')
        .select('*')
        .filter('user_id', 'eq', userId);
  
      if (fetchError) {
        logger.error('Supabase fetch error', fetchError);
        throw new Error(fetchError.message);
      }
  
      if (!data || data.length === 0) {
        logger.warn('No KYC profile found', { userId });
        kycProfile.value = null;
        return;
      }
  
      logger.info('KYC profile successfully fetched', { 
        profileId: data[0].id, 
        profileCount: data.length 
      });
      kycProfile.value = data[0];
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch KYC profile';
      
      logger.error(errorMessage, err);
      error.value = errorMessage;
    } finally {
      loading.value = false;
    }
  };

  const updateKycProfile = async (userId: string, kycData: KycProfile) => {
    logger.info('Updating KYC profile', { userId, kycData });
    
    loading.value = true;
    try {
      // First, get the user's email and name
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email, first_name, last_name')
        .eq('id', userId)
        .single();

      if (userError) {
        logger.error('Failed to fetch user data', userError);
        throw new Error(userError.message);
      }

      if (!userData?.email || !userData?.first_name || !userData?.last_name) {
        logger.error('Missing user data', { userId });
        throw new Error('Missing user data');
      }

      logger.info('Upserting KYC profile to Supabase');
      const { error: updateError } = await supabase
        .from('kyc_profile')
        .upsert([
          {
            user_id: userId,
            dob_day: kycData.dob_day,
            dob_month: kycData.dob_month,
            dob_year: kycData.dob_year,
            gender: kycData.gender,
            mobile_country: kycData.mobile_country,
            mobile_number: kycData.mobile_number,
            national_insurance: kycData.national_insurance,
            postcode: kycData.postcode,
          },
        ]);

      if (updateError) {
        logger.error('Supabase upsert error', updateError);
        throw new Error(updateError.message);
      }
      
      logger.info('KYC profile successfully updated', { userId });
      kycProfile.value = kycData;

      // Send confirmation email
      const userName = `${userData.first_name} ${userData.last_name}`;
      try {
        await EmailService.sendKycUpdateConfirmation(userData.email, userName);
        logger.info('KYC update confirmation email sent', { 
          email: userData.email,
          userName
        });
      } catch (emailError) {
        logger.error('Failed to send KYC update confirmation email', emailError);
        // Don't throw here - profile is still updated even if email fails
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update KYC profile';
      logger.error(errorMessage, err);
      error.value = errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { kycProfile, loading, error, fetchKycProfile, updateKycProfile };
});