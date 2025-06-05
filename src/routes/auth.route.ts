import { Elysia } from 'elysia';
import { registerController , loginController ,refreshTokenController} from '../controllers/auth.controller'

export const authRoute = new Elysia({prefix: '/api/auth'})
  .post('/register', registerController,)
  .post('/login', loginController)
  .get('/refresh', refreshTokenController)