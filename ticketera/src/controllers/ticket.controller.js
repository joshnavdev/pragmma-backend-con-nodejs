import TicketService from '../services/ticket.service.js';

// Forma acortada
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export default class TicketController {
  constructor() {
    this.ticketService = new TicketService();
  }

  listTickets = catchAsync(async (req, res) => {
    const tickets = await this.ticketService.listTickets();

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

    const ticket = await this.ticketService.createTicket(body);

    res.status(201).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  });

  getTicket = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const ticket = await this.ticketService.getTicket(id);

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

    const ticket = await this.ticketService.updateTicket(id, body);

    res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  });

  deleteTicket = catchAsync(async (req, res) => {
    const { id } = req.params;

    await this.ticketService.deleteTicket(id);

    res.status(204).end();
  });

  createTicketComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const newComment = await this.ticketService.createTicketComment(id, body);

    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  });
}
