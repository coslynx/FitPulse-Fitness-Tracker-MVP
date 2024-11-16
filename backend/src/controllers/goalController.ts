import { Request, Response, NextFunction } from 'express';
import { Goal, PartialGoal } from '../models/Goal';
import { goalService } from '../services/goalService';
import { CustomError } from '../utils/helpers';
import { Types } from 'mongoose';

interface CreateGoalRequest extends PartialGoal {
    userId: string;
}

interface UpdateGoalRequest extends PartialGoal {
    _id:string
}

class GoalController {
    async createGoal(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, ...goalData } = req.body as CreateGoalRequest;
            const newGoal = await goalService.createGoal(userId, goalData);
            res.status(201).json(newGoal);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async getGoals(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId;
            const goals = await goalService.getGoals(userId);
            res.json(goals);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async updateGoal(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const goalId = req.params.goalId;
            const updatedGoalData = req.body as UpdateGoalRequest;
            const updatedGoal = await goalService.updateGoal(goalId, updatedGoalData);
            res.json(updatedGoal);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async deleteGoal(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const goalId = req.params.goalId;
            await goalService.deleteGoal(goalId);
            res.sendStatus(204);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }

    async getGoalProgress(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const goalId = req.params.goalId;
            const progressData = await goalService.getGoalProgress(goalId);
            res.json(progressData);
        } catch (error: any) {
            next(new CustomError(error.message, error.status || 500));
        }
    }
}

export const goalController = new GoalController();
```