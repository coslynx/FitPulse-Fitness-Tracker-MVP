import express, { Request, Response, NextFunction, Router } from 'express';
import { goalController } from '../controllers/goalController';
import { authenticateToken } from '../middleware/authMiddleware';

const goalRouter: Router = express.Router();

goalRouter.post('/:userId', authenticateToken, goalController.createGoal);
goalRouter.get('/:userId', authenticateToken, goalController.getGoals);
goalRouter.put('/:goalId', authenticateToken, goalController.updateGoal);
goalRouter.delete('/:goalId', authenticateToken, goalController.deleteGoal);
goalRouter.get('/:goalId/progress', authenticateToken, goalController.getGoalProgress);

export { goalRouter };

```