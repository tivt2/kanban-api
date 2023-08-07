import prisma from '../../prisma-client';

export async function delete_user_refreshes_by_user_id(
  user_id: string,
): Promise<void> {
  try {
    await prisma.refresh.deleteMany({ where: { user_id } });
  } catch {
    prisma.$disconnect();
    process.exit(1);
  }
}
