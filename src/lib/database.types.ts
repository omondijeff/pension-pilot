export interface User {
  id: string; // References auth.users.id
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface KycProfile {
  id: string;
  user_id: string; // References users.id
  dob: string; // Format: YYYY-MM-DD
  gender: string;
  mobile_country: string;
  mobile_number: string;
  national_insurance: string;
  postcode: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id'>; // Insert all fields except `id` (auto-generated)
        Update: Partial<User>; // Allow updating partial fields
      };
      kyc_profiles: {
        Row: KycProfile;
        Insert: Omit<KycProfile, 'id'>; // Insert all fields except `id` (auto-generated)
        Update: Partial<KycProfile>; // Allow updating partial fields
      };
    };
  };
}
