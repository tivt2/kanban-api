import { ProjectModel } from '../../../../models/project.model';
import prisma from '../../prisma-client';

export async function find_project_by_id_and_user_id(
  project_id: string,
  user_id: string,
): Promise<ProjectModel | null> {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: project_id,
        participants: {
          some: {
            id: user_id,
          },
        },
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
