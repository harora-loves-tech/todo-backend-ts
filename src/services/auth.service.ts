import bcrypt from "bcrypt";
import prisma from "../db/prisma";
import jwt from  "jsonwebtoken";
import { AppError } from "../utils/app-error";


export class AuthService {

  async register(email: string, password: string) {
    // check existing user
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    return user;
  }


  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError("Invalid credentials",401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid credentials",401);
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return token;
  }

}



