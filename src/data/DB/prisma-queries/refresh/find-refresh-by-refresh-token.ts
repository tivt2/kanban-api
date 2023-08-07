import { TRefreshToken } from '../../../../models/refresh-token.model';
import prisma from '../../prisma-client';

export async function find_refresh_by_refresh_token(
  refresh_token: string,
): Promise<TRefreshToken | null> {
  try {
    const refresh = await prisma.refresh.findUnique({
      where: { refresh_token },
    });

    return refresh;
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}