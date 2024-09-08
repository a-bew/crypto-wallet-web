import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { z } from 'zod';

// Request validation schema using Zod
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

// User registration
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await userService.registerUser(validatedData);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

// User login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};
