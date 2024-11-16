import express, { Router, Request, Response, NextFunction } from 'express';
import { workoutController } from '../controllers/workoutController';
import { authenticateToken } from '../middleware/authMiddleware';
import { CreateWorkoutRequest, UpdateWorkoutRequest } from '../types/workout';

const workoutRouter: express.Router = express.Router();

workoutRouter.post('/:userId/workouts', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newWorkout = await workoutController.createWorkout(req.params.userId, req.body as CreateWorkoutRequest);
        res.status(201).json(newWorkout);
    } catch (error) {
        next(error);
    }
});

workoutRouter.get('/:userId/workouts', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workouts = await workoutController.getWorkouts(req.params.userId);
        res.json(workouts);
    } catch (error) {
        next(error);
    }
});

workoutRouter.put('/:workoutId', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedWorkout = await workoutController.updateWorkout(req.params.workoutId, req.body as UpdateWorkoutRequest);
        res.json(updatedWorkout);
    } catch (error) {
        next(error);
    }
});

workoutRouter.delete('/:workoutId', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await workoutController.deleteWorkout(req.params.workoutId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

export { workoutRouter };

```