import { api, ApiResponse } from './api';

interface Goal {
  _id?: string;
  userId: string;
  title: string;
  type: string;
  target: number;
  deadline: Date;
  progress: number;
}

interface PartialGoal extends Partial<Goal> {
    _id: string;
}


const createGoal = async (userId: string, goalData: Goal): Promise<ApiResponse<Goal>> => {
  try {
    const response = await api.post(`/goals/${userId}`, goalData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to create goal' };
  }
};

const getGoals = async (userId: string): Promise<ApiResponse<Goal[]>> => {
  try {
    const response = await api.get(`/goals/${userId}`);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch goals' };
  }
};

const updateGoal = async (goalId: string, updatedGoalData: PartialGoal): Promise<ApiResponse<Goal>> => {
  try {
    const response = await api.put(`/goals/${goalId}`, updatedGoalData);
    return { success: true, data: response.data, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to update goal' };
  }
};

const deleteGoal = async (goalId: string): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete(`/goals/${goalId}`);
    return { success: true, data: null, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.response?.data?.error || 'Failed to delete goal' };
  }
};

const getGoalProgress = async (goalId: string): Promise<ApiResponse<{ dates: Date[]; progress: number[] }>> => {
    try {
      const response = await api.get(`/goals/${goalId}/progress`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.response?.data?.error || 'Failed to fetch goal progress' };
    }
  };

export { createGoal, getGoals, updateGoal, deleteGoal, getGoalProgress };
```