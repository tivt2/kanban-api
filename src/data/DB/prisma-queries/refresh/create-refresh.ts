import { TRefreshToken } from '../../../../models/refresh-token.model';
import prisma from '../../prisma-client';

export async function create_refresh(
  refresh_data: TRefreshToken,
): Promise<TRefreshToken> {
  try {
    const created_refresh = await prisma.refresh.create({
      data: refresh_data,
    });

    return created_refresh;
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}
