import { Elysia } from 'elysia';
import { userRoute } from "./user.route";
import { authRoute } from "./auth.route";
import { roomRoute } from "./room.route";
import { bookingRoute } from './booking.route';

export const routes = new Elysia()
  .use(userRoute)
  .use(authRoute)
  .use(roomRoute)
  .use(bookingRoute)