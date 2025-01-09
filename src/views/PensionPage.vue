<template>
  <section class="pension-page bg-white">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64">
      <img
        src="@/assets/pension-banner.png"
        alt="Add a Pension"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Form Section -->
    <div class="form-section max-w-xl mx-auto mt-8 px-4">
      <!-- Title -->
      <h1 class="text-3xl font-gilroy-bold text-center text-gray-800">
        Add a Pension
      </h1>
      <p class="text-center text-gray-600 font-gilroy-light mt-2">
        Please provide the name of your previous pension provider. The more details you share, the quicker we can transfer your funds.
      </p>

      <!-- Pension Form -->
      <form @submit.prevent="handlePensionsSubmit" class="space-y-6 mt-6">
        <!-- Listing Multiple Pensions -->
        <div v-for="(pension, index) in pensions" :key="index" class="pension-entry border border-gray-200 rounded-lg p-6 relative">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-gilroy-bold text-gray-700">
              Pension {{ index + 1 }}
            </h2>
            <button 
              type="button" 
              @click="removePension(index)"
              class="text-red-500 hover:text-red-700 p-2"
              :disabled="pensions.length === 1"
              :class="{ 'opacity-50 cursor-not-allowed': pensions.length === 1 }"
            >
              Remove
            </button>
          </div>

          <!-- Pension Provider -->
          <div class="mb-4">
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Who is the pension provider?
            </label>
            <select
              v-model="pension.provider"
              class="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>Select Pension</option>
              <option value="AJ Bell">AJ Bell</option>
              <option value="Aviva">Aviva</option>
              <option value="BestInvest">BestInvest</option>
              <option value="Creative Pension">Creative Pension</option>
              <option value="Interactive Investor">Interactive Investor</option>
              <option value="National Employment Savings Trust">National Employment Savings Trust</option>
              <option value="Nest">Nest</option>
              <option value="NOW: Pensions">NOW: Pensions</option>
              <option value="People's Pension">People's Pension</option>
              <option value="Smart Pensions">Smart Pensions</option>
              <option value="Standard Life">Standard Life</option>
              <option value="True Potential Investments">True Potential Investments</option>
              <option value="Others">Others</option>
            </select>

            <!-- Custom Provider Input (shows only when Others is selected) -->
            <div v-if="pension.provider === 'Others'" class="mt-4">
              <label class="block text-gray-600 font-gilroy-light mb-2">
                Please specify your pension provider
              </label>
              <input
                type="text"
                v-model="pension.customProvider"
                placeholder="Enter pension provider name"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <!-- Policy Number -->
          <div class="mb-4">
            <label class="block text-gray-600 font-gilroy-light mb-2">
              What is your policy number? (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter policy number"
              v-model="pension.policyNumber"
              class="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <!-- Current Employer -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Is your current employer paying into the pension?
            </label>
            <div class="flex space-x-4">
              <button
                type="button"
                :class="pension.currentEmployer === true ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="pension.currentEmployer = true"
                class="p-3 w-full rounded-lg border"
              >
                Yes
              </button>
              <button
                type="button"
                :class="pension.currentEmployer === false ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="pension.currentEmployer = false"
                class="p-3 w-full rounded-lg border"
              >
                No
              </button>
            </div>
          </div>
        </div>

        <!-- Add Another Pension Button -->
        <button
          type="button"
          class="w-full bg-gray-200 text-gray-800 p-3 rounded-lg font-gilroy-light hover:bg-gray-300 transition-colors"
          @click="addAnotherPension"
        >
          Add another pension
        </button>

        <!-- Signature Section -->
        <div class="signature-box border border-gray-300 rounded-lg p-4">
          <div class="signature-pad-container">
            <VueSignature
              ref="signaturePad"
              :width="600"
              :height="150"
              :options="{ 
                backgroundColor: '#fff',
                penColor: '#000',
                minWidth: 2,
                maxWidth: 4
              }"
              @begin="onSignatureStart"
              @end="onSignatureEnd"
              class="mx-auto border border-gray-300 rounded-lg"
            />
            
            <!-- Interactive Elements -->
            <div class="flex justify-between items-center mt-2">
              <div class="text-sm text-gray-600">
                {{ hasSignature ? 'Keep signing or click Save when done' : 'Click and drag to sign' }}
              </div>
              <div class="flex space-x-2">
                <button 
                  type="button"
                  @click="clearSignature"
                  class="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded"
                >
                  Clear
                </button>
                <button 
                  type="button"
                  @click="saveSignature"
                  class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  :disabled="!hasSignature"
                >
                  Save Signature
                </button>
              </div>
            </div>

            <!-- Debug Info -->
            <div class="mt-2 text-xs text-gray-500">
              Status: {{ hasSignature ? 'Drawing detected' : 'No drawing' }} | 
              Saved: {{ signatureImage ? 'Yes' : 'No' }}
            </div>
          </div>

          <!-- Original commented section restored -->
          <!-- <div class="flex justify-between items-center mt-2">
            <div class="text-sm text-gray-600">
              {{ hasSignature ? 'Signature detected' : 'Please sign above' }}
            </div>
            <div class="flex space-x-2">
              <button 
                type="button"
                @click="clearSignature"
                class="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded"
              >
                Clear
              </button>
              <button 
                type="button"
                @click="saveSignature"
                class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                :disabled="!hasSignature"
              >
                Save Signature
              </button>
            </div>
          </div> -->

          <!-- Show saved signature if exists -->
          <div v-if="signatureImage" class="mt-4 border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600 mb-2">Your saved signature:</p>
            <img 
              :src="signatureImage" 
              alt="Saved signature" 
              class="border border-gray-200 rounded p-2 bg-white max-h-20 object-contain"
            />
          </div>
        </div>

        <!-- Confirmations -->
        <div class="mt-6">
          <label class="flex items-start space-x-2 text-gray-600 font-gilroy-light cursor-pointer">
            <input type="checkbox" v-model="confirmAgreement" class="mt-1" />
            <span>I agree to transfer the pension balance(s) to the PensionPilot Tailored Plan. I'm aware I can change my plan at any time.</span>
          </label>
          <label class="flex items-start space-x-2 text-gray-600 font-gilroy-light mt-4 cursor-pointer">
            <input type="checkbox" v-model="confirmTerms" class="mt-1" />
            <span>I confirm that I've read, understand, and agree to the Terms, including the Declarations, Data Protection, and Transfer authorizations contained therein.</span>
          </label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-gilroy-bold mt-6"
          :disabled="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';
