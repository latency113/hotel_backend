import prisma from '../prisma/client';

export const getBookings = async () => {
  return prisma.booking.findMany({
  include:{
    details:true,
    user: true,
  }
  });
}

export const getBookingDetails = async (bookingId: string) => {
  return prisma.bookingDetail.findMany({
    where: { bookingId },
    include: {
      booking: true,
      room: true,
    },
  });
}

export const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      details: true,
    },
  });
}

export const getBookingDetailById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      details: {
        include: {
          room: true,
        },
      },
      user: true,
    },
  });
}

export const getUserBookings = async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        bookings: {
          include: { 
            details: {
              include: {
                room: true,
              },
            },
          },
        },
      },
    })
  }

export const createBooking = async (data:{
  userId: string;
  bookingType: "daily"|"monthly";
  bookingDate: Date;
  checkIn: Date;
  checkOut: Date;
  status:"pending" | "confirmed" | "cancelled"|"checked_in"|"checked_out";
  notes?: string;
}) => {
  return prisma.booking.create({
    data:{
      userId: data.userId,
      bookingType: data.bookingType,
      bookingDate: data.bookingDate,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      status: data.status,
      notes: data.notes,
    }
    });
}

export const createBookingDetail = async (data: {
  bookingId:string;
  roomId:string;
  pricePerUnit: number;
  quantity: number;
  subtotal: number;
}) => {
  return prisma.bookingDetail.create({
    data: {
      bookingId: data.bookingId,
      roomId: data.roomId,
      pricePerUnit: data.pricePerUnit,
      quantity: data.quantity,
      subtotal: data.subtotal,
    },
  });
}

export const updateBooking = async (id: string, data: {
  bookingType?: "daily"|"monthly";
  bookingDate?: Date;
  checkIn?: Date;
  checkOut?: Date;
  status?: "pending" | "confirmed" | "cancelled"|"checked_in"|"checked_out";
  notes?: string;
}) => {
  return prisma.booking.update({
    where: { id },
    data,
  });
}

export const updateBookingDetail = async (id: string, data: {
  roomId?: string;
  pricePerUnit?: number;
  quantity?: number;
  subtotal?: number;
}) => {
  return prisma.bookingDetail.update({
    where: { id },
    data,
  });
}

export const deleteBooking = async (id: string) => {
  return prisma.booking.delete({
    where: { id },
  });
}


export const deleteBookingDetail = async (id: string) => {
  return prisma.bookingDetail.delete({
    where: { id },
  });
}
