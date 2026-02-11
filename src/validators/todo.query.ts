// src/validators/todo.query.ts
import { z } from "zod";

export const todoQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  completed: z
    .enum(["true", "false"])
    .optional()
    .transform(val =>
      val === undefined ? undefined : val === "true"
    ),
  search: z.string().min(1).optional()
});
