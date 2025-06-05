import type { Context } from 'elysia';
import type jwt from '@elysiajs/jwt';
import { registerUser, loginUser, getRefreshTokenMaxAge, refreshAccessToken } from '../services/auth.service';

type JwtInstance = ReturnType<typeof jwt>['config']['decorate']['jwt'];

export const registerController = async ({ body, set }: Context) => {
  try {
    const { name, email, password, phone } = body as {
      name: string;
      email: string;
      password: string;
      phone: string;
    };

    const user = await registerUser({ name, email, password, phone });

    return {
      message: 'User registered successfully',
      user,
    };
  } catch (error: any) {
    set.status = 400;
    return { message: error.message || 'Internal server error' };
  }
};

export const loginController = async ({
  body,
  set,
  jwt,
  cookie,
}: Context & { jwt: JwtInstance }) => {
  try {
    const { email, password } = body as {
      email: string;
      password: string;
    };

    const { user, accessToken, refreshToken } = await loginUser(email, password, jwt);

    cookie.accesToken.set({
      value: accessToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 15,
    });

    cookie.refreshToken.set({
      value: refreshToken,
      httpOnly: true,
      path: '/',
      maxAge: getRefreshTokenMaxAge(),
    });

    return {
      message: 'Login successful',
      user,
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    set.status = 401;
    return { message: error.message || 'Internal server error' };
  }
};

export const refreshTokenController = async ({ cookie, jwt, set }: Context & { jwt: JwtInstance }) => {
  try {
    const refreshToken = cookie?.refreshToken?.value;
    if (!refreshToken) {
      set.status = 401;
      return { message: 'Refresh token not provided' };
    }
    const tokens = await refreshAccessToken(refreshToken, jwt);
    return {
      message: 'Token refreshed successfully',
      ...tokens,
    };
  } catch (error: any) {
    set.status = 401;
    return { message: error.message || 'Failed to refresh token' };
  }
}