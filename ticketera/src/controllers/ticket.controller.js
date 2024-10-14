import { nextTick } from 'process';
import ticketDB from '../db.js';
import ApiError from '../utils/errorApi.js';

const validateAndGetTicket = async (id) => {
  const ticket = await ticketDB.getById(id);

  if (!ticket) {
    throw new ApiError(404, 'Ticket no encontrado');
  }

  return ticket;
};

// const catchAsync = (fn) => {
//   return async (req, res, next) => {
//     try {
//       await fn(req, res);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// Forma acortada
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export default class TicketController {
  listTickets = catchAsync(async (req, res) => {
    const tickets = await ticketDB.getAll();

    return res.status(200).json({
      status: 'sucess',
      requestedAt: req.requestTime,
      data: {
        tickets,
      },
    });
  });

  createTicket = catchAsync(async (req, res) => {
    const { body } = req;

    const ticket = await ticketDB.create(body);

    res.status(201).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  });

  getTicket = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const ticket = await validateAndGetTicket(id);

    return res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  });

  updateTicket = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const ticket = await validateAndGetTicket(id);

    const updatedTicket = { ...ticket, ...body };

    await ticketDB.updateById(id, updatedTicket);

    res.status(200).json({
      status: 'success',
      data: {
        ticket: updatedTicket,
      },
    });
  });

  deleteTicket = catchAsync(async (req, res) => {
    const { id } = req.params;

    await validateAndGetTicket(id);
    await ticketDB.deleteById(id);

    res.status(204).end();
  });
}
