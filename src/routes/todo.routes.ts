import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
