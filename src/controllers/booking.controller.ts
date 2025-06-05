import { Context } from "elysia";
import * as bookingService from "../services/booking.service";
import { BookingModel } from "../models/booking.model";
import { BookingDetailModel } from "../models/booking-detail.model";

export const getBookingController = async ({ set }: Context) => {
    try {
        const bookings = await bookingService.getBookings();
        return {
        message: "Bookings retrieved successfully",
        bookings,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const getBookingByIdController = async ({ params,set }: Context) => {
    try {
        const { id } = params;
        const bookings = await bookingService.getBookingById(id);
        if(!bookings){
            set.status = 404;
            return { message: "Booking not found" };
        }
        
        return {
        message: "Bookings retrieved successfully",
        bookings,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const getBookingDetailsController = async ({ params, set }: Context) => {
    try {
        const { id } = params;
        const bookingDetails = await bookingService.getBookingDetails(id);
        if (!bookingDetails) {
            set.status = 404;
            return { message: "Booking details not found" };
        }
        return {
            message: "Booking details retrieved successfully",
            bookingDetails,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const getUserBookingsController = async ({ store, set }: Context & { store: { user: { id: string } } }) => {
  const userId = store.user.id

  const user = await bookingService.getUserBookings(userId)

  if (!user) {
    set.status = 404
    return { message: 'User not found' }
  }

  return { bookings: user.bookings }
}


export const createBookingController = async ({ body, set }: Context) => {
    try {
        const { userId, bookingType, bookingDate, checkIn, checkOut, status, notes } = body as Required<BookingModel>;
        const newBooking = await bookingService.createBooking({
            userId,
            bookingType,
            bookingDate: new Date(bookingDate),
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            status,
            notes: notes || "",
        });
        return {
            message: "Booking created successfully",
            booking: newBooking,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const createBookingDetailController = async ({ body, set }: Context) => {
    try {
        const { bookingId, roomId, pricePerUnit, subtotal, quantity } = body as Required<BookingDetailModel>;
        const newBookingDetail = await bookingService.createBookingDetail({
            bookingId,
            roomId,
            pricePerUnit:Number(pricePerUnit),
            subtotal: Number(subtotal),
            quantity,
        });
        return {
            message: "Booking detail created successfully",
            bookingDetail: newBookingDetail,
        }
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const updateBookingController = async ({ params, body, set }: Context) => {
    try {
        const { id } = params;
        const { bookingType, bookingDate, checkIn, checkOut, status, notes } = body as Partial<BookingModel>;
        const updatedBooking = await bookingService.updateBooking(id, {
            bookingType,
            bookingDate: bookingDate ? new Date(bookingDate) : undefined,
            checkIn: checkIn ? new Date(checkIn) : undefined,
            checkOut: checkOut ? new Date(checkOut) : undefined,
            status,
            notes : notes || undefined,
        });
        if (!updatedBooking) {
            set.status = 404;
            return { message: "Booking not found" };
        }
        return {
            message: "Booking updated successfully",
            booking: updatedBooking,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const updateBookingDetailController = async ({ params, body, set }: Context) => {
    try {
        const { detailId } = params;
        const { roomId, pricePerUnit, subtotal, quantity } = body as Partial<BookingDetailModel>;
        const updatedBookingDetail = await bookingService.updateBookingDetail(detailId, {
            roomId,
            pricePerUnit: pricePerUnit ? Number(pricePerUnit) : undefined,
            subtotal: subtotal ? Number(subtotal) : undefined,
            quantity,
        });
        if (!updatedBookingDetail) {
            set.status = 404;
            return { message: "Booking detail not found" };
        }
        return {
            message: "Booking detail updated successfully",
            bookingDetail: updatedBookingDetail,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const deleteBookingController = async ({ params, set }: Context) => {
    try {
        const { id } = params;
        const deletedBooking = await bookingService.deleteBooking(id);
        if (!deletedBooking) {
            set.status = 404;
            return { message: "Booking not found" };
        }
        return {
            message: "Booking deleted successfully",
            booking: deletedBooking,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const deleteBookingDetailController = async ({ params, set }: Context) => {
    try {
        const { detailId } = params;
        const deletedBookingDetail = await bookingService.deleteBookingDetail(detailId);
        if (!deletedBookingDetail) {
            set.status = 404;
            return { message: "Booking detail not found" };
        }
        return {
            message: "Booking detail deleted successfully",
            bookingDetail: deletedBookingDetail,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}