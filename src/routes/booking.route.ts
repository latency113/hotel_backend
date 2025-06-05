import { Elysia } from 'elysia';
import {
    getBookingController,
    getBookingByIdController,
    createBookingController,
    updateBookingController,
    deleteBookingController,

    getUserBookingsController,

    getBookingDetailsController,
    createBookingDetailController,
    updateBookingDetailController,
    deleteBookingDetailController,
} from '../controllers/booking.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

export const bookingRoute = new Elysia({ prefix: '/api/bookings' })
    .derive(authMiddleware)
    .get('/', getBookingController,)
    .get('/:id', getBookingByIdController,)
    .post('/', createBookingController,)
    .put('/:id', updateBookingController,)
    .delete('/:id', deleteBookingController,)

    .get('/user', getUserBookingsController,)

    .get('/:id/details', getBookingDetailsController,)
    .post('/details', createBookingDetailController,)
    .put('/details/:detailId', updateBookingDetailController,)
    .delete('/details/:detailId', deleteBookingDetailController,);

