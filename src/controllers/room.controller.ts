import { Context } from "elysia";
import * as RoomService from "../services/room.service";
import { RoomTypeModel } from "../models/roomtype.model";
import { RoomModel } from "../models/room.model";
import { RoomPriceModel } from "../models/room-pice.model";

export const getRoomTypesController = async ({ set }: Context) => {
  try {
    const roomTypes = await RoomService.getRoomTypes();
    return {
      message: "Room types retrieved successfully",
      roomTypes,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const getRoomTypeByIdController = async ({ params, set }: Context) => {
  try {
    const { id } = params;
    const roomType = await RoomService.getRoomtypeById(id);
    if (!roomType) {
      set.status = 404;
      return { message: "Room type not found" };
    }
    return {
      message: "Room type retrieved successfully",
      roomType,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const getRoomsController = async ({ set }: Context) => {
  try {
    const rooms = await RoomService.getRooms();
    return {
      message: "Rooms retrieved successfully",
      rooms,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const getRoomByIdController = async ({ params, set }: Context) => {
  try {
    const { id } = params;
    const room = await RoomService.getRoomById(id);
    if (!room) {
      set.status = 404;
      return { message: "Room not found" };
    }
    return {
      message: "Room retrieved successfully",
      room,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const getRoomPricesController = async ({ set }: Context) => {
  try {
    const roomPrices = await RoomService.getRoomPrices();
    return {
      message: "Room prices retrieved successfully",
      roomPrices,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const getRoomPriceByIdController = async ({ params, set }: Context) => {
  try {
    const { id } = params;
    const roomPrice = await RoomService.getRoomPriceById(id);
    if (!roomPrice) {
      set.status = 404;
      return { message: "Room price not found" };
    }
    return {
      message: "Room price retrieved successfully",
      roomPrice,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const createRoomTypeController = async ({ body, set }: Context) => {
  try {
    const { name, description, maxGuests } = body as Required<RoomTypeModel>;

    if (!name || !maxGuests || !description) {
      set.status = 400;
      return { message: "Name, maxGuests and description are required" };
    }
    const newRoomType = await RoomService.createRoomType({
      name,
      description,
      maxGuests,
    });
    return {
      message: "Room type created successfully",
      roomType: newRoomType,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};


export const createRoomController = async ({ body, set }: Context) => {
    try {
        const { roomNumber, floor, status, description, typeId } = body as Required<RoomModel>;
    
        if (!roomNumber || !floor || !status || !typeId || !description) {
        set.status = 400;
        return { message: "Room number, floor, status, typeId and description are required" };
        }
    
        const newRoom = await RoomService.createRoom({
        roomNumber,
        floor,
        status,
        description,
        typeId,
        });
    
        return {
        message: "Room created successfully",
        room: newRoom,
        };
    } catch (error) {
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const createRoomPriceController = async ({ body, set }: Context) => {
    try {
        const { typeId, priceAmount, priceType , season, effectiveDate } = body as Required<RoomPriceModel>;
    
        if (!typeId || !priceAmount || !priceType || !season || !effectiveDate) {
        set.status = 400;
        console.log(body)
        return { message: "Type ID, priceAmount , priceType, season and effectiveDate are required" };
        }
    
        const newRoomPrice = await RoomService.createRoomPrice({
          typeId,
          priceAmount: Number(priceAmount),
          pricetype: priceType as "daily" | "monthly",        
          season, 
          effectiveDate: new Date(effectiveDate),       
       });
    
        return {
        message: "Room price created successfully",
        roomPrice: newRoomPrice,
        };
    } catch (error) {
        console.error("Create Room Price Error:", error);
        set.status = 500;
        return { message: "Internal server error", error };
    }
}

export const updateRoomTypeController = async ({ params, body, set }: Context) => {
  try {
    const { id } = params;
    const { name, description, maxGuests } = body as Partial<RoomTypeModel>;

    const updatedRoomType = await RoomService.updateRoomType(id, {
      name,
      description: description || undefined,
      maxGuests,
    });

    if (!updatedRoomType) {
      set.status = 404;
      return { message: "Room type not found" };
    }

    return {
      message: "Room type updated successfully",
      roomType: updatedRoomType,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};


export const updateRoomController = async ({ params, body, set }: Context) => {
  try {
    const { id } = params;
    const { roomNumber, floor, status, description, typeId } = body as Partial<RoomModel>;

    const updatedRoom = await RoomService.updateRoom(id, {
      roomNumber,
      floor,
      status,
      description: description || undefined,
      typeId,
    });

    if (!updatedRoom) {
      set.status = 404;
      return { message: "Room not found" };
    }

    return {
      message: "Room updated successfully",
      room: updatedRoom,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};


export const updateRoomPriceController = async ({ params, body, set }: Context) => {
  try {
    const { id } = params;
    const { priceType, priceAmount, season, effectiveDate, typeId } = body as Partial<RoomPriceModel>;

    const updatedRoomPrice = await RoomService.updateRoomPrice(id, {
      priceType: priceType as "daily" | "monthly",
      priceAmount: priceAmount ? priceAmount.toNumber() : undefined,
      season : season || undefined,
      effectiveDate,
      typeId,
    });

    if (!updatedRoomPrice) {
      set.status = 404;
      return { message: "Room price not found" };
    }

    return {
      message: "Room price updated successfully",
      roomPrice: updatedRoomPrice,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const deleteRoomTypeController = async ({ params, set }: Context) => {
  try {
    const { id } = params;
    const deletedRoomType = await RoomService.deleteRoomType(id);

    if (!deletedRoomType) {
      set.status = 404;
      return { message: "Room type not found" };
    }

    return {
      message: "Room type deleted successfully",
      roomType: deletedRoomType,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
}

export const deleteRoomController = async ({ params, set }: Context) => {
  try {
    const { id } = params;
    const deletedRoom = await RoomService.deleteRoom(id);

    if (!deletedRoom) {
      set.status = 404;
      return { message: "Room not found" };
    }

    return {
      message: "Room deleted successfully",
      room: deletedRoom,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const deleteRoomPriceController = async ({ params, set }: Context) => {
  try {
    const { id } = params;
    const deletedRoomPrice = await RoomService.deleteRoomPrice(id);

    if (!deletedRoomPrice) {
      set.status = 404;
      return { message: "Room price not found" };
    }

    return {
      message: "Room price deleted successfully",
      roomPrice: deletedRoomPrice,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};