import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Types for API responses
export interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  email_id: string;
  images: string[];
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface SchoolCreateData {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  email_id: string;
  images: File[];
}

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (development only)
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use(
    (config) => {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('🚨 API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('🚨 API Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || error.response.data?.message || 'Server error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else went wrong
      throw new Error('An unexpected error occurred');
    }
  }
);

// API Service class
class ApiService {
  /**
   * Create a new school with images
   */
  async createSchool(schoolData: SchoolCreateData): Promise<School> {
    const formData = new FormData();
    
    // Append text fields
    formData.append('name', schoolData.name);
    formData.append('address', schoolData.address);
    formData.append('city', schoolData.city);
    formData.append('state', schoolData.state);
    formData.append('contact', schoolData.contact.toString());
    formData.append('email_id', schoolData.email_id);
    
    // Append image files
    schoolData.images.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post<ApiResponse<School>>('/api/schools', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to create school');
    }

    return response.data.data;
  }

  /**
   * Get all schools
   */
  async getAllSchools(): Promise<School[]> {
    const response = await apiClient.get<ApiResponse<School[]>>('/api/schools');
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch schools');
    }

    return response.data.data;
  }

  /**
   * Search schools by query
   */
  async searchSchools(query: string): Promise<School[]> {
    if (!query.trim()) {
      return this.getAllSchools();
    }

    const response = await apiClient.get<ApiResponse<School[]>>('/api/schools/search', {
      params: { q: query.trim() }
    });
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to search schools');
    }

    return response.data.data;
  }

  /**
   * Get a single school by ID
   */
  async getSchoolById(id: number): Promise<School> {
    const response = await apiClient.get<ApiResponse<School>>(`/api/schools/${id}`);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch school');
    }

    return response.data.data;
  }

  /**
   * Get the full image URL for an image ID
   */
  getImageUrl(imageId: string): string {
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/images/${imageId}`;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.get('/health');
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