import { useAuthStore } from '@/stores/auth';
import VueSignature from 'vue3-signature';
import { EmailService } from '@/lib/services/emailService';

const pensionStore = usePensionSubmissionsStore();
const authStore = useAuthStore();

// Form data
const pensions = reactive([
  {
    provider: '',
    customProvider: '',
    policyNumber: '',
    currentEmployer: null,
  }
]);

// UI state
const isSubmitting = ref(false);
const confirmAgreement = ref(false);
const confirmTerms = ref(false);

// Signature Section
const signaturePad = ref(null);
const hasSignature = ref(false);
const signatureImage = ref(null);

// Signature handlers
const onSignatureStart = () => {
  console.log('Drawing started');
  hasSignature.value = true;
};

const onSignatureEnd = () => {
  console.log('Drawing ended');
  saveCurrentSignature();
};

const saveCurrentSignature = () => {
  if (!signaturePad.value) {
    console.error('No signature pad reference');
    return;
  }

  try {
    const canvas = signaturePad.value.$el.getElementsByTagName('canvas')[0];
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const imageData = canvas.toDataURL('image/png');
    signatureImage.value = imageData;
    console.log('Signature saved:', !!imageData);
  } catch (error) {
    console.error('Failed to save signature:', error);
  }
};

const clearSignature = () => {
  if (!signaturePad.value) return;
  
  try {
    signaturePad.value.clear();
    signatureImage.value = null;
    hasSignature.value = false;
    console.log('Signature cleared');
  } catch (error) {
    console.error('Failed to clear signature:', error);
  }
};

const saveSignature = () => {
  console.log('Manual save triggered');
  saveCurrentSignature();
};

// Pension methods
const addAnotherPension = () => {
  pensions.push({
    provider: '',
    customProvider: '',
    policyNumber: '',
    currentEmployer: null,
  });
};

const removePension = (index) => {
  if (pensions.length > 1) {
    pensions.splice(index, 1);
  }
};

// Form validation
const isFormValid = computed(() => {
  const hasValidPensions = pensions.every(pension => {
    if (!pension.provider) return false;
    if (pension.provider === 'Others' && !pension.customProvider) return false;
    return true;
  });
  
  const hasRequiredFields = hasValidPensions && confirmAgreement.value && confirmTerms.value;
  const hasValidSignature = Boolean(signatureImage.value);

  return hasRequiredFields && hasValidSignature;
});

// Form submission
const handlePensionsSubmit = async () => {
  if (!authStore.isLoggedIn) {
    alert('Please log in to submit pensions.');
    return;
  }

  if (!isFormValid.value) {
    alert('Please complete all required fields.');
    return;
  }

  try {
    isSubmitting.value = true;
    const validPensions = pensions.filter(pension => pension.provider);

    for (const pension of validPensions) {
      const submissionData = {
        user_id: authStore.user.id,
        provider: pension.provider === 'Others' ? pension.customProvider : pension.provider,
        policy_number: pension.policyNumber || null,
        current_employer: Boolean(pension.currentEmployer),
        signature_provided: Boolean(signatureImage.value)
      };

      await pensionStore.addSubmission(submissionData);
    }

    try {
      await EmailService.sendSubmissionReceivedEmail(
        authStore.user.email,
        authStore.user.name
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    alert('Pensions submitted successfully!');
    resetForm();
  } catch (error) {
    console.error('Error submitting pensions:', error);
    alert('Failed to submit pensions. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  pensions.splice(0, pensions.length, {
    provider: '',
    customProvider: '',
    policyNumber: '',
    currentEmployer: null,
  });
  confirmAgreement.value = false;
  confirmTerms.value = false;
  signatureImage.value = null;
  hasSignature.value = false;
  if (signaturePad.value) {
    signaturePad.value.clear();
  }
};
</script>

<style scoped>
.signature-box {
  background: white;
}

/* Form inputs */
input:focus, select:focus {
  outline: none;
  border-color: #3B82F6;
  ring: 2px;
  ring-color: rgba(59, 130, 246, 0.2);
}

/* Transitions */
.pension-entry {
  transition: all 0.3s ease;
}

button {
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>