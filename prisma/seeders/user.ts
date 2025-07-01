import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.$connect();

const addUser = async () => {
  await prisma.user.create({
    data: {
      email: 'sarayi@domain.com',
      firstName: 'mohamad',
      lastName: 'sarayi',
      isActive: true,
    },
  });
};
export default addUser;
