import mongoose, { Types } from 'mongoose';
import Goal from '../models/Goal';
import { CustomError } from '../utils/helpers';

export class GoalService {
  async createGoal(userId: string, goalData: Partial<Goal>): Promise<Goal> {
    const { title, type, target, deadline } = goalData;

    if (!title || !type || target === undefined || target <=0 || !deadline) {
      throw new CustomError('All fields are required and target must be greater than 0.', 400);
    }

    const newGoal = new Goal({ userId, title, type, target, deadline, progress:0 });
    try {
      const savedGoal = await newGoal.save();
      return savedGoal;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new CustomError('Goal already exists.', 409);
      }
      throw new CustomError('Failed to create goal.', 500);
    }
  }

  async getGoals(userId: string): Promise<Goal[]> {
    try {
      const goals = await Goal.find({ userId });
      return goals;
    } catch (error: any) {
      throw new CustomError('Failed to fetch goals.', 500);
    }
  }

  async updateGoal(goalId: string, updatedGoalData: Partial<Goal>): Promise<Goal | null> {
    try {
      const goal = await Goal.findByIdAndUpdate(goalId, updatedGoalData, { new: true });
      if (!goal) {
        throw new CustomError('Goal not found.', 404);
      }
      return goal;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new CustomError('Invalid goal ID.', 400);
      }
      throw new CustomError('Failed to update goal.', 500);
    }
  }

  async deleteGoal(goalId: string): Promise<void> {
    try {
      const goal = await Goal.findByIdAndDelete(goalId);
      if (!goal) {
        throw new CustomError('Goal not found.', 404);
      }
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new CustomError('Invalid goal ID.', 400);
      }
      throw new CustomError('Failed to delete goal.', 500);
    }
  }

  async getGoalProgress(goalId: string): Promise<{ dates: Date[]; progress: number[] }> {
    try {
        const goal = await Goal.findById(goalId);
        if (!goal) {
            throw new CustomError("Goal not found", 404);
        }

        //In a real application, this would fetch workout data related to the goal and calculate progress based on that data.
        //For the MVP, we'll return sample data.

        const dates = [new Date(), new Date(), new Date()];
        const progress = [20, 40, 60];

        return { dates, progress };
    } catch (error: any) {
        if (error.name === 'CastError') {
            throw new CustomError('Invalid goal ID.', 400);
        }
        throw new CustomError('Failed to fetch goal progress.', 500);
    }
  }
}

export const goalService = new GoalService();
```