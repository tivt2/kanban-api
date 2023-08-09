import { TaskModel } from '../../../../models/task.model';
import prisma from '../../prisma-client';

export async function find_many_user_tasks(
  user_id: string,
): Promise<TaskModel[] | null> {
  try {
    const tasks = await prisma.task.findMany({
      where: { created_by: user_id },
      include: { updates: true },
    });

    return tasks;
  } catch {
    prisma.$disconnect();
    return null;
  }
}
