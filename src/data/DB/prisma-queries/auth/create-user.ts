import { UserModel } from '../../../../models/user.model';
import prisma from '../../prisma-client';

export async function create_user(
  email: string,
  password: string,
): Promise<UserModel> {
  try {
    const created_user = await prisma.user.create({
      data: {
        email,
        password,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return created_user;
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}
