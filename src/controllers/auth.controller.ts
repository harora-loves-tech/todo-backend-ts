import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.schema";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = registerSchema.parse(req.body);

    const user = await authService.register(email, password);

    res.status(201).json({
      id: user.id,
      email: user.email
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        errors: error.errors
      });
    }

    res.status(400).json({ message: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const token = await authService.login(email, password);

    res.json({ token });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        errors: error.errors
      });
    }

    res.status(401).json({ message: error.message });
  }
};


