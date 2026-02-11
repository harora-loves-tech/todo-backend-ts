import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error";

interface JwtPayload {
  userId: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return new AppError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return new AppError("Invalid token format", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // attach userId to request
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    return new AppError("IInvalid or expired token", 401);

  }
};
