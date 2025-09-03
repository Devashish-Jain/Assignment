export interface School {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string; // Changed to string to support +91 format
  email_id: string;
  images: string; // JSON string of image filenames array
  created_at?: string;
}

export interface SchoolCreateRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number | string; // Accept both for input flexibility
  email_id: string;
}

export interface SchoolResponse extends Omit<School, 'images'> {
  images: string[]; // Parsed array of image filenames
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
