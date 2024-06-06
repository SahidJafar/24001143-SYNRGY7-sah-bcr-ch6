import { Router } from 'express';
import RouteGroup from 'express-route-grouping';
import { authenticateTokenAdmin} from '../middlewares/authorization';
import { CarsController } from '../controllers/car.controller';
import upload from '../utils/upload.on.memory'

const router = Router();
// const root = new RouteGroup('/', router);

const carsController = new CarsController()

// users
// root.group('/', (cars) => {
//     // Get List Car (admin dan superadmin)
//     cars.get('/', authenticateTokenAdmin, carsController.list.bind(carsController))
//     // Create Car (admin dan superadmin)
//     cars.post('/', authenticateTokenAdmin, upload.single('image'), carsController.create.bind(carsController))
//     // Get List Car (public)
//     cars.get('/public', carsController.listPublic.bind(carsController))
//     // Get Car By Id (admin dan superadmin)
//     cars.get('/:id', authenticateTokenAdmin, carsController.show.bind(carsController))
//     // Update Car (admin dan superadmin)
//     cars.patch('/:id', authenticateTokenAdmin, upload.single('image'), carsController.update.bind(carsController))
//     // Delete Car (admin dan superadmin)
//     cars.delete('/:id', authenticateTokenAdmin, carsController.delete.bind(carsController))
// });

    // Get List Car (admin dan superadmin)
    router.get('/', authenticateTokenAdmin, carsController.list.bind(carsController))
    // Create Car (admin dan superadmin)
    router.post('/', authenticateTokenAdmin, upload.single('image'), carsController.create.bind(carsController))
    // Get List Car (public)
    router.get('/public', carsController.listPublic.bind(carsController))
    // Get Car By Id (admin dan superadmin)
    router.get('/:id', authenticateTokenAdmin, carsController.show.bind(carsController))
    // Update Car (admin dan superadmin)
    router.patch('/:id', authenticateTokenAdmin, upload.single('image'), carsController.update.bind(carsController))
    // Delete Car (admin dan superadmin)
    router.delete('/:id', authenticateTokenAdmin, carsController.delete.bind(carsController))

export default router;
