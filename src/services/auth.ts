import { api } from './api';
import { RegisterRequest, LoginRequest, ApiResponse } from '../types/api';

export interface RegisterResponse {
  token: string;
  user: {
    _id: string;
    // Add other relevant user fields as needed
  };
}

export const register = async (userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const response = await api.post('/auth/register', userData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Registration failed' };
  }
};

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    // Add other relevant user fields as needed
  };
}

export const login = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await api.post('/auth/login', credentials);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Login failed' };
  }
};

```