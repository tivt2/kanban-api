import { TUser } from '../../../models/user.model';
import prisma from '../prisma-client';

export async function find_user_by_email(email: string): Promise<TUser | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}
