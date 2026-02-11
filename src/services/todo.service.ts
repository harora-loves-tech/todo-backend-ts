import { Prisma } from "@prisma/client";
import prisma from "../db/prisma";
import { AppError } from "../utils/app-error";


type GetTodosOptions = {
    page: number;
    limit: number;
    completed?: boolean | undefined;
    search?: string | undefined;
  };

export class TodoService {
  
  async create(userId: number, title: string) {
    try {
      const todoCount = await prisma.todo.count({
        where: { userId }
      });

      if (todoCount >= 100) {
        throw new AppError("Todo limit exceeded", 403);
      }

      return await prisma.todo.create({
        data: {
          title,
          userId
        }
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AppError("Invalid todo data", 400);
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new AppError("Malformed todo request", 400);
      }

      throw new AppError("Failed to create todo", 500);
    }
  }

  

  async getAll(userId: number, options: GetTodosOptions) {
    const { page, limit, completed, search } = options;

    const skip = (page - 1) * limit;

    const where: any = {
      userId
    };

    if (completed !== undefined) {
      where.completed = completed;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive"
      };
    }

    try {
      const [items, total] = await prisma.$transaction([
        prisma.todo.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" }
        }),
        prisma.todo.count({ where })
      ]);

      return {
        items,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch {
      throw new AppError("Failed to fetch todos", 500);
    }
  }

  async update(
    userId: number,
    todoId: number,
    completed: boolean
  ) {
    try {
      const todo = await prisma.todo.findFirst({
        where: { id: todoId, userId }
      });

      if (!todo) {
        throw new AppError("Todo not found", 404);
      }

      return await prisma.todo.update({
        where: { id: todoId },
        data: {
          completed: completed
        }
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AppError("Invalid update data", 400);
      }

      throw new AppError("Failed to update todo", 500);
    }
  }

  async delete(userId: number, todoId: number) {
    try {
      const todo = await prisma.todo.findFirst({
        where: { id: todoId, userId }
      });

      if (!todo) {
        throw new AppError("Todo not found", 404);
      }

      await prisma.todo.delete({
        where: { id: todoId }
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Failed to delete todo", 500);
    }
  }
}




