import prisma from '../prisma/client';

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });
};

export const updateUser = async (id: string, data: {
  name?: string;
  email?: string;
  phone?: string;
  role?: 'admin' | 'user';
}) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const softDeleteUser = async (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
};
