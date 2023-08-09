import { TaskModel } from '../../../../models/task.model';
import prisma from '../../prisma-client';

export async function find_many_user_tasks(
  project_id: string,
  user_id: string,
): Promise<TaskModel[] | null> {
  const tasks = await prisma.task.findMany({
    where: { project_id, created_by: user_id },
  });
}
