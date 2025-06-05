import prisma from '../prisma/client';
import { hash, compare } from 'bcryptjs';
import { randomUUID } from 'crypto';

const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7 * 1000;

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: 'user',
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};

export const loginUser = async (
  email: string,
  password: string,
  jwt: any // JwtInstance
) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password || !(await compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const accessToken = await jwt.sign({
    id: user.id,
    role: user.role,
  });

  const refreshToken = randomUUID();
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const getRefreshTokenMaxAge = () => REFRESH_TOKEN_EXPIRES_IN / 1000;


export const refreshAccessToken = async (
  refreshToken: string,
  jwt: any // JwtInstance
) => {
  const tokenRecord = await prisma.refreshToken.findFirst({
    where: { 
      token: refreshToken }
      ,
  });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    throw new Error('Invalid or expired refresh token');
  }

  const user = await prisma.user.findUnique({ where: { id: tokenRecord.userId } });
  if (!user) throw new Error('User not found');

  const accessToken = await jwt.sign({
    id: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};
