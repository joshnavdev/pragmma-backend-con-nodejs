import express from 'express';
import ticketRouter from './ticket.router.js';
import userRouter from './user.router.js';

const appRouter = express.Router();

appRouter.use(ticketRouter);
appRouter.use(userRouter);

export default appRouter;
