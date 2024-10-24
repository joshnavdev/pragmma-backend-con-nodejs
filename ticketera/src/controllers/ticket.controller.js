import { catchAsync } from '../utils/controller.js'; // ESModule

export default class TicketController {
  /**
   *
   * @param {import('../services/ticket.service.js').default} ticketService
   */
  constructor(ticketService) {
    this.ticketService = ticketService;
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

  getTicket = catchAsync(async (req, res) => {
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
