import getFlagEmoji from 'country-flag-icons/unicode';
import countriesData from 'world-countries';

export interface CountryData {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

// Custom error for country-related operations
export class CountryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CountryError';
  }
}

// Create the countries array with proper formatting and sorting
export const countries: CountryData[] = countriesData
  .map((country) => ({
    name: country.name.common,
    code: country.cca2,
    dialCode: (country.idd.root || '') + (country.idd.suffixes?.[0] || ''),
    flag: getFlagEmoji(country.cca2),
  }))
  .filter((country): country is CountryData => {
    // Type guard to ensure all required fields are present
    return Boolean(
      country.dialCode &&
      country.name &&
      country.code &&
      country.flag
    );
  })
  .sort((a, b) => a.name.localeCompare(b.name))
  .sort((a, b) => a.code === 'GB' ? -1 : b.code === 'GB' ? 1 : 0);

// Helper functions with improved error handling
export const findCountryByCode = (code: string): CountryData => {
  const country = countries.find(country => 
    country.code.toLowerCase() === code.toLowerCase()
  );
  
  if (!country) {
    throw new CountryError(`Country not found for code: ${code}`);
  }
  
  return country;
};

export const findCountryByDialCode = (dialCode: string): CountryData => {
  // Normalize the dial code by removing spaces and '+' symbol
  const normalizedDialCode = dialCode.replace(/[\s+]/g, '');
  
  const country = countries.find(country => 
    country.dialCode.replace(/[\s+]/g, '') === normalizedDialCode
  );
  
  if (!country) {
    throw new CountryError(`Country not found for dial code: ${dialCode}`);
  }
  
  return country;
};

// Extended phone number formatting with validation
export const formatPhoneNumber = (
  number: string, 
  countryCode: string,
  options: { strict?: boolean } = {}
): string => {
  const cleaned = number.replace(/\D/g, '');
  
  // Optional strict validation
  if (options.strict) {
    const expectedLengths: Record<string, number> = {
      'GB': 10, // UK
      'US': 10, // USA
      'IN': 10, // India
      // Add more country-specific lengths as needed
    };
    
    const expectedLength = expectedLengths[countryCode];
    if (expectedLength && cleaned.length !== expectedLength) {
      throw new CountryError(
        `Invalid phone number length for ${countryCode}. Expected ${expectedLength} digits.`
      );
    }
  }
  
  switch (countryCode) {
    case 'GB': // UK
      return cleaned.replace(/(\d{4})(\d{6})/, '$1 $2');
    case 'US': // USA
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    case 'IN': // India
      return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
    default:
      // Default formatting: groups of 3-4 digits
      return cleaned.replace(/(\d{3,4})(?=\d)/g, '$1 ').trim();
  }
};

// Additional utility functions

export const getCountryDialCode = (code: string): string => {
  return findCountryByCode(code).dialCode;
};

export const validatePhoneNumberForCountry = (
  number: string,
  countryCode: string
): boolean => {
  try {
    formatPhoneNumber(number, countryCode, { strict: true });
    return true;
  } catch {
    return false;
  }
};

export const normalizePhoneNumber = (
  number: string,
  countryCode: string
): string => {
  const country = findCountryByCode(countryCode);
  const cleaned = number.replace(/\D/g, '');
  return `${country.dialCode}${cleaned}`;
};