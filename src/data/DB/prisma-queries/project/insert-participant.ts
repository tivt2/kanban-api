import { ProjectModel } from '../../../../models/project.model';
import prisma from '../../prisma-client';

export async function insert_participant(
  project_id: string,
  user_id: string,
): Promise<ProjectModel | null> {
  try {
    const project = await prisma.project.update({
      where: {
        id: project_id,
      },
      data: {
        participants: {
          connect: {
            id: user_id,
          },
        },
      },
      include: {
        participants: true,
      },
    });

    return project;
  } catch {
    await prisma.$disconnect();
    return null;
  }
}
