import { env } from './env.js';

export const config = {
  app: {
    port: env.PORT,
    env: env.NODE_ENV
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  db: {
    uri: env.DATABASE_URL
  }
};
