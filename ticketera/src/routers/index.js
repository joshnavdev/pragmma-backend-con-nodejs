import express from 'express';
import ticketRouter from './ticket.router.js';
import userRouter from './user.router.js';
import authRouter from './auth.router.js';

const appRouter = express.Router();

appRouter.use(ticketRouter);
appRouter.use(userRouter);
appRouter.use(authRouter);

export default appRouter;
