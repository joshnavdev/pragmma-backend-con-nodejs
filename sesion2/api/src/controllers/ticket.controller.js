import fs from 'fs';
import crypto from 'crypto';

const DB_PATH = 'db/tickets.json';

const tickets = JSON.parse(fs.readFileSync(DB_PATH));

const generateUUID = () => {
  return crypto.randomBytes(16).toString('hex');
};

export default class TicketController {
  listTickets = (req, res) => {
    const ticketsFormatted = Object.keys(tickets).map((key) => {
      return {
        ...tickets[key],
      };
    });

    return res.status(200).json({
      status: 'sucess',
      requestedAt: req.requestTime,
      data: {
        tickets: ticketsFormatted,
      },
    });
  };

  createTicket = (req, res) => {
    const { body } = req;
    const id = generateUUID();

    const ticket = { id, ...body };

    tickets[id] = ticket;

    fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2), (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          ticket,
        },
      });
    });
  };

  getTicket = (req, res) => {
    const { id } = req.params;

    const ticket = tickets[id];

    if (!ticket) {
      return res.status(404).json({
        status: 'fail',
        message: 'Ticket no encontrado',
        data: null,
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  };

  updateTicket = (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const ticket = tickets[id];

    if (!ticket) {
      return res.status(404).json({
        status: 'fail',
        message: 'Ticket no encontrado',
        data: null,
      });
    }

    const updatedTicket = { ...ticket, ...body };

    tickets[id] = updatedTicket;

    fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2), (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          ticket,
        },
      });
    });
  };

  deleteTicket = (req, res) => {
    const { id } = req.params;

    const ticket = tickets[id];

    if (!ticket) {
      return res.status(404).json({
        status: 'fail',
        message: 'Ticket no encontrado',
        data: null,
      });
    }

    delete tickets[id];

    fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2), (err) => {
      res.status(204).end();
    });
  };
}
