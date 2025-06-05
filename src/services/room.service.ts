import prisma from '../prisma/client';


export const getRoomTypes = async () => {
  return prisma.roomType.findMany({
    include: {
      rooms: true,
      prices: true,
    },
  });
} 

export const getRoomtypeById = async (id: string) => {
  return prisma.roomType.findUnique({
    where: { id },
    include: {
      rooms: true,
      prices: true,
    },
  });
}

export const getRooms = async () =>{
  return prisma.room.findMany({
    include: {
      type: true,
    },
  });
}

export const getRoomById = async (id: string) => {
  return prisma.room.findUnique({
    where: { id },
    include: {
      type: true,
    },
  });
}

export const getRoomPrices = async () => {
  return prisma.roomPrice.findMany({
    include: {
      type: true,
    },
  })
}

export const getRoomPriceById = async (id:string) =>{
  return prisma.roomPrice.findUnique({
    where: { 
      id 
    },
    include: {
      type: true,
    }
  })
}

export const createRoomType = async (data:{
  name: string;
  description?: string;
  maxGuests: number;
}) => {
  return prisma.roomType.create({
    data: { 
      name: data.name,
      description: data.description,
      maxGuests: data.maxGuests,
     },
  });
}

export const createRoom = async (data: {
  description?: string;
  roomNumber: string;
  floor: number;
  status:'available' | 'occupied' | 'maintenance';
  typeId:string;
}) => {
  return prisma.room.create({
    data: {      
      description: data.description,
      roomNumber: data.roomNumber,
      floor: data.floor,
      status: data.status,
      typeId: data.typeId,
    },
  });
}

export const createRoomPrice = async (data: {
  pricetype: 'daily' | 'monthly';
  priceAmount: number;
  season?: string;
  effectiveDate: Date;
  typeId:string
}) => {
  return prisma.roomPrice.create({
    data: {
      priceType: data.pricetype,
      priceAmount: data.priceAmount,
      season: data.season,
      effectiveDate: data.effectiveDate,
      typeId: data.typeId,
    },
  });
}


export const updateRoomType = async (id: string, data: {
  name?: string;
  description?: string;
  maxGuests?: number;
}) => {
  return prisma.roomType.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      maxGuests: data.maxGuests,
    },
  });
}


export const updateRoom = async (id:string,data:{
  roomNumber?: string;
  floor?: number;
  status?: 'available' | 'occupied' | 'maintenance';
  description?: string;
  typeId?: string;
}) => {
  return prisma.room.update({
    where: { id },
    data: {
      roomNumber: data.roomNumber,
      floor: data.floor,
      status: data.status,
      description: data.description,
      typeId: data.typeId,
    },
  });
}


export const updateRoomPrice = async (id:string,data:{
  priceType?: 'daily' | 'monthly';
  priceAmount?: number;
  season?: string;
  effectiveDate?: Date;
  typeId?: string;
}) => {
  return prisma.roomPrice.update({
    where: { id },
    data: {
      priceType: data.priceType,
      priceAmount: data.priceAmount,
      season: data.season,
      effectiveDate: data.effectiveDate,
      typeId: data.typeId,
    },
  });
}



export const deleteRoomType = async (id:string) =>{
  return prisma.roomType.delete({
    where: { id },
  });
}


export const deleteRoomPrice = async (id:string) =>{
  return prisma.roomPrice.delete({
    where: { id },
  });
}


export const deleteRoom = async (id:string) =>{
  return prisma.room.delete({
    where: { id },
  });
}