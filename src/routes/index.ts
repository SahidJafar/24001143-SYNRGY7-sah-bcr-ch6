import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
import carRouter from './carRouter';

const router = Router();

router.use('/api/v1/users', userRouter);
router.use('/api/v1/cars', carRouter);

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Welcome to BCR Car Rental',
        data: null
    });
});

router.use((req: Request, res: Response) => {
    res.status(404).json({
        code: 404,
        status: 'error',
        message: 'Route not found',
        data: null
    });
});

export default router;
