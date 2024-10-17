import express from 'express';
import ticketRouter from './ticket.router.js';
import userRouter from './user.router.js';
import authRouter from './auth.router.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const appRouter = express.Router();

appRouter.use(authenticate, ticketRouter);
appRouter.use(userRouter);
appRouter.use('/auth', authRouter);

export default appRouter;
