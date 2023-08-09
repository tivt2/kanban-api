import { TaskModel, TaskStatusModel } from '../../../../models/task.model';
import prisma from '../../prisma-client';

export async function update_task(
  project_id: string,
  user_id: string,
  task_id: string,
  title?: string,
  content?: string,
  status?: TaskStatusModel,
): Promise<TaskModel | null> {
  try {
    const task = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: project_id, participants: { some: { id: user_id } } },
      });

      if (!project) {
        return null;
      }

      const task = await tx.task.update({
        where: { id: task_id },
        data: {
          title,
          content,
          status,
        },
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
