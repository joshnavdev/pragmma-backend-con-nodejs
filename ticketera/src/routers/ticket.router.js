import express from 'express';
import TicketController from '../controllers/ticket.controller.js';

const ticketController = new TicketController();
const ticketRouter = express.Router();

// authentica = (type, options) => (req, res, next) => { ... }

// ticketRouter.route('/tickets').use((req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (err || info || !user) {
//       return next(new ApiError(401, 'No autorizado'));
//     }

//     console.log('user', user);
//     req.user = user;
//     return next();
//   })(req, res, next);
// });
// ticketRouter.use(passport.authenticate('jwt', { session: false }));

ticketRouter.route('/tickets').get(ticketController.listTickets).post(ticketController.createTicket);

ticketRouter
  .route('/tickets/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

ticketRouter.route('/tickets/:id/comments').post(ticketController.createTicketComment);

export default ticketRouter;
