import { db } from '../utils/database.js';
import Comment from './comment.model.js';
import Ticket from './ticket.model.js';

Ticket.init(db);
Comment.init(db);

Ticket.associate(db.models);
Comment.associate(db.models);