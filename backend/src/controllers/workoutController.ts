import express, { Request, Response, NextFunction } from 'express';
import { workoutService } from '../services/workoutService';
import { CustomError } from '../utils/helpers';
import { Types } from 'mongoose';
import { CreateWorkoutRequest, UpdateWorkoutRequest, WorkoutResponse } from '../types/workout';

class WorkoutController {
    async createWorkout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const workoutData: CreateWorkoutRequest = req.body;
            const userId = req.params.userId;

            const newWorkout = await workoutService.createWorkout(userId, workoutData);
            res.status(201).json(newWorkout);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async getWorkouts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId;
            const workouts = await workoutService.getWorkouts(userId);
            res.json(workouts);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async updateWorkout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const workoutId = req.params.workoutId;
            const updatedWorkoutData: UpdateWorkoutRequest = req.body;
            const updatedWorkout = await workoutService.updateWorkout(workoutId, updatedWorkoutData);
            res.json(updatedWorkout);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async deleteWorkout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const workoutId = req.params.workoutId;          
            await workoutService.deleteWorkout(workoutId);
            res.sendStatus(204);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }
}

export const workoutController = new WorkoutController();

```