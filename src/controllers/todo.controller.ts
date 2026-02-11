import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { createTodoSchema, updateTodoSchema } from "../validators/todo.schema";
import { asyncHandler } from "../utils/async-handler";
import { todoQuerySchema } from "../validators/todo.query";

const todoService = new TodoService();

export const createTodo = asyncHandler(async (req: Request, res: Response) => {

    const { title } = createTodoSchema.parse(req.body);
    const userId = req.user!.id;
    const todo = await todoService.create(userId, title);
    res.status(201).json(todo);

});

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const query = todoQuerySchema.parse(req.query);
  const todos = await todoService.getAll(userId, query);
  res.json(todos);
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  
  const id = Number(req.params.id);
  const { completed } = updateTodoSchema.parse(req.body);
  const userId = req.user!.id;

  await todoService.update(id, userId, completed);
  res.json({ message: "Updated" });
  
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user!.id;

  await todoService.delete(id, userId);
  res.json({ message: "Deleted" });
});
