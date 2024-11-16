import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/helpers';
import { RegisterRequest, LoginRequest, RegisterResponse, LoginResponse } from '../types/api';

export class AuthService {
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const { email, name, password } = userData;

    if (!email || !name || !password) {
      throw new CustomError('All fields are required', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('Email already in use', 400);
    }


    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ email, name, passwordHash });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET!);

    return {
      token,
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
      },
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new CustomError('Email and password are required', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }

    const passwordMatch = await user.verifyPassword(password);
    if (!passwordMatch) {
      throw new CustomError('Invalid credentials', 401);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }
}

export const authService = new AuthService();
```