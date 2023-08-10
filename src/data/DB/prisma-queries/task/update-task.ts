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

      const old_task = await tx.task.findUnique({
        where: { id: task_id },
        select: { title: true, content: true, status: true },
      });

      if (!old_task) {
        return null;
      }
      const update_task = {
        // task_id,
        updated_by: user_id,
        ...old_task,
      };

      const task = await tx.task.update({
        where: { id: task_id },
        data: {
          title,
          content,
          status,
          updates: {
            create: update_task,
          },
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
