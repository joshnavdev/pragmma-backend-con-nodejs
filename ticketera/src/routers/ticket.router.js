import express from 'express';
import TicketController from '../controllers/ticket.controller.js';

const ticketController = new TicketController();

const ticketRouter = express.Router();
ticketRouter.route('/tickets').get(ticketController.listTickets).post(ticketController.createTicket);

ticketRouter
  .route('/tickets/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

ticketRouter.route('/tickets/:id/comments').post(ticketController.createTicketComment);

export default ticketRouter;
