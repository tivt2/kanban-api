import { ProjectModel } from '../../../../models/project.model';
import prisma from '../../prisma-client';

export async function delete_participant_or_project(
  project_id: string,
  user_id: string,
): Promise<ProjectModel | null> {
  try {
    const project = await prisma.$transaction(async (tx) => {
      let project = await tx.project.findUnique({
        where: { id: project_id },
        include: { participants: true },
      });

      if (!project) {
        return null;
      }

      if (project.created_by === user_id) {
        const next_owner = project.participants.find(
          (participant) => participant.id !== user_id,
        );
        if (next_owner) {
          project = await tx.project.update({
            where: { id: project_id },
            data: {
              created_by: next_owner.id,
              updated_at: new Date(),
              participants: {
                disconnect: { id: user_id },
              },
            },
            include: { participants: true },
          });
        } else {
          project = await tx.project.delete({
            where: { id: project_id },
            include: { participants: true },
          });
        }

        return project;
      }

      project = await tx.project.update({
        where: { id: project_id },
        data: {
          participants: {
            disconnect: { id: user_id },
          },
        },
        include: { participants: true },
      });

      return project;
    });

    return project;
  } catch {
    await prisma.$disconnect();
    return null;
  }
}
