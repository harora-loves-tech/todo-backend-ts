import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { createTodoSchema, updateTodoSchema } from "../validators/todo.schema";

const todoService = new TodoService();

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = createTodoSchema.parse(req.body);
    const userId = (req as any).userId;

    const todo = await todoService.create(title, userId);
    res.status(201).json(todo);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Failed to create todo" });
  }
};


export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const todos = await todoService.getAll(userId);
  res.json(todos);
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { completed } = updateTodoSchema.parse(req.body);
    const userId = (req as any).userId;

    await todoService.update(id, userId, completed);
    res.json({ message: "Updated" });
  }  catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = (req as any).userId;

  await todoService.delete(id, userId);
  res.json({ message: "Deleted" });
};
