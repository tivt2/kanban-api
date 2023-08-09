import { ProjectModel } from '../../../../models/project.model';
import prisma from '../../prisma-client';

export async function create_project(
  user_id: string,
  title: string,
  description: string,
): Promise<ProjectModel> {
  try {
    const project = await prisma.project.create({
      data: {
        created_by: user_id,
        title,
        description,
        participants: { connect: { id: user_id } },
      },
      include: {
        participants: true,
      },
    });

    return project;
  } catch {
    await prisma.$disconnect();
    return {} as ProjectModel;
  }
}
