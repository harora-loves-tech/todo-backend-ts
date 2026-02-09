import prisma from "../db/prisma";

export class TodoService {

  create(title: string, userId: number) {
    return prisma.todo.create({
      data: { title, userId }
    });
  }

  getAll(userId: number) {
    return prisma.todo.findMany({
      where: { userId }
    });
  }

  update(id: number, userId: number, completed: boolean) {
    return prisma.todo.updateMany({
      where: { id, userId },
      data: { completed }
    });
  }

  delete(id: number, userId: number) {
    return prisma.todo.deleteMany({
      where: { id, userId }
    });
  }
}
