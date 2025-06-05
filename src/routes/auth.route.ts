import { Elysia } from 'elysia';
import { registerController , loginController } from '../controllers/auth.controller'

export const authRoute = new Elysia({prefix: '/api/auth'})
  .post('/register', registerController,)
  .post('/login', loginController)