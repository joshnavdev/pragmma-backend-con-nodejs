import TicketController from '../controllers/ticket.controller.js';
import CommentRepository from '../repositories/comment.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';
import TicketService from '../services/ticket.service.js';
import CustomContainer from '../utils/customContainer.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(TicketRepository.name, TicketRepository, []);
container.addClass(CommentRepository.name, CommentRepository, []);
container.addClass(TicketService.name, TicketService, [TicketRepository.name, CommentRepository.name]);
container.addClass(TicketController.name, TicketController, [TicketService.name]);
