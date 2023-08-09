import { RefreshModel } from '../../../../models/refresh.model';
import prisma from '../../prisma-client';

export async function create_refresh(
  refresh_data: RefreshModel,
): Promise<RefreshModel> {
  try {
    const created_refresh = await prisma.refresh.create({
      data: refresh_data,
    });

    return created_refresh;
  } catch (err) {
    await prisma.$disconnect();
    return {} as RefreshModel;
  }
}
