import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

const todoService = new TodoService();

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = (req as any).userId;

  const todo = await todoService.create(title, userId);
  res.status(201).json(todo);
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const todos = await todoService.getAll(userId);
  res.json(todos);
};

export const updateTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { completed } = req.body;
  const userId = (req as any).userId;

  await todoService.update(id, userId, completed);
  res.json({ message: "Updated" });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = (req as any).userId;

  await todoService.delete(id, userId);
  res.json({ message: "Deleted" });
};
