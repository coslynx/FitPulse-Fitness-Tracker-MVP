import express, { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';

const authRouter: Router = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export { authRouter };

```