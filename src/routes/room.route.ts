import { Elysia } from 'elysia';
import { 
    getRoomTypesController, 
    getRoomTypeByIdController, 
    getRoomsController, 
    getRoomByIdController, 
    getRoomPricesController,

    createRoomTypeController,
    createRoomController,
    createRoomPriceController,

    deleteRoomController,
    deleteRoomPriceController,
    deleteRoomTypeController
} from '../controllers/room.controller';

export const roomRoute = new Elysia({prefix: '/api/rooms'})
    .get('/types', getRoomTypesController)
    .get('/types/:id', getRoomTypeByIdController)
    .post('/types', createRoomTypeController)
    .delete('/types/:id', deleteRoomTypeController)


    
    .get('/', getRoomsController)
    .get('/:id', getRoomByIdController)
    .post('/', createRoomController)
    .delete('/:id', deleteRoomController)



    .get('/prices', getRoomPricesController)
    .get('/prices/:id', getRoomByIdController)
    .post('/prices', createRoomPriceController)
    .delete('/prices/:id', deleteRoomPriceController);   
