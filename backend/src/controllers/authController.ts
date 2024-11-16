import express, { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { CustomError } from '../utils/helpers';
import { RegisterRequest, LoginRequest } from '../types/api';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body as RegisterRequest;

    try {
        const authResponse = await authService.register({ email, name, password });
        if (!authResponse.success) {
            throw new CustomError(authResponse.error!, 400);
        }
        res.status(201).json(authResponse.data);
    } catch (error: any) {
        next(new CustomError(error.message, error.status || 500));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginRequest;

    try {
        const authResponse = await authService.login({ email, password });
        if (!authResponse.success) {
            throw new CustomError(authResponse.error!, 401);
        }
        res.json(authResponse.data);
    } catch (error: any) {
        next(new CustomError(error.message, error.status || 500));
    }
};

```