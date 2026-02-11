import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import prisma from "./db/prisma";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middlewares/error.middleware";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);


app.get("/", (req, res) => {
  res.send("Todo API is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/health/db", async (req, res) => {
  try {
    // lightweight query
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      database: "not connected"
    });
  }
});

app.use(errorHandler);
