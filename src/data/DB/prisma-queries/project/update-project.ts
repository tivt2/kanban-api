import { ProjectModel } from '../../../../models/project.model';
import prisma from '../../prisma-client';

export async function update_project(
  project_id: string,
  user_id: string,
  title?: string,
  description?: string,
): Promise<ProjectModel | null> {
  try {
    const project = await prisma.project.update({
      where: { id: project_id, created_by: user_id },
      data: {
        title,
        description,
        updated_at: new Date(),
      },
      include: {
        participants: true,
        tasks: true,
      },
    });

    return project;
  } catch {
    await prisma.$disconnect();
    return null;
  }
}
