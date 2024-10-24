import ApiError from '../utils/errorApi.js';

class TicketService {
  /**
   *
   * @param {import('../repositories/ticket.repository.js').default} ticketRepository
   * @param {import('../repositories/comment.repository.js').default} commentRepository
   */
  constructor(ticketRepository, commentRepository) {
    this.ticketRepository = ticketRepository;
    this.commentRepository = commentRepository;
  }

  validateAndGetTicket = async (id, withComment = false) => {
    let ticket;

    if (withComment) {
      ticket = await this.ticketRepository.getByIdWithComments(id);
    } else {
      ticket = await this.ticketRepository.getById(id);
    }

    if (!ticket) {
      throw new ApiError(404, 'Ticket no encontrado');
    }

    return ticket;
  };

  listTickets = async () => {
    return this.ticketRepository.getAll();
  };

  createTicket = async (ticket) => {
    return this.ticketRepository.create(ticket);
  };

  getTicket = async (id) => {
    return this.validateAndGetTicket(id, true);
  };

  updateTicket = async (id, newTicket) => {
    await this.validateAndGetTicket(id);

    return this.ticketRepository.update(id, newTicket);
  };

  deleteTicket = async (id) => {
    await this.validateAndGetTicket(id);

    return this.ticketRepository.delete(id);
  };

  createTicketComment = async (ticketId, commentBody) => {
    const ticket = await this.validateAndGetTicket(ticketId);
    const comment = await this.commentRepository.create(commentBody);

    await ticket.addComment(comment);

    return comment;
  };
}

export default TicketService;
