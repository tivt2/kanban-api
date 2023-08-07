import { REFRESH_EXPIRES_IN_MS } from '../../../../config/CONSTANTS';
import prisma from '../../prisma-client';

export async function delete_refresh_by_created_at(): Promise<void> {
  try {
    await prisma.refresh.deleteMany({
      where: {
        created_at: {
          lte: new Date(Date.now() - REFRESH_EXPIRES_IN_MS),
        },
      },
    });
  } catch {
    prisma.$disconnect();
    process.exit(1);
  }
}
