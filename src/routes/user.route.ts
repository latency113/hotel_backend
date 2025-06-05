import { Elysia } from 'elysia'
import {
  getUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const userRoute = new Elysia({ prefix: '/api/users' })
  .derive(authMiddleware)
  .get('/', getUserController)
  .get('/:id', getUserByIdController)
  .put('/:id', updateUserController)
  .delete('/:id', deleteUserController)
