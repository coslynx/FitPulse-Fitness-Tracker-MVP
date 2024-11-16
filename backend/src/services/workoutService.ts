import mongoose, { Types } from 'mongoose';
import Workout from '../models/Workout';
import { CustomError } from '../utils/helpers';
import { CreateWorkoutRequest, UpdateWorkoutRequest, WorkoutResponse } from '../types/workout';

export class WorkoutService {
    async createWorkout(userId: string, workoutData: CreateWorkoutRequest): Promise<Workout> {
        const { date, type, duration, distance, caloriesBurned } = workoutData;

        if (!userId || !date || !type || duration === undefined || duration < 0) {
            throw new CustomError('All fields are required and duration must be non-negative.', 400);
        }

        const newWorkout = new Workout({
            userId: new Types.ObjectId(userId),
            date,
            type,
            duration,
            distance,
            caloriesBurned,
        });

        try {
            const savedWorkout = await newWorkout.save();
            return savedWorkout;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new CustomError('Workout already exists.', 409);
            }
            throw new CustomError('Failed to create workout.', 500);
        }
    }

    async getWorkouts(userId: string): Promise<Workout[]> {
        try {
            const workouts = await Workout.find({ userId: new Types.ObjectId(userId) });
            return workouts;
        } catch (error: any) {
            throw new CustomError('Failed to fetch workouts.', 500);
        }
    }

    async updateWorkout(workoutId: string, updatedWorkoutData: UpdateWorkoutRequest): Promise<Workout | null> {
        try {
            const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, updatedWorkoutData, { new: true });
            if (!updatedWorkout) {
                throw new CustomError('Workout not found.', 404);
            }
            return updatedWorkout;
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new CustomError('Invalid workout ID.', 400);
            }
            throw new CustomError('Failed to update workout.', 500);
        }
    }

    async deleteWorkout(workoutId: string): Promise<void> {
        try {
            const workout = await Workout.findByIdAndDelete(workoutId);
            if (!workout) {
                throw new CustomError('Workout not found.', 404);
            }
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new CustomError('Invalid workout ID.', 400);
            }
            throw new CustomError('Failed to delete workout.', 500);
        }
    }
}

export const workoutService = new WorkoutService();

```