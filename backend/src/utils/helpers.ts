import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'CustomError';
    }

    toJSON() {
        return { message: this.message, status: this.status };
    }
}


export const validateGoalData = (goalData: any): Goal => {
    const { title, type, target, deadline } = goalData;

    if (!title || !type || typeof target !== 'number' || target <= 0 || !deadline) {
        throw new CustomError('All fields are required and target must be greater than 0.', 400);
    }

    if (typeof deadline !== 'object' || !(deadline instanceof Date) || isNaN(deadline.getTime())) {
        throw new CustomError('Invalid deadline.', 400);
    }

    return {
        title,
        type,
        target,
        deadline: new Date(deadline),
        progress: 0,
    };
};

export const validateWorkoutData = (workoutData: any): Workout => {
    const { date, type, duration, distance, caloriesBurned } = workoutData;

    if (!date || !type || typeof duration !== 'number' || duration < 0) {
        throw new CustomError('All fields are required and duration must be non-negative.', 400);
    }

    if (typeof date !== 'object' || !(date instanceof Date) || isNaN(date.getTime())) {
        throw new CustomError('Invalid date.', 400);
    }

    if (distance !== undefined && typeof distance !== 'number') {
      throw new CustomError('Distance must be a number.', 400);
    }

    if (caloriesBurned !== undefined && typeof caloriesBurned !== 'number') {
      throw new CustomError('Calories Burned must be a number.', 400);
    }

    return {
        date: new Date(date),
        type,
        duration,
        distance: distance === undefined ? undefined : distance,
        caloriesBurned: caloriesBurned === undefined ? undefined : caloriesBurned,
    };
};


interface Goal {
    title: string;
    type: string;
    target: number;
    deadline: Date;
    progress: number;
}

interface Workout {
    date: Date;
    type: string;
    duration: number;
    distance?: number;
    caloriesBurned?: number;
}


export const generateAuthToken = (userId: string): string => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!);
        return token;
    } catch (error) {
        throw new CustomError('Failed to generate auth token.', 500);
    }
};

export const verifyAuthToken = (token: string): { userId: string } => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded as { userId: string };
    } catch (error) {
        throw new CustomError('Invalid or expired auth token.', 401);
    }
};
```