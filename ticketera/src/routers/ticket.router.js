import express from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import CustomContainer from '../utils/customContainer.js';

const container = CustomContainer.getInstance();
const ticketController = container.get(TicketController.name);

const ticketRouter = express.Router();
ticketRouter.route('/tickets').get(authenticate, ticketController.listTickets).post(ticketController.createTicket);

ticketRouter
  .route('/tickets/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

ticketRouter.route('/tickets/:id/comments').post(ticketController.createTicketComment);

export default ticketRouter;
