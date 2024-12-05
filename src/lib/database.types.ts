// src/lib/database.types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Database {
    public: {
      Tables: {
        users: {
          Row: User;
          Insert: Omit<User, 'id'>;
          Update: Partial<User>;
        };
      };
    };
  }
  