import { api, ApiResponse } from './api';

interface Workout {
  _id?: string;
  userId: string;
  date: Date;
  type: string;
  duration: number;
  distance?: number;
  caloriesBurned?: number;
}

interface PartialWorkout extends Partial<Workout> {
  _id: string;
}

const createWorkout = async (userId: string, workoutData: Workout): Promise<ApiResponse<Workout>> => {
  try {
    const response = await api.post(`/workouts/${userId}`, workoutData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to create workout' };
  }
};

const getWorkouts = async (userId: string): Promise<ApiResponse<Workout[]>> => {
  try {
    const response = await api.get(`/workouts/${userId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch workouts' };
  }
};

const updateWorkout = async (workoutId: string, updatedWorkoutData: PartialWorkout): Promise<ApiResponse<Workout>> => {
  try {
    const response = await api.put(`/workouts/${workoutId}`, updatedWorkoutData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to update workout' };
  }
};

const deleteWorkout = async (workoutId: string): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete(`/workouts/${workoutId}`);
    return { success: true, data: null, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to delete workout' };
  }
};

export { createWorkout, getWorkouts, updateWorkout, deleteWorkout };
```