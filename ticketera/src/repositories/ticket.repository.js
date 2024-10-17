import Ticket from '../models/ticket.model.js';
import BaseRepository from './repository.js';

class TicketRepository extends BaseRepository {
  constructor() {
    super(Ticket);
  }

  async getByIdWithComments(id) {
    return this.model.findByPk(id, { include: 'comments' });
  }
}

export default TicketRepository;
