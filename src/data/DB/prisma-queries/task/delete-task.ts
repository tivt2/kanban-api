import { TaskModel } from '../../../../models/task.model';
import prisma from '../../prisma-client';

export async function delete_task(
  project_id: string,
  user_id: string,
  task_id: string,
): Promise<TaskModel | null> {
  try {
    const task = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: project_id, participants: { some: { id: user_id } } },
      });

      if (!project) {
        return null;
      }

      const task = await prisma.task.delete({
        where: { id: task_id },
        include: { updates: true },
      });

      return task;
    });

    return task;
  } catch {
    prisma.$disconnect();
    return null;
  }
}
