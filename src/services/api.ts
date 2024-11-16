import axios from 'axios';

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

async function login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
  try {
    const response = await api.post('/auth/login', { email, password });
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Login failed' };
  }
}

async function register(userData: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.post('/auth/register', userData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Registration failed' };
  }
}


async function createGoal(userId: string, goalData: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.post(`/goals/${userId}`, goalData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to create goal' };
  }
}

async function getGoals(userId: string): Promise<ApiResponse<any[]>> {
  try {
    const response = await api.get(`/goals/${userId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch goals' };
  }
}

async function updateGoal(goalId: string, updatedGoalData: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.put(`/goals/${goalId}`, updatedGoalData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to update goal' };
  }
}

async function deleteGoal(goalId: string): Promise<ApiResponse<any>> {
  try {
    const response = await api.delete(`/goals/${goalId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to delete goal' };
  }
}

async function getGoalProgress(goalId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.get(`/goals/${goalId}/progress`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch goal progress' };
    }
  }


async function createWorkout(userId: string, workoutData: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.post(`/workouts/${userId}`, workoutData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to create workout' };
  }
}

async function getWorkouts(userId: string): Promise<ApiResponse<any[]>> {
  try {
    const response = await api.get(`/workouts/${userId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch workouts' };
  }
}

async function updateWorkout(workoutId: string, updatedWorkoutData: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.put(`/workouts/${workoutId}`, updatedWorkoutData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to update workout' };
  }
}

async function deleteWorkout(workoutId: string): Promise<ApiResponse<any>> {
  try {
    const response = await api.delete(`/workouts/${workoutId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to delete workout' };
  }
}

async function getRecentWorkouts(userId: string): Promise<ApiResponse<any[]>> {
  try {
    const response = await api.get(`/workouts/${userId}/recent`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch recent workouts' };
  }
}

async function getUserProfile(userId: string): Promise<ApiResponse<any>> {
  try {
    const response = await api.get(`/users/${userId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch user profile' };
  }
}

async function updateUserProfile(userId: string, updatedUserData: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.put(`/users/${userId}`, updatedUserData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to update user profile' };
  }
}

export { login, register, createGoal, getGoals, updateGoal, deleteGoal, createWorkout, getWorkouts, updateWorkout, deleteWorkout, getRecentWorkouts, getUserProfile, updateUserProfile, getGoalProgress };

```