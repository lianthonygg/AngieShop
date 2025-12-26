export interface ProfileResponse {
  id: string;
  email: string;
  user_metadata: UserMetadata;
  created_at: string;
  updated_at: string;
  app_metadata?: AppMetadata;
}

export interface ProfileError {
  error: string;
  message: string;
}

export interface UserMetadata {
  avatar_url?: string;
  name?: string;
  picture?: string;
  full_name?: string;
  email_verified?: boolean;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}
